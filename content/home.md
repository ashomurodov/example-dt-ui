# Introduction

dt-ui is a copy-based Vue 3 component registry built for the DT ecosystem. It is **not** a runtime library — you don't `import` from `aetherx-dt-ui` in your app. Instead:

1. You install one npm package (the registry CLI).
2. You run `npx dt-ui add <component>` to copy `.vue` + `index.ts` source files into your project.
3. The components live in your codebase. Your team owns them.

The benefits are predictable: no version bumps for visual tweaks, no abstraction over the components you ship, full TypeScript types, full source visibility.

## Highlights

- **Copy-based.** Components are `.vue` files in your repo. Edit freely.
- **Token-driven.** 14 color scales × 11 stops, named spacing, radius, and width tokens. All as CSS custom properties.
- **Dark mode.** Every component is theme-aware via `html[data-theme='dark']`.
- **Vue 3 + TypeScript.** Composition API, `<script setup>`, full type exports.
- **Accessible by default.** Native `<button>`, ARIA states, focus rings, keyboard support.
- **Battle-tested layout.** App shell, sidebar, header, modules switcher, profile dropdown — all included.

## Three commands to get started

```bash
npm install aetherx-dt-ui
npx dt-ui init
npx dt-ui add button input card
```

Then import `base.css` once in `main.ts` and you can use `<DtButton>`, `<DtInput>`, etc. anywhere.
