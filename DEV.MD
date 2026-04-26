# Skill Development at hub-WOW

Welcome to the **hub-WOW learning** project—a platform for community-driven learning content covering science, philosophy, and system design. It is built on a lightweight, high-performance infrastructure designed for readability and maintainability.

---

## 🚀 Project Overview

The **Learning** project provides:

- Structured learning content
- Easy-to-navigate documentation
- Fast, responsive rendering via a custom engine

---

## 🍱 Project Structure

For the full technical layout, including the markdown engine and CSS variable usage, see the **[Kathisto library](https://github.com/hub-WOW/Kathisto)**.

---

## 🛠 Working with the Infrastructure

### Porting Logseq Notes
All informational content is maintained as Logseq notes in `Logseq/pages/`. To port these into the website's structure:
1. Run `python scripts/port_logseq.py`.
2. The script parses the `- **Parent**\n  - [[Topic]]` syntax to determine the folder hierarchy.
3. Notes are automatically copied to `_modules/` and a thin HTML wrapper is generated in `courses/` using Kathisto.
4. Formal language is lightly transformed to informal language using `scripts/slang_map.py`.

### Quick Start: Adding a New Page

1. Copy `Kathisto/demo.md` as a template. Add the logo.
2. Update `<title>` and `Layout.renderHero()` in the script block.
3. Define `TOP_BAR_LINKS` for local navigation.
4. Set your content in `PAGE_CONTENT` for clean rendering.
5. Open in any browser to preview.

---

## 🎨 Branding & Assets

- **Logo**: Use `resources/logo.svg` in the sidebar and hero sections.
- **Colors**:  
  - Dark-mode-first aesthetic  
  - Signature blue-green gradient for titles  
  - High-contrast accent red for highlights

---

## 🤝 Contribution Guidelines

1. **Keep it Vanilla**: Avoid external CSS frameworks (Tailwind, Bootstrap) to preserve performance.  
2. **Open Access**: All code and content must remain open-source.  
3. **Cross-Platform**: Test UI changes on Desktop and Mobile browsers.  
4. **Isolation**: Do not enable user-based markdown input unless explicitly required.  
5. **No AI Slop Content**: All markdown text must be handwritten.