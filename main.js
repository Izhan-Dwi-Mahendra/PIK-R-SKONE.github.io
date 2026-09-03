/**
 * PIK-R SKONE | SMK Negeri 1 Depok
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Drawer Elements
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openDrawer() {
    navDrawer.classList.add('open');
    navOverlay.classList.add('open');
    navDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    navOverlay.classList.remove('open');
    navDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (navOverlay) navOverlay.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', () => closeDrawer());
  });

  // 2. Hero Carousel Dots Interaction
  const dots = document.querySelectorAll('.carousel-dots .dot');
  let currentSlide = 0;
  const totalSlides = dots.length;

  function setActiveDot(index) {
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      setActiveDot(currentSlide);
    });
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    setActiveDot(currentSlide);
  }, 4500);

  // 3. Modals Management (Tentang Kami & Konseling Curhat)
  const infoModal = document.getElementById('infoModal');
  const modalClose = document.getElementById('modalClose');
  const btnKenalLebihDekat = document.getElementById('btnKenalLebihDekat');
  const btnTentangSelengkapnya = document.getElementById('btnTentangSelengkapnya');

  const counselingModal = document.getElementById('counselingModal');
  const counselingClose = document.getElementById('counselingClose');
  const btnKonselingModal = document.getElementById('btnKonselingModal');
  const btnDrawerChat = document.getElementById('btnDrawerChat');

  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnKenalLebihDekat) btnKenalLebihDekat.addEventListener('click', () => openModal(infoModal));
  if (btnTentangSelengkapnya) btnTentangSelengkapnya.addEventListener('click', () => openModal(infoModal));
  if (modalClose) modalClose.addEventListener('click', () => closeModal(infoModal));

  if (btnKonselingModal) btnKonselingModal.addEventListener('click', () => openModal(counselingModal));
  if (btnDrawerChat) {
    btnDrawerChat.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      setTimeout(() => openModal(counselingModal), 250);
    });
  }
  if (counselingClose) counselingClose.addEventListener('click', () => closeModal(counselingModal));

  [infoModal, counselingModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal(infoModal);
      closeModal(counselingModal);
    }
  });

  // 4. WhatsApp Direct Counseling
  const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
  if (btnSendWhatsApp) {
    btnSendWhatsApp.addEventListener('click', () => {
      const name = document.getElementById('counselorName').value.trim() || 'Anonim';
      const userClass = document.getElementById('counselorClass').value.trim() || 'Siswa SMK Negeri 1 Depok';
      const topic = document.getElementById('counselorTopic').value;
      const msg = document.getElementById('counselorMsg').value.trim() || 'Halo, saya ingin berbagi cerita dan konseling sebaya.';

      const formattedText = `Halo Konselor Sebaya PIK-R SKONE (SMK Negeri 1 Depok),%0A%0ASaya ingin konsultasi sebaya:%0A• Nama: ${encodeURIComponent(name)}%0A• Kelas/Jurusan: ${encodeURIComponent(userClass)}%0A• Topik: ${encodeURIComponent(topic)}%0A%0ACerita / Pesan:%0A"${encodeURIComponent(msg)}"%0A%0AMohon bimbingan dan waktu teman-teman konselor. Terima kasih! 🙏`;

      const waNumber = '6281234567890'; // Ganti dengan nomor resmi PIK-R SKONE
      window.open(`https://wa.me/${waNumber}?text=${formattedText}`, '_blank');
    });
  }
});