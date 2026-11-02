// Theme toggle. Persists the choice and syncs the button state in both modes.
(function () {
    const KEY = 'ne-theme';
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');

    function apply(theme) {
        root.dataset.theme = theme;
        const dark = theme === 'dark';
        toggle.setAttribute('aria-pressed', String(dark));
        toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    toggle.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem(KEY, next); } catch (e) { /* storage unavailable */ }
    });

    // Follow OS changes only when the visitor has not picked a side.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        let stored = null;
        try { stored = localStorage.getItem(KEY); } catch (err) { /* storage unavailable */ }
        if (stored !== 'light' && stored !== 'dark') apply(e.matches ? 'dark' : 'light');
    });

    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');
})();

// Mobile menu.
(function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('site-nav');

    function setMenu(open) {
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.classList.toggle('nav-open', open);
    }

    hamburger.addEventListener('click', () => {
        setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', (e) => {
        if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', (e) => {
        if (document.body.classList.contains('nav-open') &&
            !nav.contains(e.target) && !hamburger.contains(e.target)) {
            setMenu(false);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
            setMenu(false);
            hamburger.focus();
        }
    });
})();

// Screenshot dialog.
(function () {
    const screens = {
        herbaguide: [
            { src: 'images/herbaguide-1.jpg', caption: 'HerbaGuide, home screen' },
            { src: 'images/herbaguide-2.jpg', caption: 'Plant scanning' },
            { src: 'images/herbaguide-3.jpg', caption: 'Results and information' },
            { src: 'images/herbaguide-4.jpg', caption: 'News section' }
        ],
        hospital: [
            { src: 'images/hospital-1.jpg', caption: 'Forecast result chart' }
        ],
        sensasi: [
            { src: 'images/sensasi-1.jpg', caption: 'Admin page' },
            { src: 'images/sensasi-2.jpg', caption: 'News page' },
            { src: 'images/sensasi-3.jpg', caption: 'Gallery' }
        ],
        restaurant: [
            { src: 'images/restaurant-1.jpg', caption: 'Restaurant system dashboard' }
        ],
        dormitory: [
            { src: 'images/dormitory-1.jpg', caption: 'Administrator data' },
            { src: 'images/dormitory-2.jpg', caption: 'Student records management' },
            { src: 'images/dormitory-3.jpg', caption: 'Student registration data' },
            { src: 'images/dormitory-4.jpg', caption: 'Room assignment interface' }
        ]
    };

    const modal = document.getElementById('screenshot-modal');
    const image = document.getElementById('modal-image');
    const caption = document.getElementById('modal-caption');
    const dots = document.getElementById('modal-dots');
    const closeBtn = document.getElementById('modal-close');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    let list = [];
    let index = 0;
    let lastTrigger = null;

    function render() {
        const item = list[index];
        image.src = item.src;
        image.alt = item.caption;
        caption.textContent = item.caption;
        [...dots.children].forEach((dot, i) => {
            if (i === index) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
        const single = list.length < 2;
        prevBtn.disabled = single;
        nextBtn.disabled = single;
    }

    function open(project, trigger) {
        list = screens[project] || [];
        if (!list.length) return;
        lastTrigger = trigger;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        index = 0;
        dots.innerHTML = '';
        list.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Show screenshot ' + (i + 1) + ' of ' + list.length);
            dot.addEventListener('click', () => { index = i; render(); });
            dots.appendChild(dot);
        });
        render();
        closeBtn.focus();
    }

    function close() {
        modal.hidden = true;
        image.src = '';
        document.body.style.overflow = '';
        if (lastTrigger) lastTrigger.focus();
        lastTrigger = null;
    }

    function step(delta) {
        if (list.length < 2) return;
        index = (index + delta + list.length) % list.length;
        render();
    }

    document.querySelectorAll('[data-project]').forEach((btn) => {
        btn.addEventListener('click', () => open(btn.dataset.project, btn));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.hidden) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
    });
})();

// Current-section highlight in the header nav.
(function () {
    const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    window.addEventListener('scroll', () => {
        const probe = window.scrollY + 120;
        let current = null;
        sections.forEach((section) => {
            if (probe >= section.offsetTop) current = section.id;
        });
        links.forEach((link) => {
            link.classList.toggle('is-current', link.getAttribute('href') === '#' + current);
        });
    }, { passive: true });
})();
