/* ==========================================================================
   SMART DESERT PIVOT (SDP) — TRILINGUAL ALGERIAN SAHARAN ROI ENGINE
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

    var cropWaterNeed = {
      wheat: 6500,
      barley: 5200,
      alfalfa: 12000,
      potato: 8200,
      corn: 9500
    };

    var energyCostM3 = {
      grid: 6.5,
      diesel: 16.5,
      solar: 4.0
    };

    function computeAlgerianRoi() {
      var lang = window.getCurrentSdpLang ? window.getCurrentSdpLang() : 'ar';
      var pivots = parseInt(pivotsRange.value, 10) || 2;
      var areaPerPivot = parseInt(areaSelect.value, 10) || 40;
      var crop = cropSelect.value || 'wheat';
      var energy = energySelect.value || 'grid';

      if (pivotsBadge) {
        pivotsBadge.textContent = pivots + (lang === 'ar' ? ' محور' : (lang === 'fr' ? ' Pivot(s)' : ' Pivot(s)'));
      }

      var totalHa = pivots * areaPerPivot;
      var waterPerHa = cropWaterNeed[crop] || 6500;
      var baselineWaterM3 = totalHa * waterPerHa;

      var savingRatio = 0.28;
      var savedWaterM3 = Math.round(baselineWaterM3 * savingRatio);

      var costPerM3 = energyCostM3[energy] || 6.5;
      var directEnergySavingsDzd = Math.round(savedWaterM3 * costPerM3);

      var agronomyBonusDzd = totalHa * 4200;
      var totalAnnualSavingsDzd = directEnergySavingsDzd + agronomyBonusDzd;
      var totalCentimesMillions = (totalAnnualSavingsDzd / 10000).toFixed(1);

      var unitKitPrice = pivots >= 5 ? 290000 : 320000;
      var totalKitInvestment = pivots * unitKitPrice;

      var paybackMonths = Math.max(2.5, Math.min(14, (totalKitInvestment / totalAnnualSavingsDzd) * 12)).toFixed(1);
      var savedPumpHours = Math.round(savedWaterM3 / 120);

      if (lang === 'fr') {
        if (outTotalHa) outTotalHa.textContent = totalHa.toLocaleString('fr-DZ') + ' Hectares';
        if (outBaseWater) outBaseWater.textContent = baselineWaterM3.toLocaleString('fr-DZ') + ' m³';
        if (outWaterSaved) outWaterSaved.textContent = savedWaterM3.toLocaleString('fr-DZ') + ' m³ / an';
        if (outEnergySavedDzd) outEnergySavedDzd.textContent = totalAnnualSavingsDzd.toLocaleString('fr-DZ') + ' DZD';
        if (outCentimes) outCentimes.textContent = 'Soit ' + totalCentimesMillions + ' Millions de Centimes / an';
        if (outKitInvestment) outKitInvestment.textContent = totalKitInvestment.toLocaleString('fr-DZ') + ' DZD (' + (totalKitInvestment / 10000).toFixed(0) + ' M Centimes)';
        if (outPayback) outPayback.textContent = paybackMonths + ' Mois (< 1 saison agricole)';
        if (outPumpHours) outPumpHours.textContent = savedPumpHours.toLocaleString('fr-DZ') + ' h de pompage / an';
      } else if (lang === 'en') {
        if (outTotalHa) outTotalHa.textContent = totalHa.toLocaleString('en-US') + ' Hectares';
        if (outBaseWater) outBaseWater.textContent = baselineWaterM3.toLocaleString('en-US') + ' m³';
        if (outWaterSaved) outWaterSaved.textContent = savedWaterM3.toLocaleString('en-US') + ' m³ / year';
        if (outEnergySavedDzd) outEnergySavedDzd.textContent = totalAnnualSavingsDzd.toLocaleString('en-US') + ' DZD';
        if (outCentimes) outCentimes.textContent = 'Equals ' + totalCentimesMillions + ' Million Centimes / year';
        if (outKitInvestment) outKitInvestment.textContent = totalKitInvestment.toLocaleString('en-US') + ' DZD (' + (totalKitInvestment / 10000).toFixed(0) + 'M Centimes)';
        if (outPayback) outPayback.textContent = paybackMonths + ' Months (< 1 crop season)';
        if (outPumpHours) outPumpHours.textContent = savedPumpHours.toLocaleString('en-US') + ' pump hrs / year';
      } else {
        if (outTotalHa) outTotalHa.textContent = totalHa.toLocaleString('fr-DZ') + ' هكتار';
        if (outBaseWater) outBaseWater.textContent = baselineWaterM3.toLocaleString('fr-DZ') + ' م³';
        if (outWaterSaved) outWaterSaved.textContent = savedWaterM3.toLocaleString('fr-DZ') + ' م³ / سنة';
        if (outEnergySavedDzd) outEnergySavedDzd.textContent = totalAnnualSavingsDzd.toLocaleString('fr-DZ') + ' دج';
        if (outCentimes) outCentimes.textContent = 'يعادل ' + totalCentimesMillions + ' مليون سنتيم جزائري سنوياً';
        if (outKitInvestment) outKitInvestment.textContent = totalKitInvestment.toLocaleString('fr-DZ') + ' دج (' + (totalKitInvestment / 10000).toFixed(0) + ' مليون سنتيم)';
        if (outPayback) outPayback.textContent = paybackMonths + ' شهر (أقل من موسم فلاحي واحد)';
        if (outPumpHours) outPumpHours.textContent = savedPumpHours.toLocaleString('fr-DZ') + ' ساعة ضخ / سنة';
      }
    }

    window.refreshSdpCalculatorLang = computeAlgerianRoi;

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
        window.showSdpToast('✓ Farm Preset', btn.textContent.trim());
      });
    });

    computeAlgerianRoi();
  });
})();
