const movableImages = document.querySelectorAll('.movable-image');
let activeImage = null;
let offsetX, offsetY;

movableImages.forEach(image => {
    image.addEventListener('mousedown', startDragging);
    image.addEventListener('mouseup', stopDragging);
});

function startDragging(e) {
    activeImage = this;
    offsetX = e.clientX - activeImage.getBoundingClientRect().left;
    offsetY = e.clientY - activeImage.getBoundingClientRect().top;

    activeImage.style.zIndex = 2;
    activeImage.style.cursor = 'grabbing';

    document.addEventListener('mousemove', dragImage);
    document.addEventListener('mouseup', stopDragging);
}

function dragImage(e) {
    if (!activeImage) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    activeImage.style.left = x + 'px';
    activeImage.style.top = y + 'px';
}

function stopDragging() {
    if (!activeImage) return;

    activeImage.style.zIndex = 1;
    activeImage.style.cursor = 'grab';
    activeImage = null;

    document.removeEventListener('mousemove', dragImage);
    document.removeEventListener('mouseup', stopDragging);
}
