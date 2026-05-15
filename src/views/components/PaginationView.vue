<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtPagination } from '@/components/ui/pagination'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const variantsTab = ref('preview')
const sizesTab = ref('preview')

const small = ref(1)
const secondary = ref(2)
const primary = ref(3)
const lg = ref(2)
const md = ref(2)
const sm = ref(2)

const variantsCode = `<DtPagination v-model:page="page" :total-count="85" variant="secondary" />
<DtPagination v-model:page="page" :total-count="85" variant="primary" />`

const sizesCode = `<DtPagination v-model:page="page" :total-count="500" size="lg" />
<DtPagination v-model:page="page" :total-count="500" size="md" />
<DtPagination v-model:page="page" :total-count="500" size="sm" />`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'page', type: 'number', default: 'required', desc: 'Current page (v-model:page).' },
  { name: 'totalCount', type: 'number', default: 'required', desc: 'Total item count. Combined with pageSize gives total pages.' },
  { name: 'pageSize', type: 'number', default: '10', desc: 'Items per page.' },
  { name: 'variant', type: "'primary' | 'secondary'", default: "'secondary'", desc: 'Active page styling.' },
  { name: 'size', type: "'lg' | 'md' | 'sm'", default: "'md'", desc: 'Button size.' },
]

const eventsCols: DtColumn[] = [
  { key: 'name', label: 'Event', width: '180px' },
  { key: 'payload', label: 'Payload', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const eventsRows = [
  { name: 'update:page', payload: 'number', desc: 'Emitted on page change (prev/next/specific).' },
]
</script>

<template>
  <DtPageView :title="t('nav.pagination')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.pagination.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add pagination" lang="bash" />

      <h2>Page window behavior</h2>
      <p>The component renders a stable 5-page window with leading/trailing ellipses:</p>
      <ul>
        <li><strong>Near start:</strong> <code>1 2 3 4 5 … 50</code></li>
        <li><strong>Middle:</strong> <code>1 … 14 15 16 17 18 … 50</code></li>
        <li><strong>Near end:</strong> <code>1 … 46 47 48 49 50</code></li>
      </ul>
      <p>When total pages ≤ 7, all pages render without ellipses.</p>

      <h2>Variants</h2>
      <DtTabSwitcher v-model="variantsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="variantsTab === 'preview'" class="dx-preview dx-preview--column">
          <div>
            <p style="margin: 0 0 8px; font-size: var(--dt-text-xs); color: var(--dt-color-text-tertiary); text-transform: uppercase;">Few pages (3)</p>
            <DtPagination v-model:page="small" :total-count="25" :page-size="10" />
          </div>
          <div>
            <p style="margin: 0 0 8px; font-size: var(--dt-text-xs); color: var(--dt-color-text-tertiary); text-transform: uppercase;">Secondary (default)</p>
            <DtPagination v-model:page="secondary" :total-count="85" variant="secondary" />
          </div>
          <div>
            <p style="margin: 0 0 8px; font-size: var(--dt-text-xs); color: var(--dt-color-text-tertiary); text-transform: uppercase;">Primary</p>
            <DtPagination v-model:page="primary" :total-count="85" variant="primary" />
          </div>
        </div>
        <CodeBlock v-else :code="variantsCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtPagination v-model:page="lg" :total-count="500" size="lg" variant="primary" />
          <DtPagination v-model:page="md" :total-count="500" size="md" />
          <DtPagination v-model:page="sm" :total-count="500" size="sm" variant="primary" />
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

      <h2>Events</h2>
      <DtDataTable :columns="eventsCols" :items="eventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>
    </div>
  </DtPageView>
</template>
