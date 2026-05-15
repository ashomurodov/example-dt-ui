<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtInput } from '@/components/ui/input'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add input`

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]
const sizesTab = ref('preview')
const statesTab = ref('preview')

const sizesCode = `<DtInput v-model="text" size="xl" placeholder="64px height">
  <template #label>Extra Large</template>
</DtInput>
<DtInput v-model="text" size="lg" placeholder="60px height">
  <template #label>Large</template>
</DtInput>
<DtInput v-model="text" size="md" placeholder="48px height">
  <template #label>Medium</template>
</DtInput>
<DtInput v-model="text" size="sm" placeholder="36px height">
  <template #label>Small</template>
</DtInput>`

const statesCode = `<DtInput v-model="text" hint="At least 3 characters">
  <template #label>With hint</template>
</DtInput>

<DtInput v-model="text" error="This field is required">
  <template #label>Error</template>
</DtInput>

<DtInput v-model="text" :success="true">
  <template #label>Success</template>
</DtInput>

<DtInput v-model="text" disabled placeholder="Disabled">
  <template #label>Disabled</template>
</DtInput>`

const text = ref('')

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue', type: 'string | number', default: '—', desc: 'Bound value (v-model).' },
  { name: 'type', type: "'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'", default: "'text'", desc: 'Native input type.' },
  { name: 'size', type: "'xl' | 'lg' | 'md' | 'sm'", default: "'md'", desc: 'Height + padding scale.' },
  { name: 'placeholder', type: 'string', default: '—', desc: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the input.' },
  { name: 'error', type: 'string', default: '—', desc: 'Error message shown below; sets aria-invalid.' },
  { name: 'success', type: 'boolean', default: 'false', desc: 'Green border state.' },
  { name: 'hint', type: 'string', default: '—', desc: 'Helper text below input.' },
  { name: 'id', type: 'string', default: 'auto', desc: 'HTML id; auto-generated for label association.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '160px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'label', desc: 'Label content above the input.' },
  { name: 'icon-left', desc: 'Leading icon.' },
  { name: 'icon-right', desc: 'Trailing icon.' },
]
</script>

<template>
  <DtPageView :title="t('nav.input')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.input.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" size="xl" placeholder="XL (64px)">
            <template #label>Extra Large</template>
          </DtInput>
          <DtInput v-model="text" size="lg" placeholder="LG (60px)">
            <template #label>Large</template>
          </DtInput>
          <DtInput v-model="text" size="md" placeholder="MD (48px)">
            <template #label>Medium</template>
          </DtInput>
          <DtInput v-model="text" size="sm" placeholder="SM (36px)">
            <template #label>Small</template>
          </DtInput>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>States</h2>
      <DtTabSwitcher v-model="statesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="statesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" hint="At least 3 characters">
            <template #label>With hint</template>
          </DtInput>
          <DtInput v-model="text" error="This field is required">
            <template #label>Error</template>
          </DtInput>
          <DtInput v-model="text" :success="true">
            <template #label>Success</template>
          </DtInput>
          <DtInput v-model="text" disabled placeholder="Disabled">
            <template #label>Disabled</template>
          </DtInput>
        </div>
        <CodeBlock v-else :code="statesCode" lang="vue" />
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
        <li>Auto-generated <code>id</code> tied to <code>&lt;label&gt;</code> via <code>for</code>.</li>
        <li><code>aria-invalid</code> set when <code>error</code> is provided.</li>
        <li><code>aria-describedby</code> connects error/hint text to the input.</li>
      </ul>
    </div>
  </DtPageView>
</template>
