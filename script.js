/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Menu show
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Menu hidden
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if(this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-top');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

// Scroll to top when clicked
document.getElementById('scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== MENU FILTERING ====================*/
const menuFilters = document.querySelectorAll('.menu__filter');
const menuItemsContainer = document.getElementById('menu-items');

// Load menu items on page load
document.addEventListener('DOMContentLoaded', () => {
    loadMenuItems('all');
    loadCartFromStorage();
    updateCartUI();
});

// Filter menu items
menuFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        menuFilters.forEach(f => f.classList.remove('active-filter'));
        // Add active class to clicked filter
        filter.classList.add('active-filter');

        // Get filter value
        const filterValue = filter.getAttribute('data-filter');

        // Load menu items based on filter
        loadMenuItems(filterValue);
    });
});

// Load menu items function
function loadMenuItems(filter) {
    menuItemsContainer.innerHTML = '';

    let filteredItems = menuData;

    if(filter !== 'all') {
        filteredItems = menuData.filter(item => item.tags.includes(filter));
    }

    filteredItems.forEach(item => {
        const menuCard = createMenuCard(item);
        menuItemsContainer.appendChild(menuCard);
    });
}

// Create menu card
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    // Determine badge
    let badgeHTML = '';
    if(item.badge === 'vegetarian') {
        badgeHTML = '<span class="menu-card__badge">Vegetarisch</span>';
    } else if(item.badge === 'hot') {
        badgeHTML = '<span class="menu-card__badge hot">Scharf</span>';
    } else if(item.badge === 'new') {
        badgeHTML = '<span class="menu-card__badge new">Neu</span>';
    }

    // Handle price display (sizes or single price)
    let priceHTML = '';
    let sizeSelectorHTML = '';

    if(item.sizes) {
        // Pizza with sizes
        sizeSelectorHTML = `
            <div class="menu-card__size-selector" data-item-id="${item.id}">
                ${item.sizes.map((size, index) => `
                    <button class="size-option ${index === 0 ? 'active' : ''}"
                            data-size="${size.size}"
                            data-price="${size.price}">
                        ${size.size}
                    </button>
                `).join('')}
            </div>
        `;
        priceHTML = `<span class="menu-card__price" data-price="${item.sizes[0].price}">${item.sizes[0].price.toFixed(2)} €</span>`;
    } else {
        // Single price items
        priceHTML = `<span class="menu-card__price" data-price="${item.price}">${item.price.toFixed(2)} €</span>`;
    }

    card.innerHTML = `
        <div class="menu-card__image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/placeholder.jpg'">
            ${badgeHTML}
        </div>
        <div class="menu-card__content">
            <span class="menu-card__category">${getCategoryName(item.category)}</span>
            <h3 class="menu-card__title">${item.name}</h3>
            <p class="menu-card__description">${item.description}</p>
            ${sizeSelectorHTML}
            <div class="menu-card__footer">
                ${priceHTML}
                <button class="menu-card__add-btn" onclick="addToCart(${item.id}, this)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        </div>
    `;

    // Add size selector event listeners
    if(item.sizes) {
        const sizeButtons = card.querySelectorAll('.size-option');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active from all
                sizeButtons.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
                // Update price
                const price = parseFloat(this.getAttribute('data-price'));
                card.querySelector('.menu-card__price').textContent = price.toFixed(2) + ' €';
                card.querySelector('.menu-card__price').setAttribute('data-price', price);
            });
        });
    }

    return card;
}

// Get category name in German
function getCategoryName(category) {
    const categories = {
        'pizza': 'Pizza',
        'burger': 'Burger',
        'indian': 'Indische Spezialität',
        'salad': 'Salat',
        'schnitzel': 'Schnitzel'
    };
    return categories[category] || category;
}

/*==================== SHOPPING CART ====================*/
let cart = [];

// Cart modal elements
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const cartClose = document.getElementById('cart-close');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartFooter = document.getElementById('cart-footer');
const cartCount = document.getElementById('cart-count');

// Show cart modal
cartBtn?.addEventListener('click', () => {
    cartModal.classList.add('show');
    updateCartDisplay();
});

// Close cart modal
cartClose?.addEventListener('click', () => {
    cartModal.classList.remove('show');
});

// Close cart when clicking outside
cartModal?.addEventListener('click', (e) => {
    if(e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

// Add to cart function
function addToCart(itemId, button) {
    const item = menuData.find(i => i.id === itemId);
    if(!item) return;

    const card = button.closest('.menu-card');
    const priceElement = card.querySelector('.menu-card__price');
    const price = parseFloat(priceElement.getAttribute('data-price'));

    let size = null;
    if(item.sizes) {
        const activeSize = card.querySelector('.size-option.active');
        size = activeSize ? activeSize.getAttribute('data-size') : item.sizes[0].size;
    }

    // Check if item already in cart
    const existingItemIndex = cart.findIndex(cartItem =>
        cartItem.id === itemId && cartItem.size === size
    );

    if(existingItemIndex > -1) {
        // Increase quantity
        cart[existingItemIndex].quantity++;
    } else {
        // Add new item
        cart.push({
            id: itemId,
            name: item.name,
            price: price,
            size: size,
            quantity: 1,
            image: item.image,
            category: item.category
        });
    }

    // Animate button
    button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-plus"></i>';
    }, 1000);

    // Update cart
    updateCartUI();
    saveCartToStorage();

    // Show notification
    showNotification('Zum Warenkorb hinzugefügt!');
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if(totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

// Update cart display
function updateCartDisplay() {
    if(cart.length === 0) {
        cartEmpty.classList.add('show');
        cartFooter.classList.remove('show');
        cartItemsContainer.innerHTML = '';
        return;
    }

    cartEmpty.classList.remove('show');
    cartFooter.classList.add('show');

    // Display cart items
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = createCartItem(item, index);
        cartItemsContainer.appendChild(cartItem);
    });

    // Update totals
    updateCartTotals();
}

// Create cart item element
function createCartItem(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const sizeText = item.size ? ` (${item.size})` : '';
    const itemTotal = item.price * item.quantity;

    cartItem.innerHTML = `
        <div class="cart-item__image">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/placeholder.jpg'">
        </div>
        <div class="cart-item__info">
            <h4 class="cart-item__title">${item.name}${sizeText}</h4>
            <p class="cart-item__details">${getCategoryName(item.category)}</p>
            <div class="cart-item__footer">
                <span class="cart-item__price">${itemTotal.toFixed(2)} €</span>
                <div class="cart-item__quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${index})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${index})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="cart-item__remove" onclick="removeFromCart(${index})">
                <i class="fas fa-trash"></i> Entfernen
            </button>
        </div>
    `;

    return cartItem;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCartDisplay();
    updateCartUI();
    saveCartToStorage();
}

// Decrease quantity
function decreaseQuantity(index) {
    if(cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
        return;
    }
    updateCartDisplay();
    updateCartUI();
    saveCartToStorage();
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartUI();
    saveCartToStorage();
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Check delivery method
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked')?.value;
    let deliveryFee = deliveryMethod === 'delivery' ? deliveryInfo.fee : 0;
    let discount = deliveryMethod === 'pickup' ? subtotal * deliveryInfo.pickupDiscount : 0;

    // Free delivery for orders over threshold
    if(deliveryMethod === 'delivery' && subtotal >= deliveryInfo.freeDeliveryFrom) {
        deliveryFee = 0;
    }

    const total = subtotal + deliveryFee - discount;

    // Update display
    document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2) + ' €';
    document.getElementById('cart-delivery').textContent =
        deliveryMethod === 'pickup'
            ? `Rabatt: -${discount.toFixed(2)} €`
            : deliveryFee === 0
                ? 'Kostenlos!'
                : deliveryFee.toFixed(2) + ' €';
    document.getElementById('cart-total').textContent = total.toFixed(2) + ' €';
}

// Delivery option change
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateCartTotals();

        // Show/hide delivery address section
        const deliveryAddressSection = document.getElementById('delivery-address-section');
        if(radio.value === 'delivery') {
            deliveryAddressSection.style.display = 'block';
            document.getElementById('customer-street').required = true;
            document.getElementById('customer-zip').required = true;
            document.getElementById('customer-city').required = true;
        } else {
            deliveryAddressSection.style.display = 'none';
            document.getElementById('customer-street').required = false;
            document.getElementById('customer-zip').required = false;
            document.getElementById('customer-city').required = false;
        }
    });
});

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('erfurtPizzaCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('erfurtPizzaCart');
    if(savedCart) {
        cart = JSON.parse(savedCart);
    }
}

/*==================== CHECKOUT ====================*/
const checkoutModal = document.getElementById('checkout-modal');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutClose = document.getElementById('checkout-close');
const backToCartBtn = document.getElementById('back-to-cart');
const checkoutForm = document.getElementById('checkout-form');

// Open checkout
checkoutBtn?.addEventListener('click', () => {
    if(cart.length === 0) {
        showNotification('Ihr Warenkorb ist leer!', 'error');
        return;
    }

    cartModal.classList.remove('show');
    checkoutModal.classList.add('show');

    // Update checkout summary
    updateCheckoutSummary();
});

// Close checkout
checkoutClose?.addEventListener('click', () => {
    checkoutModal.classList.remove('show');
});

// Back to cart
backToCartBtn?.addEventListener('click', () => {
    checkoutModal.classList.remove('show');
    cartModal.classList.add('show');
});

// Close checkout when clicking outside
checkoutModal?.addEventListener('click', (e) => {
    if(e.target === checkoutModal) {
        checkoutModal.classList.remove('show');
    }
});

// Update checkout summary
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = '';

    cart.forEach(item => {
        const sizeText = item.size ? ` (${item.size})` : '';
        const itemTotal = item.price * item.quantity;

        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <span>${item.quantity}x ${item.name}${sizeText}</span>
            <span>${itemTotal.toFixed(2)} €</span>
        `;
        checkoutItems.appendChild(checkoutItem);
    });

    // Calculate total
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked')?.value;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryFee = deliveryMethod === 'delivery' ? deliveryInfo.fee : 0;
    let discount = deliveryMethod === 'pickup' ? subtotal * deliveryInfo.pickupDiscount : 0;

    if(deliveryMethod === 'delivery' && subtotal >= deliveryInfo.freeDeliveryFrom) {
        deliveryFee = 0;
    }

    const total = subtotal + deliveryFee - discount;
    document.getElementById('checkout-total').textContent = total.toFixed(2) + ' €';
}

// Handle form submission
checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        street: document.getElementById('customer-street').value,
        zip: document.getElementById('customer-zip').value,
        city: document.getElementById('customer-city').value,
        notes: document.getElementById('customer-notes').value,
        paymentMethod: document.querySelector('input[name="payment"]:checked').value,
        deliveryMethod: document.querySelector('input[name="delivery"]:checked').value,
        cart: cart,
        total: document.getElementById('checkout-total').textContent
    };

    // Process order
    processOrder(formData);
});

// Process order
function processOrder(orderData) {
    // Here you would normally send the order to your backend
    // For now, we'll simulate the order and show confirmation

    console.log('Order placed:', orderData);

    // Save order to localStorage (for demo purposes)
    const orders = JSON.parse(localStorage.getItem('erfurtPizzaOrders') || '[]');
    const orderId = 'EP' + Date.now();
    orders.push({
        id: orderId,
        ...orderData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('erfurtPizzaOrders', JSON.stringify(orders));

    // Show confirmation
    showOrderConfirmation(orderId, orderData);

    // Clear cart
    cart = [];
    saveCartToStorage();
    updateCartUI();

    // Close checkout
    checkoutModal.classList.remove('show');
}

/*==================== ORDER CONFIRMATION ====================*/
const confirmationModal = document.getElementById('confirmation-modal');
const confirmationClose = document.getElementById('confirmation-close');

// Show order confirmation
function showOrderConfirmation(orderId, orderData) {
    const confirmationDetails = document.getElementById('confirmation-details');

    const deliveryMethodText = orderData.deliveryMethod === 'delivery' ? 'Lieferung' : 'Abholung';
    const paymentMethodText = getPaymentMethodText(orderData.paymentMethod);

    confirmationDetails.innerHTML = `
        <p><strong>Bestellnummer:</strong> ${orderId}</p>
        <p><strong>Name:</strong> ${orderData.name}</p>
        <p><strong>Telefon:</strong> ${orderData.phone}</p>
        ${orderData.deliveryMethod === 'delivery' ? `
            <p><strong>Lieferadresse:</strong><br>
            ${orderData.street}<br>
            ${orderData.zip} ${orderData.city}</p>
        ` : '<p><strong>Abholung an:</strong> An der Lache 41, 99086 Erfurt</p>'}
        <p><strong>Zahlungsmethode:</strong> ${paymentMethodText}</p>
        <p><strong>Gesamtbetrag:</strong> ${orderData.total}</p>
        <p><strong>Lieferart:</strong> ${deliveryMethodText}</p>
    `;

    confirmationModal.classList.add('show');
}

// Close confirmation
confirmationClose?.addEventListener('click', () => {
    confirmationModal.classList.remove('show');
});

// Close confirmation when clicking outside
confirmationModal?.addEventListener('click', (e) => {
    if(e.target === confirmationModal) {
        confirmationModal.classList.remove('show');
    }
});

// Get payment method text
function getPaymentMethodText(method) {
    const methods = {
        'cash': 'Barzahlung',
        'paypal': 'PayPal',
        'card': 'Kreditkarte'
    };
    return methods[method] || method;
}

/*==================== NOTIFICATIONS ====================*/
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if(href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*==================== INITIALIZE ====================*/
// Set initial delivery address visibility
document.addEventListener('DOMContentLoaded', () => {
    const deliveryRadio = document.querySelector('input[name="delivery"][value="delivery"]');
    if(deliveryRadio && deliveryRadio.checked) {
        document.getElementById('delivery-address-section').style.display = 'block';
    }
});

// Console welcome message
console.log('%c🍕 Erfurt Pizza Website', 'color: #dc2626; font-size: 24px; font-weight: bold;');
console.log('%cWillkommen bei Erfurt Pizza! Die beste Pizza in Erfurt.', 'color: #f97316; font-size: 14px;');
