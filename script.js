const navbar = document.querySelector(".custom-navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

/* Navbar scroll effect */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  updateActiveLink();
});

/* Active link on scroll */
function updateActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  sections.forEach(section => {
    if (
      scrollPos >= section.offsetTop &&
      scrollPos < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach(link => link.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}

/* Smooth scroll */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - navbar.offsetHeight,
      behavior: "smooth",
    });
  });
});

/* Fade-in + skill animation */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");

      if (entry.target.id === "skills") {
        document.querySelectorAll(".skill-bar").forEach(bar => {
          bar.querySelector("span").style.width = bar.dataset.percent;
        });
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".about-card, .section").forEach(el => observer.observe(el));
