const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

/* Enquadramento muda conforme o scroll */
const lab=document.getElementById('frameLab');
const frame=document.getElementById('ratioFrame');
const label=document.getElementById('ratioLabel');
function updateRatio(){
  if(!lab||!frame)return;
  const r=lab.getBoundingClientRect();
  const total=lab.offsetHeight-innerHeight;
  const p=clamp(-r.top/Math.max(total,1),0,1);
  if(p<.34){
    frame.style.aspectRatio='9 / 16';frame.style.height='66vh';frame.style.width='auto';label.textContent='9:16';
  }else if(p<.67){
    frame.style.aspectRatio='1 / 1';frame.style.height='58vh';frame.style.width='58vh';label.textContent='1:1';
  }else{
    frame.style.aspectRatio='16 / 9';frame.style.height='auto';frame.style.width='min(84vw,1050px)';label.textContent='16:9';
  }
}
addEventListener('scroll',updateRatio,{passive:true});updateRatio();

/* Vídeos só rodam quando estão visíveis */
document.querySelectorAll('video').forEach(v=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting)v.play().catch(()=>{});
    else v.pause();
  }),{threshold:.25});
  io.observe(v);
});

/* Fotos entram conforme a navegação */
document.querySelectorAll('.photo-flow figure').forEach((f,i)=>{
  f.style.opacity='.12';f.style.translate=`0 ${30+(i%3)*12}px`;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){f.style.transition='opacity .7s ease, translate .8s ease';f.style.opacity='1';f.style.translate='0 0';}
  }),{threshold:.12});
  io.observe(f);
});

/* Conversa surpresa */
const chat=document.getElementById('chatSurprise');
const breakSection=document.getElementById('breakSection');
const typing=document.getElementById('typing');
const m1=document.getElementById('message1');
const m2=document.getElementById('message2');
const actions=document.getElementById('chatActions');
const status=document.getElementById('chatStatus');
let shown=false;
function hideChat(){chat?.classList.remove('show');chat?.setAttribute('aria-hidden','true')}
function showChat(){
  if(shown||!chat)return;shown=true;
  chat.classList.add('show');chat.setAttribute('aria-hidden','false');
  setTimeout(()=>{if(typing)typing.style.display='none';m1?.classList.add('appear')},1200);
  setTimeout(()=>{m2?.classList.add('appear');if(status)status.textContent='online'},2150);
  setTimeout(()=>actions?.classList.add('show'),2850);
}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!shown)setTimeout(showChat,650)}),{threshold:.5});
if(breakSection)cio.observe(breakSection);
document.getElementById('chatClose')?.addEventListener('click',hideChat);
document.getElementById('chatContinue')?.addEventListener('click',hideChat);
chat?.addEventListener('click',e=>{if(e.target===chat)hideChat()});


/* V2.1 mobile: reduzir movimentos pesados e melhorar autoplay */
const isMobile = matchMedia('(max-width:700px)').matches;

if (isMobile) {
  // preserva bateria e fluidez: só um vídeo por vez
  const vids = Array.from(document.querySelectorAll('video'));
  const mobileObs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const v = entry.target;
      if(entry.isIntersecting && entry.intersectionRatio > .55){
        vids.forEach(other=>{ if(other!==v) other.pause(); });
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }, {threshold:[0,.55,1]});
  vids.forEach(v=>mobileObs.observe(v));
}
