/* ==========================================================================
   SMART DESERT PIVOT (SDP) — TRILINGUAL INTERACTIVE DIGITAL TWIN ENGINE
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
      var lang = window.getCurrentSdpLang ? window.getCurrentSdpLang() : 'ar';
      var windUnit = lang === 'ar' ? ' كم/س' : ' km/h';
      var etUnit = lang === 'ar' ? ' مم/يوم' : ' mm/day';
      var literUnit = lang === 'ar' ? ' لتر/د' : ' L/min';

      if (valMoisture) valMoisture.textContent = state.moisture + '% VWC';
      if (valTemp) valTemp.textContent = state.temp + '°C';
      if (valWind) valWind.textContent = state.wind + windUnit;
      if (valEc) valEc.textContent = state.ec.toFixed(1) + ' dS/m';

      var et0 = Math.max(2.1, ((state.temp * 0.19) + (state.wind * 0.085) - (state.moisture * 0.04))).toFixed(1);
      if (kpiEt0) kpiEt0.textContent = et0 + etUnit;

      var pumpOn = true;
      var speedStr = '';
      var savedLitersMin = 380;
      var statusLabel = '';
      var titleText = '';
      var descText = '';
      var cmdHex = '01 06 00 10 00 01 48 0F';

      if (state.rain) {
        pumpOn = false;
        savedLitersMin = 1450;
        cmdHex = '01 05 00 00 00 00 CD CA (PUMP_STOP_RAIN)';
        if (lang === 'fr') {
          speedStr = '0.0 m/min (Arrêt)';
          statusLabel = 'Coupure Pluie Instantanée (Rain Cut-off)';
          titleText = 'Disjoncteur pompe 380V coupé suite à la détection de pluie';
          descText = 'Le capteur de pluie et le débitmètre YF-S201C ont confirmé des précipitations. Le contrôleur ESP32-S3 a arrêté la pompe pour économiser 100% de l’énergie.';
        } else if (lang === 'en') {
          speedStr = '0.0 m/min (Stopped)';
          statusLabel = 'Instant Rain Cut-off Interlock';
          titleText = '380V Pump Contactor Disengaged Due to Active Rainfall';
          descText = 'The rain sensor detected precipitation. The ESP32-S3 controller immediately halted pumping and closed the flow line (YF-S201C = 0 L/min), saving 100% energy.';
        } else {
          speedStr = '0.0 م/دقيقة (إيقاف)';
          statusLabel = 'إيقاف مطري فوري (Rain Cut-off)';
          titleText = 'تم فصل قاطع المضخة 380V بسبب رصد هطول مطري';
          descText = 'أشار حساس المطر وحساس تدفق المياه (YF-S201C) إلى هطول زخات مطرية فعلية. أوقف المتحكم المضخة فوراً لمنع غمر الجذور وتوفير 100% من طاقة الضخ.';
        }
      } else if (state.wind > 45) {
        pumpOn = false;
        savedLitersMin = 1450;
        cmdHex = '01 05 00 01 FF 00 DD FA (WIND_SAFETY_HOLD)';
        if (lang === 'fr') {
          speedStr = '0.0 m/min (Sécurité)';
          statusLabel = 'Mise en Sécurité Vent de Sable (Wind Interlock)';
          titleText = 'Arrêt de l’arrosage : vent supérieur au seuil de dérive (45 km/h)';
          descText = 'La vitesse du vent (' + state.wind + ' km/h) provoquerait plus de 65% d’évaporation par dérive. Le pompage est suspendu et une alerte SMS est envoyée.';
        } else if (lang === 'en') {
          speedStr = '0.0 m/min (Safety Hold)';
          statusLabel = 'Sandstorm Wind Safety Interlock';
          titleText = 'Spraying Halted: Wind Exceeds Drift Threshold (45 km/h)';
          descText = 'Current wind speed (' + state.wind + ' km/h) causes over 65% spray drift loss before reaching the soil. Pumping is paused and an SMS alert is dispatched.';
        } else {
          speedStr = '0.0 م/دقيقة (حماية)';
          statusLabel = 'تعليق أمان للرياح الرملية (Wind Interlock)';
          titleText = 'إيقاف الرش لتجاوز الرياح عتبة الانجراف (45 كم/س)';
          descText = 'سرعة الرياح الحالية (' + state.wind + ' كم/س) تؤدي إلى تطاير وتبخر أكثر من 65% من رذاذ الرشاشات قبل وصوله للتربة. تم تجميد الضخ وإرسال تنبيه SMS للفلاح.';
        }
      } else if (state.ec >= 4.0) {
        pumpOn = true;
        savedLitersMin = 290;
        cmdHex = '01 06 00 20 00 6E 08 2B (LEACHING_SLOW_VFD)';
        if (lang === 'fr') {
          speedStr = '1.1 m/min (Lessivage)';
          statusLabel = 'Cycle de Lessivage de Salinité (Leaching Mode)';
          titleText = 'Irrigation profonde activée pour réduire la salinité (' + state.ec.toFixed(1) + ' dS/m)';
          descText = 'La sonde RS-485 détecte une salinité élevée. La vitesse des tours est ralentie pour laver les sels sous la zone racinaire.';
        } else if (lang === 'en') {
          speedStr = '1.1 m/min (Leaching)';
          statusLabel = 'Soil Salinity Leaching Cycle Active';
          titleText = 'Deep Irrigation Activated to Flush Root Zone Salts (' + state.ec.toFixed(1) + ' dS/m)';
          descText = 'RS-485 probe detected electrical conductivity above safe wheat thresholds (4.0 dS/m). Tower rotation slowed to leach salts below the root zone.';
        } else {
          speedStr = '1.1 م/دقيقة (غسيل أملاح)';
          statusLabel = 'دورة غسيل ملوحة التربة (Leaching Mode)';
          titleText = 'تفعيل الري العميق لخفض ملوحة الجذور (' + state.ec.toFixed(1) + ' dS/m)';
          descText = 'رصد مجس RS-485 ارتفاع الناقلية الكهربائية للأملاح فوق الحد الآمن للقمح (4.0 dS/m). خفّض النظام سرعة دوران الأبراج لغسل الأملاح المتراكمة بعيداً عن الجذور.';
        }
      } else if (state.moisture >= 50) {
        pumpOn = false;
        savedLitersMin = 1450;
        cmdHex = '01 05 00 00 00 00 CD CA (OPTIMAL_STANDBY)';
        if (lang === 'fr') {
          speedStr = '0.0 m/min (Capacité au champ)';
          statusLabel = 'Veille Intelligente — Humidité Optimale Atteinte';
          titleText = 'Arrêt du pompage : saturation racinaire atteinte (' + state.moisture + '%)';
          descText = 'L’humidité volumétrique dépasse 50% VWC. Tout pompage supplémentaire gaspillerait l’eau et les engrais azotés.';
        } else if (lang === 'en') {
          speedStr = '0.0 m/min (Field Capacity)';
          statusLabel = 'Smart Standby — Optimal Soil Moisture Reached';
          titleText = 'Pumping Halted: Root Zone Reached Field Capacity (' + state.moisture + '%)';
          descText = 'Volumetric soil moisture exceeds 50% VWC. Further pumping would cause deep percolation and nitrogen fertilizer leaching.';
        } else {
          speedStr = '0.0 م/دقيقة (اكتفاء)';
          statusLabel = 'سكون ذكي — سعة حقلية مثالية (Field Capacity)';
          titleText = 'إيقاف الضخ لوصول رطوبة الجذور إلى حد الشبع (' + state.moisture + '%)';
          descText = 'رطوبة التربة الحجمية فوق 50% VWC. أي ضخ إضافي سيؤدي إلى تسرب المياه والأسمدة الآزوتية تحت طبقة الجذور. النظام في وضع المراقبة الشمسية.';
        }
      } else if (state.temp >= 42) {
        pumpOn = true;
        savedLitersMin = 520;
        cmdHex = '01 06 00 20 01 04 89 97 (PULSE_COOLING_VFD)';
        if (lang === 'fr') {
          speedStr = '2.6 m/min (Refroidissement)';
          statusLabel = 'Irrigation Pulsée Anti-Stress Thermique';
          titleText = 'Accélération VFD pour compenser l’ET0 élevée (' + et0 + ' mm/j)';
          descText = 'Face à la chaleur saharienne (' + state.temp + '°C) et une humidité de ' + state.moisture + '%, le pivot accélère sa rotation pour rafraîchir le couvert végétal.';
        } else if (lang === 'en') {
          speedStr = '2.6 m/min (Pulse Cooling)';
          statusLabel = 'Rapid Pulse Irrigation for Heat-Stress Relief';
          titleText = 'VFD Speed Boosted to Offset High Evapotranspiration (' + et0 + ' mm/day)';
          descText = 'With desert heat at ' + state.temp + '°C and soil moisture at ' + state.moisture + '%, the system applies a fast rotation cycle to cool the crop canopy.';
        } else {
          speedStr = '2.6 م/دقيقة (تبريد نبضي)';
          statusLabel = 'ري نبضي سريع لمقاومة الإجهاد الحراري';
          titleText = 'تعديل سرعة VFD لتعويض البخر-نتح المرتفع (' + et0 + ' مم/يوم)';
          descText = 'نظراً لارتفاع الحرارة الصحراوية إلى ' + state.temp + '°C وانخفاض الرطوبة إلى ' + state.moisture + '%، يطبق النظام دورة دوران سريعة لترطيب الطبقة السطحية وخفض حرارة المحصول.';
        }
      } else {
        pumpOn = true;
        savedLitersMin = 430;
        cmdHex = '01 06 00 20 00 B4 88 71 (OPTIMAL_VFD_180)';
        if (lang === 'fr') {
          speedStr = '1.8 m/min (VRI Standard)';
          statusLabel = 'Irrigation Proportionnelle Équilibrée (Precision VRI)';
          titleText = 'Distribution optimale selon l’équation ET0 (' + et0 + ' mm/j)';
          descText = 'Conditions idéales (' + state.temp + '°C, vent ' + state.wind + ' km/h). Le débitmètre YF-S201C confirme un flux régulier pour amener l’humidité de ' + state.moisture + '% à 45%.';
        } else if (lang === 'en') {
          speedStr = '1.8 m/min (Precision VRI)';
          statusLabel = 'Balanced Variable-Rate Irrigation (AI Active)';
          titleText = 'Optimal Water Distribution via ET0 Model (' + et0 + ' mm/day)';
          descText = 'Weather conditions are ideal (' + state.temp + '°C, wind ' + state.wind + ' km/h). YF-S201C flow telemetry confirms steady delivery to raise moisture from ' + state.moisture + '% to 45%.';
        } else {
          speedStr = '1.8 م/دقيقة (قياسي ذكي)';
          statusLabel = 'سقي تناسبي متوازن (Precision VRI)';
          titleText = 'توزيع مائي متوازن وفق معادلة البخر-نتح (ET0 = ' + et0 + ' مم/يوم)';
          descText = 'الظروف المناخية مثالية للرش المحوري (' + state.temp + '°C، رياح ' + state.wind + ' كم/س). يؤكد حساس التدفق YF-S201C ضخ المخصص الدقيق لرفع الرطوبة من ' + state.moisture + '% إلى 45%.';
        }
      }

      if (!state.autoMode) {
        statusLabel = lang === 'fr' ? 'Contrôle Manuel Direct' : (lang === 'en' ? 'Manual Override Mode' : 'تحكم يدوي مباشر (Manual Override)');
      }

      if (kpiPump) {
        if (lang === 'fr') {
          kpiPump.textContent = pumpOn ? 'Active (ON)' : 'Arrêtée (OFF)';
        } else if (lang === 'en') {
          kpiPump.textContent = pumpOn ? 'Running (ON)' : 'Stopped (OFF)';
        } else {
          kpiPump.textContent = pumpOn ? 'تعمل (ON)' : 'متوقفة (OFF)';
        }
        kpiPump.style.color = pumpOn ? '#4ade80' : '#fbbf24';
      }
      if (kpiSpeed) kpiSpeed.textContent = speedStr;
      if (kpiSaved) kpiSaved.textContent = savedLitersMin + literUnit;
      if (aiStatusTag) aiStatusTag.textContent = statusLabel;
      if (aiHeadline) aiHeadline.textContent = titleText;
      if (aiExplanation) aiExplanation.textContent = descText;
      if (modbusFrame) modbusFrame.textContent = 'RS-485 MODBUS RTU TX: [' + cmdHex + '] | Flow Sensor YF-S201C: ' + (pumpOn ? '24.5 L/min' : '0.0 L/min');

      if (svgSpray) {
        svgSpray.style.opacity = pumpOn ? '1' : '0.08';
      }
      if (pumpOn) {
        state.angle = (state.angle + 18) % 360;
      }
      if (svgArm) {
        svgArm.setAttribute('transform', 'rotate(' + state.angle + ' 160 160)');
      }
      if (kpiAngle) {
        kpiAngle.textContent = state.angle + '°';
      }
    }

    window.refreshSdpSimulatorLang = evaluatePivotTwin;

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
        var lang = window.getCurrentSdpLang ? window.getCurrentSdpLang() : 'ar';
        if (lang === 'fr') {
          modeBtn.textContent = state.autoMode ? 'Mode IA Automatique (AI Auto)' : 'Mode Manuel (Override)';
        } else if (lang === 'en') {
          modeBtn.textContent = state.autoMode ? 'Smart AI Auto Mode' : 'Manual Override Mode';
        } else {
          modeBtn.textContent = state.autoMode ? 'النمط الذكي التلقائي (AI Auto)' : 'نمط التحكم اليدوي (Manual)';
        }
        window.showSdpToast('Mode', modeBtn.textContent);
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
        window.showSdpToast('✓ Scenario', pill.textContent.trim());
      });
    });

    evaluatePivotTwin();
  });
})();
