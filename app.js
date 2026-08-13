import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./supabase-config.js";

/* =========================================================
   AMDNA EXPERIENCE
   - Voir SETUP.md pour brancher Supabase (calendrier partagé,
     e-mail/SMS de confirmation, avis).
   ========================================================= */

const CONFIG = {
  // Créneaux manuels de secours si Supabase n'est pas encore configuré.
  blockedDates: [
    // "2026-08-12", "2026-08-15"
  ],
  hours: ["09:00", "11:00", "14:00", "16:00"]
};

const SUPABASE_READY = SUPABASE_URL && !SUPABASE_URL.includes("VOTRE_") && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes("VOTRE_");
const supabase = SUPABASE_READY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
if (!SUPABASE_READY) {
  console.warn("Supabase n'est pas configuré (supabase-config.js) — le site fonctionne en mode démo local uniquement. Voir SETUP.md.");
}

/* ---------------------------------------------------------
   Fonds photo (yacht → auto), fondu croisé synchronisé au scroll
   --------------------------------------------------------- */
const yachtSceneEl=document.getElementById("yachtScene");
const autoSceneEl=document.getElementById("autoScene");
const autoEl=document.getElementById("auto");

let ticking=false;
let lastProgress=-1;
let startScroll=0, endScroll=1;
function clamp01(v){return Math.min(1,Math.max(0,v))}

function measureScenes(){
  const vh=innerHeight;
  endScroll=autoEl.offsetTop;
  startScroll=endScroll - vh*0.9;
}
function updateScenes(){
  ticking=false;
  const progress=clamp01((scrollY-startScroll)/(endScroll-startScroll));
  const rounded=+progress.toFixed(2);
  if(rounded!==lastProgress){
    yachtSceneEl.style.opacity=String(1-rounded);
    autoSceneEl.style.opacity=String(rounded);
    lastProgress=rounded;
  }
}
function onScroll(){
  if(!ticking){ requestAnimationFrame(updateScenes); ticking=true; }
}
addEventListener("scroll",onScroll,{passive:true});
addEventListener("resize",()=>{ measureScenes(); onScroll(); });
measureScenes();
updateScenes();
addEventListener("load",()=>setTimeout(()=>document.getElementById("loader").classList.add("done"),500));

/* ---------------------------------------------------------
   Animation "reveal" au scroll sur les textes
   --------------------------------------------------------- */
function initReveal(){
  const revealItems=document.querySelectorAll("[data-reveal]");
  if("IntersectionObserver" in window && revealItems.length){
    const revealObserver=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },{threshold:.15,rootMargin:"0px 0px -6% 0px"});
    revealItems.forEach(el=>revealObserver.observe(el));
  }else{
    revealItems.forEach(el=>el.classList.add("in-view"));
  }
}
// Démarré juste après la disparition du loader, pour que le hero
// se révèle réellement sous les yeux du visiteur (et pas pendant
// le chargement, invisible).
setTimeout(initReveal,650);

/* ---------------------------------------------------------
   Menu nav (bouton "2 barres")
   --------------------------------------------------------- */
const menuBtn=document.getElementById("menuBtn");
const mainNav=document.getElementById("mainNav");
menuBtn.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuBtn.classList.toggle("open",open);
});
mainNav.querySelectorAll("a.nav-link").forEach(a=>a.addEventListener("click",()=>{
  mainNav.classList.remove("open");menuBtn.classList.remove("open");
}));
document.addEventListener("click",e=>{
  if(mainNav.classList.contains("open") && !mainNav.contains(e.target) && e.target!==menuBtn && !menuBtn.contains(e.target)){
    mainNav.classList.remove("open");menuBtn.classList.remove("open");
  }
});

/* ---------------------------------------------------------
   Popup contact
   --------------------------------------------------------- */
const contactPopup=document.getElementById("contactPopup");
document.getElementById("openContact").addEventListener("click",()=>{
  mainNav.classList.remove("open");menuBtn.classList.remove("open");
  contactPopup.classList.add("open");contactPopup.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
});
document.querySelectorAll(".close-contact").forEach(el=>el.addEventListener("click",()=>{
  contactPopup.classList.remove("open");contactPopup.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}));

/* ---------------------------------------------------------
   Effet ripple sur les boutons pill (survol + clic)
   --------------------------------------------------------- */
function spawnRipple(btn,x,y){
  const rect=btn.getBoundingClientRect();
  const size=Math.max(rect.width,rect.height)*1.15;
  const circle=document.createElement("span");
  circle.className="ripple-circle";
  circle.style.width=circle.style.height=size+"px";
  circle.style.left=(x-rect.left-size/2)+"px";
  circle.style.top=(y-rect.top-size/2)+"px";
  btn.appendChild(circle);
  circle.addEventListener("animationend",()=>circle.remove());
}
document.querySelectorAll(".pill-button").forEach(btn=>{
  btn.addEventListener("mouseenter",e=>spawnRipple(btn,e.clientX,e.clientY));
  btn.addEventListener("click",e=>spawnRipple(btn,e.clientX,e.clientY));
});
document.querySelectorAll(".service-card").forEach(card=>{
  card.addEventListener("mouseenter",e=>spawnRipple(card,e.clientX,e.clientY));
  card.addEventListener("click",e=>spawnRipple(card,e.clientX,e.clientY));
});

/* ---------------------------------------------------------
   Popup détail prestation
   --------------------------------------------------------- */
const SERVICE_DETAILS={
  exterieur:{
    title:"Lavage extérieur",
    price:"À PARTIR DE 35€",
    text:"Le service de lavage extérieur commence par un nettoyage minutieux des jantes, suivi d'un démoustiquage complet de la carrosserie. Un lavage haute pression au karcher est appliqué, puis le véhicule est brossé pour éliminer les résidus avant un rinçage à l'eau claire puis un autre rinçage avec un produit autoséchant. Après séchage naturel, une raclette est utilisée, suivie d'un essuyage précis des contours des portes et du coffre. Enfin, les vitres sont nettoyées et un brillant plastique est appliqué."
  },
  interieur:{
    title:"Lavage intérieur",
    price:"À PARTIR DE 105€",
    text:"Notre lavage intérieur comprend un désincrustage complet des tapis et moquettes, un nettoyage approfondi des plastiques, un brossage des sièges avec injection-extraction, une finition soignée des plastiques et chromes, un nettoyage des vitres, et un parfum final pour une ambiance fraîche."
  },
  integral:{
    title:"Lavage intégral",
    price:"À PARTIR DE 140€",
    text:"Notre lavage intégral offre une prise en charge minutieuse de votre véhicule, à l'intérieur comme à l'extérieur. À l'extérieur, nous commençons par un nettoyage précis des jantes, un démoustiquage complet de la carrosserie, suivi d'un lavage haute pression et d'un brossage soigneux. Après un rinçage à l'eau claire et un traitement autoséchant, la carrosserie est essuyée et chaque contour est nettoyé avec précision, et un brillant plastique final sublime les détails. À l'intérieur, nous réalisons un désincrustage complet des tapis et moquettes, un nettoyage approfondi des plastiques, un brossage des sièges avec injection-extraction, ainsi qu'une finition des chromes et plastiques. Les vitres sont nettoyées et une touche parfumée apporte une ambiance fraîche. Avec notre prestation, votre voiture retrouve une brillance et un confort complets."
  },
  protection:{
    title:"Protection & finition",
    price:"À PARTIR DE 20€",
    text:"Un traitement de surface appliqué à la main pour sublimer la carrosserie et renforcer sa protection. Il apporte une finition brillante et lisse tout en créant un effet déperlant : l'eau forme des perles et s'évacue rapidement, limitant les traces et facilitant l'entretien. Il contribue également à protéger la carrosserie des agressions extérieures et des pluies acides, pour une surface plus propre, plus brillante et plus facile à entretenir."
  }
};
const serviceDetailPopup=document.getElementById("serviceDetailPopup");
document.querySelectorAll("[data-open-service]").forEach(el=>{
  el.addEventListener("click",()=>{
    const d=SERVICE_DETAILS[el.dataset.openService];
    if(!d) return;
    document.getElementById("serviceDetailPrice").textContent=d.price;
    document.getElementById("serviceDetailTitle").textContent=d.title;
    document.getElementById("serviceDetailText").textContent=d.text;
    document.getElementById("serviceDetailBook").dataset.subService=el.dataset.openService;
    serviceDetailPopup.classList.add("open");serviceDetailPopup.setAttribute("aria-hidden","false");
    document.body.classList.add("modal-open");
  });
});
document.querySelectorAll(".close-service-detail").forEach(el=>el.addEventListener("click",()=>{
  serviceDetailPopup.classList.remove("open");serviceDetailPopup.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}));
document.getElementById("serviceDetailBook").addEventListener("click",()=>{
  serviceDetailPopup.classList.remove("open");serviceDetailPopup.setAttribute("aria-hidden","true");
});

/* ---------------------------------------------------------
   Carrousel des prestations (04)
   --------------------------------------------------------- */
const serviceGrid=document.getElementById("serviceGrid");
function scrollServices(dir){
  const card=serviceGrid.querySelector(".service-card");
  const step=card?card.getBoundingClientRect().width+18:340;
  serviceGrid.scrollBy({left:dir*step,behavior:"smooth"});
}
document.getElementById("servicesPrev").addEventListener("click",()=>scrollServices(-1));
document.getElementById("servicesNext").addEventListener("click",()=>scrollServices(1));

/* ---------------------------------------------------------
   Booking modal
   --------------------------------------------------------- */
const modal=document.getElementById("bookingModal");
const form=document.getElementById("bookingForm");
const calendarStep=document.getElementById("calendarStep");
const successStep=document.getElementById("successStep");
const bookingTitle=document.getElementById("bookingTitle");
const bookingHead=document.getElementById("bookingHead");
const bookingService=document.getElementById("bookingService");
const visitCheck=document.getElementById("visitCheck");
const serviceSelectStep=document.getElementById("serviceSelectStep");
const protectionOptionsStep=document.getElementById("protectionOptionsStep");
const vehicleCategoryStep=document.getElementById("vehicleCategoryStep");
const supplementsStep=document.getElementById("supplementsStep");
const boatTypeWrap=document.getElementById("boatTypeWrap");
const assetInput=document.getElementById("assetInput");
const locationInput=document.getElementById("locationInput");
const photosLabel=document.getElementById("photosLabel");

let service="nautic", currentMonth=new Date(new Date().getFullYear(),new Date().getMonth(),1), selectedDate=null, selectedTime=null, bookingData=null;
let scrollPositionBeforeModal=0;
let takenSlots=[]; // ["2026-08-14|11:00", ...]
let blockedDatesRemote=[]; // ["2026-08-14", ...]
let selectedSubService=null;
let selectedSupplements=new Set();

// Prestations auto disponibles à la réservation (avec suppléments associés)
const AUTO_SERVICES={
  exterieur:{title:"Lavage extérieur",price:35,supplements:["destiquage","resine"]},
  interieur:{title:"Lavage intérieur",price:105,supplements:["shampooing","poils","sableterre","plastique"]},
  integral:{title:"Lavage intégral",price:140,supplements:["destiquage","resine","shampooing","poils","sableterre","plastique"]},
  protection:{title:"Protection & finition",price:20,supplements:[]}
};
const SUPPLEMENTS={
  destiquage:{label:"Déstiquage",price:15,desc:"Offrez à votre voiture une finition parfaite avec notre service de déstiquage. Nous utilisons des lames spéciales adaptées à la carrosserie ou aux vitres, permettant de retirer les autocollants tenaces sans abîmer la surface. Chaque résidu de colle est minutieusement enlevé, laissant une carrosserie et des vitres impeccables, sans aucune trace."},
  resine:{label:"Résine",price:15,desc:"Élimination de la résine d'arbre. Ce traitement permet de retirer toute trace de résine collée sur la carrosserie, pour une finition impeccable et protégée."},
  shampooing:{label:"Shampooing moquettes",price:30,desc:"Shampooing en profondeur des moquettes."},
  poils:{label:"Poils d'animaux",price:25,desc:"Ajoutez notre supplément anti-poils d'animaux. Ce traitement permet de retirer efficacement les poils incrustés sur les tapis et moquettes, idéal pour les véhicules très sales ou ayant des animaux."},
  sableterre:{label:"Sable & terre",price:25,desc:"Ajoutez notre supplément anti-sable et terre. Ce traitement est conçu pour éliminer efficacement le sable et la terre incrustés sur les tapis et moquettes. Idéal après la plage ou une sortie en nature, il garantit un intérieur impeccable et sans résidus."},
  plastique:{label:"Traitement plastique intérieur",price:25,desc:"Notre traitement des plastiques est spécialement adapté aux 4x4, vans et utilitaires. Il protège durablement les plastiques situés au sol, empêchant l'usure, la décoloration, et gardant un aspect brillant et neuf."}
};

// Options du traitement "Protection & finition" — nécessitent toujours un
// lavage extérieur en base (voir requireWashPopup dans le flux de réservation).
const PROTECTION_OPTIONS={
  deperlant:{
    label:"Traitement Effet Déperlant",
    price:20,
    duration:"Durée de protection : 2 à 4 semaines",
    desc:"Offrez à votre carrosserie un effet déperlant intense grâce à notre traitement de surface appliqué à la main. Le traitement crée une surface hydrophobe sur la carrosserie : l'eau forme instantanément de petites perles et s'évacue plus facilement, réduisant ainsi la présence d'eau stagnante et les traces liées à l'humidité. En plus de son effet visuel spectaculaire sous la pluie ou lors du lavage, il facilite l'entretien quotidien en permettant à l'eau et aux impuretés de moins adhérer à la surface."
  },
  brillance:{
    label:"Traitement Carrosserie — Brillance & Protection",
    price:60,
    duration:"Durée de protection : 4 à 7 semaines",
    desc:"Offrez à votre carrosserie une brillance intense et une protection renforcée grâce à notre traitement protecteur appliqué à la main. Après une préparation minutieuse, le produit est appliqué uniformément sur la carrosserie, puis travaillé et lissé à la microfibre afin d'obtenir une finition parfaitement homogène, brillante et sans traces. Le traitement crée une protection de surface hydrophobe qui apporte un véritable effet déperlant : l'eau forme des perles à la surface et s'évacue plus facilement, limitant ainsi les traces d'eau et l'accumulation de contaminants. Il contribue également à protéger la carrosserie contre les agressions extérieures, notamment les pluies acides et les résidus environnementaux. Le résultat : une carrosserie plus brillante, plus lisse et visiblement sublimée, avec un effet déperlant marqué et une surface plus facile à entretenir au quotidien."
  }
};
let selectedProtectionOption=null;
let selectedLocationMode=null; // "centre" | "domicile" | null
const CENTER_ADDRESS="8, impasse de la Petite Fontaine, 83136 La Roquebrussanne";

// ---- Gabarit du véhicule : supplément de prix selon la prestation ----
let selectedVehicleCategory=null;
const CATEGORY_LABELS={citadine:"Citadine",berline:"Berline",suv:"SUV","4x4":"4x4",utilitaire:"Utilitaire"};
const CATEGORY_SURCHARGE={
  exterieur:{citadine:0,berline:5,suv:20,"4x4":25,utilitaire:25},
  interieur:{citadine:0,berline:15,suv:35,"4x4":45,utilitaire:45},
  integral:{citadine:0,berline:10,suv:40,"4x4":45,utilitaire:45}
};
// Aucun supplément 4x4/utilitaire pour les options protection (confirmé).
const PROTECTION_CATEGORY_SURCHARGE={
  deperlant:{citadine:0,berline:5,suv:10,"4x4":0,utilitaire:0},
  brillance:{citadine:0,berline:10,suv:20,"4x4":0,utilitaire:0}
};
const CAR_ICONS={
  citadine:'<img src="assets/vehicles/citadine.png" alt="Citadine" loading="lazy">',
  berline:'<img src="assets/vehicles/berline.png" alt="Berline" loading="lazy">',
  suv:'<img src="assets/vehicles/suv.png" alt="SUV" loading="lazy">',
  "4x4":'<img src="assets/vehicles/4x4.png" alt="4x4" loading="lazy">',
  utilitaire:'<img src="assets/vehicles/utilitaire.png" alt="Utilitaire" loading="lazy">'
};

function categorySurchargeFor(cat){
  let extra=0;
  if(selectedSubService && CATEGORY_SURCHARGE[selectedSubService]) extra+=CATEGORY_SURCHARGE[selectedSubService][cat]||0;
  if(selectedProtectionOption && PROTECTION_CATEGORY_SURCHARGE[selectedProtectionOption]) extra+=PROTECTION_CATEGORY_SURCHARGE[selectedProtectionOption][cat]||0;
  return extra;
}
function renderVehicleCategoryStep(){
  const wrap=document.getElementById("vehicleCategoryList");wrap.innerHTML="";
  Object.keys(CATEGORY_LABELS).forEach(cat=>{
    const extra=categorySurchargeFor(cat);
    const btn=document.createElement("button");
    btn.type="button";btn.className="category-pick";
    btn.innerHTML=`${CAR_ICONS[cat]}<span class="cat-name">${CATEGORY_LABELS[cat]}</span><span class="cat-extra">${extra>0?"+"+extra+" €":"Inclus"}</span>`;
    btn.addEventListener("click",()=>{
      selectedVehicleCategory=cat;
      vehicleCategoryStep.hidden=true;
      renderSupplements();supplementsStep.hidden=false;
    });
    wrap.appendChild(btn);
  });
}

function renderLocationChoice(){
  const wrap=document.getElementById("locationChoiceWrap");
  if(!wrap) return;
  if(selectedSubService==="interieur"||selectedSubService==="integral"){
    selectedLocationMode="centre";
    wrap.innerHTML=`<div class="location-note">📍 Cette prestation se déroule exclusivement à notre centre :<strong>${CENTER_ADDRESS}</strong></div>`;
  }else if(selectedSubService==="exterieur"){
    wrap.innerHTML=`<p class="location-label">Où souhaitez-vous être servi ?</p>
      <div class="location-pick">
        <button type="button" class="location-btn" data-loc="centre">Au centre<span>${CENTER_ADDRESS}</span></button>
        <button type="button" class="location-btn" data-loc="domicile">À domicile<span>Nous nous déplaçons chez vous</span></button>
      </div>`;
    wrap.querySelectorAll(".location-btn").forEach(btn=>{
      btn.addEventListener("click",()=>{
        selectedLocationMode=btn.dataset.loc;
        wrap.querySelectorAll(".location-btn").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  }else{
    wrap.innerHTML="";
    selectedLocationMode=null;
  }
}

// Liste indicative de marques / modèles pour l'auto-complétion (non exhaustive :
// couvre les marques les plus courantes dans le monde, ajoutez-en librement ci-dessous).
const VEHICLE_DB={
  "Renault":["Clio","Captur","Megane","Scenic","Kadjar","Talisman","Twingo","Austral"],
  "Peugeot":["208","308","2008","3008","5008","508","108"],
  "Citroën":["C3","C4","C5 Aircross","Berlingo","C1"],
  "DS Automobiles":["DS3","DS4","DS7"],
  "Volkswagen":["Golf","Polo","Tiguan","Passat","T-Roc","ID.3","ID.4"],
  "BMW":["Série 1","Série 3","Série 5","X1","X3","X5"],
  "Mercedes-Benz":["Classe A","Classe C","Classe E","GLA","GLC","GLE"],
  "Audi":["A1","A3","A4","Q2","Q3","Q5"],
  "Toyota":["Yaris","Corolla","C-HR","RAV4","Aygo"],
  "Honda":["Civic","CR-V","Jazz","HR-V"],
  "Nissan":["Micra","Qashqai","Juke","X-Trail"],
  "Ford":["Fiesta","Focus","Puma","Kuga"],
  "Opel":["Corsa","Astra","Crossland","Grandland"],
  "Fiat":["500","Panda","Tipo","500X"],
  "Volvo":["XC40","XC60","XC90","V60"],
  "Škoda":["Fabia","Octavia","Kamiq","Karoq"],
  "SEAT":["Ibiza","Leon","Arona","Ateca"],
  "Hyundai":["i10","i20","Tucson","Kona"],
  "Kia":["Picanto","Rio","Sportage","Niro"],
  "Mazda":["2","3","CX-3","CX-5"],
  "Mitsubishi":["Space Star","ASX","Outlander"],
  "Suzuki":["Swift","Vitara","Ignis"],
  "Subaru":["Impreza","Forester","XV"],
  "Jeep":["Renegade","Compass","Cherokee","Wrangler"],
  "Land Rover":["Evoque","Discovery","Defender","Range Rover"],
  "Jaguar":["E-Pace","F-Pace","XE","XF"],
  "Porsche":["911","Cayenne","Macan","Panamera","Taycan"],
  "Ferrari":["488","F8","Roma","Portofino"],
  "Lamborghini":["Huracán","Urus","Aventador"],
  "Maserati":["Ghibli","Levante","Quattroporte"],
  "Tesla":["Model 3","Model S","Model X","Model Y"],
  "MINI":["Cooper","Countryman","Clubman"],
  "Alfa Romeo":["Giulia","Stelvio","Giulietta"],
  "Dacia":["Sandero","Duster","Spring","Jogger"],
  "Chevrolet":["Spark","Camaro","Cruze"],
  "Cadillac":["Escalade","CT5"],
  "Dodge":["Charger","Challenger"],
  "Lexus":["UX","NX","RX","ES"],
  "Infiniti":["Q30","Q50","QX30"],
  "Rolls-Royce":["Phantom","Ghost","Cullinan"],
  "Bentley":["Continental GT","Bentayga"],
  "Aston Martin":["DB11","Vantage"],
  "McLaren":["570S","720S"],
  "Smart":["Fortwo","Forfour"],
  "Alpine":["A110"],
  "Polestar":["Polestar 2"],
  "BYD":["Atto 3","Dolphin"],
  "MG":["ZS","MG4"]
};
const VEHICLE_LIST=Object.entries(VEHICLE_DB).flatMap(([brand,models])=>models.map(m=>`${brand} ${m}`));
const vehicleDatalist=document.getElementById("vehicleModels");
if(vehicleDatalist) vehicleDatalist.innerHTML=VEHICLE_LIST.map(v=>`<option value="${v}">`).join("");

// Liste indicative de marques / modèles de bateaux, yachts et jetskis pour
// l'auto-complétion (non exhaustive : si le modèle du client n'y figure
// pas, il peut simplement écrire le sien librement, le champ reste libre).
const BOAT_DB={
  "Beneteau":["Oceanis 30.1","Oceanis 46.1","Flyer 6.6","Antares 8","Swift Trawler 35","First 27"],
  "Jeanneau":["Sun Odyssey 349","Sun Odyssey 440","Merry Fisher 895","Cap Camarat 9.0","NC 895"],
  "Bavaria Yachts":["Cruiser 34","C42","C57"],
  "Dufour":["Dufour 37","Dufour 470","Dufour 61"],
  "Hanse":["Hanse 348","Hanse 460","Hanse 588"],
  "X-Yachts":["X4.0","X4.6","Xc 45"],
  "Fountaine Pajot":["Astrea 42","Elba 45","Samana 59"],
  "Lagoon":["Lagoon 42","Lagoon 46","Lagoon 51"],
  "Bali Catamarans":["Bali 4.4","Bali 5.4"],
  "Azimut":["Azimut 55","Azimut Grande 27M","Azimut S6"],
  "Sunseeker":["Manhattan 68","Predator 55","Ocean 182"],
  "Princess Yachts":["V50","F55","X95"],
  "Ferretti Yachts":["500","720","920"],
  "Pershing":["5X","8X","9X"],
  "Riva":["Iseo","Rivamare","Aquariva"],
  "Sanlorenzo":["SL86","SD90","SX88"],
  "Fairline":["Targa 43","Squadron 50"],
  "Quicksilver":["Activ 555","Captur 6.5"],
  "Ranieri":["Next 240","Voyager 23"],
  "Zodiac":["Medline 7.5","Pro 6.5"],
  "Highfield":["Sport 500","Patrol 660"],
  "Capelli":["Tempest 750","Mare 26"],
  "Boston Whaler":["170 Montauk","270 Dauntless","330 Outrage"],
  "Bayliner":["VR5","Element E18"],
  "Sea Ray":["SPX 190","Sundancer 320"],
  "Chaparral":["237 SSX","23 Surf"],
  "Formula":["270 Bowrider","350 CBR"],
  "Cobalt":["R5","CS23"],
  "Regal":["26 XO","LS6"],
  "MasterCraft":["X24","XT25"],
  "Malibu":["Wakesetter 23 LSV"],
  "Chris-Craft":["Launch 25","Corsair 36"],
  "Yamaha":["242X","AR250","FSH Sport"],
  "Yamaha WaveRunner":["VX Cruiser","FX Cruiser HO","GP1800R"],
  "Sea-Doo":["Spark","GTI","RXP-X","Fish Pro"],
  "Kawasaki Jet Ski":["STX 160","Ultra 310LX"],
  "Robalo":["R242","R302"],
  "Grady-White":["Freedom 235","Canyon 271"],
  "Pursuit":["S 268","OS 355"],
  "Everglades":["243cc","335cc"],
  "Invincible":["33 Open Fisherman"],
  "Axopar":["28 T-Top","37 Sun-Top"],
  "XO Boats":["XO 270","XO DFND 9"],
  "Nimbus":["Tender 9","T11"],
  "Cranchi":["E26 Classic","T36"],
  "Absolute Yachts":["47 Fly","58 Navetta"],
  "Monte Carlo Yachts":["MCY 66","MCY 96"],
  "Sunreef Yachts":["60 Sunreef Power","80 Sunreef Power"],
  "Leopard Catamarans":["Leopard 45","Leopard 53"],
  "Amel":["Amel 50","Amel 60"],
  "Halberg-Rassy":["HR 40","HR 57"],
  "Elan Yachts":["Elan E5","Elan GT6"],
  "Grand Soleil":["Grand Soleil 44","GS 52"],
  "Williams Jet Tenders":["Turbojet 285","MiniJet 280"],
  "Sea-Doo Switch":["Switch 13"]
};
const BOAT_LIST=Object.entries(BOAT_DB).flatMap(([brand,models])=>models.map(m=>`${brand} ${m}`));
const boatDatalist=document.getElementById("boatModels");
if(boatDatalist) boatDatalist.innerHTML=BOAT_LIST.map(v=>`<option value="${v}">`).join("");

function computeTotal(){
  let total=(selectedSubService && AUTO_SERVICES[selectedSubService].price)||0;
  selectedSupplements.forEach(k=>{ if(SUPPLEMENTS[k]) total+=SUPPLEMENTS[k].price; });
  if(selectedProtectionOption && PROTECTION_OPTIONS[selectedProtectionOption]) total+=PROTECTION_OPTIONS[selectedProtectionOption].price;
  if(selectedVehicleCategory) total+=categorySurchargeFor(selectedVehicleCategory);
  return total;
}

function updateFieldLabels(){
  const checkRow=document.querySelector(".check-row");
  if(checkRow) checkRow.hidden = service==="auto";
  updateSubmitBtnLabel();
  if(service==="auto"){
    boatTypeWrap.firstChild.textContent="Type de véhicule";
    photosLabel.firstChild.textContent="Photos du véhicule";
    assetInput.setAttribute("list","vehicleModels");
    assetInput.setAttribute("placeholder","Marque et modèle");
    locationInput.setAttribute("placeholder","Ville ou secteur");
  }else{
    boatTypeWrap.firstChild.textContent="Type de bateau";
    photosLabel.firstChild.textContent="Photos du bateau";
    assetInput.setAttribute("list","boatModels");
    assetInput.setAttribute("placeholder","Yacht 18 m");
    locationInput.setAttribute("placeholder","Port, ville ou secteur");
  }
}

function updateSubmitBtnLabel(){
  const btn=document.getElementById("formSubmitBtn");
  if(!btn) return;
  const goesToCalendar = service==="auto" || visitCheck.checked;
  btn.firstChild.textContent = goesToCalendar ? "Continuer vers le calendrier " : "Envoyer ma demande ";
}
visitCheck.addEventListener("change",updateSubmitBtnLabel);

function renderServicePickList(){
  const wrap=document.getElementById("servicePickList");wrap.innerHTML="";
  Object.entries(AUTO_SERVICES).forEach(([key,s])=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="service-pick";
    btn.innerHTML=`<div><strong>${s.title}</strong><span>${s.supplements.length?"Suppléments disponibles":"Finitions & protections"}</span></div><span class="pick-price">${s.price?("À partir de "+s.price+" €"):"Sur devis"}</span>`;
    btn.addEventListener("click",()=>{
      selectedSubService=key;selectedSupplements=new Set();selectedProtectionOption=null;selectedVehicleCategory=null;
      serviceSelectStep.hidden=true;
      if(key==="protection"){
        renderProtectionOptions();protectionOptionsStep.hidden=false;
      }else if(AUTO_SERVICES[key].supplements.length){
        renderVehicleCategoryStep();vehicleCategoryStep.hidden=false;
      }else{
        form.hidden=false;bookingHead.hidden=false;
      }
    });
    wrap.appendChild(btn);
  });
}

function renderProtectionOptions(){
  const wrap=document.getElementById("protectionPickList");wrap.innerHTML="";
  Object.entries(PROTECTION_OPTIONS).forEach(([key,opt])=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="protection-pick";
    btn.innerHTML=`<div class="pp-top"><strong>${opt.label}</strong><span class="pp-price">+${opt.price} €</span></div><p>${opt.desc}</p><div class="pp-duration">${opt.duration}</div>`;
    btn.addEventListener("click",()=>{
      selectedProtectionOption=key;
      openRequireWashPopup();
    });
    wrap.appendChild(btn);
  });
}
const requireWashPopup=document.getElementById("requireWashPopup");
function openRequireWashPopup(){
  requireWashPopup.classList.add("open");requireWashPopup.setAttribute("aria-hidden","false");
}
function closeRequireWashPopup(){
  requireWashPopup.classList.remove("open");requireWashPopup.setAttribute("aria-hidden","true");
}
document.getElementById("cancelRequireWash").addEventListener("click",()=>{
  selectedProtectionOption=null;closeRequireWashPopup();
});
document.getElementById("cancelRequireWashBtn").addEventListener("click",()=>{
  selectedProtectionOption=null;closeRequireWashPopup();
});
document.getElementById("confirmRequireWash").addEventListener("click",()=>{
  closeRequireWashPopup();
  selectedSubService="exterieur"; // le lavage extérieur est inclus automatiquement
  protectionOptionsStep.hidden=true;
  renderVehicleCategoryStep();vehicleCategoryStep.hidden=false;
});
document.getElementById("backToServicePickFromProtection").addEventListener("click",()=>{
  protectionOptionsStep.hidden=true;selectedSubService=null;selectedProtectionOption=null;
  renderServicePickList();serviceSelectStep.hidden=false;
});
document.getElementById("backFromCategory").addEventListener("click",()=>{
  vehicleCategoryStep.hidden=true;selectedVehicleCategory=null;
  if(selectedProtectionOption){
    selectedSubService="protection";selectedProtectionOption=null;
    renderProtectionOptions();protectionOptionsStep.hidden=false;
  }else{
    selectedSubService=null;
    renderServicePickList();serviceSelectStep.hidden=false;
  }
});

function renderSupplements(){
  const s=AUTO_SERVICES[selectedSubService];
  const protOpt=selectedProtectionOption?PROTECTION_OPTIONS[selectedProtectionOption]:null;
  supplementsStep.querySelector("h3").innerHTML=protOpt?`Personnalisez<br>votre prestation.`:`Personnalisez<br>${s.title.toLowerCase()}.`;
  renderLocationChoice();
  const wrap=document.getElementById("supplementsList");wrap.innerHTML="";
  if(protOpt){
    const included=document.createElement("div");included.className="supp-item";included.style.cursor="default";
    included.innerHTML=`<div class="supp-top" style="padding-left:0"><span class="supp-name">${protOpt.label} <span style="color:#84919d;font-weight:400">(inclus)</span></span><span class="supp-price">+${protOpt.price} €</span></div><p>Lavage extérieur inclus automatiquement avec ce traitement.</p>`;
    included.style.paddingLeft="22px";included.style.borderColor="#ff7a3d";included.style.background="rgba(255,122,61,.06)";
    wrap.appendChild(included);
  }
  s.supplements.forEach(key=>{
    const sup=SUPPLEMENTS[key];
    const label=document.createElement("label");label.className="supp-item";
    label.innerHTML=`<input type="checkbox"><div class="supp-top"><span class="supp-name">${sup.label}</span><span class="supp-price">+${sup.price} €</span></div><p>${sup.desc}</p>`;
    label.querySelector("input").addEventListener("change",e=>{
      if(e.target.checked) selectedSupplements.add(key); else selectedSupplements.delete(key);
      updateSuppTotal();
    });
    wrap.appendChild(label);
  });
  updateSuppTotal();
}
function updateSuppTotal(){
  document.getElementById("suppTotal").textContent=computeTotal()+" €";
}
document.getElementById("continueToForm").addEventListener("click",()=>{
  if(selectedSubService==="exterieur" && !selectedLocationMode){
    alert("Merci de choisir où vous souhaitez être servi (au centre ou à domicile).");
    return;
  }
  supplementsStep.hidden=true;form.hidden=false;bookingHead.hidden=false;
  if(selectedLocationMode==="centre") locationInput.value=CENTER_ADDRESS;
  else if(selectedLocationMode==="domicile") locationInput.value="";
});
document.getElementById("backToServicePick").addEventListener("click",()=>{
  supplementsStep.hidden=true;selectedSubService=null;selectedSupplements=new Set();
  renderServicePickList();serviceSelectStep.hidden=false;
});

async function loadAvailability(){
  if(!supabase) return;
  try{
    const [{data:slots},{data:blocked}]=await Promise.all([
      supabase.from("taken_slots").select("date,time"),
      supabase.from("blocked_dates").select("date")
    ]);
    takenSlots=(slots||[]).map(s=>`${s.date}|${s.time}`);
    blockedDatesRemote=(blocked||[]).map(b=>b.date);
  }catch(err){
    console.warn("Impossible de charger les disponibilités Supabase :",err);
  }
}
loadAvailability();

document.querySelectorAll(".open-booking").forEach(btn=>btn.addEventListener("click",()=>{
  service=btn.dataset.service||"nautic";
  bookingService.value=service;
  selectedSubService=btn.dataset.subService||null;
  selectedSupplements=new Set();
  selectedProtectionOption=null;
  selectedLocationMode=null;
  selectedVehicleCategory=null;
  bookingTitle.innerHTML=service==="nautic"?"Demander un devis<br><em>nautic.</em>":"Réserver un nettoyage<br><em>auto.</em>";
  document.querySelector(".booking-panel").classList.toggle("service-auto",service==="auto");
  updateFieldLabels();
  loadAvailability();
  openModal();
}));

function openModal(){
  scrollPositionBeforeModal=window.scrollY;
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");
  form.hidden=true;calendarStep.hidden=true;successStep.hidden=true;bookingHead.hidden=true;
  serviceSelectStep.hidden=true;protectionOptionsStep.hidden=true;vehicleCategoryStep.hidden=true;supplementsStep.hidden=true;
  closeRequireWashPopup();

  if(service==="auto"){
    if(selectedSubService==="protection"){
      selectedSubService=null;selectedProtectionOption=null;selectedVehicleCategory=null;
      renderProtectionOptions();protectionOptionsStep.hidden=false;
    }else if(selectedSubService && AUTO_SERVICES[selectedSubService]?.supplements.length){
      selectedVehicleCategory=null;
      renderVehicleCategoryStep();vehicleCategoryStep.hidden=false;
    }else if(selectedSubService){
      form.hidden=false;bookingHead.hidden=false;
    }else{
      renderServicePickList();serviceSelectStep.hidden=false;
    }
  }else{
    form.hidden=false;bookingHead.hidden=false;
  }
}
function closeModal(){
  modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");
}
document.querySelectorAll(".close-booking").forEach(x=>x.addEventListener("click",closeModal));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeModal();contactPopup.classList.remove("open");serviceDetailPopup.classList.remove("open")}});

const photos=document.getElementById("photos"), preview=document.getElementById("preview");
photos.addEventListener("change",()=>{
  preview.innerHTML="";
  [...photos.files].slice(0,12).forEach(file=>{
    const img=document.createElement("img");img.src=URL.createObjectURL(file);img.alt="";
    preview.appendChild(img);
  });
});

form.addEventListener("submit",e=>{
  e.preventDefault();
  bookingData=Object.fromEntries(new FormData(form).entries());
  if(service==="nautic" && !visitCheck.checked){
    submitBooking(null,null);
  }else{
    form.hidden=true; calendarStep.hidden=false; bookingHead.hidden=true; renderCalendar();
  }
});

function iso(d){return d.toISOString().slice(0,10)}
function renderCalendar(){
  const y=currentMonth.getFullYear(),m=currentMonth.getMonth();
  document.getElementById("monthLabel").textContent=new Intl.DateTimeFormat("fr-FR",{month:"long",year:"numeric"}).format(currentMonth);
  const grid=document.getElementById("calendarGrid");grid.innerHTML="";
  const first=(new Date(y,m,1).getDay()+6)%7;
  const days=new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++){const x=document.createElement("div");x.className="day empty";grid.appendChild(x)}
  for(let d=1;d<=days;d++){
    const date=new Date(y,m,d), key=iso(date), btn=document.createElement("button");
    btn.type="button";btn.className="day";btn.textContent=d;
    const today=new Date();today.setHours(0,0,0,0);
    const fullyBooked=CONFIG.hours.every(t=>takenSlots.includes(`${key}|${t}`));
    const isBlocked=CONFIG.blockedDates.includes(key)||blockedDatesRemote.includes(key);
    const past=date<today || isBlocked || fullyBooked;
    if(past){btn.classList.add("disabled");if(fullyBooked&&!isBlocked)btn.classList.add("taken");btn.disabled=true}
    else{btn.classList.add("available");btn.addEventListener("click",()=>selectDate(date,btn))}
    if(selectedDate&&key===iso(selectedDate))btn.classList.add("selected");
    grid.appendChild(btn);
  }
  renderTimes();
}
function selectDate(date,btn){
  selectedDate=date;selectedTime=null;
  document.querySelectorAll(".day.selected").forEach(x=>x.classList.remove("selected"));
  btn.classList.add("selected");renderTimes();
}
function renderTimes(){
  const wrap=document.getElementById("times");wrap.innerHTML="";
  document.getElementById("confirmBooking").disabled=true;
  if(!selectedDate){wrap.innerHTML='<span style="font-size:11px;color:#7b8995">Sélectionnez d’abord une date.</span>';return}
  const key=iso(selectedDate);
  CONFIG.hours.forEach(t=>{
    const taken=takenSlots.includes(`${key}|${t}`);
    const b=document.createElement("button");b.type="button";b.className="time-btn";b.textContent=t;
    if(taken){b.disabled=true;b.classList.add("taken")}
    else{
      b.addEventListener("click",()=>{selectedTime=t;document.querySelectorAll(".time-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");document.getElementById("confirmBooking").disabled=false});
    }
    wrap.appendChild(b);
  });
}
document.getElementById("prevMonth").addEventListener("click",()=>{currentMonth.setMonth(currentMonth.getMonth()-1);renderCalendar()});
document.getElementById("nextMonth").addEventListener("click",()=>{currentMonth.setMonth(currentMonth.getMonth()+1);renderCalendar()});
document.getElementById("backToForm").addEventListener("click",()=>{calendarStep.hidden=true;form.hidden=false;bookingHead.hidden=false});

document.getElementById("confirmBooking").addEventListener("click",()=>{
  if(selectedDate&&selectedTime)submitBooking(iso(selectedDate),selectedTime);
});

async function uploadBookingPhotos(){
  if(!supabase || !photos.files.length) return [];
  const paths=[];
  for(const file of [...photos.files].slice(0,12)){
    const safeName=file.name.replace(/[^a-zA-Z0-9.\-_]/g,"_");
    const path=`${Date.now()}-${Math.random().toString(36).slice(2,8)}-${safeName}`;
    try{
      const {error}=await supabase.storage.from("booking-photos").upload(path,file);
      if(!error) paths.push(path);
      else console.warn("Photo non envoyée :",error.message);
    }catch(err){
      console.warn("Upload photo impossible :",err);
    }
  }
  return paths;
}

async function submitBooking(date,time){
  const name=`${bookingData?.firstName||""} ${bookingData?.lastName||""}`.trim();
  const readable=date?new Intl.DateTimeFormat("fr-FR",{dateStyle:"full"}).format(new Date(date+"T12:00:00")):"demande sans visite";
  const subServiceInfo=selectedSubService?AUTO_SERVICES[selectedSubService]:null;
  const protOpt=selectedProtectionOption?PROTECTION_OPTIONS[selectedProtectionOption]:null;
  const serviceLabel=bookingService.value==="nautic"?"nettoyage nautic":(protOpt?protOpt.label.toLowerCase():(subServiceInfo?subServiceInfo.title.toLowerCase():"nettoyage automobile"));
  const total=bookingService.value==="auto"?computeTotal():0;
  const supplementLabels=[...selectedSupplements].map(k=>SUPPLEMENTS[k]?.label).filter(Boolean);
  if(protOpt) supplementLabels.unshift(`${protOpt.label} (+${protOpt.price} €)`);
  if(selectedVehicleCategory){
    const catExtra=categorySurchargeFor(selectedVehicleCategory);
    supplementLabels.unshift(`Gabarit : ${CATEGORY_LABELS[selectedVehicleCategory]}${catExtra>0?` (+${catExtra} €)`:""}`);
  }
  const confirmBtn=document.getElementById("confirmBooking");
  if(confirmBtn) confirmBtn.disabled=true;

  const photoPaths=await uploadBookingPhotos();

  const row={
    service: bookingService.value,
    sub_service: selectedSubService,
    protection_option: selectedProtectionOption,
    location_mode: selectedLocationMode,
    vehicle_category: selectedVehicleCategory,
    supplements: supplementLabels,
    total_price: bookingService.value==="auto" && total>0 ? total : null,
    first_name: bookingData?.firstName||"",
    last_name: bookingData?.lastName||"",
    email: bookingData?.email||"",
    phone: bookingData?.phone||"",
    location: bookingData?.location||"",
    asset: bookingData?.asset||"",
    message: bookingData?.message||"",
    photos: photoPaths,
    visit_requested: !!bookingData?.visit,
    date, time
  };

  if(supabase){
    try{
      const {error}=await supabase.from("bookings").insert(row);
      if(error) console.warn("Erreur d'enregistrement Supabase :",error.message);
      await supabase.functions.invoke("send-confirmation",{
        body:{ firstName:row.first_name, email:row.email, phone:row.phone, service:row.service, date, time, kind:"pending" }
      }).catch(err=>console.warn("Envoi confirmation impossible :",err));
    }catch(err){
      console.warn("Supabase indisponible, réservation enregistrée localement seulement :",err);
    }
  }

  // Sauvegarde locale de secours (visible dans le navigateur du client)
  localStorage.setItem("amDNA_last_request",JSON.stringify({...row,date,time}));

  successStep.hidden=false;form.hidden=true;calendarStep.hidden=true;bookingHead.hidden=true;
  document.getElementById("successThanks").textContent=`Merci${bookingData?.firstName?`, ${bookingData.firstName}`:""}.`;
  document.getElementById("recapService").textContent=serviceLabel.charAt(0).toUpperCase()+serviceLabel.slice(1)+(supplementLabels.length?` (+ ${supplementLabels.join(", ")})`:"");
  document.getElementById("recapDate").textContent=date?`${readable} à ${time}`:"À définir (demande sans visite)";
  const priceRow=document.getElementById("recapPriceRow");
  if(row.total_price){ document.getElementById("recapPrice").textContent=`${row.total_price} €`; priceRow.hidden=false; }
  else{ priceRow.hidden=true; }
}

document.getElementById("backToSite").addEventListener("click",()=>{
  closeModal();
  window.scrollTo({top:scrollPositionBeforeModal,behavior:"instant"});
});

/* ---------------------------------------------------------
   Avis clients
   --------------------------------------------------------- */
const reviewsGrid=document.getElementById("reviewsGrid");
const reviewsEmpty=document.getElementById("reviewsEmpty");

async function loadReviews(){
  if(!supabase) return;
  const {data,error}=await supabase.from("reviews").select("name,rating,comment,created_at").eq("approved",true).order("created_at",{ascending:false}).limit(24);
  if(error||!data||!data.length) return;
  reviewsEmpty.hidden=true;
  reviewsGrid.innerHTML="";
  data.forEach(r=>{
    const card=document.createElement("div");
    card.className="review-card";
    card.innerHTML=`<div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
      ${r.comment?`<p>${escapeHtml(r.comment)}</p>`:""}
      <div class="review-name">${escapeHtml(r.name)}</div>`;
    reviewsGrid.appendChild(card);
  });
}
function escapeHtml(str){
  const div=document.createElement("div");div.textContent=str;return div.innerHTML;
}
loadReviews();

const openReviewForm=document.getElementById("openReviewForm");
const reviewFormWrap=document.getElementById("reviewFormWrap");
openReviewForm.addEventListener("click",()=>{
  reviewFormWrap.hidden=!reviewFormWrap.hidden;
  openReviewForm.hidden=!reviewFormWrap.hidden;
});

const starPicker=document.getElementById("starPicker");
const ratingInput=document.getElementById("ratingInput");
starPicker.querySelectorAll("button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    const val=+btn.dataset.star;
    ratingInput.value=val;
    starPicker.querySelectorAll("button").forEach(b=>b.classList.toggle("active",+b.dataset.star<=val));
  });
});

document.getElementById("reviewForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target).entries());
  if(!data.rating){alert("Merci de choisir une note en étoiles.");return}
  if(supabase){
    const {error}=await supabase.from("reviews").insert({
      name:data.name, rating:+data.rating, comment:data.comment||null, approved:false
    });
    if(error){alert("Une erreur est survenue, réessayez plus tard.");console.warn(error);return}
  }
  reviewFormWrap.innerHTML='<p class="eyebrow">MERCI !</p><p style="color:#ff7a3d">Votre avis a bien été envoyé. Il apparaîtra sur le site après validation.</p>';
});
