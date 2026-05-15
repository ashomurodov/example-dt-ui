<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtStatusBadge } from '@/components/ui/status-badge'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const variantsTab = ref('preview')

const variantsCode = `<DtStatusBadge variant="active">Active</DtStatusBadge>
<DtStatusBadge variant="inactive">Inactive</DtStatusBadge>
<DtStatusBadge variant="moderation">In moderation</DtStatusBadge>
<DtStatusBadge variant="canceled">Canceled</DtStatusBadge>
<DtStatusBadge variant="rejected">Rejected</DtStatusBadge>
<DtStatusBadge variant="blocked">Blocked</DtStatusBadge>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'variant', type: "'active' | 'inactive' | 'moderation' | 'canceled' | 'rejected' | 'blocked'", desc: 'Semantic status — required.' },
]
</script>

<template>
  <DtPageView :title="t('nav.statusBadge')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.statusBadge.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add status-badge" lang="bash" />

      <h2>Variants</h2>
      <DtTabSwitcher v-model="variantsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="variantsTab === 'preview'" class="dx-preview">
          <DtStatusBadge variant="active">Active</DtStatusBadge>
          <DtStatusBadge variant="inactive">Inactive</DtStatusBadge>
          <DtStatusBadge variant="moderation">In moderation</DtStatusBadge>
          <DtStatusBadge variant="canceled">Canceled</DtStatusBadge>
          <DtStatusBadge variant="rejected">Rejected</DtStatusBadge>
          <DtStatusBadge variant="blocked">Blocked</DtStatusBadge>
        </div>
        <CodeBlock v-else :code="variantsCode" lang="vue" />
      </div>

      <h2>Props</h2>
      <DtDataTable :columns="propsCols" :items="propsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Slots</h2>
      <p>One slot, <code>default</code> — the visible text.</p>
    </div>
  </DtPageView>
</template>
