/* ============================================================
   پیکربندی
   ============================================================ */
const API_BASE = 'https://dummyjson.com';
const EXCHANGE_RATE = 500000;
const ITEMS_PER_PAGE = 12;

const DISCOUNT_CODES = {
  'SIMIN10':   { type: 'percent', value: 10,     label: '۱۰٪ تخفیف' },
  'WELCOME50': { type: 'fixed',   value: 50000,  label: '۵۰,۰۰۰ تومان تخفیف' }
};

function proxyImage(url) {
  if (!url) return 'https://placehold.co/300x300?text=No+Image';
  const cleanUrl = url.replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}`;
}

/* ============================================================
   دیکشنری ترجمه
   ============================================================ */
const PRODUCT_TITLES = {
  'Essence Mascara Lash Princess':'ریمل اسنس لش پرنسس','Eyeshadow Palette with Mirror':'پالت سایه چشم با آینه','Powder Canister':'قوطی پودر صورت','Red Lipstick':'رژ لب قرمز','Red Nail Polish':'لاک ناخن قرمز',
  'Calvin Klein CK One':'عطر کلوین کلاین CK One','Chanel Coco Noir Eau De':'عطر شنل کوکو نوآر','Dolce Shine Eau de':'عطر دولچه شاین','Gucci Bloom Eau de':'عطر گوچی بلوم',"Dior J'adore":'عطر دیور ژادر',
  'Wooden Bathroom Sink With Mirror':'روشویی چوبی با آینه','Bed':'تخت خواب','Chair':'صندلی','Table':'میز','Knives':'ست چاقو',
  'Apple MacBook Pro 14 Inch Space Grey':'لپ‌تاپ اپل مک‌بوک پرو ۱۴ اینچی','Asus Zenbook Pro Dual Screen Laptop':'لپ‌تاپ ایسوس زن‌بوک پرو','Huawei Matebook X Pro':'لپ‌تاپ هواوی میت‌بوک X پرو','Lenovo Ideapad 320':'لپ‌تاپ لنوو آیدیاپد ۳۲۰','New DELL XPS 13 9300 Laptop':'لپ‌تاپ دل XPS 13 9300',
  'iPhone 5s':'آیفون ۵s','iPhone 6':'آیفون ۶','iPhone 13 Pro':'آیفون ۱۳ پرو','iPhone X':'آیفون X','Oppo A57':'اوپو A57','Oppo F19 Pro Plus':'اوپو F19 پرو پلاس','Oppo K1':'اوپو K1','Realme C35':'ریلمی C35','Realme X':'ریلمی X','Redmi 9C NFC':'ردمی 9C NFC','Samsung Galaxy S7':'سامسونگ گلکسی S7','Samsung Galaxy S8':'سامسونگ گلکسی S8','Samsung Galaxy S10':'سامسونگ گلکسی S10','Samsung Universe 9':'سامسونگ یونیورس ۹','Vivo S1':'ویوو S1','Vivo V9':'ویوو V9','Vivo X21':'ویوو X21',
  'iPad Mini 2021 Starlight':'آیپد مینی ۲۰۲۱','Samsung Galaxy Tab S8 Plus':'سامسونگ گلکسی تب S8 پلاس','Samsung Galaxy Tab White':'سامسونگ گلکسی تب سفید',
  'Brown Leather Belt Watch':'ساعت بند چرمی قهوه‌ای','Longines Master Collection':'ساعت لانژین','Rolex Cellini Date Black Dial':'ساعت رولکس سلینی','Rolex Cellini Moonphase':'ساعت رولکس ماه‌فاز','Rolex Datejust':'ساعت رولکس دیت‌جاست','Rolex Submariner Watch':'ساعت رولکس ساب‌مارینر',
  'IWC Ingenieur Automatic':'ساعت IWC اتوماتیک','Rolex Datejust Women':'ساعت رولکس زنانه','Rolex Watch':'ساعت رولکس',
  'Blue & Black Check Shirt':'پیراهن چهارخانه آبی‌مشکی','Gigabyte Aorus Men Tshirt':'تی‌شرت گیگابایت','Man Plaid Shirt':'پیراهن چهارخانه','Man Short Sleeve Shirt':'پیراهن آستین کوتاه','Men Check Shirt':'پیراهن چهارخانه',
  'Nike Air Jordan 1 Red And Black':'نایک ایر جردن ۱','Nike Baseball Cleats':'کفش بیسبال نایک','Puma Future Rider Trainers':'کفش پوما فیوچر رایدر','Sports Sneakers Off White & Red':'کفش ورزشی سفیدقرمز','Sports Sneakers Off White Red':'کفش ورزشی سفیدقرمز',
  'Black Sun Glasses':'عینک آفتابی مشکی','Classic Sun Glasses':'عینک آفتابی کلاسیک','Green and Black Glasses':'عینک سبزومشکی','Party Glasses':'عینک مهمانی','Sunglasses':'عینک آفتابی',
  "Blue Women's Handbag":'کیف دستی آبی','Cassielynn Bag':'کیف کسیلین','Fancy Handbag':'کیف فانتزی','Green Handbag':'کیف سبز',"Heshe Women's Leather Bag":'کیف چرمی هشه','Prada Women Bag':'کیف پرادا',
  "Black Women's Gown":'پیراهن مجلسی مشکی','Corset Leather With Skirt':'کرست چرمی با دامن','Corset With Black Skirt':'کرست با دامن مشکی','Dress Pea':'پیراهن نخودی','Marni Red & Black Suit':'کت‌شلوار مارنی','Red Dress':'پیراهن قرمز',
  'Amazonite Silver Ring':'انگشتر آمازونیت','Diamond Pendant':'آویز الماسی','Golden Necklace':'گردنبند طلا','Green Crystal Earring':'گوشواره کریستال','Green Oval Earring':'گوشواره بیضی','Rose Gold Earring':'گوشواره رزگلد','Silver Ring':'انگشتر نقره','Tropical Earring':'گوشواره استوایی',
  'Black & Brown Slipper':'دمپایی مشکی‌قهوه‌ای','Calvin Klein Heel Shoes':'کفش پاشنه کلوین','Golden Shoes Woman':'کفش طلایی زنانه','Pampi Shoes':'کفش پامپی','Red Shoes':'کفش قرمز',
  'Apple AirPods Max Silver':'ایرپادز مکس نقره‌ای','Apple Airpower Wireless Charger':'شارژر بی‌سیم ایرپاور','Apple HomePod Mini':'اسپیکر هوم‌پاد مینی','Apple iPhone Charger':'شارژر آیفون','Apple MagSafe Battery Pack':'باتری مگ‌سیف','Apple Watch Series 4 Gold':'اپل واچ سری ۴','Beats Flex Wireless Earphones':'هندزفری بیتس فلکس','iPhone 12 Silicone Case with MagSafe Plum':'قاب سیلیکونی آیفون ۱۲','Monopod':'مونوپاد','Selfie Lamp with iPhone':'چراغ سلفی','Selfie Stick Monopod':'سلفی استیک','TV Studio Camera Pedestal':'پایه دوربین',
  'Generic Motorcycle':'موتورسیکلت جنرال',
  'Attitude Super Leaves Hand Soap':'صابون مایع دست','Olay Ultra Moisture Shea Butter Body Wash':'شامپو بدن اولی','Vaseline Men Body and Face Lotion':'لوسیون واسلین',
  'Apple':'سیب','Banana':'موز','Beef Steak':'استیک گاو','Cat Food':'غذای گربه','Chicken Meat':'گوشت مرغ','Cooking Oil':'روغن','Cucumber':'خیار','Dog Food':'غذای سگ','Eggs':'تخم‌مرغ','Fish Steak':'استیک ماهی','Green Bell Pepper':'فلفل دلمه','Green Chili Pepper':'فلفل تند','Honey Jar':'عسل','Ice Cream':'بستنی','Juice':'آبمیوه','Kiwi':'کیوی','Lemon':'لیمو','Milk':'شیر','Mulberry':'توت','Nescafe Coffee':'نسکافه','Potatoes':'سیب‌زمینی','Protein Powder':'پودر پروتئین','Red Onions':'پیاز قرمز','Rice':'برنج','Soft Drinks':'نوشابه','Strawberry':'توت‌فرنگی','Tissue Paper Box':'دستمال کاغذی','Water':'آب',
  'Decoration Swing':'تاب دکوری','Family Tree Photo Frame':'قاب عکس','House Showpiece Plant':'گیاه تزئینی','Plant Pot':'گلدان',
  'Bamboo Spatula':'کفگیر بامبو','Black Aluminium Cup':'لیوان آلومینیوم','Black Whisk':'همزن','Boxed Baking Sheet':'سینی پخت','Carbon Steel Wok':'ووک','Ceramic Grill':'گریل سرامیکی','Chopping Board':'تخته گوشت','Citrus Squeezer':'آب‌مرکبات‌گیر','Egg Slicer':'تخم‌مرغ‌بر','Electric Stove':'اجاق برقی','Fine Mesh Strainer':'آش‌کش','Fork':'چنگال','Glass':'لیوان','Grater':'رنده','Hand Blender':'مخلوط‌کن','Ice Cube Tray':'قالب یخ','Kitchen Sieve':'الک','Knife':'چاقو','Lunch Box':'جعبه ناهار','Microwave Oven':'مایکروویو','Mug':'ماگ','Pan':'ماهیتابه','Plate':'بشقاب','Red Tongs':'گازانبر','Silver Pot':'قابلمه','Slotted Turner':'کفگیر سوراخ‌دار','Spice Rack':'جاشمعی','Tray':'سینی','Wooden Rolling Pin':'وردنه',
  'American Football':'فوتبال آمریکایی','Baseball Ball':'توپ بیسبال','Baseball Glove':'دستکش بیسبال','Basketball':'بسکتبال','Basketball Rim':'حلقه بسکتبال','Cricket Bat':'چوب کریکت','Feather Shuttlecock':'توپ بدمینتون','Football':'توپ فوتبال','Golf Ball':'توپ گلف','Iron Skillet':'ماهیتابه آهنی','Metal Baseball Bat':'چوب بیسبال','Ping Pong Ball':'توپ پینگ‌پنگ','Ping Pong Bat':'راکت پینگ‌پنگ','Pool Stick':'چوب بیلیارد','Rugby Ball':'توپ راگبی','Shorts':'شورت','Soccer Ball':'توپ فوتبال','Tennis Ball':'توپ تنیس','Tennis Racket':'راکت تنیس','Volleyball':'والیبال',
  '300 Touring':'خودرو ۳۰۰ تورینگ','Charger':'خودرو چارجر','Dodge Hornet':'خودرو دوج هورنت','Durango SXT':'خودرو دورانگو','Grand Cherokee':'خودرو گرندچروکی','Pacific':'خودرو پاسیفیک'
};

const CATEGORY_NAMES = {
  'beauty':'زیبایی','fragrances':'عطر و ادکلن','furniture':'مبلمان','groceries':'خواربار','home-decoration':'دکوراسیون خانه','kitchen-accessories':'لوازم آشپزخانه','laptops':'لپ‌تاپ','mens-shirts':'پیراهن مردانه','mens-shoes':'کفش مردانه','mens-watches':'ساعت مردانه','mobile-accessories':'لوازم جانبی موبایل','motorcycle':'موتورسیکلت','skin-care':'مراقبت پوست','smartphones':'گوشی هوشمند','sports-accessories':'لوازم ورزشی','sunglasses':'عینک آفتابی','tablets':'تبلت','tops':'تی‌شرت','vehicle':'خودرو','womens-bags':'کیف زنانه','womens-dresses':'پیراهن زنانه','womens-jewellery':'جواهرات زنانه','womens-shoes':'کفش زنانه','womens-watches':'ساعت زنانه'
};
const getCategoryName = c => CATEGORY_NAMES[c] || c;

function getProductTitle(title, category) {
  if (!title) return getCategoryName(category);
  if (PRODUCT_TITLES[title]) return PRODUCT_TITLES[title];
  const norm = title.trim().toLowerCase();
  for (const [en, fa] of Object.entries(PRODUCT_TITLES)) {
    if (en.trim().toLowerCase() === norm) return fa;
  }
  for (const [en, fa] of Object.entries(PRODUCT_TITLES)) {
    const n = en.trim().toLowerCase();
    if (norm.includes(n) || n.includes(norm)) return fa;
  }
  return title;
}

/* ============================================================
   مقالات مجله
   ============================================================ */
const mockArticles = [
  { id:1, icon:'💻', title:'راهنمای جامع خرید لپ‌تاپ ۱۴۰۳', description:'از پردازنده و حافظه تا وزن و صفحه‌نمایش؛ مقایسه اپل، ایسوس، دل و لنوو را بخوانید.', date:'۱۵ آذر ۱۴۰۳' },
  { id:2, icon:'🌸', title:'راز زیبایی با محصولات اصل', description:'تفاوت ریمل، پالت سایه و رژ لب اورجینال با نمونه تقلبی + نکات خرید.', date:'۱۰ آذر ۱۴۰۳' },
  { id:3, icon:'📱', title:'بهترین گوشی‌های بازار ایران', description:'مقایسه آیفون، سامسونگ و شیائومی از نظر دوربین، باتری و کارایی.', date:'۵ آذر ۱۴۰۳' },
  { id:4, icon:'⌚', title:'انتخاب ساعت مچی مناسب', description:'ساعت کلاسیک، اسپرت یا هوشمند؟ راهنمای انتخاب برندهای معتبر.', date:'۲۸ آبان ۱۴۰۳' },
  { id:5, icon:'🏠', title:'ترندهای دکوراسیون مدرن', description:'با انتخاب هوشمندانه محصولات، فضایی گرم و مدرن بسازید.', date:'۲۰ آبان ۱۴۰۳' }
];

/* ============================================================
   حالت برنامه
   ============================================================ */
let allProducts = [];
let filteredList = [];
let displayCount = 0;
let currentSort = 'default';
let cart = safeLoad('siminMehrCart', []);
let currentUser = safeLoad('siminMehrUser', null);
let wishlist = safeLoad('siminMehrWishlist', []);
let reviewsStore = safeLoad('siminMehrReviews', {});
let orders = safeLoad('siminMehrOrders', []);
let recentlyViewed = safeLoad('siminMehrRecentlyViewed', []);
let appliedDiscount = null;
let currentProduct = null;

function safeLoad(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function persist(key, val) { localStorage.setItem(key, JSON.stringify(val)); }
function saveCart()         { persist('siminMehrCart', cart); }
function saveWishlist()     { persist('siminMehrWishlist', wishlist); }
function saveReviews()      { persist('siminMehrReviews', reviewsStore); }
function saveOrders()       { persist('siminMehrOrders', orders); }
function saveRecentlyViewed(){ persist('siminMehrRecentlyViewed', recentlyViewed); }

/* ============================================================
   Toast
   ============================================================ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ============================================================
   API مقاوم
   ============================================================ */
async function fetchJSON(url, retries = 2) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      lastErr = e;
      await new Promise(r => setTimeout(r, 700));
    }
  }
  const proxies = [
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    `https://corsproxy.io/?${encodeURIComponent(url)}`
  ];
  for (const p of proxies) {
    try {
      const res = await fetch(p);
      if (!res.ok) throw new Error('proxy');
      return JSON.parse(await res.text());
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('اتصال به سرور برقرار نشد');
}

function mapProduct(p) {
  const price = Math.round(p.price * EXCHANGE_RATE);
  const discount = p.discountPercentage || 0;
  const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;
  return {
    id: p.id,
    title: getProductTitle(p.title, p.category),
    originalTitle: p.title,
    category: p.category,
    price,
    originalPrice,
    discount,
    stock: p.stock ?? 99,
    rating: p.rating ?? 4.5,
    brand: p.brand,
    weight: p.weight,
    dimensions: p.dimensions,
    warranty: p.warrantyInformation,
    shipping: p.shippingInformation,
    returnPolicy: p.returnPolicy,
    description: p.description,
    image: proxyImage(p.thumbnail),
    images: (p.images || [p.thumbnail]).map(proxyImage)
  };
}

async function fetchProductsAPI() {
  const data = await fetchJSON(`${API_BASE}/products?limit=194`);
  return data.products.map(mapProduct);
}
async function fetchSingleProduct(id) {
  const p = await fetchJSON(`${API_BASE}/products/${id}`);
  return mapProduct(p);
}
async function fetchCategories() {
  const cats = await fetchJSON(`${API_BASE}/products/categories`);
  return cats.map(c => typeof c === 'string' ? c : c.slug || c.name);
}
async function fetchRelated(category, excludeId) {
  try {
    const data = await fetchJSON(`${API_BASE}/products/category/${category}?limit=10`);
    return data.products.filter(p => p.id !== excludeId).slice(0, 4).map(mapProduct);
  } catch { return []; }
}

/* ============================================================
   ستاره‌ها
   ============================================================ */
function renderStars(rating) {
  const full = Math.round(rating);
  return `<span class="stars">${'★'.repeat(full)}${'☆'.repeat(5 - full)}</span>`;
}

/* ============================================================
   رندر کارت محصول
   ============================================================ */
function productCardHTML(p) {
  const wishlisted = wishlist.includes(p.id);
  return `
    <div class="product-card">
      <a href="product.html?id=${p.id}" class="product-img-wrap">
        <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy">
        ${p.discount > 0 ? `<span class="discount-badge">${p.discount.toFixed(0)}٪</span>` : ''}
        ${p.stock === 0 ? `<span class="out-of-stock">ناموجود</span>` : ''}
      </a>
      <button class="wishlist-mini ${wishlisted ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)" title="علاقه‌مندی">${wishlisted ? '❤️' : '🤍'}</button>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-category">${getCategoryName(p.category)}</p>
        <div class="product-rating">${renderStars(p.rating)}<span>(${p.rating.toFixed(1)})</span></div>
        <p class="product-price">${p.price.toLocaleString('fa-IR')} تومان</p>
        <div class="card-actions">
          <a href="product.html?id=${p.id}" class="btn-outline">جزئیات</a>
          <button class="btn-primary" onclick="addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>افزودن 🛒</button>
        </div>
      </div>
    </div>`;
}

function renderProducts(list, append = false) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (!append) {
    grid.innerHTML = '';
    displayCount = 0;
    if (list.length === 0) {
      grid.innerHTML = '<p style="text-align:center;width:100%;grid-column:1/-1;padding:40px;">محصولی یافت نشد.</p>';
      document.getElementById('load-more-wrap')?.remove();
      return;
    }
  }

  const slice = list.slice(displayCount, displayCount + ITEMS_PER_PAGE);
  slice.forEach(p => grid.insertAdjacentHTML('beforeend', productCardHTML(p)));
  displayCount += slice.length;

  // دکمه نمایش بیشتر
  let wrap = document.getElementById('load-more-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'load-more-wrap';
    wrap.style.cssText = 'text-align:center;margin:20px 0;';
    grid.insertAdjacentElement('afterend', wrap);
  }
  if (displayCount < list.length) {
    wrap.innerHTML = `<button class="btn-outline" style="padding:12px 40px;" onclick="renderProducts(filteredList, true)">نمایش بیشتر (${list.length - displayCount} مورد)</button>`;
  } else {
    wrap.innerHTML = '';
  }
}

/* ============================================================
   فیلتر، مرتب‌سازی
   ============================================================ */
function applyFilterSort() {
  const search = (document.getElementById('search-input')?.value || '').trim().toLowerCase();
  const cat = document.getElementById('category-filter')?.value || 'all';

  filteredList = allProducts.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search) ||
      (p.originalTitle && p.originalTitle.toLowerCase().includes(search));
    const matchCat = cat === 'all' || p.category === cat;
    return matchSearch && matchCat;
  });

  if (currentSort === 'price-asc')  filteredList.sort((a, b) => a.price - b.price);
  if (currentSort === 'price-desc') filteredList.sort((a, b) => b.price - a.price);
  if (currentSort === 'name')       filteredList.sort((a, b) => a.title.localeCompare(b.title, 'fa'));
  if (currentSort === 'rating')     filteredList.sort((a, b) => b.rating - a.rating);

  renderProducts(filteredList);
}

/* ============================================================
   سبد خرید
   ============================================================ */
function addToCart(productId, qty = 1) {
  const product = allProducts.find(p => p.id === productId) || currentProduct;
  if (!product || product.id !== productId) return showToast('محصول یافت نشد', 'error');
  if (product.stock === 0) return showToast('این محصول موجود نیست', 'error');

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + qty, product.stock);
  } else {
    cart.push({ ...product, quantity: Math.min(qty, product.stock) });
  }
  saveCart();
  updateCartUI();
  showToast(`«${product.title}» به سبد اضافه شد`);
}

function addToCartWithQty(productId) {
  const qty = parseInt(document.getElementById('detail-qty')?.value) || 1;
  addToCart(productId, qty);
}

function changeDetailQty(delta) {
  const input = document.getElementById('detail-qty');
  if (!input) return;
  const cur = parseInt(input.value) || 1;
  const max = parseInt(input.max) || 99;
  input.value = Math.max(1, Math.min(max, cur + delta));
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity < 1) return removeFromCart(productId);
  const stock = item.stock || 99;
  if (item.quantity > stock) item.quantity = stock;
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  showToast('از سبد حذف شد', 'info');
}

function cartTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  let discount = 0;
  if (appliedDiscount) {
    discount = appliedDiscount.type === 'percent'
      ? Math.round(subtotal * appliedDiscount.value / 100)
      : Math.min(subtotal, appliedDiscount.value);
  }
  const shipping = subtotal > 0 && subtotal < 1000000 ? 50000 : 0;
  const total = subtotal - discount + shipping;
  return { subtotal, discount, shipping, total };
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const itemsBox = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  const count = cart.reduce((s, i) => s + i.quantity, 0);
  if (badge) {
    badge.textContent = count.toLocaleString('fa-IR');
    badge.classList.toggle('hidden', count === 0);
  }
  if (!itemsBox) return;

  if (cart.length === 0) {
    itemsBox.innerHTML = '<div class="empty-state"><div class="empty-icon">🛒</div><p>سبد خرید شما خالی است.</p></div>';
    if (totalEl) totalEl.textContent = '۰';
    const foot = document.getElementById('cart-footer-details');
    if (foot) foot.innerHTML = '';
    return;
  }

  itemsBox.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" onclick="location.href='product.html?id=${item.id}'" style="cursor:pointer">
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>${item.price.toLocaleString('fa-IR')} تومان</p>
        <div class="qty-controls">
          <button onclick="updateCartQty(${item.id}, 1)">+</button>
          <span>${item.quantity.toLocaleString('fa-IR')}</span>
          <button onclick="updateCartQty(${item.id}, -1)">−</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <span class="cart-item-subtotal">${(item.price * item.quantity).toLocaleString('fa-IR')}</span>
        <button class="remove-item" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    </div>
  `).join('');

  const t = cartTotals();
  let foot = document.getElementById('cart-footer-details');
  if (!foot) {
    foot = document.createElement('div');
    foot.id = 'cart-footer-details';
    const footer = itemsBox.parentElement.querySelector('.modal-footer');
    if (footer) footer.insertAdjacentElement('beforebegin', foot);
  }
  foot.innerHTML = `
    <div class="cart-summary">
      <div><span>جمع کل:</span><span>${t.subtotal.toLocaleString('fa-IR')} تومان</span></div>
      ${t.discount > 0 ? `<div class="discount-row"><span>تخفیف (${appliedDiscount.label}):</span><span>− ${t.discount.toLocaleString('fa-IR')}</span></div>` : ''}
      <div><span>هزینه ارسال:</span><span>${t.shipping === 0 ? 'رایگان 🎉' : t.shipping.toLocaleString('fa-IR') + ' تومان'}</span></div>
      <div class="total-row"><span>مبلغ نهایی:</span><span>${t.total.toLocaleString('fa-IR')} تومان</span></div>
    </div>
    <div class="discount-box">
      <input type="text" id="discount-input" placeholder="کد تخفیف" value="${appliedDiscount?.code || ''}">
      <button onclick="applyDiscount()">اعمال</button>
    </div>
  `;
  if (totalEl) totalEl.textContent = t.total.toLocaleString('fa-IR');
}

function applyDiscount() {
  const code = document.getElementById('discount-input')?.value.trim().toUpperCase();
  if (!code) return showToast('کد تخفیف را وارد کنید', 'error');
  if (!DISCOUNT_CODES[code]) return showToast('کد تخفیف نامعتبر است', 'error');
  appliedDiscount = { code, ...DISCOUNT_CODES[code] };
  showToast(`کد تخفیف اعمال شد: ${DISCOUNT_CODES[code].label}`);
  updateCartUI();
}

/* ============================================================
   علاقه‌مندی‌ها
   ============================================================ */
function toggleWishlist(productId, el) {
  const idx = wishlist.indexOf(productId);
  if (idx >= 0) {
    wishlist.splice(idx, 1);
    showToast('از علاقه‌مندی‌ها حذف شد', 'info');
  } else {
    wishlist.push(productId);
    showToast('به علاقه‌مندی‌ها اضافه شد ❤️');
  }
  saveWishlist();
  updateWishlistUI();
  if (el) {
    const active = wishlist.includes(productId);
    el.classList.toggle('active', active);
    if (el.classList.contains('wishlist-mini')) el.textContent = active ? '❤️' : '🤍';
  }
}

function updateWishlistUI() {
  const badge = document.getElementById('wishlist-badge');
  if (badge) {
    badge.textContent = wishlist.length.toLocaleString('fa-IR');
    badge.classList.toggle('hidden', wishlist.length === 0);
  }
  const content = document.getElementById('wishlist-content');
  if (!content) return;
  if (wishlist.length === 0) {
    content.innerHTML = '<div class="empty-state"><div class="empty-icon">💔</div><p>هنوز محصولی به علاقه‌مندی‌ها اضافه نکردید.</p></div>';
    return;
  }
  const items = wishlist.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
  content.innerHTML = items.map(p => `
    <div class="cart-item">
      <img src="${p.image}" alt="${p.title}" onclick="location.href='product.html?id=${p.id}'" style="cursor:pointer">
      <div class="cart-item-info">
        <h4>${p.title}</h4>
        <p>${p.price.toLocaleString('fa-IR')} تومان</p>
      </div>
      <div class="cart-item-actions">
        <button class="btn-primary" style="flex:0;padding:8px 12px;font-size:0.8rem" onclick="addToCart(${p.id})">افزودن</button>
        <button class="remove-item" onclick="toggleWishlist(${p.id}); renderWishlistModal()">🗑️</button>
      </div>
    </div>
  `).join('');
}

function renderWishlistModal() {
  // در صورت باز بودن، رفرش کن
  if (document.getElementById('wishlist-modal')?.classList.contains('hidden')) return;
  updateWishlistUI();
}

/* ============================================================
   نظرات
   ============================================================ */
function getReviews(productId) {
  return reviewsStore[String(productId)] || [];
}

function addReview(productId, name, rating, text) {
  const list = getReviews(productId);
  list.unshift({
    name: name || 'کاربر مهمان',
    rating: Number(rating),
    text: text.trim(),
    date: new Date().toLocaleDateString('fa-IR')
  });
  reviewsStore[String(productId)] = list;
  saveReviews();
}

/* ============================================================
   تکمیل سفارش
   ============================================================ */
function openCheckout() {
  if (cart.length === 0) return showToast('سبد خرید خالی است', 'error');
  if (!currentUser) {
    showToast('برای ثبت سفارش ابتدا وارد شوید', 'error');
    closeModal('cart-modal');
    openModal('dashboard-modal');
    renderDashboard();
    return;
  }
  closeModal('cart-modal');
  renderCheckout();
  openModal('checkout-modal');
}

function renderCheckout() {
  const box = document.getElementById('checkout-content');
  if (!box) return;
  const t = cartTotals();
  box.innerHTML = `
    <form id="checkout-form" class="dashboard-form">
      <div class="form-row">
        <input type="text" id="ship-name" placeholder="نام گیرنده" required value="${currentUser.name || ''}">
        <input type="tel" id="ship-phone" placeholder="شماره تماس" required pattern="[0-9]{10,11}">
      </div>
      <input type="text" id="ship-city" placeholder="شهر" required>
      <textarea id="ship-address" placeholder="آدرس کامل پستی" required rows="2"></textarea>
      <input type="text" id="ship-postal" placeholder="کد پستی ۱۰ رقمی" required pattern="[0-9]{10}">
      <div class="payment-options">
        <label><input type="radio" name="payment" value="online" checked> پرداخت آنلاین</label>
        <label><input type="radio" name="payment" value="cod"> پرداخت در محل</label>
      </div>
      <div class="cart-summary" style="margin-top:8px">
        <div><span>جمع کل:</span><span>${t.subtotal.toLocaleString('fa-IR')} تومان</span></div>
        ${t.discount > 0 ? `<div class="discount-row"><span>تخفیف:</span><span>− ${t.discount.toLocaleString('fa-IR')}</span></div>` : ''}
        <div><span>ارسال:</span><span>${t.shipping === 0 ? 'رایگان' : t.shipping.toLocaleString('fa-IR') + ' تومان'}</span></div>
        <div class="total-row"><span>قابل پرداخت:</span><span>${t.total.toLocaleString('fa-IR')} تومان</span></div>
      </div>
      <button type="submit" class="btn-primary" style="padding:14px">ثبت و پرداخت سفارش</button>
    </form>
  `;
  document.getElementById('checkout-form').addEventListener('submit', submitOrder);
}

function submitOrder(e) {
  e.preventDefault();
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const order = {
    id: 'SM-' + Date.now().toString().slice(-8),
    date: new Date().toLocaleDateString('fa-IR'),
    items: cart.map(i => ({ id: i.id, title: i.title, price: i.price, quantity: i.quantity, image: i.image })),
    totals: cartTotals(),
    address: {
      name: document.getElementById('ship-name').value,
      phone: document.getElementById('ship-phone').value,
      city: document.getElementById('ship-city').value,
      address: document.getElementById('ship-address').value,
      postal: document.getElementById('ship-postal').value
    },
    payment: payment === 'online' ? 'پرداخت آنلاین' : 'پرداخت در محل',
    status: 'در حال پردازش'
  };
  orders.unshift(order);
  saveOrders();
  cart = [];
  appliedDiscount = null;
  saveCart();
  updateCartUI();
  closeModal('checkout-modal');

  // نمایش موفقیت
  const box = document.getElementById('checkout-success');
  if (box) {
    box.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:3rem">✅</div>
        <h2 style="color:var(--primary-color);margin:10px 0">سفارش شما ثبت شد!</h2>
        <p>شماره سفارش: <strong>${order.id}</strong></p>
        <p style="color:#666;font-size:0.9rem">${order.payment} • ${order.totals.total.toLocaleString('fa-IR')} تومان</p>
        <button class="btn-primary" style="margin-top:16px;padding:12px 30px" onclick="closeModal('checkout-success'); location.href='index.html'">باشه، ممنون</button>
      </div>
    `;
  }
  openModal('checkout-success');
  showToast('سفارش با موفقیت ثبت شد! 🎉');
}

/* ============================================================
   داشبورد / تاریخچه سفارشات
   ============================================================ */
function renderDashboard() {
  const content = document.getElementById('dashboard-content');
  if (!content) return;

  if (currentUser) {
    const orderHTML = orders.length
      ? orders.map(o => `
          <div class="order-item expandable" onclick="this.classList.toggle('expanded')">
            <div class="order-head">
              <div>
                <strong>سفارش ${o.id}</strong>
                <span class="order-status">${o.status}</span>
              </div>
              <div style="font-size:0.85rem;color:#666">${o.date}</div>
            </div>
            <div class="order-detail">
              ${o.items.map(i => `<div class="order-detail-row"><span>${i.title} × ${i.quantity}</span><span>${(i.price * i.quantity).toLocaleString('fa-IR')}</span></div>`).join('')}
              <div class="total-row"><span>مبلغ کل:</span><span>${o.totals.total.toLocaleString('fa-IR')} تومان</span></div>
              <div style="font-size:0.8rem;color:#888;margin-top:6px">📍 ${o.address.city} — ${o.address.address}</div>
            </div>
          </div>`).join('')
      : '<p style="color:#888;text-align:center;padding:16px">هنوز سفارشی ثبت نکرده‌اید.</p>';

    content.innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <h3>خوش آمدید، ${currentUser.name} عزیز!</h3>
        <p style="color:#666;font-size:0.9rem">${currentUser.email}</p>
      </div>
      <h4>تاریخچه سفارشات (${orders.length.toLocaleString('fa-IR')}):</h4>
      <div class="order-history">${orderHTML}</div>
      <button class="btn-outline" style="margin-top:20px;width:100%" onclick="logoutUser()">خروج از حساب</button>
    `;
  } else {
    content.innerHTML = `
      <form class="dashboard-form" id="login-form">
        <p style="color:#666;font-size:0.9rem">برای مشاهده سفارشات و پنل کاربری وارد شوید.</p>
        <input type="text" id="login-name" placeholder="نام و نام خانوادگی" required>
        <input type="email" id="login-email" placeholder="ایمیل" required>
        <button type="submit" class="btn-primary">ورود / ثبت‌نام</button>
      </form>`;
    document.getElementById('login-form').addEventListener('submit', e => {
      e.preventDefault();
      currentUser = {
        name: document.getElementById('login-name').value,
        email: document.getElementById('login-email').value
      };
      persist('siminMehrUser', currentUser);
      renderDashboard();
      updateUserBadge();
      showToast('خوش آمدید!');
    });
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('siminMehrUser');
  renderDashboard();
  updateUserBadge();
  showToast('خارج شدید', 'info');
}

function updateUserBadge() {
  const badge = document.getElementById('user-badge');
  if (badge) badge.classList.toggle('hidden', !currentUser);
}

/* ============================================================
   مودال‌ها
   ============================================================ */
function openModal(id)  { document.getElementById(id)?.classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id)?.classList.add('hidden'); }

function injectModalsAndButtons() {
  // دکمه علاقه‌مندی در هدر
  const ua = document.querySelector('.user-actions');
  if (ua && !document.getElementById('wishlist-btn')) {
    ua.insertAdjacentHTML('afterbegin', `
      <button class="icon-btn" id="wishlist-btn" title="علاقه‌مندی‌ها">
        ❤️ <span class="badge hidden" id="wishlist-badge">0</span>
      </button>
    `);
    document.getElementById('wishlist-btn').addEventListener('click', () => {
      updateWishlistUI();
      openModal('wishlist-modal');
    });
  }

  // مودال‌های جدید
  if (!document.getElementById('checkout-modal')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-overlay hidden" id="checkout-modal">
        <div class="modal">
          <div class="modal-header">
            <h2>تکمیل سفارش</h2>
            <button class="close-btn" data-close="checkout-modal">✖</button>
          </div>
          <div class="modal-body" id="checkout-content"></div>
        </div>
      </div>
      <div class="modal-overlay hidden" id="checkout-success">
        <div class="modal"><div class="modal-body" id="checkout-success-content">
          <div id="checkout-success"></div>
        </div></div>
      </div>
      <div class="modal-overlay hidden" id="wishlist-modal">
        <div class="modal">
          <div class="modal-header">
            <h2>علاقه‌مندی‌ها ❤️</h2>
            <button class="close-btn" data-close="wishlist-modal">✖</button>
          </div>
          <div class="modal-body" id="wishlist-content"></div>
        </div>
      </div>
      <div id="toast-container"></div>
    `);
  }
}

function setupModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
  });
  document.querySelectorAll('[data-close]').forEach(b => {
    b.addEventListener('click', () => closeModal(b.dataset.close));
  });

  document.getElementById('cart-btn')?.addEventListener('click', () => {
    updateCartUI();
    openModal('cart-modal');
  });
  document.getElementById('dashboard-btn')?.addEventListener('click', () => {
    renderDashboard();
    openModal('dashboard-modal');
  });
  document.getElementById('checkout-btn')?.addEventListener('click', openCheckout);
}

/* ============================================================
   خبرنامه
   ============================================================ */
function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('form-message');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (msg) {
      msg.style.color = ok ? 'green' : 'red';
      msg.textContent = ok ? 'عضویت شما با موفقیت انجام شد!' : 'ایمیل معتبر نیست.';
    }
    if (ok) form.reset();
  });
}

/* ============================================================
   مقالات
   ============================================================ */
function renderArticles() {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  grid.innerHTML = mockArticles.map(a => `
    <article class="article-card">
      <div class="article-icon">${a.icon}</div>
      <h3>${a.title}</h3>
      <p>${a.description}</p>
      <span class="article-date">${a.date}</span>
    </article>
  `).join('');
}

/* ============================================================
   دسته‌بندی‌ها
   ============================================================ */
async function populateCategories() {
  const sel = document.getElementById('category-filter');
  if (!sel || sel.dataset.filled) return;
  try {
    const cats = await fetchCategories();
    cats.forEach(c => {
      const o = document.createElement('option');
      o.value = c;
      o.textContent = getCategoryName(c);
      sel.appendChild(o);
    });
    sel.dataset.filled = '1';
  } catch (e) { console.warn(e); }
}

/* ============================================================
   صفحه اصلی
   ============================================================ */
async function initHomePage() {
  const loading = document.getElementById('loading');
  const errorEl = document.getElementById('error-message');
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  try {
    loading?.classList.remove('hidden');
    grid.classList.add('hidden');
    errorEl?.classList.add('hidden');

    const [products] = await Promise.all([fetchProductsAPI(), populateCategories()]);
    allProducts = products;

    loading?.classList.add('hidden');
    grid.classList.remove('hidden');
    applyFilterSort();

    document.getElementById('search-input')?.addEventListener('input', applyFilterSort);
    document.getElementById('category-filter')?.addEventListener('change', applyFilterSort);
    document.getElementById('sort-select')?.addEventListener('change', e => {
      currentSort = e.target.value;
      applyFilterSort();
    });

  } catch (error) {
    loading?.classList.add('hidden');
    errorEl?.classList.remove('hidden');
    if (errorEl) errorEl.innerHTML = `
      <strong>خطا در دریافت اطلاعات</strong><br>
      <small style="opacity:0.85">${error.message}</small><br>
      <button onclick="location.reload()" style="margin-top:12px;padding:8px 20px;border:none;background:#1a5c8a;color:#fff;border-radius:8px;cursor:pointer;font-family:inherit">تلاش مجدد</button>
    `;
    console.error(error);
  }
}

/* ============================================================
   صفحه محصول
   ============================================================ */
async function initProductPage() {
  const container = document.getElementById('product-detail');
  if (!container) return;

  const id = parseInt(new URLSearchParams(location.search).get('id'));
  if (!id || isNaN(id)) {
    container.innerHTML = '<h2 style="color:red;padding:40px">شناسه محصول نامعتبر است.</h2>';
    return;
  }

  try {
    container.innerHTML = '<div class="loading">در حال دریافت اطلاعات محصول...</div>';
    const product = await fetchSingleProduct(id);
    currentProduct = product;
    window.currentProduct = product;

    // اخیراً دیده‌شده
    recentlyViewed = [id, ...recentlyViewed.filter(x => x !== id)].slice(0, 8);
    saveRecentlyViewed();

    renderProductDetail(container, product);

    // محصولات مشابه
    const related = await fetchRelated(product.category, product.id);
    renderRelated(related);

    // اخیراً دیده‌شده‌های قبلی (بدون محصول فعلی)
    loadAndRenderRecentlyViewed(id);

  } catch (err) {
    container.innerHTML = `<h2 style="color:red;padding:40px">خطا: ${err.message}</h2>`;
  }
}

function renderProductDetail(container, p) {
  const reviews = getReviews(p.id);
  const wishlisted = wishlist.includes(p.id);

  container.innerHTML = `
    <nav class="breadcrumb">
      <a href="index.html">خانه</a>
      <span>›</span>
      <a href="index.html?cat=${p.category}">${getCategoryName(p.category)}</a>
      <span>›</span>
      <span>${p.title}</span>
    </nav>

    <div class="product-main">
      <div class="product-gallery">
        <div class="gallery-main">
          <img id="main-image" src="${p.image}" alt="${p.title}">
          ${p.discount > 0 ? `<span class="discount-badge-big">${p.discount.toFixed(0)}٪ تخفیف</span>` : ''}
        </div>
        ${p.images.length > 1 ? `
          <div class="gallery-thumbs">
            ${p.images.map((img, i) => `
              <img src="${img}" class="thumb ${i === 0 ? 'active' : ''}" data-src="${img}" onclick="switchImage(this)">
            `).join('')}
          </div>` : ''}
      </div>

      <div class="product-detail-info">
        <h1>${p.title}</h1>
        ${p.originalTitle !== p.title ? `<p class="original-title">${p.originalTitle}</p>` : ''}
        <div class="rating-row">
          ${renderStars(p.rating)}
          <span>(${p.rating.toFixed(1)})</span>
          <span class="reviews-link" onclick="scrollToReviews()">${reviews.length} نظر کاربر</span>
        </div>

        <div class="price-row">
          <span class="product-price-large">${p.price.toLocaleString('fa-IR')} تومان</span>
          ${p.discount > 0 ? `<del class="old-price">${p.originalPrice.toLocaleString('fa-IR')}</del>` : ''}
        </div>

        <div class="stock-row ${p.stock < 5 ? 'low' : ''}">
          ${p.stock > 0
            ? (p.stock < 5 ? `⚡ تنها ${p.stock} عدد در انبار` : `✅ موجود در انبار`)
            : `❌ ناموجود`}
        </div>

        <div class="product-meta">
          ${p.brand ? `<div><strong>برند:</strong> ${p.brand}</div>` : ''}
          ${p.warranty ? `<div><strong>گارانتی:</strong> ${p.warranty}</div>` : ''}
          ${p.shipping ? `<div><strong>ارسال:</strong> ${p.shipping}</div>` : ''}
        </div>

        <div class="qty-cart-row">
          <div class="qty-selector">
            <button onclick="changeDetailQty(1)" aria-label="+">+</button>
            <input type="number" id="detail-qty" value="1" min="1" max="${p.stock || 1}">
            <button onclick="changeDetailQty(-1)" aria-label="−">−</button>
          </div>
          <button class="btn-primary add-to-cart-btn" onclick="addToCartWithQty(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
            افزودن به سبد 🛒
          </button>
          <button class="wishlist-btn ${wishlisted ? 'active' : ''}" onclick="toggleWishlist(${p.id}, this)" title="علاقه‌مندی">${wishlisted ? '❤️' : '🤍'}</button>
        </div>
      </div>
    </div>

    <div class="product-tabs" id="tabs">
      <button class="tab-btn active" data-tab="desc">توضیحات</button>
      <button class="tab-btn" data-tab="specs">مشخصات</button>
      <button class="tab-btn" data-tab="reviews">نظرات (${reviews.length})</button>
    </div>

    <div class="tab-content active" id="tab-desc">
      <p>${p.description}</p>
    </div>

    <div class="tab-content" id="tab-specs">
      <table class="specs-table">
        <tr><th>برند</th><td>${p.brand || '—'}</td></tr>
        <tr><th>دسته‌بندی</th><td>${getCategoryName(p.category)}</td></tr>
        <tr><th>وزن</th><td>${p.weight || '—'} ${p.weight ? 'گرم' : ''}</td></tr>
        <tr><th>ابعاد</th><td>${p.dimensions ? `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth}` : '—'}</td></tr>
        <tr><th>گارانتی</th><td>${p.warranty || '—'}</td></tr>
        <tr><th>ارسال</th><td>${p.shipping || '—'}</td></tr>
        <tr><th>شرایط بازگشت</th><td>${p.returnPolicy || '—'}</td></tr>
      </table>
    </div>

    <div class="tab-content" id="tab-reviews">
      <div id="reviews-list">${renderReviewsList(p.id)}</div>
      <form id="review-form" class="review-form">
        <h4>نظر خود را ثبت کنید</h4>
        <div class="rating-input" data-value="5" id="rating-input">
          ${[5, 4, 3, 2, 1].map(n => `<span class="rate-star" data-v="${n}">★</span>`).join('')}
        </div>
        <textarea id="review-text" placeholder="تجربه خود را با دیگران به اشتراک بگذارید..." required rows="3"></textarea>
        <button type="submit" class="btn-primary" style="flex:0;padding:10px 30px">ثبت نظر</button>
      </form>
    </div>

    <section class="related-section">
      <h2>محصولات مشابه</h2>
      <div class="products-grid" id="related-grid"></div>
    </section>

    <section class="recent-section" id="recent-section" style="display:none">
      <h2>اخیراً دیده‌شده</h2>
      <div class="products-grid" id="recent-grid"></div>
    </section>
  `;

  // تب‌ها
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      document.getElementById('tab-' + b.dataset.tab).classList.add('active');
    });
  });

  // ریستینگ ستاره
  const ratingBox = document.getElementById('rating-input');
  ratingBox.addEventListener('click', e => {
    if (!e.target.classList.contains('rate-star')) return;
    ratingBox.dataset.value = e.target.dataset.v;
    ratingBox.querySelectorAll('.rate-star').forEach(s => {
      s.classList.toggle('active', Number(s.dataset.v) <= Number(e.target.dataset.v));
    });
  });
  ratingBox.querySelectorAll('.rate-star').forEach(s => s.classList.add('active'));

  // فرم نظر
  document.getElementById('review-form').addEventListener('submit', e => {
    e.preventDefault();
    const text = document.getElementById('review-text').value.trim();
    if (!text) return;
    const rating = Number(ratingBox.dataset.value);
    addReview(p.id, currentUser?.name, rating, text);
    document.getElementById('reviews-list').innerHTML = renderReviewsList(p.id);
    document.getElementById('review-text').value = '';
    // به‌روزرسانی شمارنده
    const revBtn = [...document.querySelectorAll('.tab-btn')].find(b => b.dataset.tab === 'reviews');
    if (revBtn) revBtn.textContent = `نظرات (${getReviews(p.id).length})`;
    showToast('نظر شما ثبت شد. ممنون! 🙏');
  });
}

function switchImage(el) {
  document.getElementById('main-image').src = el.dataset.src;
  document.querySelectorAll('.gallery-thumbs .thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function scrollToReviews() {
  document.querySelector('.tab-btn[data-tab="reviews"]')?.click();
  document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderReviewsList(productId) {
  const list = getReviews(productId);
  if (list.length === 0) return '<p style="color:#888;padding:12px 0">هنوز نظری ثبت نشده. اولین نفر باشید!</p>';
  return list.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <strong>${r.name}</strong>
          <div>${renderStars(r.rating)}</div>
        </div>
        <span class="review-date">${r.date}</span>
      </div>
      <p>${r.text}</p>
    </div>
  `).join('');
}

function renderRelated(products) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;
  if (products.length === 0) {
    grid.parentElement.style.display = 'none';
    return;
  }
  grid.innerHTML = products.map(p => productCardHTML(p)).join('');
}

async function loadAndRenderRecentlyViewed(excludeId) {
  const section = document.getElementById('recent-section');
  const grid = document.getElementById('recent-grid');
  if (!section || !grid) return;
  const ids = recentlyViewed.filter(id => id !== excludeId).slice(0, 4);
  if (ids.length === 0) return;

  try {
    const products = await Promise.all(ids.map(id =>
      fetchSingleProduct(id).catch(() => null)
    ));
    const valid = products.filter(Boolean);
    if (valid.length === 0) return;
    grid.innerHTML = valid.map(p => productCardHTML(p)).join('');
    section.style.display = '';
  } catch (e) { /* silent */ }
}

/* ============================================================
   راه‌اندازی
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectModalsAndButtons();
  updateCartUI();
  updateUserBadge();
  updateWishlistUI();
  setupModals();
  setupNewsletter();
  renderArticles();
  initHomePage();
  initProductPage();
});