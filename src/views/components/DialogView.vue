<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import {
  DtDialog,
  DtDialogTrigger,
  DtDialogContent,
  DtDialogHeader,
  DtDialogFooter,
} from '@/components/ui/dialog'
import { DtButton } from '@/components/ui/button'
import { DtInput } from '@/components/ui/input'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const triggerTab = ref('preview')
const controlledTab = ref('preview')

const open = ref(false)
const formName = ref('')

const IMP = 'import'

const triggerCode = `<script setup lang="ts">
${IMP} {
  DtDialog,
  DtDialogTrigger,
  DtDialogContent,
  DtDialogHeader,
  DtDialogFooter,
} from '@/components/ui/dialog'
${IMP} { DtButton } from '@/components/ui/button'
<\/script>

<template>
  <DtDialog>
    <DtDialogTrigger>
      <DtButton>Open dialog</DtButton>
    </DtDialogTrigger>

    <DtDialogContent>
      <DtDialogHeader>
        <h3>Confirm action</h3>
        <p>Are you sure you want to proceed?</p>
      </DtDialogHeader>

      <DtDialogFooter>
        <DtButton variant="outline">Cancel</DtButton>
        <DtButton>Confirm</DtButton>
      </DtDialogFooter>
    </DtDialogContent>
  </DtDialog>
</template>`

const controlledCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'

const open = ref(false)
const name = ref('')

function submit() {
  // …
  open.value = false
}
<\/script>

<template>
  <DtButton @click="open = true">Open</DtButton>

  <DtDialog v-model="open">
    <DtDialogContent>
      <form @submit.prevent="submit">
        <DtDialogHeader>
          <h3>New item</h3>
        </DtDialogHeader>

        <DtInput v-model="name" placeholder="Item name">
          <template #label>Title</template>
        </DtInput>

        <DtDialogFooter>
          <DtButton type="button" variant="outline" @click="open = false">Cancel</DtButton>
          <DtButton type="submit">Create</DtButton>
        </DtDialogFooter>
      </form>
    </DtDialogContent>
  </DtDialog>
</template>`

const dialogPropsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const dialogPropsRows = [
  { name: 'modelValue', type: 'boolean', default: 'undefined', desc: 'Open state (v-model). Omit for uncontrolled mode (use <DtDialogTrigger> instead).' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', desc: 'Initial open state for uncontrolled mode.' },
  { name: 'modal', type: 'boolean', default: 'true', desc: 'When true, the dialog is modal — outside content is inert.' },
]

const subCols: DtColumn[] = [
  { key: 'name', label: 'Component', width: '180px' },
  { key: 'desc', label: 'Description' },
]
const subRows = [
  { name: 'DtDialog', desc: 'Root + open/close state. Owns v-model.' },
  { name: 'DtDialogTrigger', desc: 'Wraps the trigger element. Click toggles the dialog open.' },
  { name: 'DtDialogContent', desc: 'The modal panel itself. Renders via Teleport to <body>.' },
  { name: 'DtDialogHeader', desc: 'Title block at the top. Styles inner h1–h4 and p elements.' },
  { name: 'DtDialogFooter', desc: 'Horizontal flex layout for action buttons.' },
]
</script>

<template>
  <DtPageView :title="t('nav.dialog')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.dialog.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add dialog" lang="bash" />
      <p>
        The CLI will prompt to also install <code>button</code> (declared as an internal dep)
        and pulls in <code>reka-ui</code> as an npm dependency.
      </p>

      <h2>Uncontrolled (with trigger)</h2>
      <DtTabSwitcher v-model="triggerTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="triggerTab === 'preview'" class="dx-preview">
          <DtDialog>
            <DtDialogTrigger>
              <DtButton>Open dialog</DtButton>
            </DtDialogTrigger>
            <DtDialogContent>
              <DtDialogHeader>
                <h3>Confirm action</h3>
                <p>Are you sure you want to proceed?</p>
              </DtDialogHeader>
              <DtDialogFooter>
                <DtButton variant="outline">Cancel</DtButton>
                <DtButton>Confirm</DtButton>
              </DtDialogFooter>
            </DtDialogContent>
          </DtDialog>
        </div>
        <CodeBlock v-else :code="triggerCode" lang="vue" />
      </div>

      <h2>Controlled (with v-model)</h2>
      <DtTabSwitcher v-model="controlledTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="controlledTab === 'preview'" class="dx-preview">
          <DtButton @click="open = true">Open via v-model</DtButton>
          <DtDialog v-model="open">
            <DtDialogContent>
              <form @submit.prevent="open = false">
                <DtDialogHeader>
                  <h3>New item</h3>
                </DtDialogHeader>
                <DtInput v-model="formName" placeholder="Item name">
                  <template #label>Title</template>
                </DtInput>
                <DtDialogFooter>
                  <DtButton type="button" variant="outline" @click="open = false">Cancel</DtButton>
                  <DtButton type="submit">Create</DtButton>
                </DtDialogFooter>
              </form>
            </DtDialogContent>
          </DtDialog>
        </div>
        <CodeBlock v-else :code="controlledCode" lang="vue" />
      </div>

      <h2>DtDialog props</h2>
      <DtDataTable :columns="dialogPropsCols" :items="dialogPropsRows">
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

      <h2>Accessibility</h2>
      <ul>
        <li><code>role="dialog"</code> + <code>aria-modal="true"</code> on the content panel.</li>
        <li>Focus is trapped inside the dialog while open.</li>
        <li>Focus returns to the trigger element on close.</li>
        <li><strong>Escape</strong> closes the dialog. Outside-click closes by default (disable via <code>reka-ui</code> props if needed).</li>
        <li>Body scroll is locked while the dialog is open.</li>
      </ul>
    </div>
  </DtPageView>
</template>
