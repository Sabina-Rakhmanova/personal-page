/**
 * MercyMed Bishkek Clinic — Frontend Logic
 * Compliant with Team 2 PRD requirements (R0 to R6)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initTeamFilters();
});

/* ========================================================
   1. Page Navigation (Single Page Application switching)
   ======================================================== */
function switchTab(viewId) {
  // Hide all views
  const views = document.querySelectorAll('.page-view');
  views.forEach(v => v.classList.remove('active'));

  // Show target view
  const targetView = document.getElementById(`view-${viewId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Update Navigation Active State
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('onclick')?.includes(viewId)) {
      link.classList.add('active');
    }
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================================
   2. Language Switcher (PRD R0)
   ======================================================== */
function initLanguageSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.dataset.lang;
      
      // Feedback notice for demonstration
      console.log(`Language switched to: ${lang.toUpperCase()}`);
    });
  });
}

/* ========================================================
   3. Team Directory Filtering (PRD R3)
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
   4. Appointment Request Modal & Dispatch Simulation (PRD R2)
   ======================================================== */
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

// Close when clicking outside backdrop
window.addEventListener('click', (e) => {
  const modal = document.getElementById('appointment-modal');
  if (e.target === modal) {
    closeAppointmentModal();
  }
});

function handleAppointmentSubmit(event) {
  event.preventDefault();

  // Read input values
  const name = document.getElementById('app-name').value.trim();
  const dob = document.getElementById('app-dob').value.trim();
  const phone = document.getElementById('app-phone').value.trim();
  const doctor = document.getElementById('app-doctor').value;
  const langElement = document.querySelector('input[name="app-lang"]:checked');
  const lang = langElement ? langElement.value : 'English';

  // Populate WhatsApp Simulated Dispatch box
  document.getElementById('wa-name').textContent = name;
  document.getElementById('wa-dob').textContent = dob;
  document.getElementById('wa-phone').textContent = phone;
  document.getElementById('wa-doctor').textContent = doctor;
  document.getElementById('wa-lang').textContent = lang;

  // Show dispatch preview
  const preview = document.getElementById('dispatch-preview');
  preview.classList.remove('hidden');
  preview.scrollIntoView({ behavior: 'smooth' });
}

/* ========================================================
   5. Institutional Cooperation Intake (PRD R6)
   ======================================================== */
function handleOrgSubmit(event) {
  event.preventDefault();
  const successBox = document.getElementById('org-success');
  successBox.classList.remove('hidden');
  event.target.reset();
}