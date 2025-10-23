document.addEventListener("DOMContentLoaded", () => {
  const photo = document.querySelector(".me-photo img");
  const content = document.querySelector(".me-content");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(photo);
  observer.observe(content);
});
