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
    price: 149.99,
    comparePrice: 199.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&q=80',
  },
  {
    id: 'p002',
    title: 'Orbit Wireless Mouse',
    description: '26 000 DPI optical sensor, 72-hour battery, zero-delay 2.4 GHz dongle.',
    price: 89.99,
    comparePrice: 119.99,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
  },
  {
    id: 'p003',
    title: 'Lumina 4K Monitor',
    description: '27" IPS panel, 144 Hz, 1 ms GTG, factory-calibrated Display P3 coverage.',
    price: 499.99,
    comparePrice: 649.99,
    stock: 4,
    image: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&q=80',
  },
  {
    id: 'p004',
    title: 'Nova USB-C Hub',
    description: '10-in-1 hub — 4K HDMI, 100 W PD, 2× USB-A 3.2, SD/microSD, Ethernet.',
    price: 59.99,
    comparePrice: 79.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&q=80',
  },
  {
    id: 'p005',
    title: 'Phantom ANC Buds',
    description: 'Hybrid Active Noise Cancellation, 32 h total playback, spatial audio, IPX5.',
    price: 219.99,
    comparePrice: 279.99,
    stock: 9,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
  },
  {
    id: 'p006',
    title: 'Vertex SSD 2 TB',
    description: 'PCIe Gen 4 NVMe — 7 400 MB/s sequential reads with shock-resistant casing.',
    price: 134.99,
    comparePrice: 179.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80',
  },
  {
    id: 'p007',
    title: 'Slate Webcam 4K',
    description: 'Sony STARVIS sensor, f/1.8 aperture, hardware privacy shutter, dual mics.',
    price: 169.99,
    comparePrice: 219.99,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80',
  },
  {
    id: 'p008',
    title: 'Fusion Charging Pad',
    description: '3-in-1 MagSafe-compatible — phone, watch & buds charged simultaneously.',
    price: 79.99,
    comparePrice: 109.99,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1618577608401-1ef95337e3ee?w=600&q=80',
  },
];

// Mutable stock map (productId -> remaining units)
const stockMap = Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]));

const TAX_RATE = 0.085; // 8.5 %
const STORAGE_KEY = 'fif_cart_v1';
const THEME_KEY = 'fif_theme_v1'; // 'dark' | 'light'
const AUTH_KEY = 'fif_auth_v1';  // current session: { name, email, initials }
const USERS_KEY = 'fif_users_v1'; // user "database": [{ name, email, passHash }]

// ─── 2. AUTH SERVICE (mock backend — swap method bodies for Firebase/Supabase) ─

/**
 * Simple djb2-style hash so we never store raw passwords.
 * Replace with bcrypt / Firebase Auth in production.
 */
function _hashPass(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

const authService = {
  // ── Internal helpers ────────────────────────────────────────────────────────
  _getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
  },
  _saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  _saveSession(userData) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  },

  // ── Public API ── (replace bodies here to integrate Firebase/Supabase) ─────

  /**
   * Login with email + password.
   * @returns {Promise<{name, email, initials}>} resolves on success, rejects with Error on failure.
   * Firebase equivalent:
   *   return signInWithEmailAndPassword(auth, email, password)
   *          .then(cred => toUserData(cred.user));
   */
  async login(email, password) {
    await new Promise(r => setTimeout(r, 700)); // simulate latency
    const users = this._getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (!user || user.passHash !== _hashPass(password)) {
      throw new Error('Invalid email or password.');
    }
    const userData = { name: user.name, email: user.email, initials: user.initials };
    this._saveSession(userData);
    return userData;
  },

  /**
   * Register a new account.
   * @returns {Promise<{name, email, initials}>}
   * Firebase equivalent:
   *   return createUserWithEmailAndPassword(auth, email, password)
   *          .then(cred => updateProfile(cred.user, { displayName: name }))
   *          .then(() => toUserData(auth.currentUser));
   */
  async register(name, email, password) {
    await new Promise(r => setTimeout(r, 800)); // simulate latency
    const users = this._getUsers();
    const normEmail = email.toLowerCase().trim();
    if (users.find(u => u.email === normEmail)) {
      throw new Error('An account with this email already exists.');
    }
    const words = name.trim().split(/\s+/);
    const initials = (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
    const newUser = { name: name.trim(), email: normEmail, initials, passHash: _hashPass(password) };
    users.push(newUser);
    this._saveUsers(users);
    const userData = { name: newUser.name, email: newUser.email, initials };
    this._saveSession(userData);
    return userData;
  },

  /**
   * Sign out the current user.
   * Firebase equivalent: signOut(auth);
   */
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  /**
   * Read the persisted session (called on page load).
   * Firebase equivalent: listen to onAuthStateChanged(auth, callback).
   * @returns {{name, email, initials}|null}
   */
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null;
    } catch { return null; }
  },
};

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
  openCart();
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
  img.alt = product.title;
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

  await new Promise((r) => setTimeout(r, 1800)); // simulate network

  const success = Math.random() < 0.9; // 90 % success rate

  if (success) {
    cart = [];
    saveCart(cart);
    renderCart();
    checkoutStatus.textContent = '';
    closeCart();
    showSuccessModal();
  } else {
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

// ─── 13. FOOTER YEAR ──────────────────────────────────────────────────────────

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

/** Sync entire header auth UI to current userState. */
function renderAuthUI() {
  if (userState.isLoggedIn && userState.userData) {
    const { name, email, initials } = userState.userData;
    authLoginBtn.hidden = true;
    userMenu.hidden = false;
    userInitialsEl.textContent = initials;
    userGreetName.textContent = name.split(' ')[0];
    userGreetEmail.textContent = email;
  } else {
    authLoginBtn.hidden = false;
    userMenu.hidden = true;
    userDropdown.classList.remove('user-dropdown--open');
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
    const userData = await authService.login(email, password);
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
    const userData = await authService.register(name, email, password);
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

// ── Sign Out ─────────────────────────────────────────────────────────────────

signoutBtn.addEventListener('click', () => {
  authService.logout();
  userState = { isLoggedIn: false, userData: null };
  renderAuthUI();
  userDropdown.classList.remove('user-dropdown--open');
});

// ─── 16. INIT ─────────────────────────────────────────────────────────────────

// Restore auth session before rendering anything
(function initAuth() {
  const saved = authService.getCurrentUser();
  if (saved) userState = { isLoggedIn: true, userData: saved };
  renderAuthUI();
})();

renderProducts(PRODUCTS);
renderCart();
