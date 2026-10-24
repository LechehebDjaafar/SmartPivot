/* ==========================================================================
   SMART DESERT PIVOT (SDP) — CONTACT, AUDIT & WHATSAPP HANDLER
   Verified Ouargla Founder Credentials: +213 658 30 14 20
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
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
        window.showSdpToast('✓', (roleLabel || interestVal));
      });
    });

    var form = document.getElementById('sdpContactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var lang = window.getCurrentSdpLang ? window.getCurrentSdpLang() : 'ar';
        var name = (document.getElementById('contactName') || {}).value || 'Visitor';
        var phone = (document.getElementById('contactPhone') || {}).value || '';
        var wilaya = (document.getElementById('contactWilaya') || {}).value || 'Ouargla';

        var cleanPhone = phone.replace(/\s+/g, '');
        var dzRegex = /^(\+213|00213|0)(5|6|7)[0-9]{8}$/;
        if (!dzRegex.test(cleanPhone) && cleanPhone.length < 8) {
          var errMsg = lang === 'fr' ? 'Veuillez saisir un numéro de téléphone valide.' : (lang === 'en' ? 'Please enter a valid phone number.' : 'يرجى إدخال رقم هاتف صحيح للتواصل.');
          window.showSdpToast('⚠️ Phone', errMsg);
          return;
        }

        var feedbackBox = document.getElementById('contactSuccessBanner');
        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          if (lang === 'fr') {
            feedbackBox.innerHTML = '<strong>✓ Demande enregistrée avec succès (' + name + ' — ' + wilaya + ') !</strong><br>Votre message est prêt pour le fondateur <strong>Lecheheb Djaafar</strong> à Ouargla (<span dir="ltr">+213 658 30 14 20</span>).';
          } else if (lang === 'en') {
            feedbackBox.innerHTML = '<strong>✓ Request registered successfully (' + name + ' — ' + wilaya + ')!</strong><br>Your inquiry has been prepared for founder <strong>Lecheheb Djaafar</strong> in Ouargla (<span dir="ltr">+213 658 30 14 20</span>).';
          } else {
            feedbackBox.innerHTML = '<strong>✓ تم تسجيل طلبك بنجاح يا ' + name + ' (' + wilaya + ')!</strong><br>تم تجهيز ملخص طلبك للتواصل المباشر مع المؤسس <strong>لشهب جعفر</strong> بورقلة على الرقم <span dir="ltr">+213 658 30 14 20</span>.';
          }
        }
        window.showSdpToast('✓ Sent', name + ' (' + wilaya + ')');
      });
    }

    var waBtn = document.getElementById('whatsappDirectBtn');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        var name = (document.getElementById('contactName') || {}).value || 'Investor / Partner';
        var wilaya = (document.getElementById('contactWilaya') || {}).value || 'Algeria';
        var msg = (document.getElementById('contactMessage') || {}).value || 'Smart Desert Pivot Inquiry';
        var text = encodeURIComponent('Hello Eng. Lecheheb Djaafar (Smart Desert Pivot), I am ' + name + ' (' + wilaya + '). ' + msg);
        var url = 'https://wa.me/213658301420?text=' + text;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  });
})();
