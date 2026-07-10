// ===============================
// الأسئلة الشائعة
// ===============================

const faqButtons = document.querySelectorAll(".faq-btn");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const content = button.nextElementSibling;
        const icon = button.querySelector("span");

        document.querySelectorAll(".faq-content").forEach(item => {

            if (item !== content) {
                item.style.display = "none";
            }

        });

        document.querySelectorAll(".faq-btn span").forEach(item => {

            if (item !== icon) {
                item.textContent = "+";
            }

        });

        if (content.style.display === "block") {

            content.style.display = "none";
            icon.textContent = "+";

        } else {

            content.style.display = "block";
            icon.textContent = "−";

        }

    });

});


// ===============================
// إرسال الاستفسار عبر واتساب
// ===============================

function sendSupport(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || phone === "" || message === "") {

        alert("يرجى تعبئة جميع الحقول");

        return;

    }

    const text =

`🌸 استفسار جديد - غيمة وورد

👤 الاسم:
${name}

📱 رقم الجوال:
${phone}

💬 الرسالة:
${message}`;

    window.open(
        `https://wa.me/966501223800?text=${encodeURIComponent(text)}`,
        "_blank"
    );

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";

    alert("تم تجهيز رسالتك وسيتم فتح واتساب.");

}


// ===============================
// حركة ظهور العناصر
// ===============================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

document.querySelectorAll(
".welcome-card,.contact-card,.work-hours,.feedback-card,.faq-section,.message-card,.support-btn"
).forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = ".6s ease";

    observer.observe(item);

});


// ===============================
// رسالة ترحيبية
// ===============================

window.addEventListener("load", () => {

    console.log("Cloud & Roses Support Center Loaded");

});