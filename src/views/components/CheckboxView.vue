<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtCheckbox } from '@/components/ui/checkbox'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const a = ref(true)
const b = ref(false)
const c = ref(false)

const sizesTab = ref('preview')
const stateTab = ref('preview')

const sizesCode = `<DtCheckbox v-model="a" size="lg">Large</DtCheckbox>
<DtCheckbox v-model="b" size="md">Medium</DtCheckbox>
<DtCheckbox v-model="c" size="sm">Small</DtCheckbox>`

const stateCode = `<DtCheckbox :model-value="false" disabled>Disabled</DtCheckbox>
<DtCheckbox :model-value="true" disabled>Disabled (checked)</DtCheckbox>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Checked state (v-model).' },
  { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'md'", desc: 'Box + checkmark dimensions.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable interaction.' },
  { name: 'id', type: 'string', default: 'auto', desc: 'HTML id for label association; auto-generated if omitted.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '160px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'default', desc: 'Label rendered next to the box.' },
]
</script>

<template>
  <DtPageView :title="t('nav.checkbox')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.checkbox.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add checkbox" lang="bash" />

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview">
          <DtCheckbox v-model="a" size="lg">Large (24×24)</DtCheckbox>
          <DtCheckbox v-model="b" size="md">Medium (20×20)</DtCheckbox>
          <DtCheckbox v-model="c" size="sm">Small (16×16)</DtCheckbox>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Disabled</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview">
          <DtCheckbox :model-value="false" disabled>Disabled</DtCheckbox>
          <DtCheckbox :model-value="true" disabled>Disabled (checked)</DtCheckbox>
        </div>
        <CodeBlock v-else :code="stateCode" lang="vue" />
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
        <li>Hidden native <code>&lt;input type="checkbox"&gt;</code> for screen readers and form submission.</li>
        <li><code>&lt;label for="..."&gt;</code> wires the visual label to the input.</li>
        <li>Visible focus ring on <code>:focus-visible</code>.</li>
      </ul>
    </div>
  </DtPageView>
</template>
