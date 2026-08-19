const AMDNA_LOGO_PDF="data:image/png;base64,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";
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
  window.scrollTo(0,0);
  loadBookings();loadQuotesHistory();loadReviewsAdmin();loadRevenue();loadCalendarWeek();refreshQuoteNumber();loadClientsDb();
  const jobDate=document.getElementById("jobDate");
  if(jobDate && !jobDate.value) jobDate.value=new Date().toISOString().slice(0,10);
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
  const manualLine=b.manual_entry?`<div class="manual-badge">🛠 Chantier ajouté par vous${b.message?` — ${escapeHtml(b.message)}`:""}</div>`:"";
  tr.innerHTML=`
    <td>${frDate(b.date)}</td>
    <td>${b.time||"—"}</td>
    <td>${b.service==="auto"?"Auto":"Nautic"}${subLabel?`<br><span style="color:var(--muted);font-size:11px">${escapeHtml(subLabel)}</span>`:""}${catLine}${suppList}${priceLine}${visitLine}${locationModeLine}</td>
    <td>${escapeHtml(b.first_name)} ${escapeHtml(b.last_name)}${b.asset?`<br><span style="color:var(--muted);font-size:11px">${escapeHtml(b.asset)}</span>`:""}${manualLine}</td>
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

/* ---------------------------------------------------------
   Calendrier planning (vue semaine, façon agenda)
   --------------------------------------------------------- */
const CAL_START_HOUR=7, CAL_END_HOUR=20, PX_PER_MIN=50/60;
const FIXED_HOURS=["09:00","11:00","14:00","16:00"];
const DAY_NAMES=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const SUB_LABELS={exterieur:"Lavage extérieur",interieur:"Lavage intérieur",integral:"Lavage intégral",protection:"Protection & finition"};

function startOfWeek(d){
  const date=new Date(d);const day=(date.getDay()+6)%7;
  date.setDate(date.getDate()-day);date.setHours(0,0,0,0);return date;
}
function toKey(d){return d.toISOString().slice(0,10)}
function timeToMinutes(t){const[h,m]=t.split(":").map(Number);return h*60+(m||0)}
let calendarWeekStart=startOfWeek(new Date());

async function loadCalendarWeek(){
  if(!supabase) return;
  const weekEnd=new Date(calendarWeekStart);weekEnd.setDate(weekEnd.getDate()+7);
  const startStr=toKey(calendarWeekStart), endStr=toKey(weekEnd);
  const [{data:bookings},{data:blocks}]=await Promise.all([
    supabase.from("bookings").select("*").gte("date",startStr).lt("date",endStr).neq("status","cancelled"),
    supabase.from("manual_blocks").select("*").gte("date",startStr).lt("date",endStr)
  ]);
  renderCalendarWeek(bookings||[],blocks||[]);
  const fmt=new Intl.DateTimeFormat("fr-FR",{day:"numeric",month:"short"});
  const end=new Date(calendarWeekStart);end.setDate(end.getDate()+6);
  document.getElementById("weekLabel").textContent=`${fmt.format(calendarWeekStart)} – ${fmt.format(end)}`;
}

function renderCalendarWeek(bookings,blocks){
  const grid=document.getElementById("calendarGridWeek");grid.innerHTML="";
  const today=toKey(new Date());

  const header=document.createElement("div");header.className="cal-header-row";
  header.appendChild(document.createElement("div")).className="cal-time-col";
  for(let i=0;i<7;i++){
    const d=new Date(calendarWeekStart);d.setDate(d.getDate()+i);
    const cell=document.createElement("div");
    cell.className="cal-day-header"+(toKey(d)===today?" today":"");
    cell.innerHTML=`${DAY_NAMES[i]}<br><strong>${d.getDate()}</strong>`;
    header.appendChild(cell);
  }
  grid.appendChild(header);

  const body=document.createElement("div");body.className="cal-body-row";
  const totalMin=(CAL_END_HOUR-CAL_START_HOUR)*60;
  const heightPx=totalMin*PX_PER_MIN;

  const timeCol=document.createElement("div");timeCol.className="cal-time-col";timeCol.style.height=heightPx+"px";
  for(let h=CAL_START_HOUR;h<=CAL_END_HOUR;h++){
    const lbl=document.createElement("div");lbl.className="cal-hour-label";
    lbl.style.top=((h-CAL_START_HOUR)*60*PX_PER_MIN)+"px";
    lbl.textContent=String(h).padStart(2,"0")+":00";
    timeCol.appendChild(lbl);
  }
  body.appendChild(timeCol);

  for(let i=0;i<7;i++){
    const d=new Date(calendarWeekStart);d.setDate(d.getDate()+i);
    const key=toKey(d);
    const col=document.createElement("div");col.className="cal-day-col";col.style.height=heightPx+"px";
    for(let h=CAL_START_HOUR;h<CAL_END_HOUR;h++){
      const line=document.createElement("div");line.className="cal-hour-line";
      line.style.top=((h-CAL_START_HOUR)*60*PX_PER_MIN)+"px";
      col.appendChild(line);
    }
    bookings.filter(b=>b.date===key&&b.time).forEach(b=>{
      const startMin=timeToMinutes(b.time)-CAL_START_HOUR*60;
      const ev=document.createElement("div");ev.className="cal-event booking";
      ev.style.top=Math.max(0,startMin*PX_PER_MIN)+"px";
      ev.style.height=Math.max(30,120*PX_PER_MIN)+"px";
      const who=`${b.first_name||""} ${b.last_name||""}`.trim()||"Client";
      const sub=b.service==="auto"?(SUB_LABELS[b.sub_service]||"Auto"):"Nautic";
      ev.innerHTML=`<strong>${b.time} · ${escapeHtml(who)}</strong><span>${sub}</span>`;
      ev.addEventListener("click",()=>openBookingDetail(b));
      col.appendChild(ev);
    });
    blocks.filter(bl=>bl.date===key).forEach(bl=>{
      const startMin=timeToMinutes(bl.start_time)-CAL_START_HOUR*60;
      const endMin=timeToMinutes(bl.end_time)-CAL_START_HOUR*60;
      const ev=document.createElement("div");ev.className="cal-event block";
      ev.style.top=Math.max(0,startMin*PX_PER_MIN)+"px";
      ev.style.height=Math.max(24,(endMin-startMin)*PX_PER_MIN)+"px";
      ev.innerHTML=`<strong>${bl.start_time}–${bl.end_time}</strong><span>${escapeHtml(bl.description||"Bloqué")}</span>`;
      ev.addEventListener("click",()=>openBlockDetail(bl));
      col.appendChild(ev);
    });
    body.appendChild(col);
  }
  grid.appendChild(body);
}

document.getElementById("prevWeek").addEventListener("click",()=>{calendarWeekStart.setDate(calendarWeekStart.getDate()-7);loadCalendarWeek()});
document.getElementById("nextWeek").addEventListener("click",()=>{calendarWeekStart.setDate(calendarWeekStart.getDate()+7);loadCalendarWeek()});
document.getElementById("todayWeek").addEventListener("click",()=>{calendarWeekStart=startOfWeek(new Date());loadCalendarWeek()});

/* ---- Détail réservation ---- */
const eventDetail=document.getElementById("eventDetail");
function openEventDetailPopup(html){
  document.getElementById("eventDetailBody").innerHTML=html;
  eventDetail.hidden=false;
}
function closeEventDetailPopup(){eventDetail.hidden=true}
document.getElementById("closeEventDetail").addEventListener("click",closeEventDetailPopup);
document.getElementById("closeEventDetailBtn").addEventListener("click",closeEventDetailPopup);

function openBookingDetail(b){
  const who=`${b.first_name||""} ${b.last_name||""}`.trim()||"Client";
  const sub=b.service==="auto"?(SUB_LABELS[b.sub_service]||"Auto"):"Nautic";
  const priceLine=b.total_price?`<div class="event-detail-row"><span>Total</span><strong style="color:var(--accent)">${b.total_price} €</strong></div>`:"";
  openEventDetailPopup(`
    <p class="event-detail-title">${escapeHtml(who)}</p>
    <p class="event-detail-sub">${frDate(b.date)} à ${b.time||"—"} · ${sub}</p>
    <div class="event-detail-row"><span>Téléphone</span><strong>${escapeHtml(b.phone||"—")}</strong></div>
    <div class="event-detail-row"><span>E-mail</span><strong>${escapeHtml(b.email||"—")}</strong></div>
    <div class="event-detail-row"><span>Lieu</span><strong>${escapeHtml(b.location||"—")}</strong></div>
    <div class="event-detail-row"><span>Statut</span><strong>${statusLabel(b.status)}</strong></div>
    <div class="event-detail-row"><span>Paiement</span><strong>${paymentLabel(b.payment_status)}</strong></div>
    ${priceLine}
    <div class="event-detail-actions">
      <button class="btn-ghost small" id="detailReschedule">Reprogrammer</button>
      <button class="btn-ghost small" id="detailGoClients">Voir dans Clients</button>
    </div>
  `);
  document.getElementById("detailReschedule").addEventListener("click",()=>{closeEventDetailPopup();rescheduleBooking(b);});
  document.getElementById("detailGoClients").addEventListener("click",()=>{
    closeEventDetailPopup();
    document.querySelector('.tab-btn[data-tab="clients"]').click();
  });
}

function openBlockDetail(bl){
  openEventDetailPopup(`
    <p class="event-detail-title">${escapeHtml(bl.description||"Créneau bloqué")}</p>
    <p class="event-detail-sub">${frDate(bl.date)} de ${bl.start_time} à ${bl.end_time} · ${bl.service==="auto"?"Auto":"Nautic"}</p>
    <div class="event-detail-actions">
      <button class="btn-ghost small danger" id="detailDeleteBlock">Supprimer ce blocage</button>
    </div>
  `);
  document.getElementById("detailDeleteBlock").addEventListener("click",async()=>{
    if(!confirm("Supprimer ce créneau bloqué et le rendre disponible aux clients ?"))return;
    for(const slot of (bl.blocked_slots||[])){
      await supabase.from("taken_slots").delete().eq("date",bl.date).eq("time",slot);
    }
    await supabase.from("manual_blocks").delete().eq("id",bl.id);
    closeEventDetailPopup();
    loadCalendarWeek();
  });
}

document.getElementById("jobForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(!supabase) return;
  const date=document.getElementById("jobDate").value;
  const start=document.getElementById("jobStart").value;
  const end=document.getElementById("jobEnd").value;
  const service=document.getElementById("jobService").value;
  const desc=document.getElementById("jobDesc").value;
  if(timeToMinutes(end)<=timeToMinutes(start)){alert("L'heure de fin doit être après l'heure de début.");return}

  const overlapping=FIXED_HOURS.filter(h=>timeToMinutes(h)>=timeToMinutes(start)&&timeToMinutes(h)<timeToMinutes(end));

  const {data:blockRow,error}=await supabase.from("manual_blocks").insert({
    date,start_time:start,end_time:end,service,description:desc,blocked_slots:overlapping
  }).select().single();
  if(error){alert("Erreur lors du blocage du créneau : "+error.message+"\n\nIl faut probablement relancer le script supabase/schema.sql dans Supabase (SQL Editor) pour créer la table manual_blocks.");console.warn(error);return}

  for(const slot of overlapping){
    await supabase.from("taken_slots").upsert({date,time:slot},{onConflict:"date,time",ignoreDuplicates:true});
  }
  document.getElementById("jobForm").reset();
  document.getElementById("jobStart").value="09:00";
  document.getElementById("jobEnd").value="12:00";
  loadCalendarWeek();
});

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
const NAUTIC_DAY_RATES=[
  {label:"Hyères, Toulon, Sanary-sur-Mer, La Seyne-sur-Mer, Saint-Mandrier, La Londe",price:400},
  {label:"Le Lavandou, Saint-Tropez, Bandol, La Ciotat",price:440},
  {label:"Cannes, Nice, Marseille, Fréjus, Saint-Raphaël",price:460}
];
const LABOR_DAY_DETAIL="* Forfait à la journée incluant la journée de travail pour le nettoyage du bateau, les frais de déplacement, les péages et les frais d'entrée au port.";

function ensureLaborDayNote(){
  const notesEl=document.getElementById("qNotes");
  if(!notesEl.value.includes(LABOR_DAY_DETAIL)){
    notesEl.value=(notesEl.value.trim()?notesEl.value.trim()+"\n\n":"")+LABOR_DAY_DETAIL;
  }
}

const quoteItemsEl=document.getElementById("quoteItems");
const qtyHeadLabel=document.getElementById("qtyHeadLabel");
const qServiceSelect=document.getElementById("qService");

function addQuoteItem(desc="",qty=1,price=0,detail="",type="labor"){
  const row=document.createElement("div");row.className="item-row";
  const isNautic=qServiceSelect.value==="nautic";
  const sectorOptions=NAUTIC_DAY_RATES.map((s,i)=>`<option value="${i}">${s.label} — ${s.price} €/jour</option>`).join("");
  row.innerHTML=`
    <div class="item-main">
      <input class="qi-desc" placeholder="Nom de la prestation" value="${escapeHtml(desc)}">
      <textarea class="qi-detail" rows="2" placeholder="Détail (facultatif, affiché en petit sous le nom)">${escapeHtml(detail)}</textarea>
      <select class="qi-type">
        <option value="labor"${type==="labor"?" selected":""}>Main-d'œuvre (nettoyage)</option>
        <option value="produit"${type==="produit"?" selected":""}>Produit (vente)</option>
      </select>
      <select class="qi-sector" ${isNautic&&type==="labor"?"":"hidden"}>
        <option value="">+ Choisir un tarif jour par secteur…</option>
        ${sectorOptions}
      </select>
    </div>
    <input class="qi-qty" type="number" min="1" value="${qty}">
    <input class="qi-price" type="number" min="0" step="0.01" value="${price}">
    <span class="item-line-total">0,00 €</span>
    <button type="button" class="item-remove">×</button>
  `;
  row.querySelector(".item-remove").addEventListener("click",()=>{row.remove();updateQuoteTotal()});
  row.querySelectorAll(".qi-qty,.qi-price").forEach(inp=>inp.addEventListener("input",updateQuoteTotal));
  row.querySelector(".qi-desc").addEventListener("blur",e=>{
    if(e.target.value.trim()==="Main-d'œuvre"){
      e.target.value="*Main-d'œuvre";
      ensureLaborDayNote();
    }
  });
  row.querySelector(".qi-type").addEventListener("change",e=>{
    const isNauticNow=qServiceSelect.value==="nautic";
    row.querySelector(".qi-sector").hidden=!(isNauticNow&&e.target.value==="labor");
    updateQuoteTotal();
  });
  row.querySelector(".qi-sector").addEventListener("change",e=>{
    const idx=e.target.value;
    if(idx==="") return;
    const sector=NAUTIC_DAY_RATES[+idx];
    row.querySelector(".qi-desc").value="*Main-d'œuvre";
    row.querySelector(".qi-price").value=sector.price;
    row.querySelector(".qi-type").value="labor";
    ensureLaborDayNote();
    updateQuoteTotal();
  });
  quoteItemsEl.appendChild(row);
  updateQuoteTotal();
}
function updateQtyLabel(){
  const isNautic=qServiceSelect.value==="nautic";
  qtyHeadLabel.textContent=isNautic?"Jours":"Qté";
  quoteItemsEl.querySelectorAll(".item-row").forEach(row=>{
    const type=row.querySelector(".qi-type").value;
    row.querySelector(".qi-sector").hidden=!(isNautic&&type==="labor");
  });
}
qServiceSelect.addEventListener("change",updateQtyLabel);

function getQuoteItems(){
  return [...quoteItemsEl.querySelectorAll(".item-row")].map(row=>({
    desc:row.querySelector(".qi-desc").value,
    detail:row.querySelector(".qi-detail").value,
    type:row.querySelector(".qi-type").value,
    qty:+row.querySelector(".qi-qty").value||0,
    price:+row.querySelector(".qi-price").value||0
  }));
}
function updateQuoteTotal(){
  let laborHT=0, produitHT=0;
  quoteItemsEl.querySelectorAll(".item-row").forEach(row=>{
    const qty=+row.querySelector(".qi-qty").value||0;
    const price=+row.querySelector(".qi-price").value||0;
    const lineTotal=qty*price;
    const type=row.querySelector(".qi-type").value;
    if(type==="produit") produitHT+=lineTotal; else laborHT+=lineTotal;
    row.querySelector(".item-line-total").textContent=lineTotal.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  });
  const totalHT=laborHT+produitHT;
  const vatLaborOn=document.getElementById("vatLaborToggle").checked;
  const vatProduitOn=document.getElementById("vatProduitToggle").checked;
  const vat=(vatLaborOn?laborHT*0.2:0)+(vatProduitOn?produitHT*0.2:0);
  const totalTTC=totalHT+vat;

  document.getElementById("quoteTotalHT").textContent=totalHT.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  const showVat=vat>0;
  document.getElementById("quoteTvaRow").hidden=!showVat;
  document.getElementById("quoteTtcRow").hidden=!showVat;
  if(showVat){
    const vatPctLabel=vatLaborOn&&vatProduitOn?"20%":vatLaborOn?"20% sur main-d'œuvre":"20% sur produits";
    document.getElementById("quoteTvaLabel").textContent=`TVA (${vatPctLabel})`;
    document.getElementById("quoteTva").textContent=vat.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
    document.getElementById("quoteTotalTTC").textContent=totalTTC.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  }
  return {totalHT,laborHT,produitHT,vat,totalTTC,vatLaborOn,vatProduitOn};
}
document.getElementById("vatLaborToggle").addEventListener("change",updateQuoteTotal);
document.getElementById("vatProduitToggle").addEventListener("change",updateQuoteTotal);
document.getElementById("addItem").addEventListener("click",()=>addQuoteItem());
addQuoteItem();
updateQtyLabel();

function buildQuotePdf(data){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:"pt",format:"a4"});
  const pageW=doc.internal.pageSize.getWidth();
  const pageH=doc.internal.pageSize.getHeight();
  const margin=48;
  const TEAL=[25,217,180];
  const DARK=[20,28,38];
  const MUTED=[110,120,130];
  const contentBottom=pageH-70;
  const fmtNum=(n,decimals)=>{
    n=Math.round((+n||0)*Math.pow(10,decimals))/Math.pow(10,decimals);
    const neg=n<0; n=Math.abs(n);
    const parts=n.toFixed(decimals).split(".");
    let intPart=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g," ");
    return (neg?"-":"")+intPart+(parts[1]!==undefined?","+parts[1]:"");
  };
  const fmtMoney=n=>fmtNum(n,2)+" €";
  const colTotal=pageW-margin-8;
  const colTva=colTotal-75;
  const colPrice=colTva-40;
  const colUnit=colPrice-90;
  const colQty=colUnit-55;
  const descRight=colQty-16;
  let y=64;

  function drawTableHeader(){
    doc.setFillColor(TEAL[0],TEAL[1],TEAL[2]);
    doc.rect(margin,y,pageW-margin*2,24,"F");
    doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(8.5);
    doc.text("DÉSIGNATION",margin+10,y+16);
    doc.text("QUANTITÉ",colQty,y+16,{align:"right"});
    doc.text("UNITÉ",colUnit,y+16,{align:"right"});
    doc.text("PRIX UNITAIRE",colPrice,y+16,{align:"right"});
    doc.text("TVA",colTva,y+16,{align:"right"});
    doc.text("MONTANT HT",colTotal,y+16,{align:"right"});
    y+=24;
  }

  function drawLetterhead(){
    const fullClientName=[data.clientFirstName,data.clientName].filter(Boolean).join(" ");
    const logoW=140,logoH=logoW*(116/473);
    doc.addImage(AMDNA_LOGO_PDF,"PNG",margin,y-30,logoW,logoH);
    doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(MUTED[0],MUTED[1],MUTED[2]);
    doc.text("Entreprise individuelle AM Detailing Nautic & Auto",margin,y-30+logoH+16);

    let cy=y-22;
    doc.setFont("helvetica","bold");doc.setFontSize(10.5);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
    doc.text(fullClientName,pageW-margin,cy,{align:"right"});cy+=14;
    doc.setFont("helvetica","normal");doc.setFontSize(9.5);doc.setTextColor(60,70,80);
    if(data.clientAddress){
      String(data.clientAddress).split("\n").forEach(line=>{
        if(line.trim()){doc.text(line,pageW-margin,cy,{align:"right"});cy+=13;}
      });
    }
    if(data.clientPhone){doc.text(data.clientPhone,pageW-margin,cy,{align:"right"});cy+=13;}
    if(data.clientEmail){doc.text(data.clientEmail,pageW-margin,cy,{align:"right"});cy+=13;}

    y=Math.max(y-30+logoH+16,cy)+28;

    doc.setFont("helvetica","bold");doc.setFontSize(13);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
    doc.text(`Devis N° ${data.number||""}`,margin,y);
    y+=20;
    doc.setFont("helvetica","normal");doc.setFontSize(9.5);doc.setTextColor(MUTED[0],MUTED[1],MUTED[2]);
    doc.text(`Date d'émission : ${new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date())}`,margin,y);
    doc.text("Période de validité : 30 jours",pageW-margin,y,{align:"right"});
    y+=22;
  }

  const unitFor=item=>item.type==="produit"?"articles":(data.service==="nautic"?"jours":"heures");
  const vatPctFor=item=>item.type==="produit"?(data.vatProduit?20:0):(data.vatLabor?20:0);
  const num2=n=>fmtNum(n,2);

  drawLetterhead();
  drawTableHeader();
  doc.setTextColor(DARK[0],DARK[1],DARK[2]);

  data.items.forEach(item=>{
    const detailLines=item.detail?doc.splitTextToSize(item.detail,descRight-(margin+10)):[];
    const rowH=20+detailLines.length*11+8;
    if(y+rowH>contentBottom){
      doc.addPage();
      y=64;
      doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
      doc.text(`Devis N° ${data.number||""} (suite)`,margin,y);
      y+=22;
      drawTableHeader();
      doc.setTextColor(DARK[0],DARK[1],DARK[2]);
    }
    doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
    doc.text(item.desc||"—",margin+10,y+13);
    doc.setFont("helvetica","normal");doc.setFontSize(9.5);
    doc.text(num2(item.qty),colQty,y+13,{align:"right"});
    doc.text(unitFor(item),colUnit,y+13,{align:"right"});
    doc.text(num2(item.price),colPrice,y+13,{align:"right"});
    doc.text(vatPctFor(item)+"%",colTva,y+13,{align:"right"});
    doc.setFont("helvetica","bold");
    doc.text(num2(item.qty*item.price),colTotal,y+13,{align:"right"});
    if(detailLines.length){
      doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(MUTED[0],MUTED[1],MUTED[2]);
      doc.text(detailLines,margin+10,y+27);
      doc.setTextColor(DARK[0],DARK[1],DARK[2]);
    }
    y+=rowH;
    doc.setDrawColor(230,232,235);
    doc.line(margin,y-4,pageW-margin,y-4);
  });

  y+=14;
  if(y+70>contentBottom){doc.addPage();y=64;}
  doc.setDrawColor(220,224,228);doc.line(margin,y,pageW-margin,y);
  y+=22;
  doc.setFont("helvetica","bold");doc.setFontSize(12);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
  doc.text(`Total HT : ${fmtMoney(data.total)}`,pageW-margin,y,{align:"right"});

  const vatAmount=data.vatAmount||0;
  if(vatAmount>0){
    y+=18;
    const vatLabel=data.vatLabor&&data.vatProduit?"TVA (20%)":data.vatLabor?"TVA (20% main-d'œuvre)":"TVA (20% produits)";
    doc.setFont("helvetica","normal");doc.setFontSize(10.5);
    doc.text(`${vatLabel} : ${fmtMoney(vatAmount)}`,pageW-margin,y,{align:"right"});
    y+=20;
    doc.setFont("helvetica","bold");doc.setFontSize(13);
    doc.text(`Total TTC : ${fmtMoney(data.totalTTC||data.total)}`,pageW-margin,y,{align:"right"});
  }
  y+=26;
  if(vatAmount===0){
    doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(MUTED[0],MUTED[1],MUTED[2]);
    doc.text("TVA non applicable, art. 293 B du CGI.",margin,y);
    y+=20;
  }

  if(data.notes){
    const noteLines=doc.splitTextToSize(data.notes,pageW-margin*2);
    if(y+noteLines.length*12+20>contentBottom){doc.addPage();y=64;}
    doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(90,100,110);
    doc.text(noteLines,margin,y);
    y+=noteLines.length*12+20;
  }

  if(y+50>contentBottom){doc.addPage();y=64;}
  doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(DARK[0],DARK[1],DARK[2]);
  doc.text("Pour être accepté, le devis doit être daté, signé et suivi de la mention manuscrite « Bon pour accord ».",margin,y);
  y+=26;
  doc.text("Signature du client :",margin,y);

  const totalPages=doc.internal.getNumberOfPages();
  for(let p=1;p<=totalPages;p++){
    doc.setPage(p);
    doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(MUTED[0],MUTED[1],MUTED[2]);
    doc.text(`Page ${p}/${totalPages}`,pageW/2,pageH-30,{align:"center"});
  }

  return doc;
}

document.getElementById("downloadQuote").addEventListener("click",()=>{
  const data=collectQuoteFormData();
  if(!data.clientName){alert("Merci d'indiquer le nom du client.");return}
  const doc=buildQuotePdf(data);
  doc.save(`Devis-AMDNA-${data.clientName.replace(/\s+/g,"-")}.pdf`);
});

function collectQuoteFormData(){
  const totals=updateQuoteTotal();
  return {
    clientName:document.getElementById("qClientName").value,
    clientFirstName:document.getElementById("qClientFirstName").value,
    number:document.getElementById("qNumber").value,
    clientEmail:document.getElementById("qClientEmail").value,
    clientPhone:document.getElementById("qClientPhone").value,
    clientAddress:document.getElementById("qClientAddress").value,
    service:document.getElementById("qService").value,
    notes:document.getElementById("qNotes").value,
    items:getQuoteItems(),
    total:totals.totalHT,
    vatLabor:totals.vatLaborOn,
    vatProduit:totals.vatProduitOn,
    vatAmount:totals.vat,
    totalTTC:totals.totalTTC
  };
}

let editingQuoteId=null;

document.getElementById("saveQuote").addEventListener("click",async()=>{
  const data=collectQuoteFormData();
  if(!data.clientName){alert("Merci d'indiquer le nom du client.");return}
  if(!supabase){alert("Supabase non configuré.");return}
  const payload={
    quote_number:data.number||null, client_name:data.clientName, client_first_name:data.clientFirstName||null, client_email:data.clientEmail||null,
    client_phone:data.clientPhone||null, client_address:data.clientAddress||null,
    service:data.service, items:data.items, total:data.total, notes:data.notes||null,
    vat_labor:data.vatLabor, vat_produit:data.vatProduit, vat_amount:data.vatAmount, total_ttc:data.totalTTC
  };
  let error;
  if(editingQuoteId){
    ({error}=await supabase.from("quotes").update(payload).eq("id",editingQuoteId));
  }else{
    ({error}=await supabase.from("quotes").insert(payload));
  }
  if(error){alert("Erreur lors de l'enregistrement.");console.warn(error);return}
  await upsertClientFromQuote(data);
  const wasEditing=!!editingQuoteId;
  cancelEditQuote();
  loadQuotesHistory();loadRevenue();loadClientsDb();
  alert(wasEditing?"Devis mis à jour.":"Devis enregistré.");
});

async function upsertClientFromQuote(data){
  if(!supabase) return;
  const nameTrim=(data.clientName||"").trim();
  if(!nameTrim) return;
  const firstTrim=(data.clientFirstName||"").trim();
  try{
    let query=supabase.from("clients").select("id").ilike("name",nameTrim);
    query=firstTrim?query.ilike("first_name",firstTrim):query.is("first_name",null);
    const {data:existing,error:findError}=await query.limit(1);
    if(findError) throw findError;
    const payload={
      name:nameTrim, first_name:firstTrim||null,
      email:data.clientEmail||null, phone:data.clientPhone||null, address:data.clientAddress||null,
      updated_at:new Date().toISOString()
    };
    if(existing&&existing.length){
      await supabase.from("clients").update(payload).eq("id",existing[0].id);
    }else{
      await supabase.from("clients").insert({...payload,payment_status:"unpaid"});
    }
  }catch(err){
    console.warn("Base clients indisponible (relance supabase/schema.sql) :",err);
  }
}

async function loadClientsDb(){
  const listEl=document.getElementById("clientsDbList");
  const emptyEl=document.getElementById("clientsDbEmpty");
  if(!supabase||!listEl) return;
  const {data,error}=await supabase.from("clients").select("*").order("updated_at",{ascending:false});
  if(error){console.warn("Impossible de charger la base clients (relance supabase/schema.sql) :",error);listEl.innerHTML="";emptyEl.hidden=false;return}
  listEl.innerHTML="";
  if(!data||!data.length){emptyEl.hidden=false;return}
  emptyEl.hidden=true;
  data.forEach(c=>{
    const card=document.createElement("div");card.className="client-db-card";
    const fullName=[c.first_name,c.name].filter(Boolean).join(" ");
    const contactBits=[c.email,c.phone,c.address].filter(Boolean).join(" · ");
    card.innerHTML=`
      <div><div class="cdb-name">${escapeHtml(fullName)}</div>${contactBits?`<div class="cdb-contact">${escapeHtml(contactBits)}</div>`:""}</div>
      <div class="client-db-status"></div>
    `;
    const statusWrap=card.querySelector(".client-db-status");
    [["unpaid","Impayé","rejected"],["deposit","Acompte versé","deposit"],["paid","Payé","accepted"]].forEach(([val,label,cls])=>{
      const b=document.createElement("button");
      b.type="button";b.className="status-btn "+cls+(c.payment_status===val?" active":"");
      b.textContent=label;
      b.addEventListener("click",async()=>{
        const {error:updErr}=await supabase.from("clients").update({payment_status:val,updated_at:new Date().toISOString()}).eq("id",c.id);
        if(updErr){alert("Erreur lors de la mise à jour du statut.");console.warn(updErr);return}
        loadClientsDb();
      });
      statusWrap.appendChild(b);
    });
    listEl.appendChild(card);
  });
}
document.getElementById("refreshClientsDb").addEventListener("click",loadClientsDb);

async function generateNextQuoteNumber(){
  if(!supabase) return "";
  const year=new Date().getFullYear();
  const prefix=`DEV-${year}-`;
  const {data}=await supabase.from("quotes").select("quote_number").ilike("quote_number",prefix+"%");
  let max=0;
  (data||[]).forEach(q=>{
    const m=(q.quote_number||"").match(/^DEV-\d{4}-(\d+)$/);
    if(m) max=Math.max(max,parseInt(m[1],10));
  });
  return prefix+String(max+1).padStart(3,"0");
}
async function refreshQuoteNumber(){
  const field=document.getElementById("qNumber");
  field.value=await generateNextQuoteNumber()||field.value;
}

function cancelEditQuote(){
  editingQuoteId=null;
  document.getElementById("saveQuote").textContent="Enregistrer le devis";
  document.getElementById("editQuoteBanner").hidden=true;
  document.getElementById("qClientName").value="";
  document.getElementById("qClientFirstName").value="";
  document.getElementById("qClientEmail").value="";
  document.getElementById("qClientPhone").value="";
  document.getElementById("qClientAddress").value="";
  const laborT=document.getElementById("vatLaborToggle");
  const produitT=document.getElementById("vatProduitToggle");
  laborT.checked=!laborT.disabled;
  produitT.checked=!produitT.disabled;
  quoteItemsEl.innerHTML="";
  addQuoteItem();
  updateQuoteTotal();
  refreshQuoteNumber();
}
document.getElementById("cancelEditQuote").addEventListener("click",cancelEditQuote);

function loadQuoteIntoForm(q){
  editingQuoteId=q.id;
  document.getElementById("qClientName").value=q.client_name||"";
  document.getElementById("qClientFirstName").value=q.client_first_name||"";
  document.getElementById("qNumber").value=q.quote_number||"—";
  document.getElementById("qClientEmail").value=q.client_email||"";
  document.getElementById("qClientPhone").value=q.client_phone||"";
  document.getElementById("qClientAddress").value=q.client_address||"";
  document.getElementById("qService").value=q.service||"nautic";
  document.getElementById("qNotes").value=q.notes||"";
  updateQtyLabel();
  quoteItemsEl.innerHTML="";
  (q.items&&q.items.length?q.items:[{}]).forEach(item=>{
    addQuoteItem(item.desc||"",item.qty||1,item.price||0,item.detail||"",item.type||"labor");
  });
  const laborToggle=document.getElementById("vatLaborToggle");
  const produitToggle=document.getElementById("vatProduitToggle");
  if(!laborToggle.disabled) laborToggle.checked=!!q.vat_labor;
  if(!produitToggle.disabled) produitToggle.checked=!!q.vat_produit;
  updateQuoteTotal();
  document.getElementById("saveQuote").textContent="Mettre à jour le devis";
  document.getElementById("editQuoteBanner").hidden=false;
  document.getElementById("qClientName").scrollIntoView({behavior:"smooth",block:"start"});
}

async function loadQuotesHistory(){
  if(!supabase) return;
  const {data,error}=await supabase.from("quotes").select("*").order("created_at",{ascending:false}).limit(30);
  const wrap=document.getElementById("quotesHistory");
  if(error||!data||!data.length){wrap.innerHTML='<p style="color:var(--muted);font-size:13px">Aucun devis enregistré.</p>';return}
  wrap.innerHTML="";
  data.forEach(q=>{
    const status=q.status||"pending";
    const hasVat=(+q.vat_amount||0)>0;
    const amountLabel=hasVat
      ?`${(+q.total_ttc).toLocaleString("fr-FR",{style:"currency",currency:"EUR"})} TTC`
      :`${(+q.total).toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}`;
    const el=document.createElement("div");el.className="quote-item";
    el.innerHTML=`
      <div class="quote-status-box ${status}">
        <span>Enregistré</span>
        <strong>${new Intl.DateTimeFormat("fr-FR",{dateStyle:"long"}).format(new Date(q.created_at))} — ${amountLabel}</strong>
      </div>
      <strong class="quote-client-name">${escapeHtml([q.client_first_name,q.client_name].filter(Boolean).join(" "))}</strong>
      <div class="quote-status-actions"></div>
    `;
    const actionsWrap=el.querySelector(".quote-status-actions");
    [["accepted","Accepté"],["pending","En attente"],["rejected","Refusé"]].forEach(([val,label])=>{
      const b=document.createElement("button");
      b.className="status-btn "+val+(status===val?" active":"");
      b.type="button";b.textContent=label;
      b.addEventListener("click",async()=>{
        const {error}=await supabase.from("quotes").update({status:val}).eq("id",q.id);
        if(error){alert("Impossible de mettre à jour le statut : "+error.message+"\n\nIl faut probablement relancer le script supabase/schema.sql dans Supabase (SQL Editor) pour ajouter la colonne manquante.");console.warn(error);return}
        loadQuotesHistory();loadRevenue();
      });
      actionsWrap.appendChild(b);
    });
    const dl=document.createElement("button");
    dl.className="btn-ghost small";dl.style.marginTop="10px";dl.textContent="Télécharger à nouveau";
    dl.addEventListener("click",()=>{
      const doc=buildQuotePdf({
        clientName:q.client_name, clientFirstName:q.client_first_name, number:q.quote_number, clientEmail:q.client_email,
        clientPhone:q.client_phone, clientAddress:q.client_address, notes:q.notes,
        items:q.items||[], total:+q.total, service:q.service,
        vatAmount:+q.vat_amount||0, totalTTC:+q.total_ttc||+q.total, vatLabor:q.vat_labor, vatProduit:q.vat_produit
      });
      doc.save(`Devis-AMDNA-${q.client_name.replace(/\s+/g,"-")}.pdf`);
    });
    el.appendChild(dl);
    const editBtn=document.createElement("button");
    editBtn.className="btn-ghost small";editBtn.style.marginTop="10px";editBtn.style.marginLeft="8px";editBtn.textContent="Modifier";
    editBtn.addEventListener("click",()=>loadQuoteIntoForm(q));
    el.appendChild(editBtn);
    const delBtn=document.createElement("button");
    delBtn.className="btn-ghost small danger";delBtn.style.marginTop="10px";delBtn.style.marginLeft="8px";delBtn.textContent="Supprimer";
    delBtn.addEventListener("click",async()=>{
      if(!confirm(`Supprimer définitivement le devis de ${q.client_name} ?`))return;
      const {error}=await supabase.from("quotes").delete().eq("id",q.id);
      if(error){alert("Erreur lors de la suppression.");console.warn(error);return}
      loadQuotesHistory();loadRevenue();
    });
    el.appendChild(delBtn);
    wrap.appendChild(el);
  });
}

/* ---------------------------------------------------------
   Chiffre d'affaires
   --------------------------------------------------------- */
const MONTH_NAMES=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const revenueYearSel=document.getElementById("revenueYear");
let revenueData={labor:[],produit:[]};
let revenueCategory="labor";

async function loadRevenue(){
  if(!supabase) return;
  const [{data:quotes},{data:bookings}]=await Promise.all([
    supabase.from("quotes").select("items,created_at,status"),
    supabase.from("bookings").select("total_price,created_at,status").eq("status","confirmed")
  ]);
  const labor=[], produit=[];
  (quotes||[]).filter(q=>q.status==="accepted").forEach(q=>{
    (q.items||[]).forEach(item=>{
      const lineTotal=(+item.qty||0)*(+item.price||0);
      if(!lineTotal) return;
      (item.type==="produit"?produit:labor).push({amount:lineTotal,date:q.created_at});
    });
  });
  (bookings||[]).filter(b=>b.total_price).forEach(b=>labor.push({amount:+b.total_price||0,date:b.created_at}));
  revenueData={labor,produit};
  updateVatToggleAvailability();

  const allEntries=[...labor,...produit];
  const years=new Set(allEntries.map(e=>new Date(e.date).getFullYear()));
  years.add(new Date().getFullYear());
  const sortedYears=[...years].sort((a,b)=>b-a);
  const prevSelected=revenueYearSel.value;
  revenueYearSel.innerHTML=sortedYears.map(y=>`<option value="${y}">${y}</option>`).join("");
  revenueYearSel.value=sortedYears.includes(+prevSelected)?prevSelected:String(new Date().getFullYear());
  renderRevenue();
}
const REVENUE_THRESHOLDS={labor:83600,produit:203100};
const VAT_THRESHOLDS={labor:37500,produit:85800};

function updateVatToggleAvailability(){
  const year=new Date().getFullYear();
  const yearSum=cat=>(revenueData[cat]||[]).filter(e=>new Date(e.date).getFullYear()===year).reduce((s,e)=>s+e.amount,0);
  const laborTotal=yearSum("labor"), produitTotal=yearSum("produit");
  const laborToggle=document.getElementById("vatLaborToggle");
  const produitToggle=document.getElementById("vatProduitToggle");
  const laborEligible=laborTotal>=VAT_THRESHOLDS.labor;
  const produitEligible=produitTotal>=VAT_THRESHOLDS.produit;
  laborToggle.disabled=!laborEligible;
  produitToggle.disabled=!produitEligible;
  if(!laborEligible) laborToggle.checked=false;
  else laborToggle.checked=true;
  if(!produitEligible) produitToggle.checked=false;
  else produitToggle.checked=true;
  document.getElementById("vatLaborNote").textContent=laborEligible
    ?"Seuil de franchise en base de TVA atteint — TVA applicable sur la main-d'œuvre."
    :`S'active automatiquement à partir de 37 500 € de CA nettoyage sur l'année (actuellement ${laborTotal.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}).`;
  document.getElementById("vatProduitNote").textContent=produitEligible
    ?"Seuil de franchise en base de TVA atteint — TVA applicable sur les produits."
    :`S'active automatiquement à partir de 85 800 € de CA vente produit sur l'année (actuellement ${produitTotal.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}).`;
  updateQuoteTotal();
}

function renderRevenue(){
  const year=+revenueYearSel.value;
  const entries=revenueData[revenueCategory]||[];
  const totals=Array(12).fill(0);
  entries.forEach(e=>{
    const d=new Date(e.date);
    if(d.getFullYear()===year) totals[d.getMonth()]+=e.amount;
  });
  const grid=document.getElementById("revenueGrid");grid.innerHTML="";
  totals.forEach((v,i)=>{
    const cell=document.createElement("div");
    cell.className="revenue-month"+(v>0?" has-data":"");
    cell.innerHTML=`<div class="m">${MONTH_NAMES[i]}</div><div class="v">${v.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}</div>`;
    grid.appendChild(cell);
  });
  const yearTotal=totals.reduce((s,v)=>s+v,0);
  document.getElementById("revenueYearTotal").textContent=yearTotal.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  document.getElementById("revenueYearTotalLabel").textContent=revenueCategory==="produit"?"Total vente produit sur l'année":"Total nettoyage sur l'année";

  const threshold=REVENUE_THRESHOLDS[revenueCategory];
  const pct=Math.min(100,(yearTotal/threshold)*100);
  const fill=document.getElementById("revenueThresholdFill");
  fill.style.width=pct+"%";
  fill.classList.remove("warning","danger");
  if(yearTotal>=threshold) fill.classList.add("danger");
  else if(pct>=85) fill.classList.add("warning");
  document.getElementById("revenueThresholdText").textContent=
    `${yearTotal.toLocaleString("fr-FR",{maximumFractionDigits:0})} € / ${threshold.toLocaleString("fr-FR")} €`;
  document.getElementById("revenueThresholdMax").textContent=threshold.toLocaleString("fr-FR")+" €";

  const vatThreshold=VAT_THRESHOLDS[revenueCategory];
  const vatPct=Math.min(100,(yearTotal/vatThreshold)*100);
  const vatFill=document.getElementById("revenueVatFill");
  vatFill.style.width=vatPct+"%";
  vatFill.classList.remove("warning","danger");
  if(yearTotal>=vatThreshold) vatFill.classList.add("danger");
  else if(vatPct>=85) vatFill.classList.add("warning");
  document.getElementById("revenueVatText").textContent=
    `${yearTotal.toLocaleString("fr-FR",{maximumFractionDigits:0})} € / ${vatThreshold.toLocaleString("fr-FR")} €`;
  document.getElementById("revenueVatMax").textContent=vatThreshold.toLocaleString("fr-FR")+" €";
}
revenueYearSel.addEventListener("change",renderRevenue);
document.querySelectorAll('.calc-switch-btn[data-revenue]').forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll('.calc-switch-btn[data-revenue]').forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    revenueCategory=btn.dataset.revenue;
    renderRevenue();
  });
});

/* ---------------------------------------------------------
   Calcul des charges (main-d'œuvre / produit)
   --------------------------------------------------------- */
const LABOR_CHARGES=[
  {label:"Cotisations sociales URSSAF",pct:21.2},
  {label:"Impôt sur le revenu",pct:7},
  {label:"Formation professionnelle (CFP)",pct:0.3},
  {label:"Prévision",pct:1.5}
];
const PRODUCT_CHARGES=[
  {label:"Cotisations sociales URSSAF",pct:12.3},
  {label:"Impôt sur le revenu",pct:3},
  {label:"Formation professionnelle (CFP)",pct:0.1},
  {label:"Prévision",pct:2.6}
];
function setupCalc(prefix,charges){
  const totalPct=+charges.reduce((s,c)=>s+c.pct,0).toFixed(2);
  const table=document.getElementById(`calc${prefix}Table`);
  table.innerHTML=charges.map(c=>`<div class="calc-row"><span class="label">${c.label}</span><span class="pct">-${c.pct.toLocaleString("fr-FR")} %</span></div>`).join("")
    +`<div class="calc-row total"><span class="label">TOTAL</span><span class="pct">-${totalPct.toLocaleString("fr-FR")} %</span></div>`;
  const input=document.getElementById(`calc${prefix}Input`);
  const sideEl=document.getElementById(`calc${prefix}Side`);
  const profitEl=document.getElementById(`calc${prefix}Profit`);
  const detailEl=document.getElementById(`calc${prefix}SideDetail`);
  function update(){
    const amount=+input.value||0;
    const side=amount*totalPct/100;
    const profit=amount-side;
    sideEl.textContent=side.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
    profitEl.textContent=profit.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
    detailEl.innerHTML=charges.map(c=>{
      const v=amount*c.pct/100;
      return `<div><span>${c.label} (-${c.pct.toLocaleString("fr-FR")} %)</span><span>${v.toLocaleString("fr-FR",{style:"currency",currency:"EUR"})}</span></div>`;
    }).join("");
  }
  input.addEventListener("input",update);
  update();
}
setupCalc("Labor",LABOR_CHARGES);
setupCalc("Product",PRODUCT_CHARGES);

const vatTable=document.getElementById("calcVatTable");
vatTable.innerHTML=`<div class="calc-row total"><span class="label">TVA applicable</span><span class="pct" style="color:var(--accent)">+20 %</span></div>`;
const vatInput=document.getElementById("calcVatInput");
const vatAmountEl=document.getElementById("calcVatAmount");
const vatFinalEl=document.getElementById("calcVatFinal");
function updateVat(){
  const amountHT=+vatInput.value||0;
  const vat=amountHT*0.2;
  vatAmountEl.textContent=vat.toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
  vatFinalEl.textContent=(amountHT+vat).toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
}
vatInput.addEventListener("input",updateVat);
updateVat();

document.querySelectorAll(".calc-switch-btn[data-calc]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".calc-switch-btn[data-calc]").forEach(b=>b.classList.remove("active"));
    document.querySelectorAll(".calc-panel").forEach(p=>p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("calc-"+btn.dataset.calc).classList.add("active");
  });
});


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


