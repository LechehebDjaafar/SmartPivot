/* ==========================================================================
   SMART DESERT PIVOT (SDP) — ALGERIAN SAHARAN ROI ENGINE (calculator-engine.js)
   Grounded in FAO / ONID / ODAS Saharan Irrigation Benchmarks
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var pivotsRange = document.getElementById('roiPivotsRange');
    if (!pivotsRange) return;

    var pivotsBadge = document.getElementById('roiPivotsBadge');
    var areaSelect = document.getElementById('roiAreaSelect');
    var cropSelect = document.getElementById('roiCropSelect');
    var energySelect = document.getElementById('roiEnergySelect');

    var outTotalHa = document.getElementById('roiOutTotalHa');
    var outBaseWater = document.getElementById('roiOutBaseWater');
    var outWaterSaved = document.getElementById('roiOutWaterSaved');
    var outEnergySavedDzd = document.getElementById('roiOutEnergySavedDzd');
    var outCentimes = document.getElementById('roiOutCentimes');
    var outKitInvestment = document.getElementById('roiOutKitInvestment');
    var outPayback = document.getElementById('roiOutPayback');
    var outPumpHours = document.getElementById('roiOutPumpHours');

    // Crop seasonal water consumption in Algerian Sahara (m3 / ha / season)
    var cropWaterNeed = {
      wheat: 6500,     // القمح الصلب واللين (ورقلة / المنيعة / أدرار)
      barley: 5200,    // الشعير
      alfalfa: 12000,  // الفصة والأعلاف الخضراء (بسكرة / ورقلة)
      potato: 8200,    // البطاطس الصحراوية (الوادي سوف)
      corn: 9500       // الذرة العلفية وعباد الشمس (مشاريع ODAS)
    };

    // Total pumping + maintenance + energy cost per m3 in DZD
    var energyCostM3 = {
      grid: 6.5,       // كهرباء فلاحية مدعمة (سونلغاز) + صيانة مضخات الأعماق
      diesel: 16.5,    // مولدات المازوت والديزل في المحيطات البعيدة
      solar: 4.0       // طاقة شمسية هجينة + إهلاك الضاغط والمضخة
    };

    function computeAlgerianRoi() {
      var pivots = parseInt(pivotsRange.value, 10) || 2;
      var areaPerPivot = parseInt(areaSelect.value, 10) || 40;
      var crop = cropSelect.value || 'wheat';
      var energy = energySelect.value || 'grid';

      if (pivotsBadge) pivotsBadge.textContent = pivots + ' محور';

      var totalHa = pivots * areaPerPivot;
      var waterPerHa = cropWaterNeed[crop] || 6500;
      var baselineWaterM3 = totalHa * waterPerHa;

      // Global & FAO precision irrigation water saving benchmark (28% conservative average)
      var savingRatio = 0.28;
      var savedWaterM3 = Math.round(baselineWaterM3 * savingRatio);

      var costPerM3 = energyCostM3[energy] || 6.5;
      var directEnergySavingsDzd = Math.round(savedWaterM3 * costPerM3);

      // Fertilizer leaching prevention & yield quality bonus (~4,200 DZD per ha)
      var agronomyBonusDzd = totalHa * 4200;
      var totalAnnualSavingsDzd = directEnergySavingsDzd + agronomyBonusDzd;
      var totalCentimesMillions = (totalAnnualSavingsDzd / 10000).toFixed(1);

      // SDP Smart Retrofit Kit cost: 320,000 DZD per pivot (with volume discount > 5 pivots)
      var unitKitPrice = pivots >= 5 ? 290000 : 320000;
      var totalKitInvestment = pivots * unitKitPrice;

      var paybackMonths = Math.max(2.5, Math.min(14, (totalKitInvestment / totalAnnualSavingsDzd) * 12)).toFixed(1);
      var savedPumpHours = Math.round(savedWaterM3 / 120);

      if (outTotalHa) outTotalHa.textContent = totalHa.toLocaleString('fr-DZ') + ' هكتار';
      if (outBaseWater) outBaseWater.textContent = baselineWaterM3.toLocaleString('fr-DZ') + ' م³';
      if (outWaterSaved) outWaterSaved.textContent = savedWaterM3.toLocaleString('fr-DZ') + ' م³ / سنة';
      if (outEnergySavedDzd) outEnergySavedDzd.textContent = totalAnnualSavingsDzd.toLocaleString('fr-DZ') + ' دج';
      if (outCentimes) outCentimes.textContent = 'يعادل ' + totalCentimesMillions + ' مليون سنتيم جزائري سنوياً';
      if (outKitInvestment) outKitInvestment.textContent = totalKitInvestment.toLocaleString('fr-DZ') + ' دج (' + (totalKitInvestment / 10000).toFixed(0) + ' مليون سنتيم)';
      if (outPayback) outPayback.textContent = paybackMonths + ' شهر (أقل من موسم فلاحي واحد)';
      if (outPumpHours) outPumpHours.textContent = savedPumpHours.toLocaleString('fr-DZ') + ' ساعة ضخ / سنة';
    }

    pivotsRange.addEventListener('input', computeAlgerianRoi);
    areaSelect.addEventListener('change', computeAlgerianRoi);
    cropSelect.addEventListener('change', computeAlgerianRoi);
    energySelect.addEventListener('change', computeAlgerianRoi);

    document.querySelectorAll('.roi-preset-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.roi-preset-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');
        pivotsRange.value = btn.getAttribute('data-pivots');
        areaSelect.value = btn.getAttribute('data-area');
        cropSelect.value = btn.getAttribute('data-crop');
        energySelect.value = btn.getAttribute('data-energy');
        computeAlgerianRoi();
        window.showSdpToast('تطبيق نموذج مستثمرة', btn.textContent.trim());
      });
    });

    computeAlgerianRoi();
  });
})();
