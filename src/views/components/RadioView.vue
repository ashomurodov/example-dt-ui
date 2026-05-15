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
const descriptionPlan = ref('pro')

const groupTab = ref('preview')
const sizesTab = ref('preview')
const descriptionTab = ref('preview')
const stateTab = ref('preview')

const groupCode = `<DtRadio v-model="plan" value="free"       name="plan">Free</DtRadio>
<DtRadio v-model="plan" value="pro"        name="plan">Pro</DtRadio>
<DtRadio v-model="plan" value="enterprise" name="plan">Enterprise</DtRadio>`

const sizesCode = `<DtRadio v-model="plan" value="a" name="sz-sm" size="sm">Small</DtRadio>
<DtRadio v-model="plan" value="b" name="sz-md" size="md">Medium</DtRadio>
<DtRadio v-model="plan" value="c" name="sz-lg" size="lg">Large</DtRadio>`

const descriptionCode = `<DtRadio
  v-model="plan"
  value="free"
  name="plan"
  label="Free"
  description="Core features for personal projects."
/>
<DtRadio
  v-model="plan"
  value="pro"
  name="plan"
  label="Pro"
  description="All features, priority support, 30-day trial."
/>`

const stateCode = `<DtRadio value="off" name="dis" disabled>Disabled</DtRadio>
<DtRadio :model-value="'on'" value="on" name="dis" disabled>Disabled (selected)</DtRadio>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '140px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue',  type: 'string | number',     default: '—',         desc: 'Currently selected group value (v-model).' },
  { name: 'value',       type: 'string | number',     default: 'required',  desc: "This option's value." },
  { name: 'size',        type: "'sm' | 'md' | 'lg'",  default: "'md'",      desc: 'Circle: 16 / 20 / 24 px.' },
  { name: 'disabled',    type: 'boolean',             default: 'false',     desc: 'Native disabled state.' },
  { name: 'name',        type: 'string',              default: '—',         desc: 'Native form group name. Use the same name for all radios in a group.' },
  { name: 'label',       type: 'string',              default: '—',         desc: 'Inline label. Default slot wins.' },
  { name: 'description', type: 'string',              default: '—',         desc: 'Secondary text rendered under the label.' },
  { name: 'id',          type: 'string',              default: 'auto',      desc: 'HTML id for label association.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '140px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'default',     desc: 'Label content. Overrides the `label` prop.' },
  { name: 'description', desc: 'Description content. Overrides the `description` prop.' },
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
        <div v-if="groupTab === 'preview'" class="dx-preview dx-preview--column">
          <DtRadio v-model="plan" value="free"       name="plan">Free</DtRadio>
          <DtRadio v-model="plan" value="pro"        name="plan">Pro</DtRadio>
          <DtRadio v-model="plan" value="enterprise" name="plan">Enterprise</DtRadio>
        </div>
        <CodeBlock v-else :code="groupCode" lang="vue" />
      </div>
      <p style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Selected: <code>{{ plan }}</code>
      </p>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtRadio v-model="sizesPlan" value="a" name="sz-sm" size="sm">Small</DtRadio>
          <DtRadio v-model="sizesPlan" value="b" name="sz-md" size="md">Medium</DtRadio>
          <DtRadio v-model="sizesPlan" value="c" name="sz-lg" size="lg">Large</DtRadio>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Label + description</h2>
      <DtTabSwitcher v-model="descriptionTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="descriptionTab === 'preview'" class="dx-preview dx-preview--column">
          <DtRadio
            v-model="descriptionPlan"
            value="free"
            name="plan-desc"
            label="Free"
            description="Core features for personal projects."
          />
          <DtRadio
            v-model="descriptionPlan"
            value="pro"
            name="plan-desc"
            label="Pro"
            description="All features, priority support, 30-day trial."
          />
        </div>
        <CodeBlock v-else :code="descriptionCode" lang="vue" />
      </div>

      <h2>Disabled</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview dx-preview--column">
          <DtRadio value="off" name="dis" disabled>Disabled</DtRadio>
          <DtRadio :model-value="'on'" value="on" name="dis" disabled>Disabled (selected)</DtRadio>
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
        <li>Hidden native <code>&lt;input type="radio"&gt;</code> — Tab to focus the group, Arrow keys to switch within it.</li>
        <li>Pass the same <code>name</code> to group radios for native exclusive selection.</li>
        <li>Focus ring uses <code>:focus-visible</code> so it only shows on keyboard focus.</li>
        <li>Click anywhere on the label (or description) selects the radio.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-preview--column {
  align-items: flex-start;
}
</style>
