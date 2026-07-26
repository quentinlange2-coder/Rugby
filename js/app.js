/* ============================================================
   YOUR DRILLS LIVE HERE.
   To add a drill: copy the TEMPLATE block at the bottom of this
   list, paste it just before the closing "];", and fill it in.
   - n     : the drill number (just make it the next number up)
   - t     : the theme. Must EXACTLY match one of the filter buttons:
             "Tackle & contact", "Attack skills", "Defence skills",
             "Team organisation", "Game situation"
   - title : the drill's name
   - d     : difficulty 1 (Beginner), 2 (Intermediate), or 3 (Advanced)
   - players / time / space : the little detail line at the bottom
   - how / obj / look : the three paragraphs shown when opened
   Keep the quotes and the comma at the end of each line.
   ============================================================ */

const drills = [
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

 /* ---- TEMPLATE: copy the block below, paste it ABOVE this comment,
        remove the leading slash-star and trailing star-slash, and
        fill in your own drill. Don't forget a comma after the } of
        the drill that comes before it.

 ,{n:11,t:"Attack skills",title:"Your Drill Name",d:2,
   players:"Groups of 4",time:"10 min",space:"15m × 15m",
   how:"Describe how the drill runs, step by step.",
   obj:"Describe what the drill is trying to teach.",
   look:"Describe what a coach should watch for."}

 */
];

/* ============================================================
   Everything below is the machinery that draws the page.
   You usually won't need to touch it.
   ============================================================ */

const grid=document.getElementById('grid');
const emptyEl=document.getElementById('empty');
const countEl=document.getElementById('count');
const levels={1:'Beginner',2:'Intermediate',3:'Advanced'};

grid.innerHTML = drills.map(d=>`
<article data-theme="${d.t}" data-diff="${d.d}">
  <div class="head" role="button" tabindex="0" aria-expanded="false">
    <span class="num">${String(d.n).padStart(2,'0')}</span>
    <h2>${d.title}</h2>
    <span class="theme">${d.t}</span>
    <span class="diff" title="${levels[d.d]}">
      ${[1,2,3].map(i=>`<span class="pip ${i<=d.d?'on':''}"></span>`).join('')}
    </span>
    <span class="chev">&#9662;</span>
  </div>
  <div class="body">
    <h3>How it runs</h3><p>${d.how}</p>
    <h3>Objective</h3><p>${d.obj}</p>
    <h3>Coaching points</h3><p>${d.look}</p>
    <div class="meta"><span>${levels[d.d]}</span><span>${d.players}</span><span>${d.time}</span><span>${d.space}</span></div>
  </div>
</article>`).join('');

grid.querySelectorAll('.head').forEach(h=>{
  const toggle=()=>{const a=h.parentElement;const o=a.classList.toggle('open');h.setAttribute('aria-expanded',o);};
  h.addEventListener('click',toggle);
  h.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});

let state={theme:'all',diff:'all'};
document.querySelectorAll('button.f').forEach(b=>{
  b.addEventListener('click',()=>{
    const t=b.dataset.type;
    state[t]=b.dataset.val;
    document.querySelectorAll(`button.f[data-type="${t}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));
    apply();
  });
});

function apply(){
  let n=0;
  grid.querySelectorAll('article').forEach(a=>{
    const ok=(state.theme==='all'||a.dataset.theme===state.theme)&&(state.diff==='all'||a.dataset.diff===state.diff);
    a.classList.toggle('hide',!ok);
    if(ok)n++;
  });
  countEl.textContent=n+(n===1?' drill':' drills');
  emptyEl.style.display=n?'none':'block';
}


/* ============================================================
   FIREBASE: sign-in + shared storage
   ------------------------------------------------------------
   Replaces the old per-device localStorage. Sessions now live
   in one shared Firestore database, and only approved coaches
   (see firebase-config.js) can sign in to read or write them.

   Because the database lives in Tokyo, saving/loading now takes
   a short trip over the internet — so store.load / store.save
   are "async" (they return a promise you `await`). That's the
   only real change to how the planner talks to storage.
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

/* who is signed in right now (null = nobody).
   We no longer keep the coach list in this public file. Instead,
   Firebase's security rules are the real gate: we simply TRY to
   read the database, and if Firebase allows it, the user is an
   approved coach. If Firebase refuses (permission-denied), they
   aren't. This keeps every coach email out of the public repo. */
let currentUser = null;
async function checkIsCoach(){
  try{
    // a harmless read; rules allow it only for approved coaches
    await getDocs(collection(db, COL));
    return true;
  }catch(e){
    return false;
  }
}

/* --- the shared store. Same shape as before, but async. --- */
const COL = 'sessions';   // the Firestore collection holding one doc per day
const store = {
  async load(date){
    try{
      const snap = await getDoc(doc(db, COL, date));
      return snap.exists() ? snap.data() : {drills:[],notes:'',override:null};
    }catch(e){ console.error('load failed', e); return {drills:[],notes:'',override:null}; }
  },
  async save(date, session){
    const empty = session.drills.length===0 && !session.notes && session.override==null;
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


/* --- helpers --- */
function drillMinutes(d){ const m=String(d.time).match(/\d+/); return m?parseInt(m[0],10):0; }
function drillByNum(n){ return drills.find(d=>d.n===n); }

/* --- view switcher --- */
const tabs={browse:document.getElementById('tab-browse'), plan:document.getElementById('tab-plan')};
const panels={browse:document.getElementById('panel-browse'), plan:document.getElementById('panel-plan')};
function showView(v){
  for(const k in tabs){
    const on = k===v;
    tabs[k].setAttribute('aria-selected', on);
    panels[k].hidden = !on;
  }
  if(v==='plan') renderCalendar();
}
tabs.browse.addEventListener('click',()=>showView('browse'));
tabs.plan.addEventListener('click',()=>showView('plan'));

/* --- calendar state --- */
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

/* --- session pane --- */
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
      <span class="cname">${d.title}</span>
      <span class="cmeta">${d.time}</span>
      <button class="rm" data-rm="${n}" aria-label="Remove ${d.title}">&times;</button>
    </li>`;
  }).join('');
  noplanEl.style.display = (s.drills||[]).length ? 'none':'block';
  chosenEl.querySelectorAll('.rm').forEach(b=>{
    b.addEventListener('click',async ()=>{ const s2=await store.load(selectedDate); s2.drills=(s2.drills||[]).filter(x=>x!==+b.dataset.rm); await store.save(selectedDate,s2); await renderSession(); await renderCalendar(); });
  });

  const auto=(s.drills||[]).reduce((sum,n)=>{ const d=drillByNum(n); return sum+(d?drillMinutes(d):0); },0);
  autoTimeEl.textContent=auto;
  overrideEl.value = s.override==null ? '' : s.override;
  notesEl.value=s.notes||'';

  await renderPicker();
}

/* debounce notes/override so we don't hit the DB on every keystroke */
let notesTimer=null, overrideTimer=null;
notesEl.addEventListener('input',()=>{ if(!selectedDate)return; clearTimeout(notesTimer); notesTimer=setTimeout(async ()=>{ const s=await store.load(selectedDate); s.notes=notesEl.value; await store.save(selectedDate,s); await renderCalendar(); },600); });
overrideEl.addEventListener('input',()=>{ if(!selectedDate)return; clearTimeout(overrideTimer); overrideTimer=setTimeout(async ()=>{ const s=await store.load(selectedDate); s.override = overrideEl.value===''?null:parseInt(overrideEl.value,10); await store.save(selectedDate,s); await renderCalendar(); },600); });

async function renderPicker(){
  const s=await store.load(selectedDate);
  const inSet=new Set(s.drills||[]);
  const list=drills.filter(d=>
    (pickState.theme==='all'||d.t===pickState.theme) &&
    (pickState.diff==='all'||String(d.d)===pickState.diff)
  );
  pickListEl.innerHTML = list.length ? list.map(d=>`
    <div class="pickrow ${inSet.has(d.n)?'in':''}" data-add="${d.n}">
      <span class="pname">${d.title}</span>
      <span class="ptheme">${d.t}</span>
      <span class="ptime">${d.time}</span>
      <span class="plus">${inSet.has(d.n)?'&#10003;':'+'}</span>
    </div>`).join('') : '<div class="noplan">No drills match those filters.</div>';
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
   AUTH UI: sign-in gate for the planner
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
    // approved coach (Firebase rules allowed the read): show planner
    gate.hidden=true; plannerBody.hidden=false;
    whoami.textContent=user.email;
    signOutBtn.hidden=false;
    await renderCalendar(); await renderSession();
  } else if(user){
    // signed in but not on the coach list
    gate.hidden=false; plannerBody.hidden=true;
    signOutBtn.hidden=false; whoami.textContent=user.email;
    gateMsg.textContent=`Signed in as ${user.email}, but this account isn't on the coach list. Ask an admin to add you.`;
    signInBtn.hidden=true;
  } else {
    // signed out
    gate.hidden=false; plannerBody.hidden=true;
    signOutBtn.hidden=true; whoami.textContent='';
    gateMsg.textContent='Sign in with your coach Google account to view and plan sessions.';
    signInBtn.hidden=false;
  }
});
