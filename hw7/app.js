/**
 * MercyMed Bishkek Clinic — Frontend Logic (fixed)
 * - Site is now one scrolling page; nav links are plain anchors (no more
 *   tab-hiding / "stuck on Home").
 * - Date of Birth auto-formats as DD.MM.YYYY while typing.
 * - Language switcher now actually swaps text for every element tagged
 *   data-i18n. Long paragraphs (bios, track descriptions) are not yet
 *   translated — only chrome/headings/labels — flagged below.
 */

const i18n = {
  en: {
    "nav.home": "Home", "nav.services": "Services", "nav.team": "Team", "nav.org": "For Organisations",
    "nav.cta": "Request Appointment", "nav.cta2": "Request an appointment",
    "hero.h1": "Evidence-based care for the whole family, in one place.",
    "hero.desc": "A private outpatient family medical centre in Bishkek providing international standard healthcare with compassion.",
    "hero.discover": "Discover MercyMed ↓",
    "pillars.h2": "Core Pillars of MercyMed Bishkek",
    "pillars.lead": "Providing Kyrgyz families with trustworthy, transparent diagnostic and consultative care since inception.",
    "pillar1.h3": "Evidence-based & International Medicine",
    "pillar1.p": "Strictly fewer unnecessary tests and zero polypharmacy. Every treatment regimen adheres strictly to global scientific clinical guidelines.",
    "pillar2.h3": "International & Local Specialists",
    "pillar2.p": "Consultations available in Kyrgyz, Russian, English, German, French, and Chinese for multi-cultural residents and diplomatic personnel.",
    "pillar3.h3": "Care for the Whole Family",
    "pillar3.p": "Complete pediatric health checks, adult internal medicine, gynecology, women's wellness, and high-resolution ultrasound diagnostics.",
    "pillar4.h3": "Charitable Mobile Clinics",
    "pillar4.p": "10+ continuous years of outreach across remote Kyrgyzstan oblasts, delivering medical care, screenings, and humanitarian relief.",
    "team.h1": "Our Medical Team & Clinical Faculty",
    "team.lead": "Experienced local and international doctors and specialists dedicated to holistic, evidence-based care in Bishkek.",
    "team.statslabel": "Specialists & Staff<br><small>Kyrgyz • English • Russian</small>",
    "filter.all": "All Members (12)", "filter.pediatrics": "Pediatrics (5)",
    "filter.adult": "Adult & Family Care (4)", "filter.diagnostics": "Diagnostics & Support (3)",
    "org.h1": "Healthcare Partnerships for Organisations",
    "modal.h3": "Request an Appointment",
    "form.name": 'Surname and Name <span class="required">*</span>',
    "form.dob": 'Date of Birth <span class="required">*</span>',
    "form.phone": 'Phone Number <span class="required">*</span>',
    "form.doctor": 'Preferred Doctor / Consultation Type <span class="optional">(Optional)</span>',
    "form.lang": "Preferred Language of Consultation",
    "form.submit": "Preview Appointment Request",
    "footer.nav": "Quick Navigation", "footer.lang": "Languages & Notice"
  },
  ru: {
    "nav.home": "Главная", "nav.services": "Услуги", "nav.team": "Команда", "nav.org": "Для организаций",
    "nav.cta": "Записаться", "nav.cta2": "Записаться на приём",
    "hero.h1": "Доказательная медицина для всей семьи — в одном месте.",
    "hero.desc": "Частный амбулаторный семейный медицинский центр в Бишкеке с международными стандартами и заботой.",
    "hero.discover": "Узнать больше о MercyMed ↓",
    "pillars.h2": "Ключевые принципы MercyMed Bishkek",
    "pillars.lead": "Прозрачная и надёжная диагностика и консультации для кыргызских семей.",
    "pillar1.h3": "Доказательная и международная медицина",
    "pillar1.p": "Минимум лишних анализов, без избыточных назначений. Все протоколы лечения соответствуют международным клиническим рекомендациям.",
    "pillar2.h3": "Местные и зарубежные специалисты",
    "pillar2.p": "Консультации на кыргызском, русском, английском, немецком, французском и китайском языках.",
    "pillar3.h3": "Забота обо всей семье",
    "pillar3.p": "Педиатрия, терапия для взрослых, гинекология, УЗИ высокого разрешения — всё в одном месте.",
    "pillar4.h3": "Благотворительные мобильные клиники",
    "pillar4.p": "Более 10 лет выездной медицинской помощи в отдалённые регионы Кыргызстана.",
    "team.h1": "Наша медицинская команда",
    "team.lead": "Опытные местные и зарубежные врачи, преданные комплексной доказательной медицине в Бишкеке.",
    "team.statslabel": "Специалистов и сотрудников<br><small>Кыргызский • Английский • Русский</small>",
    "filter.all": "Все (12)", "filter.pediatrics": "Педиатрия (5)",
    "filter.adult": "Взрослые и семья (4)", "filter.diagnostics": "Диагностика (3)",
    "org.h1": "Партнёрство для организаций",
    "modal.h3": "Записаться на приём",
    "form.name": 'Фамилия и имя <span class="required">*</span>',
    "form.dob": 'Дата рождения <span class="required">*</span>',
    "form.phone": 'Номер телефона <span class="required">*</span>',
    "form.doctor": 'Врач / тип консультации <span class="optional">(необязательно)</span>',
    "form.lang": "Предпочитаемый язык консультации",
    "form.submit": "Показать предпросмотр",
    "footer.nav": "Быстрая навигация", "footer.lang": "Языки и уведомление"
  },
  ky: {
    "nav.home": "Башкы бет", "nav.services": "Кызматтар", "nav.team": "Команда", "nav.org": "Уюмдар үчүн",
    "nav.cta": "Жазылуу", "nav.cta2": "Кабыл алууга жазылуу",
    "hero.h1": "Бүтүндөй үй-бүлө үчүн далилге негизделген медицина — бир жерде.",
    "hero.desc": "Бишкектеги жеке амбулаториялык үй-бүлөлүк медициналык борбор, эл аралык стандарттар менен.",
    "hero.discover": "MercyMed жөнүндө көбүрөөк билүү ↓",
    "pillars.h2": "MercyMed Bishkek негизги принциптери",
    "pillars.lead": "Кыргыз үй-бүлөлөрү үчүн ачык-айкын жана ишенимдүү диагностика жана консультация.",
    "pillar1.h3": "Далилге негизделген жана эл аралык медицина",
    "pillar1.p": "Ашыкча анализдер жок, бардык дарылоо протоколдору эл аралык стандарттарга дал келет.",
    "pillar2.h3": "Жергиликтүү жана чет элдик адистер",
    "pillar2.p": "Кыргыз, орус, англис, немис, француз жана кытай тилдеринде консультация.",
    "pillar3.h3": "Бүтүндөй үй-бүлөгө кам көрүү",
    "pillar3.p": "Педиатрия, чоңдор үчүн терапия, гинекология, жогорку сапаттагы УЗИ — бардыгы бир жерде.",
    "pillar4.h3": "Кайрымдуулук мобилдик клиникалары",
    "pillar4.p": "10 жылдан ашык убакыт бою Кыргызстандын алыскы аймактарына медициналык жардам.",
    "team.h1": "Биздин медициналык команда",
    "team.lead": "Бишкекте далилге негизделген кам көрүүгө берилген тажрыйбалуу жергиликтүү жана чет элдик врачтар.",
    "team.statslabel": "Адис жана кызматкер<br><small>Кыргызча • Англисче • Орусча</small>",
    "filter.all": "Баары (12)", "filter.pediatrics": "Педиатрия (5)",
    "filter.adult": "Чоңдор жана үй-бүлө (4)", "filter.diagnostics": "Диагностика (3)",
    "org.h1": "Уюмдар үчүн өнөктөштүк",
    "modal.h3": "Кабыл алууга жазылуу",
    "form.name": 'Фамилия жана ысым <span class="required">*</span>',
    "form.dob": 'Туулган күнү <span class="required">*</span>',
    "form.phone": 'Телефон номери <span class="required">*</span>',
    "form.doctor": 'Врач / консультация түрү <span class="optional">(милдеттүү эмес)</span>',
    "form.lang": "Консультациянын каалаган тили",
    "form.submit": "Алдын ала көрүү",
    "footer.nav": "Тез навигация", "footer.lang": "Тилдер жана эскертүү"
  }
};

let currentLang = "en";

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initTeamFilters();
  initDobMask();
  initInputGuards();
  initScrollSpy();
});

/* ========================================================
   Letters-only Name field, digits-only Phone field
   ======================================================== */
function initInputGuards() {
  const name = document.getElementById('app-name');
  if (name) {
    name.addEventListener('input', (e) => {
      // allow letters (any language/script), spaces, hyphens, apostrophes
      e.target.value = e.target.value.replace(/[^\p{L}\s'-]/gu, '');
    });
  }

  const phone = document.getElementById('app-phone');
  if (phone) {
    phone.addEventListener('input', (e) => {
      // allow digits and common phone formatting characters only
      e.target.value = e.target.value.replace(/[^0-9+\-\s()]/g, '');
    });
  }
}

/* ========================================================
   Scrollspy: highlights the nav link for the section
   currently in view while scrolling.
   ======================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('main.section-page[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentLang = btn.dataset.lang;
      applyTranslations(currentLang);
    });
  });
}

function applyTranslations(lang) {
  const dict = i18n[lang] || i18n.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });
}

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
        card.classList.toggle('hidden', !(filter === 'all' || categories.includes(filter)));
      });
    });
  });
}

function initDobMask() {
  const dob = document.getElementById('app-dob');
  if (!dob) return;
  dob.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let out = digits;
    if (digits.length > 4) out = digits.slice(0, 2) + '.' + digits.slice(2, 4) + '.' + digits.slice(4);
    else if (digits.length > 2) out = digits.slice(0, 2) + '.' + digits.slice(2);
    e.target.value = out;
  });
}

function openAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('appointment-modal');
  if (e.target === modal) closeAppointmentModal();
});

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
  preview.classList.remove('hidden');
  preview.scrollIntoView({ behavior: 'smooth' });
}

function handleOrgSubmit(event) {
  event.preventDefault();
  const successBox = document.getElementById('org-success');
  successBox.classList.remove('hidden');
  event.target.reset();
}