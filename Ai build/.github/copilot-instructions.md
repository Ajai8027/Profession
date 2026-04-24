# Project Guidelines

## Code Style
- Keep this as a static single-page portfolio in [index.html](../index.html).
- Preserve semantic HTML structure (`main`, `section`, `article`, `button`) and accessibility attributes.
- Keep CSS class naming and structure consistent with existing patterns (for example: `glass-card`, `section-head`, `skill-box`).
- Extend the CSS variable theme system in `:root` and `body.theme-pastel` instead of hardcoding repeated colors.
- Keep JavaScript minimal, framework-free, and colocated in the inline `<script>` unless a task explicitly requires file splitting.

## Architecture
- This workspace is intentionally single-file: markup, styles, and behavior are all in [index.html](../index.html).
- Visual design is driven by CSS custom properties, glassmorphism surfaces, and small keyframe animations (`reveal`, `float`).
- Behavior layer is limited to theme toggling and localStorage persistence (`portfolioTheme`).

## Build and Test
- There is no build pipeline, package manager lockfile, or automated test suite in this workspace.
- For local preview, use one of:
  - `python -m http.server 8000`
  - `npx http-server`
- If validation tooling is added later, prefer lightweight static checks (for example HTML/CSS validation and formatting) without introducing heavy frameworks.

## Conventions
- Maintain responsive behavior at current breakpoints (`960px` and `620px`) when modifying layout.
- Keep transitions and motion subtle and purposeful; avoid removing existing reveal/hover interactions unless requested.
- If changing typography, preserve graceful fallback behavior for external Google Fonts.
- Prefer incremental edits to existing sections over broad rewrites to keep portfolio content stable.
