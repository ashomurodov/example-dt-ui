<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtDataTable, type DtColumn } from '@/components/ui/data-table'
import { DtBadge } from '@/components/ui/badge'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

const configCols: DtColumn[] = [
  { key: 'name', label: 'Option', width: '180px' },
  { key: 'type', label: 'Type' },
  { key: 'default', label: 'Default', width: '110px' },
  { key: 'desc', label: 'Description' },
]

const configRows = [
  { name: 'mode', type: "'dev' | 'preprod' | 'prod'", default: 'required', desc: 'Picks the domain the header resolves API + module URLs against (dthub.uz / predt.uz / dt.uz).' },
  { name: 'activeModule', type: "'crm' | 'dwm' | 'mdc' | …", default: 'required', desc: "Highlights the current cabinet's tile in the modules modal." },
  { name: 'newDesign', type: 'boolean', default: 'false', desc: 'Always pass true. Selects the redesigned header shell. Everything below assumes this.' },
  { name: 'position', type: "'fixed' | 'absolute' | 'auto'", default: "'fixed'", desc: 'How the injected header is positioned in the viewport.' },
  { name: 'canSwitchAccount', type: 'boolean', default: 'true', desc: 'Shows the "Switch account" menu item in the profile modal when the user has multiple accounts.' },
  { name: 'darkThemeSupport', type: 'boolean', default: 'false', desc: 'Adds a Theme picker (Light / Dark / System) to the profile modal. Sets html[data-theme] so dt-ui tokens react.' },
  { name: 'logo', type: 'string', default: 'DT logo', desc: 'Image URL that replaces the default DT logo. Sized to 24px tall, 160px max width.' },
  { name: 'logoHref', type: 'string', default: 'https://{domain}', desc: 'Where the logo links to.' },
  { name: 'badge', type: 'string', default: '—', desc: 'Text in the small badge next to the logo. Pass "" to hide.' },
  { name: 'oauthClientId', type: 'string', default: '—', desc: 'When set, account switching uses the OAuth choose-user flow.' },
  { name: 'onLogout', type: '() => void', default: '—', desc: 'Called after the user clicks Logout in the profile modal.' },
  { name: 'onSelectLanguage', type: '(lang) => void', default: '—', desc: 'Called when the user picks a language. Cabinet syncs its own i18n.' },
  { name: 'onSelectTheme', type: '(theme) => void', default: '—', desc: 'Called when the user picks a theme (only fires when darkThemeSupport is true).' },
]

const installSnippet = `<!-- index.html -->
<script src="https://cdn.dthub.uz/dt-header/dt-header.js"><\/script>`

const minimalSnippet = `<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.$loadDtHeader({
    mode: 'prod',
    activeModule: 'crm',
    newDesign: true,
  })
})
<\/script>`

const dynamicLoaderSnippet = `// utils/addScriptToHtml.ts
export function addScriptToHtml(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(\`script[src="\${src}"]\`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}`

const fullExampleSnippet = `<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { addScriptToHtml } from '@/utils/addScriptToHtml'
import { useUserStore } from '@/stores/user'

const { locale } = useI18n()
const userStore = useUserStore()

onMounted(async () => {
  await addScriptToHtml('https://cdn.dthub.uz/dt-header/dt-header.js')

  window.$loadDtHeader({
    mode: import.meta.env.VITE_ENV ?? 'dev',
    activeModule: 'crm',
    newDesign: true,
    darkThemeSupport: true,
    badge: 'CRM',
    canSwitchAccount: true,

    onSelectLanguage: (lang) => {
      locale.value = lang
      localStorage.setItem('lang', lang)
    },
    onSelectTheme: (theme) => {
      // optional: sync to your own theme store
      console.log('theme picked:', theme)
    },
    onLogout: () => userStore.logout(),
  })
})
<\/script>

<template>
  <DtLayout>
    <!-- IMPORTANT: do NOT pass #header slot. The CDN injects its own header. -->
    <template #sidebar>
      <DtLayoutSidebar :items="navItems" :sections="sections" />
    </template>
    <RouterView />
  </DtLayout>
</template>`

const heightSnippet = `:root {
  /* dt-header injects this automatically when newDesign: true.
     Stick / fixed offsets in DtLayoutSidebar consume it,
     so the sidebar lines up below the header automatically. */
  --dt-header-height: 60px;
}

@media (max-width: 1024px) {
  :root {
    --dt-header-height: 56px;
  }
}`
</script>

<template>
  <DtPageView :title="t('pages.dtHeader.title')">
    <div class="dx-doc">
      <p class="dx-lead" v-html="t('pages.dtHeader.lead')" />

      <h2>What you get</h2>
      <ul>
        <li>A sticky / fixed top header rendered at the top of <code>&lt;body&gt;</code></li>
        <li>Modules switcher with all DT ecosystem tiles</li>
        <li>Profile modal: account info, switch account, change password, language, theme, logout</li>
        <li>Auth modal triggered when clicking auth-required modules while logged out</li>
        <li>Reads the session via the <code>act</code> cookie — no token plumbing in the cabinet</li>
        <li>Sets the global <code>--dt-header-height</code> CSS variable so dt-ui's sidebar offsets stay aligned</li>
      </ul>

      <h2>1. Drop the script tag</h2>
      <p>
        Simplest case — load the CDN bundle right in <code>index.html</code>. The script exposes
        <code>$loadDtHeader</code> on the global <code>window</code> object.
      </p>
      <CodeBlock :code="installSnippet" lang="html" />

      <h2>2. Minimal mount</h2>
      <p>
        From any component (typically your <code>App.vue</code> or root layout), call
        <code>$loadDtHeader</code> once with at least <code>mode</code>, <code>activeModule</code>
        and <code>newDesign: true</code>.
      </p>
      <CodeBlock :code="minimalSnippet" lang="vue" />

      <h2>3. Recommended: load dynamically</h2>
      <p>
        Hardcoding the <code>&lt;script&gt;</code> in <code>index.html</code> works, but most
        cabinets prefer to inject it from JS so the CDN URL can vary by environment and the
        bundle isn't fetched on routes that don't render the header. A tiny helper:
      </p>
      <CodeBlock :code="dynamicLoaderSnippet" lang="ts" />

      <h2>4. Full real-world example</h2>
      <p>
        How a cabinet typically wires it up — environment-aware CDN host, theme support, i18n
        sync, logout hook, and the layout pattern that pairs cleanly with the CDN.
      </p>
      <CodeBlock :code="fullExampleSnippet" lang="vue" />

      <h2>5. Don't render <code>DtLayoutHeader</code></h2>
      <p>
        The CDN injects its own header at the top of <code>&lt;body&gt;</code>. If you also pass
        a <code>#header</code> slot to <code>DtLayout</code>, you'll get two stacked headers.
        Pattern: just omit the <code>#header</code> slot — <code>DtLayout</code> skips its
        <code>&lt;header&gt;</code> element entirely when the slot is empty.
      </p>
      <DtBadge variant="orange" size="sm">cabinets only — example-dt-ui itself uses DtLayoutHeader</DtBadge>

      <h2>6. Header height + sidebar alignment</h2>
      <p>
        The CDN exposes its responsive height as a global CSS variable. <code>DtLayoutSidebar</code>
        consumes the same variable for its sticky offset, so sidebars line up below the header
        without any extra configuration.
      </p>
      <CodeBlock :code="heightSnippet" lang="css" />

      <h2>Config options</h2>
      <DtDataTable :columns="configCols" :items="configRows">
        <template #name="{ item }"><code>{{ (item as { name: string }).name }}</code></template>
        <template #type="{ item }"><code>{{ (item as { type: string }).type }}</code></template>
        <template #default="{ item }"><code>{{ (item as { default: string }).default }}</code></template>
        <template #desc="{ item }">{{ (item as { desc: string }).desc }}</template>
      </DtDataTable>

      <h2>Dark theme support</h2>
      <p>
        Pass <code>darkThemeSupport: true</code> and the profile modal grows a third sub-view:
        a Theme picker with <strong>Light</strong>, <strong>Dark</strong>, and
        <strong>System</strong> options.
      </p>
      <p>
        The choice is persisted to a <code>theme</code> cookie scoped to <code>.{domain}</code>
        (so it follows the user across cabinets on the same domain), and the resolved theme is
        written to <code>html[data-theme="dark"]</code> / <code>html[data-theme="light"]</code>
        on the document root. Because dt-ui's <code>base.css</code> already keys dark mode off
        that exact attribute, dt-ui components in your cabinet flip with no extra work.
      </p>
      <p>
        Need to react to the change yourself (sync your own user store, swap a logo, etc.)?
        Pass <code>onSelectTheme</code>.
      </p>

      <h2>Switching accounts</h2>
      <p>
        Account switching is built in. When the server flags
        <code>can_switch_account: true</code> on the profile response, the profile modal exposes
        a "Switch account" view that lists the user's accounts (individual + legal) with avatars
        and badges. Clicking one calls <code>POST /identity/api/v1/user/choose-user</code> and
        reloads the page.
      </p>
      <p>
        If your cabinet uses the OAuth choose-user flow, pass <code>oauthClientId</code> — the
        switch action will use <code>POST /identity/api/v1/user/choose-oauth-user</code> and
        navigate with the resulting session.
      </p>
    </div>
  </DtPageView>
</template>
