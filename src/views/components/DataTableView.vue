<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import { DtStatusBadge, type StatusVariant } from '@/components/ui/status-badge'
import { DtButton } from '@/components/ui/button'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const basicTab = ref('preview')
const stripedTab = ref('preview')
const stateTab = ref('preview')

type Item = { no: number; name: string; price: number; status: StatusVariant; statusLabel: string }
const items: Item[] = [
  { no: 1, name: 'Document Template A', price: 50_000, status: 'active', statusLabel: 'Active' },
  { no: 2, name: 'Legal Consultation', price: 120_000, status: 'inactive', statusLabel: 'Inactive' },
  { no: 3, name: 'Tax Advisory Report', price: 0, status: 'moderation', statusLabel: 'Moderation' },
  { no: 4, name: 'Court Application Form', price: 30_000, status: 'rejected', statusLabel: 'Rejected' },
]

const cols: DtColumn[] = [
  { key: 'no', label: 'No', width: '64px' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price', width: '120px', hideOnMobile: true, align: 'right' },
  { key: 'status', label: 'Status', width: '140px' },
  { key: 'actions', label: '', width: '80px', align: 'right' },
]

const IMP = 'import'

const basicCode = `<script setup lang="ts">
${IMP} { DtDataTable, type DtColumn } from '@/components/ui/data-table'

const cols: DtColumn[] = [
  { key: 'no', label: 'No', width: '64px' },
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'status', label: 'Status' },
]

const items = [
  { no: 1, name: 'Doc A', price: 50_000, status: 'active' },
  // …
]
<\/script>

<template>
  <DtDataTable :columns="cols" :items="items" :page="1" :page-size="10">
    <template #no="{ rowIndex }">{{ rowIndex }}</template>
    <template #price="{ item }">{{ item.price.toLocaleString() }} UZS</template>
    <template #status="{ item }">
      <DtStatusBadge :variant="item.status">{{ item.statusLabel }}</DtStatusBadge>
    </template>
  </DtDataTable>
</template>`

const stripedCode = `<DtDataTable :columns="cols" :items="items" striped>
  <!-- same slots -->
</DtDataTable>`

const stateCode = `<!-- Loading -->
<DtDataTable :columns="cols" :items="[]" :loading="true" />

<!-- Empty -->
<DtDataTable :columns="cols" :items="[]" empty-text="No documents found" />`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'columns', type: 'DtColumn[]', default: 'required', desc: 'Column definitions.' },
  { name: 'items', type: 'unknown[]', default: 'required', desc: 'Row data.' },
  { name: 'loading', type: 'boolean', default: 'false', desc: 'Show spinner instead of rows.' },
  { name: 'emptyText', type: 'string', default: '—', desc: 'Text shown when items is empty.' },
  { name: 'page', type: 'number', default: '1', desc: 'Used to compute rowIndex in slot props.' },
  { name: 'pageSize', type: 'number', default: '10', desc: 'Used to compute rowIndex in slot props.' },
  { name: 'striped', type: 'boolean', default: 'false', desc: 'Alternating row backgrounds.' },
]

const colCols: DtColumn[] = [
  { key: 'name', label: 'Field', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'desc', label: 'Description' },
]
const colRows = [
  { name: 'key', type: 'string', desc: 'Stable column key. Doubles as the slot name for cell rendering.' },
  { name: 'label', type: 'string', desc: 'Header text.' },
  { name: 'width', type: 'string', desc: 'Optional CSS width (px, %, etc.).' },
  { name: 'align', type: "'left' | 'right' | 'center'", desc: 'Cell text alignment.' },
  { name: 'hideOnMobile', type: 'boolean', desc: 'Hides the column under 768px.' },
]
</script>

<template>
  <DtPageView :title="t('nav.dataTable')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.dataTable.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add data-table" lang="bash" />

      <h2>Basic with custom cells</h2>
      <DtTabSwitcher v-model="basicTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="basicTab === 'preview'">
          <DtDataTable :columns="cols" :items="items" :page="1" :page-size="10" empty-text="No items">
            <template #no="{ rowIndex }">{{ rowIndex }}</template>
            <template #price="{ item }">
              <span style="color: var(--dt-color-accent);">
                {{ (item as Item).price === 0 ? 'Free' : (item as Item).price.toLocaleString() + ' UZS' }}
              </span>
            </template>
            <template #status="{ item }">
              <DtStatusBadge :variant="(item as Item).status">{{ (item as Item).statusLabel }}</DtStatusBadge>
            </template>
            <template #actions>
              <DtButton variant="transparent" size="2xs">Edit</DtButton>
            </template>
          </DtDataTable>
        </div>
        <CodeBlock v-else :code="basicCode" lang="vue" />
      </div>

      <h2>Striped</h2>
      <DtTabSwitcher v-model="stripedTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stripedTab === 'preview'">
          <DtDataTable :columns="cols" :items="items" striped>
            <template #no="{ rowIndex }">{{ rowIndex }}</template>
            <template #price="{ item }">
              {{ (item as Item).price === 0 ? 'Free' : (item as Item).price.toLocaleString() + ' UZS' }}
            </template>
            <template #status="{ item }">
              <DtStatusBadge :variant="(item as Item).status">{{ (item as Item).statusLabel }}</DtStatusBadge>
            </template>
            <template #actions>
              <DtButton variant="transparent" size="2xs">Edit</DtButton>
            </template>
          </DtDataTable>
        </div>
        <CodeBlock v-else :code="stripedCode" lang="vue" />
      </div>

      <h2>Loading + empty</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview dx-preview--column">
          <DtDataTable :columns="cols" :items="[]" :loading="true" />
          <DtDataTable :columns="cols" :items="[]" empty-text="No documents found" />
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

      <h2>DtColumn fields</h2>
      <DtDataTable :columns="colCols" :items="colRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Cell slots</h2>
      <p>
        Each column gets a scoped slot named after its <code>key</code>. Slot props:
        <code>{ item, index, rowIndex }</code>. <code>rowIndex</code> is 1-based across pages —
        useful for displaying continuous row numbers when paginated.
      </p>

      <h2>Optional cell helpers</h2>
      <p>
        The package ships <code>table-cells.css</code> with shared classes
        (<code>.dt-cell-title</code>, <code>.dt-cell-price</code>, <code>.dt-action-btn</code>).
        Import once in <code>main.ts</code> alongside <code>base.css</code>.
      </p>
    </div>
  </DtPageView>
</template>
