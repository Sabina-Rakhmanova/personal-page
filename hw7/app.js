/**
 * MercyMed Bishkek Clinic — Frontend Logic
 * Fixes:
 *   1. Date of Birth auto-formatting (DD.MM.YYYY)
 *   2. Smooth scroll navigation (single-page scroll)
 *   3. Working EN / RU / KY language switcher
 *   4. Team filters
 *   5. Appointment modal + dispatch preview
 *   6. Organisation intake form
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrollNav();
  initActiveSectionObserver();
  initLanguageSwitcher();
  initTeamFilters();
  initDobFormatter();
  initModalBackdropClose();
});

/* ========================================================
   1. SMOOTH SCROLL NAVIGATION
   ======================================================== */
function initSmoothScrollNav() {
  const links = document.querySelectorAll('.nav-link, a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (link.classList.contains('nav-link')) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

/* Highlight nav link of the section currently in view */
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ========================================================
   2. LANGUAGE SWITCHER (EN / RU / KY)
   ======================================================== */
const TRANSLATIONS = {
  en: {
    "banner.status": "Institutional Desk Bishkek • Accredited Clinical Training Center & Occupational Health",
    "banner.proto": "Prototype Notice • Demonstration Environment",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.team": "Team",
    "nav.orgs": "For Organisations",
    "nav.book": "Request Appointment",

    "hero.draft": "[Draft awaiting client confirmation]",
    "hero.title": "Evidence-based care for the whole family, in one place.",
    "hero.desc": "A private outpatient family medical centre in Bishkek providing international standard healthcare with compassion.",
    "hero.cta1": "Request an appointment",
    "hero.cta2": "Discover MercyMed ↓",
    "hero.pill1t": "WHO & MoH Protocols",
    "hero.pill1s": "Zero polypharmacy practice",
    "hero.pill2t": "Tunguch Facility",
    "hero.pill2s": "Daily 08:00 – 20:00 (Mon–Sat)",
    "hero.photo": "[Photo awaiting client - Bishkek Clinic Exterior / Reception]",

    "pillars.sub": "Standard of Excellence",
    "pillars.title": "Core Pillars of MercyMed Bishkek",
    "pillars.desc": "Providing Kyrgyz families with trustworthy, transparent diagnostic and consultative care since inception.",
    "pillar1.t": "Evidence-based & International Medicine",
    "pillar1.d": "Strictly fewer unnecessary tests and zero polypharmacy. Every treatment regimen adheres strictly to global scientific clinical guidelines.",
    "pillar1.tag": "Rational Prescribing",
    "pillar2.t": "International & Local Specialists",
    "pillar2.d": "Consultations available in Kyrgyz, Russian, English, German, French, and Chinese for multi-cultural residents and diplomatic personnel.",
    "pillar2.tag": "6 Languages Spoken",
    "pillar3.t": "Care for the Whole Family",
    "pillar3.d": "Complete pediatric health checks, adult internal medicine, gynecology, women's wellness, and high-resolution ultrasound diagnostics.",
    "pillar3.tag": "All Ages Covered",
    "pillar4.t": "Charitable Mobile Clinics",
    "pillar4.d": "10+ continuous years of outreach across remote Kyrgyzstan oblasts, delivering medical care, screenings, and humanitarian relief.",
    "pillar4.tag": "10+ Years Outreach",

    "scope.sub": "Facility Capabilities",
    "scope.title": "Outpatient Clinical Services",
    "scope.desc": "MercyMed is designed for comprehensive day visits and preventive screenings with minimal wait times.",
    "scope.alertT": "Strictly Outpatient Healthcare:",
    "scope.alertB": "We specialize exclusively in outpatient visits, regular check-ups, and same-day recovery procedures. We do not provide overnight hospital admissions or 24-hour surgical wards.",
    "scope.spec1": "🩺 Specialist Consultations",
    "scope.spec2": "📡 High-Res Ultrasound (USG)",
    "scope.spec3": "🛏 Quiet Day Infusion Room",
    "scope.spec4": "🩹 Minor Medical Procedures",

    "loc.sub": "[Approximate location awaiting exact geocode]",
    "loc.title": "Visiting Our Clinic",
    "loc.desc": "Located conveniently in the Tunguch microdistrict near Ayu Grand shopping complex, with quiet patient drop-off access and wheelchair ramps.",

    "promo.badge": "Official Clinical Partnership",
    "promo.desc": "All registered MercyMed Bishkek patients receive an exclusive 30% discount on over 400 specialized blood, biochemistry, and hormone diagnostic panels.",
    "promo.cta": "View Diagnostic Panels",

    "svc.sub": "Clinical Care Index • Bishkek",
    "svc.title": "Medical Services & Consultations",
    "svc.desc": "Outpatient clinical services in Bishkek based on evidence-based medicine and international clinical guidelines.",
    "svc2.sub": "Primary & Subspecialty Care",
    "svc2.title": "Consultation Specialties",
    "svc2.desc": "Every appointment provides thorough physical examinations, digital prescription documentation, and detailed patient debriefings.",

    "sc1.badge": "Infants & Youth", "sc1.t": "Pediatrics",
    "sc1.d": "Holistic infant examinations, routine developmental milestones, early vaccination guidance, acute febrile illnesses, and gentle pediatric symptom management.",
    "sc2.badge": "All Age Groups", "sc2.t": "Family Medicine",
    "sc2.d": "Continuous, multi-generational medical care covering childhood through adulthood and geriatric health.",
    "sc3.badge": "Adult Chronic & Resp", "sc3.t": "Internal Medicine & Pulmonology",
    "sc3.d": "Advanced diagnostic investigations for persistent cough, asthma, bronchitis, post-infectious lung complications, and hypertension.",
    "sc4.badge": "Specialist Oversight", "sc4.t": "Pediatric Critical Care & Oncology",
    "sc4.d": "Secondary clinical consultations, post-inpatient monitoring, complex case navigation, and expert second opinions.",
    "sc5.badge": "Women's Health", "sc5.t": "Gynecology & Women's Health",
    "sc5.d": "Empathetic, confidential gynecological consultations, routine pap screenings, prenatal monitoring, and hormonal regulation.",
    "sc6.badge": "Rehabilitation", "sc6.t": "Physical Therapy & Rehab",
    "sc6.d": "Functional restoration, orthopedic post-surgery rehabilitation, posture correction, and targeted pain relief.",

    "prev.sub": "Early Detection & Diagnostics",
    "prev.title": "Preventive Check-ups & Screenings",

    "team.sub": "Bishkek Clinical Faculty",
    "team.title": "Our Medical Team & Clinical Faculty",
    "team.desc": "Experienced local and international doctors dedicated to holistic, evidence-based care in Bishkek.",

    "filter.all": "All Members (10)",
    "filter.peds": "Pediatrics (4)",
    "filter.adult": "Adult & Family Care (4)",
    "filter.diag": "Diagnostics & Support (2)",

    "org.sub": "B2B & Academic Cooperation Desk",
    "org.title": "Healthcare Partnerships for Organisations",
    "org.desc": "Corporate annual check-ups, educational partnerships for medical students, and dedicated staff health programs.",
    "trackA.t": "Corporate & Institutional Health",
    "trackA.d": "Structured occupational medicine conforming to both Kyrgyz labor sanitary mandates and rigorous international standards.",
    "trackB.t": "Medical Education & Training",
    "trackB.d": "Cultivating the next generation of healthcare leaders in Central Asia through evidence-based mentorship and clinical electives.",
    "org2.sub": "Direct Response Commitment",
    "org2.title": "Initiate Institutional Cooperation",
    "org2.desc": "Submit your initial requirements to connect directly with our Head of Medical Partnerships.",

    "f.org": "Organization / Entity Name *",
    "f.person": "Contact Person Name & Title *",
    "f.email": "Official Email *",
    "f.phone": "Phone / WhatsApp *",
    "f.submit": "Submit Partnership Intake",

    "footer.tag": "Compassionate, international-standard healthcare serving multi-generational families and organisations across Kyrgyzstan.",
    "footer.loc": "Facility Location",
    "footer.nav": "Quick Navigation",
    "footer.lang": "Languages & Notice",
    "footer.legal": "Licensed by the Ministry of Health of the Kyrgyz Republic. All consultations conform to evidence-based protocols.",

    "modal.sub": "Direct Patient Intake",
    "modal.title": "Request an Appointment",
    "app.name": "Surname and Name *",
    "app.dob": "Date of Birth *",
    "app.phone": "Phone Number *",
    "app.doctor": "Preferred Doctor / Consultation Type",
    "app.lang": "Preferred Language of Consultation",
    "app.submit": "Preview Appointment Request"
  },

  ru: {
    "banner.status": "Институциональный отдел Бишкек • Аккредитованный клинический учебный центр и охрана труда",
    "banner.proto": "Прототип • Демонстрационная среда",
    "nav.home": "Главная",
    "nav.services": "Услуги",
    "nav.team": "Команда",
    "nav.orgs": "Для организаций",
    "nav.book": "Записаться",

    "hero.draft": "[Черновик — ожидает подтверждения]",
    "hero.title": "Медицина, основанная на доказательствах, для всей семьи — в одном месте.",
    "hero.desc": "Частный амбулаторный семейный медицинский центр в Бишкеке, предоставляющий помощь международного уровня с заботой.",
    "hero.cta1": "Записаться на приём",
    "hero.cta2": "Узнать о MercyMed ↓",
    "hero.pill1t": "Протоколы ВОЗ и МЗ",
    "hero.pill1s": "Без полипрагмазии",
    "hero.pill2t": "Филиал Тунгуч",
    "hero.pill2s": "Ежедневно 08:00 – 20:00 (Пн–Сб)",
    "hero.photo": "[Фото ожидается — фасад / ресепшн клиники в Бишкеке]",

    "pillars.sub": "Стандарт превосходства",
    "pillars.title": "Ключевые принципы MercyMed Бишкек",
    "pillars.desc": "Проверенная, прозрачная диагностическая и консультативная помощь кыргызстанским семьям.",
    "pillar1.t": "Доказательная и международная медицина",
    "pillar1.d": "Меньше лишних обследований и никакой полипрагмазии. Каждый план лечения соответствует мировым клиническим рекомендациям.",
    "pillar1.tag": "Рациональное назначение",
    "pillar2.t": "Международные и местные специалисты",
    "pillar2.d": "Консультации на кыргызском, русском, английском, немецком, французском и китайском языках.",
    "pillar2.tag": "6 языков",
    "pillar3.t": "Забота для всей семьи",
    "pillar3.d": "Полные педиатрические осмотры, взрослая терапия, гинекология, женское здоровье и УЗИ высокого разрешения.",
    "pillar3.tag": "Все возрасты",
    "pillar4.t": "Благотворительные мобильные клиники",
    "pillar4.d": "Более 10 лет выездной помощи в отдалённых областях Кыргызстана.",
    "pillar4.tag": "10+ лет помощи",

    "scope.sub": "Возможности клиники",
    "scope.title": "Амбулаторные услуги",
    "scope.desc": "MercyMed рассчитан на комплексные дневные визиты и профилактические скрининги.",
    "scope.alertT": "Только амбулаторная помощь:",
    "scope.alertB": "Мы специализируемся исключительно на амбулаторных приёмах и процедурах дневного стационара. Мы не предоставляем круглосуточные стационары и хирургические отделения.",
    "scope.spec1": "🩺 Консультации специалистов",
    "scope.spec2": "📡 УЗИ высокого разрешения",
    "scope.spec3": "🛏 Тихая палата дневного стационара",
    "scope.spec4": "🩹 Малые процедуры",

    "loc.sub": "[Приблизительное расположение — ожидается геокод]",
    "loc.title": "Как нас найти",
    "loc.desc": "Удобно в микрорайоне Тунгуч рядом с ТЦ Ayu Grand, с тихим подъездом для пациентов и пандусами.",
    "promo.badge": "Официальное партнёрство",
    "promo.desc": "Все пациенты MercyMed получают скидку 30% на более чем 400 видов анализов в лаборатории Express Plus.",
    "promo.cta": "Смотреть панели анализов",

    "svc.sub": "Клинический каталог • Бишкек",
    "svc.title": "Медицинские услуги и консультации",
    "svc.desc": "Амбулаторные услуги в Бишкеке на основе доказательной медицины и международных протоколов.",
    "svc2.sub": "Первичная и специализированная помощь",
    "svc2.title": "Специальности консультаций",
    "svc2.desc": "Каждый приём включает осмотр, цифровые назначения и подробный разбор для пациента.",

    "sc1.badge": "Младенцы и дети", "sc1.t": "Педиатрия",
    "sc1.d": "Полные осмотры младенцев, контроль развития, вакцинация, острые лихорадочные состояния.",
    "sc2.badge": "Все возрасты", "sc2.t": "Семейная медицина",
    "sc2.d": "Непрерывная помощь для всей семьи — от детства до пожилого возраста.",
    "sc3.badge": "Взрослые, лёгкие", "sc3.t": "Терапия и пульмонология",
    "sc3.d": "Диагностика кашля, астмы, бронхита, последствий инфекций и гипертонии.",
    "sc4.badge": "Спец. наблюдение", "sc4.t": "Педиатрическая реанимация и онкология",
    "sc4.d": "Вторичные консультации, наблюдение после стационара, второе мнение.",
    "sc5.badge": "Женское здоровье", "sc5.t": "Гинекология",
    "sc5.d": "Деликатные гинекологические консультации, скрининги, ведение беременности.",
    "sc6.badge": "Реабилитация", "sc6.t": "Физиотерапия и реабилитация",
    "sc6.d": "Восстановление функций, реабилитация после операций, коррекция осанки.",

    "prev.sub": "Ранняя диагностика",
    "prev.title": "Профилактические осмотры и скрининги",

    "team.sub": "Клинический факультет Бишкека",
    "team.title": "Наша медицинская команда",
    "team.desc": "Опытные местные и международные врачи, преданные комплексной помощи в Бишкеке.",

    "filter.all": "Все (10)",
    "filter.peds": "Педиатрия (4)",
    "filter.adult": "Взрослые и семья (4)",
    "filter.diag": "Диагностика (2)",

    "org.sub": "Отдел B2B и академического сотрудничества",
    "org.title": "Партнёрство для организаций",
    "org.desc": "Корпоративные осмотры, обучение студентов-медиков и программы здоровья сотрудников.",
    "trackA.t": "Корпоративное здоровье",
    "trackA.d": "Профмедицина в соответствии с нормами КР и международными стандартами.",
    "trackB.t": "Медицинское образование",
    "trackB.d": "Подготовка нового поколения врачей Центральной Азии через наставничество.",
    "org2.sub": "Прямой ответ",
    "org2.title": "Начать сотрудничество",
    "org2.desc": "Отправьте заявку — мы свяжемся в течение 24 часов.",

    "f.org": "Организация *",
    "f.person": "Контактное лицо и должность *",
    "f.email": "Официальный email *",
    "f.phone": "Телефон / WhatsApp *",
    "f.submit": "Отправить заявку",

    "footer.tag": "Заботливая медицина международного уровня для семей и организаций Кыргызстана.",
    "footer.loc": "Расположение",
    "footer.nav": "Навигация",
    "footer.lang": "Языки и уведомление",
    "footer.legal": "Лицензировано Министерством здравоохранения КР. Все консультации соответствуют протоколам доказательной медицины.",

    "modal.sub": "Прямая запись пациента",
    "modal.title": "Запись на приём",
    "app.name": "Фамилия и имя *",
    "app.dob": "Дата рождения *",
    "app.phone": "Телефон *",
    "app.doctor": "Врач / тип консультации",
    "app.lang": "Язык консультации",
    "app.submit": "Показать заявку"
  },

  ky: {
    "banner.status": "Бишкек институционалдык бөлүмү • Аккредитацияланган клиникалык окуу борбору жана эмгекти коргоо",
    "banner.proto": "Прототип • Демонстрациялык чөйрө",
    "nav.home": "Башкы бет",
    "nav.services": "Кызматтар",
    "nav.team": "Команда",
    "nav.orgs": "Уюмдар үчүн",
    "nav.book": "Жазылуу",

    "hero.draft": "[Долбоор — кардардын ырастоосун күтүүдө]",
    "hero.title": "Бүт үй-бүлө үчүн далилдүү медицина — бир жерде.",
    "hero.desc": "Бишкектеги жеке амбулатордук үй-бүлөлүк медициналык борбор, эл аралык стандартта кам көрүү менен.",
    "hero.cta1": "Жазылууга арыз",
    "hero.cta2": "MercyMed менен тааныш ↓",
    "hero.pill1t": "ДСУ жана СМ протоколдору",
    "hero.pill1s": "Полипрагмазия жок",
    "hero.pill2t": "Түнгүч филиалы",
    "hero.pill2s": "Күн сайын 08:00 – 20:00 (Дүй–Ишм)",
    "hero.photo": "[Сүрөт күтүлүүдө — Бишкек клиникасынын фасады]",

    "pillars.sub": "Мыктылык стандарты",
    "pillars.title": "MercyMed Бишкектин негизги принциптери",
    "pillars.desc": "Кыргыз үй-бүлөлөрүнө ишенимдүү жана ачык диагностикалык кам көрүү.",
    "pillar1.t": "Далилдүү жана эл аралык медицина",
    "pillar1.d": "Ашыкча текшерүүлөрсүз жана полипрагмазиясыз. Ар бир дарылоо дүйнөлүк клиникалык көрсөтмөлөргө шайкеш.",
    "pillar1.tag": "Рационалдуу дарылоо",
    "pillar2.t": "Эл аралык жана жергиликтүү адистер",
    "pillar2.d": "Кыргыз, орус, англис, немис, француз жана кытай тилдеринде консультациялар.",
    "pillar2.tag": "6 тил",
    "pillar3.t": "Бүт үй-бүлө үчүн кам көрүү",
    "pillar3.d": "Балдар текшерүүлөрү, чоңдор терапиясы, гинекология, аялдар ден соолугу жана УЗИ.",
    "pillar3.tag": "Бардык жаштар",
    "pillar4.t": "Кайрымдуу мобилдик клиникалар",
    "pillar4.d": "Кыргызстандын алыскы облустарында 10+ жыл үзгүлтүксүз медициналык жардам.",
    "pillar4.tag": "10+ жыл",

    "scope.sub": "Клиниканын мүмкүнчүлүктөрү",
    "scope.title": "Амбулатордук кызматтар",
    "scope.desc": "MercyMed күнүмдүк визиттер жана профилактикалык скринингдер үчүн.",
    "scope.alertT": "Тек гана амбулатордук жардам:",
    "scope.alertB": "Биз тек гана амбулатордук кабыл алууларды жана күндүзгү стационардык процедураларды көрсөтөбүз. Түнү бою оорукана же хирургиялык бөлүмдөрдү сунуштабайбыз.",
    "scope.spec1": "🩺 Адис консультациялары",
    "scope.spec2": "📡 Жогорку чечимдүү УЗИ",
    "scope.spec3": "🛏 Тынч күндүзгү палата",
    "scope.spec4": "🩹 Чакан процедуралар",

    "loc.sub": "[Болжолдуу жайгашуу — так геокод күтүлүүдө]",
    "loc.title": "Бизди кантип табуу керек",
    "loc.desc": "Түнгүч микрорайонунда Ayu Grand соода борборунун жанында, пандустар жана ыңгайлуу кирүү менен.",
    "promo.badge": "Расмий клиникалык өнөктөштүк",
    "promo.desc": "Бардык MercyMed бейтаптары Express Plus лабораториясында 400+ анализге 30% арзандатуу алышат.",
    "promo.cta": "Анализдерди көрүү",

    "svc.sub": "Клиникалык каталог • Бишкек",
    "svc.title": "Медициналык кызматтар жана консультациялар",
    "svc.desc": "Бишкектеги амбулатордук кызматтар далилдүү медицина жана эл аралык протоколдорго негизделген.",
    "svc2.sub": "Баштапкы жана адистештирилген жардам",
    "svc2.title": "Консультация адистиктери",
    "svc2.desc": "Ар бир кабыл алуу толук текшерүүнү, санариптик рецепттерди жана пациент үчүн түшүндүрмөнү камтыйт.",

    "sc1.badge": "Ымыркайлар жана балдар", "sc1.t": "Педиатрия",
    "sc1.d": "Ымыркайларды толук текшерүү, өнүгүү мониторинги, эмдөө, курч оорулар.",
    "sc2.badge": "Бардык жаштар", "sc2.t": "Үй-бүлөлүк медицина",
    "sc2.d": "Балдардан улгайгандарга чейин үзгүлтүксүз кам көрүү.",
    "sc3.badge": "Чоңдор, дем", "sc3.t": "Терапия жана пульмонология",
    "sc3.d": "Жөтөл, астма, бронхит, гипертония боюнча диагностика.",
    "sc4.badge": "Адис көзөмөлү", "sc4.t": "Балдар реанимациясы жана онкология",
    "sc4.d": "Экинчи консультациялар, стационардан кийинки көзөмөл, экинчи пикир.",
    "sc5.badge": "Аялдар ден соолугу", "sc5.t": "Гинекология",
    "sc5.d": "Аялдардын ден соолугу боюнча консультациялар, скринингдер, кош бойлуулукту көзөмөлдөө.",
    "sc6.badge": "Реабилитация", "sc6.t": "Физиотерапия жана реабилитация",
    "sc6.d": "Функционалдык калыбына келтирүү, операциядан кийинки реабилитация, турушту коррекциялоо.",

    "prev.sub": "Эрте диагностика",
    "prev.title": "Профилактикалык текшерүүлөр жана скринингдер",

    "team.sub": "Бишкек клиникалык факультети",
    "team.title": "Биздин медициналык команда",
    "team.desc": "Бишкекте комплекстүү, далилдүү кам көрүүгө берилген тажрыйбалуу жергиликтүү жана эл аралык дарыгерлер.",

    "filter.all": "Баары (10)",
    "filter.peds": "Педиатрия (4)",
    "filter.adult": "Чоңдор жана үй-бүлө (4)",
    "filter.diag": "Диагностика (2)",

    "org.sub": "B2B жана академиялык кызматташуу бөлүмү",
    "org.title": "Уюмдар үчүн өнөктөштүк",
    "org.desc": "Корпоративдик текшерүүлөр, медицина студенттери үчүн окутуу жана кызматкерлердин ден соолук программалары.",
    "trackA.t": "Корпоративдик ден соолук",
    "trackA.d": "КР нормаларына жана эл аралык стандарттарга шайкеш кесиптик медицина.",
    "trackB.t": "Медициналык билим берүү",
    "trackB.d": "Борбордук Азиядагы жаңы муундагы дарыгерлерди даярдоо.",
    "org2.sub": "Түз жооп",
    "org2.title": "Кызматташууну баштоо",
    "org2.desc": "Арызды жөнөтүңүз — 24 сааттын ичинде байланышабыз.",

    "f.org": "Уюм *",
    "f.person": "Байланыш адамы жана кызматы *",
    "f.email": "Расмий email *",
    "f.phone": "Телефон / WhatsApp *",
    "f.submit": "Арызды жөнөтүү",

    "footer.tag": "Кыргызстандын үй-бүлөлөрү жана уюмдары үчүн эл аралык стандарттагы кам көрүү.",
    "footer.loc": "Жайгашуу",
    "footer.nav": "Навигация",
    "footer.lang": "Тилдер жана эскертүү",
    "footer.legal": "КР Саламаттык сактоо министрлиги тарабынан лицензияланган. Бардык консультациялар далилдүү медицина протоколдоруна шайкеш.",

    "modal.sub": "Түз пациент каттоосу",
    "modal.title": "Жазылууга арыз",
    "app.name": "Фамилиясы жана аты *",
    "app.dob": "Туулган күнү *",
    "app.phone": "Телефон номери *",
    "app.doctor": "Дарыгер / консультация түрү",
    "app.lang": "Консультация тили",
    "app.submit": "Арызды көрүү"
  }
};

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLanguage(btn.dataset.lang);
    });
  });

  applyLanguage('en');
}

function applyLanguage(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = dict[key];
    if (value !== undefined) {
      el.textContent = value;
    }
  });
}

/* ========================================================
   3. TEAM DIRECTORY FILTERING
   ======================================================== */
function initTeamFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.doctor-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ========================================================
   4. DATE OF BIRTH AUTO-FORMATTER (DD.MM.YYYY)
   - Digits only
   - Auto dots after DD and MM
   - Caps day at 31, month at 12
   - Max 8 digits
   ======================================================== */
function initDobFormatter() {
  const dobInput = document.getElementById('app-dob');
  if (!dobInput) return;

  function formatDate(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);

    let day = digits.slice(0, 2);
    let month = digits.slice(2, 4);
    let year = digits.slice(4, 8);

    if (day.length === 2) {
      const d = Math.min(Math.max(parseInt(day, 10) || 1, 1), 31);
      day = String(d).padStart(2, '0');
    }
    if (month.length === 2) {
      const m = Math.min(Math.max(parseInt(month, 10) || 1, 1), 12);
      month = String(m).padStart(2, '0');
    }

    let out = day;
    if (digits.length >= 2) out += '.';
    out += month;
    if (digits.length >= 4) out += '.';
    out += year;
    return out;
  }

  dobInput.addEventListener('input', (e) => {
    e.target.value = formatDate(e.target.value);
  });

  dobInput.addEventListener('paste', (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    e.target.value = formatDate(pasted);
  });

  dobInput.addEventListener('keydown', (e) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  });
}

/* ========================================================
   5. APPOINTMENT MODAL
   ======================================================== */
function openAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function initModalBackdropClose() {
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('appointment-modal');
    if (!modal) return;
    if (e.target === modal) {
      closeAppointmentModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('appointment-modal');
      if (modal && !modal.classList.contains('hidden')) {
        closeAppointmentModal();
      }
    }
  });
}

function handleAppointmentSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('app-name').value.trim();
  const dob = document.getElementById('app-dob').value.trim();
  const phone = document.getElementById('app-phone').value.trim();
  const doctor = document.getElementById('app-doctor').value;
  const langElement = document.querySelector('input[name="app-lang"]:checked');
  const lang = langElement ? langElement.value : 'English';

  document.getElementById('wa-name').textContent = name;
  document.getElementById('wa-dob').textContent = dob;
  document.getElementById('wa-phone').textContent = phone;
  document.getElementById('wa-doctor').textContent = doctor;
  document.getElementById('wa-lang').textContent = lang;

  const preview = document.getElementById('dispatch-preview');
  if (preview) {
    preview.classList.remove('hidden');
    preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ========================================================
   6. INSTITUTIONAL COOPERATION INTAKE
   ======================================================== */
function handleOrgSubmit(event) {
  event.preventDefault();
  const successBox = document.getElementById('org-success');
  if (!successBox) return;
  successBox.classList.remove('hidden');
  event.target.reset();
  successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}