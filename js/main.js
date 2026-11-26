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


/* ---------- 3. Formulärvalidering ---------- */

const form = document.querySelector("#contact-form");

// Koden körs bara på sidan som har formuläret
if (form) {
  const nameField = document.querySelector("#name");
  const emailField = document.querySelector("#email");
  const subjectField = document.querySelector("#subject");
  const messageField = document.querySelector("#message");
  const successText = document.querySelector("#form-success");

  form.addEventListener("submit", function (event) {
    // Stoppa att sidan laddas om när formuläret skickas
    event.preventDefault();

    let formIsValid = true;

    // Namn: minst 2 tecken
    if (nameField.value.trim().length < 2) {
      showError(nameField, "Skriv ditt namn (minst 2 tecken).");
      formIsValid = false;
    } else {
      clearError(nameField);
    }

    // E-post: måste se ut som namn@domän.se
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
      showError(emailField, "Skriv en giltig e-postadress, t.ex. namn@exempel.se.");
      formIsValid = false;
    } else {
      clearError(emailField);
    }

    // Ämne: får inte vara tomt
    if (subjectField.value.trim() === "") {
      showError(subjectField, "Skriv vad ditt meddelande gäller.");
      formIsValid = false;
    } else {
      clearError(subjectField);
    }

    // Meddelande: minst 10 tecken
    if (messageField.value.trim().length < 10) {
      showError(messageField, "Skriv ett meddelande på minst 10 tecken.");
      formIsValid = false;
    } else {
      clearError(messageField);
    }

    if (formIsValid) {
      successText.textContent = "Tack " + nameField.value.trim() + "! Ditt meddelande har tagits emot.";
      form.reset();
    } else {
      successText.textContent = "";
      // Flytta fokus till första felaktiga fältet
      form.querySelector(".invalid").focus();
    }
  });
}

// Visar ett felmeddelande under ett fält
function showError(field, message) {
  const errorText = document.querySelector("#" + field.id + "-error");
  errorText.textContent = message;
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
}

// Tar bort felmeddelandet när fältet är rätt ifyllt
function clearError(field) {
  const errorText = document.querySelector("#" + field.id + "-error");
  errorText.textContent = "";
  field.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
}
