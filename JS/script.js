const dock = document.getElementById('dock-panel');
const items = Array.from(dock.getElementsByClassName('dock-item'));

const baseSize = 50;
const magnification = 70;
const distance = 200;


let mouseX = Infinity;

dock.addEventListener('mousemove', e => {
  mouseX = e.pageX;
});

dock.addEventListener('mouseleave', () => {
  mouseX = Infinity;
});


function animate() {
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.x + rect.width / 2;
    const dist = Math.abs(mouseX - itemCenter);

    let targetSize = baseSize;
    if (dist < distance) {
     
      targetSize = baseSize + (magnification - baseSize) * (1 - dist / distance);
    }

    
    const currentWidth = parseFloat(item.style.width || baseSize);
    const currentHeight = parseFloat(item.style.height || baseSize);
    item.style.width = currentWidth + (targetSize - currentWidth) * 0.2 + 'px';
    item.style.height = currentHeight + (targetSize - currentHeight) * 0.2 + 'px';
  });

  requestAnimationFrame(animate);
}

animate();
