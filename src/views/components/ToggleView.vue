<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtToggle } from '@/components/ui/toggle'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const sizesTab = ref('preview')
const stateTab = ref('preview')

const lg = ref(true)
const md = ref(false)
const sm = ref(true)

const sizesCode = `<DtToggle v-model="lg" size="lg" />
<DtToggle v-model="md" size="md" />
<DtToggle v-model="sm" size="sm" />`

const stateCode = `<DtToggle :model-value="false" disabled />
<DtToggle :model-value="true" disabled />`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Active state (v-model).' },
  { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'md'", desc: 'Track + thumb dimensions.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable interaction.' },
]

const eventsCols: DtColumn[] = [
  { key: 'name', label: 'Event', width: '180px' },
  { key: 'payload', label: 'Payload', width: '160px' },
  { key: 'desc', label: 'Description' },
]
const eventsRows = [
  { name: 'update:modelValue', payload: 'boolean', desc: 'Emitted when toggled.' },
]
</script>

<template>
  <DtPageView :title="t('nav.toggle')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.toggle.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add toggle" lang="bash" />

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview">
          <div style="display: flex; align-items: center; gap: 8px;">
            <DtToggle v-model="lg" size="lg" /><span>LG (44×24)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <DtToggle v-model="md" size="md" /><span>MD (36×20)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <DtToggle v-model="sm" size="sm" /><span>SM (32×18)</span>
          </div>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Disabled</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview">
          <div style="display: flex; align-items: center; gap: 8px;">
            <DtToggle :model-value="false" disabled /><span>Off</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <DtToggle :model-value="true" disabled /><span>On</span>
          </div>
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

      <h2>Events</h2>
      <DtDataTable :columns="eventsCols" :items="eventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li>Native <code>&lt;button role="switch"&gt;</code> with <code>aria-checked</code>.</li>
        <li>Keyboard: Enter/Space toggle.</li>
        <li><code>:focus-visible</code> ring uses <code>--dt-color-ring</code>.</li>
      </ul>
    </div>
  </DtPageView>
</template>
