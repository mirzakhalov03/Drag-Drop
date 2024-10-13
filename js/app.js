const products = document.querySelectorAll('.product');
const cart = document.querySelector('.cart');
const cartItems = document.getElementById('cart-items');
const btn = document.getElementById("btn-pay");

let draggedItem = null;
let isDragging = false;
let offsetX, offsetY;

products.forEach(product => {
    product.addEventListener('mousedown', startDrag);
    product.addEventListener('touchstart', startDrag);

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchmove', dragElement);
    document.addEventListener('touchend', stopDrag);
});

cart.addEventListener('dragover', (e) => {
    e.preventDefault();
    cart.classList.add('hovered'); 
});

cart.addEventListener('dragleave', () => {
    cart.classList.remove('hovered'); 
});

cart.addEventListener('drop', (e) => {
    e.preventDefault();
    cart.classList.remove('hovered');
    if (draggedItem) {
        moveToCart(draggedItem);
        checkCartItems();  
    }
});

function startDrag(e) {
    isDragging = true;
    draggedItem = this;
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - draggedItem.offsetLeft;
    offsetY = clientY - draggedItem.offsetTop;
}

function dragElement(e) {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    draggedItem.style.position = 'absolute';
    draggedItem.style.left = `${clientX - offsetX}px`;
    draggedItem.style.top = `${clientY - offsetY}px`;
}

function stopDrag(e) {
    isDragging = false;
    draggedItem = null;
}

function moveToCart(item) {
    const clonedItem = item.cloneNode(true);

    clonedItem.style.position = 'relative';
    clonedItem.style.left = '0';
    clonedItem.style.top = '0';
    clonedItem.style.cursor = 'default';

    cartItems.appendChild(clonedItem);

    item.remove();
}

function checkCartItems() {
    const itemCount = cartItems.children.length; 
    if (itemCount > 2) {
        btn.style.opacity = 1; 
    } else {
        btn.style.opacity = 0;  
    }
}

const setAlert = () => {
    alert("Payment will be processed in 5 sec");
}

btn.addEventListener('click', setAlert);
