/* ==========================================================================
   SMART DESERT PIVOT (SDP) — GLOBAL UI, ACCORDIONS & CLIPBOARD (main.js)
   ========================================================================== */
(function () {
  window.showSdpToast = function (title, message) {
    var toast = document.getElementById('sdpToast');
    var tTitle = document.getElementById('sdpToastTitle');
    var tMsg = document.getElementById('sdpToastMsg');
    if (!toast || !tTitle || !tMsg) return;
    tTitle.textContent = title;
    tMsg.textContent = message;
    toast.classList.add('visible');
    if (window._sdpToastTimer) clearTimeout(window._sdpToastTimer);
    window._sdpToastTimer = setTimeout(function () {
      toast.classList.remove('visible');
    }, 4200);
  };

  window.copyTextSafe = function (text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        window.showSdpToast('تم النسخ بنجاح', 'تم نسخ ' + (label || text) + ' إلى الحافظة.');
      }).catch(function () {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      window.showSdpToast('تم النسخ بنجاح', 'تم نسخ ' + (label || text) + ' إلى الحافظة.');
    } catch (e) {
      window.showSdpToast('معلومة جاهزة', text);
    }
    document.body.removeChild(ta);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    var mobileBtns = document.querySelectorAll('.mobile-menu-toggle');
    mobileBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var navList = btn.closest('.t1-pill-navbar').querySelector('.nav-links-list');
        if (navList) {
          navList.classList.toggle('mobile-open');
        }
      });
    });

    // T1 Energy Expandable Accordions
    document.querySelectorAll('.t1-accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.t1-accordion-item');
        if (!item) return;
        var isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        var circle = trigger.querySelector('.t1-accordion-circle');
        if (circle) {
          circle.textContent = !isOpen ? '−' : '+';
        }
      });
    });

    // Copy Path / Text Buttons
    document.querySelectorAll('[data-copy-text]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-copy-text');
        var lbl = btn.getAttribute('data-copy-label') || val;
        window.copyTextSafe(val, lbl);
      });
    });
  });
})();
