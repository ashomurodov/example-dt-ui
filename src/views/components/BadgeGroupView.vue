<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtBadgeGroup } from '@/components/ui/badge-group'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add badge-group`

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]
const colorsTab = ref('preview')
const typesTab = ref('preview')
const positionTab = ref('preview')
const sizesTab = ref('preview')
const noArrowTab = ref('preview')
const linkTab = ref('preview')

const colorsCode = `<DtBadgeGroup color="gray"    label="Version 4.0" text="We've just released a new feature" />
<DtBadgeGroup color="brand"   label="New feature" text="We've just released a new feature" />
<DtBadgeGroup color="error"   label="Error"       text="There was a problem with that action" />
<DtBadgeGroup color="warning" label="Warning"     text="Just to let you know this might be a problem" />
<DtBadgeGroup color="success" label="Success"     text="You've updated your profile and details" />`

const typesCode = `<DtBadgeGroup type="pill"   color="brand" label="New feature" text="Released today" />
<DtBadgeGroup type="modern" color="brand" label="New feature" text="Released today" />`

const positionCode = `<DtBadgeGroup position="leading"  label="Version 4.0" text="We've just released a new feature" />
<DtBadgeGroup position="trailing" label="Version 4.0" text="We've just released a new feature" />`

const sizesCode = `<DtBadgeGroup size="md" color="brand" label="New feature" text="Released today" />
<DtBadgeGroup size="lg" color="brand" label="New feature" text="Released today" />`

const noArrowCode = `<DtBadgeGroup label="Version 4.0" text="Inline note, no action" :arrow="false" />`

const linkCode = `<DtBadgeGroup
  color="brand"
  label="New feature"
  text="We've just released a new feature"
  href="/changelog"
/>

<!-- External link auto-adds rel="noopener noreferrer" -->
<DtBadgeGroup
  label="Blog"
  text="Read our latest post"
  href="https://example.com"
  target="_blank"
/>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '120px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '100px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'color',    type: "'gray' | 'brand' | 'error' | 'warning' | 'success'", default: "'gray'",    desc: 'Color family.' },
  { name: 'type',     type: "'pill' | 'modern'",                                  default: "'pill'",    desc: 'Pill fills the outer with the color; modern keeps it white and uses a colored dot.' },
  { name: 'size',     type: "'md' | 'lg'",                                        default: "'md'",      desc: 'md uses body-xs typography; lg uses body-sm.' },
  { name: 'position', type: "'leading' | 'trailing'",                             default: "'leading'", desc: 'Pill on the left or on the right (arrow moves inside the pill).' },
  { name: 'label',    type: 'string',                                             default: '—',         desc: 'Pill / badge text.' },
  { name: 'text',     type: 'string',                                             default: '—',         desc: 'Body text.' },
  { name: 'href',     type: 'string',                                             default: '—',         desc: 'If provided, renders as <a>.' },
  { name: 'target',   type: "'_self' | '_blank' | '_parent' | '_top'",            default: '—',         desc: 'Forwarded to <a>. _blank auto-adds rel="noopener noreferrer".' },
  { name: 'arrow',    type: 'boolean',                                            default: 'true',      desc: 'Show the trailing arrow icon.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'default', desc: 'Body text. Overrides the `text` prop.' },
  { name: 'label',   desc: 'Pill / badge content. Overrides the `label` prop.' },
  { name: 'arrow',   desc: 'Custom trailing icon. Replaces the built-in arrow.' },
]
</script>

<template>
  <DtPageView :title="t('nav.badgeGroup')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.badgeGroup.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Colors</h2>
      <DtTabSwitcher v-model="colorsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="colorsTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup color="gray"    label="Version 4.0" text="We've just released a new feature" />
          <DtBadgeGroup color="brand"   label="New feature" text="We've just released a new feature" />
          <DtBadgeGroup color="error"   label="Error"       text="There was a problem with that action" />
          <DtBadgeGroup color="warning" label="Warning"     text="Just to let you know this might be a problem" />
          <DtBadgeGroup color="success" label="Success"     text="You've updated your profile and details" />
        </div>
        <CodeBlock v-else :code="colorsCode" lang="vue" />
      </div>

      <h2>Types</h2>
      <DtTabSwitcher v-model="typesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="typesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup type="pill"   color="brand" label="New feature" text="Released today" />
          <DtBadgeGroup type="modern" color="brand" label="New feature" text="Released today" />
        </div>
        <CodeBlock v-else :code="typesCode" lang="vue" />
      </div>

      <h2>Position</h2>
      <DtTabSwitcher v-model="positionTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="positionTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup position="leading"  label="Version 4.0" text="We've just released a new feature" />
          <DtBadgeGroup position="trailing" label="Version 4.0" text="We've just released a new feature" />
        </div>
        <CodeBlock v-else :code="positionCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup size="md" color="brand" label="New feature" text="Released today" />
          <DtBadgeGroup size="lg" color="brand" label="New feature" text="Released today" />
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Without arrow</h2>
      <DtTabSwitcher v-model="noArrowTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="noArrowTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup label="Version 4.0" text="Inline note, no action" :arrow="false" />
        </div>
        <CodeBlock v-else :code="noArrowCode" lang="vue" />
      </div>

      <h2>As a link</h2>
      <DtTabSwitcher v-model="linkTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="linkTab === 'preview'" class="dx-preview dx-preview--column">
          <DtBadgeGroup color="brand" label="New feature" text="We've just released a new feature" href="#" />
          <DtBadgeGroup label="Blog" text="Read our latest post" href="https://example.com" target="_blank" />
        </div>
        <CodeBlock v-else :code="linkCode" lang="vue" />
      </div>

      <h2>Props</h2>
      <DtDataTable :columns="propsCols" :items="propsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Slots</h2>
      <DtDataTable :columns="slotsCols" :items="slotsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li>Renders a real <code>&lt;a&gt;</code> when <code>href</code> is set — keyboard focusable, visible focus ring.</li>
        <li>Dot and arrow icons are <code>aria-hidden</code>; the text content carries the meaning.</li>
        <li><code>target="_blank"</code> auto-adds <code>rel="noopener noreferrer"</code>.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
/* Badge groups are content-sized — don't let the default column preview stretch them. */
.dx-preview--column {
  align-items: flex-start;
}
</style>
