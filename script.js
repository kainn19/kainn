/* ===================================================================
   KAINN Portfolio — script.js
   All interactions are vanilla JS, zero dependencies, zero build step.

   TO ADD A NEW PROJECT LATER:
   1. Drop your images into a new folder inside /assets/ (e.g. assets/newproject/)
   2. Add one object to the PROJECTS array below — copy an existing one as a template.
   3. Save. That's it — the page builds itself from this array.
   =================================================================== */

const PROJECTS = [
  {
    id: 'risktakers',
    category: 'Streetwear Campaign',
    title: 'RiskTakers',
    place: 'Sarajevo',
    tagline: 'A war-memorial-inspired concept shoot that led to a real brand collaboration.',
    type: 'gallery',
    folder: 'assets/risktakers/',
    images: ['rt03.jpg','rt04.jpg','rt09.jpg','rt10.jpg','rt01.jpg','rt06.jpg','rt02.jpg','rt05.jpg','rt07.jpg','rt08.jpg','rt11.jpg']
  },
  {
    id: 'steezera',
    category: 'Streetwear Campaign',
    title: 'Steezera',
    place: 'Paris',
    tagline: 'A Paris-set campaign concept — where corporate paperwork meets streetwear rebellion.',
    type: 'gallery',
    folder: 'assets/steezera/',
    images: ['sz03.jpg','sz02.jpg','sz01.jpg','sz09.jpg','sz04.jpg','sz06.jpg','sz07.jpg','sz08.jpg','sz05.jpg','sz10.jpg']
  },
  {
    id: '2mzone',
    category: 'Streetwear Campaign',
    title: '2M Zone',
    place: 'Studio',
    tagline: 'A studio-shot campaign concept — sharp, minimal, unapologetic.',
    type: 'gallery',
    folder: 'assets/2mzone/',
    images: ['mz02.jpg','mz04.jpg','mz03.jpg','mz01.jpg','mz05.jpg','mz06.jpg','mz07.jpg']
  },
  {
    id: 'prch',
    category: 'Streetwear Campaign',
    title: 'PRCH Streetwear',
    place: 'Arctic Expedition',
    tagline: 'An Arctic expedition-inspired concept — cold, remote, uncompromising.',
    type: 'gallery',
    folder: 'assets/prch/',
    images: ['pr01.jpg','pr05.jpg','pr03.jpg','pr02.jpg','pr07.jpg','pr04.jpg','pr06.jpg','pr08.jpg']
  },
  {
    id: 'stndby',
    category: 'AI Video',
    title: 'STND BY',
    place: 'AI-Generated Video',
    tagline: 'Proof that trend-driven video content can be AI-generated too — any idea, any trend, brought to life on request.',
    type: 'video',
    folder: 'assets/stndby/',
    video: 'stndby.mp4',
    poster: 'poster.jpg'
  }
];

const IN_DEVELOPMENT = [
  {
    title: 'amazeeri_',
    note: 'A visual identity rooted in cultural heritage, embroidery, and Algerian Saharan imagery.',
    status: 'In Development'
  },
  {
    title: 'Algerian Sahara',
    note: 'A concept project set in Tassili n\u2019Ajjer / Djanet.',
    status: 'In Development'
  }
];

/* ---------------- render projects ---------------- */
const projectsRoot = document.getElementById('projectsRoot');

function galleryItemHTML(project, src, i){
  const wide = (i % 5 === 2);
  return `
    <button class="gallery-item${wide ? ' wide':''}" data-fullsrc="${project.folder}${src}" data-project="${project.id}" data-index="${i}" aria-label="Open image ${i+1} of ${project.title}">
      <img src="${project.folder}${src}" alt="${project.title} — visual ${i+1}" loading="lazy">
      <span class="gi-overlay">${project.title} / ${String(i+1).padStart(2,'0')}</span>
    </button>`;
}

function projectHTML(project, index){
  const num = String(index+1).padStart(2,'0');
  let media = '';
  if(project.type === 'gallery'){
    media = `<div class="gallery" data-gallery>${project.images.map((src,i)=>galleryItemHTML(project,src,i)).join('')}</div>`;
  } else if(project.type === 'video'){
    media = `
      <div class="project-video">
        <video src="${project.folder}${project.video}" poster="${project.folder}${project.poster}" playsinline muted loop preload="metadata"></video>
        <button class="video-play" aria-label="Play video">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#f3efe6" stroke-width="1"/><path d="M10 8l6 4-6 4V8z" fill="#f3efe6"/></svg>
        </button>
      </div>`;
  }
  return `
    <article class="project reveal" data-category="${project.category}" id="${project.id}">
      <div class="project-head">
        <div>
          <span class="project-index">${num} / ${String(PROJECTS.length).padStart(2,'0')} — ${project.place}</span>
          <h3 class="project-title">${project.title}</h3>
        </div>
        <div class="project-meta">
          <p class="project-tagline">${project.tagline}</p>
          <div class="project-tags"><span class="tag">${project.category}</span></div>
        </div>
      </div>
      ${media}
    </article>`;
}

projectsRoot.innerHTML = PROJECTS.map(projectHTML).join('');

/* in-development list */
const devRoot = document.getElementById('devRoot');
devRoot.innerHTML = IN_DEVELOPMENT.map(d => `
  <div class="dev-item">
    <h4>${d.title}</h4>
    <p>${d.note}</p>
    <span class="dev-status">${d.status}</span>
  </div>
`).join('');

/* ---------------- filters ---------------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectEls = () => document.querySelectorAll('.project');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    projectEls().forEach(p=>{
      const show = cat === 'All' || p.dataset.category === cat;
      p.style.display = show ? '' : 'none';
    });
  });
});

/* ---------------- gallery drag-to-scroll (desktop) ---------------- */
document.querySelectorAll('[data-gallery]').forEach(gallery=>{
  let isDown = false, startX, scrollLeft;
  gallery.addEventListener('mousedown', e=>{
    isDown = true; gallery.classList.add('dragging');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });
  ['mouseleave','mouseup'].forEach(evt=>{
    gallery.addEventListener(evt, ()=>{ isDown=false; gallery.classList.remove('dragging'); });
  });
  gallery.addEventListener('mousemove', e=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    gallery.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
});

/* ---------------- lightbox ---------------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentGalleryImgs = [];
let currentIndex = 0;

function openLightbox(project, index){
  const btn = document.querySelector(`.gallery-item[data-project="${project}"][data-index="${index}"]`);
  const galleryEl = btn.closest('[data-gallery]');
  currentGalleryImgs = Array.from(galleryEl.querySelectorAll('.gallery-item')).map(el=>el.dataset.fullsrc);
  currentIndex = index;
  showLightbox();
}
function showLightbox(){
  lightboxImg.src = currentGalleryImgs[currentIndex];
  lightbox.classList.add('open');
}
document.addEventListener('click', e=>{
  const item = e.target.closest('.gallery-item');
  if(item){
    openLightbox(item.dataset.project, parseInt(item.dataset.index,10));
  }
});
document.getElementById('lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
document.getElementById('lightboxPrev').addEventListener('click', ()=>{
  currentIndex = (currentIndex - 1 + currentGalleryImgs.length) % currentGalleryImgs.length;
  showLightbox();
});
document.getElementById('lightboxNext').addEventListener('click', ()=>{
  currentIndex = (currentIndex + 1) % currentGalleryImgs.length;
  showLightbox();
});
lightbox.addEventListener('click', e=>{ if(e.target === lightbox) lightbox.classList.remove('open'); });
document.addEventListener('keydown', e=>{
  if(!lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') lightbox.classList.remove('open');
  if(e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
  if(e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
});

/* ---------------- video play/pause ---------------- */
document.querySelectorAll('.project-video').forEach(wrap=>{
  const video = wrap.querySelector('video');
  const playBtn = wrap.querySelector('.video-play');
  playBtn.addEventListener('click', ()=>{
    if(video.paused){ video.play(); playBtn.classList.add('hidden'); }
    else { video.pause(); playBtn.classList.remove('hidden'); }
  });
  video.addEventListener('click', ()=> playBtn.click());
});

/* ---------------- scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
revealEls.forEach(el=> io.observe(el));

/* ---------------- loader ---------------- */
window.addEventListener('load', ()=>{
  const loader = document.getElementById('loader');
  setTimeout(()=> loader.classList.add('hidden'), 500);
});
// failsafe in case load event is delayed
setTimeout(()=>{
  document.getElementById('loader').classList.add('hidden');
}, 3200);

/* ---------------- custom cursor (desktop, fine pointer only) ---------------- */
if(window.matchMedia('(pointer:fine)').matches){
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  let mx=0,my=0,cx=0,cy=0;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
  function loop(){
    cx += (mx-cx)*0.18; cy += (my-cy)*0.18;
    cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    cursorLabel.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('.gallery-item, .project-video').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      cursor.style.width='54px'; cursor.style.height='54px';
      cursorLabel.textContent = 'VIEW';
      cursorLabel.classList.add('show');
    });
    el.addEventListener('mouseleave', ()=>{
      cursor.style.width='14px'; cursor.style.height='14px';
      cursorLabel.classList.remove('show');
    });
  });
  document.querySelectorAll('a, button').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{ cursor.style.width='28px'; cursor.style.height='28px'; });
    el.addEventListener('mouseleave', ()=>{
      if(!cursorLabel.classList.contains('show')){ cursor.style.width='14px'; cursor.style.height='14px'; }
    });
  });
} else {
  document.getElementById('cursor')?.remove();
  document.getElementById('cursorLabel')?.remove();
}

/* ---------------- hero parallax (cheap, rAF-throttled) ---------------- */
const heroBg = document.querySelector('.hero-bg');
let ticking = false;
window.addEventListener('scroll', ()=>{
  if(!ticking && heroBg){
    requestAnimationFrame(()=>{
      const y = window.scrollY;
      if(y < window.innerHeight){
        heroBg.style.transform = `translateY(${y*0.25}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
});

/* ---------------- mobile nav drawer ---------------- */
const navToggle = document.getElementById('navToggle');
const navDrawer = document.getElementById('navDrawer');
if(navToggle){
  navToggle.addEventListener('click', ()=>{
    navDrawer.classList.toggle('open');
  });
  navDrawer.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> navDrawer.classList.remove('open'));
  });
}

/* ---------------- current year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();
