<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtCheckbox } from '@/components/ui/checkbox'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const a = ref(true)
const b = ref(false)
const c = ref(false)
const remember = ref(true)

// Indeterminate demo — "select all" pattern
const items = ref([
  { name: 'Notifications',  checked: true },
  { name: 'Marketing',      checked: false },
  { name: 'Product updates', checked: true },
])
const allChecked = computed(() => items.value.every((i) => i.checked))
const someChecked = computed(() => items.value.some((i) => i.checked) && !allChecked.value)
function toggleAll(next: boolean) {
  items.value.forEach((i) => { i.checked = next })
}

const sizesTab = ref('preview')
const indeterminateTab = ref('preview')
const descriptionTab = ref('preview')
const stateTab = ref('preview')

const sizesCode = `<DtCheckbox v-model="a" size="sm">Small</DtCheckbox>
<DtCheckbox v-model="b" size="md">Medium</DtCheckbox>
<DtCheckbox v-model="c" size="lg">Large</DtCheckbox>`

const indeterminateCode = `<script setup lang="ts">
import { computed, ref } from 'vue'
import { DtCheckbox } from '@/components/ui/checkbox'

const items = ref([
  { name: 'Notifications',  checked: true },
  { name: 'Marketing',      checked: false },
  { name: 'Product updates', checked: true },
])
const allChecked  = computed(() => items.value.every((i) => i.checked))
const someChecked = computed(() => items.value.some((i) => i.checked) && !allChecked.value)
function toggleAll(next: boolean) {
  items.value.forEach((i) => { i.checked = next })
}
<\/script>

<template>
  <DtCheckbox
    :model-value="allChecked"
    :indeterminate="someChecked"
    @update:model-value="toggleAll"
  >
    Select all
  </DtCheckbox>
  <DtCheckbox v-for="item in items" :key="item.name" v-model="item.checked">
    {{ item.name }}
  </DtCheckbox>
</template>`

const descriptionCode = `<DtCheckbox
  v-model="remember"
  label="Remember me"
  description="Save my login details for next time."
/>`

const stateCode = `<DtCheckbox disabled>Disabled</DtCheckbox>
<DtCheckbox disabled :model-value="true">Disabled (checked)</DtCheckbox>
<DtCheckbox disabled indeterminate>Disabled (indeterminate)</DtCheckbox>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '140px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'modelValue',    type: 'boolean',            default: 'false', desc: 'Checked state (v-model).' },
  { name: 'indeterminate', type: 'boolean',            default: 'false', desc: 'Visual partially-checked state. Renders a dash glyph. Does not change modelValue.' },
  { name: 'size',          type: "'sm' | 'md' | 'lg'", default: "'md'",  desc: 'Box: 16 / 20 / 24 px.' },
  { name: 'disabled',      type: 'boolean',            default: 'false', desc: 'Native disabled state.' },
  { name: 'label',         type: 'string',             default: '—',     desc: 'Inline label. Default slot wins.' },
  { name: 'description',   type: 'string',             default: '—',     desc: 'Secondary text rendered under the label.' },
  { name: 'id',            type: 'string',             default: 'auto',  desc: 'HTML id for label association.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '140px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'default',     desc: 'Label content. Overrides the `label` prop.' },
  { name: 'description', desc: 'Description content. Overrides the `description` prop.' },
]
</script>

<template>
  <DtPageView :title="t('nav.checkbox')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.checkbox.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add checkbox" lang="bash" />

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtCheckbox v-model="a" size="sm">Small (16×16)</DtCheckbox>
          <DtCheckbox v-model="b" size="md">Medium (20×20)</DtCheckbox>
          <DtCheckbox v-model="c" size="lg">Large (24×24)</DtCheckbox>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Indeterminate</h2>
      <p>
        The classic "select all" pattern — when only some children are checked the parent shows
        the mixed-state dash glyph. <code>indeterminate</code> is purely visual; the parent
        controls when to flip it off.
      </p>
      <DtTabSwitcher v-model="indeterminateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="indeterminateTab === 'preview'" class="dx-preview dx-preview--column">
          <DtCheckbox
            :model-value="allChecked"
            :indeterminate="someChecked"
            @update:model-value="toggleAll"
          >
            Select all
          </DtCheckbox>
          <DtCheckbox v-for="item in items" :key="item.name" v-model="item.checked">
            {{ item.name }}
          </DtCheckbox>
        </div>
        <CodeBlock v-else :code="indeterminateCode" lang="vue" />
      </div>

      <h2>Label + description</h2>
      <DtTabSwitcher v-model="descriptionTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="descriptionTab === 'preview'" class="dx-preview dx-preview--column">
          <DtCheckbox
            v-model="remember"
            label="Remember me"
            description="Save my login details for next time."
          />
        </div>
        <CodeBlock v-else :code="descriptionCode" lang="vue" />
      </div>

      <h2>Disabled</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview dx-preview--column">
          <DtCheckbox disabled>Disabled</DtCheckbox>
          <DtCheckbox disabled :model-value="true">Disabled (checked)</DtCheckbox>
          <DtCheckbox disabled indeterminate>Disabled (indeterminate)</DtCheckbox>
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

      <h2>Slots</h2>
      <DtDataTable :columns="slotsCols" :items="slotsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li>Hidden native <code>&lt;input type="checkbox"&gt;</code> — Tab to focus, Space to toggle, form submission works.</li>
        <li><code>aria-checked="mixed"</code> set when <code>indeterminate</code> is true.</li>
        <li>Focus ring uses <code>:focus-visible</code> so it only shows on keyboard focus.</li>
        <li>Click anywhere on the label (or description) toggles the checkbox.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
/* Stack the demos vertically without stretching them across the preview area */
.dx-preview--column {
  align-items: flex-start;
}
</style>
