const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const frameLab=document.getElementById('frameLab');
const ratioFrame=document.getElementById('ratioFrame');
const ratioLabel=document.getElementById('ratioLabel');

function updateFrame(){
  if(!frameLab||!ratioFrame)return;
  const r=frameLab.getBoundingClientRect();
  const total=frameLab.offsetHeight-innerHeight;
  const p=clamp(-r.top/Math.max(total,1),0,1);
  if(p<.34){
    ratioFrame.style.aspectRatio='9 / 16';
    ratioFrame.style.height='66vh';
    ratioFrame.style.width='auto';
    ratioLabel.textContent='9:16';
  }else if(p<.67){
    ratioFrame.style.aspectRatio='1 / 1';
    ratioFrame.style.height='58vh';
    ratioFrame.style.width='58vh';
    ratioLabel.textContent='1:1';
  }else{
    ratioFrame.style.aspectRatio='16 / 9';
    ratioFrame.style.height='auto';
    ratioFrame.style.width='min(82vw,1000px)';
    ratioLabel.textContent='16:9';
  }
}
addEventListener('scroll',updateFrame,{passive:true});updateFrame();

const reveal=document.getElementById('revealZone');
const light=document.getElementById('flashlight');
function moveLight(x,y){
  if(!reveal||!light)return;
  const r=reveal.getBoundingClientRect();
  light.style.left=(x-r.left)+'px';
  light.style.top=(y-r.top)+'px';
}
reveal?.addEventListener('pointermove',e=>moveLight(e.clientX,e.clientY));
reveal?.addEventListener('touchmove',e=>{const t=e.touches[0];moveLight(t.clientX,t.clientY)},{passive:true});

// Surpresa narrativa: a própria página começa a conversar.
const chat = document.getElementById('chatSurprise');
const breakSection = document.getElementById('breakSection');
const typing = document.getElementById('typing');
const message1 = document.getElementById('message1');
const message2 = document.getElementById('message2');
const actions = document.getElementById('chatActions');
const status = document.getElementById('chatStatus');
const closeChat = document.getElementById('chatClose');
const continueChat = document.getElementById('chatContinue');
let chatShown = false;

function hideChat(){
  chat?.classList.remove('show');
  chat?.setAttribute('aria-hidden','true');
}
function showChat(){
  if(chatShown || !chat) return;
  chatShown = true;
  chat.classList.add('show');
  chat.setAttribute('aria-hidden','false');
  setTimeout(()=>{ if(typing) typing.style.display='none'; message1?.classList.add('appear'); },1350);
  setTimeout(()=>{ message2?.classList.add('appear'); if(status) status.textContent='online'; },2300);
  setTimeout(()=>actions?.classList.add('show'),3000);
}
const chatObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && !chatShown) setTimeout(showChat,700);
  });
},{threshold:.5});
if(breakSection) chatObserver.observe(breakSection);
closeChat?.addEventListener('click',hideChat);
continueChat?.addEventListener('click',hideChat);
chat?.addEventListener('click',e=>{ if(e.target===chat) hideChat(); });

// subtle motion on manifesto text
const articles=[...document.querySelectorAll('.manifesto-lines article')];
const textIO=new IntersectionObserver(es=>es.forEach(e=>{
  e.target.style.transition='transform .7s ease,opacity .7s ease';
  e.target.style.transform=e.isIntersecting?'translateX(0)':'translateX(30px)';
  e.target.style.opacity=e.isIntersecting?'1':'.35';
}),{threshold:.3});
articles.forEach(a=>textIO.observe(a));
