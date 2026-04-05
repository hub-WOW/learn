/**
 * layout.js
 * Injects the common sidebar and header into the page for maximum reusability.
 * 
 * Usage:
 *   Layout.init();
 */

window.Layout = (() => {
    const SIDEBAR_HTML = `
        <nav class="sidebar">
            <div class="logo-container">
                <img src="/resources/logo.svg" alt="WOW Logo" onerror="this.style.display='none';">
                <span class="logo-text">WOW</span>
            </div>
            <div class="nav-title">Navigation</div>
            <ul class="nav-list" id="sidebar-nav-list">
                <!-- Navigation links will be injected here -->
            </ul>
        </nav>
        <div class="sidebar-resize-handle" id="sidebarResizeHandle"></div>
    `;

    function init(config = {}) {
        // Find or create the sidebar container
        let sidebarWrapper = document.getElementById('sidebar-wrapper');
        if (!sidebarWrapper) {
            sidebarWrapper = document.createElement('div');
            sidebarWrapper.id = 'sidebar-wrapper';
            document.body.prepend(sidebarWrapper);
        }
        sidebarWrapper.innerHTML = SIDEBAR_HTML;

        _injectTopBar(config.topBarLinks || TOPBAR_LINKS);
        _setupResizeLogic();
    }

    function _injectTopBar(links) {
        let topBar = document.getElementById('top-bar');
        if (!topBar) {
            topBar = document.createElement('div');
            topBar.id = 'top-bar';
            document.body.appendChild(topBar);
        }

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const decodedPath = decodeURIComponent(currentPath);

        let html = '<div class="top-bar-wrapper">';

        function renderLinks(linkArray) {
            let res = '';
            linkArray.forEach(link => {
                const isActive = link.url === decodedPath ||
                    (decodedPath === '' && link.url === 'home.html') ||
                    (decodedPath === 'index.html' && link.url === 'home.html');

                const hasChildren = link.children && link.children.length > 0;

                res += `<div class="top-bar-item ${hasChildren ? 'has-dropdown' : ''}">`;
                res += `<a href="${link.url || '#'}" class="top-bar-link ${isActive ? 'active' : ''}">`;
                res += link.name;

                if (hasChildren) {
                    res += ` <svg class="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                }
                res += `</a>`;

                if (hasChildren) {
                    res += `<div class="top-bar-dropdown">`;
                    res += renderLinks(link.children);
                    res += `</div>`;
                }

                res += `</div>`;
            });
            return res;
        }

        html += renderLinks(links);
        html += '</div>';

        topBar.innerHTML = html;
    }

    function _setupResizeLogic() {
        const handle = document.getElementById('sidebarResizeHandle');
        if (!handle) return;

        let isDragging = false;

        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            handle.classList.add('dragging');
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const newWidth = Math.min(600, Math.max(200, e.clientX));
            document.documentElement.style.setProperty('--sidebar-width', newWidth + 'px');
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            handle.classList.remove('dragging');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });

        // Highlight active section on scroll
        window.addEventListener('scroll', () => {
            // Find headings or IDs that might be sections
            const sections = document.querySelectorAll('section.section-box, h2, h3, h4');
            const navLinks = document.querySelectorAll('.nav-link');

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - (window.innerHeight * 0.4)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href === `#${current}`) {
                    link.classList.add('active');

                    // Auto-expand parent groups
                    let parent = link.parentElement.closest('.sub-nav-list');
                    while (parent) {
                        parent.classList.add('open');
                        const btn = parent.previousElementSibling?.querySelector('.collapse-btn');
                        if (btn) btn.classList.add('open');
                        parent = parent.parentElement.closest('.sub-nav-list');
                    }
                } else {
                    link.classList.remove('active');
                }
            });
        });
    }

    /**
     * Helper to render static navigation items (like in index.html)
     * @param {Array} items - List of item objects { title, href, children: [] }
     */
    function renderNavItems(items, containerId = 'sidebar-nav-list') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        items.forEach(item => {
            const li = _createNavItem(item);
            container.appendChild(li);
        });
    }

    function _createNavItem(item) {
        const li = document.createElement('li');
        li.className = 'nav-item';

        const header = document.createElement('div');
        header.className = 'nav-item-header';

        const link = document.createElement('a');
        link.className = 'nav-link' + (item.className ? ' ' + item.className : '');
        link.href = item.href || '#';
        link.innerText = item.title;
        header.appendChild(link);

        if (item.children && item.children.length > 0) {
            const btn = document.createElement('button');
            btn.className = 'collapse-btn open';
            btn.onclick = () => _toggleSub(btn);
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>`;
            header.appendChild(btn);

            const subList = document.createElement('ul');
            subList.className = 'sub-nav-list open';
            item.children.forEach(child => {
                const childLi = _createNavItem(child);
                subList.appendChild(childLi);
            });
            li.appendChild(header);
            li.appendChild(subList);
        } else {
            li.appendChild(header);
        }

        return li;
    }

    function _toggleSub(btn) {
        btn.classList.toggle('open');
        const subList = btn.parentElement.nextElementSibling;
        if (subList) subList.classList.toggle('open');
    }

    /**
     * Renders a Hero section at the top of the content.
     * @param {string} containerId 
     * @param {object} options - { logo, title, subtitle, tagline }
     */
    function renderHero(containerId, options) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="hero-section">
                ${options.logo ? `<img src="${options.logo}" alt="Hero Logo" class="hero-logo" onerror="this.style.display='none'">` : ''}
                <h1 class="hero-title">${options.title || ''}</h1>
                ${options.subtitle ? `<p class="hero-subtitle">${options.subtitle}</p>` : ''}
                ${options.tagline ? `<p class="hero-tagline">${options.tagline}</p>` : ''}
            </div>
            <hr>
        `;
    }
    
    /**
     * Dynamically fetches, joins, and renders markdown modules for a complete unit.
     * @param {object} options - { hero: { title, subtitle, tagline, logo }, modules: ['url1', 'url2'] }
     */
    async function renderUnit(options) {
        if (options.hero) {
            renderHero('hero-wrapper', options.hero);
        }

        const root = document.getElementById('content');
        const navBase = document.getElementById('sidebar-nav-list');
        
        if (!root || !options.modules || !options.modules.length) return;
        
        try {
            const responses = await Promise.all(options.modules.map(url => fetch(url)));
            const texts = await Promise.all(responses.map(async r => {
                if (!r.ok) throw new Error(`Failed to fetch ${r.url}`);
                return r.text();
            }));
            
            const combinedContent = texts.join('\n ---\n');
            
            root.innerHTML = '';
            
            if (window.MdEngine) {
                window.MdEngine.render(combinedContent, root, navBase);
            }
            
            if (window.hljs) {
                window.hljs.highlightAll();
            }
        } catch (err) {
            console.error(err);
            root.innerHTML = '<p style="color: red;">Error loading modules. Please check the console.</p>';
        }
    }

    return { init, renderNavItems, renderHero, renderUnit };
})();
