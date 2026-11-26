/* =========================================================
   Café Bloom – JavaScript
   1. Mobilmeny        (alla sidor)
   2. Menyfilter       (meny.html)
   3. Formulärvalidering (kontakt.html)
   ========================================================= */


/* ---------- 1. Mobilmeny ---------- */

const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navIcon = navToggle.querySelector("span");

navToggle.addEventListener("click", function () {
  // toggle() lägger till klassen om den saknas, annars tas den bort.
  // Den returnerar true om menyn nu är öppen.
  const isOpen = mainNav.classList.toggle("open");

  // Berätta för skärmläsare om menyn är öppen eller stängd
  navToggle.setAttribute("aria-expanded", isOpen);

  if (isOpen) {
    navIcon.textContent = "✕";
    navToggle.setAttribute("aria-label", "Stäng meny");
  } else {
    navIcon.textContent = "☰";
    navToggle.setAttribute("aria-label", "Öppna meny");
  }
});
