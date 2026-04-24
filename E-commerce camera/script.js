/* ══════════════════════════════════════════════════════
   PREMIUM CAMERA STORE — SCRIPT
   ══════════════════════════════════════════════════════ */

// ─── Product Data ────────────────────────────────────
const products = [
    {
        id: 1,
        brand: "Canon",
        name: "Canon EOS R5 Mirrorless",
        price: 215000,
        image: "images/camera-1.png",
        rating: 5,
        reviews: 312,
        badge: "Best Seller"
    },
    {
        id: 2,
        brand: "Nikon",
        name: "Nikon Z6 III Mirrorless",
        price: 175000,
        image: "images/camera-2.png",
        rating: 4,
        reviews: 198,
        badge: null
    },
    {
        id: 3,
        brand: "Sony",
        name: "Sony Alpha A7 IV",
        price: 195000,
        image: "images/camera-3.png",
        rating: 5,
        reviews: 274,
        badge: "Popular"
    },
    {
        id: 4,
        brand: "Fujifilm",
        name: "Fujifilm X-T5 Retro",
        price: 142000,
        image: "images/camera-4.png",
        rating: 4,
        reviews: 156,
        badge: null
    },
    {
        id: 5,
        brand: "Canon",
        name: "Canon EOS 90D DSLR",
        price: 98500,
        image: "images/camera-5.png",
        rating: 4,
        reviews: 420,
        badge: "Value Pick"
    },
    {
        id: 6,
        brand: "Nikon",
        name: "Nikon D850 DSLR",
        price: 168000,
        image: "images/camera-6.png",
        rating: 5,
        reviews: 245,
        badge: null
    }
];

// ─── SVG Helpers ─────────────────────────────────────
const starFilledSVG = `<svg class="product-card__star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;

const starEmptySVG = `<svg class="product-card__star product-card__star--empty" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;

const cartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

// ─── Generate Star Rating ────────────────────────────
function generateStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? starFilledSVG : starEmptySVG;
    }
    return html;
}

// ─── Format Price ────────────────────────────────────
function formatPrice(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// ─── Create Product Card ─────────────────────────────
function createProductCard(product) {
    const badgeHTML = product.badge
        ? `<span class="product-card__badge">${product.badge}</span>`
        : '';

    return `
        <article class="product-card" id="product-${product.id}">
            ${badgeHTML}
            <div class="product-card__image-wrap">
                <img
                    class="product-card__image"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                />
            </div>
            <div class="product-card__body">
                <p class="product-card__brand">${product.brand}</p>
                <h3 class="product-card__name">${product.name}</h3>
                <div class="product-card__reviews">
                    <div class="product-card__stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="product-card__review-count">${product.reviews} reviews</span>
                </div>
                <div class="product-card__footer">
                    <span class="product-card__price">${formatPrice(product.price)}</span>
                    <button class="product-card__cart-btn" aria-label="Add ${product.name} to cart" title="Add to Cart">
                        ${cartSVG}
                    </button>
                </div>
            </div>
        </article>
    `;
}

// ─── Render All Products ─────────────────────────────
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = products.map(createProductCard).join('');
}

// ─── Set Footer Year ─────────────────────────────────
function setFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ─── Initialise ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setFooterYear();
});
