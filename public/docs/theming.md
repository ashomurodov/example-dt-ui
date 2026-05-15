# Theming & Tokens

Every visual decision in dt-ui is a CSS custom property. Override the right token in your own CSS and the entire library responds — no recompile, no JavaScript.

## Two layers: raw and semantic

At the bottom you have **raw color scales** — the literal color, spacing, and type values. On top of those sit **semantic tokens** that reference the raw scales. Components only consume semantic tokens; you almost always override at the semantic level.

## Color scales

Fourteen scales × 11 stops (50, 100…900, 950):

`--dt-gray-*`, `--dt-brand-*`, `--dt-error-*`, `--dt-warning-*`, `--dt-success-*`, `--dt-blue-*`, `--dt-amber-*`, `--dt-lime-*`, `--dt-sky-*`, `--dt-indigo-*`, `--dt-violet-*`, `--dt-purple-*`, `--dt-mist-*`, `--dt-olive-*`

Each has stops `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950`.

## Semantic tokens

The most-used semantic tokens. Override these to re-skin without touching the raw scales.

| Token | Default | Notes |
|-------|---------|-------|
| `--dt-color-accent` | `#0096b2` | Primary brand color (= `--dt-brand-500`) |
| `--dt-color-text` | `#131720` | Body text (= `--dt-gray-900`) |
| `--dt-color-text-secondary` | `#667085` | Subdued text |
| `--dt-color-background` | `#ffffff` | Page background |
| `--dt-color-border` | `#dde1e9` | Default border |
| `--dt-color-error` | `#ef4444` | Error / destructive |
| `--dt-color-success` | `#16a34a` | Positive confirmation |
| `--dt-color-warning` | `#eab308` | Warning (yellow) |
| `--dt-color-ring` | `#0096b2` | Focus ring |

## Typography

Eight type stops — 5 heading sizes (`h1`…`h5`) and 3 body sizes (`body-md`, `body-sm`, `body-xs`). Each has a matching `--dt-leading-*` line-height token.

| Token             | Size  | Line height | Typical use                              |
| ----------------- | ----- | ----------- | ---------------------------------------- |
| `--dt-text-h1`      | 60px  | 72px        | Large hero                               |
| `--dt-text-h2`      | 48px  | 56px        | Section title                            |
| `--dt-text-h3`      | 40px  | 48px        | Card / page title                        |
| `--dt-text-h4`      | 32px  | 40px        | Subsection                               |
| `--dt-text-h5`      | 20px  | 24px        | Lead text                                |
| `--dt-text-body-md` | 16px  | 20px        | Default body                             |
| `--dt-text-body-sm` | 14px  | 16px        | Secondary text, hints, captions          |
| `--dt-text-body-xs` | 12px  | 14px        | Eyebrows, kbd, labels                    |

Font weights: `--dt-font-regular` (400), `--dt-font-medium` (500), `--dt-font-semibold` (600), `--dt-font-bold` (700). Font family: `--dt-font-family` (Lab Grotesque) and `--dt-font-mono` (JetBrains Mono).

```css
font-size:   var(--dt-text-h3);
line-height: var(--dt-leading-h3);
font-weight: var(--dt-font-semibold);
font-family: var(--dt-font-family);
```

## Spacing

Seventeen named stops from `--dt-spacing-none` (0) to `--dt-spacing-11xl` (160px). Used for padding, margin, and gap throughout.

| Token                | px  | Token                | px  |
| -------------------- | --- | -------------------- | --- |
| `--dt-spacing-none`  | 0   | `--dt-spacing-4xl`   | 32  |
| `--dt-spacing-xxs`   | 2   | `--dt-spacing-5xl`   | 40  |
| `--dt-spacing-xs`    | 4   | `--dt-spacing-6xl`   | 48  |
| `--dt-spacing-sm`    | 6   | `--dt-spacing-7xl`   | 64  |
| `--dt-spacing-md`    | 8   | `--dt-spacing-8xl`   | 80  |
| `--dt-spacing-lg`    | 12  | `--dt-spacing-9xl`   | 96  |
| `--dt-spacing-xl`    | 16  | `--dt-spacing-10xl`  | 128 |
| `--dt-spacing-2xl`   | 20  | `--dt-spacing-11xl`  | 160 |
| `--dt-spacing-3xl`   | 24  |                      |     |

```css
padding: var(--dt-spacing-xl);   /* 16px */
gap:     var(--dt-spacing-lg);   /* 12px */
margin:  var(--dt-spacing-3xl);  /* 24px */
```

## Radius

Eleven named stops from `--dt-radius-none` (0) to `--dt-radius-4xl` (40px), plus `--dt-radius-full` (9999px) for pills and circles.

| Token              | px    |
| ------------------ | ----- |
| `--dt-radius-none` | 0     |
| `--dt-radius-xxs`  | 4     |
| `--dt-radius-xs`   | 6     |
| `--dt-radius-sm`   | 8     |
| `--dt-radius-md`   | 12    |
| `--dt-radius-lg`   | 16    |
| `--dt-radius-xl`   | 20    |
| `--dt-radius-2xl`  | 24    |
| `--dt-radius-3xl`  | 32    |
| `--dt-radius-4xl`  | 40    |
| `--dt-radius-full` | 9999  |

```css
border-radius: var(--dt-radius-md);   /* 12px — cards */
border-radius: var(--dt-radius-xl);   /* 20px — large inputs */
border-radius: var(--dt-radius-full); /* pills, avatars */
```

## Width & containers

Layout widths from `--dt-width-xxs` (320px) to `--dt-width-6xl` (1920px) — useful for max-widths on cards and modals. Plus three container tokens: `--dt-container-padding-mobile` (16px), `--dt-container-padding-desktop` (32px), and `--dt-container-max-width-desktop` (1280px).

## Shadows

Seven elevation levels. Each is a multi-layer `box-shadow` using pure black, with dark-theme variants that swap to higher alphas so shadows stay visible against dark backgrounds.

| Token | Use |
| ----- | --- |
| `--dt-shadow-xs` | Tiny lift — input borders, inline elements |
| `--dt-shadow-sm` | Cards at rest, light surfaces |
| `--dt-shadow-md` | Dropdowns, popovers, raised cards |
| `--dt-shadow-lg` | Modals, dialogs, profile cards |
| `--dt-shadow-xl` | Floating panels, command palettes |
| `--dt-shadow-2xl` | Large overlays, toasts at the top of the stack |
| `--dt-shadow-3xl` | Hero elements, full-screen takeovers |

Usage:

```css
box-shadow: var(--dt-shadow-md);
```

Override the token globally to cascade everywhere it's used:

```css
:root {
  --dt-shadow-md: 0 6px 12px -2px rgba(0, 0, 0, 0.12);
}
```

## Overriding tokens

Drop these in any global stylesheet that loads after `base.css`.

```css
:root {
  /* Re-skin everything by pointing semantic tokens at a different scale */
  --dt-color-accent: var(--dt-violet-500);
  --dt-color-accent-hover: var(--dt-violet-600);
  --dt-color-ring: var(--dt-violet-500);

  /* Or set a specific hex */
  --dt-color-error: #d63031;
}
```

## Dark mode

Set `data-theme="dark"` on the `<html>` element. Every token automatically picks up its dark variant — backgrounds invert, borders adjust, contrast is preserved.

```html
<!-- index.html -->
<html data-theme="dark">

<!-- or programmatically -->
<script>
  document.documentElement.dataset.theme = 'dark'
</script>
```

The header at the top of the docs site has a working toggle — flip it and watch the whole site shift.
