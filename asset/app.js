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
})();
