// app.js
// On Delivery - E-Commerce Catalog App Logic with WhatsApp Integration

// 1. Configuration Settings
const WHATSAPP_NUMBER = "923251195811"; // User's WhatsApp number (with country code)
const DELIVERY_FEE = 80;               // Fixed Delivery Fee in Rs.

// 2. Product Database (with beautiful high-res Unsplash stock photos)
const PRODUCTS = [
    // --- Vegetables ---
    {
        id: 1,
        nameEn: "Potato (Premium)",
        nameUr: "Aalo (آلو)",
        price: 20,
        unit: "per kg",
        category: "vegetables",
        badge: "All Season",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        nameEn: "Onion (Fresh)",
        nameUr: "Pyaz (پیاز)",
        price: 130,
        unit: "per kg",
        category: "vegetables",
        badge: "Essential",
        image: "https://images.unsplash.com/photo-1508747703725-719ae2c73ee0?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 3,
        nameEn: "Tomato (Red)",
        nameUr: "Tamatar (ٹماٹر)",
        price: 50,
        unit: "per kg",
        category: "vegetables",
        badge: "Fresh",
        image: "https://unsplash.com/photos/growth-ripe-tomato-in-greenhouse-bLLcAX3CtOE"
    },
    {
        id: 4,
        nameEn: "Garlic (Desi)",
        nameUr: "Lehsan (لہسن)",
        price: 290,
        unit: "per kg",
        category: "vegetables",
        badge: "Spices",
        image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 5,
        nameEn: "Ginger (Chinese)",
        nameUr: "Adrak (ادرک)",
        price: 340,
        unit: "per kg",
        category: "vegetables",
        badge: "Spices",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 6,
        nameEn: "Green Chilli",
        nameUr: "Hari Mirch (ہری مرچ)",
        price: 160,
        unit: "per kg",
        category: "vegetables",
        badge: "Organic",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 7,
        nameEn: "Lemon (Yellow)",
        nameUr: "Limoo (لیمو)",
        price: 220,
        unit: "per kg",
        category: "vegetables",
        badge: "Vitamin C",
        image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=300&q=80"
    },
    // --- Chicken & Meat ---
    {
        id: 8,
        nameEn: "Fresh Chicken (Safi)",
        nameUr: "Chicken Meat (مرغی کا گوشت)",
        price: 520,
        unit: "per kg",
        category: "chicken",
        badge: "100% Halal",
        image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 9,
        nameEn: "Chicken Boneless",
        nameUr: "Boneless Meat (بغیر ہڈی گوشت)",
        price: 840,
        unit: "per kg",
        category: "chicken",
        badge: "No Waste",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=300&q=80"
    },
    // --- Fruits ---
    {
        id: 10,
        nameEn: "Banana (Dozen)",
        nameUr: "Kela (کیلا)",
        price: 180,
        unit: "per dozen",
        category: "fruits",
        badge: "Sweet",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 11,
        nameEn: "Apple (Kala Kulu)",
        nameUr: "Seb (سیب)",
        price: 240,
        unit: "per kg",
        category: "fruits",
        badge: "Fresh",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&q=80"
    },
    // --- Dairy & Eggs ---
    {
        id: 12,
        nameEn: "Farm Eggs (Tray)",
        nameUr: "Anday (انڈے)",
        price: 290,
        unit: "per dozen",
        category: "dairy",
        badge: "High Protein",
        image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 13,
        nameEn: "Fresh Milk (Khalsa)",
        nameUr: "Khaalis Doodh (دودھ)",
        price: 190,
        unit: "per litre",
        category: "dairy",
        badge: "Pure",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80"
    }
];

// 3. Application State
let cart = {};          // Format: { productId: quantity }
let currentCategory = "all";
let searchQuery = "";

// 4. DOM Elements
const productsGrid = document.getElementById("productsGrid");
const currentCategoryTitle = document.getElementById("currentCategoryTitle");
const categoriesWrapper = document.getElementById("categoriesWrapper");
const searchInput = document.getElementById("searchInput");

const cartTrigger = document.getElementById("cartTrigger");
const floatingCartBtn = document.getElementById("floatingCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeDrawer = document.getElementById("closeDrawer");
const drawerOverlay = document.getElementById("drawerOverlay");

const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartBadge = document.getElementById("cartBadge");
const floatingBadge = document.getElementById("floatingBadge");
const totalPriceEl = document.getElementById("totalPrice");
const cartFooter = document.getElementById("cartFooter");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");
const checkoutForm = document.getElementById("checkoutForm");

// 5. Render Functions

// Render products dynamically based on category and search query
function renderProducts() {
    productsGrid.innerHTML = "";
    
    const filteredProducts = PRODUCTS.filter(p => {
        const matchesCategory = currentCategory === "all" || p.category === currentCategory;
        const matchesSearch = p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.nameUr.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-face-frown"></i>
                <p>No items found for "${searchQuery}"</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(p => {
        const quantity = cart[p.id] || 0;
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <span class="badge-tag">${p.badge}</span>
            <div class="product-image-container">
                <img src="${p.image}" alt="${p.nameEn}" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-name-en">${p.nameEn}</span>
                <span class="product-name-ur">${p.nameUr}</span>
                <div class="price-unit-row">
                    <span class="product-price">Rs. ${p.price}</span>
                    <span class="product-unit">${p.unit}</span>
                </div>
                <div class="add-to-cart-action">
                    ${quantity === 0 ? `
                        <button class="action-btn-primary" onclick="addToCart(${p.id})">
                            <i class="fa-solid fa-plus"></i> Add to Basket
                        </button>
                    ` : `
                        <div class="card-quantity-control">
                            <button class="q-btn" onclick="removeFromCart(${p.id})">-</button>
                            <span class="q-count">${quantity}</span>
                            <button class="q-btn" onclick="addToCart(${p.id})">+</button>
                        </div>
                    `}
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Render the Shopping Cart
function renderCart() {
    const totalItems = Object.values(cart).reduce((sum, q) => sum + q, 0);
    
    // Update Badges
    cartBadge.textContent = totalItems;
    floatingBadge.textContent = totalItems;
    
    // Manage floating cart button visibility
    if (totalItems > 0) {
        floatingCartBtn.classList.add("visible");
    } else {
        floatingCartBtn.classList.remove("visible");
        toggleCartDrawer(false); // Auto close drawer if it empty
    }

    cartItemsContainer.innerHTML = "";
    
    if (totalItems === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i class="fa-solid fa-basket-shopping empty-icon"></i>
                <p>Your basket is empty!</p>
                <span>Add fresh items from our catalog to get started.</span>
            </div>
        `;
        cartFooter.style.display = "none";
        return;
    }

    cartFooter.style.display = "block";
    let subtotal = 0;

    Object.keys(cart).forEach(id => {
        const product = PRODUCTS.find(p => p.id === parseInt(id));
        const quantity = cart[id];
        if (!product || quantity <= 0) return;

        const rowPrice = product.price * quantity;
        subtotal += rowPrice;

        const itemRow = document.createElement("div");
        itemRow.className = "cart-item-row";
        itemRow.innerHTML = `
            <div class="cart-item-thumb">
                <img src="${product.image}" alt="${product.nameEn}">
            </div>
            <div class="cart-item-info">
                <span class="cart-item-title">${product.nameEn}</span>
                <div class="cart-item-price">Rs. ${product.price} <span style="font-weight: normal; color: var(--text-muted);">x ${quantity}</span></div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-q-btn" onclick="removeFromCart(${product.id})">-</button>
                <span class="cart-q-count">${quantity}</span>
                <button class="cart-q-btn" onclick="addToCart(${product.id})">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    totalPriceEl.textContent = `Rs. ${subtotal + DELIVERY_FEE}`;
}

// 6. Action Functions

window.addToCart = function(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    renderCart();
    renderProducts();
};

window.removeFromCart = function(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
    renderCart();
    renderProducts();
};

function toggleCartDrawer(open = true) {
    if (open) {
        cartDrawer.classList.add("active");
    } else {
        cartDrawer.classList.remove("active");
    }
}

function toggleCheckoutModal(open = true) {
    if (open) {
        checkoutModal.classList.add("active");
    } else {
        checkoutModal.classList.remove("active");
    }
}

// 7. Event Listeners

// Category filter buttons
categoriesWrapper.addEventListener("click", (e) => {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;
    
    // Update active class
    document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    currentCategory = btn.dataset.category;
    
    // Update Section Title
    if (currentCategory === "all") {
        currentCategoryTitle.textContent = "All Fresh Items";
    } else if (currentCategory === "vegetables") {
        currentCategoryTitle.textContent = "All Season Vegetables (Taza Sabzi)";
    } else if (currentCategory === "chicken") {
        currentCategoryTitle.textContent = "Fresh Halal Chicken & Meat";
    } else if (currentCategory === "fruits") {
        currentCategoryTitle.textContent = "Healthy Fresh Fruits (Phal)";
    } else if (currentCategory === "dairy") {
        currentCategoryTitle.textContent = "Dairy Products & Farm Eggs";
    }

    renderProducts();
});

// Search input field
searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

// Drawer Triggers
cartTrigger.addEventListener("click", () => toggleCartDrawer(true));
floatingCartBtn.addEventListener("click", () => toggleCartDrawer(true));
closeDrawer.addEventListener("click", () => toggleCartDrawer(false));
drawerOverlay.addEventListener("click", () => toggleCartDrawer(false));

// Checkout Modal triggers
checkoutBtn.addEventListener("click", () => {
    toggleCartDrawer(false); // Close cart drawer
    toggleCheckoutModal(true); // Show checkout details modal
});
closeModal.addEventListener("click", () => toggleCheckoutModal(false));
modalOverlay.addEventListener("click", () => toggleCheckoutModal(false));

// 8. Order Placement (WhatsApp Integration)
checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;
    const address = document.getElementById("custAddress").value;
    const notes = document.getElementById("custNotes").value || "None";
    
    // Compile order list details
    let orderText = `🛒 *NEW ORDER - ON DELIVERY* \n`;
    orderText += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    orderText += `👤 *Customer Name:* ${name}\n`;
    orderText += `📞 *Phone Number:* ${phone}\n`;
    orderText += `📍 *Delivery Address:* ${address}\n`;
    orderText += `📝 *Notes:* ${notes}\n\n`;
    orderText += `📋 *Items Ordered:*\n`;
    
    let subtotal = 0;
    Object.keys(cart).forEach(id => {
        const product = PRODUCTS.find(p => p.id === parseInt(id));
        const quantity = cart[id];
        if (!product || quantity <= 0) return;
        
        const price = product.price * quantity;
        subtotal += price;
        orderText += `• *${product.nameEn}* (${product.nameUr}) x ${quantity} = Rs. ${price}\n`;
    });
    
    orderText += `\n💵 *Subtotal:* Rs. ${subtotal}\n`;
    orderText += `🛵 *Delivery Charges:* Rs. ${DELIVERY_FEE}\n`;
    orderText += `━━━━━━━━━━━━━━━━━━━━━\n`;
    orderText += `💰 *Total Bill:* *Rs. ${subtotal + DELIVERY_FEE}*\n\n`;
    orderText += `⚡ _Please confirm this order to start packing!_`;

    // Encode text to URI standard
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;

    // Reset Cart
    cart = {};
    renderCart();
    renderProducts();
    toggleCheckoutModal(false);

    // Open WhatsApp link in new tab / redirect
    window.open(whatsappUrl, "_blank");
});

// 9. Initial Load
renderProducts();
renderCart();
