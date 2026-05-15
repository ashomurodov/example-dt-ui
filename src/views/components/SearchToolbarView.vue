<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtSearchToolbar } from '@/components/ui/search-toolbar'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const fullTab = ref('preview')
const searchOnlyTab = ref('preview')

const fullSearch = ref('')
const onlySearch = ref('')

const lastEvent = ref<string>('—')

const fullCode = `<script setup lang="ts">
${'import'} { ref } from 'vue'
${'import'} { DtSearchToolbar } from '@/components/ui/search-toolbar'

const search = ref('')
const onAdd = () => { /* open create modal */ }
const onSearch = () => { /* refetch list (debounce in your handler!) */ }
<\/script>

<template>
  <DtSearchToolbar
    v-model:search="search"
    search-placeholder="Search documents…"
    add-label="Create"
    @add="onAdd"
    @search="onSearch"
  />
</template>`

const searchOnlyCode = `<DtSearchToolbar
  v-model:search="search"
  search-placeholder="Search…"
/>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '180px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'search', type: 'string', default: "''", desc: 'Search query (v-model:search).' },
  { name: 'searchPlaceholder', type: 'string', default: '—', desc: 'Placeholder text for the input.' },
  { name: 'addLabel', type: 'string', default: '—', desc: 'Action button label. Omit to hide the button.' },
]

const eventsCols: DtColumn[] = [
  { key: 'name', label: 'Event', width: '180px' },
  { key: 'payload', label: 'Payload', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const eventsRows = [
  { name: 'update:search', payload: 'string', desc: 'Fires on every keystroke.' },
  { name: 'search', payload: '—', desc: 'Fires on every input event. Debounce in your handler before calling APIs.' },
  { name: 'add', payload: '—', desc: 'Fires when the action button is clicked.' },
]
</script>

<template>
  <DtPageView :title="t('nav.searchToolbar')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.searchToolbar.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add search-toolbar" lang="bash" />

      <h2>With action button</h2>
      <DtTabSwitcher v-model="fullTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="fullTab === 'preview'" class="dx-preview dx-preview--column">
          <DtSearchToolbar
            v-model:search="fullSearch"
            search-placeholder="Search documents…"
            add-label="Create"
            @add="lastEvent = 'add'"
            @search="lastEvent = `search: ${fullSearch}`"
          />
          <p style="margin: 0; color: var(--dt-color-text-secondary);">
            Last event: <code>{{ lastEvent }}</code>
          </p>
        </div>
        <CodeBlock v-else :code="fullCode" lang="vue" />
      </div>

      <h2>Without action button</h2>
      <DtTabSwitcher v-model="searchOnlyTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="searchOnlyTab === 'preview'" class="dx-preview dx-preview--column">
          <DtSearchToolbar
            v-model:search="onlySearch"
            search-placeholder="Search…"
          />
        </div>
        <CodeBlock v-else :code="searchOnlyCode" lang="vue" />
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
