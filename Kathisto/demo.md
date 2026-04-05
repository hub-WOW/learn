```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUB-WOW - Your Page Title</title>

    <!-- External Dependencies (CDN) -->
    <!-- KaTeX: LaTeX Math Support -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>

    <!-- Markdown-it: Markdown Parser -->
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/dist/markdown-it.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it-texmath/texmath.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css">

    <!-- Highlight.js: Code Syntax Highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>

    <!-- DOMPurify: HTML Content Sanitization -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.6/purify.min.js"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet">

    <!-- Local Styles & Shared Logic -->
    <link rel="stylesheet" href="styles.css">
    <script src="layout.js"></script>
    <script src="md-engine.js"></script>
</head>

<body>
    <!-- Sidebar (Injected automatically by Layout.init()) -->
    <div id="sidebar-wrapper"></div>

    <main class="main-content">
        <!-- Reusable Hero Section (Injected by Layout.renderHero()) -->
        <div id="hero-wrapper"></div>

        <!-- Markdown Content Container -->
        <div class="content-container" id="app-root">
            <!-- Content rendered by MdEngine will appear here -->
        </div>
    </main>

    <script>
        // ─────────────────────────────────────────────────────────────────
        // TOP BAR CONFIG — edit this array to customise the top navigation
        // for THIS page. Use children arrays to create dropdown menus.
        // You NEVER need to touch layout.js to change this.
        // ─────────────────────────────────────────────────────────────────
        const TOP_BAR_LINKS = [
            { name: 'Home', url: 'home.html' },
            {
                name: 'Pages', url: '#',
                children: [
                    { name: 'System Design', url: 'system-design.html' },
                    { name: 'Markdown Preview', url: 'preview.html' }
                    // Add entries here to include your new page in the dropdown
                ]
            }
        ];

        // ─────────────────────────────────────────────────────────────────
        // PAGE CONTENT — write your markdown here as an array of strings.
        // One element per line. This avoids backtick escaping issues that
        // occur when embedding code fences inside JS template literals.
        // ─────────────────────────────────────────────────────────────────
        const PAGE_CONTENT = [
'# Demo Page Heading 🚀',
'',
'Welcome to your new **hub-WOW** page! This template shows you how to use our custom markdown engine and shared layout.',
'',
'## 🌈 Markdown Features',
'',
'- **Bold text** and *italic text*.',
'- [Clickable Links](https://hub-wow.fyi)',
'- List items with sub-bullets:',
'    - Point 1',
'    - Point 2',
'        - Sub-point A',
'',
'## ⚙️ Technical Support',
'',
'### Code Highlighting',
'```javascript',
'function hello() {',
'    console.log("Hello hub-WOW!");',
'}',
'```',
'',
'### LaTeX Mathematics',
'Mathematical formulas are supported natively:',
'$$ E = mc^2 $$',
'',
'### Automatic Table of Contents',
'Look at the sidebar on the left! All your headings are automatically parsed into the navigation.',
'',
'## 🛠 Next Steps',
'1. Rename this file to something descriptive (e.g., `my-page.html`).',
'2. Update `PAGE_CONTENT` above with your own markdown.',
'3. Add your page to `TOP_BAR_LINKS` in this file — no need to edit `layout.js`.',
].join('\n');

        window.addEventListener('DOMContentLoaded', () => {
            // 1. Initialize the shared layout — topBarLinks configures the top nav
            Layout.init({ topBarLinks: TOP_BAR_LINKS });

            // 2. Render the Hero Section
            Layout.renderHero('hero-wrapper', {
                logo: null,       // Set to null to hide the logo
                title: 'Demo Page',
                subtitle: 'A clean starting point for your next creation.',
                tagline: 'Built with hub-WOW Core Architecture'
            });

            // 3. Render the Markdown content
            const root = document.getElementById('app-root');
            const toc = document.getElementById('sidebar-nav-list'); // Injected by Layout.init()

            MdEngine.render(PAGE_CONTENT, root, toc);
        });
    </script>
</body>

</html>
```