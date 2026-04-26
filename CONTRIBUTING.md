# Contributing to Learning Platform

Welcome to the **hub-WOW Learning** platform! This guide explains how to add new content or edit existing content correctly.

## Content Workflow

All technical and theoretical content is maintained as **Logseq** notes, not direct HTML or Markdown in the `courses/` directory. This allows for networked thought, automatic linking, and cleaner contribution for non-technical writers.

### 1. Write in Logseq
- Create or edit your notes in `Logseq/pages/`.
- Ensure each note has a parent link at the bottom so it can be sorted into the correct category folder. 
  Example:
  ```markdown
  - **Parent**
      - [[Physics]]
  ```
- Use standard Logseq links `[[Target Page]]` to reference other content.

### 2. Generate the Website Content
After you have finished writing or updating notes in Logseq, you must generate the site content:

1. Open your terminal in the root directory.
2. Run the porting script:
   ```bash
   python scripts/port_logseq.py
   ```
3. The script will automatically:
   - Extract the `Parent` hierarchy and build folder structures.
   - Convert all `.md` files to `_modules/`.
   - Apply a formal-to-informal slang map (`scripts/slang_map.py`) to keep the tone accessible.
   - Rewrite absolute and Wiki URLs to standard site-relative URLs.
   - Generate HTML wrappers in the `courses/` directory.

### 3. Review and Commit
- Use a local dev server (e.g. `python -m http.server 8090` or `npm run dev`) to preview the generated HTML files in your browser.
- Verify that your new pages are categorized correctly.
- Commit the changes to both `Logseq/pages/` AND the generated `courses/` and `_modules/` files.

### 4. Modifying Slang
If you notice the script changing terms incorrectly, or if you want to add new formal-to-informal mappings, edit the dictionary located in `scripts/slang_map.py`.

---

*Note: For changes to the website's layout, theme, or the underlying markdown parser, please see the `Kathisto` library documentation or edit `DEV.MD` accordingly.*
