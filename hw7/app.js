/* ============================================================
   MercyMed Bishkek Clinic — Frontend Logic
   Aligned with Team 2 PRD (R0–R6) and Dr. Lukas's transcript.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrollNav();
  initActiveSectionObserver();
  initLanguageSwitcher();
  initTeamFilters();
  initDobFormatter();
  initModalBackdropClose();
  initMobileMenu();
});

/* ============================================================
   1. SMOOTH SCROLL NAVIGATION
   ============================================================ */
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

      // Close mobile menu when a link is tapped
      const nav = document.getElementById('main-nav');
      if (nav) nav.classList.remove('open');

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
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   2. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const nav = document.getElementById('main-nav');
    const toggle = document.querySelector('.menu-toggle');
    if (!nav || !toggle) return;
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !toggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
}

function toggleMobileMenu() {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('open');
}

/* ============================================================
   3. LANGUAGE SWITCHER (EN / RU / KY) — R0
   ============================================================ */
const TRANSLATIONS = {
  en: {
    "banner.status": "Institutional Desk Bishkek • Accredited Clinical Training Center",
    "banner.proto": "Prototype • Demo",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.team": "Team",
    "nav.orgs": "For Organisations",
    "nav.contact": "Contact",
    "nav.book": "Request Appointment",

    "hero.draft": "[Hero message: draft awaiting client confirmation]",
    "hero.title": "Evidence-based care for the whole family, in one place.",
    "hero.desc": "A private outpatient family medical centre in Bishkek, providing international-standard healthcare with compassion.",
    "hero.cta1": "Request an appointment",
    "hero.cta2": "Discover MercyMed ↓",
    "hero.pill1t": "WHO & MoH Protocols",
    "hero.pill1s": "Rational prescribing",
    "hero.pill2t": "Tunguch Facility",
    "hero.pill2s": "[Hours: awaiting client confirmation]",
    "hero.photo": "[Photo awaiting client — Bishkek clinic exterior / reception]",

    "pillars.sub": "Standard of Excellence",
    "pillars.title": "Core Pillars of MercyMed Bishkek",
    "pillars.desc": "Providing Kyrgyz families with trustworthy, transparent diagnostic and consultative care.",
    "pillar1.t": "Evidence-based & International Medicine",
    "pillar1.d": "Strictly fewer unnecessary tests. Every treatment regimen follows global scientific clinical guidelines.",
    "pillar1.tag": "Rational Prescribing",
    "pillar2.t": "International & Local Specialists",
    "pillar2.d": "Consultations available in Kyrgyz, Russian, English, German, French and Chinese for residents and visitors.",
    "pillar2.tag": "6 Languages Spoken",
    "pillar3.t": "Care for the Whole Family",
    "pillar3.d": "Pediatric, adult internal medicine, gynecology, women's wellness, and high-resolution ultrasound in one place.",
    "pillar3.tag": "All Ages Covered",
    "pillar4.t": "Charitable Mobile Clinics",
    "pillar4.d": "10+ continuous years of outreach across remote Kyrgyzstan oblasts, delivering care and humanitarian relief.",
    "pillar4.tag": "10+ Years Outreach",

    "scope.sub": "Facility Capabilities",
    "scope.title": "Outpatient Clinical Services",
    "scope.desc": "MercyMed is designed for comprehensive day visits and preventive screenings with minimal wait times.",
    "scope.alertT": "Strictly Outpatient Healthcare:",
    "scope.alertB": "Outpatient visits, regular check-ups, and same-day recovery. We do not provide overnight admissions or 24-hour surgical wards.",
    "scope.spec1": "Specialist Consultations",
    "scope.spec2": "High-Res Ultrasound",
    "scope.spec3": "Quiet Day Infusion Room",
    "scope.spec4": "Minor Procedures",

    "loc.sub": "[Approximate location — awaiting client confirmation]",
    "loc.title": "Visiting Our Clinic",
    "loc.desc": "Located in the Tunguch microdistrict near Ayu Grand, with quiet patient drop-off access and wheelchair ramps.",
    "loc.hours": "[Opening hours: awaiting client confirmation]",
    "loc.phone": "[Phone: awaiting client confirmation]",

    "insta.sub": "Community & Clinic Life",
    "insta.title": "Follow MercyMed Bishkek",
    "insta.desc": "[Instagram feed awaiting client handle]",
    "insta.1": "Family Consultations",
    "insta.2": "Charity Outreach",
    "insta.3": "Pediatric Care",
    "insta.4": "Diagnostics",

    "about.sub": "Our Story",
    "about.title": "About MercyMed Bishkek",
    "about.desc": "A private medical centre built on evidence-based medicine, international experience, and compassionate whole-family care.",
    "about.historyT": "Our History",
    "about.historyD": "The MercyMed project began over 10 years ago with charitable mobile clinics across remote Kyrgyzstan oblasts. Our Bishkek clinic opened in October 2023 to provide a stable base for follow-up care and a permanent team.",
    "about.mobileD": "Mobile clinics remain the heart of MercyMed — every year our team travels to villages that invite us, providing consultations, medications, and humanitarian relief.",
    "about.howT": "How We Work",
    "about.howD": "We follow evidence-based guidelines from WHO and the Ministry of Health of the Kyrgyz Republic. Every treatment plan is reviewed by our bilingual clinical faculty and explained in detail to each patient.",
    "about.promiseD": "Our promise: fewer unnecessary tests, rational prescribing, and transparent communication in your language.",

    "svc.sub": "Clinical Care Index • Bishkek",
    "svc.title": "Medical Services & Consultations",
    "svc.desc": "Outpatient clinical services based on evidence-based medicine and international clinical guidelines. Multilingual care engineered for patient safety and dignified healing.",
    "svc2.sub": "Primary & Subspecialty Care",
    "svc2.title": "Consultation Specialties",
    "svc2.desc": "Every appointment includes a thorough physical examination, digital prescription documentation, and a detailed patient debriefing.",
    "sc1.badge": "Infants & Youth", "sc1.t": "Pediatrics",
    "sc1.d": "Holistic infant examinations, developmental milestones, vaccination guidance, acute febrile illnesses, and gentle symptom management.",
    "sc2.badge": "All Ages", "sc2.t": "Family Medicine",
    "sc2.d": "Continuous, multi-generational medical care from childhood through geriatric health. Long-term records and coordinated triage.",
    "sc3.badge": "Adults", "sc3.t": "Internal Medicine & Pulmonology",
    "sc3.d": "Advanced diagnostics for persistent cough, asthma, bronchitis, post-infectious complications, and hypertension.",
    "sc4.badge": "Specialist Oversight", "sc4.t": "Pediatric Critical Care & Oncology",
    "sc4.d": "Secondary consultations, post-inpatient monitoring, complex case navigation, and expert second opinions.",
    "sc5.badge": "Women's Health", "sc5.t": "Gynecology & Women's Health",
    "sc5.d": "Confidential consultations, routine screenings, prenatal monitoring, hormonal regulation, and postpartum support.",
    "sc6.badge": "Rehabilitation", "sc6.t": "Physical Therapy & Rehab",
    "sc6.d": "Functional restoration, post-surgery rehabilitation, posture correction, and targeted pain relief.",

    "prev.sub": "Early Detection & Diagnostics",
    "prev.title": "Preventive Check-ups & Screenings",
    "prev.1t": "Child Growth & Development",
    "prev.1d": "Biometric tracking against WHO percentiles: height, head circumference, weight, and neuromotor milestones.",
    "prev.2t": "Vision & Hearing Screening",
    "prev.2d": "Standardized pediatric visual acuity panels and calibrated pure-tone audiometric evaluations.",
    "prev.3t": "Diagnostic Digital EKG",
    "prev.3d": "Physician-interpreted resting 12-lead electrocardiography for palpitations, arrhythmias, and athletic clearance.",
    "prev.4t": "Anemia & Diabetes Screening",
    "prev.4d": "CBC, serum ferritin, iron indices, HbA1c, and fasting glucose — with 30% discount through our partner laboratory.",

    "warn.title": "Notice on Clinical Workflow",
    "warn.body": "Additional procedures strictly follow the doctor's consultation. All diagnostic tests, injections, and therapy referrals are administered exclusively after an initial physician evaluation.",
    "warn.pending": "● [Service fees & detailed hours: awaiting client confirmation]",

    "team.sub": "Bishkek Clinical Faculty",
    "team.title": "Our Medical Team",
    "team.desc": "Experienced local and international doctors dedicated to holistic, evidence-based care.",
    "team.count": "Specialists & Staff",
    "filter.all": "All Members (12)",
    "filter.peds": "Pediatrics (5)",
    "filter.adult": "Adult & Family (4)",
    "filter.diag": "Diagnostics & Support (3)",
    "staff1.name": "[Staff Nurse & Videographer]",
    "staff2.name": "[Receptionist & Administrator]",

    "org.sub": "B2B & Academic Cooperation Desk",
    "org.title": "Healthcare Partnerships for Organisations",
    "org.desc": "Corporate annual check-ups, educational partnerships for medical students, and dedicated staff health programs.",
    "trackA.t": "Corporate & Institutional Health",
    "trackA.d": "Structured occupational medicine conforming to both Kyrgyz labor sanitary mandates and rigorous international standards.",
    "trackB.t": "Medical Education & Training",
    "trackB.d": "Cultivating the next generation of healthcare leaders in Central Asia through evidence-based mentorship and clinical electives.",
    "org2.sub": "Direct Response Commitment",
    "org2.title": "Initiate Institutional Cooperation",
    "org2.desc": "Submit your initial requirements to connect directly with our Head of Medical Partnerships. We respond within 24 hours.",
    "f.org": "Organization / Entity Name *",
    "f.person": "Contact Person Name & Title *",
    "f.email": "Official Email *",
    "f.phone": "Phone / WhatsApp *",
    "f.submit": "Submit Partnership Intake",

    "contact.sub": "Get in Touch",
    "contact.title": "Contact MercyMed Bishkek",
    "contact.desc": "Reach our reception team for appointments, questions, or partnership enquiries.",
    "contact.phone": "Phone",
    "contact.phoneVal": "[Awaiting client confirmation]",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappVal": "[Awaiting client confirmation]",
    "contact.email": "Email",
    "contact.emailVal": "[Awaiting client confirmation]",
    "contact.address": "Address",
    "contact.addressVal": "Tunguch Microdistrict 52/1, Bishkek (approximate)",
    "contact.cta": "Request Appointment",

    "footer.tag": "Compassionate, international-standard healthcare serving multi-generational families and organisations across Kyrgyzstan.",
    "footer.loc": "Facility Location",
    "footer.nav": "Quick Navigation",
    "footer.lang": "Languages & Notice",
    "footer.legal": "Licensed by the Ministry of Health of the Kyrgyz Republic. All consultations conform to evidence-based protocols.",
    "footer.services": "Medical Services",
    "footer.team": "Specialist Doctors",
    "footer.orgs": "Corporate Health",
    "footer.book": "Book Intake Session",

    "modal.sub": "Direct Patient Intake",
    "modal.title": "Request an Appointment",
    "modal.notice": "Prototype Demonstration Only: no real patient data is collected, stored, or transmitted.",
    "app.name": "Surname and Name *",
    "app.dob": "Date of Birth *",
    "app.phone": "Phone Number *",
    "app.doctor": "Preferred Doctor / Consultation Type",
    "app.lang": "Preferred Language of Consultation",
    "app.submit": "Preview Appointment Request",
    "app.dispatch": "Simulated Coordinator WhatsApp Dispatch",
    "app.to": "To:",
    "app.toVal": "MercyMed Triage Coordinator",
    "app.salute": "Hello MercyMed Clinic!",
    "app.want": "I would like to request an outpatient consultation.",
    "app.waName": "Name:",
    "app.waDob": "DOB:",
    "app.waPhone": "Phone:",
    "app.waDoctor": "Consultation:",
    "app.waLang": "Language:",
    "app.notSent": "⛔ PROTOTYPE: NOTHING WAS SENT. NO REAL DATA TRANSMITTED."
  },

  ru: {
    "banner.status": "Институциональный отдел Бишкек • Аккредитованный учебный центр",
    "banner.proto": "Прототип • Демо",
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.services": "Услуги",
    "nav.team": "Команда",
    "nav.orgs": "Для организаций",
    "nav.contact": "Контакты",
    "nav.book": "Записаться",

    "hero.draft": "[Главное сообщение: черновик, ожидает подтверждения]",
    "hero.title": "Медицина, основанная на доказательствах, для всей семьи — в одном месте.",
    "hero.desc": "Частный амбулаторный семейный медицинский центр в Бишкеке с помощью международного уровня и заботой.",
    "hero.cta1": "Записаться на приём",
    "hero.cta2": "Узнать о MercyMed ↓",
    "hero.pill1t": "Протоколы ВОЗ и МЗ",
    "hero.pill1s": "Рациональное назначение",
    "hero.pill2t": "Филиал Тунгуч",
    "hero.pill2s": "[Часы: ожидают подтверждения]",
    "hero.photo": "[Фото ожидается — фасад / ресепшн клиники в Бишкеке]",

    "pillars.sub": "Стандарт превосходства",
    "pillars.title": "Ключевые принципы MercyMed Бишкек",
    "pillars.desc": "Проверенная и прозрачная диагностическая и консультативная помощь кыргызстанским семьям.",
    "pillar1.t": "Доказательная и международная медицина",
    "pillar1.d": "Меньше лишних обследований. Каждый план лечения соответствует мировым клиническим рекомендациям.",
    "pillar1.tag": "Рациональное назначение",
    "pillar2.t": "Международные и местные специалисты",
    "pillar2.d": "Консультации на кыргызском, русском, английском, немецком, французском и китайском языках.",
    "pillar2.tag": "6 языков",
    "pillar3.t": "Забота для всей семьи",
    "pillar3.d": "Педиатрия, взрослая терапия, гинекология, женское здоровье и УЗИ высокого разрешения в одном месте.",
    "pillar3.tag": "Все возрасты",
    "pillar4.t": "Благотворительные мобильные клиники",
    "pillar4.d": "Более 10 лет выездной помощи в отдалённых областях Кыргызстана.",
    "pillar4.tag": "10+ лет помощи",

    "scope.sub": "Возможности клиники",
    "scope.title": "Амбулаторные услуги",
    "scope.desc": "MercyMed рассчитан на комплексные дневные визиты и профилактические скрининги.",
    "scope.alertT": "Только амбулаторная помощь:",
    "scope.alertB": "Амбулаторные приёмы, регулярные осмотры и восстановление в тот же день. Мы не предоставляем круглосуточные стационары.",
    "scope.spec1": "Консультации специалистов",
    "scope.spec2": "УЗИ высокого разрешения",
    "scope.spec3": "Тихая палата дневного стационара",
    "scope.spec4": "Малые процедуры",

    "loc.sub": "[Приблизительное расположение — ожидается подтверждение]",
    "loc.title": "Как нас найти",
    "loc.desc": "В микрорайоне Тунгуч рядом с ТЦ Ayu Grand, с тихим подъездом и пандусами.",
    "loc.hours": "[Часы работы: ожидают подтверждения]",
    "loc.phone": "[Телефон: ожидает подтверждения]",

    "insta.sub": "Сообщество и жизнь клиники",
    "insta.title": "Подписывайтесь на MercyMed",
    "insta.desc": "[Instagram ожидает подтверждения]",
    "insta.1": "Семейные консультации",
    "insta.2": "Благотворительность",
    "insta.3": "Педиатрия",
    "insta.4": "Диагностика",

    "about.sub": "Наша история",
    "about.title": "О MercyMed Бишкек",
    "about.desc": "Частный медицинский центр, построенный на доказательной медицине, международном опыте и заботе о всей семье.",
    "about.historyT": "Наша история",
    "about.historyD": "Проект MercyMed начался более 10 лет назад с благотворительных мобильных клиник в отдалённых областях Кыргызстана. Клиника в Бишкеке открылась в октябре 2023 года.",
    "about.mobileD": "Мобильные клиники остаются сердцем MercyMed — каждый год наша команда выезжает в сёла, которые нас приглашают.",
    "about.howT": "Как мы работаем",
    "about.howD": "Мы следуем рекомендациям ВОЗ и Министерства здравоохранения КР. Каждый план лечения обсуждается с пациентом.",
    "about.promiseD": "Наше обещание: меньше ненужных обследований, рациональное назначение и прозрачная коммуникация на вашем языке.",

    "svc.sub": "Клинический каталог • Бишкек",
    "svc.title": "Медицинские услуги и консультации",
    "svc.desc": "Амбулаторные услуги на основе доказательной медицины и международных протоколов.",
    "svc2.sub": "Первичная и специализированная помощь",
    "svc2.title": "Специальности консультаций",
    "svc2.desc": "Каждый приём включает осмотр, цифровые назначения и подробный разбор.",
    "sc1.badge": "Младенцы и дети", "sc1.t": "Педиатрия",
    "sc1.d": "Полные осмотры младенцев, контроль развития, вакцинация, острые лихорадочные состояния.",
    "sc2.badge": "Все возрасты", "sc2.t": "Семейная медицина",
    "sc2.d": "Непрерывная помощь для всей семьи — от детства до пожилого возраста.",
    "sc3.badge": "Взрослые", "sc3.t": "Терапия и пульмонология",
    "sc3.d": "Диагностика кашля, астмы, бронхита, последствий инфекций и гипертонии.",
    "sc4.badge": "Спец. наблюдение", "sc4.t": "Педиатрическая реанимация и онкология",
    "sc4.d": "Вторичные консультации, наблюдение после стационара, второе мнение.",
    "sc5.badge": "Женское здоровье", "sc5.t": "Гинекология",
    "sc5.d": "Деликатные консультации, скрининги, ведение беременности.",
    "sc6.badge": "Реабилитация", "sc6.t": "Физиотерапия и реабилитация",
    "sc6.d": "Восстановление функций, реабилитация после операций, коррекция осанки.",

    "prev.sub": "Ранняя диагностика",
    "prev.title": "Профилактические осмотры и скрининги",
    "prev.1t": "Рост и развитие ребёнка",
    "prev.1d": "Биометрический контроль по перцентилям ВОЗ: рост, окружность головы, вес, нейромоторные этапы.",
    "prev.2t": "Проверка зрения и слуха",
    "prev.2d": "Стандартизированные панели детской остроты зрения и калиброванная аудиометрия.",
    "prev.3t": "Диагностическая ЭКГ",
    "prev.3d": "ЭКГ в 12 отведениях с интерпретацией врача.",
    "prev.4t": "Скрининг анемии и диабета",
    "prev.4d": "ОАК, ферритин, показатели железа, HbA1c и глюкоза натощак — со скидкой 30% в партнёрской лаборатории.",

    "warn.title": "Уведомление о клиническом процессе",
    "warn.body": "Дополнительные процедуры строго следуют консультации врача. Все диагностические тесты, инъекции и направления проводятся только после первичного осмотра.",
    "warn.pending": "● [Стоимость услуг и часы работы: ожидают подтверждения]",

    "team.sub": "Клинический факультет Бишкека",
    "team.title": "Наша медицинская команда",
    "team.desc": "Опытные местные и международные врачи, преданные комплексной помощи.",
    "team.count": "Специалистов и персонала",
    "filter.all": "Все (12)",
    "filter.peds": "Педиатрия (5)",
    "filter.adult": "Взрослые и семья (4)",
    "filter.diag": "Диагностика (3)",
    "staff1.name": "[Медсестра и видеограф]",
    "staff2.name": "[Администратор ресепшн]",

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

    "contact.sub": "Связаться",
    "contact.title": "Контакты MercyMed Бишкек",
    "contact.desc": "Свяжитесь с нашей стойкой регистрации для записи или вопросов.",
    "contact.phone": "Телефон",
    "contact.phoneVal": "[Ожидает подтверждения]",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappVal": "[Ожидает подтверждения]",
    "contact.email": "Email",
    "contact.emailVal": "[Ожидает подтверждения]",
    "contact.address": "Адрес",
    "contact.addressVal": "Микрорайон Тунгуч 52/1, Бишкек (приблизительно)",
    "contact.cta": "Записаться",

    "footer.tag": "Заботливая медицина международного уровня для семей и организаций Кыргызстана.",
    "footer.loc": "Расположение",
    "footer.nav": "Навигация",
    "footer.lang": "Языки и уведомление",
    "footer.legal": "Лицензировано Министерством здравоохранения КР. Все консультации соответствуют протоколам доказательной медицины.",
    "footer.services": "Медицинские услуги",
    "footer.team": "Специалисты",
    "footer.orgs": "Корпоративное здоровье",
    "footer.book": "Записаться на приём",

    "modal.sub": "Прямая запись пациента",
    "modal.title": "Запись на приём",
    "modal.notice": "Только прототип: реальные данные не собираются, не хранятся и не передаются.",
    "app.name": "Фамилия и имя *",
    "app.dob": "Дата рождения *",
    "app.phone": "Телефон *",
    "app.doctor": "Врач / тип консультации",
    "app.lang": "Язык консультации",
    "app.submit": "Показать заявку",
    "app.dispatch": "Симуляция отправки WhatsApp координатору",
    "app.to": "Кому:",
    "app.toVal": "Координатор MercyMed",
    "app.salute": "Здравствуйте, MercyMed!",
    "app.want": "Хочу записаться на амбулаторную консультацию.",
    "app.waName": "Имя:",
    "app.waDob": "Дата рождения:",
    "app.waPhone": "Телефон:",
    "app.waDoctor": "Консультация:",
    "app.waLang": "Язык:",
    "app.notSent": "⛔ ПРОТОТИП: НИЧЕГО НЕ ОТПРАВЛЕНО. РЕАЛЬНЫЕ ДАННЫЕ НЕ ПЕРЕДАЮТСЯ."
  },

  ky: {
    "banner.status": "Бишкек институционалдык бөлүмү • Аккредитацияланган окуу борбору",
    "banner.proto": "Прототип • Демо",
    "nav.home": "Башкы бет",
    "nav.about": "Биз жөнүндө",
    "nav.services": "Кызматтар",
    "nav.team": "Команда",
    "nav.orgs": "Уюмдар үчүн",
    "nav.contact": "Байланыш",
    "nav.book": "Жазылуу",

    "hero.draft": "[Негизги билдирүү: долбоор, ырастоону күтүүдө]",
    "hero.title": "Бүт үй-бүлө үчүн далилдүү медицина — бир жерде.",
    "hero.desc": "Бишкектеги жеке амбулатордук үй-бүлөлүк медициналык борбор, эл аралык стандартта кам көрүү менен.",
    "hero.cta1": "Жазылууга арыз",
    "hero.cta2": "MercyMed менен тааныш ↓",
    "hero.pill1t": "ДСУ жана СМ протоколдору",
    "hero.pill1s": "Рационалдуу дарылоо",
    "hero.pill2t": "Түнгүч филиалы",
    "hero.pill2s": "[Иштөө убактысы: ырастоону күтүүдө]",
    "hero.photo": "[Сүрөт күтүлүүдө — Бишкек клиникасынын фасады]",

    "pillars.sub": "Мыктылык стандарты",
    "pillars.title": "MercyMed Бишкектин негизги принциптери",
    "pillars.desc": "Кыргыз үй-бүлөлөрүнө ишенимдүү жана ачык кам көрүү.",
    "pillar1.t": "Далилдүү жана эл аралык медицина",
    "pillar1.d": "Ашыкча текшерүүлөр жок. Ар бир дарылоо дүйнөлүк клиникалык көрсөтмөлөргө шайкеш.",
    "pillar1.tag": "Рационалдуу дарылоо",
    "pillar2.t": "Эл аралык жана жергиликтүү адистер",
    "pillar2.d": "Кыргыз, орус, англис, немис, француз жана кытай тилдеринде консультациялар.",
    "pillar2.tag": "6 тил",
    "pillar3.t": "Бүт үй-бүлө үчүн кам көрүү",
    "pillar3.d": "Педиатрия, чоңдор терапиясы, гинекология жана УЗИ бир жерде.",
    "pillar3.tag": "Бардык жаштар",
    "pillar4.t": "Кайрымдуу мобилдик клиникалар",
    "pillar4.d": "Кыргызстандын алыскы облустарында 10+ жыл үзгүлтүксүз жардам.",
    "pillar4.tag": "10+ жыл",

    "scope.sub": "Клиниканын мүмкүнчүлүктөрү",
    "scope.title": "Амбулатордук кызматтар",
    "scope.desc": "MercyMed күнүмдүк визиттер жана профилактикалык скринингдер үчүн.",
    "scope.alertT": "Тек гана амбулатордук жардам:",
    "scope.alertB": "Амбулатордук кабыл алуулар жана ошол эле күнү калыбына келтирүү. Түнү бою стационар жок.",
    "scope.spec1": "Адис консультациялары",
    "scope.spec2": "Жогорку чечимдүү УЗИ",
    "scope.spec3": "Тынч күндүзгү палата",
    "scope.spec4": "Чакан процедуралар",

    "loc.sub": "[Болжолдуу жайгашуу — ырастоону күтүүдө]",
    "loc.title": "Бизди кантип табуу керек",
    "loc.desc": "Түнгүч микрорайонунда Ayu Grand жанында, пандустар менен.",
    "loc.hours": "[Иштөө убактысы: ырастоону күтүүдө]",
    "loc.phone": "[Телефон: ырастоону күтүүдө]",

    "insta.sub": "Коомдук жашоо",
    "insta.title": "MercyMed'ге жазылыңыз",
    "insta.desc": "[Instagram ырастоону күтүүдө]",
    "insta.1": "Үй-бүлөлүк консультациялар",
    "insta.2": "Кайрымдуулук",
    "insta.3": "Педиатрия",
    "insta.4": "Диагностика",

    "about.sub": "Биздин тарых",
    "about.title": "MercyMed Бишкек жөнүндө",
    "about.desc": "Далилдүү медицинага, эл аралык тажрыйбага жана үй-бүлөгө кам көрүүгө негизделген медициналык борбор.",
    "about.historyT": "Биздин тарых",
    "about.historyD": "MercyMed долбоору 10 жылдан ашуун убакыт мурун алыскы облустардагы кайрымдуу мобилдик клиникалардан башталган. Бишкек клиникасы 2023-жылдын октябрында ачылган.",
    "about.mobileD": "Мобилдик клиникалар MercyMedдин жүрөгү бойдон калууда — ар жылы команда чакырган айылдарга барабыз.",
    "about.howT": "Кантип иштейбиз",
    "about.howD": "Биз ДСУ жана КР Саламаттык сактоо министрлигинин көрсөтмөлөрүнө таянабыз. Ар бир дарылоо планы пациент менен талкууланат.",
    "about.promiseD": "Биздин убада: ашыкча текшерүүлөр жок, рационалдуу дарылоо жана сиздин тилиңизде ачык байланыш.",

    "svc.sub": "Клиникалык каталог • Бишкек",
    "svc.title": "Медициналык кызматтар жана консультациялар",
    "svc.desc": "Далилдүү медицина жана эл аралык протоколдорго негизделген амбулатордук кызматтар.",
    "svc2.sub": "Баштапкы жана адистештирилген жардам",
    "svc2.title": "Консультация адистиктери",
    "svc2.desc": "Ар бир кабыл алуу текшерүүнү, санариптик рецепттерди жана түшүндүрмөнү камтыйт.",
    "sc1.badge": "Ымыркайлар жана балдар", "sc1.t": "Педиатрия",
    "sc1.d": "Ымыркайларды текшерүү, өнүгүү мониторинги, эмдөө, курч оорулар.",
    "sc2.badge": "Бардык жаштар", "sc2.t": "Үй-бүлөлүк медицина",
    "sc2.d": "Балдардан улгайгандарга чейин үзгүлтүксүз кам көрүү.",
    "sc3.badge": "Чоңдор", "sc3.t": "Терапия жана пульмонология",
    "sc3.d": "Жөтөл, астма, бронхит, гипертония боюнча диагностика.",
    "sc4.badge": "Адис көзөмөлү", "sc4.t": "Балдар реанимациясы жана онкология",
    "sc4.d": "Экинчи консультациялар, стационардан кийинки көзөмөл, экинчи пикир.",
    "sc5.badge": "Аялдар ден соолугу", "sc5.t": "Гинекология",
    "sc5.d": "Аялдардын ден соолугу боюнча консультациялар, скринингдер, кош бойлуулукту көзөмөлдөө.",
    "sc6.badge": "Реабилитация", "sc6.t": "Физиотерапия жана реабилитация",
    "sc6.d": "Функционалдык калыбына келтирүү, операциядан кийинки реабилитация.",

    "prev.sub": "Эрте диагностика",
    "prev.title": "Профилактикалык текшерүүлөр жана скринингдер",
    "prev.1t": "Баланын өсүүсү жана өнүгүүсү",
    "prev.1d": "ДСУ перцентилдери боюнча биометрикалык көзөмөл: бою, баш курчоосу, салмагы, нейромотордук этаптар.",
    "prev.2t": "Көрүү жана угуу текшерүүсү",
    "prev.2d": "Стандартташтырылган балдар көрүү курчтугу жана калибрленген аудиометрия.",
    "prev.3t": "Диагностикалык ЭКГ",
    "prev.3d": "12-багыттуу ЭКГ, дарыгер тарабынан чечмеленет.",
    "prev.4t": "Анемия жана диабет скрининги",
    "prev.4d": "Жалпы кан анализи, ферритин, темир индекстери, HbA1c жана ачка кант — өнөктөш лабораторияда 30% арзандатуу менен.",

    "warn.title": "Клиникалык процесс тууралуу эскертүү",
    "warn.body": "Кошумча процедуралар дарыгердин консультациясынан кийин гана жүргүзүлөт. Бардык диагностикалык тесттер, инъекциялар жана багыттоолор баштапкы кароодон кийин гана аткарылат.",
    "warn.pending": "● [Кызматтардын баасы жана иштөө убактысы: ырастоону күтүүдө]",

    "team.sub": "Бишкек клиникалык факультети",
    "team.title": "Биздин медициналык команда",
    "team.desc": "Комплекстүү, далилдүү кам көрүүгө берилген тажрыйбалуу жергиликтүү жана эл аралык дарыгерлер.",
    "team.count": "Адистер жана кызматкерлер",
    "filter.all": "Баары (12)",
    "filter.peds": "Педиатрия (5)",
    "filter.adult": "Чоңдор жана үй-бүлө (4)",
    "filter.diag": "Диагностика (3)",
    "staff1.name": "[Медсестра жана видеограф]",
    "staff2.name": "[Ресепшн администратору]",

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

    "contact.sub": "Байланыш",
    "contact.title": "MercyMed Бишкек менен байланыш",
    "contact.desc": "Жазылуу же суроолор боюнча кабыл алуу бөлүмүбүзгө кайрылыңыз.",
    "contact.phone": "Телефон",
    "contact.phoneVal": "[Ырастоону күтүүдө]",
    "contact.whatsapp": "WhatsApp",
    "contact.whatsappVal": "[Ырастоону күтүүдө]",
    "contact.email": "Email",
    "contact.emailVal": "[Ырастоону күтүүдө]",
    "contact.address": "Дарек",
    "contact.addressVal": "Түнгүч микрорайону 52/1, Бишкек (болжолдуу)",
    "contact.cta": "Жазылуу",

    "footer.tag": "Кыргызстандын үй-бүлөлөрү жана уюмдары үчүн эл аралык стандарттагы кам көрүү.",
    "footer.loc": "Жайгашуу",
    "footer.nav": "Навигация",
    "footer.lang": "Тилдер жана эскертүү",
    "footer.legal": "КР Саламаттык сактоо министрлиги тарабынан лицензияланган. Бардык консультациялар далилдүү медицина протоколдоруна шайкеш.",
    "footer.services": "Медициналык кызматтар",
    "footer.team": "Адистер",
    "footer.orgs": "Корпоративдик ден соолук",
    "footer.book": "Жазылууга арыз",

    "modal.sub": "Түз пациент каттоосу",
    "modal.title": "Жазылууга арыз",
    "modal.notice": "Тек прототип: реалдуу маалыматтар чогултулбайт, сакталбайт жана берилбейт.",
    "app.name": "Фамилиясы жана аты *",
    "app.dob": "Туулган күнү *",
    "app.phone": "Телефон номери *",
    "app.doctor": "Дарыгер / консультация түрү",
    "app.lang": "Консультация тили",
    "app.submit": "Арызды көрүү",
    "app.dispatch": "WhatsApp координаторго симуляция",
    "app.to": "Кимге:",
    "app.toVal": "MercyMed координатору",
    "app.salute": "Саламатсызбы, MercyMed!",
    "app.want": "Амбулатордук консультацияга жазылгым келет.",
    "app.waName": "Аты:",
    "app.waDob": "Туулган күнү:",
    "app.waPhone": "Телефон:",
    "app.waDoctor": "Консультация:",
    "app.waLang": "Тил:",
    "app.notSent": "⛔ ПРОТОТИП: ЭЧТЕКЕ ЖӨНӨТҮЛГӨН ЖОК. РЕАЛДУУ МААЛЫМАТ БЕРИЛБЕЙТ."
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
    if (value !== undefined) el.textContent = value;
  });
}

/* ============================================================
   4. TEAM FILTERS (R3)
   ============================================================ */
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

/* ============================================================
   5. DATE OF BIRTH AUTO-FORMATTER (DD.MM.YYYY)
   ============================================================ */
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
    if (!/^\d$/.test(e.key)) e.preventDefault();
  });
}

/* ============================================================
   6. APPOINTMENT MODAL (R2)
   ============================================================ */
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
    if (modal && e.target === modal) closeAppointmentModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('appointment-modal');
      if (modal && !modal.classList.contains('hidden')) closeAppointmentModal();
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

/* ============================================================
   7. ORGANISATION INTAKE (R6)
   ============================================================ */
function handleOrgSubmit(event) {
  event.preventDefault();
  const successBox = document.getElementById('org-success');
  if (!successBox) return;
  successBox.classList.remove('hidden');
  event.target.reset();
  successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
}