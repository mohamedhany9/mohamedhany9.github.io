const btn=document.getElementById("themeBtn");
const saved=localStorage.getItem("mh-theme");
if(saved==="light") document.body.classList.add("light");
btn.addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("mh-theme",document.body.classList.contains("light")?"light":"dark");
});

/* ================= Project screenshot carousels ================= */
function initGallery(gallery){
  const data=JSON.parse(gallery.querySelector(".gallery-data").textContent);
  const main=gallery.querySelector(".gallery-main");
  const prevImg=gallery.querySelector(".gallery-peek-prev");
  const nextImg=gallery.querySelector(".gallery-peek-next");
  const count=gallery.querySelector(".gallery-count");
  const dotsBox=gallery.querySelector(".gallery-dots");
  const tabs=[...gallery.querySelectorAll("[data-set-tab]")];
  const name=gallery.dataset.name;
  let set=Number(gallery.dataset.set||0), index=Number(gallery.dataset.index||0);
  const items=()=>data.sets[set].items;
  const pad=n=>String(n).padStart(2,"0");
  const preload=src=>{const i=new Image();i.decoding="async";i.src=src;};
  const warm=()=>{const l=items();[-2,-1,0,1,2].forEach(o=>preload(l[(index+o+l.length)%l.length].src));};
  const renderDots=()=>{
    dotsBox.innerHTML=items().map((_,n)=>`<button type="button" data-slide="${n}" aria-label="Show screenshot ${n+1}"></button>`).join("");
  };
  const show=(i)=>{
    const l=items(); index=(i+l.length)%l.length;
    gallery.dataset.index=index; gallery.dataset.set=set;
    const cur=l[index];
    main.src=cur.src; main.alt=cur.alt;
    prevImg.src=l[(index-1+l.length)%l.length].src;
    nextImg.src=l[(index+1)%l.length].src;
    count.innerHTML=`${pad(index+1)} / ${pad(l.length)}<em> · ${cur.cap}</em>`;
    [...dotsBox.children].forEach((d,n)=>{d.classList.toggle("active",n===index);d.setAttribute("aria-current",n===index?"true":"false");});
    warm();
  };
  gallery.querySelector(".prev").addEventListener("click",()=>show(index-1));
  gallery.querySelector(".next").addEventListener("click",()=>show(index+1));
  dotsBox.addEventListener("click",e=>{const b=e.target.closest("[data-slide]");if(b)show(Number(b.dataset.slide));});
  tabs.forEach(t=>t.addEventListener("click",()=>{
    set=Number(t.dataset.setTab);
    tabs.forEach(x=>x.setAttribute("aria-selected",String(x===t)));
    renderDots(); show(0);
  }));
  gallery.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"){show(index-1);e.preventDefault();}
    if(e.key==="ArrowRight"){show(index+1);e.preventDefault();}
  });
  // swipe on touch screens
  const stage=gallery.querySelector(".gallery-stage");
  let sx=null;
  stage.addEventListener("touchstart",e=>{sx=e.touches[0].clientX;},{passive:true});
  stage.addEventListener("touchend",e=>{
    if(sx===null)return; const dx=e.changedTouches[0].clientX-sx; sx=null;
    if(Math.abs(dx)>45)show(dx<0?index+1:index-1);
  });
  // sync with a (possibly cloned) initial state
  tabs.forEach((t,n)=>t.setAttribute("aria-selected",String(n===set)));
  renderDots(); show(index);
  const warmAll=()=>items().forEach(i=>preload(i.src));
  "requestIdleCallback" in window ? requestIdleCallback(warmAll,{timeout:2500}) : setTimeout(warmAll,1200);
}
document.querySelectorAll("[data-gallery]").forEach(initGallery);

/* ---------- Project dialog: bigger gallery + full details ---------- */
(()=>{
  const viewer=document.createElement("div");
  viewer.className="project-viewer";
  viewer.setAttribute("aria-hidden","true");
  viewer.innerHTML='<div class="project-dialog" role="dialog" aria-modal="true" aria-label="Project details"><button type="button" class="project-dialog-close" aria-label="Close project details">×</button><div class="project-dialog-content"></div></div>';
  document.body.append(viewer);
  const content=viewer.querySelector(".project-dialog-content");
  const closeBtn=viewer.querySelector(".project-dialog-close");
  let trigger=null;

  const close=()=>{
    viewer.classList.remove("open");
    viewer.setAttribute("aria-hidden","true");
    document.body.classList.remove("project-open");
    content.innerHTML="";
    if(trigger&&trigger.focus)trigger.focus();
  };
  const open=(card,from)=>{
    trigger=from||card;
    const gal=card.querySelector(".project-gallery").cloneNode(true);
    const copy=card.querySelector(".project-copy").cloneNode(true);
    content.innerHTML="";
    const g=document.createElement("div"); g.className="project-dialog-gallery"; g.append(gal);
    const c=document.createElement("div"); c.className="project-dialog-copy"; c.append(copy);
    content.append(g,c);
    viewer.style.setProperty("--project-accent",card.style.getPropertyValue("--project-accent"));
    initGallery(gal);
    viewer.classList.add("open");
    viewer.setAttribute("aria-hidden","false");
    document.body.classList.add("project-open");
    closeBtn.focus();
  };

  document.addEventListener("click",e=>{
    if(e.target.closest(".project-viewer"))return;
    const card=e.target.closest("[data-project-card]");
    if(!card)return;
    if(e.target.closest("a,.gallery-arrow,.gallery-dots,.gallery-tabs,.gallery-bar"))return;
    const expand=e.target.closest(".gallery-expand");
    const inGallery=e.target.closest(".project-gallery");
    if(inGallery&&!expand&&!e.target.closest(".gallery-main"))return;
    open(card,expand||card);
  });
  closeBtn.addEventListener("click",close);
  viewer.addEventListener("click",e=>{if(e.target===viewer)close();});
  document.addEventListener("keydown",e=>{
    if(!viewer.classList.contains("open"))return;
    if(e.key==="Escape")close();
    if((e.key==="ArrowLeft"||e.key==="ArrowRight")&&!(e.target.closest&&e.target.closest(".project-gallery"))){
      const g=viewer.querySelector(".project-gallery");
      if(g){g.dispatchEvent(new KeyboardEvent("keydown",{key:e.key,bubbles:true}));e.preventDefault();}
    }
  });
})();
