const page = document.body.dataset.page;

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === page) link.classList.add("active");
});

const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => mobileMenu.classList.toggle("open"));
}

document.querySelectorAll(".nav-drop").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const item = button.closest(".nav-item");
    document.querySelectorAll(".nav-item.open").forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove("open");
    });
    item?.classList.toggle("open");
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-item")) {
    document.querySelectorAll(".nav-item.open").forEach((item) => item.classList.remove("open"));
  }
});

document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const original = button.textContent;
    button.textContent = "Subscribed";
    setTimeout(() => {
      button.textContent = original;
      form.reset();
      document.querySelector("[data-newsletter]")?.classList.remove("open");
      sessionStorage.setItem("newsletter_dismissed", "true");
    }, 900);
  });
});

const modal = document.querySelector("[data-newsletter]");
if (modal && !sessionStorage.getItem("newsletter_dismissed")) {
  setTimeout(() => modal.classList.add("open"), 4000);
}
document.querySelectorAll("[data-newsletter-close]").forEach((button) => {
  button.addEventListener("click", () => {
    modal?.classList.remove("open");
    sessionStorage.setItem("newsletter_dismissed", "true");
  });
});
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("open");
    sessionStorage.setItem("newsletter_dismissed", "true");
  }
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

if (window.lucide) {
  window.lucide.createIcons();
}
