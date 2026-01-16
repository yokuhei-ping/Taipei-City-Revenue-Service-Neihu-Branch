(() => {
  "use strict";

  // 手機漢堡選單
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  }

  // 下拉選單（宣導專區）
  const dropBtns = document.querySelectorAll(".dropBtn");

  function closeDrops() {
    document.querySelectorAll(".drop.open").forEach((d) => {
      d.classList.remove("open");
      const b = d.querySelector(".dropBtn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  if (dropBtns.length) {
    dropBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        const wrap = btn.closest(".drop");
        if (!wrap) return;

        // 先關掉其他已開的下拉
        document.querySelectorAll(".drop.open").forEach((d) => {
          if (d !== wrap) d.classList.remove("open");
        });

        const isOpen = wrap.classList.toggle("open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });

    // 點外面關閉
    document.addEventListener("click", closeDrops);

    // ESC 關閉
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrops();
    });
  }
  (() => {
  function initCarousel(root){
    const track = root.querySelector('.carouselTrack');
    const slides = Array.from(root.querySelectorAll('.carouselSlide'));
    const prev = root.querySelector('.carouselBtn.prev');
    const next = root.querySelector('.carouselBtn.next');
    const dotsWrap = root.querySelector('.carouselDots');
    const total = slides.length;
    if (!track || total <= 0) return;

    const interval = parseInt(root.dataset.interval || '4500', 10);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let idx = 0;
    let timer = null;

    // dots
    if (dotsWrap){
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'carouselDot';
        b.setAttribute('aria-label', `第 ${i+1} 張`);
        b.addEventListener('click', () => go(i, true));
        dotsWrap.appendChild(b);
      });
    }

    function update(){
      track.style.transform = `translateX(${-idx * 100}%)`;
      if (dotsWrap){
        Array.from(dotsWrap.children).forEach((d, i) => {
          d.classList.toggle('active', i === idx);
        });
      }
    }

    function go(i, user=false){
      idx = (i + total) % total;
      update();
      if (user) restart();
    }

    function start(){
      if (reduceMotion || total <= 1) return;
      timer = setInterval(() => go(idx + 1), interval);
    }
    function stop(){
      if (timer){ clearInterval(timer); timer = null; }
    }
    function restart(){ stop(); start(); }

    prev?.addEventListener('click', () => go(idx - 1, true));
    next?.addEventListener('click', () => go(idx + 1, true));

    // pause on hover/focus
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // swipe
    let startX = null;
    root.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stop();
    }, { passive:true });

    root.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1), true);
      startX = null;
      start();
    }, { passive:true });

    update();
    start();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(initCarousel);
  });
})();

})();
