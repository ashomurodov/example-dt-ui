<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const colorScales = [
  'gray', 'brand', 'error', 'warning', 'success', 'blue',
  'amber', 'lime', 'sky', 'indigo', 'violet', 'purple', 'mist', 'olive',
]
const colorStops = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']

const semanticTokens = [
  { token: '--dt-color-accent', value: '#0096b2', notes: 'Primary brand color (= --dt-brand-500)' },
  { token: '--dt-color-text', value: '#131720', notes: 'Body text (= --dt-gray-900)' },
  { token: '--dt-color-text-secondary', value: '#667085', notes: 'Subdued text' },
  { token: '--dt-color-background', value: '#ffffff', notes: 'Page background' },
  { token: '--dt-color-border', value: '#dde1e9', notes: 'Default border' },
  { token: '--dt-color-error', value: '#ef4444', notes: 'Error / destructive' },
  { token: '--dt-color-success', value: '#16a34a', notes: 'Positive confirmation' },
  { token: '--dt-color-warning', value: '#eab308', notes: 'Warning (yellow)' },
  { token: '--dt-color-ring', value: '#0096b2', notes: 'Focus ring' },
]

const semanticCols: DtColumn[] = [
  { key: 'swatch', label: '', width: '60px' },
  { key: 'token', label: 'Token', width: '40%' },
  { key: 'value', label: 'Default', width: '120px' },
  { key: 'notes', label: 'Notes' },
]

const typeStops = [
  { token: 'h1',      sample: 'Heading 1',                                size: '60 / 72' },
  { token: 'h2',      sample: 'Heading 2',                                size: '48 / 56' },
  { token: 'h3',      sample: 'Heading 3',                                size: '40 / 48' },
  { token: 'h4',      sample: 'Heading 4',                                size: '32 / 40' },
  { token: 'h5',      sample: 'Heading 5',                                size: '20 / 24' },
  { token: 'body-md', sample: 'Body medium — default copy size',          size: '16 / 20' },
  { token: 'body-sm', sample: 'Body small — secondary, hints, captions',  size: '14 / 16' },
  { token: 'body-xs', sample: 'Body extra small — eyebrows, kbd, labels', size: '12 / 14' },
]

const spacingStops = [
  { name: 'none', px:   0 }, { name: 'xxs',  px:   2 }, { name: 'xs',   px:   4 },
  { name: 'sm',   px:   6 }, { name: 'md',   px:   8 }, { name: 'lg',   px:  12 },
  { name: 'xl',   px:  16 }, { name: '2xl',  px:  20 }, { name: '3xl',  px:  24 },
  { name: '4xl',  px:  32 }, { name: '5xl',  px:  40 }, { name: '6xl',  px:  48 },
  { name: '7xl',  px:  64 }, { name: '8xl',  px:  80 }, { name: '9xl',  px:  96 },
  { name: '10xl', px: 128 }, { name: '11xl', px: 160 },
]

const radiusStops = [
  { name: 'none', px: '0px' }, { name: 'xxs',  px: '4px' },  { name: 'xs',   px: '6px' },
  { name: 'sm',   px: '8px' }, { name: 'md',   px: '12px' }, { name: 'lg',   px: '16px' },
  { name: 'xl',   px: '20px' },{ name: '2xl',  px: '24px' }, { name: '3xl',  px: '32px' },
  { name: '4xl',  px: '40px' },{ name: 'full', px: '9999px' },
]

const shadowStops = [
  { name: 'xs',  use: 'Tiny lift — input borders, inline elements' },
  { name: 'sm',  use: 'Cards at rest, light surfaces' },
  { name: 'md',  use: 'Dropdowns, popovers, raised cards' },
  { name: 'lg',  use: 'Modals, dialogs, profile cards' },
  { name: 'xl',  use: 'Floating panels, command palettes' },
  { name: '2xl', use: 'Large overlays, toasts at the top of the stack' },
  { name: '3xl', use: 'Hero elements, full-screen takeovers' },
]

const overrideSnippet = `:root {
  /* Re-skin everything by pointing semantic tokens at a different scale */
  --dt-color-accent: var(--dt-violet-500);
  --dt-color-accent-hover: var(--dt-violet-600);
  --dt-color-ring: var(--dt-violet-500);

  /* Or set a specific hex */
  --dt-color-error: #d63031;
}`

const darkSnippet = `<!-- index.html -->
<html data-theme="dark">

<!-- or programmatically -->
<script>
  document.documentElement.dataset.theme = 'dark'
<\/script>`

const typeSnippet = `font-size:   var(--dt-text-h3);
line-height: var(--dt-leading-h3);
font-weight: var(--dt-font-semibold);
font-family: var(--dt-font-family);`

const spacingSnippet = `padding: var(--dt-spacing-xl);   /* 16px */
gap:     var(--dt-spacing-lg);   /* 12px */
margin:  var(--dt-spacing-3xl);  /* 24px */`

const radiusSnippet = `border-radius: var(--dt-radius-md);  /* 12px — cards */
border-radius: var(--dt-radius-xl);  /* 20px — large inputs */
border-radius: var(--dt-radius-full); /* pills, avatars */`

const shadowSnippet = `/* Use a token by name */
box-shadow: var(--dt-shadow-md);

/* Stack changes safely — overriding a token cascades everywhere */
:root {
  --dt-shadow-md: 0 6px 12px -2px rgba(0, 0, 0, 0.12);
}`
</script>

<template>
  <DtPageView :title="t('pages.theming.title')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('pages.theming.lead')" />

      <h2>{{ t('pages.theming.twoLayers') }}</h2>
      <p v-html="t('pages.theming.twoLayersBody')" />

      <h2>{{ t('pages.theming.colorScales') }}</h2>
      <p>{{ t('pages.theming.colorScalesBody') }}</p>
      <div class="dx-color-grid">
        <div v-for="scale in colorScales" :key="scale" class="dx-color-row">
          <code class="dx-color-label">--dt-{{ scale }}-*</code>
          <div class="dx-color-stops">
            <div
              v-for="stop in colorStops"
              :key="stop"
              class="dx-color-swatch"
              :style="{ background: `var(--dt-${scale}-${stop})` }"
              :title="`--dt-${scale}-${stop}`"
            />
          </div>
        </div>
      </div>

      <h2>{{ t('pages.theming.semanticTokens') }}</h2>
      <p>{{ t('pages.theming.semanticTokensBody') }}</p>
      <DtDataTable :columns="semanticCols" :items="semanticTokens">
        <template #swatch="{ item }">
          <span
            class="dx-semantic-swatch"
            :style="{ background: `var(${(item as { token: string }).token})` }"
          />
        </template>
        <template #token="{ item }">
          <code>{{ (item as { token: string }).token }}</code>
        </template>
        <template #value="{ item }">
          <code>{{ (item as { value: string }).value }}</code>
        </template>
        <template #notes="{ item }">{{ (item as { notes: string }).notes }}</template>
      </DtDataTable>

      <h2>{{ t('pages.theming.typography') }}</h2>
      <p>
        Eight type stops — 5 heading sizes (<code>h1</code>&hellip;<code>h5</code>) and 3 body
        sizes (<code>body-md</code>, <code>body-sm</code>, <code>body-xs</code>). Each has a
        matching <code>--dt-leading-*</code> line-height token.
      </p>
      <div class="dx-type-grid">
        <div v-for="t in typeStops" :key="t.token" class="dx-type-row">
          <div
            class="dx-type-sample"
            :style="{
              fontSize: `var(--dt-text-${t.token})`,
              lineHeight: `var(--dt-leading-${t.token})`,
            }"
          >
            {{ t.sample }}
          </div>
          <div class="dx-type-meta">
            <code>--dt-text-{{ t.token }}</code>
            <span class="dx-type-size">{{ t.size }}px</span>
          </div>
        </div>
      </div>
      <p>
        Font weights: <code>--dt-font-regular</code> (400), <code>--dt-font-medium</code> (500),
        <code>--dt-font-semibold</code> (600), <code>--dt-font-bold</code> (700).
      </p>
      <CodeBlock :code="typeSnippet" lang="css" />

      <h2>{{ t('pages.theming.spacing') }}</h2>
      <p>
        Seventeen named stops from <code>--dt-spacing-none</code> (0) to
        <code>--dt-spacing-11xl</code> (160px). Used for padding, margin, and gap throughout.
      </p>
      <div class="dx-space-grid">
        <div v-for="s in spacingStops" :key="s.name" class="dx-space-row">
          <code class="dx-space-token">--dt-spacing-{{ s.name }}</code>
          <span class="dx-space-bar" :style="{ width: `var(--dt-spacing-${s.name})` }" />
          <span class="dx-space-px">{{ s.px }}px</span>
        </div>
      </div>
      <CodeBlock :code="spacingSnippet" lang="css" />

      <h2>{{ t('pages.theming.radius') }}</h2>
      <p>
        Eleven named stops from <code>--dt-radius-none</code> (0) to <code>--dt-radius-4xl</code>
        (40px), plus <code>--dt-radius-full</code> (9999px) for pills and circles.
      </p>
      <div class="dx-radius-grid">
        <div v-for="r in radiusStops" :key="r.name" class="dx-radius-cell">
          <div
            class="dx-radius-swatch"
            :style="{ borderRadius: `var(--dt-radius-${r.name})` }"
          />
          <code class="dx-radius-token">--dt-radius-{{ r.name }}</code>
          <span class="dx-radius-px">{{ r.px }}</span>
        </div>
      </div>
      <CodeBlock :code="radiusSnippet" lang="css" />

      <h2>Width & containers</h2>
      <p>
        Layout widths from <code>--dt-width-xxs</code> (320px) to <code>--dt-width-6xl</code>
        (1920px) — useful for max-widths on cards and modals. Plus three container tokens:
        <code>--dt-container-padding-mobile</code> (16px),
        <code>--dt-container-padding-desktop</code> (32px), and
        <code>--dt-container-max-width-desktop</code> (1280px).
      </p>

      <h2>{{ t('pages.theming.shadows') }}</h2>
      <p>
        Seven elevation levels. Each is a multi-layer <code>box-shadow</code> using pure
        black, with dark-theme variants that swap to higher alphas so shadows remain
        visible against dark backgrounds.
      </p>
      <div class="dx-shadow-grid">
        <div v-for="s in shadowStops" :key="s.name" class="dx-shadow-cell">
          <div class="dx-shadow-swatch" :style="{ boxShadow: `var(--dt-shadow-${s.name})` }" />
          <div class="dx-shadow-meta">
            <code class="dx-shadow-token">--dt-shadow-{{ s.name }}</code>
            <p class="dx-shadow-use">{{ s.use }}</p>
          </div>
        </div>
      </div>
      <CodeBlock :code="shadowSnippet" lang="css" />

      <h2>Overriding tokens</h2>
      <p>Drop these in any global stylesheet that loads after <code>base.css</code>.</p>
      <CodeBlock :code="overrideSnippet" lang="css" />

      <h2>Dark mode</h2>
      <p>
        Set <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element. Every
        token automatically picks up its dark variant — backgrounds invert, borders adjust,
        contrast is preserved.
      </p>
      <CodeBlock :code="darkSnippet" lang="html" />
      <p>
        The header at the top of this site has a working toggle — flip it and watch the
        whole docs site shift.
      </p>
    </div>
  </DtPageView>
</template>

<style scoped>
/* ─── Color scales ─────────────────────────── */
.dx-color-grid {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-md);
  margin-bottom: var(--dt-spacing-3xl);
}

.dx-color-row {
  display: flex;
  align-items: center;
  gap: var(--dt-spacing-lg);
  flex-wrap: wrap;
}

.dx-color-label {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  min-width: 140px;
}

.dx-color-stops {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.dx-color-swatch {
  aspect-ratio: 1;
  border-radius: var(--dt-radius-xs);
  border: 1px solid var(--dt-color-border-light);
  cursor: help;
}

.dx-semantic-swatch {
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: var(--dt-radius-sm);
  border: 1px solid var(--dt-color-border-light);
  vertical-align: middle;
}

/* ─── Typography ──────────────────────────── */
.dx-type-grid {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-xl);
  padding: var(--dt-spacing-3xl);
  margin-bottom: var(--dt-spacing-3xl);
  background: var(--dt-color-background-secondary);
  border-radius: var(--dt-radius-md);
}

.dx-type-row {
  display: flex;
  align-items: baseline;
  gap: var(--dt-spacing-3xl);
  flex-wrap: wrap;
  padding-bottom: var(--dt-spacing-xl);
  border-bottom: 1px solid var(--dt-color-border-light);
}

.dx-type-row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.dx-type-sample {
  flex: 1;
  min-width: 280px;
  color: var(--dt-color-text);
  font-weight: var(--dt-font-medium);
}

.dx-type-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--dt-spacing-xs);
  text-align: right;
}

.dx-type-meta code {
  font-size: var(--dt-text-body-xs);
}

.dx-type-size {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-tertiary);
  font-family: var(--dt-font-mono);
}

/* ─── Spacing ──────────────────────────────── */
.dx-space-grid {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-sm);
  padding: var(--dt-spacing-3xl);
  margin-bottom: var(--dt-spacing-3xl);
  background: var(--dt-color-background-secondary);
  border-radius: var(--dt-radius-md);
  overflow-x: auto;
}

.dx-space-row {
  display: flex;
  align-items: center;
  gap: var(--dt-spacing-lg);
  min-width: max-content;
}

.dx-space-token {
  font-size: var(--dt-text-body-xs);
  width: 160px;
  flex-shrink: 0;
}

.dx-space-bar {
  display: inline-block;
  height: 14px;
  background: var(--dt-color-accent);
  border-radius: var(--dt-radius-xxs);
  flex-shrink: 0;
}

.dx-space-px {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-tertiary);
  font-family: var(--dt-font-mono);
  margin-left: var(--dt-spacing-md);
}

/* ─── Radius ───────────────────────────────── */
.dx-radius-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--dt-spacing-3xl);
  padding: var(--dt-spacing-3xl);
  margin-bottom: var(--dt-spacing-3xl);
  background: var(--dt-color-background-secondary);
  border-radius: var(--dt-radius-md);
}

.dx-radius-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dt-spacing-sm);
}

.dx-radius-swatch {
  width: 80px;
  height: 80px;
  background: var(--dt-color-accent);
}

.dx-radius-token {
  font-size: var(--dt-text-body-xs);
}

.dx-radius-px {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-tertiary);
  font-family: var(--dt-font-mono);
}

/* ─── Shadows ──────────────────────────────── */
.dx-shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--dt-spacing-3xl);
  padding: var(--dt-spacing-4xl) var(--dt-spacing-3xl);
  margin-bottom: var(--dt-spacing-3xl);
  background: var(--dt-color-background-secondary);
  border-radius: var(--dt-radius-md);
}

.dx-shadow-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dt-spacing-lg);
}

.dx-shadow-swatch {
  width: 96px;
  height: 96px;
  background: var(--dt-color-background);
  border-radius: var(--dt-radius-md);
}

.dx-shadow-meta {
  text-align: center;
}

.dx-shadow-token {
  font-size: var(--dt-text-body-xs);
}

.dx-shadow-use {
  margin: var(--dt-spacing-xs) 0 0;
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  line-height: var(--dt-leading-body-sm);
}

@media (max-width: 640px) {
  .dx-color-row {
    flex-direction: column;
    align-items: stretch;
  }
  .dx-color-stops {
    grid-template-columns: repeat(11, 1fr);
  }
  .dx-type-row {
    flex-direction: column;
    align-items: stretch;
    gap: var(--dt-spacing-md);
  }
  .dx-type-meta {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
