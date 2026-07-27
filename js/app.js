/* ============================================================
   RUGBY SESSION PLANNER
   ------------------------------------------------------------
   Drills now live in the shared Firestore database, so any
   signed-in coach can add, edit, or archive them from the
   "Manage drills" tab — no code editing needed.

   >>> NOTE <<<
   The SEED_DRILLS list below is ONLY used once, to fill an
   empty database the very first time the app runs. After that,
   the database is the source of truth and editing this list
   does nothing. Manage drills from the app instead.
   ============================================================ */

import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs }
  from 'https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js';

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);
const db = getFirestore(fbApp);
const provider = new GoogleAuthProvider();

const levels = {1:'Beginner',2:'Intermediate',3:'Advanced'};
const THEMES = ["Tackle & contact","Attack skills","Defence skills","Team organisation","Game situation","Cardio"];

/* ---- one-time seed data (see note above) ---- */
const SEED_DRILLS = [
 {n:1,t:"Tackle & contact",title:"Knee-Height Cheek-to-Cheek Tackles",d:1,
  players:"Pairs",time:"10 min",space:"5m × 5m grids",
  how:"Pairs kneel facing each other a metre apart. The tackler steps in, places the shoulder on the ball carrier's thigh, cheek to the outside hip, wraps both arms and rolls to the ground. Progress from kneeling to a crouch, then to a walk, then to a jog. Ball carrier stays passive throughout.",
  obj:"Build a safe, low tackle technique with correct head placement before adding any speed.",
  look:"Head behind or beside the carrier, never in front. Eyes open, arms wrapping and squeezing, tackler landing on top."},

 {n:2,t:"Tackle & contact",title:"Cone Gate Contact Cycle",d:2,
  players:"Groups of 5",time:"12 min",space:"10m × 10m",
  how:"A carrier runs through a 2m gate into a defender holding a shield. On contact, the carrier fights for a second push, goes to ground with the ball presented long, and two support players arrive to clear over the ball. Next carrier starts as soon as the ball is available. Run for 90-second blocks.",
  obj:"Link the carry, the ground placement, and the arrival of support into one continuous rhythm.",
  look:"Ball presented at full arm stretch away from the tackler. Support arriving low, in a straight line, and staying on their feet."},

 {n:3,t:"Attack skills",title:"Four-Cone Draw and Pass",d:1,
  players:"Groups of 3–4",time:"10 min",space:"15m × 15m",
  how:"Three attackers advance against two passive defenders standing on cones. The carrier must run at the inside shoulder of a defender to commit him, then pass late to the free runner. Rotate positions each rep. Progress by letting defenders drift or press.",
  obj:"Teach players to fix a defender before releasing the ball, rather than passing early into space that closes.",
  look:"Straight running lines, pass delivered after the defender commits, receiver taking the ball at pace."},

 {n:4,t:"Attack skills",title:"Two-Ball Overload Grid",d:3,
  players:"8–12",time:"12 min",space:"20m × 20m",
  how:"Two balls are live in the same grid at once, with attackers outnumbering defenders 4v3. Attackers must score by crossing the far line; if a ball is dropped or turned over, that ball resets to the coach and comes back in immediately from an unpredictable angle. Play continuous for three minutes.",
  obj:"Force fast scanning and decision making when the picture keeps changing and the overlap is short-lived.",
  look:"Heads up before receiving, players calling for the ball early, attackers using the extra man within two passes."},

 {n:5,t:"Defence skills",title:"Three-Gate Read and React",d:2,
  players:"Groups of 6",time:"10 min",space:"20m × 15m",
  how:"Three gates sit five metres apart on the attacking line. Two attackers set off and choose one gate at the last moment. Two defenders must communicate, decide who takes the ball and who covers the outside, and shut down the chosen gate. Attackers can pass once.",
  obj:"Sharpen the read between the ball defender and the outside cover, and the call that separates them.",
  look:"An early, loud call. Defenders moving up together, inside shoulder connected, no dog-legs in the line."},

 {n:6,t:"Defence skills",title:"Scramble Recovery Chase",d:3,
  players:"10–14",time:"12 min",space:"Half pitch",
  how:"The coach kicks or rolls the ball behind a defensive line that is facing away. On the whistle, defenders turn, locate the ball, and reorganise against three attackers who are already running. Defenders must fold back, secure the widest threat first, and force play to the touchline.",
  obj:"Rebuild a defensive line under pressure once the original shape has been broken.",
  look:"Fastest player covering the widest channel, communication while running backwards, defenders working in from the outside."},

 {n:7,t:"Team organisation",title:"Ruck Exit and Reset",d:2,
  players:"Full squad",time:"15 min",space:"40m × 30m",
  how:"Set a ruck at a marked point. On the call, forwards must be in their pods and backs at the correct depth within four seconds, then play two phases before resetting. The coach varies the ruck position across the field so players learn to adjust their spacing to the touchline.",
  obj:"Make the attacking shape after each breakdown fast, automatic, and correct regardless of field position.",
  look:"Depth of the receiving line, no players standing flat, pods square to the gainline, scrum-half arriving first."},

 {n:8,t:"Team organisation",title:"Lineout to First Phase Chain",d:3,
  players:"Full squad",time:"15 min",space:"22m area",
  how:"Run a lineout with a called variation, then play immediately into a pre-agreed first-phase strike move against a live defence. Repeat the same call four times, then change it. Defence is told the call on alternate reps so attackers must adapt when it is read.",
  obj:"Connect set piece delivery to the first attacking phase without a pause in tempo.",
  look:"Clean transfer from jumper to scrum-half, backs already moving as the ball leaves the lineout, a plan B when the move is read."},

 {n:9,t:"Game situation",title:"Last Five Minutes, Three Points Down",d:3,
  players:"Full squad",time:"15 min",space:"Full pitch",
  how:"Attackers start on their own 22 with a five-minute clock and a three-point deficit. Defence plays fully live. The attacking side must manage territory, decide between kicking for position and running, and choose whether to take a penalty at goal or go to the corner. Play the scenario twice, then swap sides.",
  obj:"Rehearse the decisions and the composure that decide close matches.",
  look:"Clear leadership voices, sensible kick choices, patience through phases instead of forcing a low-percentage pass."},

 {n:10,t:"Game situation",title:"Fourteen Players Under Pressure",d:2,
  players:"Full squad",time:"12 min",space:"Half pitch",
  how:"One team plays a defender down for a full four-minute block while the opposition attacks from 30 metres out. The short-handed side must reorganise its line, decide which channel to leave short, and buy time. Rotate which player is removed so different units have to adjust.",
  obj:"Practise defending a numerical disadvantage without panic or a broken line.",
  look:"The line staying connected rather than spreading thin, players talking through the gap, defenders slowing the ball at the breakdown."}
];

/* ============================================================
   DRILLS IN FIRESTORE
   Each drill is a document in the "drills" collection with a
   stable numeric id `n` (sessions reference drills by `n`).
   `archived:true` hides a drill without deleting it.
   ============================================================ */
const DRILL_COL = 'drills';
let DRILLS = [];        // all drills currently loaded (active + archived)
const activeDrills = () => DRILLS.filter(d=>!d.archived);
const drillByNum = (n) => DRILLS.find(d=>d.n===n);
function drillMinutes(d){ const m=String(d.time||'').match(/\d+/); return m?parseInt(m[0],10):0; }

const drillStore = {
  async loadAll(){
    const snap = await getDocs(collection(db, DRILL_COL));
    DRILLS = snap.docs.map(x=>x.data());
    DRILLS.sort((a,b)=> a.t.localeCompare(b.t) || a.title.localeCompare(b.title));
    return DRILLS;
  },
  async seedIfEmpty(){
    const snap = await getDocs(collection(db, DRILL_COL));
    if(!snap.empty) return;
    // fill an empty DB once with the starter drills
    for(const d of SEED_DRILLS){
      await setDoc(doc(db, DRILL_COL, String(d.n)), {...d, archived:false});
    }
  },
  async save(d){                       // create or overwrite one drill
    await setDoc(doc(db, DRILL_COL, String(d.n)), d);
  },
  async setArchived(n, val){
    const d = drillByNum(n); if(!d) return;
    await setDoc(doc(db, DRILL_COL, String(n)), {...d, archived:val});
  },
  nextNum(){                           // smallest unused positive integer
    const used = new Set(DRILLS.map(d=>d.n));
    let i=1; while(used.has(i)) i++; return i;
  }
};

/* ============================================================
   DRILL PHOTOS (Firebase Storage)
   Only .jpg/.jpeg and .png accepted. No separate storage service —
   photos are shrunk in the browser and saved as part of the
   drill's own data, so there's nothing extra to set up or pay
   for. The trade-off: each photo is capped fairly small (long
   side ~800px) to stay well under Firestore's 1MB document limit.
   ============================================================ */
const ALLOWED_TYPES = ['image/jpeg','image/png'];
const MAX_UPLOAD_BYTES = 8*1024*1024;      // sanity cap on the original file
const MAX_STORED_CHARS = 700*1024;         // cap on the compressed result

function compressImageToDataUrl(file, maxDim=800, quality=0.72){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    const objUrl=URL.createObjectURL(file);
    img.onload=()=>{
      let w=img.width, h=img.height;
      if(w>h && w>maxDim){ h=Math.round(h*maxDim/w); w=maxDim; }
      else if(h>=w && h>maxDim){ w=Math.round(w*maxDim/h); h=maxDim; }
      const canvas=document.createElement('canvas');
      canvas.width=w; canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      URL.revokeObjectURL(objUrl);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror=()=>{ URL.revokeObjectURL(objUrl); reject(new Error('unreadable image')); };
    img.src=objUrl;
  });
}

async function uploadDrillPhoto(n, file){
  if(!ALLOWED_TYPES.includes(file.type)){ alert('Please choose a JPEG or PNG image.'); return false; }
  if(file.size > MAX_UPLOAD_BYTES){ alert('That photo is too large — please use one under 8MB.'); return false; }
  try{
    const dataUrl = await compressImageToDataUrl(file);
    if(dataUrl.length > MAX_STORED_CHARS){
      alert('That photo is still too large after shrinking it — please try a simpler photo or a screenshot instead.');
      return false;
    }
    const d = drillByNum(n);
    await drillStore.save({...d, photoUrl:dataUrl});
    await drillStore.loadAll();
    return true;
  }catch(e){ console.error('photo processing failed', e); alert('Could not read that photo — please try a different file.'); return false; }
}
async function removeDrillPhoto(n){
  try{
    const d = drillByNum(n);
    await drillStore.save({...d, photoUrl:null});
    await drillStore.loadAll();
    return true;
  }catch(e){ console.error('photo remove failed', e); alert('Could not remove the photo — check your connection.'); return false; }
}

/* the little square: shows the photo + remove button, or an upload control */
function photoBoxHTML(d){
  if(d.photoUrl){
    return `<div class="photo-box">
      <img src="${d.photoUrl}" alt="Photo for ${esc(d.title)}">
      <button class="photo-erase" data-erase-photo="${d.n}">Remove photo</button>
    </div>`;
  }
  return `<div class="photo-box">
    <label class="photo-upload">
      <input type="file" accept="image/jpeg,image/png" data-upload-photo="${d.n}" hidden>
      + Add photo
    </label>
  </div>`;
}
/* wire the upload input + erase button inside a freshly-rendered container */
function wirePhotoBox(container, n, afterChange){
  const input = container.querySelector(`[data-upload-photo="${n}"]`);
  if(input) input.addEventListener('change', async ()=>{
    const file = input.files[0]; if(!file) return;
    const label = input.closest('.photo-upload'); if(label) label.textContent='Saving photo…';
    const ok = await uploadDrillPhoto(n, file);
    if(afterChange) afterChange();
  });
  const eraseBtn = container.querySelector(`[data-erase-photo="${n}"]`);
  if(eraseBtn) eraseBtn.addEventListener('click', async ()=>{
    eraseBtn.textContent='Removing…';
    await removeDrillPhoto(n);
    if(afterChange) afterChange();
  });
}

/* ============================================================
   SESSIONS IN FIRESTORE (unchanged from before)
   ============================================================ */
const COL = 'sessions';
const store = {
  async load(date){
    try{
      const snap = await getDoc(doc(db, COL, date));
      return snap.exists() ? snap.data() : {drills:[],notes:'',override:null};
    }catch(e){ console.error('load failed', e); return {drills:[],notes:'',override:null}; }
  },
  async save(date, session){
    const empty = (session.drills||[]).length===0 && !session.notes && session.override==null;
    try{
      if(empty) await deleteDoc(doc(db, COL, date));
      else      await setDoc(doc(db, COL, date), session);
    }catch(e){ console.error('save failed', e); alert('Could not save — check your connection.'); }
  },
  async datesWithPlans(){
    try{
      const snap = await getDocs(collection(db, COL));
      return snap.docs.map(d=>d.id);
    }catch(e){ console.error('list failed', e); return []; }
  }
};

async function checkIsCoach(){
  try{ await getDocs(collection(db, COL)); return true; }
  catch(e){ return false; }
}
let currentUser = null;

/* ============================================================
   BROWSE VIEW  (reads live drills from Firestore)
   ============================================================ */
const grid=document.getElementById('grid');
const emptyEl=document.getElementById('empty');
const countEl=document.getElementById('count');
let browseState={theme:'all',diff:'all'};

function renderBrowse(){
  const list = activeDrills().filter(d=>
    (browseState.theme==='all'||d.t===browseState.theme) &&
    (browseState.diff==='all'||String(d.d)===browseState.diff)
  );
  grid.innerHTML = list.map(d=>`
<article data-n="${d.n}">
  <div class="head" role="button" tabindex="0" aria-expanded="false">
    <span class="num">${String(d.n).padStart(2,'0')}</span>
    <h2>${esc(d.title)}</h2>
    <span class="theme">${esc(d.t)}</span>
    <span class="diff" title="${levels[d.d]}">
      ${[1,2,3].map(i=>`<span class="pip ${i<=d.d?'on':''}"></span>`).join('')}
    </span>
    <span class="chev">&#9662;</span>
  </div>
  <div class="body">
    <div class="bodyflex">
      <div class="bodytext">
        <h3>How it runs</h3><p>${escNL(d.how)}</p>
        <h3>Objective</h3><p>${escNL(d.obj)}</p>
        <h3>Coaching points</h3><p>${escNL(d.look)}</p>
        <div class="meta"><span>${levels[d.d]}</span><span>${esc(d.players)}</span><span>${esc(d.time)}</span><span>${esc(d.space)}</span></div>
      </div>
      ${photoBoxHTML(d)}
    </div>
  </div>
</article>`).join('');

  grid.querySelectorAll('.head').forEach(h=>{
    const toggle=()=>{const a=h.parentElement;const o=a.classList.toggle('open');h.setAttribute('aria-expanded',o);};
    h.addEventListener('click',toggle);
    h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
  });
  list.forEach(d=>{
    const art=grid.querySelector(`article[data-n="${d.n}"]`);
    const box=art.querySelector('.photo-box');
    wirePhotoBox(box, d.n, ()=>refreshBrowsePhoto(d.n));
  });
  const n=list.length;
  countEl.textContent=n+(n===1?' drill':' drills');
  emptyEl.style.display=n?'none':'block';
}

document.querySelectorAll('button.f[data-type]').forEach(b=>{
  b.addEventListener('click',()=>{
    const t=b.dataset.type;
    browseState[t]=b.dataset.val;
    document.querySelectorAll(`button.f[data-type="${t}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));
    renderBrowse();
  });
});

/* small helper: escape user text so titles/notes can't break the page */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escNl(s){ return esc(s).replace(/\r\n|\r|\n|\u2028|\u2029/g, '<br>'); }

/* refresh just one card's photo box in place (keeps other cards open/closed as they were) */
function refreshBrowsePhoto(n){
  const art=grid.querySelector(`article[data-n="${n}"]`); if(!art) return;
  const box=art.querySelector('.photo-box'); if(!box) return;
  box.outerHTML=photoBoxHTML(drillByNum(n));
  const newBox=art.querySelector('.photo-box');
  wirePhotoBox(newBox, n, ()=>refreshBrowsePhoto(n));
}

/* ============================================================
   VIEW SWITCHER  (now three views)
   ============================================================ */
const tabs={
  browse:document.getElementById('tab-browse'),
  plan:document.getElementById('tab-plan'),
  manage:document.getElementById('tab-manage')
};
const panels={
  browse:document.getElementById('panel-browse'),
  plan:document.getElementById('panel-plan'),
  manage:document.getElementById('panel-manage')
};
function showView(v){
  for(const k in tabs){
    const on=k===v;
    tabs[k].setAttribute('aria-selected',on);
    panels[k].hidden=!on;
  }
  if(v==='plan') renderCalendar();
  if(v==='manage') renderManage();
}
tabs.browse.addEventListener('click',()=>showView('browse'));
tabs.plan.addEventListener('click',()=>showView('plan'));
tabs.manage.addEventListener('click',()=>showView('manage'));

/* ============================================================
   PLANNER  (calendar + session) — reads live drills
   ============================================================ */
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
const today=new Date();
let calYear=today.getFullYear(), calMonth=today.getMonth();
let selectedDate=null;
function ymd(y,m,d){ return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }

const calEl=document.getElementById('cal');
const calLabel=document.getElementById('calLabel');

async function renderCalendar(){
  calLabel.textContent=`${MONTHS[calMonth]} ${calYear}`;
  const firstDow=(new Date(calYear,calMonth,1).getDay()+6)%7;
  const daysIn=new Date(calYear,calMonth+1,0).getDate();
  const planned=new Set(await store.datesWithPlans());
  const todayStr=ymd(today.getFullYear(),today.getMonth(),today.getDate());

  let html=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="dow">${d}</div>`).join('');
  for(let i=0;i<firstDow;i++) html+=`<div class="day blank"></div>`;
  for(let d=1;d<=daysIn;d++){
    const key=ymd(calYear,calMonth,d);
    const cls=['day'];
    if(key===todayStr) cls.push('today');
    if(planned.has(key)) cls.push('has');
    if(key===selectedDate) cls.push('sel');
    html+=`<button class="${cls.join(' ')}" data-date="${key}">${d}</button>`;
  }
  calEl.innerHTML=html;
  calEl.querySelectorAll('.day[data-date]').forEach(b=>{
    b.addEventListener('click',async ()=>{ selectedDate=b.dataset.date; await renderCalendar(); await renderSession(); });
  });
}
document.getElementById('calPrev').addEventListener('click',async ()=>{ calMonth--; if(calMonth<0){calMonth=11;calYear--;} await renderCalendar(); });
document.getElementById('calNext').addEventListener('click',async ()=>{ calMonth++; if(calMonth>11){calMonth=0;calYear++;} await renderCalendar(); });

const sessDate=document.getElementById('sessDate');
const chosenEl=document.getElementById('chosen');
const noplanEl=document.getElementById('noplan');
const notesEl=document.getElementById('notes');
const autoTimeEl=document.getElementById('autoTime');
const overrideEl=document.getElementById('timeOverride');
const pickListEl=document.getElementById('pickList');
let pickState={theme:'all',diff:'all'};

function prettyDate(key){
  const [y,m,d]=key.split('-').map(Number);
  const dt=new Date(y,m-1,d);
  const dow=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dt.getDay()];
  return `${dow} ${d} ${MONTHS[m-1]}`;
}

async function renderSession(){
  if(!selectedDate){
    sessDate.textContent='Select a day';
    chosenEl.innerHTML=''; noplanEl.style.display='block';
    notesEl.value=''; overrideEl.value=''; autoTimeEl.textContent='0';
    pickListEl.innerHTML='<div class="noplan">Pick a day first.</div>';
    return;
  }
  const s=await store.load(selectedDate);
  sessDate.textContent=prettyDate(selectedDate);

  chosenEl.innerHTML=(s.drills||[]).map(n=>{
    const d=drillByNum(n); if(!d) return '';
    return `<li>
      <span class="cnum">${String(d.n).padStart(2,'0')}</span>
      <span class="cname">${esc(d.title)}</span>
      <span class="cmeta">${esc(d.time)}</span>
      <button class="rm" data-rm="${n}" aria-label="Remove ${esc(d.title)}">&times;</button>
    </li>`;
  }).join('');
  noplanEl.style.display=(s.drills||[]).length?'none':'block';
  chosenEl.querySelectorAll('.rm').forEach(b=>{
    b.addEventListener('click',async ()=>{ const s2=await store.load(selectedDate); s2.drills=(s2.drills||[]).filter(x=>x!==+b.dataset.rm); await store.save(selectedDate,s2); await renderSession(); await renderCalendar(); });
  });

  const auto=(s.drills||[]).reduce((sum,n)=>{ const d=drillByNum(n); return sum+(d?drillMinutes(d):0); },0);
  autoTimeEl.textContent=auto;
  overrideEl.value=s.override==null?'':s.override;
  notesEl.value=s.notes||'';
  notesEl.style.height='auto';
  notesEl.style.height=notesEl.scrollHeight+'px';
  await renderPicker();
}

let notesTimer=null, overrideTimer=null;
notesEl.addEventListener('input',()=>{
  notesEl.style.height='auto';
  notesEl.style.height=notesEl.scrollHeight+'px';
  if(!selectedDate)return; clearTimeout(notesTimer); notesTimer=setTimeout(async ()=>{ const s=await store.load(selectedDate); s.notes=notesEl.value; await store.save(selectedDate,s); await renderCalendar(); },600);
});
overrideEl.addEventListener('input',()=>{ if(!selectedDate)return; clearTimeout(overrideTimer); overrideTimer=setTimeout(async ()=>{ const s=await store.load(selectedDate); s.override=overrideEl.value===''?null:parseInt(overrideEl.value,10); await store.save(selectedDate,s); await renderCalendar(); },600); });

async function renderPicker(){
  const s=await store.load(selectedDate);
  const inSet=new Set(s.drills||[]);
  const list=activeDrills().filter(d=>
    (pickState.theme==='all'||d.t===pickState.theme) &&
    (pickState.diff==='all'||String(d.d)===pickState.diff)
  );
  pickListEl.innerHTML=list.length?list.map(d=>`
    <div class="pickrow ${inSet.has(d.n)?'in':''}" data-add="${d.n}">
      <span class="pname">${esc(d.title)}</span>
      <span class="ptheme">${esc(d.t)}</span>
      <span class="ptime">${esc(d.time)}</span>
      <span class="plus">${inSet.has(d.n)?'&#10003;':'+'}</span>
    </div>`).join(''):'<div class="noplan">No drills match those filters.</div>';
  pickListEl.querySelectorAll('[data-add]').forEach(row=>{
    row.addEventListener('click',async ()=>{
      const n=+row.dataset.add;
      const s2=await store.load(selectedDate);
      s2.drills=s2.drills||[];
      if(s2.drills.includes(n)) s2.drills=s2.drills.filter(x=>x!==n);
      else s2.drills=[...s2.drills,n];
      await store.save(selectedDate,s2);
      await renderSession(); await renderCalendar();
    });
  });
}
document.querySelectorAll('button.f[data-ptype]').forEach(b=>{
  b.addEventListener('click',async ()=>{
    const t=b.dataset.ptype;
    pickState[t]=b.dataset.val;
    document.querySelectorAll(`button.f[data-ptype="${t}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));
    if(selectedDate) await renderPicker();
  });
});

/* ============================================================
   MANAGE DRILLS VIEW
   list of active drills + add/edit form + archive/restore
   ============================================================ */
const mList   = document.getElementById('manageList');
const mArch   = document.getElementById('archivedList');
const mForm   = document.getElementById('drillForm');
const mFormTitle = document.getElementById('formTitle');
const mAddBtn = document.getElementById('addDrillBtn');
let editingNum = null;   // null = adding new; number = editing existing

/* form field elements */
const F = {
  title:  document.getElementById('f_title'),
  theme:  document.getElementById('f_theme'),
  d:      document.getElementById('f_diff'),
  players:document.getElementById('f_players'),
  time:   document.getElementById('f_time'),
  space:  document.getElementById('f_space'),
  how:    document.getElementById('f_how'),
  obj:    document.getElementById('f_obj'),
  look:   document.getElementById('f_look')
};

/* populate the theme dropdown once */
F.theme.innerHTML = THEMES.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('');

function openForm(drill){
  editingNum = drill ? drill.n : null;
  mFormTitle.textContent = drill ? 'Edit drill' : 'Add a drill';
  F.title.value   = drill?.title || '';
  F.theme.value   = drill?.t || THEMES[0];
  F.d.value       = String(drill?.d || 1);
  F.players.value = drill?.players || '';
  F.time.value    = drill?.time || '';
  F.space.value   = drill?.space || '';
  F.how.value     = drill?.how || '';
  F.obj.value     = drill?.obj || '';
  F.look.value    = drill?.look || '';

  const photoSection=document.getElementById('photoSection');
  const photoNote=document.getElementById('photoNote');
  if(drill){
    photoNote.hidden=true;
    photoSection.hidden=false;
    refreshFormPhoto(drill.n);
  } else {
    photoSection.hidden=true;
    photoNote.hidden=false;
  }

  mForm.hidden = false;
  mForm.scrollIntoView({behavior:'smooth', block:'start'});
}
function refreshFormPhoto(n){
  const photoSection=document.getElementById('photoSection');
  photoSection.innerHTML=photoBoxHTML(drillByNum(n));
  wirePhotoBox(photoSection, n, ()=>refreshFormPhoto(n));
}
function closeForm(){ mForm.hidden = true; editingNum = null; }

mAddBtn.addEventListener('click',()=>openForm(null));
document.getElementById('cancelForm').addEventListener('click',closeForm);

document.getElementById('saveForm').addEventListener('click',async ()=>{
  const title=F.title.value.trim();
  if(!title){ alert('Please give the drill a title.'); return; }
  const existing = editingNum!=null ? drillByNum(editingNum) : null;
  const drill={
    n:      editingNum!=null ? editingNum : drillStore.nextNum(),
    t:      F.theme.value,
    d:      parseInt(F.d.value,10),
    title,
    players:F.players.value.trim(),
    time:   F.time.value.trim(),
    space:  F.space.value.trim(),
    how:    F.how.value.trim(),
    obj:    F.obj.value.trim(),
    look:   F.look.value.trim(),
    archived:false,
    photoUrl: existing?.photoUrl || null
  };
  try{
    await drillStore.save(drill);
    await drillStore.loadAll();
    closeForm();
    renderManage(); renderBrowse();
  }catch(e){ console.error(e); alert('Could not save the drill — check your connection.'); }
});

async function archiveDrill(n){
  if(!confirm('Archive this drill? It will be hidden from Browse and the planner, but you can restore it later.')) return;
  await drillStore.setArchived(n,true);
  await drillStore.loadAll();
  renderManage(); renderBrowse();
}
async function restoreDrill(n){
  await drillStore.setArchived(n,false);
  await drillStore.loadAll();
  renderManage(); renderBrowse();
}

function renderManage(){
  const active = activeDrills();
  const archived = DRILLS.filter(d=>d.archived);

  mList.innerHTML = active.length ? active.map(d=>`
    <div class="mrow">
      <span class="mnum">${String(d.n).padStart(2,'0')}</span>
      <span class="mname">${esc(d.title)}</span>
      <span class="mtheme">${esc(d.t)}</span>
      <span class="mlevel">${levels[d.d]}</span>
      <button class="mbtn edit" data-edit="${d.n}">Edit</button>
      <button class="mbtn arch" data-arch="${d.n}">Archive</button>
    </div>`).join('') : '<div class="noplan">No drills yet. Add your first one.</div>';

  mArch.innerHTML = archived.length ? archived.map(d=>`
    <div class="mrow archived">
      <span class="mnum">${String(d.n).padStart(2,'0')}</span>
      <span class="mname">${esc(d.title)}</span>
      <span class="mtheme">${esc(d.t)}</span>
      <button class="mbtn restore" data-restore="${d.n}">Restore</button>
    </div>`).join('') : '<div class="noplan" style="padding:8px 0">Nothing archived.</div>';

  mList.querySelectorAll('[data-edit]').forEach(b=>b.addEventListener('click',()=>openForm(drillByNum(+b.dataset.edit))));
  mList.querySelectorAll('[data-arch]').forEach(b=>b.addEventListener('click',()=>archiveDrill(+b.dataset.arch)));
  mArch.querySelectorAll('[data-restore]').forEach(b=>b.addEventListener('click',()=>restoreDrill(+b.dataset.restore)));
}

/* ============================================================
   AUTH + BOOT
   On sign-in: seed drills if the DB is empty, load them, then
   draw the page. Non-coaches see the gate.
   ============================================================ */
const gate=document.getElementById('authGate');
const gateMsg=document.getElementById('authMsg');
const signInBtn=document.getElementById('signInBtn');
const signOutBtn=document.getElementById('signOutBtn');
const whoami=document.getElementById('whoami');
const plannerBody=document.getElementById('plannerBody');

signInBtn.addEventListener('click',async ()=>{
  try{ await signInWithPopup(auth, provider); }
  catch(e){ console.error(e); gateMsg.textContent='Sign-in was cancelled or failed. Try again.'; }
});
signOutBtn.addEventListener('click',()=>signOut(auth));

onAuthStateChanged(auth, async (user)=>{
  currentUser=user;
  if(user && await checkIsCoach()){
    gate.hidden=true; plannerBody.hidden=false;
    whoami.textContent=user.email; signOutBtn.hidden=false;
    try{
      await drillStore.seedIfEmpty();
      await drillStore.loadAll();
    }catch(e){ console.error('drill load failed', e); }
    renderBrowse();
    showView('browse');
  } else if(user){
    gate.hidden=false; plannerBody.hidden=true;
    signOutBtn.hidden=false; whoami.textContent=user.email;
    gateMsg.textContent=`Signed in as ${user.email}, but this account isn't on the coach list. Ask an admin to add you.`;
    signInBtn.hidden=true;
  } else {
    gate.hidden=false; plannerBody.hidden=true;
    signOutBtn.hidden=true; whoami.textContent='';
    gateMsg.textContent='Sign in with your coach Google account to view and plan sessions.';
    signInBtn.hidden=false;
  }
});
