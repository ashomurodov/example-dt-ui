# dt-header CDN

A drop-in script-tag header for DT ecosystem cabinets. Ships from `cdn.dthub.uz/dt-header/dt-header.js` and provides the modules switcher, profile modal, account switching, language picker, and optional theme picker — all wired to the DT identity service via the user's `act` cookie.

## What it gives you

- Sticky / fixed top header rendered at the top of `<body>`
- Modules switcher with all DT ecosystem tiles
- Profile modal: account info, switch account, change password, language, theme, logout
- Auth modal triggered when clicking auth-required modules while logged out
- Sets `--dt-header-height` globally so dt-ui's sidebar offsets stay aligned

## Install

Drop the script tag in your `index.html`:

```html
<script src="https://cdn.dthub.uz/dt-header/dt-header.js"></script>
```

It exposes `window.$loadDtHeader(configs)`.

## Minimal mount

```vue
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.$loadDtHeader({
    mode: 'prod',
    activeModule: 'crm',
    newDesign: true,
  })
})
</script>
```

## Recommended: dynamic loader

Most cabinets prefer to inject the script from JS so the CDN URL can vary by environment:

```ts
// utils/addScriptToHtml.ts
export function addScriptToHtml(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}
```

```vue
<script setup lang="ts">
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
    onSelectTheme: (theme) => console.log('theme picked:', theme),
    onLogout: () => userStore.logout(),
  })
})
</script>

<template>
  <DtLayout>
    <!-- IMPORTANT: do NOT pass #header slot. The CDN injects its own header. -->
    <template #sidebar>
      <DtLayoutSidebar :items="navItems" :sections="sections" />
    </template>
    <RouterView />
  </DtLayout>
</template>
```

## Don't render `DtLayoutHeader` alongside it

The CDN injects its own header. If you also pass a `#header` slot to `DtLayout`, you'll get two stacked headers. `DtLayout` already skips its `<header>` element when the slot is empty — so just omit it.

## Header height + sidebar alignment

The CDN sets a global CSS variable for its responsive height:

```css
:root { --dt-header-height: 60px; }
@media (max-width: 1024px) {
  :root { --dt-header-height: 56px; }
}
```

`DtLayoutSidebar` consumes the same variable for its sticky offset, so sidebars line up below the header automatically.

## Config options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'dev' \| 'preprod' \| 'prod'` | **required** | Picks the domain (dthub.uz / predt.uz / dt.uz) the header resolves API + module URLs against. |
| `activeModule` | `'crm' \| 'dwm' \| 'mdc' \| …` | **required** | Highlights the current cabinet's tile in the modules modal. |
| `newDesign` | `boolean` | `false` | Always pass `true`. Selects the redesigned header shell. |
| `position` | `'fixed' \| 'absolute' \| 'auto'` | `'fixed'` | How the injected header is positioned. |
| `canSwitchAccount` | `boolean` | `true` | Shows the "Switch account" item when the user has multiple accounts. |
| `darkThemeSupport` | `boolean` | `false` | Adds Theme picker (Light / Dark / System). Sets `html[data-theme]` so dt-ui tokens react. |
| `logo` | `string` | DT logo | Image URL that replaces the default DT logo. |
| `logoHref` | `string` | `https://{domain}` | Where the logo links to. |
| `badge` | `string` | — | Text in the small badge next to the logo. Pass `""` to hide. |
| `oauthClientId` | `string` | — | When set, account switching uses the OAuth choose-user flow. |
| `onLogout` | `() => void` | — | Called after the user clicks Logout. |
| `onSelectLanguage` | `(lang) => void` | — | Called when the user picks a language. |
| `onSelectTheme` | `(theme) => void` | — | Called when the user picks a theme (only when `darkThemeSupport: true`). |

## Dark theme support

Pass `darkThemeSupport: true` and the profile modal grows a Theme view with **Light**, **Dark**, and **System** options. The choice is persisted to a `theme` cookie scoped to `.{domain}` (so it follows the user across cabinets on the same domain), and the resolved theme is written to `html[data-theme]`. dt-ui's `base.css` keys dark mode off that attribute, so dt-ui components flip with no extra wiring.

## Account switching

Built in. When the server flags `can_switch_account: true` on the profile response, the profile modal exposes a Switch Account view with avatars and badges. Clicking an account calls `POST /identity/api/v1/user/choose-user` and reloads the page. If your cabinet uses OAuth choose-user, pass `oauthClientId` and the switch uses `POST /identity/api/v1/user/choose-oauth-user`.
