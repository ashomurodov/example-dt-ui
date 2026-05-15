<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtRadio } from '@/components/ui/radio'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const plan = ref('pro')
const sizesPlan = ref('pro')

const groupTab = ref('preview')
const sizesTab = ref('preview')

const groupCode = `<DtRadio v-model="plan" value="free" name="plan">Free</DtRadio>
<DtRadio v-model="plan" value="pro" name="plan">Pro</DtRadio>
<DtRadio v-model="plan" value="enterprise" name="plan">Enterprise</DtRadio>
<DtRadio :model-value="''" value="disabled" name="plan" disabled>Disabled</DtRadio>`

const sizesCode = `<DtRadio v-model="plan" value="free" name="p-lg" size="lg">Large</DtRadio>
<DtRadio v-model="plan" value="pro" name="p-md" size="md">Medium</DtRadio>
<DtRadio v-model="plan" value="enterprise" name="p-sm" size="sm">Small</DtRadio>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue', type: 'string | number', default: '—', desc: 'Currently selected group value (v-model).' },
  { name: 'value', type: 'string | number', default: 'required', desc: 'This option\'s value.' },
  { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'md'", desc: 'Outer + inner dot dimensions.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Prevents selection.' },
  { name: 'name', type: 'string', default: '—', desc: 'Native form group name. Use the same name for all radios in a group.' },
]
</script>

<template>
  <DtPageView :title="t('nav.radio')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.radio.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add radio" lang="bash" />

      <h2>Group</h2>
      <DtTabSwitcher v-model="groupTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="groupTab === 'preview'" class="dx-preview">
          <DtRadio v-model="plan" value="free" name="plan">Free</DtRadio>
          <DtRadio v-model="plan" value="pro" name="plan">Pro</DtRadio>
          <DtRadio v-model="plan" value="enterprise" name="plan">Enterprise</DtRadio>
          <DtRadio :model-value="''" value="disabled" name="plan" disabled>Disabled</DtRadio>
        </div>
        <CodeBlock v-else :code="groupCode" lang="vue" />
      </div>
      <p style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Selected: <code>{{ plan }}</code>
      </p>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview">
          <DtRadio v-model="sizesPlan" value="free" name="p-lg" size="lg">Large</DtRadio>
          <DtRadio v-model="sizesPlan" value="pro" name="p-md" size="md">Medium</DtRadio>
          <DtRadio v-model="sizesPlan" value="enterprise" name="p-sm" size="sm">Small</DtRadio>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Props</h2>
      <DtDataTable :columns="propsCols" :items="propsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li>Native <code>&lt;input type="radio"&gt;</code> hidden for visual styling, present for form submission.</li>
        <li>Pass the same <code>name</code> to group radios — keyboard arrow keys navigate within the group.</li>
        <li>Visible focus ring on <code>:focus-visible</code>.</li>
      </ul>
    </div>
  </DtPageView>
</template>
