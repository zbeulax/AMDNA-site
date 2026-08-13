import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

const SUPABASE_READY = SUPABASE_URL && !SUPABASE_URL.includes("VOTRE_") && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("VOTRE_");
if(!SUPABASE_READY){
  document.getElementById("loginError").hidden=false;
  document.getElementById("loginError").textContent="Supabase n'est pas configuré (supabase-config.js). Voir SETUP.md.";
}
const supabase = SUPABASE_READY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

const loginScreen=document.getElementById("loginScreen");
const dashboard=document.getElementById("dashboard");
const loginForm=document.getElementById("loginForm");
const loginError=document.getElementById("loginError");

async function checkSession(){
  if(!supabase) return;
  const {data:{session}}=await supabase.auth.getSession();
  if(session){ showDashboard(); } else { showLogin(); }
}
function showLogin(){loginScreen.hidden=false;dashboard.hidden=true}
function showDashboard(){
  loginScreen.hidden=true;dashboard.hidden=false;
  loadBookings();loadQuotesHistory();loadReviewsAdmin();loadBlockedDates();
}
checkSession();

loginForm.addEventListener("submit",async e=>{
  e.preventDefault();
  if(!supabase) return;
  loginError.hidden=true;
  const email=document.getElementById("loginEmail").value;
  const password=document.getElementById("loginPassword").value;
  const {error}=await supabase.auth.signInWithPassword({email,password});
  if(error){loginError.hidden=false;loginError.textContent="Identifiants incorrects.";return}
  showDashboard();
});
document.getElementById("logoutBtn").addEventListener("click",async()=>{
  if(supabase) await supabase.auth.signOut();
  showLogin();
});

/* ---------------------------------------------------------
   Tabs
   --------------------------------------------------------- */
document.querySelectorAll(".tab-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-"+btn.dataset.tab).classList.add("active");
  });
});

/* ---------------------------------------------------------
   Réservations / planning
   --------------------------------------------------------- */
function frDate(d){ if(!d) return "—"; return new Intl.DateTimeFormat("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date(d+"T12:00:00")); }

async function loadBookings(){
  if(!supabase) return;
  const status=document.getElementById("filterStatus").value;
  const svc=document.getElementById("filterService").value;
  let query=supabase.from("bookings").select("*").order("date",{ascending:true,nullsFirst:false});
  if(status) query=query.eq("status",status);
  if(svc) query=query.eq("service",svc);
  const {data,error}=await query;
  const body=document.getElementById("bookingsBody");
  const empty=document.getElementById("bookingsEmpty");
  body.innerHTML="";
  if(error||!data||!data.length){ empty.hidden=false; renderWeekSummary([]); return; }
  empty.hidden=true;
  renderWeekSummary(data);
  data.forEach(b=>body.appendChild(bookingRow(b)));
}

function renderWeekSummary(bookings){
  const wrap=document.getElementById("weekSummary");wrap.innerHTML="";
  const today=new Date();today.setHours(0,0,0,0);
  for(let i=0;i<7;i++){
    const d=new Date(today);d.setDate(d.getDate()+i);
    const key=d.toISOString().slice(0,10);
    const count=bookings.filter(b=>b.date===key && b.status!=="cancelled").length;
    const cell=document.createElement("div");
    cell.className="week-day"+(count>0?" busy":"");
    cell.innerHTML=`<div class="d">${new Intl.DateTimeFormat("fr-FR",{weekday:"short",day:"numeric"}).format(d)}</div><div class="n">${count}</div>`;
    wrap.appendChild(cell);
  }
}

function bookingRow(b){
  const tr=document.createElement("tr");
  const subLabel={exterieur:"Lavage extérieur",interieur:"Lavage intérieur",integral:"Lavage intégral",protection:"Protection & finition"}[b.sub_service];
  const catLabel={citadine:"Citadine",berline:"Berline",suv:"SUV","4x4":"4x4",utilitaire:"Utilitaire"}[b.vehicle_category];
  const catLine=catLabel?`<br><span style="color:#7ea6ff;font-size:11px">🚗 ${catLabel}</span>`:"";
  const suppList=(b.supplements||[]).filter(s=>!s.startsWith("Gabarit :")).length?b.supplements.filter(s=>!s.startsWith("Gabarit :")).map(s=>`<br><span style="color:var(--muted);font-size:11px">• ${escapeHtml(s)}</span>`).join(""):"";
  const priceLine=b.total_price?`<br><span style="color:var(--accent);font-size:12px;font-weight:700">Total : ${b.total_price} €</span>`:"";
  const visitLine=b.visit_requested?`<br><span style="color:#58d68d;font-size:11px">● Visite préalable demandée</span>`:"";
  const locationModeLine=b.location_mode==="domicile"?`<br><span style="color:#ffc15a;font-size:11px">● À domicile</span>`:"";
  tr.innerHTML=`
    <td>${frDate(b.date)}</td>
    <td>${b.time||"—"}</td>
    <td>${b.service==="auto"?"Auto":"Nautic"}${subLabel?`<br><span style="color:var(--muted);font-size:11px">${escapeHtml(subLabel)}</span>`:""}${catLine}${suppList}${priceLine}${visitLine}${locationModeLine}</td>
    <td>${escapeHtml(b.first_name)} ${escapeHtml(b.last_name)}${b.asset?`<br><span style="color:var(--muted);font-size:11px">${escapeHtml(b.asset)}</span>`:""}</td>
    <td>${escapeHtml(b.phone||"")}<br><span style="color:var(--muted);font-size:11px">${escapeHtml(b.email||"")}</span></td>
    <td>${escapeHtml(b.location||"—")}</td>
    <td></td>
    <td><span class="badge ${b.status}">${statusLabel(b.status)}</span></td>
    <td><span class="badge ${b.payment_status}">${paymentLabel(b.payment_status)}</span></td>
    <td class="row-actions"></td>
  `;
  const photosCell=tr.children[6];
  if((b.photos||[]).length){
    const btn=document.createElement("button");btn.className="photo-btn";btn.type="button";
    btn.textContent=`Voir (${b.photos.length})`;
    btn.addEventListener("click",()=>openPhotoViewer(b.photos));
    photosCell.appendChild(btn);
  }else{
    photosCell.textContent="—";
  }
  const actions=tr.querySelector(".row-actions");

  const statusSel=document.createElement("select");
  ["pending","confirmed","cancelled"].forEach(s=>{
    const o=document.createElement("option");o.value=s;o.textContent=statusLabel(s);if(s===b.status)o.selected=true;
    statusSel.appendChild(o);
  });
  statusSel.addEventListener("change",()=>updateBookingStatus(b,statusSel.value));
  actions.appendChild(statusSel);

  const paySel=document.createElement("select");
  ["unpaid","partial","paid"].forEach(s=>{
    const o=document.createElement("option");o.value=s;o.textContent=paymentLabel(s);if(s===b.payment_status)o.selected=true;
    paySel.appendChild(o);
  });
  paySel.addEventListener("change",async()=>{
    await supabase.from("bookings").update({payment_status:paySel.value}).eq("id",b.id);
    loadBookings();
  });
  actions.appendChild(paySel);

  const rescheduleBtn=document.createElement("button");
  rescheduleBtn.type="button";rescheduleBtn.textContent="Reprogrammer";
  rescheduleBtn.addEventListener("click",()=>rescheduleBooking(b));
  actions.appendChild(rescheduleBtn);

  return tr;
}
function statusLabel(s){return {pending:"En attente",confirmed:"Confirmée",cancelled:"Annulée"}[s]||s}
function paymentLabel(s){return {unpaid:"Impayé",partial:"Partiel",paid:"Payé"}[s]||s}
function escapeHtml(str){const d=document.createElement("div");d.textContent=str||"";return d.innerHTML}

async function updateBookingStatus(b,newStatus){
  await supabase.from("bookings").update({status:newStatus}).eq("id",b.id);
  if(newStatus==="confirmed"){
    await supabase.functions.invoke("send-confirmation",{
      body:{firstName:b.first_name,email:b.email,phone:b.phone,service:b.service,date:b.date,time:b.time,kind:"confirmed"}
    }).catch(err=>console.warn(err));
  }
  loadBookings();
}

async function rescheduleBooking(b){
  const newDate=prompt("Nouvelle date (AAAA-MM-JJ) :",b.date||"");
  if(!newDate) return;
  const newTime=prompt("Nouvelle heure (ex: 11:00) :",b.time||"");
  if(!newTime) return;
  await supabase.from("bookings").update({date:newDate,time:newTime}).eq("id",b.id);
  await supabase.functions.invoke("send-confirmation",{
    body:{firstName:b.first_name,email:b.email,phone:b.phone,service:b.service,date:newDate,time:newTime,kind:"reschedule"}
  }).catch(err=>console.warn(err));
  loadBookings();
}

document.getElementById("filterStatus").addEventListener("change",loadBookings);
document.getElementById("filterService").addEventListener("change",loadBookings);
document.getElementById("refreshBookings").addEventListener("click",loadBookings);

async function openPhotoViewer(paths){
  const viewer=document.getElementById("photoViewer");
  const grid=document.getElementById("photoViewerGrid");
  grid.innerHTML='<p style="color:var(--muted);font-size:13px">Chargement…</p>';
  viewer.hidden=false;
  const {data,error}=await supabase.storage.from("booking-photos").createSignedUrls(paths,3600);
  if(error||!data){grid.innerHTML='<p style="color:var(--muted);font-size:13px">Impossible de charger les photos.</p>';return}
  grid.innerHTML="";
  data.forEach(item=>{
    if(!item.signedUrl) return;
    const a=document.createElement("a");a.href=item.signedUrl;a.target="_blank";a.rel="noopener";
    const img=document.createElement("img");img.src=item.signedUrl;img.alt="";
    a.appendChild(img);grid.appendChild(a);
  });
}
document.getElementById("closePhotoViewer").addEventListener("click",()=>document.getElementById("photoViewer").hidden=true);
document.getElementById("closePhotoViewerBtn").addEventListener("click",()=>document.getElementById("photoViewer").hidden=true);

/* ---------------------------------------------------------
   Devis
   --------------------------------------------------------- */
const quoteItemsEl=document.getElementById("quoteItems");
function addQuoteItem(desc="",qty=1,price=0){
  const row=document.createElement("div");row.className="item-row";
  row.innerHTML=`
    <input class="qi-desc" placeholder="Ex. Lavage extérieur complet" value="${escapeHtml(desc)}">
    <input class="qi-qty" type="number" min="1" value="${qty}">
    <input class="qi-price" type="number" min="0" step="0.01" value="${price}">
    <button type="button" class="item-remove">×</button>
  `;
  row.querySelector(".item-remove").addEventListener("click",()=>{row.remove();updateQuoteTotal()});
  row.querySelectorAll(".qi-qty,.qi-price").forEach(inp=>inp.addEventListener("input",updateQuoteTotal));
  quoteItemsEl.appendChild(row);
  updateQuoteTotal();
}
function getQuoteItems(){
  return [...quoteItemsEl.querySelectorAll(".item-row")].map(row=>({
    desc:row.querySelector(".qi-desc").value,
    qty:+row.querySelector(".qi-qty").value||0,
    price:+row.querySelector(".qi-price").value||0
  }));
}
function updateQuoteTotal(){
  const total=getQuoteItems().reduce((s,i)=>s+i.qty*i.price,0);
  document.getElementById("quoteTotal").textContent=total.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  return total;
}
document.getElementById("addItem").addEventListener("click",()=>addQuoteItem());
addQuoteItem();

function buildQuotePdf(data){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:"pt",format:"a4"});
  const pageW=doc.internal.pageSize.getWidth();
  const margin=48;
  let y=64;

  doc.setFont("helvetica","bold");doc.setFontSize(20);doc.setTextColor(10,20,35);
  doc.text("AMDNA",margin,y);
  doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(110,120,130);
  doc.text("Nautic & Auto Detailing — Côte d'Azur / Var",margin,y+16);
  doc.text("06 56 73 46 80 · Angemrt@icloud.com",margin,y+30);

  doc.setFont("helvetica","bold");doc.setFontSize(13);doc.setTextColor(10,20,35);
  doc.text(`DEVIS${data.number?" N° "+data.number:""}`,pageW-margin,y,{align:"right"});
  doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(110,120,130);
  doc.text(new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date()),pageW-margin,y+16,{align:"right"});

  y+=64;
  doc.setDrawColor(220,224,228);doc.line(margin,y,pageW-margin,y);
  y+=26;

  doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(80,90,100);
  doc.text("CLIENT",margin,y);
  y+=16;
  doc.setFont("helvetica","normal");doc.setFontSize(11);doc.setTextColor(20,28,38);
  doc.text(data.clientName||"",margin,y);y+=15;
  if(data.clientAddress){doc.text(data.clientAddress,margin,y);y+=15}
  if(data.clientEmail){doc.text(data.clientEmail,margin,y);y+=15}
  if(data.clientPhone){doc.text(data.clientPhone,margin,y);y+=15}

  y+=20;
  doc.setFillColor(10,20,35);
  doc.rect(margin,y,pageW-margin*2,26,"F");
  doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(9);
  doc.text("DESCRIPTION",margin+10,y+17);
  doc.text("QTÉ",pageW-margin-170,y+17,{align:"right"});
  doc.text("PRIX UNIT.",pageW-margin-90,y+17,{align:"right"});
  doc.text("TOTAL",pageW-margin-10,y+17,{align:"right"});
  y+=26;

  doc.setTextColor(20,28,38);doc.setFont("helvetica","normal");doc.setFontSize(10);
  data.items.forEach((item,i)=>{
    const rowH=22;
    if(i%2===1){doc.setFillColor(246,247,248);doc.rect(margin,y,pageW-margin*2,rowH,"F")}
    doc.text(item.desc||"—",margin+10,y+15);
    doc.text(String(item.qty),pageW-margin-170,y+15,{align:"right"});
    doc.text(item.price.toLocaleString("fr-FR",{minimumFractionDigits:2}),pageW-margin-90,y+15,{align:"right"});
    doc.text((item.qty*item.price).toLocaleString("fr-FR",{minimumFractionDigits:2}),pageW-margin-10,y+15,{align:"right"});
    y+=rowH;
  });

  y+=16;
  doc.setDrawColor(220,224,228);doc.line(margin,y,pageW-margin,y);
  y+=22;
  doc.setFont("helvetica","bold");doc.setFontSize(13);
  doc.text(`TOTAL : ${data.total.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}`,pageW-margin,y,{align:"right"});

  y+=40;
  if(data.notes){
    doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(90,100,110);
    const lines=doc.splitTextToSize(data.notes,pageW-margin*2);
    doc.text(lines,margin,y);
    y+=lines.length*12+16;
  }

  y=Math.max(y,740);
  doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(120,130,140);
  doc.text("TVA non applicable, art. 293 B du CGI.",margin,y);

  return doc;
}

document.getElementById("downloadQuote").addEventListener("click",()=>{
  const data=collectQuoteFormData();
  if(!data.clientName){alert("Merci d'indiquer le nom du client.");return}
  const doc=buildQuotePdf(data);
  doc.save(`Devis-AMDNA-${data.clientName.replace(/\s+/g,"-")}.pdf`);
});

function collectQuoteFormData(){
  return {
    clientName:document.getElementById("qClientName").value,
    number:document.getElementById("qNumber").value,
    clientEmail:document.getElementById("qClientEmail").value,
    clientPhone:document.getElementById("qClientPhone").value,
    clientAddress:document.getElementById("qClientAddress").value,
    service:document.getElementById("qService").value,
    notes:document.getElementById("qNotes").value,
    items:getQuoteItems(),
    total:updateQuoteTotal()
  };
}

document.getElementById("saveQuote").addEventListener("click",async()=>{
  const data=collectQuoteFormData();
  if(!data.clientName){alert("Merci d'indiquer le nom du client.");return}
  if(!supabase){alert("Supabase non configuré.");return}
  const {error}=await supabase.from("quotes").insert({
    quote_number:data.number||null, client_name:data.clientName, client_email:data.clientEmail||null,
    client_phone:data.clientPhone||null, client_address:data.clientAddress||null,
    service:data.service, items:data.items, total:data.total, notes:data.notes||null
  });
  if(error){alert("Erreur lors de l'enregistrement.");console.warn(error);return}
  loadQuotesHistory();
  alert("Devis enregistré.");
});

async function loadQuotesHistory(){
  if(!supabase) return;
  const {data,error}=await supabase.from("quotes").select("*").order("created_at",{ascending:false}).limit(30);
  const wrap=document.getElementById("quotesHistory");
  if(error||!data||!data.length){wrap.innerHTML='<p style="color:var(--muted);font-size:13px">Aucun devis enregistré.</p>';return}
  wrap.innerHTML="";
  data.forEach(q=>{
    const el=document.createElement("div");el.className="quote-item";
    el.innerHTML=`<div class="qi-top"><span>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"medium"}).format(new Date(q.created_at))}</span><span>${(+q.total).toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}</span></div>
      <strong>${escapeHtml(q.client_name)}</strong>`;
    const dl=document.createElement("button");
    dl.className="btn-ghost small";dl.style.marginTop="8px";dl.textContent="Télécharger à nouveau";
    dl.addEventListener("click",()=>{
      const doc=buildQuotePdf({
        clientName:q.client_name, number:q.quote_number, clientEmail:q.client_email,
        clientPhone:q.client_phone, clientAddress:q.client_address, notes:q.notes,
        items:q.items||[], total:+q.total
      });
      doc.save(`Devis-AMDNA-${q.client_name.replace(/\s+/g,"-")}.pdf`);
    });
    el.appendChild(dl);
    wrap.appendChild(el);
  });
}

/* ---------------------------------------------------------
   Avis
   --------------------------------------------------------- */
async function loadReviewsAdmin(){
  if(!supabase) return;
  const {data}=await supabase.from("reviews").select("*").order("created_at",{ascending:false});
  const pendingWrap=document.getElementById("pendingReviews");
  const approvedWrap=document.getElementById("approvedReviews");
  const pendingEmpty=document.getElementById("pendingEmpty");
  pendingWrap.innerHTML="";approvedWrap.innerHTML="";
  const pending=(data||[]).filter(r=>!r.approved);
  const approved=(data||[]).filter(r=>r.approved);
  pendingEmpty.hidden=!!pending.length;
  pending.forEach(r=>pendingWrap.appendChild(reviewAdminCard(r,true)));
  approved.forEach(r=>approvedWrap.appendChild(reviewAdminCard(r,false)));
}
function reviewAdminCard(r,isPending){
  const card=document.createElement("div");card.className="review-admin-card";
  card.innerHTML=`<div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
    ${r.comment?`<p>${escapeHtml(r.comment)}</p>`:""}
    <div class="name">${escapeHtml(r.name)}</div>
    <div class="actions"></div>`;
  const actions=card.querySelector(".actions");
  if(isPending){
    const approveBtn=document.createElement("button");approveBtn.className="approve";approveBtn.textContent="Approuver";
    approveBtn.addEventListener("click",async()=>{await supabase.from("reviews").update({approved:true}).eq("id",r.id);loadReviewsAdmin();});
    const rejectBtn=document.createElement("button");rejectBtn.className="reject";rejectBtn.textContent="Refuser";
    rejectBtn.addEventListener("click",async()=>{await supabase.from("reviews").delete().eq("id",r.id);loadReviewsAdmin();});
    actions.append(approveBtn,rejectBtn);
  }else{
    const hideBtn=document.createElement("button");hideBtn.textContent="Masquer du site";
    hideBtn.addEventListener("click",async()=>{await supabase.from("reviews").update({approved:false}).eq("id",r.id);loadReviewsAdmin();});
    actions.append(hideBtn);
  }
  return card;
}

/* ---------------------------------------------------------
   Dates bloquées
   --------------------------------------------------------- */
document.getElementById("blockForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const date=document.getElementById("blockDate").value;
  const reason=document.getElementById("blockReason").value;
  if(!supabase||!date) return;
  const {error}=await supabase.from("blocked_dates").insert({date,reason:reason||null});
  if(error){alert("Cette date est peut-être déjà bloquée.");console.warn(error);return}
  document.getElementById("blockForm").reset();
  loadBlockedDates();
});
async function loadBlockedDates(){
  if(!supabase) return;
  const {data}=await supabase.from("blocked_dates").select("*").order("date",{ascending:true});
  const wrap=document.getElementById("blockedList");wrap.innerHTML="";
  (data||[]).forEach(b=>{
    const row=document.createElement("div");row.className="blocked-row";
    row.innerHTML=`<span>${frDate(b.date)}${b.reason?` — ${escapeHtml(b.reason)}`:""}</span>`;
    const del=document.createElement("button");del.textContent="Retirer";
    del.addEventListener("click",async()=>{await supabase.from("blocked_dates").delete().eq("id",b.id);loadBlockedDates();});
    row.appendChild(del);
    wrap.appendChild(row);
  });
}
