<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtSelect, DtSelectTrigger, DtSelectContent, DtSelectItem } from '@/components/ui/select'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const fruit = ref<string | number | null>(null)
const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'mango', label: 'Mango' },
  { value: 'orange', label: 'Orange' },
]

const basicTab = ref('preview')

const IMP = 'import'

const basicCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'
${IMP} {
  DtSelect,
  DtSelectTrigger,
  DtSelectContent,
  DtSelectItem,
} from '@/components/ui/select'

const fruit = ref<string | number | null>(null)
<\/script>

<template>
  <DtSelect v-model="fruit" placeholder="Select a fruit…">
    <DtSelectTrigger />
    <DtSelectContent>
      <DtSelectItem value="apple" label="Apple">Apple</DtSelectItem>
      <DtSelectItem value="banana" label="Banana">Banana</DtSelectItem>
      <DtSelectItem value="cherry" label="Cherry">Cherry</DtSelectItem>
    </DtSelectContent>
  </DtSelect>
</template>`

const selectPropsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '180px' },
  { key: 'desc', label: 'Description' },
]
const selectPropsRows = [
  { name: 'modelValue', type: 'string | number | null', default: 'null', desc: 'Selected value (v-model).' },
  { name: 'defaultValue', type: 'string | number', default: '—', desc: 'Initial uncontrolled value.' },
  { name: 'placeholder', type: 'string', default: "'Select an option…'", desc: 'Trigger placeholder when nothing is selected.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the entire select.' },
  { name: 'name', type: 'string', default: '—', desc: 'Native form field name.' },
  { name: 'required', type: 'boolean', default: 'false', desc: 'Native required state.' },
]

const itemPropsRows = [
  { name: 'value', type: 'string | number', default: 'required', desc: 'Option value.' },
  { name: 'label', type: 'string', default: '—', desc: 'Display label (used for selected text and typeahead).' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable this option.' },
]

const subCols: DtColumn[] = [
  { key: 'name', label: 'Component', width: '180px' },
  { key: 'desc', label: 'Description' },
]
const subRows = [
  { name: 'DtSelect', desc: 'Root + state. Owns the v-model.' },
  { name: 'DtSelectTrigger', desc: 'The button that opens the dropdown.' },
  { name: 'DtSelectContent', desc: 'The dropdown panel. Has search and empty slots.' },
  { name: 'DtSelectItem', desc: 'Single option.' },
]
</script>

<template>
  <DtPageView :title="t('nav.select')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.select.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add select" lang="bash" />
      <p>
        Pulls in <code>reka-ui</code> as an npm dependency automatically — that's where the
        accessible behavior comes from.
      </p>

      <h2>Basic</h2>
      <DtTabSwitcher v-model="basicTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="basicTab === 'preview'" class="dx-preview">
          <div style="max-width: 280px; width: 100%;">
            <DtSelect v-model="fruit" placeholder="Select a fruit…">
              <DtSelectTrigger />
              <DtSelectContent>
                <DtSelectItem v-for="f in fruits" :key="f.value" :value="f.value" :label="f.label" />
              </DtSelectContent>
            </DtSelect>
          </div>
        </div>
        <CodeBlock v-else :code="basicCode" lang="vue" />
      </div>
      <p v-if="fruit" style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Selected: <code>{{ fruit }}</code>
      </p>

      <h2>DtSelect props</h2>
      <DtDataTable :columns="selectPropsCols" :items="selectPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtSelectItem props</h2>
      <DtDataTable :columns="selectPropsCols" :items="itemPropsRows">
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

      <h2>Keyboard</h2>
      <ul>
        <li><strong>↑ / ↓</strong> — move highlight.</li>
        <li><strong>Enter / Space</strong> — open the dropdown or select the highlighted item.</li>
        <li><strong>Esc</strong> — close.</li>
        <li><strong>Type</strong> — typeahead jumps to the next item starting with the typed letter(s).</li>
      </ul>
    </div>
  </DtPageView>
</template>
