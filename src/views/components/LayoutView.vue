<script setup lang="ts">
import { ref, h } from 'vue'
import { useI18n } from 'vue-i18n'
import { DtPageView, DtLayoutSidebar, DtLayoutHeader, DtProfileModal, type DtNavItem, type DtSidebarItemClickPayload, type DtUser } from '@/components/ui/layout'
import { theme as currentTheme, setTheme, type ThemeMode } from '@/composables/useTheme'
import { locale as appLocale, setLocale, type AppLocale } from '@/i18n'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import { DtButton } from '@/components/ui/button'
import { DtBadge } from '@/components/ui/badge'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const IMP = 'import'

/* ──────────────────────────────────────────
   Live demo state for the embedded sidebar
   ────────────────────────────────────────── */
const FolderIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
  ])

const HomeIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M3 11l9-8 9 8M5 9.5V21h14V9.5' }),
  ])

const PlusIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round' }, [
    h('path', { d: 'M12 5v14M5 12h14' }),
  ])

const lastAction = ref<string>('— nothing clicked yet')
let nextDealId = 3

const makeInitialItems = (): DtNavItem[] => [
  { key: 'home', label: 'Dashboard', icon: HomeIcon, onClick: () => { lastAction.value = 'Navigated → Dashboard' } },
  {
    key: 'deals',
    label: 'Deals',
    icon: FolderIcon,
    badge: 2,
    defaultOpen: true,
    children: [
      { key: 'deal-1', label: 'Deal A', onClick: () => { lastAction.value = 'Opened → Deal A' } },
      { key: 'deal-2', label: 'Deal B', onClick: () => { lastAction.value = 'Opened → Deal B' } },
      { key: 'deals-add', label: 'Add deal', icon: PlusIcon, onClick: () => addDeal() },
    ],
  },
]

const demoItems = ref<DtNavItem[]>(makeInitialItems())

function addDeal() {
  const dealsParent = demoItems.value.find((i) => i.key === 'deals')
  if (!dealsParent?.children) return
  const id = nextDealId++
  const letter = String.fromCharCode(64 + id) // 65 = 'A'
  const newChild: DtNavItem = {
    key: `deal-${id}`,
    label: `Deal ${letter}`,
    onClick: () => { lastAction.value = `Opened → Deal ${letter}` },
  }
  // Insert before the trailing "Add deal" action row
  const addRowIdx = dealsParent.children.findIndex((c) => c.key === 'deals-add')
  dealsParent.children.splice(addRowIdx, 0, newChild)
  // Keep the badge count in sync (children minus the action row)
  dealsParent.badge = dealsParent.children.length - 1
  lastAction.value = `Created → Deal ${letter}`
}

function removeLastDeal() {
  const dealsParent = demoItems.value.find((i) => i.key === 'deals')
  if (!dealsParent?.children) return
  // Find last child that isn't the action row
  const realChildren = dealsParent.children.filter((c) => c.key !== 'deals-add')
  if (realChildren.length === 0) return
  const last = realChildren[realChildren.length - 1]
  dealsParent.children = dealsParent.children.filter((c) => c.key !== last.key)
  dealsParent.badge = dealsParent.children.length - 1
  lastAction.value = `Removed → ${last.label}`
}

function resetDemo() {
  demoItems.value = makeInitialItems()
  nextDealId = 3
  lastAction.value = '— reset'
}

function onItemClick(payload: DtSidebarItemClickPayload) {
  // Demonstration only — the per-item onClick handlers above already log.
  // This shows the global @item-click event you can listen to at the parent.
  void payload
}

/* ──────────────────────────────────────────
   Profile modal demo
   ────────────────────────────────────────── */
const showProfileDemo = ref(false)
const demoUser: DtUser = {
  first_name: 'Mardon',
  last_name: 'Shonazarov',
  middle_name: 'A.',
  organization_name: 'DT Hub',
  phone_numbers: [{ number: '+998 90 123 45 67' }],
}
const profileLog = ref('— modal closed')
const onLogout = () => { profileLog.value = 'logout() fired'; showProfileDemo.value = false }

function onThemeChange(value: ThemeMode) {
  setTheme(value)
  profileLog.value = `theme-change: ${value} (applied to docs site)`
}

function onLocaleChange(value: AppLocale) {
  setLocale(value)
  profileLog.value = `locale-change: ${value} (applied to entire site)`
}

/* ──────────────────────────────────────────
   Code snippets
   ────────────────────────────────────────── */
const shellCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'
${IMP} {
  DtLayout,
  DtLayoutHeader,
  DtLayoutSidebar,
  DtProfileModal,
  type DtModuleItem,
  type DtNavItem,
  type DtUser,
} from '@/components/ui/layout'
${IMP} { Home, FileText } from 'lucide-vue-next'

const showProfile = ref(false)

const user: DtUser = {
  first_name: 'Demo',
  last_name: 'User',
  phone_numbers: [{ number: '+998 90 000 00 00' }],
}

const navItems: DtNavItem[] = [
  { key: 'dashboard', to: '/', icon: Home, label: 'Dashboard' },
  { key: 'documents', to: '/documents', icon: FileText, label: 'Documents', badge: 12 },
]

const modules: DtModuleItem[] = [
  { key: 'crm', label: 'CRM', icon: Home, href: '/crm' },
  { key: 'documents', label: 'Documents', icon: FileText, href: '/documents' },
]
<\/script>

<template>
  <DtLayout>
    <template #header>
      <DtLayoutHeader
        badge="CRM"
        active-module="crm"
        :modules="modules"
        :profile-name="\`\${user.first_name} \${user.last_name}\`"
        @toggle-profile="showProfile = !showProfile"
      >
        <template #logo>
          <RouterLink to="/">Logo</RouterLink>
        </template>
        <template #profile-dropdown>
          <DtProfileModal v-model="showProfile" :user="user" @logout="logout" />
        </template>
      </DtLayoutHeader>
    </template>

    <template #sidebar>
      <DtLayoutSidebar :items="navItems" />
    </template>

    <RouterView />
  </DtLayout>
</template>`

const sidebarCode = `const navItems: DtNavItem[] = [
  { key: 'dashboard', to: '/', icon: HomeIcon, label: 'Dashboard' },
  {
    key: 'deals',
    icon: FolderIcon,
    label: 'Deals',
    badge: 3,
    defaultOpen: true,
    children: [
      { key: 'deal-1', to: '/deals/1', label: 'Deal A' },
      { key: 'add-deal', icon: PlusIcon, label: 'Add', onClick: openModal },
    ],
  },
]

const sections: DtNavSection[] = [
  {
    title: 'Widgets',
    items: [
      { key: 'components', label: 'Components', to: '/components' },
      { key: 'soon', label: 'Coming soon', disabled: true, badge: 'Soon' },
    ],
  },
]

<DtLayoutSidebar
  v-model:open-keys="openKeys"
  :items="navItems"
  :sections="sections"
  @item-click="onItemClick"
>
  <template #top>
    <WorkspaceSwitcher />
  </template>
</DtLayoutSidebar>`

const dynamicCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'
${IMP} { DtLayoutSidebar, type DtNavItem } from '@/components/ui/layout'

const items = ref<DtNavItem[]>([
  { key: 'home', label: 'Dashboard', onClick: () => navigate('/') },
  {
    key: 'deals',
    label: 'Deals',
    badge: 2,
    defaultOpen: true,
    children: [
      { key: 'deal-1', label: 'Deal A', onClick: () => openDeal(1) },
      { key: 'deal-2', label: 'Deal B', onClick: () => openDeal(2) },
      { key: 'add',   label: 'Add deal', onClick: () => addDeal() },
    ],
  },
])

function addDeal() {
  const deals = items.value.find((i) => i.key === 'deals')!
  const id = deals.children!.length        // simple incremental
  deals.children!.splice(-1, 0, {          // insert before the trailing 'Add' row
    key: \`deal-\${id}\`,
    label: \`Deal \${String.fromCharCode(64 + id)}\`,
    onClick: () => openDeal(id),
  })
  deals.badge = deals.children!.length - 1
}
<\/script>

<template>
  <DtLayoutSidebar :items="items" />
</template>`

const profileCode = `<script setup lang="ts">
${IMP} { ref } from 'vue'
${IMP} { DtLayoutHeader, DtProfileModal, type DtUser } from '@/components/ui/layout'

const showProfile = ref(false)

const user: DtUser = {
  first_name: 'Mardon',
  last_name: 'Shonazarov',
  organization_name: 'DT Hub',
  phone_numbers: [{ number: '+998 90 123 45 67' }],
}

function onLogout() {
  // Clear tokens, redirect to /login, etc.
}
<\/script>

<template>
  <DtLayoutHeader
    badge="CRM"
    :profile-name="\`\${user.first_name} \${user.last_name}\`"
    @toggle-profile="showProfile = !showProfile"
  >
    <template #profile-dropdown>
      <DtProfileModal
        v-model="showProfile"
        :user="user"
        @logout="onLogout"
      />
    </template>
  </DtLayoutHeader>
</template>`

const componentsCols: DtColumn[] = [
  { key: 'name', label: 'Component', width: '200px' },
  { key: 'desc', label: 'Description' },
]
const componentsRows = [
  { name: 'DtLayout', desc: 'App shell. Three slots: header, sidebar, default (content). Optional footer slot.' },
  { name: 'DtLayoutHeader', desc: 'Sticky top bar with logo slot, badge, profile button, and built-in modules switcher.' },
  { name: 'DtLayoutSidebar', desc: 'Vertical nav with sections, expandable items, badges, and mobile bottom-nav.' },
  { name: 'DtModulesModal', desc: 'Modal triggered by header — switches between products in the ecosystem.' },
  { name: 'DtProfileModal', desc: 'Profile dropdown with user info, theme/locale switchers, and logout.' },
  { name: 'DtPageView', desc: 'Page-level container. Title slot, max-width prop, consistent padding.' },
  { name: 'DtDivider', desc: 'Horizontal 1px line. Configurable spacing prop.' },
]

const navItemCols: DtColumn[] = [
  { key: 'name', label: 'Field', width: '160px' },
  { key: 'type', label: 'Type' },
  { key: 'desc', label: 'Description' },
]
const navItemRows = [
  { name: 'key', type: 'string', desc: 'Stable identifier — recommended for dynamic items.' },
  { name: 'to', type: 'string | RouteLocation', desc: 'Passed to RouterLink for route navigation.' },
  { name: 'label', type: 'string', desc: 'Visible item text.' },
  { name: 'icon', type: 'Component', desc: 'Vue component (e.g. from lucide-vue-next or as inline SVG).' },
  { name: 'badge', type: 'string | number', desc: 'Count/status badge on the right.' },
  { name: 'onClick', type: '(payload) => void', desc: 'Custom handler for action rows (modals, etc.). Use instead of `to` for non-route rows.' },
  { name: 'children', type: 'DtNavItem[]', desc: 'Makes the item expandable. Don\'t mix with `to` on the same row.' },
  { name: 'active', type: 'boolean', desc: 'Force active state when route matching isn\'t enough.' },
  { name: 'disabled', type: 'boolean', desc: 'Prevents navigation, toggle, and callbacks.' },
  { name: 'hidden', type: 'boolean', desc: 'Skips rendering entirely.' },
  { name: 'defaultOpen', type: 'boolean', desc: 'Opens this expandable parent by default.' },
]
</script>

<template>
  <DtPageView :title="t('nav.layout')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('components.layout.lead')" />

      <h2>Install</h2>
      <CodeBlock code="npx dt-ui add layout" lang="bash" />
      <p>
        Installs the entire bundle in one folder: <code>DtLayout</code>,
        <code>DtLayoutHeader</code>, <code>DtLayoutSidebar</code>, <code>DtModulesModal</code>,
        <code>DtProfileModal</code>, <code>DtPageView</code>, and <code>DtDivider</code>.
      </p>

      <h2>What's in the bundle</h2>
      <DtDataTable :columns="componentsCols" :items="componentsRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Try it: dynamic, nested, actionable</h2>
      <p>
        A live <code>DtLayoutSidebar</code> embedded below — items are reactive, an
        <code>onClick</code> handler on the bottom "Add deal" row inserts a new child,
        and the outer buttons mutate the same items array. Click any item to see its
        action fire.
      </p>
      <div class="dx-sidebar-playground">
        <div class="dx-sidebar-playground__sidebar">
          <DtLayoutSidebar :items="demoItems" @item-click="onItemClick" />
        </div>
        <div class="dx-sidebar-playground__panel">
          <div class="dx-sidebar-playground__actions">
            <DtButton size="xs" @click="addDeal">Add deal</DtButton>
            <DtButton size="xs" variant="outline" @click="removeLastDeal">Remove last</DtButton>
            <DtButton size="xs" variant="transparent" @click="resetDemo">Reset</DtButton>
          </div>
          <div class="dx-sidebar-playground__log">
            <div class="dx-sidebar-playground__log-label">Last action</div>
            <code class="dx-sidebar-playground__log-value">{{ lastAction }}</code>
          </div>
          <p class="dx-sidebar-playground__hint">
            Tip: the "Add deal" row inside the Deals group uses an <code>onClick</code>
            handler — exactly the same pattern as the outer "Add deal" button.
          </p>
        </div>
      </div>
      <CodeBlock :code="dynamicCode" lang="vue" />

      <h2>Header + profile modal</h2>
      <p>
        <code>DtLayoutHeader</code> ships a built-in profile trigger; pair it with
        <code>DtProfileModal</code> via the <code>#profile-dropdown</code> slot to get
        the standard avatar &rarr; dropdown flow. The modal includes locale/theme
        switchers and a logout button out of the box.
      </p>
      <p>
        <DtBadge variant="blue" size="sm">Note</DtBadge>
        This docs site itself hides the profile button via
        <code>:show-profile-button="false"</code> because there's no user concept here.
        In real apps you'd wire it up like below.
      </p>
      <p class="dx-profile-demo__hint">
        Click the avatar in the embedded header below to open the modal.
      </p>
      <div class="dx-header-demo">
        <DtLayoutHeader
          badge="CRM"
          :show-modules-button="false"
          :profile-name="`${demoUser.first_name} ${demoUser.last_name}`"
          @toggle-profile="showProfileDemo = !showProfileDemo"
        >
          <template #logo>
            <span class="dx-header-demo__logo">Acme Inc.</span>
          </template>
          <template #profile-dropdown>
            <DtProfileModal
              v-model="showProfileDemo"
              :user="demoUser"
              :theme="currentTheme"
              :locale="appLocale"
              @logout="onLogout"
              @theme-change="onThemeChange"
              @locale-change="onLocaleChange"
            />
          </template>
        </DtLayoutHeader>
        <code class="dx-header-demo__log">Last emit: {{ profileLog }}</code>
      </div>
      <CodeBlock :code="profileCode" lang="vue" />

      <h2>App shell example</h2>
      <CodeBlock :code="shellCode" lang="vue" />

      <h2>DtNavItem fields</h2>
      <p>
        These describe a row in <code>DtLayoutSidebar</code>. Use them in <code>items</code>
        and inside <code>sections[].items</code>.
      </p>
      <DtDataTable :columns="navItemCols" :items="navItemRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Sidebar with sections + slots</h2>
      <CodeBlock :code="sidebarCode" lang="vue" />
      <p>
        Sections render below the main items, with collapsible group titles. Use the
        <code>top</code> and <code>bottom</code> slots for extras above/below the nav (e.g.
        a workspace switcher, a sidebar footer).
      </p>

      <h2>Mobile</h2>
      <p>
        Below 1024px the sidebar collapses to a fixed bottom nav showing the first
        <code>mobileItems</code> (default <code>5</code>) primary items. Badges are hidden on
        mobile to keep the compact nav clean.
      </p>

      <h2>Header modules switcher</h2>
      <p>
        Pass <code>:modules</code> with <code>DtModuleItem[]</code> and the header
        automatically opens <code>DtModulesModal</code> when its grid icon is clicked.
        Hide the button entirely with <code>:show-modules-button="false"</code>.
      </p>
      <p>
        Each module accepts <code>href</code> (regular link), <code>onClick</code> (custom
        action), <code>icon</code> (Vue component) or <code>logo</code> (image URL),
        <code>badge</code>, and <code>active</code> state.
      </p>

      <h2>Theming</h2>
      <p>The shell reads these layout tokens from <code>base.css</code>:</p>
      <ul>
        <li><code>--dt-sidebar-width</code> — desktop sidebar width (240px default)</li>
        <li><code>--dt-header-height</code> — desktop header height (84px)</li>
        <li><code>--dt-header-height-mobile</code> — mobile header height (76px)</li>
        <li><code>--dt-mobile-nav-height</code> — bottom-nav reserve on mobile (80px)</li>
      </ul>

      <p style="margin-top: 32px;">
        <DtBadge variant="blue" size="sm">Tip</DtBadge>
        See the live <RouterLink to="/demo">CRM demo</RouterLink> for a full
        <code>DtLayout</code> + sidebar + page view in action.
      </p>
    </div>
  </DtPageView>
</template>

<style scoped>
.dx-sidebar-playground {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: var(--dt-spacing-2xl);
  padding: var(--dt-spacing-2xl);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-background-secondary);
  margin-bottom: var(--dt-spacing-xl);
}

/* Tame the real DtLayoutSidebar so it sits inside the demo card instead of
   sticking to the viewport like the actual app shell. */
.dx-sidebar-playground__sidebar :deep(.dt-sidebar) {
  position: static;
  top: auto;
  height: auto;
  max-height: 420px;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  background: var(--dt-color-background);
  border-radius: var(--dt-radius-md);
  border: 1px solid var(--dt-color-border-light);
  padding: var(--dt-spacing-md);
}

.dx-sidebar-playground__panel {
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-lg);
}

.dx-sidebar-playground__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--dt-spacing-md);
}

.dx-sidebar-playground__log {
  padding: var(--dt-spacing-lg);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-md);
  background: var(--dt-color-background);
  display: flex;
  flex-direction: column;
  gap: var(--dt-spacing-xs);
}

.dx-sidebar-playground__log-label {
  font-size: var(--dt-text-body-xs);
  color: var(--dt-color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dx-sidebar-playground__log-value {
  font-size: var(--dt-text-body-sm);
  color: var(--dt-color-text);
}

.dx-sidebar-playground__hint {
  font-size: var(--dt-text-body-sm);
  color: var(--dt-color-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .dx-sidebar-playground {
    grid-template-columns: 1fr;
  }
}

.dx-profile-demo__hint {
  font-size: var(--dt-text-body-sm);
  color: var(--dt-color-text-secondary);
  margin: var(--dt-spacing-md) 0;
}

.dx-header-demo {
  position: relative;
  padding: var(--dt-spacing-lg) var(--dt-spacing-2xl);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-lg);
  background: var(--dt-color-background-secondary);
  margin-bottom: var(--dt-spacing-xl);
}

.dx-header-demo :deep(.dt-header) {
  height: 64px;
  padding: 0;
}

.dx-header-demo__logo {
  font-weight: var(--dt-font-bold);
  color: var(--dt-color-text);
}

.dx-header-demo__log {
  display: block;
  margin-top: var(--dt-spacing-md);
  font-size: var(--dt-text-body-sm);
  color: var(--dt-color-text-secondary);
}
</style>
