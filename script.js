
    /* ── DOM REFS ── */
    const loader      = document.getElementById('loader');
    const progressBar = document.getElementById('progressBar');
    const cursorGlow  = document.getElementById('cursorGlow');
    const themeToggle = document.getElementById('themeToggle');
    const menuBtn     = document.getElementById('menuBtn');
    const navMenu     = document.getElementById('navMenu');
    const navLinks    = [...document.querySelectorAll('nav ul li a')];
    const revealEls   = document.querySelectorAll('.reveal');
    const typingEl    = document.getElementById('typing');
    const projModal   = document.getElementById('projectModal');
    const modalClose  = document.getElementById('modalClose');
    const modalBack   = document.getElementById('modalBack');
    const contactForm = document.getElementById('contactForm');
    const formStatus  = document.getElementById('formStatus');
    const formBtn     = document.getElementById('formSubmitBtn');
    const root        = document.documentElement;

    /* ── LOADER ── */
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 900);
    });

    /* ── CURSOR GLOW ── */
    document.addEventListener('pointermove', e => {
      cursorGlow.style.setProperty('--cx', e.clientX + 'px');
      cursorGlow.style.setProperty('--cy', e.clientY + 'px');
    });

    /* ── SCROLL PROGRESS ── */
    window.addEventListener('scroll', () => {
      const s = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = s > 0 ? (window.scrollY / s * 100) + '%' : '0%';
    }, { passive: true });

    /* ── THEME ── */
    const updateThemeLabel = () => {
      const l = root.classList.contains('light-theme');
      themeToggle.setAttribute('aria-label', l ? 'Switch to dark theme' : 'Switch to light theme');
    };
    updateThemeLabel();
    themeToggle.addEventListener('click', () => {
      const l = root.classList.toggle('light-theme');
      try { localStorage.setItem('portfolioTheme', l ? 'light' : 'dark'); } catch(e) {}
      updateThemeLabel();
    });

    /* ── MOBILE MENU ── */
    menuBtn.addEventListener('click', () => {
      const open = navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.innerHTML = open
        ? '<i class="fas fa-xmark" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });
    navLinks.forEach(l => l.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
    }));

    /* ── REVEAL ON SCROLL ── */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          /* trigger skill bars */
          e.target.querySelectorAll('.skill-card').forEach(c => c.classList.add('visible'));
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));

    /* ── ACTIVE NAV ── */
    const sectionObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    document.querySelectorAll('main section[id], section[id]').forEach(s => sectionObs.observe(s));

    /* ── TYPING EFFECT ── */
    const roles = [
      'Frontend Developer', 'React Developer', 'Java Programmer',
      'Python Enthusiast', 'Data Analytics Learner',
      'Tableau Dashboard Builder', 'Full-Stack Learner', 'UI/UX Explorer'
    ];
    let ri = 0, ci = 0, deleting = false;
    function typeRole() {
      const r = roles[ri];
      typingEl.textContent = r.slice(0, ci);
      if (!deleting && ci < r.length) { ci++; }
      else if (deleting && ci > 0) { ci--; }
      if (ci === r.length) { deleting = true; setTimeout(typeRole, 1200); return; }
      if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      setTimeout(typeRole, deleting ? 42 : 78);
    }
    typeRole();

    /* ── PROJECT MODAL DATA ── */
    const projects = {
      career: {
        icon: 'fas fa-route',
        title: 'Career Path Prediction',
        desc: 'A machine learning project designed to help students explore suitable career paths based on their academic performance, skills, and interests — turning structured data into actionable guidance.',
        points: [
          'Collected and structured student-oriented feature data including grades, skills, and subject strengths.',
          'Implemented data cleaning and preprocessing pipelines using Pandas and NumPy.',
          'Trained a classification model using Scikit-learn to predict career suitability across multiple fields.',
          'Focused on interpreting model output into clear, understandable recommendations for end users.',
          'Documented the full workflow including data exploration, feature selection, and model evaluation metrics.'
        ],
        tags: ['Python', 'Machine Learning', 'Pandas', 'Scikit-learn', 'NumPy'],
        github: 'https://github.com/divyanshm-10'
      },
      library: {
        icon: 'fas fa-book-open-reader',
        title: 'Digital Library System',
        desc: 'A complete web-based library management system built to handle book cataloguing, user registration, borrowing records, and admin operations — an end-to-end PHP + MySQL web application.',
        points: [
          'Designed a normalised relational database schema for books, users, and transaction records.',
          'Built CRUD operations for book and user management using PHP server-side logic.',
          'Implemented issue and return tracking with date validation and overdue detection.',
          'Created an admin dashboard for managing inventory, viewing reports, and handling user requests.',
          'Practised form validation, session management, and SQL injection prevention basics.'
        ],
        tags: ['PHP', 'MySQL', 'HTML/CSS', 'JavaScript', 'Web App'],
        github: 'https://github.com/divyanshm-10'
      },
      titanic: {
        icon: 'fas fa-chart-line',
        title: 'EDA — Titanic Dataset',
        desc: 'An exploratory data analysis project using the classic Titanic dataset to investigate survival patterns, clean missing data, and communicate insights through clear visualisations.',
        points: [
          'Performed full data cleaning including handling missing Age and Cabin values with imputation strategies.',
          'Analysed survival rates segmented by passenger class, gender, age group, and embarkation point.',
          'Created visualisations using Matplotlib and Seaborn including heatmaps, bar charts, and distribution plots.',
          'Identified key correlations between features and survival probability — gender and class were strongest predictors.',
          'Documented findings with written explanations alongside each visualisation for clear communication of results.'
        ],
        tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'EDA'],
        github: 'https://github.com/divyanshm-10'
      }
    };

    function openModal(key) {
      const p = projects[key];
      if (!p) return;
      document.getElementById('modalIcon').innerHTML = `<i class="${p.icon}" aria-hidden="true"></i>`;
      document.getElementById('modalTitle').textContent = p.title;
      document.getElementById('modalDesc').textContent = p.desc;
      document.getElementById('modalList').innerHTML = p.points.map(pt =>
        `<li><i class="fas fa-check" aria-hidden="true"></i><span>${pt}</span></li>`).join('');
      document.getElementById('modalTags').innerHTML = p.tags.map(t =>
        `<span class="proj-tag">${t}</span>`).join('');
      document.getElementById('modalGithub').href = p.github;
      projModal.classList.add('active');
      projModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modalClose.focus();
    }
    function closeModal() {
      projModal.classList.remove('active');
      projModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
    document.querySelectorAll('.proj-detail-btn').forEach(btn =>
      btn.addEventListener('click', () => openModal(btn.dataset.project)));
    modalClose.addEventListener('click', closeModal);
    modalBack.addEventListener('click', closeModal);
    projModal.addEventListener('click', e => { if (e.target === projModal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && projModal.classList.contains('active')) closeModal(); });

    /* ── CONTACT FORM ── */
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      formBtn.disabled = true;
      formBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>Sending…';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const action = contactForm.getAttribute('action');

      /*
        If you haven't set up Formspree yet (action still contains "YOUR_FORM_ID"),
        fall back to mailto so the form still does something useful.
      */
      if (action.includes('YOUR_FORM_ID')) {
        const fd  = new FormData(contactForm);
        const sub = encodeURIComponent(fd.get('subject') || 'Portfolio enquiry');
        const bdy = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\n\n${fd.get('message')}`);
        window.location.href = `mailto:divyanshm989@gmail.com?subject=${sub}&body=${bdy}`;
        formStatus.textContent = 'Opening your email app…';
        formStatus.className = 'form-status success';
        formBtn.disabled = false;
        formBtn.innerHTML = '<i class="fas fa-paper-plane"></i>Send Message';
        return;
      }

      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          formStatus.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        formStatus.textContent = 'Something went wrong. Please email me directly at divyanshm989@gmail.com';
        formStatus.className = 'form-status error';
      }

      formBtn.disabled = false;
      formBtn.innerHTML = '<i class="fas fa-paper-plane"></i>Send Message';
    });
