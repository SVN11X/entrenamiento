(() => {
    const backToTopBtn = document.getElementById('backToTop');
    const navBar = document.getElementById('navBar');
    const navLinks = Array.from(document.querySelectorAll('.nav-inner a'));

    const weekPlans = {
        1: { phase: 'Semanas 1–2: adaptación real', intensity: 'Máximo 6/10', focus: 'Crear base, cuidar espalda/glúteo y terminar sin dolor fuerte.' },
        2: { phase: 'Semanas 1–2: adaptación real', intensity: 'Máximo 6/10', focus: 'Repetir la base con mejor control, sin aumentar todo al mismo tiempo.' },
        3: { phase: 'Semanas 3–4: construcción', intensity: '6–7/10', focus: 'Subir volumen moderadamente, mejorar pases y tolerar más trabajo.' },
        4: { phase: 'Semanas 3–4: construcción', intensity: '6–7/10', focus: 'Consolidar técnica con balón y cambios de dirección controlados.' },
        5: { phase: 'Semanas 5–6: intensidad controlada', intensity: '7–8/10 en bloques puntuales', focus: 'Acercarse al ritmo real sin acumular fatiga excesiva.' },
        6: { phase: 'Semanas 5–6: intensidad controlada', intensity: '7–8/10 en bloques puntuales', focus: 'Mejorar recuperación entre piques y sostener bloques de juego.' },
        7: { phase: 'Semanas 7–8: transferencia', intensity: 'Ritmo de partido controlado', focus: 'Priorizar balón, decisiones de juego y pichanga sin ir al 100% todo el tiempo.' },
        8: { phase: 'Semanas 7–8: transferencia', intensity: 'Ritmo de partido controlado', focus: 'Llegar a jugar con más confianza, recuperación y técnica bajo cansancio.' }
    };

    function toggleBackToTop() {
        if (!backToTopBtn) return;
        backToTopBtn.classList.toggle('visible', window.scrollY > 500);
    }

    function getSections() {
        return navLinks
            .map((link) => {
                const id = link.getAttribute('href')?.replace('#', '');
                const el = id ? document.getElementById(id) : null;
                return el ? { id, el, link } : null;
            })
            .filter(Boolean);
    }

    function updateActiveNav() {
        const navHeight = navBar?.offsetHeight || 0;
        const scrollPos = window.scrollY + navHeight + 24;
        let currentId = '';
        getSections().forEach((section) => {
            if (section.el.offsetTop <= scrollPos) currentId = section.id;
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    function handleNavClick(event) {
        const link = event.currentTarget;
        const targetId = link.getAttribute('href')?.replace('#', '');
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;
        event.preventDefault();
        const navHeight = navBar?.offsetHeight || 0;
        const top = target.offsetTop - navHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    function setupAccordions() {
        document.querySelectorAll('.card').forEach((card) => {
            const detailsEls = Array.from(card.querySelectorAll('details'));
            detailsEls.forEach((detail) => {
                detail.addEventListener('toggle', function () {
                    if (!this.open) return;
                    detailsEls.forEach((sibling) => {
                        if (sibling !== this && sibling.open) sibling.open = false;
                    });
                });
            });
        });
    }

    function updateWeekSelector(week) {
        const selected = weekPlans[week] || weekPlans[1];
        const summary = document.getElementById('weekSummary');
        document.querySelectorAll('.week-btn').forEach((button) => {
            const isActive = button.dataset.week === String(week);
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
        if (summary) {
            summary.innerHTML = `<strong>Semana ${week} seleccionada · ${selected.phase}</strong>${selected.intensity}. Foco: ${selected.focus}`;
        }
        localStorage.setItem('entrenamientoSemana', String(week));
    }

    function setupWeekSelector() {
        const savedWeek = Number(localStorage.getItem('entrenamientoSemana')) || 1;
        document.querySelectorAll('.week-btn').forEach((button) => {
            button.addEventListener('click', () => updateWeekSelector(Number(button.dataset.week)));
        });
        updateWeekSelector(savedWeek);
    }

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').catch(() => {
                // El sitio sigue funcionando aunque el navegador no permita PWA/offline.
            });
        }
    }

    window.addEventListener('scroll', () => {
        toggleBackToTop();
        updateActiveNav();
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    setupAccordions();
    setupWeekSelector();
    registerServiceWorker();
    toggleBackToTop();
    updateActiveNav();
})();
