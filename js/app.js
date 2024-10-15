const products = document.querySelectorAll('.product');
const cart = document.querySelector('.cart');
const cartItems = document.getElementById('cart-items');
const btn = document.getElementById("btn-pay");

let draggedItem = null;
let isDragging = false;
let offsetX, offsetY;

products.forEach(product => {
    // Handling mouse events
    product.addEventListener('mousedown', startDrag);
    product.addEventListener('touchstart', startDrag, { passive: false });  // Prevent default touch behavior

    // Attach move and stop events for both mouse and touch
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('touchmove', dragElement, { passive: false });  // Prevent touch scrolling
    document.addEventListener('mouseup', stopDrag);
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

// Dragging logic
function startDrag(e) {
    isDragging = true;
    draggedItem = this;

    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - draggedItem.offsetLeft;
    offsetY = clientY - draggedItem.offsetTop;

    // Prevent touch scrolling when dragging on mobile
    if (e.type === 'touchstart') {
        e.preventDefault();
    }
}

function dragElement(e) {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

    draggedItem.style.position = 'absolute';
    draggedItem.style.left = `${clientX - offsetX}px`;
    draggedItem.style.top = `${clientY - offsetY}px`;

    // Prevent default touch scrolling behavior
    if (e.type === 'touchmove') {
        e.preventDefault();
    }
}

function stopDrag(e) {
    isDragging = false;
    draggedItem = null;
}

function moveToCart(item) {
    // Clone the dragged item to keep the original on the shelf
    const clonedItem = item.cloneNode(true);

    // Reset styles for the cloned item (so it aligns properly in the cart)
    clonedItem.style.position = 'relative';
    clonedItem.style.left = '0';
    clonedItem.style.top = '0';
    clonedItem.style.cursor = 'default';

    // Append the cloned item to the cart
    cartItems.appendChild(clonedItem);

    // Remove the original item from the shelf
    item.remove();
}

function checkCartItems() {
    const itemCount = cartItems.children.length; // Count the number of cart items
    if (itemCount > 2) {
        btn.style.opacity = 1;  // Show the button if more than 2 items
    } else {
        btn.style.opacity = 0;  // Hide the button if less than 3 items
    }
}

const setAlert = () => {
    alert("Payment will be processed in 5 sec");
}

btn.addEventListener('click', setAlert);
