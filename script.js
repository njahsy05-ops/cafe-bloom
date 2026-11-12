const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const status = contactForm.querySelector(".form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector("#name");
    const email = contactForm.querySelector("#email");
    const subject = contactForm.querySelector("#subject");
    const message = contactForm.querySelector("#message");

    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !subject.value.trim() ||
      !message.value.trim()
    ) {
      status.textContent = "Vänligen fyll i alla obligatoriska fält.";
      status.style.color = "#b42318";
      return;
    }

    if (!email.validity.valid) {
      status.textContent = "Ange en giltig e-postadress.";
      status.style.color = "#b42318";
      return;
    }

    status.textContent =
      "Tack! Detta är ett demonstrationsformulär. Inga uppgifter har skickats eller sparats.";
    status.style.color = "#287047";

    contactForm.reset();
  });
}