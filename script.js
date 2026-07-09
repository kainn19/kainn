/* ===================================================================
   KAINN Portfolio — script.js
   All interactions are vanilla JS, zero dependencies, zero build step.
   Every feature block below is wrapped in try/catch so a failure in
   one (e.g. an unsupported API) can never silently break the rest.

   TO ADD A NEW PROJECT LATER:
   1. Drop your images into a new folder inside /assets/ (e.g. assets/newproject/)
   2. Add one object to the PROJECTS array below — copy an existing one as a template.
      Order the "images" array in the sequence you want them to appear on screen —
      first item shown first, last item shown last.
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
    // establishing location -> mood -> concept quote -> portraits -> action -> closing detail
    images: ['rt04.jpg','rt03.jpg','rt01.jpg','rt09.jpg','rt10.jpg','rt11.jpg','rt08.jpg','rt07.jpg','rt06.jpg','rt02.jpg','rt05.jpg']
  },
  {
    id: 'steezera',
    category: 'Streetwear Campaign',
    title: 'Steezera',
    place: 'Paris',
    tagline: 'A Paris-set campaign concept — where corporate paperwork meets streetwear rebellion.',
    type: 'gallery',
    folder: 'assets/steezera/',
    // title card -> concept statements -> portraits -> office scenes -> closing logo detail
    images: ['sz03.jpg','sz01.jpg','sz09.jpg','sz02.jpg','sz04.jpg','sz08.jpg','sz06.jpg','sz07.jpg','sz10.jpg','sz05.jpg']
  },
  {
    id: '2mzone',
    category: 'Streetwear Campaign',
    title: '2M Zone',
    place: 'Studio',
    tagline: 'A studio-shot campaign concept — sharp, minimal, unapologetic.',
    type: 'gallery',
    folder: 'assets/2mzone/',
    // BTS intro -> portraits -> candid action -> product detail closing
    images: ['mz01.jpg','mz06.jpg','mz03.jpg','mz04.jpg','mz02.jpg','mz05.jpg','mz07.jpg']
  },
  {
    id: 'prch',
    category: 'Streetwear Campaign',
    title: 'PRCH Streetwear',
    place: 'Arctic Expedition',
    tagline: 'An Arctic expedition-inspired concept — cold, remote, uncompromising.',
    type: 'gallery',
    folder: 'assets/prch/',
    // establishing wide -> brand mark -> hero portraits -> action -> closing detail
    images: ['pr01.jpg','pr02.jpg','pr05.jpg','pr04.jpg','pr03.jpg','pr06.jpg','pr07.jpg','pr08.jpg']
  },
  {
    id: 'amazeeri',
    category: 'Streetwear Campaign',
    title: 'amazeeri_',
    place: 'Algerian Sahara',
    tagline: 'A visual identity rooted in cultural heritage, embroidery, and Algerian Saharan imagery.',
    type: 'gallery',
    folder: 'assets/amazeeri/',
    // establishing wide -> environment drama -> portrait detail -> concept -> closing
    images: ['az05.jpg','az01.jpg','az02.jpg','az04.jpg','az03.jpg']
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
    title: 'Algerian Sahara',
    note: 'A concept project set in Tassili n\u2019Ajjer / Djanet.',
    status: 'In Development'
  }
];

/* ---------------- render projects ---------------- */
try {
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

  const devRoot = document.getElementById('devRoot');
  devRoot.innerHTML = IN_DEVELOPMENT.map(d => `
    <div class="dev-item">
      <h4>${d.title}</h4>
      <p>${d.note}</p>
      <span class="dev-status">${d.status}</span>
    </div>
  `).join('');
} catch(err){ console.error('KAINN: project render failed', err); }

/* ---------------- filters ---------------- */
try {
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
} catch(err){ console.error('KAINN: filters failed', err); }

/* ---------------- gallery drag-to-scroll (desktop) ---------------- */
try {
  document.querySelectorAll('[data-gallery]').forEach(gallery=>{
    let isDown = false, startX, scrollLeft, moved = false;

    gallery.addEventListener('mousedown', e=>{
      isDown = true; moved = false;
      gallery.classList.add('dragging');
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
      const delta = x - startX;
      if(Math.abs(delta) > 6) moved = true;
      gallery.scrollLeft = scrollLeft - delta * 1.4;
    });
    // if the user was actually dragging, swallow the click so it doesn't
    // also pop the lightbox open on release
    gallery.addEventListener('click', e=>{
      if(moved){ e.preventDefault(); e.stopPropagation(); }
    }, true);
  });
} catch(err){ console.error('KAINN: gallery drag failed', err); }

/* ---------------- lightbox ---------------- */
try {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  let currentGalleryImgs = [];
  let currentIndex = 0;

  function openLightbox(project, index){
    const btn = document.querySelector(`.gallery-item[data-project="${project}"][data-index="${index}"]`);
    if(!btn) return;
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
} catch(err){ console.error('KAINN: lightbox failed', err); }

/* ---------------- video play/pause ---------------- */
try {
  document.querySelectorAll('.project-video').forEach(wrap=>{
    const video = wrap.querySelector('video');
    const playBtn = wrap.querySelector('.video-play');
    playBtn.addEventListener('click', ()=>{
      if(video.paused){ video.play().catch(()=>{}); playBtn.classList.add('hidden'); }
      else { video.pause(); playBtn.classList.remove('hidden'); }
    });
    video.addEventListener('click', ()=> playBtn.click());
  });
} catch(err){ console.error('KAINN: video controls failed', err); }

/* ---------------- scroll reveal ---------------- */
try {
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('in'));
  }
} catch(err){ console.error('KAINN: scroll reveal failed', err); }

/* ---------------- custom cursor (desktop, fine pointer only) ---------------- */
try {
  if(window.matchMedia('(pointer:fine)').matches){
    const cursor = document.getElementById('cursor');
    const cursorLabel = document.getElementById('cursorLabel');
    let mx=0,my=0,cx=0,cy=0;
    window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
    function loop(){
      cx += (mx-cx)*0.18; cy += (my-cy)*0.18;
      if(cursor) cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      if(cursorLabel) cursorLabel.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();

    // gallery items & video get the "VIEW" label treatment
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
    // every other link/button gets a plain size bump — explicitly excluding
    // gallery items and the video wrapper so the two behaviors never fight
    document.querySelectorAll('a, button').forEach(el=>{
      if(el.closest('.gallery-item') || el.closest('.project-video')) return;
      el.addEventListener('mouseenter', ()=>{ cursor.style.width='28px'; cursor.style.height='28px'; });
      el.addEventListener('mouseleave', ()=>{
        if(!cursorLabel.classList.contains('show')){ cursor.style.width='14px'; cursor.style.height='14px'; }
      });
    });
  } else {
    document.getElementById('cursor')?.remove();
    document.getElementById('cursorLabel')?.remove();
  }
} catch(err){ console.error('KAINN: custom cursor failed', err); }

/* ---------------- hero parallax (cheap, rAF-throttled) ---------------- */
try {
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
} catch(err){ console.error('KAINN: parallax failed', err); }

/* ---------------- mobile nav drawer ---------------- */
try {
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
} catch(err){ console.error('KAINN: mobile nav failed', err); }

/* ---------------- current year ---------------- */
try {
  document.getElementById('year').textContent = new Date().getFullYear();
} catch(err){ console.error('KAINN: year failed', err); }
