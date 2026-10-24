/* ==========================================================================
   SMART DESERT PIVOT (SDP) — TRILINGUAL ENGINE (AR / FR / EN) + MOBILE MODE
   ========================================================================== */
(function () {
  window.SDP_TRANSLATIONS = {
    ar: {
      dir: "rtl",
      lang: "ar",
      topbar_badge: "★ مؤسسة ناشئة حاصلة على وسم لابل (Label Projet Innovant)",
      topbar_desc: "منصة استعراضية للمستثمرين والعملاء والشركاء الصناعيين • حاضنة جامعة قاصدي مرباح ورقلة — الجزائر",
      topbar_cert_link: "بطاقة الاعتماد والهوية ←",
      brand_subtitle: "أنظمة الري المحوري الذكي والطاقة الشمسية للصحراء الجزائرية",
      menu_btn: "☰ القائمة",
      // 4 Main Navigation Items
      nav_home: "الرئيسية",
      nav_tech: "التقنية والعتاد",
      nav_hub: "بوابة التجربة والنموذج",
      nav_contact: "الشراكات والتواصل",
      // Sub-hub links
      subhub_explore_label: "🧭 التنقل السريع بين الصفحات التفصيلية:",
      sub_index: "1. العرض التنفيذي",
      sub_tech: "2. العتاد والحساسات (14)",
      sub_sim: "3. المحاكي التفاعلي الحي",
      sub_pilot: "4. النموذج الأولي الفعلي (ألومنيوم + 3D)",
      sub_calc: "5. حاسبة التوفير (ROI)",
      sub_part: "6. شراكات البيفو والفريق",
      sub_about: "7. هوية المؤسسة ووسم لابل",
      sub_contact: "8. حجز معاينة وتواصل",
      // Mobile bottom bar
      mob_home: "الرئيسية",
      mob_tech: "العتاد",
      mob_hub: "النموذج والمحاكي",
      mob_contact: "تواصل وشراكة",
      // Hero (index.html)
      hero_step: "منصة عرض استثمارية وتقنية • ورقلة • الوادي • بسكرة • المنيعة",
      hero_title: "نمنح محاور الري الصحراوية <strong>عقلاً صناعياً ذكياً</strong> يوفر حتى <strong>35% من المياه والطاقة</strong>",
      hero_sub: "مشروع <strong>Smart Desert Pivot (SDP)</strong> الحاصل على وسم لابل للمشاريع المبتكرة يقدم حلاً هندسياً لتحويل محاور الرش القائمة إلى أنظمة ذكية تعمل بالطاقة الشمسية وحساسات التربة وتدفق المياه وشبكة LoRaWAN. استكشف فكرتنا، إحصائياتنا، ونموذجنا الأولي الفعلي والتفاعلي.",
      hero_btn_sim: "▶ تجربة النموذج التفاعلي والفعلي",
      hero_btn_calc: "احسب العائد المالي للمزرعة (دج)",
      hero_btn_contact: "تواصل للاستثمار أو الشراكة",
      kpi1_val: "25%–40%",
      kpi1_lbl: "خفض استهلاك المياه الجوفية وفق معايير منظمة الفاو (FAO) للسقي الدقيق",
      kpi2_val: "5.0 km",
      kpi2_lbl: "مدى تغطية لاسلكية LoRaWAN دون حاجة لشبكة Wi-Fi أو ألياف بصرية",
      kpi3_val: "IP67",
      kpi3_lbl: "حماية صناعية ضد العواصف الرملية والحرارة الصحراوية حتى 60°C",
      live_badge: "● بث محاكاة حي للمحور النموذجي #01 — ورقلة",
      live_m_lbl: "رطوبة التربة (VWC)",
      live_t_lbl: "حرارة الحقل",
      live_ec_lbl: "ملوحة الجذور (EC)",
      live_ang_lbl: "زاوية ذراع البيفو",
      // 4 Diamond Portal Section
      portal_tag: "FOUR-DIAMOND EXPLORATION HUB • بوابة الاستكشاف الرباعية للمستثمرين والعملاء",
      portal_title: "ماذا تريد أن تستكشف في مشروع Smart Desert Pivot؟",
      portal_sub: "صممنا المنصة في 4 محاور استعراضية رئيسية؛ كل محور ينقلك مباشرة إلى التجربة أو الوثيقة الهندسية التي تبحث عنها دون تشتيت:",
      d1_badge: "المحور الأول • التوأم الرقمي التفاعلي",
      d1_title: "المحاكي التفاعلي الحي وحاسبة الجدوى (ROI)",
      d1_desc: "جرب بنفسك كيف يتخذ النظام قرارات الري والإيقاف الآلي في 6 سيناريوهات مناخية صحراوية، واحسب التوفير السنوي بالدينار والسنتيم.",
      d1_btn1: "تشغيل المحاكي التفاعلي ←",
      d1_btn2: "فتح حاسبة التوفير المالي",
      d2_badge: "المحور الثاني • النموذج الفعلي الملموس",
      d2_title: "المجسم الميكانيكي الفعلي بالألومنيوم وتصميم 3D CAD",
      d2_desc: "شاهد الصور الحقيقية والقياسات الهندسية الدقيقة (420mm × 250mm × 150mm) للنموذج الميكانيكي المصنع ومخطط بنية إنترنت الأشياء.",
      d2_btn1: "استعراض النموذج الفعلي و 3D CAD ←",
      d3_badge: "المحور الثالث • العتاد والحساسات الحقيقية",
      d3_title: "صندوق الترقية SDP ومكتبة الحساسات الميدانية",
      d3_desc: "اكتشف المكونات الفعلية للمشروع بما فيها حساس تدفق المياه (YF-S201C 1-30L/min)، الألواح الشمسية، ومجسات التربة والرياح.",
      d3_btn1: "استعراض العتاد والـ 14 مكوناً ←",
      d4_badge: "المحور الرابع • الأعمال والاستثمار",
      d4_title: "شراكات مصنعي البيفو، وسم لابل، والتواصل المباشر",
      d4_desc: "اطلع على وثيقة علامة مشروع مبتكر، عروض الشراكة لمصنعي الهياكل، وتواصل مباشرة مع المؤسس م. لشهب جعفر بورقلة.",
      d4_btn1: "بوابة الشراكات والفريق ←",
      d4_btn2: "تواصل ومعاينة",
      // Benchmarks section
      bench_tag: "REAL-WORLD BENCHMARKS • إحصائيات ومؤشرات واقعية موثقة",
      bench_title: "لماذا يمثل هذا المشروع فرصة استثمارية وزراعية استراتيجية في الجزائر؟",
      bench_sub: "تعتمد الفلاحة الاستراتيجية في الجنوب الجزائري على خزانات المياه الجوفية العميقة. توضح المؤشرات الرسمية حجم السوق والوفر المحقق:",
      b1_tag: "برنامج ODAS الوطني",
      b1_val: "+450,000 هكتار",
      b1_desc: "مساحات الأوعية العقارية الموجهة للزراعات الاستراتيجية (القمح، الذرة، الأعلاف) عبر الجنوب الجزائري والتي تعتمد كلياً على الري المحوري.",
      b2_tag: "فاقد التبخر والرياح",
      b2_val: "30% إلى 45%",
      b2_desc: "نسبة الفاقد المائي في المحاور التقليدية عند التشغيل وقت الظهيرة أو أثناء هبوب الرياح الرملية دون وجود قواطع أمان ذكية.",
      b3_tag: "كفاءة الحساسات (FAO)",
      b3_val: "28% توفير وسطي",
      b3_desc: "تؤكد أبحاث منظمة الفاو (FAO) أن ربط السقي بحساسات رطوبة التربة وتدفق المياه ومعادلة البخر-نتح يقلص الضخ بنسبة 25% إلى 40%.",
      b4_tag: "استرداد رأس المال",
      b4_val: "< 6 أشهر",
      b4_desc: "فترة استرداد تكلفة صندوق الترقية المتوقعة بفضل التوفير المباشر في فواتير الكهرباء والمازوت وحماية مضخات الآبار.",
      // Quick Investor Pitch & Contact Strip on Home
      pitch_tag: "INVESTOR & CLIENT BRIEF • نبذة للمستثمرين والعملاء",
      pitch_title: "مشروع مبتكر جاهز للشراكة الصناعية والتطبيق الميداني الأول",
      pitch_desc: "نحن في مرحلة ما قبل التسويق التجاري بعد إتمام بناء النموذج الأولي المخبري والميكانيكي والحصول على وسم لابل (Label Projet Innovant). نرحب بالمستثمرين، مصنعي المحاور، والفلاحين الكبار لبناء أول خط إنتاج وتجريب حقلي موسع في الجنوب الجزائري.",
      // Footer
      footer_sub: "مؤسسة ناشئة حاصلة على وسم لابل (Label Projet Innovant) • حاضنة جامعة ورقلة، الجزائر",
      footer_desc: "منظومة هندسية جزائرية لترقية محاور الرش الفلاحية إلى محاور ذكية تعمل بالطاقة الشمسية، حساسات التدفق والتربة، وشبكات LoRaWAN بعيدة المدى.",
      footer_col1: "المحاور الأربعة",
      footer_col2: "الصفحات التفصيلية",
      footer_col3: "التواصل المباشر (ورقلة)"
    },
    fr: {
      dir: "ltr",
      lang: "fr",
      topbar_badge: "★ Startup Labellisée (Label Projet Innovant — Algérie)",
      topbar_desc: "Plateforme vitrine pour investisseurs, agriculteurs & partenaires OEM • Incubateur Univ. Ouargla",
      topbar_cert_link: "Accréditation & Profil →",
      brand_subtitle: "Irrigation par Pivot Solaire & IoT pour le Sahara Algérien",
      menu_btn: "☰ Menu",
      nav_home: "Accueil & Vision",
      nav_tech: "Technologie & Capteurs",
      nav_hub: "Hub Interactif & Prototype",
      nav_contact: "Partenariats & Contact",
      subhub_explore_label: "🧭 Accès rapide aux 8 modules de la plateforme :",
      sub_index: "1. Vue d’ensemble",
      sub_tech: "2. Boîtier & 14 Composants",
      sub_sim: "3. Simulateur Digital Twin",
      sub_pilot: "4. Prototype Physique & CAO 3D",
      sub_calc: "5. Calculateur ROI (DZD)",
      sub_part: "6. Partenariats OEM & Équipe",
      sub_about: "7. Label & Fondateur",
      sub_contact: "8. Contact & Audit Terrain",
      mob_home: "Accueil",
      mob_tech: "Matériel",
      mob_hub: "Simulateur",
      mob_contact: "Contact",
      hero_step: "Vitrine Investisseurs & Clients • Ouargla • El Oued • Biskra • El Meniaa",
      hero_title: "Donnez aux pivots sahariens un <strong>cerveau industriel intelligent</strong> économisant <strong>35% d’eau et d’énergie</strong>",
      hero_sub: "Le projet labellisé <strong>Smart Desert Pivot (SDP)</strong> propose un kit de mise à niveau (Retrofit) solaire et IoT (LoRaWAN, débitmètre, sondes sol) pour automatiser les pivots existants selon l’évapotranspiration ($ET_0$). Découvrez notre concept, nos statistiques et notre prototype.",
      hero_btn_sim: "▶ Tester le Simulateur & Voir le Prototype",
      hero_btn_calc: "Calculer la rentabilité (DZD)",
      hero_btn_contact: "Investir ou Devenir Partenaire",
      kpi1_val: "25%–40%",
      kpi1_lbl: "Réduction du pompage d’eau souterraine selon les normes FAO d’irrigation de précision",
      kpi2_val: "5.0 km",
      kpi2_lbl: "Portée radio LoRaWAN sans besoin de Wi-Fi ni de fibre optique au champ",
      kpi3_val: "IP67",
      kpi3_lbl: "Protection industrielle contre les tempêtes de sable et jusqu’à 60°C",
      live_badge: "● Télémétrie en direct du Pivot Pilote #01 — Ouargla",
      live_m_lbl: "Humidité Sol (VWC)",
      live_t_lbl: "Température Champ",
      live_ec_lbl: "Salinité (EC)",
      live_ang_lbl: "Angle du Pivot",
      portal_tag: "FOUR-DIAMOND EXPLORATION HUB • PORTAIL D’EXPLORATION EN 4 PILIERS",
      portal_title: "Que souhaitez-vous explorer dans Smart Desert Pivot ?",
      portal_sub: "Notre plateforme est structurée en 4 espaces clairs. Cliquez sur le module de votre choix pour accéder au prototype réel, au simulateur ou aux données financières :",
      d1_badge: "Pilier 01 • Jumeau Numérique Interactif",
      d1_title: "Simulateur Temps Réel & Calculateur ROI",
      d1_desc: "Testez la prise de décision IA sous 6 scénarios climatiques sahariens et calculez vos économies annuelles en Dinars et Centimes.",
      d1_btn1: "Ouvrir le Simulateur Interactif →",
      d1_btn2: "Calculateur ROI",
      d2_badge: "Pilier 02 • Prototype Physique Réel",
      d2_title: "Maquette Mécanique en Aluminium & CAO 3D",
      d2_desc: "Découvrez les photos réelles et dimensions exactes (420mm × 250mm × 150mm) de notre prototype motorisé et l’architecture IoT.",
      d2_btn1: "Voir le Prototype Physique & CAO 3D →",
      d3_badge: "Pilier 03 • Matériel & Capteurs Réels",
      d3_title: "Boîtier SDP Retrofit & Galerie des 14 Composants",
      d3_desc: "Inspectez nos composants : capteur de débit d’eau (YF-S201C 1-30L/min), panneau solaire, sondes d’humidité et anémomètre.",
      d3_btn1: "Explorer le Matériel & Capteurs →",
      d4_badge: "Pilier 04 • Investissement & Partenariats",
      d4_title: "Partenariats Fabricants OEM, Label & Contact",
      d4_desc: "Consultez notre Label Projet Innovant, nos offres pour fabricants de pivots et contactez le fondateur Ing. Lecheheb Djaafar.",
      d4_btn1: "Portail Partenariats & Équipe →",
      d4_btn2: "Contact Direct",
      bench_tag: "REAL-WORLD BENCHMARKS • INDICATEURS & MARCHÉ ALGÉRIEN",
      bench_title: "Pourquoi l’automatisation des pivots est stratégique au Sud Algérien ?",
      bench_sub: "L’agriculture saharienne repose sur les nappes profondes. Les données FAO et ODAS démontrent l’impact immédiat de notre technologie :",
      b1_tag: "Programme National ODAS",
      b1_val: "+450 000 ha",
      b1_desc: "Périmètres agricoles dédiés aux cultures stratégiques (blé dur, maïs, fourrages) à Ouargla, El Meniaa, Adrar et Touggourt.",
      b2_tag: "Pertes par Évaporation",
      b2_val: "30% à 45%",
      b2_desc: "Eau perdue sur les pivots classiques fonctionnant à midi (>44°C) ou durant les vents de sable (>40 km/h) sans coupure automatique.",
      b3_tag: "Efficacité Capteurs (FAO)",
      b3_val: "28% d’économie",
      b3_desc: "Les études FAO confirment que le pilotage par sondes VWC, débitmètre et équation ET0 réduit le pompage de 25% à 40%.",
      b4_tag: "Retour sur Investissement",
      b4_val: "< 6 Mois",
      b4_desc: "Amortissement rapide du kit SDP grâce aux économies d’électricité/gasoil et à la protection des pompes immergées.",
      pitch_tag: "INVESTOR & CLIENT BRIEF • NOTE AUX INVESTISSEURS & CLIENTS",
      pitch_title: "Un projet labellisé prêt pour l’industrialisation et le déploiement pilote",
      pitch_desc: "Nous avons validé notre prototype fonctionnel et obtenu le Label Projet Innovant. Cette plateforme présente notre vision et nos résultats aux investisseurs, fabricants de pivots et grands exploitants agricoles en vue du déploiement terrain.",
      footer_sub: "Startup titulaire du Label Projet Innovant • Incubateur Univ. Ouargla, Algérie",
      footer_desc: "Solution algérienne de modernisation des pivots d’irrigation sahariens par énergie solaire, capteurs industriels et réseau LoRaWAN.",
      footer_col1: "Les 4 Piliers",
      footer_col2: "Modules Détaillés",
      footer_col3: "Contact Direct (Ouargla)"
    },
    en: {
      dir: "ltr",
      lang: "en",
      topbar_badge: "★ Accredited Startup (Label Projet Innovant — Algeria)",
      topbar_desc: "Investor, Client & OEM Partner Showcase Platform • Univ. of Ouargla Incubator, Algeria",
      topbar_cert_link: "Official Accreditation →",
      brand_subtitle: "Solar & IoT Smart Center-Pivot Irrigation for the Algerian Sahara",
      menu_btn: "☰ Menu",
      nav_home: "Overview",
      nav_tech: "Technology & Hardware",
      nav_hub: "Interactive & Prototype Hub",
      nav_contact: "Partnerships & Contact",
      subhub_explore_label: "🧭 Quick Switch Across All 8 Platform Modules:",
      sub_index: "1. Executive Overview",
      sub_tech: "2. Hardware & 14 Sensors",
      sub_sim: "3. Live Digital Twin Simulator",
      sub_pilot: "4. Physical Prototype & 3D CAD",
      sub_calc: "5. Farm ROI Calculator (DZD)",
      sub_part: "6. OEM Partnerships & Team",
      sub_about: "7. Startup Label & Founder",
      sub_contact: "8. Contact & Field Audit",
      mob_home: "Home",
      mob_tech: "Hardware",
      mob_hub: "Prototype Hub",
      mob_contact: "Contact",
      hero_step: "Investor & Client Showcase • Ouargla • El Oued • Biskra • El Meniaa",
      hero_title: "Empowering Saharan Irrigation Pivots with a <strong>Smart Industrial Brain</strong> Saving <strong>35% Water & Energy</strong>",
      hero_sub: "<strong>Smart Desert Pivot (SDP)</strong> is an accredited Label Projet Innovant startup offering a solar-powered IoT Retrofit Kit (LoRaWAN, water flow sensor, soil probes) to automate center-pivot irrigation using real-time evapotranspiration ($ET_0$). Explore our vision, metrics, and working prototype.",
      hero_btn_sim: "▶ Launch Interactive & Physical Prototype Hub",
      hero_btn_calc: "Calculate Farm ROI (DZD)",
      hero_btn_contact: "Invest or Partner With Us",
      kpi1_val: "25%–40%",
      kpi1_lbl: "Groundwater pumping reduction validated by FAO precision irrigation benchmarks",
      kpi2_val: "5.0 km",
      kpi2_lbl: "LoRaWAN wireless telemetry range with zero need for field Wi-Fi or fiber",
      kpi3_val: "IP67",
      kpi3_lbl: "Industrial enclosure rated against sandstorms and desert heat up to 60°C",
      live_badge: "● Live Telemetry Stream — Pilot Pivot #01 (Ouargla)",
      live_m_lbl: "Soil Moisture (VWC)",
      live_t_lbl: "Field Temp",
      live_ec_lbl: "Root Salinity (EC)",
      live_ang_lbl: "Pivot Arm Angle",
      portal_tag: "FOUR-DIAMOND EXPLORATION HUB • STREAMLINED 4-PILLAR SHOWCASE",
      portal_title: "What Would You Like to Explore in Smart Desert Pivot?",
      portal_sub: "We structured our platform into 4 executive portals so investors, farmers, and partners can jump directly to the interactive twin, real hardware prototype, or financial model:",
      d1_badge: "Pillar 01 • Interactive Digital Twin",
      d1_title: "Live Pivot Simulator & Farm ROI Calculator",
      d1_desc: "Test our AI irrigation controller across 6 Saharan weather scenarios and compute annual savings in Algerian Dinars and Centimes.",
      d1_btn1: "Launch Interactive Simulator →",
      d1_btn2: "Open ROI Calculator",
      d2_badge: "Pillar 02 • Physical Hardware Prototype",
      d2_title: "Real Aluminum Scale Prototype & 3D CAD Engineering",
      d2_desc: "Inspect real lab photographs and exact mechanical dimensions (420mm × 250mm × 150mm) of our motorized pivot truss and IoT diagram.",
      d2_btn1: "View Physical Prototype & 3D CAD →",
      d3_badge: "Pillar 03 • Industrial Retrofit & Sensors",
      d3_title: "SDP Retrofit Box & 14 Real Hardware Components",
      d3_desc: "Explore our hardware stack including the YF-S201C (1-30L/min) water flow sensor, solar power module, soil probes, and wind safety interlocks.",
      d3_btn1: "Explore Hardware & 14 Sensors →",
      d4_badge: "Pillar 04 • Investment & OEM Alliances",
      d4_title: "Pivot Manufacturer Partnerships, Label & Direct Contact",
      d4_desc: "Review our official Label Projet Innovant status, OEM revenue-sharing model, and connect directly with founder Eng. Lecheheb Djaafar.",
      d4_btn1: "OEM Partnerships & Team →",
      d4_btn2: "Direct Contact",
      bench_tag: "REAL-WORLD BENCHMARKS • MARKET & AGRONOMIC DATA",
      bench_title: "Why Smart Center-Pivot Automation is Crucial for Algeria & Arid Regions",
      bench_sub: "Saharan strategic farming relies on deep aquifers. International FAO studies and national ODAS programs highlight the scale of impact:",
      b1_tag: "National ODAS Program",
      b1_val: "+450,000 ha",
      b1_desc: "Strategic agricultural land allocated for wheat, corn, and oilseeds in southern Algeria relying on center-pivot irrigation.",
      b2_tag: "Evaporation & Wind Loss",
      b2_val: "30% to 45%",
      b2_desc: "Water lost in unautomated pivots operating during extreme midday heat (>44°C) or sandstorms (>40 km/h) without smart cut-offs.",
      b3_tag: "Sensor Efficiency (FAO)",
      b3_val: "28% Avg. Saving",
      b3_desc: "FAO research confirms that coupling VWC soil probes, flow meters, and ET0 scheduling cuts pumping volume by 25% to 40%.",
      b4_tag: "Capital Payback",
      b4_val: "< 6 Months",
      b4_desc: "Projected payback period for the SDP Retrofit Kit driven by direct electricity/diesel savings and deep-well pump protection.",
      pitch_tag: "INVESTOR & CLIENT BRIEF • PRE-COMMERCIAL SHOWCASE",
      pitch_title: "An Accredited Innovative Venture Ready for Field Piloting & Seed Investment",
      pitch_desc: "Having completed our functional mechanical and electronic prototype and earned the ministerial Label Projet Innovant, we present this platform to investors, OEM pivot manufacturers, and agricultural clients to launch our first commercial field deployments.",
      footer_sub: "Accredited Label Projet Innovant Startup • Univ. of Ouargla Incubator, Algeria",
      footer_desc: "Algerian engineering system upgrading conventional center-pivot irrigation into solar-powered, LoRaWAN-connected smart pivots.",
      footer_col1: "4 Main Pillars",
      footer_col2: "Detailed Modules",
      footer_col3: "Direct Contact (Ouargla)"
    }
  };

  window.getCurrentSdpLang = function () {
    try {
      return localStorage.getItem("sdp_lang") || "ar";
    } catch (e) {
      return window._sdpFallbackLang || "ar";
    }
  };

  window.applySdpLanguage = function (lang) {
    if (!window.SDP_TRANSLATIONS[lang]) lang = "ar";
    window._sdpFallbackLang = lang;
    try {
      localStorage.setItem("sdp_lang", lang);
    } catch (e) {}

    var dict = window.SDP_TRANSLATIONS[lang];
    document.documentElement.setAttribute("lang", dict.lang);
    document.documentElement.setAttribute("dir", dict.dir);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Also support per-element inline trilingual attributes data-ar / data-fr / data-en
    document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.setAttribute("placeholder", val);
        } else {
          el.innerHTML = val;
        }
      }
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-switch") === lang);
    });
    if (typeof window.refreshSdpSimulatorLang === "function") {
      window.refreshSdpSimulatorLang();
    }
    if (typeof window.refreshSdpCalculatorLang === "function") {
      window.refreshSdpCalculatorLang();
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    // Bind language buttons
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var l = btn.getAttribute("data-lang-switch");
        window.applySdpLanguage(l);
        var msg = l === "ar" ? "تم التبديل إلى اللغة العربية" : (l === "fr" ? "Langue changée en Français" : "Language switched to English");
        if (window.showSdpToast) window.showSdpToast("🌐 Language / اللغة", msg);
      });
    });
    // Automatic Device & Viewport Adaptation (Mobile / Tablet / Desktop)
    function syncResponsiveDeviceState() {
      var isMobileViewport = window.matchMedia("(max-width: 768px)").matches;
      document.body.classList.toggle("is-mobile-device", isMobileViewport);
      if (!isMobileViewport) {
        document.querySelectorAll(".nav-links-list.mobile-open").forEach(function (nl) {
          nl.classList.remove("mobile-open");
        });
      }
    }
    syncResponsiveDeviceState();
    window.addEventListener("resize", syncResponsiveDeviceState);

    // Apply initial language
    window.applySdpLanguage(window.getCurrentSdpLang());
  });
})();
