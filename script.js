const prices = {
        "ورود": 150,
        "زفاف": 500,
        "تخرج": 200,
        "مناسبة خاصة / حب": 180,
        "عيد ميلاد": 160,
        "اعتذار": 250
    };

    window.addEventListener('DOMContentLoaded', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let counter = document.getElementById('cart-count');
        if (counter) counter.innerText = cart.length;
    });

  function saveToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: name, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));

    // تحديث العداد
    let counter = document.getElementById('cart-count');
    if (counter) counter.innerText = cart.length;

    // 1. تفعيل حركة الأيقونة
    let icon = document.getElementById('cart-icon');
    if (icon) {
        icon.classList.add('cart-bounce');
        setTimeout(() => { icon.classList.remove('cart-bounce'); }, 500);
    }

    // 2. إظهار شريط التنبيه (Toast)
    let toast = document.getElementById('toast-message');
    toast.style.display = 'block';
    
    // إخفاء الشريط بعد 3 ثواني
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
    function addToCart(name, price) {
        if (typeof name === 'undefined') {
            const type = document.getElementById('service-type').value;
            if (!type || !prices[type]) return;
            saveToCart(type, prices[type]);
            
            return;
        }

        if (typeof price === 'undefined' && prices[name]) {
            price = prices[name];
        }
        saveToCart(name, price);
    
    }

    function addToCartProduct(name, price) {
        addToCart(name, price);
    }

   function showImage() {
        const type = document.getElementById('service-type').value;
        const imgElement = document.getElementById('display-image');
        const actions = document.getElementById('product-actions');
        const priceDisplay = document.getElementById('product-price');

        if (!type) {
            if (imgElement) imgElement.style.display = 'none';
            if (actions) actions.style.display = 'none';
            return;
        }

        // تم تحديث الأسماء هنا لتطابق الأسماء الجديدة التي رفعتها
        const images = {
            "ورود": "baqat_alwurood.png",
            "زفاف": "tashree_sayarat.png",
            "تخرج": "baqat_altakharr.png",
            "مناسبة خاصة / حب": "baqat_almunasabat.png",
            "عيد ميلاد": "baqat_happy_birthday.png",
            "اعتذار": "baqat_kabira_batchi.png"
        };

        if (imgElement) {
            imgElement.src = images[type] || '';
            imgElement.style.display = 'block';
        }
        if (actions) actions.style.display = 'block';
        if (priceDisplay) priceDisplay.innerText = prices[type] || 0;
    }
    

    function zoomImage(src) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalTargetImg');
        if (modalImg) modalImg.src = src;
        if (modal) modal.style.display = 'block';
    }

    function closeImage() {
        const modal = document.getElementById('imageModal');
        if (modal) modal.style.display = 'none';
    }

    window.onclick = function(event) {
        const modal = document.getElementById('imageModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
// ===== المفضلة =====

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function toggleFavorite(productName) {

    if (favorites.includes(productName)) {
        favorites = favorites.filter(item => item !== productName);
    } else {
        favorites.push(productName);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    refreshFavorites();
}

function refreshFavorites() {

    document.querySelectorAll(".favorite-btn").forEach(btn => {

        const product = btn.dataset.product;

        if (favorites.includes(product)) {
            btn.innerHTML = "♥";
            btn.classList.add("active");
        } else {
            btn.innerHTML = "♡";
            btn.classList.remove("active");
        }

    });

    updateFavoriteCounter();
}

function updateFavoriteCounter() {

    const counter = document.getElementById("fav-count");

    if (counter) {
        counter.innerText = favorites.length;
    }

}

window.addEventListener("DOMContentLoaded", refreshFavorites);

function loadFavoritesPage(){

    function loadFavoritesPage() {

    const container = document.getElementById("favoritesContainer");
    if (!container) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    container.innerHTML = "";

    document.querySelectorAll(".product-card").forEach(card => {

        const btn = card.querySelector(".favorite-btn");

        if (btn && favorites.includes(btn.dataset.product)) {
            container.appendChild(card.cloneNode(true));
        }

    });

}

}
function filterProducts(category,button){

document.querySelectorAll(".category-btn").forEach(btn=>{
btn.classList.remove("active");
});

button.classList.add("active");

document.querySelectorAll(".product-card").forEach(card=>{

if(category==="all"){

card.style.display="block";

}else{

card.style.display=
card.dataset.category===category
?
"block"
:
"none";

}

});

}