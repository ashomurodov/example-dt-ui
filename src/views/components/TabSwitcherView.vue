<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const previewTabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const basicTab = ref('preview')
const badgeTab = ref('preview')

// Demo data
const docTabs: DtTab[] = [
  { key: 'all', label: 'All documents' },
  { key: 'published', label: 'Published' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'moderation', label: 'In moderation' },
]
const docActive = ref('all')

const badgeTabs: DtTab[] = [
  { key: 'inbox', label: 'Inbox', badge: '12' },
  { key: 'sent', label: 'Sent' },
  { key: 'archive', label: 'Archive', badge: '3' },
]
const badgeActive = ref('inbox')

const basicCode = `<script setup lang="ts">
${'import'} { ref } from 'vue'
${'import'} { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'

const tabs: DtTab[] = [
  { key: 'all', label: 'All documents' },
  { key: 'published', label: 'Published' },
  { key: 'inactive', label: 'Inactive' },
  { key: 'moderation', label: 'In moderation' },
]
const active = ref('all')
<\/script>

<template>
  <DtTabSwitcher v-model="active" :tabs="tabs" />
</template>`

const badgeCode = `const tabs: DtTab[] = [
  { key: 'inbox', label: 'Inbox', badge: '12' },
  { key: 'sent', label: 'Sent' },
  { key: 'archive', label: 'Archive', badge: '3' },
]`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'tabs', type: 'DtTab[]', default: 'required', desc: 'Tab definitions.' },
  { name: 'modelValue', type: 'string', default: 'required', desc: 'Active tab key (v-model).' },
]

const tabFieldCols: DtColumn[] = [
  { key: 'name', label: 'Field', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'desc', label: 'Description' },
]
const tabFieldRows = [
  { name: 'key', type: 'string', desc: 'Stable identifier.' },
  { name: 'label', type: 'string', desc: 'Visible tab text.' },
  { name: 'badge', type: 'string', desc: 'Optional count/label rendered after the title.' },
]

const eventsCols: DtColumn[] = [
  { key: 'name', label: 'Event', width: '180px' },
  { key: 'payload', label: 'Payload', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const eventsRows = [
  { name: 'update:modelValue', payload: 'string', desc: 'Emitted with the new active tab key.' },
]
</script>

<template>
  <DtPageView :title="t('nav.tabSwitcher')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.tabSwitcher.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add tab-switcher" lang="bash" />

      <h2>Basic</h2>
      <DtTabSwitcher v-model="basicTab" :tabs="previewTabs" />
      <div class="dx-tab-panel">
        <div v-if="basicTab === 'preview'" class="dx-preview dx-preview--column">
          <DtTabSwitcher v-model="docActive" :tabs="docTabs" />
          <p style="margin: 0; color: var(--dt-color-text-secondary);">
            Active: <code>{{ docActive }}</code>
          </p>
        </div>
        <CodeBlock v-else :code="basicCode" lang="vue" />
      </div>

      <h2>With badges</h2>
      <DtTabSwitcher v-model="badgeTab" :tabs="previewTabs" />
      <div class="dx-tab-panel">
        <div v-if="badgeTab === 'preview'" class="dx-preview dx-preview--column">
          <DtTabSwitcher v-model="badgeActive" :tabs="badgeTabs" />
        </div>
        <CodeBlock v-else :code="badgeCode" lang="typescript" />
      </div>

      <h2>Props</h2>
      <DtDataTable :columns="propsCols" :items="propsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtTab fields</h2>
      <DtDataTable :columns="tabFieldCols" :items="tabFieldRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Events</h2>
      <DtDataTable :columns="eventsCols" :items="eventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>How the indicator works</h2>
      <p>
        The active underline measures its destination, animates from its previous position,
        and resizes via CSS transitions — a FLIP animation. No external animation library.
      </p>
    </div>
  </DtPageView>
</template>
