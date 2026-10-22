/* ==========================================================================
   SMART DESERT PIVOT (SDP) — LIVE TELEMETRY STREAM (telemetry-stream.js)
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    function updateClocks() {
      var now = new Date();
      var timeStr = now.toLocaleTimeString('ar-DZ', { hour12: false });
      document.querySelectorAll('.live-clock-val').forEach(function (el) {
        el.textContent = timeStr + ' (توقيت الجزائر)';
      });
    }
    updateClocks();
    setInterval(updateClocks, 1000);

    // Subtle live telemetry fluctuation on Master Hub
    var tick = 0;
    setInterval(function () {
      tick++;
      var mEl = document.getElementById('hubLiveMoisture');
      var tEl = document.getElementById('hubLiveTemp');
      var ecEl = document.getElementById('hubLiveEc');
      var degEl = document.getElementById('hubLiveAngle');
      if (mEl) {
        var mVal = (36.4 + Math.sin(tick * 0.4) * 0.6).toFixed(1);
        mEl.textContent = mVal + '%';
      }
      if (tEl) {
        var tVal = (38.5 + Math.cos(tick * 0.3) * 0.4).toFixed(1);
        tEl.textContent = tVal + '°C';
      }
      if (ecEl) {
        var ecVal = (2.15 + Math.sin(tick * 0.25) * 0.04).toFixed(2);
        ecEl.textContent = ecVal + ' dS/m';
      }
      if (degEl) {
        var deg = (142 + (tick % 360)) % 360;
        degEl.textContent = deg + '°';
      }
    }, 3000);
  });
})();
