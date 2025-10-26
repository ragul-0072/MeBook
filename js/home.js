document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".intro, .tagline, .contact-btn");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach((el) => observer.observe(el));
});
