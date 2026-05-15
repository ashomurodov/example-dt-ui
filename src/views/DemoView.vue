<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView, DtDivider } from '@/components/ui/layout'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtSearchToolbar } from '@/components/ui/search-toolbar'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import { DtPagination } from '@/components/ui/pagination'
import { DtStatusBadge, type StatusVariant } from '@/components/ui/status-badge'
import { DtCard } from '@/components/ui/card'
import { DtBadge } from '@/components/ui/badge'
import { DtDialog, DtDialogContent, DtDialogHeader, DtDialogFooter } from '@/components/ui/dialog'
import { DtButton } from '@/components/ui/button'
import { DtInput } from '@/components/ui/input'
import { DtSelect, DtSelectTrigger, DtSelectContent, DtSelectItem } from '@/components/ui/select'

const { t } = useI18n()

type Doc = {
  no: number
  name: string
  status: StatusVariant
  statusLabel: string
  amount: number
  client: string
  updated: string
}

const allDocs: Doc[] = [
  { no: 1, name: 'Contract — ACME Corp', status: 'active', statusLabel: 'Active', amount: 1_200_000, client: 'ACME Corp', updated: '2026-05-09' },
  { no: 2, name: 'Invoice #2026-441', status: 'moderation', statusLabel: 'In moderation', amount: 480_000, client: 'Globex', updated: '2026-05-08' },
  { no: 3, name: 'NDA — Hooli', status: 'active', statusLabel: 'Active', amount: 0, client: 'Hooli', updated: '2026-05-07' },
  { no: 4, name: 'Service Agreement v3', status: 'inactive', statusLabel: 'Inactive', amount: 750_000, client: 'Initech', updated: '2026-05-06' },
  { no: 5, name: 'Court Application 2026-12', status: 'rejected', statusLabel: 'Rejected', amount: 90_000, client: 'Pied Piper', updated: '2026-05-04' },
  { no: 6, name: 'Lease Renewal', status: 'active', statusLabel: 'Active', amount: 2_400_000, client: 'Stark Industries', updated: '2026-05-03' },
  { no: 7, name: 'Tax Filing — Q1', status: 'canceled', statusLabel: 'Canceled', amount: 0, client: 'Wayne Enterprises', updated: '2026-04-30' },
  { no: 8, name: 'Vendor Onboarding', status: 'active', statusLabel: 'Active', amount: 320_000, client: 'Soylent', updated: '2026-04-28' },
  { no: 9, name: 'Trademark Application', status: 'moderation', statusLabel: 'In moderation', amount: 180_000, client: 'Cyberdyne', updated: '2026-04-27' },
  { no: 10, name: 'Office Sublet', status: 'active', statusLabel: 'Active', amount: 5_400_000, client: 'Massive Dynamic', updated: '2026-04-25' },
  { no: 11, name: 'Brand Asset License', status: 'inactive', statusLabel: 'Inactive', amount: 60_000, client: 'Tyrell Corp', updated: '2026-04-22' },
  { no: 12, name: 'Settlement Draft', status: 'blocked', statusLabel: 'Blocked', amount: 0, client: 'Nakatomi Trading', updated: '2026-04-20' },
]

const tabs: DtTab[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'moderation', label: 'In moderation', badge: '2' },
  { key: 'rejected', label: 'Rejected' },
]
const activeTab = ref('all')

const search = ref('')
const page = ref(1)
const pageSize = 6

const filterStatus = ref<string | number | null>(null)
const statusOptions = [
  { value: null, label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'moderation', label: 'In moderation' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'blocked', label: 'Blocked' },
]

const filtered = computed(() => {
  return allDocs.filter(doc => {
    if (activeTab.value === 'active' && doc.status !== 'active') return false
    if (activeTab.value === 'moderation' && doc.status !== 'moderation') return false
    if (activeTab.value === 'rejected' && doc.status !== 'rejected') return false
    if (filterStatus.value && doc.status !== filterStatus.value) return false
    if (search.value) {
      const q = search.value.toLowerCase()
      if (!doc.name.toLowerCase().includes(q) && !doc.client.toLowerCase().includes(q)) return false
    }
    return true
  })
})

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

const activeCount = computed(() => allDocs.filter(d => d.status === 'active').length)
const pendingCount = computed(() => allDocs.filter(d => d.status === 'moderation').length)
const totalVolume = computed(() => allDocs.reduce((acc, d) => acc + d.amount, 0))

const cols: DtColumn[] = [
  { key: 'no', label: 'No', width: '64px' },
  { key: 'name', label: 'Document' },
  { key: 'client', label: 'Client', hideOnMobile: true },
  { key: 'amount', label: 'Amount', hideOnMobile: true, align: 'right' },
  { key: 'status', label: 'Status', width: '140px' },
  { key: 'updated', label: 'Updated', hideOnMobile: true, width: '110px' },
  { key: 'actions', label: '', align: 'right', width: '80px' },
]

const showCreate = ref(false)
const newName = ref('')

function createDoc() {
  // Demo only — no actual side effect
  showCreate.value = false
  newName.value = ''
}

function formatAmount(n: number): string {
  if (n === 0) return 'Free'
  return new Intl.NumberFormat('en-US').format(n) + ' UZS'
}
</script>

<template>
  <DtPageView :title="t('pages.demo.title')" max-width="1280px">
    <p class="demo__lead">{{ t('pages.demo.lead') }}</p>

    <!-- Stats row -->
    <section class="demo__stats">
      <DtCard class="demo__stat">
        <p class="demo__stat-label">Total documents</p>
        <div class="demo__stat-value-row">
          <span class="demo__stat-value">{{ allDocs.length }}</span>
        </div>
      </DtCard>

      <DtCard class="demo__stat">
        <p class="demo__stat-label">Active</p>
        <div class="demo__stat-value-row">
          <span class="demo__stat-value">{{ activeCount }}</span>
          <DtBadge variant="green" size="sm" dot>Live</DtBadge>
        </div>
      </DtCard>

      <DtCard class="demo__stat">
        <p class="demo__stat-label">Pending review</p>
        <div class="demo__stat-value-row">
          <span class="demo__stat-value">{{ pendingCount }}</span>
          <DtBadge variant="orange" size="sm" dot>Awaiting</DtBadge>
        </div>
      </DtCard>

      <DtCard class="demo__stat">
        <p class="demo__stat-label">Total volume</p>
        <div class="demo__stat-value-row">
          <span class="demo__stat-value">{{ formatAmount(totalVolume) }}</span>
        </div>
      </DtCard>
    </section>

    <!-- Filter + search row -->
    <section class="demo__filters">
      <DtTabSwitcher v-model="activeTab" :tabs="tabs" />

      <div class="demo__filter-row">
        <div class="demo__search">
          <DtSearchToolbar
            v-model:search="search"
            search-placeholder="Search by document or client…"
            add-label="Create"
            @add="showCreate = true"
          />
        </div>
        <div class="demo__status">
          <DtSelect v-model="filterStatus" placeholder="Filter by status">
            <DtSelectTrigger />
            <DtSelectContent>
              <DtSelectItem
                v-for="opt in statusOptions"
                :key="String(opt.value)"
                :value="(opt.value as string | number)"
                :label="opt.label"
              >
                {{ opt.label }}
              </DtSelectItem>
            </DtSelectContent>
          </DtSelect>
        </div>
      </div>
    </section>

    <DtDivider />

    <!-- Table -->
    <DtDataTable
      :columns="cols"
      :items="paged"
      :page="page"
      :page-size="pageSize"
      empty-text="No documents match your filters."
    >
      <template #no="{ rowIndex }">{{ rowIndex }}</template>
      <template #amount="{ item }">
        <span class="demo__amount">{{ formatAmount((item as Doc).amount) }}</span>
      </template>
      <template #status="{ item }">
        <DtStatusBadge :variant="(item as Doc).status">
          {{ (item as Doc).statusLabel }}
        </DtStatusBadge>
      </template>
      <template #actions>
        <DtButton variant="transparent" size="2xs">Edit</DtButton>
      </template>
    </DtDataTable>

    <div class="demo__pagination">
      <DtPagination
        v-model:page="page"
        :total-count="filtered.length"
        :page-size="pageSize"
      />
    </div>

    <!-- Create dialog -->
    <DtDialog v-model="showCreate">
      <DtDialogContent>
        <DtDialogHeader>
          <h3>Create document</h3>
          <p>Demo only — submit doesn't persist.</p>
        </DtDialogHeader>

        <DtInput v-model="newName" placeholder="e.g. Contract — Vendor X">
          <template #label>Document name</template>
        </DtInput>

        <DtDialogFooter>
          <DtButton variant="outline" @click="showCreate = false">Cancel</DtButton>
          <DtButton @click="createDoc">Create</DtButton>
        </DtDialogFooter>
      </DtDialogContent>
    </DtDialog>
  </DtPageView>
</template>

<style scoped>
.demo__lead {
  margin: 0 0 var(--dt-spacing-5xl);
  color: var(--dt-color-text-secondary);
  font-size: var(--dt-text-body-md);
  line-height: var(--dt-leading-body-md);
}

/* ─── Stats ───────────────────────────────── */
.demo__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--dt-spacing-xl);
  margin-bottom: var(--dt-spacing-5xl);
}

.demo__stat {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-md);
}

.demo__stat-label {
  margin: 0;
  font-size: var(--dt-text-body-xs);
  font-weight: var(--dt-font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--dt-color-text-tertiary);
}

.demo__stat-value-row {
  display: flex;
  align-items: center;
  gap: var(--dt-spacing-md);
  flex-wrap: wrap;
}

.demo__stat-value {
  font-size: var(--dt-text-h5);
  line-height: var(--dt-leading-h5);
  font-weight: var(--dt-font-semibold);
  color: var(--dt-color-text);
}

/* ─── Filters ─────────────────────────────── */
.demo__filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;       /* prevent children stretching to 100% */
  gap: var(--dt-spacing-xl);
  margin-bottom: var(--dt-spacing-xl);
}

.demo__filter-row {
  display: flex;
  align-items: center;
  gap: var(--dt-spacing-lg);
  width: 100%;                   /* this row still needs full width */
}

.demo__search {
  flex: 1;
  min-width: 0;
}

.demo__status {
  width: 220px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .demo__filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  .demo__status {
    width: 100%;
  }
}

/* ─── Table cells ─────────────────────────── */
.demo__amount {
  color: var(--dt-color-accent);
  font-weight: var(--dt-font-medium);
}

.demo__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--dt-spacing-xl);
}
</style>
