(function () {
  "use strict";

  // تفعيل حالة JS حتى لا يختفي المحتوى إذا تعطّل السكربت
  document.documentElement.classList.add("js");

  // 1) السنة الحالية في التذييل
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) بناء رابط واتساب من البيانات المكتوبة على الزر
  //    غيّر الرقم من data-phone في index.html (بصيغة دولية بدون + أو أصفار)
  var waBtn = document.getElementById("whatsapp-btn");
  if (waBtn) {
    var phone = (waBtn.getAttribute("data-phone") || "").replace(/\D/g, "");
    var message = waBtn.getAttribute("data-message") || "";
    if (phone) {
      var url = "https://wa.me/" + phone;
      if (message) {
        url += "?text=" + encodeURIComponent(message);
      }
      waBtn.setAttribute("href", url);
    }
  }

  // 3) ظهور الأقسام تدريجيًا عند التمرير
  var items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    items.forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();