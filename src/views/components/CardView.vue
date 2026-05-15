<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtCard, DtCardHeader, DtCardContent, DtCardFooter } from '@/components/ui/card'
import { DtButton } from '@/components/ui/button'
import { DtBadge } from '@/components/ui/badge'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add card`

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const basicTab = ref('preview')
const composedTab = ref('preview')
const variantsTab = ref('preview')

const basicCode = `<DtCard>
  <DtCardHeader>
    <h3>Welcome</h3>
    <p>Card description text.</p>
  </DtCardHeader>
  <DtCardContent>
    <p>Body content goes here.</p>
  </DtCardContent>
</DtCard>`

const composedCode = `<DtCard>
  <DtCardHeader>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h3>Pro Plan</h3>
      <DtBadge variant="green">Active</DtBadge>
    </div>
    <p>Renews on April 1, 2026.</p>
  </DtCardHeader>
  <DtCardContent>
    <p>50 GB storage, unlimited collaborators, priority support.</p>
  </DtCardContent>
  <DtCardFooter>
    <DtButton variant="outline">Manage</DtButton>
    <DtButton>Upgrade</DtButton>
  </DtCardFooter>
</DtCard>`

const variantsCode = `<!-- Bordered (default) -->
<DtCard>...</DtCard>

<!-- Elevated, no border -->
<DtCard :bordered="false" :shadow="true">...</DtCard>

<!-- No padding (full-bleed images) -->
<DtCard :padding="false">
  <img src="/banner.jpg" />
  <div style="padding: 24px;">…</div>
</DtCard>`

const cardPropsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const cardPropsRows = [
  { name: 'bordered', type: 'boolean', default: 'true', desc: '1px solid border using --dt-color-border.' },
  { name: 'shadow', type: 'boolean', default: 'false', desc: 'Medium box-shadow (--dt-shadow-md).' },
  { name: 'padding', type: 'boolean', default: 'true', desc: 'Apply --dt-spacing-3xl padding.' },
]

const subCols: DtColumn[] = [
  { key: 'name', label: 'Component', width: '180px' },
  { key: 'desc', label: 'Description' },
]
const subRows = [
  { name: 'DtCard', desc: 'Root container.' },
  { name: 'DtCardHeader', desc: 'Title + description block at the top.' },
  { name: 'DtCardContent', desc: 'Main body wrapper.' },
  { name: 'DtCardFooter', desc: 'Horizontal flex layout for action buttons.' },
]
</script>

<template>
  <DtPageView :title="t('nav.card')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.card.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Basic</h2>
      <DtTabSwitcher v-model="basicTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="basicTab === 'preview'" class="dx-preview" style="background: var(--dt-color-background-secondary);">
          <DtCard style="max-width: 360px; width: 100%;">
            <DtCardHeader>
              <h3>Welcome</h3>
              <p>Card description text.</p>
            </DtCardHeader>
            <DtCardContent>
              <p style="margin: 0;">Body content goes here.</p>
            </DtCardContent>
          </DtCard>
        </div>
        <CodeBlock v-else :code="basicCode" lang="vue" />
      </div>

      <h2>Composed with other components</h2>
      <DtTabSwitcher v-model="composedTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="composedTab === 'preview'" class="dx-preview" style="background: var(--dt-color-background-secondary);">
          <DtCard style="max-width: 400px; width: 100%;">
            <DtCardHeader>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0;">Pro Plan</h3>
                <DtBadge variant="green">Active</DtBadge>
              </div>
              <p>Renews on April 1, 2026.</p>
            </DtCardHeader>
            <DtCardContent>
              <p style="margin: 0;">50 GB storage, unlimited collaborators, priority support.</p>
            </DtCardContent>
            <DtCardFooter>
              <DtButton variant="outline">Manage</DtButton>
              <DtButton>Upgrade</DtButton>
            </DtCardFooter>
          </DtCard>
        </div>
        <CodeBlock v-else :code="composedCode" lang="vue" />
      </div>

      <h2>Variants</h2>
      <DtTabSwitcher v-model="variantsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="variantsTab === 'preview'" class="dx-preview" style="background: var(--dt-color-background-secondary); align-items: stretch;">
          <DtCard style="flex: 1; min-width: 200px;">
            <DtCardHeader>
              <h3 style="margin: 0;">Bordered</h3>
            </DtCardHeader>
            <DtCardContent><p style="margin: 0;">Default style.</p></DtCardContent>
          </DtCard>
          <DtCard :bordered="false" :shadow="true" style="flex: 1; min-width: 200px;">
            <DtCardHeader>
              <h3 style="margin: 0;">Shadow</h3>
            </DtCardHeader>
            <DtCardContent><p style="margin: 0;">Elevated, no border.</p></DtCardContent>
          </DtCard>
        </div>
        <CodeBlock v-else :code="variantsCode" lang="vue" />
      </div>

      <h2>DtCard Props</h2>
      <DtDataTable :columns="cardPropsCols" :items="cardPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Sub-components</h2>
      <DtDataTable :columns="subCols" :items="subRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>
    </div>
  </DtPageView>
</template>
