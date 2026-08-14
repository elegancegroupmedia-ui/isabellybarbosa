document.getElementById('year').textContent=new Date().getFullYear();
const vids=[...document.querySelectorAll('.work-card video')];
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.play().catch(()=>{})}else e.target.pause()}),{threshold:.65});vids.forEach(v=>obs.observe(v));
