// مصفوفة الأسعار (تأكد من مطابقتها للقائمة في HTML)
const prices = {
    "ورود": 150,
    "زفاف": 500,
    "تخرج": 200,
    "مناسبة خاصة / حب": 180,
    "عيد ميلاد": 160,
    "اعتذار": 250
};

let cart = []; // السلة الحقيقية

// دالة العرض (تظهر الصورة والسعر)
function showImage() {
    const type = document.getElementById("service-type").value;
    const imgElement = document.getElementById("display-image");
    const actions = document.getElementById("product-actions");
    const priceDisplay = document.getElementById("product-price");

    if (type === "") {
        imgElement.style.display = "none";
        actions.style.display = "none";
        return;
    }

    // تعيين الصورة بناءً على النوع
    const images = {
        "ورود": "باقة الورود.png",
        "زفاف": "تشريع سيارات.png",
        "تخرج": "باقة التخرج.png",
        "مناسبة خاصة / حب": "باقة المناسبات.png",
        "عيد ميلاد": "باقة هبي بايرث داي.png",
        "اعتذار": "باقه كبيره مع باتشي.png"
    };

    imgElement.src = images[type];
    imgElement.style.display = "block";
    actions.style.display = "block";
    priceDisplay.innerText = prices[type];
}

// دالة الإضافة الحقيقية للسلة
function addToCart() {
    const type = document.getElementById("service-type").value;
    if (type === "") return; // لا تضيف إذا لم يختر شيئاً

    const price = prices[type];
    
    // إضافة المنتج للمصفوفة
    cart.push({ name: type, price: price });

    // تحديث العرض في القائمة
    updateCartList();
}

function updateCartList() {
    const cartList = document.getElementById("cart-list");
    const totalDisplay = document.getElementById("cart-total");
    
    cartList.innerHTML = ""; // مسح القائمة القديمة لإعادة بنائها
    let total = 0;

    cart.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = `${item.name} - ${item.price} ريال`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalDisplay.innerText = total;
}
// تهيئة عناصر واجهة المستخدم عند تحميل DOM
document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById("about-text");
    const btn = document.getElementById("readMoreBtn");

    if (!textElement || !btn) return;

    // نتحقق إذا كان النص فعلياً يحتاج لزر "المزيد"
    if (textElement.scrollHeight > textElement.clientHeight) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }

    btn.addEventListener('click', function () {
        if (textElement.classList.contains("expanded")) {
            textElement.classList.remove("expanded");
            btn.innerHTML = "اقرأ المزيد...";
        } else {
            textElement.classList.add("expanded");
            btn.innerHTML = "عرض أقل";
        }
    });
});

function toggleReadMore() {
    const textElement = document.getElementById("about-text");
    const btn = document.getElementById("readMoreBtn");
    if (!textElement || !btn) return;

    if (textElement.classList.contains("expanded")) {
        textElement.classList.remove("expanded");
        btn.innerHTML = "اقرأ المزيد";
    } else {
        textElement.classList.add("expanded");
        btn.innerHTML = "عرض أقل";
    }
}
function animateCounter(id, start, end, duration) {

    let obj = document.getElementById(id);
    if (!obj) return;

    let range = end - start;
    let minTime = 30;
    let stepTime = Math.max(Math.floor(duration / range), minTime);

    let startTime = new Date().getTime();
    let endTime = startTime + duration;

    function run() {

        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));

        if (id === "rating-counter") {
            obj.innerHTML = (value / 10).toFixed(1) + "★";
        } else {
            obj.innerHTML = value + "+";
        }

        if (now < endTime) {
            setTimeout(run, stepTime);
        }
    }

    run();
}

// تشغيل العدادات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
  console.log("Counter Started");
    animateCounter("orders-counter", 0, 500, 2000);

    animateCounter("customers-counter", 0, 320, 2000);

    animateCounter("rating-counter", 0, 49, 2000);

});
