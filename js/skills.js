const skillCards = document.querySelectorAll(".skill-card");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.style.opacity = 1;
    entry.target.style.transform = "translateY(0)";
    obs.unobserve(entry.target);
  });
}, observerOptions);

skillCards.forEach(card => observer.observe(card));
