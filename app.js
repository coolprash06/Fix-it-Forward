/* ============================================================
   app.js — Fix-It Forward Store
   ============================================================ */

'use strict';

// ─── 1. PRODUCT DATA ──────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 'p001',
    title: 'Aether Pro Keyboard',
    description: 'Low-profile mechanical switches, per-key RGB, and whisper-quiet actuation.',
    alt: 'Aether Pro Keyboard — low-profile RGB mechanical keyboard on a white surface',
    price: 149.99,
    comparePrice: 199.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80',
  },
  {
    id: 'p002',
    title: 'Orbit Wireless Mouse',
    description: '26 000 DPI optical sensor, 72-hour battery, zero-delay 2.4 GHz dongle.',
    alt: 'Orbit Wireless Mouse — sleek ergonomic wireless mouse on a dark desk',
    price: 89.99,
    comparePrice: 119.99,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
  },
  {
    id: 'p003',
    title: 'Lumina 4K Monitor',
    description: '27" IPS panel, 144 Hz, 1 ms GTG, factory-calibrated Display P3 coverage.',
    alt: 'Lumina 4K Monitor — 27-inch widescreen monitor displaying a vivid desktop',
    price: 499.99,
    comparePrice: 649.99,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&q=80',
  },
  {
    id: 'p004',
    title: 'Nova USB-C Hub',
    description: '10-in-1 hub — 4K HDMI, 100 W PD, 2× USB-A 3.2, SD/microSD, Ethernet.',
    alt: 'Nova USB-C Hub — compact 10-in-1 USB-C hub with multiple ports',
    price: 59.99,
    comparePrice: 79.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80',
  },
  {
    id: 'p005',
    title: 'Phantom ANC Buds',
    description: 'Hybrid Active Noise Cancellation, 32 h total playback, spatial audio, IPX5.',
    alt: 'Phantom ANC Buds — true wireless earbuds with charging case on a minimal surface',
    price: 219.99,
    comparePrice: 279.99,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  },
  {
    id: 'p006',
    title: 'Vertex SSD 2 TB',
    description: 'PCIe Gen 4 NVMe — 7 400 MB/s sequential reads with shock-resistant casing.',
    alt: 'Vertex SSD 2 TB — M.2 NVMe solid-state drive with heat shield',
    price: 134.99,
    comparePrice: 179.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80',
  },
  {
    id: 'p007',
    title: 'Slate Webcam 4K',
    description: 'Sony STARVIS sensor, f/1.8 aperture, hardware privacy shutter, dual mics.',
    alt: 'Slate Webcam 4K — clip-on webcam mounted on a monitor with privacy shutter',
    price: 169.99,
    comparePrice: 219.99,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80',
  },
  {
    id: 'p008',
    title: 'Fusion Charging Pad',
    description: '3-in-1 MagSafe-compatible — phone, watch & buds charged simultaneously.',
    alt: 'Fusion Charging Pad — circular wireless charging pad powering a smartphone',
    price: 79.99,
    comparePrice: 109.99,
    stock: 18,
    // Reliable Unsplash: iPhone on MagSafe-style wireless charging pad
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&q=80',
  },
  {
    id: 'p009',
    title: 'Aura Noise-Cancelling Headphones',
    description: '40 dB hybrid ANC, 38 h playtime, foldable aluminum frame, LDAC hi-res audio.',
    alt: 'Aura Noise-Cancelling Headphones — over-ear headphones resting on a wooden surface',
    price: 279.99,
    comparePrice: 349.99,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
  },
  {
    id: 'p010',
    title: 'Titan Mechanical Switch Set',
    description: '110-pack factory-lubed tactile switches, 45 g actuation, POM housing, RGB-compatible.',
    alt: 'Titan Mechanical Switch Set — colourful mechanical keyboard switches arranged in a grid',
    price: 34.99,
    comparePrice: 49.99,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 'p011',
    title: 'Neo-Glow RGB Desk Mat',
    description: 'XL 900×400 mm surface, addressable LED border, non-slip base, stitched edge.',
    alt: 'Neo-Glow RGB Desk Mat — XL RGB-lit desk mat under keyboard and mouse on a gaming setup',
    price: 44.99,
    comparePrice: 64.99,
    stock: 22,
    // Reliable Unsplash: gaming desk setup with RGB lighting
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
  },
  {
    id: 'p012',
    title: 'Prism Portable Projector',
    description: '1080p full-HD, 700 ANSI lumen, auto-keystone, HDMI + USB-C, built-in Harman speaker.',
    alt: 'Prism Portable Projector — compact mini projector casting an image on a white wall',
    price: 399.99,
    comparePrice: 499.99,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=600&q=80',
  },
  {
    id: 'p013',
    title: 'Carbon Laptop Stand',
    description: 'Adjustable 15°–50°, aircraft-grade aluminium, passive cooling fins, fits 11–17″.',
    alt: 'Carbon Laptop Stand — adjustable aluminium laptop stand elevating a MacBook',
    price: 49.99,
    comparePrice: 69.99,
    stock: 14,
    image: 'https://images.unsplash.com/photo-1623126908029-58cb08a2b272?w=600&q=80',
  },
  {
    id: 'p014',
    title: 'Echo Smart Hub Speaker',
    description: '360° room-filling sound, built-in Zigbee smart home hub, far-field voice, aux out.',
    alt: 'Echo Smart Hub Speaker — cylindrical smart speaker on a bedside table',
    price: 129.99,
    comparePrice: 169.99,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
  },
];

// Mutable stock map (productId -> remaining units)
const stockMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]));

const TAX_RATE = 0.085; // 8.5 %
const STORAGE_KEY = 'fif_cart_v1';
const THEME_KEY = 'fif_theme_v1'; // 'dark' | 'light'

// ─── 2. SUPABASE CLIENT ──────────────────────────────────────────────────────────────

// !! Replace these values with your own from Supabase Dashboard → Settings → API
const SUPABASE_URL = 'https://giffkwqegypxjxuvbgty.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_HujVU2jLKWObiTACZhKoKw_qyJtrU-K';

/** Supabase client instance shared across authService and order writes. */
const _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Maps a raw Supabase User object → the shape the rest of the app expects.
 * Name + initials are stored in user_metadata on sign-up.
 */
function _toUserData(user) {
  const meta = user.user_metadata || {};
  const name = meta.name || user.email.split('@')[0];
  const initials = meta.initials || name[0].toUpperCase();
  return { name, email: user.email, initials };
}

/**
 * supabaseService — Real backend via Supabase Auth.
 *
 * Public API is identical to the old mock authService, so zero wiring
 * changes are needed elsewhere in the app.
 *
 * To switch providers (e.g. Firebase), replace the body of each method only.
 */
const supabaseService = {
  /**
   * Sign in with email + password.
   * Supabase SDK: _supabase.auth.signInWithPassword()
   */
  async login(email, password) {
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return _toUserData(data.user);
  },

  /**
   * Create a new account, persisting display name + initials
   * in Supabase user_metadata so they survive session restores.
   * Supabase SDK: _supabase.auth.signUp()
   */
  async register(name, email, password) {
    const words = name.trim().split(/\s+/);
    const initials = (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
    const { data, error } = await _supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name.trim(), initials } },
    });
    if (error) throw new Error(error.message);
    // If email confirmation is enabled, data.user exists but session is null.
    if (!data.user) throw new Error('Registration failed — please try again.');
    return _toUserData(data.user);
  },

  /**
   * Sign out and invalidate the Supabase session token.
   * Supabase SDK: _supabase.auth.signOut()
   */
  async logout() {
    await _supabase.auth.signOut();
  },

  /**
   * Read the active session on page load.
   * Supabase automatically persists the session in localStorage;
   * this simply reads and returns it.
   * Supabase SDK: _supabase.auth.getSession()
   *
   * @returns {Promise<{name, email, initials}|null>}
   */
  async getCurrentUser() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return null;
    return _toUserData(session.user);
  },
};

/**
 * Persist a completed order to the Supabase `orders` table.
 * Reads the live session to get the authenticated user_id, ensuring
 * the RLS policy (auth.uid() = user_id) is satisfied.
 *
 * Schema: id, user_id, items (jsonb), subtotal, tax, total, created_at
 */
async function saveOrderToSupabase(items, subtotal, tax, total) {
  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) {
    console.warn('[Orders] Skipped — user is not logged in.');
    return;
  }
  const { error } = await _supabase.from('orders').insert({
    user_id: session.user.id,
    items: items.map(i => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  });
  if (error) console.error('[Orders] Supabase insert failed:', error.message);
  else console.info('[Orders] Saved — total:', fmt(total));
}

// ─── 3. USER STATE ────────────────────────────────────────────────────────────

let userState = {
  isLoggedIn: false,
  userData: null, // { name, email, initials }
};



function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

let cart = loadCart();

// ─── 3. DOM REFERENCES ────────────────────────────────────────────────────────

const productGrid = document.getElementById('product-grid');
const cardTemplate = document.getElementById('product-card-template');
const cartPanel = document.getElementById('cart-panel');
const cartItemsList = document.getElementById('cart-items');
const cartEmptyMsg = document.getElementById('cart-empty-msg');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTaxEl = document.getElementById('cart-tax');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.querySelector('.header-cart__count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutStatus = document.getElementById('checkout-status');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('search-input');
const footerYear = document.getElementById('footer-year');
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggleBtn = document.getElementById('theme-toggle');

// Auth DOM refs
const authLoginBtn = document.getElementById('auth-login-btn');
const userMenu = document.getElementById('user-menu');
const userAvatarBtn = document.getElementById('user-avatar-btn');
const userInitialsEl = document.getElementById('user-initials');
const userGreetName = document.getElementById('user-greeting-name');
const userGreetEmail = document.getElementById('user-greeting-email');
const userDropdown = document.getElementById('user-dropdown');
const signoutBtn = document.getElementById('signout-btn');
const authModal = document.getElementById('auth-modal');
const authModalClose = document.getElementById('auth-modal-close');
const tabSignin = document.getElementById('tab-signin');
const tabRegister = document.getElementById('tab-register');
const panelSignin = document.getElementById('panel-signin');
const panelRegister = document.getElementById('panel-register');
const signinForm = document.getElementById('signin-form');
const registerForm = document.getElementById('register-form');
const signinError = document.getElementById('signin-error');
const registerError = document.getElementById('register-error');
const signinSubmit = document.getElementById('signin-submit');
const registerSubmit = document.getElementById('register-submit');

// ─── 4. CART SIDEBAR TOGGLE ───────────────────────────────────────────────────

function openCart() {
  cartPanel.classList.remove('cart--hidden');
  cartPanel.setAttribute('aria-hidden', 'false');
}

function closeCart() {
  cartPanel.classList.add('cart--hidden');
  cartPanel.setAttribute('aria-hidden', 'true');
}

function toggleCart() {
  cartPanel.classList.contains('cart--hidden') ? openCart() : closeCart();
}

// Start hidden
cartPanel.classList.add('cart--hidden');
cartPanel.setAttribute('aria-hidden', 'true');

// Wire header Cart button (supports multiple [data-open-cart] elements)
document.querySelectorAll('[data-open-cart]').forEach((btn) =>
  btn.addEventListener('click', toggleCart)
);

// Wire close button inside the panel
cartPanel.querySelector('[data-close-cart]').addEventListener('click', closeCart);

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

// ─── 5. UTILITY HELPERS ───────────────────────────────────────────────────────

function fmt(n) {
  return '$' + n.toFixed(2);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stockLabel(id) {
  const n = stockMap[id];
  if (n === 0) return '<span style="color:#f97373">Out of stock</span>';
  if (n <= 5) return `<span style="color:#fb923c">Only ${n} left</span>`;
  return `<span style="color:#a3e635">In stock (${n})</span>`;
}

// ─── 6. RENDER CART ───────────────────────────────────────────────────────────

function renderCart() {
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartEmptyMsg.hidden = false;
    cartSubtotalEl.textContent = fmt(0);
    cartTaxEl.textContent = fmt(0);
    cartTotalEl.textContent = fmt(0);
    cartCountEl.textContent = '0';
    checkoutBtn.disabled = true;
    return;
  }

  cartEmptyMsg.hidden = true;
  checkoutBtn.disabled = false;

  let subtotal = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;

    const li = document.createElement('li');
    li.className = 'cart__item';
    li.setAttribute('data-cart-id', item.id);
    li.innerHTML = `
      <span class="cart__item-title">${escHtml(item.title)}</span>
      <span class="cart__item-price">${fmt(lineTotal)}</span>
      <span class="cart__item-meta">Qty ${item.qty} × ${fmt(item.price)}</span>
      <span class="cart__item-actions">
        <button
          class="btn btn--secondary"
          style="padding:2px 9px;font-size:.72rem"
          aria-label="Remove ${escHtml(item.title)} from cart"
          data-remove-id="${item.id}">✕</button>
      </span>`;
    cartItemsList.appendChild(li);
  });

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  cartSubtotalEl.textContent = fmt(subtotal);
  cartTaxEl.textContent = fmt(tax);
  cartTotalEl.textContent = fmt(total);
  cartCountEl.textContent = String(cart.reduce((s, i) => s + i.qty, 0));
}

// Remove-item event delegation
cartItemsList.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-remove-id]');
  if (!btn) return;

  const id = btn.dataset.removeId;
  const item = cart.find((i) => i.id === id);
  if (item) {
    stockMap[id] = (stockMap[id] || 0) + item.qty;
    updateStockBadge(id);
  }

  cart = cart.filter((i) => i.id !== id);
  saveCart(cart);
  renderCart();
});

// ─── 7. ADD TO CART ───────────────────────────────────────────────────────────

function addToCart(productId, qty) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const available = stockMap[productId] || 0;
  qty = Math.max(1, Math.min(qty, available));

  if (available === 0) {
    alert(`Sorry — "${product.title}" is out of stock.`);
    return;
  }

  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    // Don't exceed available stock
    const maxAdd = stockMap[productId];
    const added = Math.min(qty, maxAdd);
    existing.qty += added;
    stockMap[productId] -= added;
  } else {
    cart.push({ id: productId, title: product.title, price: product.price, qty });
    stockMap[productId] -= qty;
  }

  saveCart(cart);
  renderCart();
  updateStockBadge(productId);
  cartPulse();
  openCart();
}

/** Momentarily pulse the cart badge to confirm the item was added. */
function cartPulse() {
  if (!cartCountEl) return;
  cartCountEl.classList.remove('cart-badge--pulse');
  // Force reflow so re-adding the class restarts the animation
  void cartCountEl.offsetWidth;
  cartCountEl.classList.add('cart-badge--pulse');
  cartCountEl.addEventListener('animationend', () => cartCountEl.classList.remove('cart-badge--pulse'), { once: true });
}

// ─── 8. PRODUCT CARD RENDERING ────────────────────────────────────────────────

function updateStockBadge(productId) {
  const card = productGrid.querySelector(`[data-product-id="${productId}"]`);
  if (!card) return;
  const badge = card.querySelector('.product__stock');
  if (badge) badge.innerHTML = stockLabel(productId);
  const addBtn = card.querySelector('.product__add');
  if (addBtn) addBtn.disabled = stockMap[productId] === 0;
}

function createProductCard(product) {
  const clone = cardTemplate.content.cloneNode(true);
  const article = clone.querySelector('.product');

  article.dataset.productId = product.id;

  const img = article.querySelector('.product__image');
  img.src = product.image;
  img.alt = product.alt || product.title;
  img.loading = 'lazy';

  article.querySelector('.product__title').textContent = product.title;
  article.querySelector('.product__description').textContent = product.description;
  article.querySelector('.product__price').textContent = fmt(product.price);

  const compare = article.querySelector('.product__price--compare');
  if (product.comparePrice) {
    compare.textContent = fmt(product.comparePrice);
  } else {
    compare.remove();
  }

  article.querySelector('.product__stock').innerHTML = stockLabel(product.id);

  const qtyInput = article.querySelector('.product__qty-input');
  qtyInput.max = String(product.stock);

  const addBtn = article.querySelector('.product__add');
  if (stockMap[product.id] === 0) addBtn.disabled = true;

  addBtn.addEventListener('click', () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    addToCart(product.id, qty);
  });

  // Favourite toggle — visual only
  const favBtn = article.querySelector('.product__favorite');
  favBtn.addEventListener('click', () => {
    const pressed = favBtn.getAttribute('aria-pressed') === 'true';
    favBtn.setAttribute('aria-pressed', String(!pressed));
    favBtn.textContent = pressed ? '☆' : '★';
  });

  // Prepare for entrance animation
  article.style.opacity = '0';
  article.style.transform = 'translateY(18px)';

  return article;
}

function renderProducts(list) {
  productGrid.innerHTML = '';

  if (list.length === 0) {
    productGrid.innerHTML =
      '<p style="color:var(--color-text-muted);grid-column:1/-1">No products match your search.</p>';
    return;
  }

  list.forEach((product, i) => {
    const card = createProductCard(product);
    productGrid.appendChild(card);

    // Staggered entrance animation
    requestAnimationFrame(() => {
      setTimeout(() => {
        card.style.transition = 'opacity .35s ease, transform .35s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  });
}

// ─── 9. SEARCH & SORT ─────────────────────────────────────────────────────────

function getFilteredSorted() {
  const query = searchInput.value.trim().toLowerCase();
  const sort = sortSelect.value;

  let list = PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );

  if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);

  return list;
}

searchInput.addEventListener('input', () => renderProducts(getFilteredSorted()));
sortSelect.addEventListener('change', () => renderProducts(getFilteredSorted()));

// ─── 10. CHECKOUT SIMULATION ──────────────────────────────────────────────────

checkoutBtn.addEventListener('click', async () => {
  if (cart.length === 0) return;

  checkoutBtn.disabled = true;
  checkoutStatus.textContent = '⏳ Processing your order…';

  // Capture totals before cart is cleared
  const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = sub * TAX_RATE;
  const total = sub + tax;
  const itemsSnapshot = [...cart];

  try {
    // Persist the order to Supabase (silently skips if not logged in)
    await saveOrderToSupabase(itemsSnapshot, sub, tax, total);

    cart = [];
    saveCart(cart);
    renderCart();
    checkoutStatus.textContent = '';
    closeCart();
    showSuccessModal();
  } catch (err) {
    console.error('[Checkout]', err);
    checkoutStatus.textContent = '❌ Something went wrong. Please try again.';
    checkoutBtn.disabled = false;
  }
});


// ─── 10b. CHECKOUT SUCCESS MODAL ─────────────────────────────────────────────

const successModal = document.getElementById('checkout-success-modal');
const modalOrderId = document.getElementById('modal-order-id');
const modalBackBtn = document.getElementById('modal-back-btn');

function generateOrderId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '#FIF-';
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function showSuccessModal() {
  modalOrderId.textContent = generateOrderId();
  successModal.classList.remove('modal--hidden');
  // Reset animation so it replays each time
  successModal.style.animation = 'none';
  successModal.querySelector('.modal-card').style.animation = 'none';
  requestAnimationFrame(() => {
    successModal.style.animation = '';
    successModal.querySelector('.modal-card').style.animation = '';
  });
  modalBackBtn.focus();
}

function closeSuccessModal() {
  successModal.classList.add('modal--hidden');
}

modalBackBtn.addEventListener('click', () => {
  closeSuccessModal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Close on backdrop click
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) closeSuccessModal();
});

// Close on Escape (extend existing keydown listener)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !successModal.classList.contains('modal--hidden')) {
    closeSuccessModal();
  }
});

// ─── 11. HERO "START SHOPPING" BUTTON ────────────────────────────────────────

document.querySelectorAll('[data-scroll-target]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scrollTarget);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── 12. MOBILE NAV TOGGLE ────────────────────────────────────────────────────

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.style.display === 'flex';
    if (isOpen) {
      navMenu.removeAttribute('style');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      const isDark = document.documentElement.dataset.theme !== 'light';
      Object.assign(navMenu.style, {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '64px',
        right: '0',
        background: isDark ? 'rgba(8,11,22,.98)' : 'rgba(240,242,248,.98)',
        padding: '12px 24px',
        borderRadius: '0 0 14px 14px',
        zIndex: '20',
      });
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });
}

// ─── 13. SPA NAVIGATION ───────────────────────────────────────────────────────

/** Close the mobile nav if it's open. */
function closeMobileNav() {
  if (navMenu && navMenu.style.display === 'flex') {
    navMenu.removeAttribute('style');
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

// Cart nav link → open cart sidebar
document.getElementById('nav-cart')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileNav();
  renderCart();
  openCart();
});

// Home nav link → smooth-scroll to #hero
document.getElementById('nav-home')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileNav();
  document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
});

// Catalogue nav link → smooth-scroll to #catalog
document.getElementById('nav-catalogue')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileNav();
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
});

// Help nav link → open FAQ modal
document.getElementById('nav-help')?.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileNav();
  openFaqModal();
});

// Logo → smooth scroll to top
document.querySelector('.logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── 13b. FAQ MODAL ───────────────────────────────────────────────────────────

const faqModal      = document.getElementById('faq-modal');
const faqModalClose = document.getElementById('faq-modal-close');

function openFaqModal() {
  faqModal.classList.remove('modal--hidden');
  const card = faqModal.querySelector('.auth-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
  faqModalClose.focus();
}

function closeFaqModal() {
  faqModal.classList.add('modal--hidden');
}

faqModalClose.addEventListener('click', closeFaqModal);
faqModal.addEventListener('click', (e) => { if (e.target === faqModal) closeFaqModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !faqModal.classList.contains('modal--hidden')) closeFaqModal();
});

// Accordion toggle for each FAQ question
document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const answer   = btn.nextElementSibling;
    const isOpen   = btn.getAttribute('aria-expanded') === 'true';
    // Close all others first
    document.querySelectorAll('.faq-question').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.hidden = true;
    });
    // Toggle clicked one
    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.hidden = isOpen;
  });
});

// ─── 14. FOOTER YEAR ──────────────────────────────────────────────────────────

if (footerYear) footerYear.textContent = String(new Date().getFullYear());

// ─── 14. THEME TOGGLE ─────────────────────────────────────────────────────────

/**
 * Applies a theme ('dark' | 'light') to <html data-theme="...">
 * and updates the toggle button's icon + aria-label.
 */
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('.theme-toggle__icon');
    const isDark = theme === 'dark';
    icon.textContent = isDark ? '🌙' : '☀️';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);

  // Bounce the icon for a tactile feel
  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('.theme-toggle__icon');
    icon.style.transform = 'scale(1.5) rotate(-20deg)';
    setTimeout(() => { icon.style.transform = ''; }, 300);
  }
}

// Restore saved preference immediately (before first paint)
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
})();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// ─── 15. AUTH UI ──────────────────────────────────────────────────────────────

/** Sync entire header auth UI to current userState with a smooth crossfade. */
function renderAuthUI() {
  if (userState.isLoggedIn && userState.userData) {
    const { name, email, initials } = userState.userData;

    // Update content first
    userInitialsEl.textContent = initials;
    userGreetName.textContent = name.split(' ')[0];
    userGreetEmail.textContent = email;

    // Fade out login btn, fade in avatar
    authLoginBtn.hidden = true;
    userMenu.hidden = false;
    // Allow browser to paint the unhidden state before fading in
    requestAnimationFrame(() => {
      authLoginBtn.classList.remove('auth-ui--visible');
      userMenu.classList.add('auth-ui--visible');
    });
  } else {
    // Fade out avatar, fade in login btn
    userMenu.classList.remove('auth-ui--visible');
    authLoginBtn.hidden = false;
    requestAnimationFrame(() => {
      userMenu.classList.add('auth-ui--visible'); // reset for next login
      authLoginBtn.classList.add('auth-ui--visible');
    });
    userDropdown.classList.remove('user-dropdown--open');

    // Hide user-menu from layout after fade completes
    userMenu.addEventListener('transitionend', () => {
      if (!userState.isLoggedIn) userMenu.hidden = true;
    }, { once: true });
  }
}

// ── Auth Modal open / close ───────────────────────────────────────────────────

function openAuthModal(tab = 'signin') {
  authModal.classList.remove('modal--hidden');
  // replay animation
  const card = authModal.querySelector('.auth-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });
  switchTab(tab);
  // focus first input
  const firstInput = authModal.querySelector('.auth-panel:not(.auth-panel--hidden) .auth-input');
  if (firstInput) setTimeout(() => firstInput.focus(), 50);
}

function closeAuthModal() {
  authModal.classList.add('modal--hidden');
  signinError.textContent = '';
  registerError.textContent = '';
  signinForm.reset();
  registerForm.reset();
}

function switchTab(tab) {
  const toSignin = tab === 'signin';
  tabSignin.classList.toggle('auth-tab--active', toSignin);
  tabSignin.setAttribute('aria-selected', String(toSignin));
  tabRegister.classList.toggle('auth-tab--active', !toSignin);
  tabRegister.setAttribute('aria-selected', String(!toSignin));
  panelSignin.classList.toggle('auth-panel--hidden', !toSignin);
  panelRegister.classList.toggle('auth-panel--hidden', toSignin);
}

// ── Button wiring ─────────────────────────────────────────────────────────────

authLoginBtn.addEventListener('click', () => openAuthModal('signin'));
authModalClose.addEventListener('click', closeAuthModal);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeAuthModal(); });
tabSignin.addEventListener('click', () => switchTab('signin'));
tabRegister.addEventListener('click', () => switchTab('register'));

// Escape closes auth modal too (in addition to cart / checkout modal)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !authModal.classList.contains('modal--hidden')) closeAuthModal();
});

// ── User avatar / dropdown toggle ────────────────────────────────────────────

userAvatarBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = userDropdown.classList.contains('user-dropdown--open');
  userDropdown.classList.toggle('user-dropdown--open', !isOpen);
  userAvatarBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('click', (e) => {
  if (!userMenu.contains(e.target)) {
    userDropdown.classList.remove('user-dropdown--open');
    userAvatarBtn.setAttribute('aria-expanded', 'false');
  }
});

// ── Sign In form ─────────────────────────────────────────────────────────────

signinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signinError.textContent = '';
  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  if (!email || !password) { signinError.textContent = 'Please fill in all fields.'; return; }

  signinSubmit.disabled = true;
  signinSubmit.textContent = 'Signing in…';
  try {
    const userData = await supabaseService.login(email, password);
    userState = { isLoggedIn: true, userData };
    renderAuthUI();
    closeAuthModal();
  } catch (err) {
    signinError.textContent = err.message;
  } finally {
    signinSubmit.disabled = false;
    signinSubmit.textContent = 'Sign In';
  }
});

// ── Register form ────────────────────────────────────────────────────────────

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerError.textContent = '';
  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  if (!name || !email || !password) { registerError.textContent = 'Please fill in all fields.'; return; }
  if (password.length < 6) { registerError.textContent = 'Password must be at least 6 characters.'; return; }

  registerSubmit.disabled = true;
  registerSubmit.textContent = 'Creating account…';
  try {
    const userData = await supabaseService.register(name, email, password);
    userState = { isLoggedIn: true, userData };
    renderAuthUI();
    closeAuthModal();
  } catch (err) {
    registerError.textContent = err.message;
  } finally {
    registerSubmit.disabled = false;
    registerSubmit.textContent = 'Create Account';
  }
});

// Re-query live so the handler is never relying on a stale cache of a hidden element.
document.getElementById('signout-btn').addEventListener('click', async () => {
  try {
    await supabaseService.logout();
  } catch (err) {
    // Log but don't block the UI — always sign the user out locally.
    console.error('[Auth] Sign-out error:', err.message);
  } finally {
    userState = { isLoggedIn: false, userData: null };
    renderAuthUI();
    document.getElementById('user-dropdown').classList.remove('user-dropdown--open');
    // Reload to flush any in-memory Supabase token/session state.
    window.location.reload();
  }
});

// ─── 16. ORDER HISTORY ────────────────────────────────────────────────────────

const ordersModal = document.getElementById('orders-modal');
const ordersModalClose = document.getElementById('orders-modal-close');
const ordersLoading = document.getElementById('orders-loading');
const ordersList = document.getElementById('orders-list');
const ordersEmpty = document.getElementById('orders-empty');
const ordersError = document.getElementById('orders-error');
const myOrdersBtn = document.getElementById('my-orders-btn');

/**
 * Query the Supabase `orders` table for the current user's rows.
 * RLS ensures the query only returns rows whose user_id = auth.uid().
 *
 * @returns {Promise<Array>} Array of order rows, newest first.
 */
async function fetchUserOrders() {
  const { data, error } = await _supabase
    .from('orders')
    .select('id, created_at, items, subtotal, tax, total')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

/** Format a UUID for display — e.g. first 8 chars uppercased. */
function shortId(uuid) {
  return '#' + uuid.replace(/-/g, '').slice(0, 8).toUpperCase();
}

/** Format an ISO date string to a readable local date. */
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/** Build and inject order <li> cards into the list. */
function renderOrders(orders) {
  ordersList.innerHTML = '';
  orders.forEach((order) => {
    const li = document.createElement('li');
    li.className = 'order-card';

    const itemLines = (order.items || [])
      .map(i => `<div class="order-card__item-line">
                   <span>${i.title} ×${i.qty}</span>
                   <span>${fmt(i.price * i.qty)}</span>
                 </div>`)
      .join('');

    li.innerHTML = `
      <div class="order-card__meta">
        <span class="order-card__id">${shortId(order.id)}</span>
        <span class="order-card__date">${fmtDate(order.created_at)}</span>
        <span class="order-card__total">${fmt(order.total)}</span>
      </div>
      <div class="order-card__items">${itemLines}</div>
    `;
    ordersList.appendChild(li);
  });
}

/** Show loading shimmer, hide everything else. */
function showOrdersLoading() {
  ordersLoading.hidden = false;
  ordersList.hidden = true;
  ordersEmpty.hidden = true;
  ordersError.hidden = true;
}

/** Open the modal, trigger a fresh fetch, and render results. */
async function openOrdersModal() {
  // Close the dropdown
  document.getElementById('user-dropdown').classList.remove('user-dropdown--open');

  // Show and animate the modal
  ordersModal.classList.remove('modal--hidden');
  const card = ordersModal.querySelector('.orders-card');
  card.style.animation = 'none';
  requestAnimationFrame(() => { card.style.animation = ''; });

  showOrdersLoading();

  try {
    const orders = await fetchUserOrders();
    ordersLoading.hidden = true;

    if (orders.length === 0) {
      ordersEmpty.hidden = false;
    } else {
      ordersList.hidden = false;
      renderOrders(orders);
    }
  } catch (err) {
    console.error('[Orders] Fetch failed:', err.message);
    ordersLoading.hidden = true;
    ordersError.hidden = false;
  }
}

function closeOrdersModal() {
  ordersModal.classList.add('modal--hidden');
}

// ── Order modal wiring ────────────────────────────────────────────────────────

myOrdersBtn.addEventListener('click', openOrdersModal);
ordersModalClose.addEventListener('click', closeOrdersModal);
ordersModal.addEventListener('click', (e) => { if (e.target === ordersModal) closeOrdersModal(); });

// "Browse Catalogue" link inside empty state closes modal and scrolls
document.getElementById('orders-start-shopping').addEventListener('click', () => {
  closeOrdersModal();
});

// Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !ordersModal.classList.contains('modal--hidden')) closeOrdersModal();
});

// ─── 17. INIT ─────────────────────────────────────────────────────────────────

// Restore Supabase session before rendering. getCurrentUser() is now async
// because it awaits getSession() — Supabase reads its own localStorage token.
(async function initAuth() {
  const saved = await supabaseService.getCurrentUser();
  if (saved) userState = { isLoggedIn: true, userData: saved };
  renderAuthUI();
})();

renderProducts(PRODUCTS);
renderCart();
