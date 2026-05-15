<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtButton, type ButtonVariant, type ButtonSize } from '@/components/ui/button'
import { DtTabSwitcher, type DtTab } from '@/components/ui/tab-switcher'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const installSnippet = `npx dt-ui add button`

const variantsTab = ref('preview')
const sizesTab = ref('preview')
const matrixTab = ref('preview')
const iconsTab = ref('preview')
const statesTab = ref('preview')
const recipesTab = ref('preview')
const tabs: DtTab[] = [
  { key: 'preview', label: 'Preview' },
  { key: 'code', label: 'Code' },
]

const variantsCode = `<DtButton variant="default">Default</DtButton>
<DtButton variant="outline">Outline</DtButton>
<DtButton variant="transparent">Transparent</DtButton>
<DtButton variant="secondary-grey">Secondary Grey</DtButton>`

const sizesCode = `<DtButton size="3xl">3XL — 60px</DtButton>
<DtButton size="2xl">2XL — 56px</DtButton>
<DtButton size="xl">XL — 48px</DtButton>
<DtButton size="lg">LG — 44px</DtButton>
<DtButton size="md">MD — 40px</DtButton>
<DtButton size="sm">SM — 36px</DtButton>
<DtButton size="xs">XS — 32px</DtButton>
<DtButton size="2xs">2XS — 24px</DtButton>`

const matrixCode = `<!-- Every variant × every size -->
<DtButton variant="default" size="md">Default</DtButton>
<DtButton variant="outline" size="md">Outline</DtButton>
<DtButton variant="transparent" size="md">Transparent</DtButton>
<DtButton variant="secondary-grey" size="md">Secondary</DtButton>`

const iconsCode = `<!-- Icon left -->
<DtButton>
  <template #icon-left>
    <svg viewBox="0 0 20 20"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
  </template>
  Add item
</DtButton>

<!-- Icon right -->
<DtButton variant="outline">
  Continue
  <template #icon-right>
    <svg viewBox="0 0 20 20"><path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </template>
</DtButton>

<!-- Icon only (always provide aria-label) -->
<DtButton variant="transparent" size="xs" aria-label="Settings">
  <template #icon-left>
    <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
  </template>
</DtButton>`

const statesCode = `<DtButton :loading="true">Saving…</DtButton>
<DtButton disabled>Disabled</DtButton>
<DtButton variant="outline" disabled>Disabled outline</DtButton>
<DtButton variant="transparent" disabled>Disabled transparent</DtButton>`

const recipesCode = `<!-- Form footer: cancel + primary action -->
<DtDialogFooter>
  <DtButton variant="outline" @click="close">Cancel</DtButton>
  <DtButton :loading="saving" @click="save">Save changes</DtButton>
</DtDialogFooter>

<!-- Toolbar: low-emphasis row of inline actions -->
<DtButton variant="transparent" size="xs">Edit</DtButton>
<DtButton variant="transparent" size="xs">Duplicate</DtButton>
<DtButton variant="transparent" size="xs">Delete</DtButton>

<!-- Hero CTA: 2xl / xl pair -->
<DtButton size="2xl">Get started</DtButton>
<DtButton size="2xl" variant="outline">Read docs</DtButton>`

const loading = ref(false)
const simulate = () => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 1500)
}

const propsCols: DtColumn[] = [
  { key: 'name', label: 'Prop', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '120px' },
  { key: 'desc', label: 'Description' },
]
const propsRows = [
  { name: 'variant', type: "'default' | 'outline' | 'transparent' | 'secondary-grey'", default: "'default'", desc: 'Visual style of the button.' },
  { name: 'size', type: "'3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | '2xs'", default: "'md'", desc: 'Height (60/56/48/44/40/36/32/24), padding, font, radius.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Native disabled state.' },
  { name: 'loading', type: 'boolean', default: 'false', desc: 'Spinner + disabled.' },
]

const slotsCols: DtColumn[] = [
  { key: 'name', label: 'Slot', width: '160px' },
  { key: 'desc', label: 'Description' },
]
const slotsRows = [
  { name: 'default', desc: 'Button label or content.' },
  { name: 'icon-left', desc: 'Icon rendered before the label. Sized 20/16/14px per size scale.' },
  { name: 'icon-right', desc: 'Icon rendered after the label. Sized 20/16/14px per size scale.' },
]

const sizeRows: { size: ButtonSize; height: string; padX: string; radius: string; font: string; icon: string }[] = [
  { size: '3xl', height: '60px', padX: 'spacing-4xl (32)', radius: 'radius-xl (20)', font: 'body-md', icon: '20px' },
  { size: '2xl', height: '56px', padX: 'spacing-3xl (24)', radius: 'radius-lg (16)', font: 'body-md', icon: '20px' },
  { size: 'xl',  height: '48px', padX: 'spacing-3xl (24)', radius: 'radius-lg (16)', font: 'body-md', icon: '20px' },
  { size: 'lg',  height: '44px', padX: 'spacing-2xl (20)', radius: 'radius-md (12)', font: 'body-md', icon: '20px' },
  { size: 'md',  height: '40px', padX: 'spacing-2xl (20)', radius: 'radius-md (12)', font: 'body-sm', icon: '16px' },
  { size: 'sm',  height: '36px', padX: 'spacing-xl (16)',  radius: 'radius-md (12)', font: 'body-sm', icon: '16px' },
  { size: 'xs',  height: '32px', padX: 'spacing-xl (16)',  radius: 'radius-sm (8)',  font: 'body-sm', icon: '16px' },
  { size: '2xs', height: '24px', padX: 'spacing-lg (12)',  radius: 'radius-xs (6)',  font: 'body-xs', icon: '14px' },
]

const sizeCols: DtColumn[] = [
  { key: 'size',   label: 'Size',         width: '80px' },
  { key: 'height', label: 'Height',       width: '80px' },
  { key: 'padX',   label: 'Padding-x' },
  { key: 'radius', label: 'Radius' },
  { key: 'font',   label: 'Font',         width: '100px' },
  { key: 'icon',   label: 'Icon',         width: '70px' },
]

const variantRows: { variant: ButtonVariant; use: string }[] = [
  { variant: 'default',        use: 'The primary call-to-action on a screen. Use at most one per region.' },
  { variant: 'outline',        use: 'Secondary action paired with `default` — Cancel/Save, Back/Continue.' },
  { variant: 'transparent',    use: 'Low-emphasis inline actions inside tables, toolbars, list rows.' },
  { variant: 'secondary-grey', use: 'Neutral solid alternative when accent would compete with adjacent UI.' },
]

const variantUseCols: DtColumn[] = [
  { key: 'variant', label: 'Variant', width: '180px' },
  { key: 'use',     label: 'When to use' },
]

const variantList: ButtonVariant[] = ['default', 'outline', 'transparent', 'secondary-grey']
const sizeList: ButtonSize[] = ['3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs']
</script>

<template>
  <DtPageView :title="t('nav.button')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.button.lead')" />

      <h2>Install</h2>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>Anatomy</h2>
      <p>
        Three optional slots laid out horizontally: an icon before the label, the label,
        and an icon after the label. Icon containers are sized per the size scale (20/16/14px).
      </p>
      <div class="dx-anatomy">
        <DtButton size="xl">
          <template #icon-left>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </template>
          Anatomy label
          <template #icon-right>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </DtButton>
        <div class="dx-anatomy__labels">
          <span><code>#icon-left</code></span>
          <span>default slot (label)</span>
          <span><code>#icon-right</code></span>
        </div>
      </div>

      <h2>Variants</h2>
      <DtTabSwitcher v-model="variantsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="variantsTab === 'preview'" class="dx-preview">
          <DtButton variant="default">Default</DtButton>
          <DtButton variant="outline">Outline</DtButton>
          <DtButton variant="transparent">Transparent</DtButton>
          <DtButton variant="secondary-grey">Secondary Grey</DtButton>
        </div>
        <CodeBlock v-else :code="variantsCode" lang="vue" />
      </div>

      <h3>When to use each variant</h3>
      <DtDataTable :columns="variantUseCols" :items="variantRows">
        <template #variant="{ item }"><code>{{ (item as { variant: string }).variant }}</code></template>
        <template #use="{ item }">{{ (item as { use: string }).use }}</template>
      </DtDataTable>

      <h2>Sizes</h2>
      <DtTabSwitcher v-model="sizesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="sizesTab === 'preview'" class="dx-preview dx-preview--align-end">
          <DtButton size="3xl">3XL</DtButton>
          <DtButton size="2xl">2XL</DtButton>
          <DtButton size="xl">XL</DtButton>
          <DtButton size="lg">LG</DtButton>
          <DtButton size="md">MD</DtButton>
          <DtButton size="sm">SM</DtButton>
          <DtButton size="xs">XS</DtButton>
          <DtButton size="2xs">2XS</DtButton>
        </div>
        <CodeBlock v-else :code="sizesCode" lang="vue" />
      </div>

      <h3>Size reference</h3>
      <DtDataTable :columns="sizeCols" :items="sizeRows">
        <template #size="{ item }"><code>{{ (item as { size: string }).size }}</code></template>
        <template #height="{ item }">{{ (item as { height: string }).height }}</template>
        <template #padX="{ item }"><code>{{ (item as { padX: string }).padX }}</code></template>
        <template #radius="{ item }"><code>{{ (item as { radius: string }).radius }}</code></template>
        <template #font="{ item }"><code>{{ (item as { font: string }).font }}</code></template>
        <template #icon="{ item }">{{ (item as { icon: string }).icon }}</template>
      </DtDataTable>

      <h2>Variant &times; size matrix</h2>
      <p>Every combination, side-by-side. Useful for picking the right pair when laying out a screen.</p>
      <DtTabSwitcher v-model="matrixTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="matrixTab === 'preview'" class="dx-matrix">
          <div class="dx-matrix__head">
            <span />
            <span v-for="size in sizeList" :key="size" class="dx-matrix__col">{{ size }}</span>
          </div>
          <div v-for="variant in variantList" :key="variant" class="dx-matrix__row">
            <span class="dx-matrix__label"><code>{{ variant }}</code></span>
            <div v-for="size in sizeList" :key="size" class="dx-matrix__cell">
              <DtButton :variant="variant" :size="size">Aa</DtButton>
            </div>
          </div>
        </div>
        <CodeBlock v-else :code="matrixCode" lang="vue" />
      </div>

      <h2>With icons</h2>
      <p>
        Provide SVGs (or any icon library) through <code>#icon-left</code> / <code>#icon-right</code>.
        The slot wrapper applies the size-paired box; the SVG fills it via
        <code>width: 100%; height: 100%</code>.
      </p>
      <DtTabSwitcher v-model="iconsTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="iconsTab === 'preview'" class="dx-preview">
          <DtButton>
            <template #icon-left>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </template>
            Add item
          </DtButton>

          <DtButton variant="outline">
            Continue
            <template #icon-right>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </DtButton>

          <DtButton variant="transparent">
            <template #icon-left>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M16 4 4 16M4 4l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </template>
            Discard
          </DtButton>

          <DtButton variant="outline" size="xs" aria-label="Settings">
            <template #icon-left>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.4 4.4l1.4 1.4M14.2 14.2l1.4 1.4M4.4 15.6l1.4-1.4M14.2 5.8l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </template>
          </DtButton>
        </div>
        <CodeBlock v-else :code="iconsCode" lang="vue" />
      </div>

      <h2>States</h2>
      <DtTabSwitcher v-model="statesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="statesTab === 'preview'" class="dx-preview">
          <DtButton :loading="loading" @click="simulate">
            {{ loading ? 'Loading…' : 'Click to load' }}
          </DtButton>
          <DtButton disabled>Disabled</DtButton>
          <DtButton variant="outline" disabled>Disabled outline</DtButton>
          <DtButton variant="transparent" disabled>Disabled transparent</DtButton>
        </div>
        <CodeBlock v-else :code="statesCode" lang="vue" />
      </div>
      <p class="dx-note">
        <strong>Hover &amp; focus</strong> are CSS-only — hover any button above to see the
        background/border shift; tab to a button for the 2px <code>--dt-color-ring</code> focus
        ring (offset 5px outside the button).
      </p>

      <h2>Recipes</h2>
      <DtTabSwitcher v-model="recipesTab" :tabs="tabs" />
      <div class="dx-tab-panel">
        <div v-if="recipesTab === 'preview'" class="dx-recipes">
          <div class="dx-recipe">
            <h4>Form footer</h4>
            <div class="dx-recipe__demo dx-recipe__demo--end">
              <DtButton variant="outline">Cancel</DtButton>
              <DtButton>Save changes</DtButton>
            </div>
          </div>

          <div class="dx-recipe">
            <h4>Inline row actions</h4>
            <div class="dx-recipe__demo">
              <DtButton variant="transparent" size="xs">Edit</DtButton>
              <DtButton variant="transparent" size="xs">Duplicate</DtButton>
              <DtButton variant="transparent" size="xs">Delete</DtButton>
            </div>
          </div>

          <div class="dx-recipe">
            <h4>Hero CTA pair</h4>
            <div class="dx-recipe__demo">
              <DtButton size="2xl">Get started</DtButton>
              <DtButton size="2xl" variant="outline">Read docs</DtButton>
            </div>
          </div>
        </div>
        <CodeBlock v-else :code="recipesCode" lang="vue" />
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
        <li>Native <code>&lt;button&gt;</code> — keyboard focusable, Enter/Space activate.</li>
        <li><code>disabled</code> attribute set on both <code>disabled</code> and <code>loading</code> states.</li>
        <li>Visible <code>:focus-visible</code> ring: 2px outer ring at <code>--dt-color-ring</code>, offset 5px.</li>
        <li>Spinner is <code>aria-hidden</code>; supply <code>aria-label</code> for icon-only buttons.</li>
        <li>Loading state preserves the button's measured width — pass a stable label or leave the slot empty.</li>
      </ul>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-anatomy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--dt-spacing-lg);
  padding: var(--dt-spacing-4xl) var(--dt-spacing-3xl);
  border: 1px dashed var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-background-secondary);
}

.dx-anatomy__labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--dt-spacing-3xl);
  width: 100%;
  max-width: 320px;
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
}

.dx-anatomy__labels span:nth-child(2) { text-align: center; }
.dx-anatomy__labels span:nth-child(3) { text-align: right; }

.dx-preview--align-end {
  align-items: flex-end;
}

.dx-matrix {
  display: grid;
  grid-template-columns: auto repeat(8, minmax(max-content, 1fr));
  column-gap: var(--dt-spacing-lg);
  row-gap: var(--dt-spacing-md);
  padding: var(--dt-spacing-2xl);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-background-secondary);
  overflow-x: auto;
}

.dx-matrix__head {
  display: contents;
}

.dx-matrix__head .dx-matrix__col {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  text-align: center;
  padding-bottom: var(--dt-spacing-md);
  border-bottom: 1px solid var(--dt-color-border-light);
}

.dx-matrix__head span:first-child {
  border-bottom: 1px solid var(--dt-color-border-light);
}

.dx-matrix__row {
  display: contents;
}

.dx-matrix__label {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  align-self: center;
  padding-right: var(--dt-spacing-md);
}

.dx-matrix__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--dt-spacing-sm) 0;
}

.dx-recipes {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-2xl);
}

.dx-recipe {
  padding: var(--dt-spacing-2xl);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-background-secondary);
}

.dx-recipe > h4 {
  margin: 0 0 var(--dt-spacing-lg);
  font-size: var(--dt-text-body-sm);
  font-weight: var(--dt-font-medium);
  color: var(--dt-color-text-secondary);
}

.dx-recipe__demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dt-spacing-md);
}

.dx-recipe__demo--end {
  justify-content: flex-end;
}

.dx-note {
  font-size: var(--dt-text-body-sm);
  color: var(--dt-color-text-secondary);
}

</style>
