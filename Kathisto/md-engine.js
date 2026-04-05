/**
 * md-engine.js
 * Shared Markdown rendering engine for all pages.
 * Requires: markdown-it, katex, markdown-it-texmath, DOMPurify (loaded before this script).
 *
 * Public API:
 *   MdEngine.render(markdownText, rootEl, tocEl)
 *     - Renders markdown into rootEl, building TOC links in tocEl.
 *   MdEngine.setupDragDrop(callback)
 *     - Wires up drag-and-drop of .md files, calls callback(markdownText).
 */

window.MdEngine = (() => {
    let _md = null;

    function _getEngine() {
        if (!_md) {
            _md = window.markdownit({ html: true }).use(
                window.texmath,
                { engine: window.katex, delimiters: 'dollars' }
            );
        }
        return _md;
    }

    function _createSection(id) {
        const sec = document.createElement('section');
        sec.id = id || `sec-${Math.random().toString(36).substr(2, 5)}`;
        sec.className = 'section-box';
        return sec;
    }

    function _setupObserver(rootEl, tocEl) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    tocEl.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { threshold: 0.1 });

        rootEl.querySelectorAll('.section-box').forEach(s => observer.observe(s));
    }

    /**
     * Render markdown text into rootEl, with TOC links added to tocEl.
     * @param {string} markdownText
     * @param {HTMLElement} rootEl   - container to render content into
     * @param {HTMLElement} tocEl    - sidebar nav element to populate
     */
    function render(markdownText, rootEl, tocEl) {
        const md = _getEngine();

        const rawHtml = md.render(markdownText);
        const cleanHtml = DOMPurify.sanitize(rawHtml, {
            ADD_TAGS: ['math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'mspace',
                       'annotation', 'semantics', 'img']
        });

        const temp = document.createElement('div');
        temp.innerHTML = cleanHtml;
        const nodes = Array.from(temp.children);

        rootEl.innerHTML = '';
        tocEl.innerHTML = '';

        let currentSection = _createSection('start');
        
        let navItems = [];
        let stack = [];

        nodes.forEach(node => {
            const hMatch = node.tagName.match(/^H([1-6])$/);
            if (hMatch) {
                const level = parseInt(hMatch[1]);
                rootEl.appendChild(currentSection);
                
                const safeId = node.innerText.toLowerCase().replace(/[^\w]+/g, '-');
                
                // Allow dynamic classes like sub-level-3
                const className = level > 1 ? `sub-level-${level}` : '';
                const navItem = {
                    title: node.innerText,
                    href: `#${safeId}`,
                    className: className,
                    children: []
                };

                if (level === 1) {
                    navItems.push(navItem);
                    stack = [{ level: 1, item: navItem }];
                } else {
                    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
                        stack.pop();
                    }
                    if (stack.length > 0) {
                        stack[stack.length - 1].item.children.push(navItem);
                        stack.push({ level: level, item: navItem });
                    } else {
                        navItems.push(navItem);
                        stack = [{ level: level, item: navItem }];
                    }
                }

                currentSection = _createSection(safeId);
            }
            currentSection.appendChild(node.cloneNode(true));
        });

        rootEl.appendChild(currentSection);
        
        if (window.Layout && window.Layout.renderNavItems) {
            window.Layout.renderNavItems(navItems, tocEl.id);
        }

        _setupObserver(rootEl, tocEl);

        // Apply Syntax Highlighting if loaded
        if (window.hljs) {
            rootEl.querySelectorAll('pre code').forEach(block => {
                window.hljs.highlightElement(block);
            });
        }
    }

    /**
     * Wire up drag-and-drop of .md files onto the window.
     * @param {function(string)} callback - called with file text content
     */
    function setupDragDrop(callback) {
        window.addEventListener('dragover', e => {
            e.preventDefault();
            document.body.style.opacity = '0.5';
        });
        window.addEventListener('dragleave', () => {
            document.body.style.opacity = '1';
        });
        window.addEventListener('drop', e => {
            e.preventDefault();
            document.body.style.opacity = '1';
            const file = e.dataTransfer.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => callback(ev.target.result);
                reader.readAsText(file);
            }
        });
    }

    return { render, setupDragDrop };
})();
