(() => {
    const backToTopBtn = document.getElementById('backToTop');
    const navBar = document.getElementById('navBar');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    const navLinks = Array.from(document.querySelectorAll('.nav-inner a, .brand'));

    const weekPlans = {
        1: { phase: 'Adaptación inicial', intensity: '5/10', focus: 'conocer ejercicios, cuidar técnica y registrar sensaciones sin perseguir intensidad.' },
        2: { phase: 'Adaptación inicial', intensity: '5–6/10', focus: 'repetir estructura, sumar continuidad y mantener martes/miércoles como recuperación.' },
        3: { phase: 'Construcción', intensity: '6/10', focus: 'aumentar repeticiones técnicas, pases y conducción con pausas ordenadas.' },
        4: { phase: 'Construcción', intensity: '6–7/10', focus: 'mejorar cambios de dirección y recuperación entre esfuerzos cortos.' },
        5: { phase: 'Intensidad controlada', intensity: '7/10', focus: 'incluir bloques exigentes, sin convertir viernes ni domingo en días fuertes obligatorios.' },
        6: { phase: 'Intensidad controlada', intensity: '7–8/10', focus: 'sostener ritmo en juego reducido y seguir monitoreando fatiga/dolor.' },
        7: { phase: 'Transferencia al juego', intensity: 'ritmo de partido controlado', focus: 'priorizar decisiones: pase, apoyo, presión, finalización y lectura previa.' },
        8: { phase: 'Transferencia al juego', intensity: '7–8/10 selectivo', focus: 'consolidar confianza y cerrar con registro comparativo de progreso.' }
    };

    function toggleBackToTop() {
        if (!backToTopBtn) return;
        backToTopBtn.classList.toggle('visible', window.scrollY > 520);
    }

    function getSections() {
        return Array.from(document.querySelectorAll('main section[id], header[id]'));
    }

    function updateActiveNav() {
        const navHeight = navBar?.offsetHeight || 0;
        const scrollPos = window.scrollY + navHeight + 44;
        let currentId = 'inicio';

        getSections().forEach((section) => {
            if (section.offsetTop <= scrollPos) currentId = section.id;
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    function handleNavClick(event) {
        const href = event.currentTarget.getAttribute('href');
        if (!href?.startsWith('#')) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        const navHeight = navBar?.offsetHeight || 0;
        window.scrollTo({ top: target.offsetTop - navHeight - 12, behavior: 'smooth' });
        mainNav?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
    }

    function setupMobileNav() {
        if (!navToggle || !mainNav) return;
        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    function setupWeekSelector() {
        const savedWeek = Number(localStorage.getItem('entrenamientoSemana')) || 1;
        const summary = document.getElementById('weekSummary');
        const buttons = Array.from(document.querySelectorAll('.week-btn'));
        const update = (week) => {
            const selected = weekPlans[week] || weekPlans[1];
            buttons.forEach((button) => {
                const isActive = button.dataset.week === String(week);
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
            if (summary) {
                summary.innerHTML = `<strong>Semana ${week} · ${selected.phase}</strong> Intensidad sugerida: ${selected.intensity}. Foco: ${selected.focus}`;
            }
            localStorage.setItem('entrenamientoSemana', String(week));
        };
        buttons.forEach((button) => button.addEventListener('click', () => update(Number(button.dataset.week))));
        if (buttons.length) update(savedWeek);
    }

    function setupFilters() {
        const buttons = Array.from(document.querySelectorAll('.filter-btn'));
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                const filter = button.dataset.filter || 'all';
                const groupButtons = buttons.filter((item) => item.dataset.target === target);
                groupButtons.forEach((item) => {
                    const isActive = item === button;
                    item.classList.toggle('active', isActive);
                    item.setAttribute('aria-pressed', String(isActive));
                });

                const selector = target === 'exercise' ? '[data-exercise-type]' : '[data-training-type]';
                document.querySelectorAll(selector).forEach((card) => {
                    const types = target === 'exercise' ? card.dataset.exerciseType : card.dataset.trainingType;
                    const show = filter === 'all' || (types || '').split(' ').includes(filter);
                    card.classList.toggle('is-hidden', !show);
                });
            });
        });
    }

    function setupSessionToggle() {
        const toggle = document.getElementById('toggleSessions');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            const details = Array.from(document.querySelectorAll('[data-session-card]:not(.is-hidden) .session-details'));
            if (!details.length) return;
            const shouldOpen = details.some((detail) => !detail.open);
            details.forEach((detail) => { detail.open = shouldOpen; });
        });
    }

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        }
    }

    window.addEventListener('scroll', () => {
        toggleBackToTop();
        updateActiveNav();
    }, { passive: true });

    if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    setupMobileNav();
    setupWeekSelector();
    setupFilters();
    setupSessionToggle();
    registerServiceWorker();
    toggleBackToTop();
    updateActiveNav();
})();
