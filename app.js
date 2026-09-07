const subjects=[
 {name:"C PROGRAMMING",pct:58},{name:"PYTHON",pct:82},{name:"MATHEMATICS",pct:41},{name:"AI / ML",pct:28}
];
function makeSubject(s){
 const el=document.createElement('div');el.className='subject';
 el.innerHTML=`<h3>${s.name}</h3><div class="pct">${s.pct}%</div><div class="pixelbar">${Array.from({length:12},(_,i)=>`<i class="${i<Math.round(s.pct/100*12)?'on':''}"></i>`).join('')}</div><span class="muted">RESTORED</span>`;
 el.onclick=()=>toast(`${s.name}: module loaded. ${s.pct}% restored.`);
 return el;
}
function renderSubjects(){
 ['dashSubjects','allSubjects'].forEach(id=>{const x=document.getElementById(id);x.innerHTML='';subjects.forEach(s=>x.appendChild(makeSubject(s)))});
}
function mainPixels(){
 const x=document.getElementById('mainPixels');x.innerHTML='';
 for(let i=0;i<16;i++){let p=document.createElement('i');if(i<12)p.className='on';x.appendChild(p)}
}
function showScreen(id){
 document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
 const target=document.getElementById(id);
 if(!target)return;
 target.classList.add('active');
 document.querySelectorAll('.navbtn,.mobilebar button').forEach(b=>b.classList.toggle('active',b.dataset.screen===id));
 window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>showScreen(b.dataset.screen));

function toast(msg){
 const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),2400);
}
function repairFile(){
 toast('FILE REPAIRED // +6 PIXEL INTEGRITY');
 document.body.classList.add('glitch');setTimeout(()=>document.body.classList.remove('glitch'),250);
}
let seconds=1500,timer=null;
function updateTimer(){
 const m=String(Math.floor(seconds/60)).padStart(2,'0'),s=String(seconds%60).padStart(2,'0');
 document.getElementById('timer').textContent=`${m}:${s}`;
 document.getElementById('focusRange').value=seconds;
}
function toggleTimer(){
 const btn=document.getElementById('timerBtn');
 if(timer){clearInterval(timer);timer=null;btn.textContent='RESUME SESSION';return}
 btn.textContent='PAUSE SESSION';document.getElementById('focusStatus').textContent='PIXELS ARE BEING RESTORED...';
 timer=setInterval(()=>{if(seconds>0){seconds--;updateTimer()}else{clearInterval(timer);timer=null;btn.textContent='START SESSION';toast('SESSION COMPLETE // KNOWLEDGE RESTORED')}} ,1000);
}
function resetTimer(){clearInterval(timer);timer=null;seconds=1500;updateTimer();document.getElementById('timerBtn').textContent='START SESSION';document.getElementById('focusStatus').textContent='READY TO RESTORE PIXELS.'}
document.getElementById('focusRange').oninput=e=>{if(!timer){seconds=+e.target.value;updateTimer()}};

function askAI(){
 const input=document.getElementById('aiInput');const q=input.value.trim();if(!q)return;
 const chat=document.getElementById('chat');chat.insertAdjacentHTML('beforeend',`<div class="bubble user">YOU: ${escapeHtml(q)}</div>`);
 let a="I can break that down into smaller pieces. Start with the definition, then look at one simple example.";
 if(/pointer/i.test(q))a="A pointer stores the memory address of another variable. Think: variable = house, pointer = the address written on a note.";
 else if(/array/i.test(q))a="An array stores multiple values of the same type in contiguous memory. In C, indexing starts at 0.";
 else if(/python/i.test(q))a="Python is great for learning logic quickly. Try writing the idea in plain language first, then turn each step into code.";
 else if(/study|focus/i.test(q))a="Use a 25-minute focus block, remove one distraction, and finish one tiny goal before starting another.";
 setTimeout(()=>{chat.insertAdjacentHTML('beforeend',`<div class="bubble ai">PIXEL_01: ${a}</div>`);chat.scrollTop=chat.scrollHeight},350);
 input.value='';chat.scrollTop=chat.scrollHeight;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}

let deadIndex=0;
function newLab(){
 const g=document.getElementById('labGrid');g.innerHTML='';deadIndex=Math.floor(Math.random()*900);
 for(let i=0;i<900;i++){const p=document.createElement('i');p.className='labpx';p.onclick=()=>checkPixel(i,p);g.appendChild(p)}
 document.getElementById('labResult').textContent='DEAD PIXEL COUNT: 1';
}
function checkPixel(i,p){
 if(i===deadIndex){p.classList.add('dead');document.getElementById('labResult').textContent='PIXEL REPAIRED ✓';toast('CORRECT // DISPLAY INTEGRITY +1%');}
 else {p.classList.add('flicker');toast('FALSE POSITIVE // THAT PIXEL IS ALIVE');setTimeout(()=>p.classList.remove('flicker'),500)}
}

function clock(){
 const d=new Date();document.getElementById('clock').textContent=d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}
function boot(){
 const bar=document.getElementById('bootBar'),text=document.getElementById('bootText'),warn=document.getElementById('bootWarn');
 const lines=[
  ['Initializing display driver...',18],
  ['Mapping study modules...',37],
  ['Checking pixel matrix...',61],
  ['WARNING: DEAD PIXELS DETECTED',82],
  ['Attempting repair...',96],
  ['SYSTEM ONLINE.',100]
 ];
 let i=0;
 const go=()=>{if(i>=lines.length){setTimeout(jumpscare,500);return}text.textContent=lines[i][0];bar.style.width=lines[i][1]+'%';warn.textContent=lines[i][1]===82?'DEAD PIXELS DETECTED: 17':'';i++;setTimeout(go,520)};go();
}
function jumpscare(){
 document.getElementById('jump').style.display='flex';
 setTimeout(()=>{document.getElementById('jump').style.display='none';document.getElementById('boot').style.display='none';document.getElementById('app').classList.add('ready');renderSubjects();mainPixels();newLab();clock();setInterval(clock,1000); setAtmosphereStage(0)},380);
}
boot();

// ===== TIME-BASED GLITCH ESCALATION =====
const noise = document.createElement('canvas');
noise.className = 'pixel-noise';
document.body.appendChild(noise);
const nctx = noise.getContext('2d');
function resizeNoise(){ noise.width=window.innerWidth; noise.height=window.innerHeight; }
resizeNoise(); window.addEventListener('resize', resizeNoise);

let staySeconds = 0;
let lastActivity = Date.now();
let escalation = 0;
let lastParticle = 0;

function drawStatic(){
  const w=noise.width,h=noise.height;
  if(!w||!h) return;
  nctx.clearRect(0,0,w,h);
  const count = 35 + escalation*32;
  for(let i=0;i<count;i++){
    const x=Math.random()*w, y=Math.random()*h;
    const size=Math.random()<.82 ? 1+Math.random()*2.5 : 5+Math.random()*18;
    nctx.fillStyle = Math.random()<.48 ? 'rgba(85,245,255,.35)' :
                     Math.random()<.7 ? 'rgba(255,49,88,.30)' : 'rgba(210,90,255,.25)';
    nctx.fillRect(x,y,size,Math.random()<.85?1:2);
  }
}
function tinyGlitch(){
  if(escalation < 2 || Date.now()-lastActivity < 2500) return;
  const host=document.getElementById('app');
  host.classList.remove('glitch'); void host.offsetWidth; host.classList.add('glitch');
  setTimeout(()=>host.classList.remove('glitch'),220);
}
function addDeadParticles(){
  if(escalation < 2) return;
  const count=2+escalation;
  for(let i=0;i<count;i++){
    const p=document.createElement('i');
    p.className='dead-particle';
    p.style.left=Math.random()*100+'vw';
    p.style.top=Math.random()*100+'vh';
    p.style.background=Math.random()<.5?'#55f5ff':(Math.random()<.5?'#ff3158':'#d95cff');
    p.style.setProperty('--dx',(Math.random()*80-40)+'px');
    p.style.setProperty('--dy',(Math.random()*60-30)+'px');
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1900);
  }
}
function crackMoment(){
  if(escalation < 2) return;
  const f=document.createElement('div'); f.className='crack-flash';
  document.body.appendChild(f); setTimeout(()=>f.remove(),220);
}
function updateEscalation(){
  staySeconds++;
  const next = staySeconds<20 ? 0 :
               staySeconds<45 ? 1 :
               staySeconds<90 ? 2 :
               staySeconds<150 ? 3 :
               staySeconds<240 ? 4 : 5;
  if(next !== escalation){
    escalation=next;
    document.body.classList.remove('escalation-0','escalation-1','escalation-2','escalation-3','escalation-4','escalation-5');
    document.body.classList.add('escalation-'+escalation);
    if(escalation>=2) toast(escalation===2?'DISPLAY NOISE INCREASING // SYSTEM STABLE':'DISPLAY ANOMALY DETECTED // FUNCTIONS NORMAL');
  }
  drawStatic();
  if(Math.random()<.35) tinyGlitch();
  if(Math.random()<.42) addDeadParticles();
  if(escalation>=3 && Math.random()<.10) crackMoment();
}
setInterval(updateEscalation,1000);

['mousemove','click','keydown','touchstart','scroll'].forEach(ev=>{
  window.addEventListener(ev,()=>{lastActivity=Date.now()},{passive:true});
});

let idleWarned=false;
setInterval(()=>{
  const idle=(Date.now()-lastActivity)/1000;
  if(idle>18 && escalation>=2 && !idleWarned){
    idleWarned=true;
    toast('...ARE YOU STILL STUDYING?');
  }
  if(idle<4) idleWarned=false;
},1000);


// ===== DEADPIXEL: SLOW-BURN ATMOSPHERE ENGINE =====
let atmosphereSeconds = 0;
let atmosphereStage = 0;
let lastAmbient = 0;

function setAtmosphereStage(stage){
  if(stage === atmosphereStage) return;
  atmosphereStage = stage;
  document.body.classList.remove('atmo-1','atmo-2','atmo-3','atmo-4','atmo-5');
  if(stage) document.body.classList.add('atmo-'+stage);
}

function spawnPixelDust(){
  const n = 8 + Math.floor(Math.random()*14);
  for(let i=0;i<n;i++){
    const p=document.createElement('i'); p.className='pixelDust';
    p.style.left=(5+Math.random()*90)+'vw';
    p.style.top=(10+Math.random()*80)+'vh';
    p.style.setProperty('--dx',(Math.random()*70-35)+'px');
    p.style.setProperty('--dy',(Math.random()*50-25)+'px');
    p.style.background = Math.random()>.5 ? '#ff2fa4' : '#55f5ff';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1250);
  }
}
function tinyScreenTear(){
  document.body.classList.add('microGlitch');
  const f=document.getElementById('glitchFlash');
  f.style.opacity='.18';
  setTimeout(()=>{document.body.classList.remove('microGlitch');f.style.opacity='0'},160);
}
function showGhostMessage(){
  const g=document.getElementById('ghostMessage');
  const messages=[
    'SIGNAL STABLE',
    'PIXEL MAP RECHECKING...',
    '...ARE YOU STILL STUDYING?',
    'DISPLAY INTEGRITY: ACCEPTABLE',
    'NO ACTION REQUIRED'
  ];
  g.textContent=messages[Math.floor(Math.random()*messages.length)];
  g.style.opacity='.18';
  setTimeout(()=>g.style.opacity='0',900);
}
function atmosphericTick(){
  atmosphereSeconds++;
  let stage = atmosphereSeconds < 20 ? 0 :
              atmosphereSeconds < 45 ? 1 :
              atmosphereSeconds < 75 ? 2 :
              atmosphereSeconds < 120 ? 3 : 4;
  if(atmosphereSeconds >= 240) stage=5;
  setAtmosphereStage(stage);

  if(atmosphereSeconds < 20) return;

  const chance = Math.min(.06 + stage*.035, .22);
  if(Math.random() < chance) tinyScreenTear();
  if(stage >= 2 && Math.random() < .12) spawnPixelDust();
  if(stage >= 3 && Math.random() < .08) showGhostMessage();

  if(stage >= 4 && Math.random() < .035){
    const c=document.getElementById('crackOverlay');
    c.classList.add('crackPulse');
    setTimeout(()=>c.classList.remove('crackPulse'),700);
  }
}
setInterval(atmosphericTick,1000);

let idleTimer;
function resetIdle(){
  clearTimeout(idleTimer);
  idleTimer=setTimeout(()=>{
    if(atmosphereStage>=2) showGhostMessage();
    else toast('PIXEL_01: Still there?');
  },18000);
}
['mousemove','keydown','click','touchstart','scroll'].forEach(e=>document.addEventListener(e,resetIdle,{passive:true}));
resetIdle();


function toggleNotifications(){
  document.getElementById('notificationPanel').classList.toggle('show');
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') document.getElementById('notificationPanel').classList.remove('show');
  if((e.key==='f'||e.key==='F') && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) showScreen('focus');
});
