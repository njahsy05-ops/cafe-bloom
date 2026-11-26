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


/* ---------- 2. Menyfilter ---------- */

const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

// Finns inga filterknappar (andra sidor) körs loopen helt enkelt inte
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Vilken kategori knappen står för, t.ex. "kaffe" (från data-filter)
    const category = button.dataset.filter;

    // Markera bara den klickade knappen som vald
    filterButtons.forEach(function (otherButton) {
      otherButton.setAttribute("aria-pressed", "false");
    });
    button.setAttribute("aria-pressed", "true");

    // Visa kort som matchar kategorin, dölj resten.
    // Inget tas bort – korten göms bara med attributet hidden.
    menuCards.forEach(function (card) {
      if (category === "alla" || card.dataset.category === category) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });
  });
});
