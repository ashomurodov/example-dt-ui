<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtBadge } from '@/components/ui/badge'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const colorsTab = ref('preview')
const sizesTab = ref('preview')
const dotTab = ref('preview')

const colorsCode = `<DtBadge variant="gray">Gray</DtBadge>
<DtBadge variant="green">Green</DtBadge>
<DtBadge variant="red">Red</DtBadge>
<DtBadge variant="blue">Blue</DtBadge>
<DtBadge variant="orange">Orange</DtBadge>
<DtBadge variant="yellow">Yellow</DtBadge>`

const sizesCode = `<DtBadge variant="green" size="sm">SM</DtBadge>
<DtBadge variant="green" size="md">MD</DtBadge>
<DtBadge variant="green" size="lg">LG</DtBadge>`

const dotCode = `<DtBadge variant="green" dot>Online</DtBadge>
<DtBadge variant="red" dot>Offline</DtBadge>
<DtBadge variant="orange" dot>Away</DtBadge>
<DtBadge variant="blue" dot>Working</DtBadge>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'variant', type: "'gray' | 'green' | 'red' | 'blue' | 'orange' | 'yellow'", default: "'gray'", desc: 'Color tag.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Padding + font size.' },
  { name: 'dot', type: 'boolean', default: 'false', desc: 'Render a leading 6px dot.' },
]
</script>

<template>
  <DtPageView :title="t('nav.badge')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.badge.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add badge" lang="bash" />

      <h2>Colors</h2>
      <DtTabSwitcher v-model="colorsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="colorsTab === 'preview'" class="dx-preview">
          <DtBadge variant="gray">Gray</DtBadge>
          <DtBadge variant="green">Green</DtBadge>
          <DtBadge variant="red">Red</DtBadge>
          <DtBadge variant="blue">Blue</DtBadge>
          <DtBadge variant="orange">Orange</DtBadge>
          <DtBadge variant="yellow">Yellow</DtBadge>
        </div>
        <CodeBlock v-else :code="colorsCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview">
          <DtBadge variant="green" size="sm">SM</DtBadge>
          <DtBadge variant="green" size="md">MD</DtBadge>
          <DtBadge variant="green" size="lg">LG</DtBadge>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>With dot</h2>
      <DtTabSwitcher v-model="dotTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="dotTab === 'preview'" class="dx-preview">
          <DtBadge variant="green" dot>Online</DtBadge>
          <DtBadge variant="red" dot>Offline</DtBadge>
          <DtBadge variant="orange" dot>Away</DtBadge>
          <DtBadge variant="blue" dot>Working</DtBadge>
        </div>
        <CodeBlock v-else :code="dotCode" lang="vue" />
      </div>

      <h2>Props</h2>
      <DtDataTable :columns="propsCols" :items="propsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>
    </div>
  </DtPageView>
</template>
