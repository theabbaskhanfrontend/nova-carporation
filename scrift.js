// =========================
// NAVBAR
// =========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});


// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});


// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
  ".service-card, .project-card, .process-item, .section-content, .section-image, .testimonial, .cta"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});


// =========================
// ACTIVE NAV LINK
// =========================

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});


// =========================
// ANIMATED NUMBER COUNTERS
// =========================

const counters = document.querySelectorAll(".hero-stats strong");

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseInt(counter.textContent);
      const suffix = counter.textContent.replace(/[0-9]/g, "");

      let current = 0;
      const duration = 1400;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + suffix;
        }
      };

      updateCounter();
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.8 }
);

counters.forEach(counter => counterObserver.observe(counter));


// =========================
// HERO PARALLAX
// =========================

const heroImage = document.querySelector(".hero-image");

window.addEventListener("scroll", () => {

  if (!heroImage) return;

  const scrollValue = window.scrollY;

  if (scrollValue < window.innerHeight) {
    heroImage.style.transform =
      `translateY(${scrollValue * 0.08}px)`;
  }
});


// =========================
// PROJECT CARD MOVEMENT
// =========================

document.querySelectorAll(".project-card").forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -4;
    const rotateY = ((x / rect.width) - 0.5) * 4;

    card.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// =========================
// SMOOTH BUTTON FEEDBACK
// =========================

document.querySelectorAll(".primary-btn, .secondary-btn").forEach(button => {

  button.addEventListener("mouseenter", () => {
    button.style.transition = "transform 0.25s ease";
  });

});


// =========================
// CONTACT
// =========================

document.querySelectorAll('a[href^="mailto:"]').forEach(button => {
  button.addEventListener("click", () => {
    console.log("Opening email client...");
  });
});