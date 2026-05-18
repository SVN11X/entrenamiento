(() => {
    const backToTopBtn = document.getElementById('backToTop');
    const navBar = document.getElementById('navBar');
    const navLinks = Array.from(document.querySelectorAll('.nav-inner a'));

    const weekPlans = {
        1: { phase: 'Semanas 1–2: adaptación real', intensity: 'máximo 6/10', focus: 'usar la cancha sin perseguir todas las pelotas; técnica suave y descansos reales.' },
        2: { phase: 'Semanas 1–2: adaptación real', intensity: 'máximo 6/10', focus: 'repetir la base, cuidar espalda/glúteo y salir entero de cada sesión.' },
        3: { phase: 'Semanas 3–4: construcción', intensity: '6–7/10', focus: 'subir volumen de pases, conducción y cambios de dirección controlados.' },
        4: { phase: 'Semanas 3–4: construcción', intensity: '6–7/10', focus: 'mejorar recuperación entre esfuerzos sin convertir todos los días en partido.' },
        5: { phase: 'Semanas 5–6: intensidad controlada', intensity: '7–8/10 en bloques puntuales', focus: 'acercarse al ritmo real, manteniendo viernes como descarga técnica.' },
        6: { phase: 'Semanas 5–6: intensidad controlada', intensity: '7–8/10 en bloques puntuales', focus: 'tolerar bloques más largos y elegir cuándo acelerar.' },
        7: { phase: 'Semanas 7–8: transferencia', intensity: 'ritmo de partido controlado', focus: 'priorizar decisiones de juego, desmarques y remates con técnica.' },
        8: { phase: 'Semanas 7–8: transferencia', intensity: 'ritmo de partido controlado', focus: 'llegar a la pichanga con confianza, recuperación y menor sensación de ahogo.' }
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
        const scrollPos = window.scrollY + navHeight + 28;
        let currentId = '';
        getSections().forEach((section) => {
            if (section.el.offsetTop <= scrollPos) currentId = section.id;
        });
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    function handleNavClick(event) {
        const targetId = event.currentTarget.getAttribute('href')?.replace('#', '');
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;
        event.preventDefault();
        const navHeight = navBar?.offsetHeight || 0;
        window.scrollTo({ top: target.offsetTop - navHeight - 12, behavior: 'smooth' });
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
                summary.innerHTML = `<strong>Semana ${week} · ${selected.phase}</strong> Intensidad: ${selected.intensity}. Foco: ${selected.focus}`;
            }
            localStorage.setItem('entrenamientoSemana', String(week));
        };
        buttons.forEach((button) => button.addEventListener('click', () => update(Number(button.dataset.week))));
        update(savedWeek);
    }

    function setupDayTabs() {
        const tabs = Array.from(document.querySelectorAll('.day-tab'));
        const panels = Array.from(document.querySelectorAll('.day-panel'));
        const openDetailsButton = document.getElementById('openDayBlocks');
        const savedDay = localStorage.getItem('entrenamientoDia') || 'lunes';

        const activate = (day) => {
            tabs.forEach((tab) => {
                const isActive = tab.dataset.day === day;
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', String(isActive));
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });
            panels.forEach((panel) => {
                const isActive = panel.dataset.day === day;
                panel.hidden = !isActive;
            });
            localStorage.setItem('entrenamientoDia', day);
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => activate(tab.dataset.day));
            tab.addEventListener('keydown', (event) => {
                if (!['ArrowRight', 'ArrowLeft'].includes(event.key)) return;
                event.preventDefault();
                const index = tabs.indexOf(tab);
                const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
                tabs[nextIndex].focus();
                activate(tabs[nextIndex].dataset.day);
            });
        });

        if (openDetailsButton) {
            openDetailsButton.addEventListener('click', () => {
                const activePanel = panels.find((panel) => !panel.hidden);
                if (!activePanel) return;
                activePanel.querySelectorAll('details').forEach((detail) => { detail.open = true; });
            });
        }

        activate(tabs.some((tab) => tab.dataset.day === savedDay) ? savedDay : 'lunes');
    }

    function setupAccordions() {
        document.querySelectorAll('.block-list').forEach((list) => {
            const detailsEls = Array.from(list.querySelectorAll('details'));
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

    setupWeekSelector();
    setupDayTabs();
    setupAccordions();
    registerServiceWorker();
    toggleBackToTop();
    updateActiveNav();
})();
