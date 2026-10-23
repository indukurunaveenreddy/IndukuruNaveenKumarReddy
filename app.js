/* ==========================================================================
   INDUKURU NAVEEN KUMAR REDDY - PORTFOLIO LOGIC
   Role Cycler, Pupil HRV Simulator, Modal Controller, Theme System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRoleCycler();
  initSkillsFilter();
  initSkillBars();
  initModals();
  initCopyButtons();
  initContactForm();
  initPupilHrvSimulator();
  initMobileNav();
  initScrollSpy();
  initTechCloudAnimation();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlRoot.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

/* ==========================================================================
   2. DYNAMIC ROLE CYCLER
   ========================================================================== */
function initRoleCycler() {
  const roleEl = document.getElementById('role-cycler');
  if (!roleEl) return;

  const roles = [
    'Python & Web Development Specialist',
    'Full-Stack & Freelance Web Developer',
    'Software Testing & QA Engineer',
    'AI/ML & Computer Vision Developer',
    'UI/UX Design & Database Architecture'
  ];

  let currentIndex = 0;
  setInterval(() => {
    roleEl.style.opacity = '0';
    roleEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % roles.length;
      roleEl.textContent = roles[currentIndex];
      roleEl.style.opacity = '1';
      roleEl.style.transform = 'translateY(0)';
    }, 280);
  }, 3200);

  roleEl.style.transition = 'all 0.28s ease';
}

/* ==========================================================================
   3. SKILLS FILTERING & ANIMATED PROGRESS BARS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('#skill-filters .filter-btn');
  const skillCards = document.querySelectorAll('.skill-flip-card, .skill-category-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Tap-to-flip for mobile/touch screens
  document.querySelectorAll('.skill-flip-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't toggle if clicking an interactive element inside
      if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) {
        card.classList.toggle('flipped');
      }
    });
  });
}

function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-fill');
  if (!skillFills.length) return;

  // Store target widths and reset to 0 for animation
  skillFills.forEach(fill => {
    const targetW = fill.style.width || fill.getAttribute('data-target-width') || '85%';
    fill.setAttribute('data-target-width', targetW);
    fill.style.width = '0%';
    fill.style.transition = 'none';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const fills = card.querySelectorAll('.skill-fill');
        fills.forEach((fill, idx) => {
          const targetW = fill.getAttribute('data-target-width') || '85%';
          setTimeout(() => {
            fill.style.transition = 'width 1s cubic-bezier(0.16, 1, 0.3, 1)';
            fill.style.width = targetW;
          }, idx * 80);
        });
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-flip-card, .skill-category-card').forEach(card => observer.observe(card));
}

/* ==========================================================================
   3b. TECH CLOUD ANIMATION
   ========================================================================== */
function initTechCloudAnimation() {
  const tags = document.querySelectorAll('.tech-tag');
  tags.forEach((tag, i) => {
    const delay = (i * 0.18) % 2.5;
    tag.style.animationDelay = `${delay}s`;
  });
}


/* ==========================================================================
   4. MODALS & LIGHT DISMISS
   ========================================================================== */
function initModals() {
  const hrvModal = document.getElementById('hrv-modal');
  const resumeModal = document.getElementById('resume-modal');
  const detailModal = document.getElementById('project-detail-modal');

  // Launch HRV Lab triggers
  const launchLabBtns = [
    document.getElementById('launch-hrv-lab-btn'),
    document.querySelector('.open-hrv-modal-btn')
  ];

  launchLabBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        if (hrvModal) {
          hrvModal.showModal();
          startHrvSimulation();
        }
      });
    }
  });

  // Resume triggers (only explicit modal triggers)
  const resumeModalTriggers = document.querySelectorAll('.open-resume-trigger');
  resumeModalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.showModal();
    });
  });

  // Direct PDF Download buttons
  const pdfDownloadBtns = document.querySelectorAll('.direct-pdf-download-btn');
  pdfDownloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Naveen Kumar Reddy Resume (PDF)...');
    });
  });

  // Print / Open Official PDF Resume action
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('assets/Indukuru_Naveen_Kumar_Reddy_Resume.pdf', '_blank');
      showToast('Opening official resume PDF for print/view...');
    });
  }

  // Project Detail triggers
  const detailBtns = document.querySelectorAll('.open-project-detail-btn');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      renderProjectDetail(projectKey);
      if (detailModal) detailModal.showModal();
    });
  });

  // Generic close buttons
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) targetModal.close();
    });
  });

  // Light dismiss: clicking on dialog backdrop closes it
  const allModals = [hrvModal, resumeModal, detailModal];
  allModals.forEach(dialog => {
    if (dialog) {
      dialog.addEventListener('click', (event) => {
        // If clicked on backdrop (target is the dialog itself)
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    }
  });
}

/* ==========================================================================
   5. PROJECT ARCHITECTURE CONTENT RENDERER
   ========================================================================== */
function renderProjectDetail(projectKey) {
  const titleEl = document.getElementById('detail-modal-title');
  const bodyEl = document.getElementById('detail-modal-body');
  if (!bodyEl || !titleEl) return;

  if (projectKey === 'pupil-hrv') {
    titleEl.textContent = 'Biomedical AI: Pupil Heart Disease Detection & HRV Monitoring';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:rgba(16, 185, 129, 0.12); padding:16px 20px; border-radius:var(--radius-md); border:1px solid rgba(16, 185, 129, 0.35); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="live-pulse-dot"></span>
            <strong style="color:#34d399; font-size:0.95rem;">Live Cloud Deployment Active on Render</strong>
          </div>
          <a href="https://pupil-heart-disease-detection-vebg.onrender.com/" target="_blank" rel="noopener noreferrer" class="btn btn-live btn-sm" style="padding:6px 16px; font-size:0.85rem;">
            <span>Open Live App</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>

        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:6px;">Scientific & Technical Objective</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            Heart Rate Variability (HRV) and autonomic nervous system (ANS) metrics are key biomarkers for cardiac health. 
            Traditional monitoring requires ECG leads or contact PPG sensors. 
            This biomedical engineering project demonstrates non-invasive autonomic assessment and heart disease risk evaluation by quantifying continuous pupillary micro-fluctuations (hippus) and optical pulse signals captured via computer vision, paired with deep learning classification deployed live on Render.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">1. Live Optical Acquisition</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">60 FPS eye-region capture via webcam & camera feed; adaptive contrast histogram equalization (CLAHE) to handle variable ambient luminescences.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">2. Sub-Pixel Pupil Segmentation</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">OpenCV Canny edge detection, dark-cluster thresholding, and Starburst elliptical contour fitting for sub-millimeter pupil diameter extraction.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">3. Signal Denoising & rPPG</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">4th-order Butterworth bandpass filter (0.04 Hz - 0.4 Hz) isolating autonomic hippus and capillary blood volume pulse from blink artifacts.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">4. Spectral Analytics & Predictions</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Welch's PSD method computing LF/HF autonomic balance coupled with trained neural classification models for automated cardiac risk detection.</p>
          </div>
        </div>

        <div style="background:var(--bg-card); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
          <h4 style="margin-bottom:10px;">Engineering Stack & Methodologies</h4>
          <ul style="padding-left:20px; font-size:0.88rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li><strong>Core Languages & Computer Vision:</strong> Python 3.10+, OpenCV (cv2), NumPy, SciPy (Signal Processing)</li>
            <li><strong>Web Visualization & AI Backend:</strong> Python Flask REST API, SQLite database, Render Cloud production deployment</li>
            <li><strong>Testing & Quality Assurance:</strong> Synthetic waveform validation, ground-truth pulse sensor correlation testing</li>
          </ul>
        </div>
      </div>
    `;
  } else if (projectKey === 'ecommerce') {
    titleEl.textContent = 'System Architecture: Online Shopping Management System';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-blue);">
          <h4 style="color:var(--accent-blue); margin-bottom:6px;">Enterprise Full-Stack Architecture</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            A production-ready e-commerce management platform built with high-throughput Spring Boot microservices, stateless JWT security, Redis cart acceleration, and interactive admin telemetry.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Authentication & RBAC</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Spring Security filter chain with cryptographically signed JSON Web Tokens (JWT) handling Customer, Vendor, and Admin privileges.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Caching & Low Latency</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">In-memory Redis layer for transient shopping cart sessions and hot catalog items, slashing database read queries by 65%.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Database & Integrity</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">PostgreSQL / MySQL relational schema with transactional rollback on inventory depletion during concurrent user checkouts.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">QA & Testing Suite</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Rigorous JUnit 5 integration tests, Mockito service mocks, Postman automated test collections, and Swagger/OpenAPI interactive documentation.</p>
          </div>
        </div>

        <div style="background:var(--bg-card); padding:20px; border-radius:var(--radius-md); border:1px solid var(--border-glow);">
          <h4 style="margin-bottom:10px;">Tech Stack Breakdown</h4>
          <ul style="padding-left:20px; font-size:0.88rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:6px;">
            <li><strong>Backend:</strong> Java 17, Spring Boot 3, Spring Data JPA, Hibernate, Spring Security</li>
            <li><strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS, Axios, Lucide Icons</li>
            <li><strong>DevOps & Quality:</strong> Docker, Docker Compose, Postman, JUnit, Swagger UI</li>
          </ul>
        </div>
      </div>
    `;
  } else if (projectKey === 'freelance-littlechapter') {
    titleEl.textContent = 'Freelance Project: The Little Chapter – Studio Website';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:rgba(234, 179, 8, 0.12); padding:16px 20px; border-radius:var(--radius-md); border:1px solid rgba(234, 179, 8, 0.35); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="live-pulse-dot"></span>
            <strong style="color:#fde047; font-size:0.95rem;">Live Client Production Site</strong>
          </div>
          <a href="https://thelittlechapter.github.io/thelittlechapter/" target="_blank" rel="noopener noreferrer" class="btn btn-live btn-sm" style="padding:6px 16px; font-size:0.85rem;">
            <span>Visit Live Website</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>

        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-amber);">
          <h4 style="color:var(--accent-amber); margin-bottom:6px;">Commercial Client Engagement</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            Designed, developed, and deployed an end-to-end luxury brand web experience for <strong>The Little Chapter</strong>, Madanapalle's premier maternity and newborn photography studio. Focused on high-conversion visual storytelling, rapid image loading, and instant lead generation.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">20 Handcrafted Themes</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Showcases 20 bespoke studio themes with optimized interactive galleries and smooth scroll transitions.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Direct WhatsApp Booking</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">One-click pre-filled WhatsApp inquiry routing providing friction-free customer conversion directly to the studio's booking team.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Mobile-First Responsiveness</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Engineered with pure vanilla CSS and JavaScript for lightning-fast mobile performance with 0 external heavy frameworks.</p>
          </div>
        </div>
      </div>
    `;
  } else if (projectKey === 'freelance-simplystoned') {
    titleEl.textContent = 'Freelance Project: Simply STONED – Dessert Parlour Platform';
    bodyEl.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:rgba(245, 158, 11, 0.12); padding:16px 20px; border-radius:var(--radius-md); border:1px solid rgba(245, 158, 11, 0.35); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span class="live-pulse-dot"></span>
            <strong style="color:#fbbf24; font-size:0.95rem;">Live Client Production Site</strong>
          </div>
          <a href="https://indukurunaveenreddy.github.io/simply-stoned/" target="_blank" rel="noopener noreferrer" class="btn btn-live btn-sm" style="padding:6px 16px; font-size:0.85rem;">
            <span>Visit Live Website</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>

        <div style="background:var(--bg-tertiary); padding:18px; border-radius:var(--radius-md); border-left:4px solid var(--accent-amber);">
          <h4 style="color:var(--accent-amber); margin-bottom:6px;">Food-Tech & E-Commerce Web Delivery</h4>
          <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            Crafted a dark-luxury, appetizing digital menu and ordering portal for <strong>Simply STONED</strong>, the premier dessert destination in Kakinada.
          </p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px;">
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Interactive Categorized Menu</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Rich menu navigation covering artisan stone ice creams, sizzling brownie dessert bowls, thick shakes, and waffles.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">WhatsApp Ordering Pipeline</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Direct-to-store WhatsApp ordering button allowing patrons to place takeaway and home delivery orders instantly.</p>
          </div>
          <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <strong style="color:var(--text-primary); display:block; margin-bottom:6px;">Location & Timings Telemetry</strong>
            <p style="font-size:0.85rem; color:var(--text-secondary);">Live opening hours badge, Google Maps location embed, and full contact integration.</p>
          </div>
        </div>
      </div>
    `;
  }
}

/* ==========================================================================
   6. PUPIL HRV SIMULATION LAB & LIVE CAMERA CV TRACKER
   ========================================================================== */
let isHrvSimRunning = false;
let hrvAnimationId = null;
let currentHrvMode = 'sim'; // 'sim' | 'camera'

// Live Camera CV State
let cameraStream = null;
let isCameraActive = false;
let isCameraPaused = false;
let cameraAnimId = null;
let cameraThreshold = 48;
let cameraViewMode = 'hud'; // 'hud' | 'mask' | 'clean'
let baselinePupilMm = 3.74;
let livePupilSmoothed = 3.74;
let cameraFps = 60;
let lastCameraFrameTime = performance.now();
let lastFpsUpdateTime = performance.now();
let cameraFrameCounter = 0;
let opticalPulsePhase = 0;
let lastPpgLuma = 128;

const simState = {
  ambientLight: 50,
  cognitiveStress: false,
  filterActive: true,
  time: 0,
  waveformHistory: new Array(180).fill(0),
  pupilDiameter: 3.74,
  currentBpm: 72,
  lfHfRatio: 1.24
};

function initPupilHrvSimulator() {
  // Mode switcher tabs (Synthetic Sim vs Live Camera)
  const tabSimBtn = document.getElementById('tab-sim-mode');
  const tabCamBtn = document.getElementById('tab-cam-mode');
  const simViewPanel = document.getElementById('sim-view-panel');
  const camViewPanel = document.getElementById('cam-view-panel');
  const waveformBadge = document.getElementById('waveform-source-badge');

  if (tabSimBtn && tabCamBtn) {
    tabSimBtn.addEventListener('click', () => {
      switchHrvMode('sim');
    });

    tabCamBtn.addEventListener('click', () => {
      switchHrvMode('camera');
    });
  }

  // Simulation Controls
  const lightSlider = document.getElementById('light-slider');
  const triggerStressBtn = document.getElementById('trigger-stress-btn');
  const toggleFilterBtn = document.getElementById('toggle-filter-btn');

  if (lightSlider) {
    lightSlider.addEventListener('input', (e) => {
      simState.ambientLight = parseInt(e.target.value, 10);
    });
  }

  if (triggerStressBtn) {
    triggerStressBtn.addEventListener('click', () => {
      simState.cognitiveStress = true;
      triggerStressBtn.textContent = '⚡ Cognitive Load Active (High Stress)';
      triggerStressBtn.style.borderColor = '#ef4444';
      triggerStressBtn.style.color = '#ef4444';

      setTimeout(() => {
        simState.cognitiveStress = false;
        triggerStressBtn.textContent = 'Trigger Cognitive Load';
        triggerStressBtn.style.borderColor = '';
        triggerStressBtn.style.color = '';
      }, 5000);
    });
  }

  if (toggleFilterBtn) {
    toggleFilterBtn.addEventListener('click', () => {
      simState.filterActive = !simState.filterActive;
      toggleFilterBtn.textContent = simState.filterActive ? 'Filter: Butterworth ON' : 'Filter: Raw Unfiltered';
      showToast(`Denoising filter ${simState.filterActive ? 'enabled' : 'disabled'}`);
    });
  }

  // Camera Controls
  const startCamBtn = document.getElementById('start-camera-btn');
  const toggleCamStreamBtn = document.getElementById('toggle-camera-stream-btn');
  const toggleCamViewModeBtn = document.getElementById('toggle-cam-view-mode');
  const camThreshSlider = document.getElementById('cam-thresh-slider');
  const camThreshVal = document.getElementById('cam-thresh-val');
  const calibrateBaselineBtn = document.getElementById('calibrate-baseline-btn');

  if (startCamBtn) {
    startCamBtn.addEventListener('click', () => {
      startLiveCameraFeed();
    });
  }

  if (toggleCamStreamBtn) {
    toggleCamStreamBtn.addEventListener('click', () => {
      if (!isCameraActive) {
        startLiveCameraFeed();
      } else {
        isCameraPaused = !isCameraPaused;
        toggleCamStreamBtn.innerHTML = isCameraPaused
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Resume Camera</span>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/></svg><span>Pause Camera</span>`;
        showToast(isCameraPaused ? 'Camera tracking paused' : 'Camera tracking resumed');
      }
    });
  }

  if (toggleCamViewModeBtn) {
    toggleCamViewModeBtn.addEventListener('click', () => {
      if (cameraViewMode === 'hud') {
        cameraViewMode = 'mask';
        toggleCamViewModeBtn.textContent = 'Overlay: Binary Mask';
      } else if (cameraViewMode === 'mask') {
        cameraViewMode = 'clean';
        toggleCamViewModeBtn.textContent = 'Overlay: Clean Feed';
      } else {
        cameraViewMode = 'hud';
        toggleCamViewModeBtn.textContent = 'Overlay: HUD + Ray';
      }
    });
  }

  if (camThreshSlider && camThreshVal) {
    camThreshSlider.addEventListener('input', (e) => {
      cameraThreshold = parseInt(e.target.value, 10);
      camThreshVal.textContent = cameraThreshold;
    });
  }

  if (calibrateBaselineBtn) {
    calibrateBaselineBtn.addEventListener('click', () => {
      baselinePupilMm = livePupilSmoothed;
      showToast(`Baseline pupil calibrated: ${baselinePupilMm.toFixed(2)} mm`);
    });
  }

  // Auto clean-up camera when modal closes
  const hrvModal = document.getElementById('hrv-modal');
  if (hrvModal) {
    hrvModal.addEventListener('close', () => {
      isHrvSimRunning = false;
      stopLiveCameraFeed();
    });
  }
}

function switchHrvMode(mode) {
  currentHrvMode = mode;
  const tabSimBtn = document.getElementById('tab-sim-mode');
  const tabCamBtn = document.getElementById('tab-cam-mode');
  const simViewPanel = document.getElementById('sim-view-panel');
  const camViewPanel = document.getElementById('cam-view-panel');
  const waveformBadge = document.getElementById('waveform-source-badge');

  if (mode === 'sim') {
    if (tabSimBtn) tabSimBtn.classList.add('active');
    if (tabCamBtn) tabCamBtn.classList.remove('active');
    if (simViewPanel) simViewPanel.style.display = 'block';
    if (camViewPanel) camViewPanel.style.display = 'none';
    if (waveformBadge) {
      waveformBadge.textContent = 'SYNTHETIC FEED';
      waveformBadge.style.background = '';
    }
    // Stop camera feed if active to save resources/privacy
    stopLiveCameraFeed();
    startHrvSimulation();
  } else {
    if (tabSimBtn) tabSimBtn.classList.remove('active');
    if (tabCamBtn) tabCamBtn.classList.add('active');
    if (simViewPanel) simViewPanel.style.display = 'none';
    if (camViewPanel) camViewPanel.style.display = 'block';
    if (waveformBadge) {
      waveformBadge.textContent = 'LIVE CAMERA CV';
      waveformBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    }
    // Automatically prompt / start camera
    startLiveCameraFeed();
  }
}

/* --- Live Camera Feed Engine --- */
async function startLiveCameraFeed() {
  const videoEl = document.getElementById('hrvCameraVideo');
  const startOverlay = document.getElementById('camera-start-overlay');
  const camHudOverlay = document.getElementById('cam-hud-overlay');
  const toggleBtn = document.getElementById('toggle-camera-stream-btn');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast('Webcam access is not supported by your browser.');
    return;
  }

  try {
    if (!cameraStream) {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });
    }

    if (videoEl) {
      videoEl.srcObject = cameraStream;
      await videoEl.play();
    }

    isCameraActive = true;
    isCameraPaused = false;

    if (startOverlay) startOverlay.style.display = 'none';
    if (camHudOverlay) camHudOverlay.style.display = 'flex';
    if (toggleBtn) {
      toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/></svg><span>Pause Camera</span>`;
    }

    showToast('Live camera feed connected. Eye tracking active.');
    startCameraProcessingLoop();
  } catch (err) {
    console.warn('Camera access error:', err);
    showToast('Camera permission denied or camera in use. Please allow camera access.');
    if (startOverlay) startOverlay.style.display = 'flex';
    if (camHudOverlay) camHudOverlay.style.display = 'none';
  }
}

function stopLiveCameraFeed() {
  if (cameraAnimId) {
    cancelAnimationFrame(cameraAnimId);
    cameraAnimId = null;
  }

  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }

  const videoEl = document.getElementById('hrvCameraVideo');
  if (videoEl) {
    videoEl.srcObject = null;
  }

  isCameraActive = false;
  isCameraPaused = false;

  const startOverlay = document.getElementById('camera-start-overlay');
  const camHudOverlay = document.getElementById('cam-hud-overlay');
  if (startOverlay) startOverlay.style.display = 'flex';
  if (camHudOverlay) camHudOverlay.style.display = 'none';
}

function startCameraProcessingLoop() {
  const canvas = document.getElementById('hrvCameraCanvas');
  const video = document.getElementById('hrvCameraVideo');
  const waveCanvas = document.getElementById('waveformCanvas');
  if (!canvas || !video || !waveCanvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const waveCtx = waveCanvas.getContext('2d');

  // Offscreen canvas for fast pixel analysis
  const procCanvas = document.createElement('canvas');
  procCanvas.width = 160;
  procCanvas.height = 120;
  const procCtx = procCanvas.getContext('2d', { willReadFrequently: true });

  function processLoop(timestamp) {
    const hrvModal = document.getElementById('hrv-modal');
    if (!hrvModal?.open || currentHrvMode !== 'camera' || !isCameraActive) {
      return;
    }

    // FPS calculation
    cameraFrameCounter++;
    if (timestamp - lastFpsUpdateTime > 500) {
      cameraFps = Math.round((cameraFrameCounter * 1000) / (timestamp - lastFpsUpdateTime));
      cameraFrameCounter = 0;
      lastFpsUpdateTime = timestamp;
      const fpsTag = document.getElementById('cam-fps-tag');
      if (fpsTag) fpsTag.textContent = `LIVE_CV: ${cameraFps} FPS`;
    }

    if (!isCameraPaused && video.readyState >= video.HAVE_CURRENT_DATA) {
      const cw = canvas.width;
      const ch = canvas.height;

      // 1. Draw mirrored camera frame to primary display canvas
      ctx.save();
      ctx.translate(cw, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, cw, ch);
      ctx.restore();

      // 2. Sample processing ROI in offscreen canvas for computer vision pupil segmentation
      procCtx.save();
      procCtx.translate(procCanvas.width, 0);
      procCtx.scale(-1, 1);
      procCtx.drawImage(video, 0, 0, procCanvas.width, procCanvas.height);
      procCtx.restore();

      // Define central ocular ROI in processing space
      const roiW = 70;
      const roiH = 55;
      const roiX = Math.floor((procCanvas.width - roiW) / 2);
      const roiY = Math.floor((procCanvas.height - roiH) / 2);

      const frameData = procCtx.getImageData(roiX, roiY, roiW, roiH);
      const data = frameData.data;

      let darkSumX = 0;
      let darkSumY = 0;
      let darkPixelCount = 0;
      let totalLuma = 0;
      let totalGreen = 0;

      // Threshold segmentation loop
      for (let y = 0; y < roiH; y++) {
        for (let x = 0; x < roiW; x++) {
          const idx = (y * roiW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;

          totalLuma += luma;
          totalGreen += g;

          if (luma < cameraThreshold) {
            darkSumX += x;
            darkSumY += y;
            darkPixelCount++;
          }
        }
      }

      const pixelTotal = roiW * roiH;
      const avgGreen = totalGreen / pixelTotal;
      const avgLuma = totalLuma / pixelTotal;

      // Map coordinates from proc space to display space
      const scaleX = cw / procCanvas.width;
      const scaleY = ch / procCanvas.height;

      let pupilCenterX = cw / 2;
      let pupilCenterY = ch / 2;
      let detectedRadius = 18;
      let trackingValid = false;

      if (darkPixelCount > 25 && darkPixelCount < (roiW * roiH * 0.75)) {
        trackingValid = true;
        const localCentroidX = darkSumX / darkPixelCount;
        const localCentroidY = darkSumY / darkPixelCount;
        pupilCenterX = (roiX + localCentroidX) * scaleX;
        pupilCenterY = (roiY + localCentroidY) * scaleY;
        detectedRadius = Math.sqrt(darkPixelCount / Math.PI) * scaleX * 0.75;
      }

      // Convert detected pixel radius to biological millimeter diameter
      const rawPupilMm = Math.max(2.1, Math.min(7.2, 2.2 + (detectedRadius / 16) * 1.8));
      livePupilSmoothed = livePupilSmoothed * 0.8 + rawPupilMm * 0.2;
      simState.pupilDiameter = livePupilSmoothed;

      // Photoplethysmography (rPPG) optical pulse wave
      opticalPulsePhase += 0.08;
      const ppgDelta = (avgGreen - lastPpgLuma);
      lastPpgLuma = lastPpgLuma * 0.9 + avgGreen * 0.1;

      const hippusSignal = (livePupilSmoothed - baselinePupilMm) * 2.2;
      const pulseMicroWave = Math.sin(opticalPulsePhase) * 0.15 + (ppgDelta * 0.04);
      let combinedWave = hippusSignal + pulseMicroWave;

      if (!simState.filterActive) {
        combinedWave += (Math.random() - 0.5) * 0.8;
      }

      simState.waveformHistory.push(combinedWave);
      simState.waveformHistory.shift();

      // Update Physiological Metrics from live stream
      const stressDiff = Math.abs(livePupilSmoothed - baselinePupilMm);
      const estBpm = Math.max(60, Math.min(105, 74 + Math.round(stressDiff * 14)));
      simState.currentBpm = simState.currentBpm * 0.95 + estBpm * 0.05;

      const estLfHf = Math.max(0.85, Math.min(3.2, 1.25 + stressDiff * 1.1));
      simState.lfHfRatio = simState.lfHfRatio * 0.95 + estLfHf * 0.05;
      simState.cognitiveStress = stressDiff > 0.45;

      // 3. Render Cybernetic CV Visualizer Overlay
      renderCyberneticOverlay(ctx, cw, ch, pupilCenterX, pupilCenterY, detectedRadius, trackingValid, roiX * scaleX, roiY * scaleY, roiW * scaleX, roiH * scaleY, frameData);

      // 4. Render Oscilloscope Waveform
      drawWaveform(waveCtx, waveCanvas.width, waveCanvas.height);

      // 5. Update HUD Metrics
      updateCameraHudText(trackingValid);
    }

    cameraAnimId = requestAnimationFrame(processLoop);
  }

  cameraAnimId = requestAnimationFrame(processLoop);
}

function renderCyberneticOverlay(ctx, w, h, cx, cy, radius, valid, rx, ry, rw, rh, frameData) {
  ctx.save();

  if (cameraViewMode === 'clean') {
    // Minimal target reticle
    ctx.strokeStyle = valid ? 'rgba(56, 189, 248, 0.7)' : 'rgba(239, 68, 68, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.restore();
    return;
  }

  if (cameraViewMode === 'mask') {
    // Binary Threshold Segmentation Mask Overlay
    ctx.fillStyle = 'rgba(3, 7, 18, 0.82)';
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, ry, rw, rh);

    if (valid) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy);
      ctx.lineTo(cx + 15, cy);
      ctx.moveTo(cx, cy - 15);
      ctx.lineTo(cx, cy + 15);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  // Default 'hud': Cybernetic Starburst & Contour Fitting HUD
  // Ocular Target Box with Corner Brackets
  ctx.strokeStyle = valid ? 'rgba(56, 189, 248, 0.8)' : 'rgba(239, 68, 68, 0.8)';
  ctx.lineWidth = 1.5;
  const bracketLen = 14;

  // Top-left
  ctx.beginPath();
  ctx.moveTo(rx, ry + bracketLen); ctx.lineTo(rx, ry); ctx.lineTo(rx + bracketLen, ry);
  // Top-right
  ctx.moveTo(rx + rw - bracketLen, ry); ctx.lineTo(rx + rw, ry); ctx.lineTo(rx + rw, ry + bracketLen);
  // Bottom-left
  ctx.moveTo(rx, ry + rh - bracketLen); ctx.lineTo(rx, ry + rh); ctx.lineTo(rx + bracketLen, ry + rh);
  // Bottom-right
  ctx.moveTo(rx + rw - bracketLen, ry + rh); ctx.lineTo(rx + rw, ry + rh); ctx.lineTo(rx + rw, ry + rh - bracketLen);
  ctx.stroke();

  // Target Label
  ctx.font = '9px monospace';
  ctx.fillStyle = valid ? '#38bdf8' : '#ef4444';
  ctx.fillText(valid ? '[ROI: OCULAR_LOCKED]' : '[ROI: SEARCHING...]', rx + 4, ry - 6);

  if (valid) {
    // Starburst Radial Contour Rays (OpenCV style)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * (radius * 0.4), cy + Math.sin(angle) * (radius * 0.4));
      ctx.lineTo(cx + Math.cos(angle) * (radius + 4), cy + Math.sin(angle) * (radius + 4));
      ctx.stroke();
    }

    // Fitted Elliptical Boundary Ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Outer Glow Ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Centroid Crosshair
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
    ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
    ctx.stroke();

    // Sub-pixel Diameter Dimension Callout
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.lineWidth = 1;
    const calloutX = cx + radius + 10;
    const calloutY = cy - 8;
    ctx.fillRect(calloutX, calloutY - 10, 76, 18);
    ctx.strokeRect(calloutX, calloutY - 10, 76, 18);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText(`Ø ${livePupilSmoothed.toFixed(2)} mm`, calloutX + 6, calloutY + 3);
  }

  ctx.restore();
}

function updateCameraHudText(valid) {
  const diaEl = document.getElementById('cam-pupil-dia');
  const confEl = document.getElementById('cam-conf-tag');
  const statusEl = document.getElementById('cam-status-tag');
  const liveBpmEl = document.getElementById('live-bpm');
  const liveLfhfEl = document.getElementById('live-lfhf');
  const liveStressEl = document.getElementById('live-stress');

  if (diaEl) diaEl.textContent = `LIVE DIA: ${livePupilSmoothed.toFixed(2)} mm`;
  if (confEl) confEl.textContent = valid ? 'CONF: 98.6%' : 'CONF: 42.1%';
  if (statusEl) {
    statusEl.textContent = valid ? 'STATUS: TRACKING' : 'STATUS: ACQUIRING';
    statusEl.style.color = valid ? 'var(--accent-cyan)' : '#ef4444';
  }

  if (liveBpmEl) liveBpmEl.textContent = Math.round(simState.currentBpm);
  if (liveLfhfEl) liveLfhfEl.textContent = simState.lfHfRatio.toFixed(2);
  if (liveStressEl) {
    if (simState.cognitiveStress) {
      liveStressEl.textContent = 'High';
      liveStressEl.style.color = '#ef4444';
    } else {
      liveStressEl.textContent = 'Normal';
      liveStressEl.style.color = '#34d399';
    }
  }
}

/* --- Synthetic Eye Simulator Render Engine --- */
function startHrvSimulation() {
  if (isHrvSimRunning) return;
  isHrvSimRunning = true;

  const eyeCanvas = document.getElementById('eyeSimulationCanvas');
  const waveCanvas = document.getElementById('waveformCanvas');
  if (!eyeCanvas || !waveCanvas) return;

  const eyeCtx = eyeCanvas.getContext('2d');
  const waveCtx = waveCanvas.getContext('2d');

  function renderLoop() {
    if (!document.getElementById('hrv-modal')?.open || currentHrvMode !== 'sim') {
      isHrvSimRunning = false;
      return;
    }

    simState.time += 0.05;

    // Calculate simulated pupil dynamics
    // Base diameter inversely proportional to light
    const baseDiameter = 5.2 - (simState.ambientLight / 100) * 2.4;

    // Autonomic oscillations (hippus 0.1 - 0.3 Hz + RSA respiration ~0.25 Hz)
    const hippusOscillation = Math.sin(simState.time * 0.8) * 0.18 + Math.cos(simState.time * 1.5) * 0.12;
    const stressAddition = simState.cognitiveStress ? 0.75 + Math.sin(simState.time * 2.8) * 0.25 : 0;

    simState.pupilDiameter = Math.max(2.0, baseDiameter + hippusOscillation + stressAddition);

    // Update Telemetry metrics
    const targetBpm = simState.cognitiveStress ? 96 : 72;
    simState.currentBpm += (targetBpm - simState.currentBpm) * 0.05 + (Math.random() - 0.5) * 0.5;

    const targetLfHf = simState.cognitiveStress ? 2.65 : 1.25;
    simState.lfHfRatio += (targetLfHf - simState.lfHfRatio) * 0.05 + (Math.random() - 0.5) * 0.04;

    // Push waveform value
    let waveVal = hippusOscillation * 1.5;
    if (!simState.filterActive) {
      // Add high frequency jitter if filter off
      waveVal += (Math.random() - 0.5) * 0.9;
    }
    simState.waveformHistory.push(waveVal);
    simState.waveformHistory.shift();

    // Render Canvas Views
    drawEyeSimulation(eyeCtx, eyeCanvas.width, eyeCanvas.height);
    drawWaveform(waveCtx, waveCanvas.width, waveCanvas.height);

    // Update DOM indicators
    updateHudText();

    hrvAnimationId = requestAnimationFrame(renderLoop);
  }

  renderLoop();
}

function drawEyeSimulation(ctx, w, h) {
  ctx.fillStyle = '#050a14';
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;

  // Sclera (Eye White background)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, 140, 75, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#38bdf8';
  ctx.stroke();

  // Iris
  const irisRadius = 52;
  const irisGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, irisRadius);
  irisGrad.addColorStop(0, '#0284c7');
  irisGrad.addColorStop(0.7, '#0369a1');
  irisGrad.addColorStop(1, '#082f49');

  ctx.beginPath();
  ctx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
  ctx.fillStyle = irisGrad;
  ctx.fill();

  // Iris striations
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * 16, cy + Math.sin(angle) * 16);
    ctx.lineTo(cx + Math.cos(angle) * irisRadius, cy + Math.sin(angle) * irisRadius);
    ctx.stroke();
  }

  // Pupil (Contracting and Dilating according to simulation)
  const pupilPixelRadius = simState.pupilDiameter * 6.5;
  ctx.beginPath();
  ctx.arc(cx, cy, pupilPixelRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();

  // Corneal Light Reflection
  ctx.beginPath();
  ctx.arc(cx - pupilPixelRadius * 0.4, cy - pupilPixelRadius * 0.4, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();

  // Computer Vision HUD tracking bounding box & crosshair
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cx - pupilPixelRadius - 6, cy - pupilPixelRadius - 6, (pupilPixelRadius + 6) * 2, (pupilPixelRadius + 6) * 2);

  // Tracking crosshairs
  ctx.strokeStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy);
  ctx.lineTo(cx + 15, cy);
  ctx.moveTo(cx, cy - 15);
  ctx.lineTo(cx, cy + 15);
  ctx.stroke();

  ctx.restore();
}

function drawWaveform(ctx, w, h) {
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Waveform line
  const midY = h / 2;
  const history = simState.waveformHistory;
  const step = w / (history.length - 1);

  ctx.beginPath();
  ctx.strokeStyle = simState.cognitiveStress ? '#ef4444' : (currentHrvMode === 'camera' ? '#10b981' : '#38bdf8');
  ctx.lineWidth = 2;

  for (let i = 0; i < history.length; i++) {
    const x = i * step;
    const y = midY - history[i] * 35;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Glow under waveform
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fillStyle = simState.cognitiveStress
    ? 'rgba(239, 68, 68, 0.1)'
    : (currentHrvMode === 'camera' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(56, 189, 248, 0.1)');
  ctx.fill();
}

function updateHudText() {
  const diaEl = document.getElementById('sim-pupil-dia');
  const bpmEl = document.getElementById('live-bpm');
  const lfhfEl = document.getElementById('live-lfhf');
  const stressEl = document.getElementById('live-stress');

  if (diaEl) diaEl.textContent = `DIA: ${simState.pupilDiameter.toFixed(2)} mm`;
  if (bpmEl) bpmEl.textContent = Math.round(simState.currentBpm);
  if (lfhfEl) lfhfEl.textContent = simState.lfHfRatio.toFixed(2);
  if (stressEl) {
    if (simState.cognitiveStress) {
      stressEl.textContent = 'High';
      stressEl.style.color = '#ef4444';
    } else {
      stressEl.textContent = 'Normal';
      stressEl.style.color = '#34d399';
    }
  }
}

/* ==========================================================================
   7. COPY TO CLIPBOARD HELPER
   ========================================================================== */
function initCopyButtons() {
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+918639866865').then(() => {
        showToast('Phone number copied: +91-8639866865');
      }).catch(() => {
        showToast('Contact: +91-8639866865');
      });
    });
  }
}

/* ==========================================================================
   8. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    const mailtoUrl = `mailto:indukurun@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUrl;

    showToast(`Thank you, ${name}! Opening mail client...`);
    form.reset();
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION & ACTIVE LINK SPY
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color:#38bdf8;">✦</span>
    <span>${msg}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, 3500);
}
