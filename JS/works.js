const track = document.querySelector(".dock-track");
let slides = Array.from(track.children);

const titleEl = document.querySelector(".proj-title");
const roleEl = document.querySelector(".proj-role");
const descEl = document.querySelector(".proj-desc");

let currentCenter = Math.floor(slides.length / 2);

function updateActive() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentCenter].classList.add("active");
  updateInfo(slides[currentCenter]);
}

function updateInfo(slide){
  titleEl.textContent = slide.dataset.title;
  roleEl.textContent = slide.dataset.role;
  descEl.textContent = slide.dataset.desc;
}

updateActive();

function rotateRight() {
  if(currentCenter < slides.length - 1){
    currentCenter++;
    updateActive();
    setTrackPosition();
  }
}

function rotateLeft() {
  if(currentCenter > 0){
    currentCenter--;
    updateActive();
    setTrackPosition();
  }
}

function setTrackPosition(){
  const slideWidth = slides[currentCenter].offsetWidth + 32;
  track.style.transform = `translateX(${-slideWidth * currentCenter + track.offsetWidth/2 - slideWidth/2}px)`;
}


slides.forEach((slide, idx) => {
  slide.addEventListener("click", () => {
    currentCenter = idx;
    updateActive();
    setTrackPosition();
  });
});


let isDragging = false, startX = 0;

track.addEventListener("mousedown", dragStart);
track.addEventListener("touchstart", dragStart);
track.addEventListener("mouseup", dragEnd);
track.addEventListener("mouseleave", dragEnd);
track.addEventListener("touchend", dragEnd);
track.addEventListener("mousemove", dragMove);
track.addEventListener("touchmove", dragMove);

function dragStart(e){
  isDragging = true;
  startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  track.style.transition = "none";
}

function dragMove(e){
  if(!isDragging) return;
  const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  const delta = x - startX;
  track.style.transform = `translateX(${-slides[currentCenter].offsetWidth * currentCenter + track.offsetWidth/2 - slides[currentCenter].offsetWidth/2 + delta}px)`;
}

function dragEnd(e){
  if(!isDragging) return;
  isDragging = false;
  const x = e.type.includes("mouse") ? e.pageX : e.changedTouches[0].clientX;
  const delta = x - startX;
  if(delta < -50) rotateRight();
  else if(delta > 50) rotateLeft();
  else setTrackPosition(); 
  track.style.transition = "transform 0.5s ease";
}

setTrackPosition();
