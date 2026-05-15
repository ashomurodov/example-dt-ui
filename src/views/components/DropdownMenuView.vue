<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import {
  DtDropdownMenu,
  DtDropdownMenuTrigger,
  DtDropdownMenuContent,
  DtDropdownMenuItem,
  DtDropdownMenuSeparator,
  DtDropdownMenuLabel,
  DtDropdownMenuGroup,
  DtDropdownMenuCheckboxItem,
  DtDropdownMenuRadioGroup,
  DtDropdownMenuRadioItem,
  DtDropdownMenuSub,
  DtDropdownMenuSubTrigger,
  DtDropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'
import { DtButton } from '@/components/ui/button'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const basicTab = ref('preview')
const sizesTab = ref('preview')
const iconTab = ref('preview')
const byoTab = ref('preview')
const groupTab = ref('preview')
const checkboxTab = ref('preview')
const radioTab = ref('preview')
const subTab = ref('preview')
const stateTab = ref('preview')

const showStatusBar = ref(true)
const showFullPath = ref(false)
const position = ref('bottom')

const IMP = 'import'

const basicCode = `<script setup lang="ts">
${IMP} {
  DtDropdownMenu,
  DtDropdownMenuTrigger,
  DtDropdownMenuContent,
  DtDropdownMenuItem,
  DtDropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
<\/script>

<template>
  <DtDropdownMenu>
    <DtDropdownMenuTrigger label="Action" />

    <DtDropdownMenuContent>
      <DtDropdownMenuItem>Copy</DtDropdownMenuItem>
      <DtDropdownMenuItem>Paste</DtDropdownMenuItem>
      <DtDropdownMenuSeparator />
      <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
    </DtDropdownMenuContent>
  </DtDropdownMenu>
</template>`

const sizesCode = `<DtDropdownMenuTrigger size="sm" label="Action" />
<DtDropdownMenuTrigger size="md" label="Action" />
<DtDropdownMenuTrigger size="lg" label="Action" />`

const iconCode = `<DtDropdownMenu>
  <DtDropdownMenuTrigger icon-only />
  <DtDropdownMenuContent align="end">
    <DtDropdownMenuItem>Edit</DtDropdownMenuItem>
    <DtDropdownMenuItem>Duplicate</DtDropdownMenuItem>
    <DtDropdownMenuSeparator />
    <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
  </DtDropdownMenuContent>
</DtDropdownMenu>`

const byoCode = `<script setup lang="ts">
${IMP} { DtDropdownMenu, DtDropdownMenuTrigger, DtDropdownMenuContent, DtDropdownMenuItem } from '@/components/ui/dropdown-menu'
${IMP} { DtButton } from '@/components/ui/button'
<\/script>

<template>
  <DtDropdownMenu>
    <DtDropdownMenuTrigger as-child>
      <DtButton variant="outline">Open menu</DtButton>
    </DtDropdownMenuTrigger>
    <DtDropdownMenuContent>
      <DtDropdownMenuItem>Profile</DtDropdownMenuItem>
      <DtDropdownMenuItem>Settings</DtDropdownMenuItem>
    </DtDropdownMenuContent>
  </DtDropdownMenu>
</template>`

const groupCode = `<DtDropdownMenuContent>
  <DtDropdownMenuLabel>Account</DtDropdownMenuLabel>
  <DtDropdownMenuGroup>
    <DtDropdownMenuItem>Profile</DtDropdownMenuItem>
    <DtDropdownMenuItem>Billing</DtDropdownMenuItem>
    <DtDropdownMenuItem>Settings</DtDropdownMenuItem>
  </DtDropdownMenuGroup>
  <DtDropdownMenuSeparator />
  <DtDropdownMenuItem destructive>Log out</DtDropdownMenuItem>
</DtDropdownMenuContent>`

const checkboxCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'

const showStatusBar = ref(true)
const showFullPath  = ref(false)
<\/script>

<template>
  <DtDropdownMenuContent>
    <DtDropdownMenuLabel>View</DtDropdownMenuLabel>
    <DtDropdownMenuCheckboxItem v-model="showStatusBar">Show status bar</DtDropdownMenuCheckboxItem>
    <DtDropdownMenuCheckboxItem v-model="showFullPath">Show full path</DtDropdownMenuCheckboxItem>
  </DtDropdownMenuContent>
</template>`

const radioCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'

const position = ref('bottom')
<\/script>

<template>
  <DtDropdownMenuContent>
    <DtDropdownMenuLabel>Panel position</DtDropdownMenuLabel>
    <DtDropdownMenuRadioGroup v-model="position">
      <DtDropdownMenuRadioItem value="top">Top</DtDropdownMenuRadioItem>
      <DtDropdownMenuRadioItem value="right">Right</DtDropdownMenuRadioItem>
      <DtDropdownMenuRadioItem value="bottom">Bottom</DtDropdownMenuRadioItem>
    </DtDropdownMenuRadioGroup>
  </DtDropdownMenuContent>
</template>`

const subCode = `<DtDropdownMenuContent>
  <DtDropdownMenuItem>New file</DtDropdownMenuItem>
  <DtDropdownMenuSub>
    <DtDropdownMenuSubTrigger>Share</DtDropdownMenuSubTrigger>
    <DtDropdownMenuSubContent>
      <DtDropdownMenuItem>Copy link</DtDropdownMenuItem>
      <DtDropdownMenuItem>Email</DtDropdownMenuItem>
      <DtDropdownMenuItem>Twitter</DtDropdownMenuItem>
    </DtDropdownMenuSubContent>
  </DtDropdownMenuSub>
  <DtDropdownMenuItem>Rename</DtDropdownMenuItem>
</DtDropdownMenuContent>`

const stateCode = `<DtDropdownMenuContent>
  <DtDropdownMenuItem>Enabled</DtDropdownMenuItem>
  <DtDropdownMenuItem disabled>Disabled</DtDropdownMenuItem>
  <DtDropdownMenuSeparator />
  <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
  <DtDropdownMenuItem destructive disabled>Delete (disabled)</DtDropdownMenuItem>
</DtDropdownMenuContent>`

const rootPropsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const rootPropsRows = [
  { name: 'modelValue', type: 'boolean', default: 'undefined', desc: 'Open state (v-model). Omit for uncontrolled mode.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', desc: 'Initial open state when uncontrolled.' },
  { name: 'modal', type: 'boolean', default: 'true', desc: 'When true, outside content is inert while the menu is open.' },
]

const triggerPropsRows = [
  { name: 'asChild', type: 'boolean', default: 'false', desc: 'Render the slotted element as the trigger. All built-in styling is skipped.' },
  { name: 'iconOnly', type: 'boolean', default: 'false', desc: 'Render a square icon-only trigger. Default glyph is a vertical three-dot.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Button: 32 / 36 / 40 px. Icon: 24 / 32 / 40 px square.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disabled state.' },
  { name: 'label', type: 'string', default: '—', desc: 'Convenience label for button mode. Default slot wins.' },
]

const contentPropsRows = [
  { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'bottom'", desc: 'Preferred side relative to the trigger.' },
  { name: 'sideOffset', type: 'number', default: '6', desc: 'Distance in px between the trigger and the menu.' },
  { name: 'align', type: "'start' | 'center' | 'end'", default: "'start'", desc: 'Alignment along the trigger edge.' },
  { name: 'alignOffset', type: 'number', default: '0', desc: 'Offset along the alignment axis.' },
  { name: 'avoidCollisions', type: 'boolean', default: 'true', desc: 'Flip / shift to stay inside the viewport.' },
  { name: 'minWidth', type: 'string', default: "'13.5rem'", desc: 'Minimum panel width.' },
]

const itemPropsRows = [
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Skipped by keyboard nav and not selectable.' },
  { name: 'destructive', type: 'boolean', default: 'false', desc: 'Renders the row in the error color.' },
  { name: 'textValue', type: 'string', default: '—', desc: 'Override the string used for typeahead matching.' },
]

const checkboxPropsRows = [
  { name: 'modelValue', type: "boolean | 'indeterminate'", default: 'false', desc: 'Checked state (v-model).' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disabled state.' },
  { name: 'textValue', type: 'string', default: '—', desc: 'Typeahead override.' },
]

const radioGroupPropsRows = [
  { name: 'modelValue', type: 'string', default: '—', desc: 'Currently selected value (v-model).' },
]

const radioItemPropsRows = [
  { name: 'value', type: 'string', default: 'required', desc: "This option's value." },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disabled state.' },
  { name: 'textValue', type: 'string', default: '—', desc: 'Typeahead override.' },
]

const subPropsRows = [
  { name: 'modelValue', type: 'boolean', default: 'undefined', desc: 'Submenu open state (v-model).' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', desc: 'Initial submenu open state when uncontrolled.' },
]

const subContentPropsRows = [
  { name: 'sideOffset', type: 'number', default: '6', desc: 'Distance from the trigger.' },
  { name: 'alignOffset', type: 'number', default: '-4', desc: 'Cross-axis offset so the panel lines up with the row.' },
  { name: 'minWidth', type: 'string', default: "'13.5rem'", desc: 'Minimum panel width.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '140px' },
  { key: 'desc', label: 'Description' },
]
const triggerSlotsRows = [
  { name: 'default', desc: 'Button mode: label text or rich label content. Icon mode: 16px icon override (replaces the three-dot default).' },
  { name: 'leading', desc: 'Button mode only — leading 16px icon before the label.' },
]
const itemSlotsRows = [
  { name: 'default', desc: 'The label text or rich content.' },
  { name: 'leading', desc: 'Leading 16px icon or visual.' },
  { name: 'trailing', desc: 'Trailing 16px icon or visual (shortcut hint, badge, etc.).' },
]

const eventsCols: DtColumn[] = [
  { key: 'name', label: 'Event', width: '180px' },
  { key: 'payload', label: 'Payload', width: '180px' },
  { key: 'desc', label: 'Description' },
]
const rootEventsRows = [
  { name: 'update:modelValue', payload: 'boolean', desc: 'Emitted when the menu open state changes.' },
]
const itemEventsRows = [
  { name: 'select', payload: 'Event', desc: 'Fired on click or Enter/Space. Call event.preventDefault() to keep the menu open.' },
]
const checkboxEventsRows = [
  { name: 'update:modelValue', payload: "boolean | 'indeterminate'", desc: 'Emitted when the check state changes.' },
  { name: 'select', payload: 'Event', desc: 'Fired on selection. event.preventDefault() keeps the menu open.' },
]

const subCols: DtColumn[] = [
  { key: 'name', label: 'Component', width: '220px' },
  { key: 'desc', label: 'Description' },
]
const subRows = [
  { name: 'DtDropdownMenu', desc: 'Root + open/close state. Owns v-model.' },
  { name: 'DtDropdownMenuTrigger', desc: 'Opinionated button or icon trigger. Use as-child for BYO.' },
  { name: 'DtDropdownMenuContent', desc: 'The floating panel. Portalled to <body>.' },
  { name: 'DtDropdownMenuItem', desc: 'A single action row. Supports leading/trailing slots and destructive variant.' },
  { name: 'DtDropdownMenuSeparator', desc: '1px hairline divider with 4px y breathing room.' },
  { name: 'DtDropdownMenuLabel', desc: 'Non-interactive section heading.' },
  { name: 'DtDropdownMenuGroup', desc: 'Semantic wrapper (role="group") for a cluster of items.' },
  { name: 'DtDropdownMenuCheckboxItem', desc: 'Toggleable item with check / dash indicator.' },
  { name: 'DtDropdownMenuRadioGroup', desc: 'Container that coordinates a set of radio items via shared v-model.' },
  { name: 'DtDropdownMenuRadioItem', desc: 'A single radio option inside a radio group.' },
  { name: 'DtDropdownMenuSub', desc: 'Submenu root. Owns submenu open state.' },
  { name: 'DtDropdownMenuSubTrigger', desc: 'Opens the submenu. Renders a trailing chevron-right automatically.' },
  { name: 'DtDropdownMenuSubContent', desc: 'The submenu panel.' },
]
</script>

<template>
  <DtPageView :title="t('nav.dropdownMenu')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.dropdownMenu.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add dropdown-menu" lang="bash" />
      <p>
        The CLI pulls in <code>reka-ui</code> as an npm dependency.
      </p>

      <h2>Basic</h2>
      <DtTabSwitcher v-model="basicTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="basicTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="Action" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Copy</DtDropdownMenuItem>
              <DtDropdownMenuItem>Paste</DtDropdownMenuItem>
              <DtDropdownMenuSeparator />
              <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="basicCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--row">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger size="sm" label="Action" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Edit</DtDropdownMenuItem>
              <DtDropdownMenuItem>Duplicate</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
          <DtDropdownMenu>
            <DtDropdownMenuTrigger size="md" label="Action" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Edit</DtDropdownMenuItem>
              <DtDropdownMenuItem>Duplicate</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
          <DtDropdownMenu>
            <DtDropdownMenuTrigger size="lg" label="Action" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Edit</DtDropdownMenuItem>
              <DtDropdownMenuItem>Duplicate</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Icon-only trigger</h2>
      <DtTabSwitcher v-model="iconTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="iconTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger icon-only />
            <DtDropdownMenuContent align="end">
              <DtDropdownMenuItem>Edit</DtDropdownMenuItem>
              <DtDropdownMenuItem>Duplicate</DtDropdownMenuItem>
              <DtDropdownMenuSeparator />
              <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="iconCode" lang="vue" />
      </div>
      <p style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Default glyph is a vertical three-dot. Slot any 16px SVG to override.
      </p>

      <h2>Custom trigger (as-child)</h2>
      <DtTabSwitcher v-model="byoTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="byoTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger as-child>
              <DtButton variant="outline">Open menu</DtButton>
            </DtDropdownMenuTrigger>
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Profile</DtDropdownMenuItem>
              <DtDropdownMenuItem>Settings</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="byoCode" lang="vue" />
      </div>

      <h2>Label, group, separator</h2>
      <DtTabSwitcher v-model="groupTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="groupTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="Account" />
            <DtDropdownMenuContent>
              <DtDropdownMenuLabel>Account</DtDropdownMenuLabel>
              <DtDropdownMenuGroup>
                <DtDropdownMenuItem>Profile</DtDropdownMenuItem>
                <DtDropdownMenuItem>Billing</DtDropdownMenuItem>
                <DtDropdownMenuItem>Settings</DtDropdownMenuItem>
              </DtDropdownMenuGroup>
              <DtDropdownMenuSeparator />
              <DtDropdownMenuItem destructive>Log out</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="groupCode" lang="vue" />
      </div>

      <h2>Checkbox items</h2>
      <DtTabSwitcher v-model="checkboxTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="checkboxTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="View options" />
            <DtDropdownMenuContent>
              <DtDropdownMenuLabel>View</DtDropdownMenuLabel>
              <DtDropdownMenuCheckboxItem v-model="showStatusBar">Show status bar</DtDropdownMenuCheckboxItem>
              <DtDropdownMenuCheckboxItem v-model="showFullPath">Show full path</DtDropdownMenuCheckboxItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="checkboxCode" lang="vue" />
      </div>
      <p style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Status bar: <code>{{ showStatusBar }}</code> · Full path: <code>{{ showFullPath }}</code>
      </p>

      <h2>Radio group</h2>
      <DtTabSwitcher v-model="radioTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="radioTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="Panel position" />
            <DtDropdownMenuContent>
              <DtDropdownMenuLabel>Panel position</DtDropdownMenuLabel>
              <DtDropdownMenuRadioGroup v-model="position">
                <DtDropdownMenuRadioItem value="top">Top</DtDropdownMenuRadioItem>
                <DtDropdownMenuRadioItem value="right">Right</DtDropdownMenuRadioItem>
                <DtDropdownMenuRadioItem value="bottom">Bottom</DtDropdownMenuRadioItem>
              </DtDropdownMenuRadioGroup>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="radioCode" lang="vue" />
      </div>
      <p style="margin-top: 12px; color: var(--dt-color-text-secondary);">
        Selected: <code>{{ position }}</code>
      </p>

      <h2>Nested submenu</h2>
      <DtTabSwitcher v-model="subTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="subTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="File" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>New file</DtDropdownMenuItem>
              <DtDropdownMenuSub>
                <DtDropdownMenuSubTrigger>Share</DtDropdownMenuSubTrigger>
                <DtDropdownMenuSubContent>
                  <DtDropdownMenuItem>Copy link</DtDropdownMenuItem>
                  <DtDropdownMenuItem>Email</DtDropdownMenuItem>
                  <DtDropdownMenuItem>Twitter</DtDropdownMenuItem>
                </DtDropdownMenuSubContent>
              </DtDropdownMenuSub>
              <DtDropdownMenuItem>Rename</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="subCode" lang="vue" />
      </div>

      <h2>Disabled and destructive</h2>
      <DtTabSwitcher v-model="stateTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="stateTab === 'preview'" class="dx-preview">
          <DtDropdownMenu>
            <DtDropdownMenuTrigger label="States" />
            <DtDropdownMenuContent>
              <DtDropdownMenuItem>Enabled</DtDropdownMenuItem>
              <DtDropdownMenuItem disabled>Disabled</DtDropdownMenuItem>
              <DtDropdownMenuSeparator />
              <DtDropdownMenuItem destructive>Delete</DtDropdownMenuItem>
              <DtDropdownMenuItem destructive disabled>Delete (disabled)</DtDropdownMenuItem>
            </DtDropdownMenuContent>
          </DtDropdownMenu>
        </div>
        <CodeBlock v-else :code="stateCode" lang="vue" />
      </div>

      <h2>DtDropdownMenu props</h2>
      <DtDataTable :columns="rootPropsCols" :items="rootPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenu events</h2>
      <DtDataTable :columns="eventsCols" :items="rootEventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuTrigger props</h2>
      <DtDataTable :columns="rootPropsCols" :items="triggerPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuTrigger slots</h2>
      <DtDataTable :columns="slotsCols" :items="triggerSlotsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuContent props</h2>
      <DtDataTable :columns="rootPropsCols" :items="contentPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuItem props</h2>
      <DtDataTable :columns="rootPropsCols" :items="itemPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuItem slots</h2>
      <DtDataTable :columns="slotsCols" :items="itemSlotsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuItem events</h2>
      <DtDataTable :columns="eventsCols" :items="itemEventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuCheckboxItem props</h2>
      <DtDataTable :columns="rootPropsCols" :items="checkboxPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuCheckboxItem events</h2>
      <DtDataTable :columns="eventsCols" :items="checkboxEventsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuRadioGroup props</h2>
      <DtDataTable :columns="rootPropsCols" :items="radioGroupPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuRadioItem props</h2>
      <DtDataTable :columns="rootPropsCols" :items="radioItemPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuSub props</h2>
      <DtDataTable :columns="rootPropsCols" :items="subPropsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtDropdownMenuSubContent props</h2>
      <DtDataTable :columns="rootPropsCols" :items="subContentPropsRows">
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
        <li>Roles applied automatically: <code>menu</code>, <code>menuitem</code>, <code>menuitemcheckbox</code>, <code>menuitemradio</code>, <code>group</code>.</li>
        <li>Keyboard: <strong>Enter</strong> / <strong>Space</strong> activates, <strong>ArrowUp</strong> / <strong>ArrowDown</strong> moves, <strong>Home</strong> / <strong>End</strong> jumps, typeahead focuses by first letter, <strong>ArrowRight</strong> / <strong>ArrowLeft</strong> enters / leaves submenus, <strong>Esc</strong> closes.</li>
        <li>Focus returns to the trigger when the menu closes.</li>
        <li>Disabled items are skipped by keyboard navigation and typeahead.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-preview--row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dt-spacing-lg);
  align-items: center;
}
</style>
