<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtInput, DtPhoneInput, DtPaymentInput, type PhoneValue, type CardBrand } from '@/components/ui/input'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add input`

const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]
const variantsTab = ref('preview')
const sizesTab = ref('preview')
const labelTab = ref('preview')
const statesTab = ref('preview')
const adornTab = ref('preview')
const phoneTab = ref('preview')
const paymentTab = ref('preview')

const text = ref('')
const search = ref('')
const phone = ref<PhoneValue>({ e164: '', country: 'UZ', national: '' })
const card = ref('')
const brand = ref<CardBrand>('unknown')

const variantsCode = `<DtInput v-model="text" variant="primary"   label="Primary" />
<DtInput v-model="text" variant="secondary" label="Secondary" />`

const sizesCode = `<DtInput v-model="text" size="sm" label="Small" />
<DtInput v-model="text" size="md" label="Medium" />
<DtInput v-model="text" size="lg" label="Large" />
<DtInput v-model="text" size="xl" label="Extra Large" />`

const labelCode = `<DtInput v-model="text" label="Full name" />
<DtInput v-model="text" label="Full name" label-position="floating" />`

const statesCode = `<DtInput v-model="text" label="Hint"    message="At least 3 characters" />
<DtInput v-model="text" label="Error"   state="error"   message="This field is required" />
<DtInput v-model="text" label="Success" state="success" message="Looks good" />
<DtInput v-model="text" label="Disabled" disabled />`

const adornCode = `<DtInput v-model="search" label="Search" clearable>
  <template #prefix>
    <svg viewBox="0 0 20 20" width="18" height="18" ...>
      ...
    </svg>
  </template>
</DtInput>

<DtInput v-model="text" label="Website">
  <template #prefix><span>https://</span></template>
  <template #suffix><span>.com</span></template>
</DtInput>`

const phoneCode = `<script setup lang="ts">
import { ref } from 'vue'
import { DtPhoneInput, type PhoneValue } from '@/components/ui/input'

const phone = ref<PhoneValue>({ e164: '', country: 'UZ', national: '' })
<\/script>

<template>
  <DtPhoneInput v-model="phone" label="Phone number" />
</template>`

const paymentCode = `<script setup lang="ts">
import { ref } from 'vue'
import { DtPaymentInput, type CardBrand } from '@/components/ui/input'

const card = ref('')
const brand = ref<CardBrand>('unknown')
<\/script>

<template>
  <DtPaymentInput
    v-model="card"
    label="Card number"
    @brand-change="(b) => brand = b"
  >
    <template #brand="{ brand }">
      {{ brand }}
    </template>
  </DtPaymentInput>
</template>`

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]

const inputProps = [
  { name: 'modelValue',    type: 'string | number',                          default: '—',         desc: 'v-model.' },
  { name: 'type',          type: 'string',                                   default: "'text'",    desc: 'Native input type.' },
  { name: 'variant',       type: "'primary' | 'secondary'",                  default: "'primary'", desc: 'Visual style.' },
  { name: 'size',          type: "'sm' | 'md' | 'lg' | 'xl'",                default: "'md'",      desc: 'Height: 48 / 56 / 64 / 72 px.' },
  { name: 'label',         type: 'string',                                   default: '—',         desc: 'Label text.' },
  { name: 'labelPosition', type: "'top' | 'floating'",                       default: "'top'",     desc: 'External label or inset floating label.' },
  { name: 'state',         type: "'error' | 'success' | undefined",          default: 'undefined', desc: 'Validation state.' },
  { name: 'message',       type: 'string',                                   default: '—',         desc: 'Message under the field. Color follows state.' },
  { name: 'placeholder',   type: 'string',                                   default: '—',         desc: 'Native placeholder. Ignored when label-position is floating.' },
  { name: 'disabled',      type: 'boolean',                                  default: 'false',     desc: 'Native disabled.' },
  { name: 'clearable',     type: 'boolean',                                  default: 'false',     desc: 'Show × button when the field has a value.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const inputSlots = [
  { name: 'prefix', desc: 'Leading adornment.' },
  { name: 'suffix', desc: 'Trailing adornment.' },
]

const phoneProps = [
  { name: 'modelValue',       type: 'PhoneValue | string',              default: '—',     desc: '`{ e164, country, national }` or string E.164. Emits PhoneValue.' },
  { name: 'defaultCountry',   type: "'UZ' | 'RU' | 'KZ' | 'KG' | 'TJ'", default: "'UZ'",  desc: 'Initial country.' },
  { name: 'allowedCountries', type: "Array<…>",                         default: 'all 5', desc: 'Restrict the dropdown.' },
]

const paymentProps = [
  { name: 'modelValue', type: 'string', default: '—',  desc: 'Formatted card number (with spaces). v-model.' },
  { name: 'maxDigits',  type: 'number', default: '16', desc: 'Max digits accepted. Use 15 for Amex-only forms.' },
]

const paymentEventsCols: DtColumn[] = [
  { key: 'name',    label: 'Event',   width: '160px' },
  { key: 'payload', label: 'Payload', width: '140px' },
  { key: 'desc',    label: 'Description' },
]
const paymentEvents = [
  { name: 'update:modelValue', payload: 'string',    desc: 'Fires on every keystroke with the formatted value.' },
  { name: 'brand-change',      payload: 'CardBrand', desc: 'Fires when the detected brand changes.' },
]
</script>

<template>
  <DtPageView :title="t('nav.input')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.input.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Variants</h2>
      <DtTabSwitcher v-model="variantsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="variantsTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" variant="primary"   label="Primary"   placeholder="White, bordered" />
          <DtInput v-model="text" variant="secondary" label="Secondary" placeholder="Filled, borderless" />
        </div>
        <CodeBlock v-else :code="variantsCode" lang="vue" />
      </div>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" size="sm" label="Small (48px)" />
          <DtInput v-model="text" size="md" label="Medium (56px)" />
          <DtInput v-model="text" size="lg" label="Large (64px)" />
          <DtInput v-model="text" size="xl" label="Extra Large (72px)" />
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h2>Label position</h2>
      <DtTabSwitcher v-model="labelTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="labelTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" label="Full name" placeholder="Your name" />
          <DtInput v-model="text" label="Full name" label-position="floating" />
        </div>
        <CodeBlock v-else :code="labelCode" lang="vue" />
      </div>

      <h2>States</h2>
      <DtTabSwitcher v-model="statesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="statesTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="text" label="Hint"    message="At least 3 characters" />
          <DtInput v-model="text" label="Error"   state="error"   message="This field is required" />
          <DtInput v-model="text" label="Success" state="success" message="Looks good" />
          <DtInput v-model="text" label="Disabled" disabled />
        </div>
        <CodeBlock v-else :code="statesCode" lang="vue" />
      </div>

      <h2>Adornments</h2>
      <DtTabSwitcher v-model="adornTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="adornTab === 'preview'" class="dx-preview dx-preview--column">
          <DtInput v-model="search" label="Search" clearable placeholder="Type to search…">
            <template #prefix>
              <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="9" cy="9" r="6" />
                <path d="m17 17-3-3" stroke-linecap="round"/>
              </svg>
            </template>
          </DtInput>

          <DtInput v-model="text" label="Website">
            <template #prefix><span style="color:var(--dt-color-text-secondary);">https://</span></template>
            <template #suffix><span style="color:var(--dt-color-text-secondary);">.com</span></template>
          </DtInput>
        </div>
        <CodeBlock v-else :code="adornCode" lang="vue" />
      </div>

      <h2>DtPhoneInput</h2>
      <DtTabSwitcher v-model="phoneTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="phoneTab === 'preview'" class="dx-preview dx-preview--column">
          <DtPhoneInput v-model="phone" label="Phone number" />
          <code class="dx-debug">{{ phone }}</code>
        </div>
        <CodeBlock v-else :code="phoneCode" lang="vue" />
      </div>

      <h2>DtPaymentInput</h2>
      <DtTabSwitcher v-model="paymentTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="paymentTab === 'preview'" class="dx-preview dx-preview--column">
          <DtPaymentInput
            v-model="card"
            label="Card number"
            @brand-change="(b) => brand = b"
          >
            <template #brand="{ brand: b }">
              <span class="dx-debug">{{ b }}</span>
            </template>
          </DtPaymentInput>
          <code class="dx-debug">value: "{{ card }}" · brand: {{ brand }}</code>
        </div>
        <CodeBlock v-else :code="paymentCode" lang="vue" />
      </div>

      <h2>DtInput props</h2>
      <DtDataTable :columns="propsCols" :items="inputProps">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtInput slots</h2>
      <DtDataTable :columns="slotsCols" :items="inputSlots">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtPhoneInput props</h2>
      <DtDataTable :columns="propsCols" :items="phoneProps">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtPaymentInput props</h2>
      <DtDataTable :columns="propsCols" :items="paymentProps">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>DtPaymentInput events</h2>
      <DtDataTable :columns="paymentEventsCols" :items="paymentEvents">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #payload="{ item }"><code>{{ (item as { payload: string }).payload }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Accessibility</h2>
      <ul>
        <li>Native <code>&lt;input&gt;</code> + <code>&lt;label for&gt;</code> association.</li>
        <li><code>aria-invalid="true"</code> when <code>state="error"</code>.</li>
        <li><code>aria-describedby</code> connects the message to the input.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-debug {
  display: inline-block;
  padding: var(--dt-spacing-md) var(--dt-spacing-lg);
  background: var(--dt-color-background-secondary);
  border-radius: var(--dt-radius-sm);
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  word-break: break-all;
}
</style>
