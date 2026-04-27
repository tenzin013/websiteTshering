/* ============================================
   TSHERING SHERPA — Personal Website
   script.js
   ============================================ */

/* ─── CUSTOM CURSOR ──────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 4 + 'px';
  cursor.style.top  = mouseY - 4 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX - 18) * 0.14;
  ringY += (mouseY - ringY - 18) * 0.14;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow cursor on interactive elements
document.querySelectorAll('a, button, input, textarea').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform      = 'scale(2.5)';
    cursorRing.style.width      = '56px';
    cursorRing.style.height     = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform      = 'scale(1)';
    cursorRing.style.width      = '36px';
    cursorRing.style.height     = '36px';
  });
});

/* ─── SCROLL REVEAL ───────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el) => observer.observe(el));

/* ─── SMOOTH NAV HIGHLIGHT ────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}`
      ? 'var(--amber)'
      : '';
  });
});

/* ─── CONTACT FORM (static demo) ─────────────── */
const sendBtn = document.querySelector('.contact-form-area .btn-primary');
if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendBtn.textContent = 'Message Sent ✓';
    sendBtn.style.background = '#4caf79';
    setTimeout(() => {
      sendBtn.textContent = 'Send Message';
      sendBtn.style.background = '';
    }, 3000);
  });
}
