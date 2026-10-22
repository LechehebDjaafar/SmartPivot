/* ==========================================================================
   SMART DESERT PIVOT (SDP) — CONTACT, AUDIT & WHATSAPP HANDLER (contact-handler.js)
   Verified Ouargla Founder Credentials: +213 658 30 14 20
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Role recruitment pre-selector buttons
    document.querySelectorAll('[data-select-interest]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var interestVal = btn.getAttribute('data-select-interest');
        var roleLabel = btn.getAttribute('data-role-title') || '';
        var interestSelect = document.getElementById('contactInterest');
        var msgArea = document.getElementById('contactMessage');
        if (interestSelect && interestVal) {
          interestSelect.value = interestVal;
        }
        if (msgArea && roleLabel) {
          msgArea.value = 'السلام عليكم م. جعفر، أرغب في الترشح/التعاون بخصوص: ' + roleLabel + ' — ';
        }
        window.showSdpToast('تم تجهيز النموذج', 'اخترنا لك المسار المناسب: ' + (roleLabel || interestVal));
      });
    });

    var form = document.getElementById('sdpContactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (document.getElementById('contactName') || {}).value || 'زائر';
        var phone = (document.getElementById('contactPhone') || {}).value || '';
        var wilaya = (document.getElementById('contactWilaya') || {}).value || 'ورقلة';
        var interest = (document.getElementById('contactInterest') || {}).value || 'farmer';

        var cleanPhone = phone.replace(/\s+/g, '');
        var dzRegex = /^(\+213|00213|0)(5|6|7)[0-9]{8}$/;
        if (!dzRegex.test(cleanPhone)) {
          window.showSdpToast('تنبيه رقم الهاتف', 'يرجى إدخال رقم هاتف جزائري صحيح يبدأ بـ 05 أو 06 أو 07 أو +213.');
          return;
        }

        var feedbackBox = document.getElementById('contactSuccessBanner');
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          feedbackBox.innerHTML = '<strong>✓ تم تسجيل طلبك بنجاح يا ' + name + ' (' + wilaya + ')!</strong><br>' +
            'تم تجهيز ملخص طلبك للتواصل المباشر مع المؤسس <strong>لشهب جعفر</strong> بورقلة على الرقم <span dir="ltr">+213 658 30 14 20</span>.';
        }
        window.showSdpToast('تم تسجيل الطلب بنجاح', 'شكراً لتواصلك من ولاية ' + wilaya + '. سنتصل بك خلال 24 ساعة.');
      });
    }

    var waBtn = document.getElementById('whatsappDirectBtn');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        var name = (document.getElementById('contactName') || {}).value || 'مستثمر/شريك';
        var wilaya = (document.getElementById('contactWilaya') || {}).value || 'الجنوب الجزائري';
        var msg = (document.getElementById('contactMessage') || {}).value || 'طلب استشارة حول نظام الري المحوري الذكي SDP';
        var text = encodeURIComponent('السلام عليكم م. لشهب جعفر (Smart Desert Pivot)، معك ' + name + ' من ولاية ' + wilaya + '. ' + msg);
        var url = 'https://wa.me/213658301420?text=' + text;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  });
})();
