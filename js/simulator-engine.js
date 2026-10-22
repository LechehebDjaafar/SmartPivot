/* ==========================================================================
   SMART DESERT PIVOT (SDP) — INTERACTIVE DIGITAL TWIN ENGINE (simulator-engine.js)
   Penman-Monteith ET0 Approximation + Saharan Pivot Safety Interlocks
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var moistureSlider = document.getElementById('simMoistureSlider');
    if (!moistureSlider) return;

    var tempSlider = document.getElementById('simTempSlider');
    var windSlider = document.getElementById('simWindSlider');
    var ecSlider = document.getElementById('simEcSlider');
    var rainToggle = document.getElementById('simRainToggle');
    var modeBtn = document.getElementById('simModeBtn');
    var stepAngleBtn = document.getElementById('simStepAngleBtn');

    var valMoisture = document.getElementById('simMoistureVal');
    var valTemp = document.getElementById('simTempVal');
    var valWind = document.getElementById('simWindVal');
    var valEc = document.getElementById('simEcVal');

    var svgArm = document.getElementById('svgPivotArmGroup');
    var svgSpray = document.getElementById('svgSprayGroup');
    var kpiPump = document.getElementById('simKpiPump');
    var kpiSpeed = document.getElementById('simKpiSpeed');
    var kpiEt0 = document.getElementById('simKpiEt0');
    var kpiSaved = document.getElementById('simKpiSaved');
    var kpiAngle = document.getElementById('simKpiAngle');

    var aiStatusTag = document.getElementById('simAiStatusTag');
    var aiHeadline = document.getElementById('simAiHeadline');
    var aiExplanation = document.getElementById('simAiExplanation');
    var modbusFrame = document.getElementById('simModbusFrame');

    var state = {
      moisture: 26,
      temp: 41,
      wind: 18,
      ec: 2.2,
      rain: false,
      autoMode: true,
      angle: 135
    };

    function evaluatePivotTwin() {
      if (valMoisture) valMoisture.textContent = state.moisture + '% VWC';
      if (valTemp) valTemp.textContent = state.temp + '°C';
      if (valWind) valWind.textContent = state.wind + ' كم/س';
      if (valEc) valEc.textContent = state.ec.toFixed(1) + ' dS/m';

      // Approximate daily Saharan Evapotranspiration ET0 (mm/day)
      var et0 = Math.max(2.1, ((state.temp * 0.19) + (state.wind * 0.085) - (state.moisture * 0.04))).toFixed(1);
      if (kpiEt0) kpiEt0.textContent = et0 + ' مم/يوم';

      var pumpOn = true;
      var speedStr = '1.8 م/دقيقة';
      var savedLitersMin = 380;
      var statusLabel = 'رش تناسبي نشط (AI Active)';
      var titleText = '';
      var descText = '';
      var cmdHex = '01 06 00 10 00 01 48 0F';

      if (state.rain) {
        pumpOn = false;
        speedStr = '0.0 م/دقيقة (إيقاف)';
        savedLitersMin = 1450;
        statusLabel = 'إيقاف مطري فوري (Rain Cut-off)';
        titleText = 'تم فصل قاطع المضخة 380V بسبب رصد هطول مطري';
        descText = 'أشار حساس المطر (YL-83 / Tipping Bucket) إلى هطول زخات مطرية فعلية. أوقف المتحكم ESP32-S3 المضخة فوراً لمنع غمر منطقة الجذور وتوفير 100% من طاقة الضخ.';
        cmdHex = '01 05 00 00 00 00 CD CA (PUMP_STOP_RAIN)';
      } else if (state.wind > 45) {
        pumpOn = false;
        speedStr = '0.0 م/دقيقة (حماية)';
        savedLitersMin = 1450;
        statusLabel = 'تعليق أمان للرياح الرملية (Wind Interlock)';
        titleText = 'إيقاف الرش لتجاوز الرياح عتبة الانجراف (45 كم/س)';
        descText = 'سرعة الرياح الحالية (' + state.wind + ' كم/س) تؤدي إلى تطاير وتبخر أكثر من 65% من رذاذ الرشاشات قبل وصوله للتربة، وتشكل خطراً ميكانيكياً على أبراج المحور. تم تجميد الضخ وإرسال تنبيه SMS للفلاح.';
        cmdHex = '01 05 00 01 FF 00 DD FA (WIND_SAFETY_HOLD)';
      } else if (state.ec >= 4.0) {
        pumpOn = true;
        speedStr = '1.1 م/دقيقة (غسيل أملاح)';
        savedLitersMin = 290;
        statusLabel = 'دورة غسيل ملوحة التربة (Leaching Mode)';
        titleText = 'تفعيل الري العميق لخفض ملوحة الجذور (' + state.ec.toFixed(1) + ' dS/m)';
        descText = 'رصد مجس RS-485 ارتفاع الناقلية الكهربائية للأملاح فوق الحد الآمن للقمح (4.0 dS/m). خفّض النظام سرعة دوران الأبراج لزيادة عمق الترشيح وغسل الأملاح المتراكمة بعيداً عن الجذور.';
        cmdHex = '01 06 00 20 00 6E 08 2B (LEACHING_SLOW_VFD)';
      } else if (state.moisture >= 50) {
        pumpOn = false;
        speedStr = '0.0 م/دقيقة (اكتفاء)';
        savedLitersMin = 1450;
        statusLabel = 'سكون ذكي — سعة حقلية مثالية (Field Capacity)';
        titleText = 'إيقاف الضخ لوصول رطوبة الجذور إلى حد الشبع (' + state.moisture + '%)';
        descText = 'رطوبة التربة الحجمية فوق 50% VWC. أي ضخ إضافي سيؤدي إلى تسرب المياه والأسمدة الآزوتية تحت طبقة الجذور (Deep Percolation). النظام في وضع المراقبة الشمسية.';
        cmdHex = '01 05 00 00 00 00 CD CA (OPTIMAL_STANDBY)';
      } else if (state.temp >= 42) {
        pumpOn = true;
        speedStr = '2.6 م/دقيقة (تبريد نبضي)';
        savedLitersMin = 520;
        statusLabel = 'ري نبضي سريع لمقاومة الإجهاد الحراري';
        titleText = 'تعديل سرعة VFD لتعويض البخر-نتح المرتفع (' + et0 + ' مم/يوم)';
        descText = 'نظراً لارتفاع الحرارة الصحراوية إلى ' + state.temp + '°C وانخفاض الرطوبة إلى ' + state.moisture + '%، يطبق النظام دورة دوران سريعة لترطيب الطبقة السطحية وخفض حرارة المجموع الخضري دون استنزاف البئر.';
        cmdHex = '01 06 00 20 01 04 89 97 (PULSE_COOLING_VFD)';
      } else {
        pumpOn = true;
        speedStr = '1.8 م/دقيقة (قياسي ذكي)';
        savedLitersMin = 430;
        statusLabel = 'سقي تناسبي متوازن (Precision VRI)';
        titleText = 'توزيع مائي متوازن وفق معادلة البخر-نتح (ET0 = ' + et0 + ' مم/يوم)';
        descText = 'الظروف المناخية مثالية للرش المحوري (' + state.temp + '°C، رياح ' + state.wind + ' كم/س). يتم ضخ المخصص المائي الدقيق لرفع الرطوبة من ' + state.moisture + '% إلى السعة الحقلية (45%) بأقل فاقد.';
        cmdHex = '01 06 00 20 00 B4 88 71 (OPTIMAL_VFD_180)';
      }

      if (!state.autoMode) {
        statusLabel = 'تحكم يدوي مباشر (Manual Override)';
      }

      if (kpiPump) {
        kpiPump.textContent = pumpOn ? 'تعمل (ON)' : 'متوقفة (OFF)';
        kpiPump.style.color = pumpOn ? '#6ece9d' : '#ffda6e';
      }
      if (kpiSpeed) kpiSpeed.textContent = speedStr;
      if (kpiSaved) kpiSaved.textContent = savedLitersMin + ' لتر/د';
      if (aiStatusTag) aiStatusTag.textContent = statusLabel;
      if (aiHeadline) aiHeadline.textContent = titleText;
      if (aiExplanation) aiExplanation.textContent = descText;
      if (modbusFrame) modbusFrame.textContent = 'RS-485 MODBUS RTU TX: [' + cmdHex + '] | LoRa SF9 RSSI: -74 dBm';

      if (svgSpray) {
        svgSpray.style.opacity = pumpOn ? '1' : '0.08';
      }
      if ( pumpOn ) {
        state.angle = (state.angle + 18) % 360;
      }
      if (svgArm) {
        svgArm.setAttribute('transform', 'rotate(' + state.angle + ' 160 160)');
      }
      if (kpiAngle) {
        kpiAngle.textContent = state.angle + '°';
      }
    }

    moistureSlider.addEventListener('input', function (e) {
      state.moisture = parseInt(e.target.value, 10);
      evaluatePivotTwin();
    });
    if (tempSlider) {
      tempSlider.addEventListener('input', function (e) {
        state.temp = parseInt(e.target.value, 10);
        evaluatePivotTwin();
      });
    }
    if (windSlider) {
      windSlider.addEventListener('input', function (e) {
        state.wind = parseInt(e.target.value, 10);
        evaluatePivotTwin();
      });
    }
    if (ecSlider) {
      ecSlider.addEventListener('input', function (e) {
        state.ec = parseFloat(e.target.value);
        evaluatePivotTwin();
      });
    }
    if (rainToggle) {
      rainToggle.addEventListener('change', function (e) {
        state.rain = e.target.checked;
        evaluatePivotTwin();
      });
    }
    if (modeBtn) {
      modeBtn.addEventListener('click', function () {
        state.autoMode = !state.autoMode;
        modeBtn.textContent = state.autoMode ? 'النمط الذكي التلقائي (AI Auto)' : 'نمط التحكم اليدوي (Manual)';
        window.showSdpToast('تبديل نمط القيادة', modeBtn.textContent);
        evaluatePivotTwin();
      });
    }
    if (stepAngleBtn) {
      stepAngleBtn.addEventListener('click', function () {
        state.angle = (state.angle + 30) % 360;
        if (svgArm) svgArm.setAttribute('transform', 'rotate(' + state.angle + ' 160 160)');
        if (kpiAngle) kpiAngle.textContent = state.angle + '°';
      });
    }

    document.querySelectorAll('.sim-scenario-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        document.querySelectorAll('.sim-scenario-pill').forEach(function (p) {
          p.classList.remove('active');
        });
        pill.classList.add('active');
        state.moisture = parseInt(pill.getAttribute('data-m'), 10);
        state.temp = parseInt(pill.getAttribute('data-t'), 10);
        state.wind = parseInt(pill.getAttribute('data-w'), 10);
        state.ec = parseFloat(pill.getAttribute('data-ec'));
        state.rain = pill.getAttribute('data-r') === '1';

        moistureSlider.value = state.moisture;
        if (tempSlider) tempSlider.value = state.temp;
        if (windSlider) windSlider.value = state.wind;
        if (ecSlider) ecSlider.value = state.ec;
        if (rainToggle) rainToggle.checked = state.rain;

        evaluatePivotTwin();
        window.showSdpToast('تطبيق سيناريو ميداني', pill.textContent.trim());
      });
    });

    evaluatePivotTwin();
  });
})();
