<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  DtLayout,
  DtLayoutHeader,
  DtLayoutSidebar,
  DtProfileModal,
  type DtModuleItem,
  type DtUser,
} from '@/components/ui/layout'
import { useSidebarNav } from '@/data/nav'
import SearchDialog from '@/partials/SearchDialog.vue'
import { theme, setTheme, type ThemeMode } from '@/composables/useTheme'
import { locale, setLocale, type AppLocale } from '@/i18n'

const { t } = useI18n()
const { sidebarItems, sidebarSections } = useSidebarNav()
const showSearch = ref(false)
const showProfile = ref(false)

// Test user — used so visitors can see the profile + modules patterns
// (theme + locale switchers live inside the profile modal).
const demoUser: DtUser = {
  first_name: 'Demo',
  last_name: 'User',
  organization_name: 'dt-ui docs',
  phone_numbers: [{ number: '+998 90 000 00 00' }],
}

// Inline icons for the modules switcher (kept inline to avoid an icon dep).
const GridIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '3', y: '3', width: '7', height: '7', rx: '1' }),
    h('rect', { x: '14', y: '3', width: '7', height: '7', rx: '1' }),
    h('rect', { x: '3', y: '14', width: '7', height: '7', rx: '1' }),
    h('rect', { x: '14', y: '14', width: '7', height: '7', rx: '1' }),
  ])

const FileIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
    h('path', { d: 'M14 2v6h6M16 13H8M16 17H8M10 9H8' }),
  ])

const BoxIcon = () =>
  h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' }),
    h('path', { d: 'M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12' }),
  ])

const modules: DtModuleItem[] = [
  { key: 'ui',   label: 'UI',        icon: BoxIcon,  href: '#' },
  { key: 'crm',  label: 'CRM',       icon: GridIcon, href: '#' },
  { key: 'docs', label: 'Documents', icon: FileIcon, href: '#' },
]

function onThemeChange(value: ThemeMode) { setTheme(value) }
function onLocaleChange(value: AppLocale) { setLocale(value) }
function onLogout() { showProfile.value = false }

onMounted(() => {
  // Cmd/Ctrl+K opens search anywhere
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      showSearch.value = true
    }
  })
})

function openSearch() {
  showSearch.value = true
}
</script>

<template>
  <DtLayout>
    <template #header>
      <DtLayoutHeader
        badge="UI"
        active-module="ui"
        :modules="modules"
        :profile-name="`${demoUser.first_name} ${demoUser.last_name}`"
        @toggle-profile="showProfile = !showProfile"
      >
        <template #logo>
          <RouterLink to="/" class="dt-docs__brand" aria-label="dt-ui home">
            <svg class="dt-docs__brand-mark" xmlns="http://www.w3.org/2000/svg" width="44" height="40" fill="none" viewBox="0 0 44 40" aria-hidden="true">
              <path fill="currentColor" d="M22.155 22.308a.67.67 0 0 1 .667.81 12.7 12.7 0 0 1-1.273 3.373q-1.63 2.952-4.621 4.629-2.994 1.68-6.933 1.68H.7a.7.7 0 0 1-.7-.7v-9.092a.7.7 0 0 1 .7-.7zM37.267 32.1a.7.7 0 0 1-.7.7h-5.622a.7.7 0 0 1-.7-.7v-9.09a.7.7 0 0 1 .7-.7h5.622a.7.7 0 0 1 .7.7zM9.995 6.8q3.974.001 6.964 1.64h.003l.003-.001q2.991 1.643 4.603 4.592a13 13 0 0 1 1.368 3.932.672.672 0 0 1-.674.785H.7a.7.7 0 0 1-.7-.7V7.499a.7.7 0 0 1 .7-.7zm34.006 5.053a.7.7 0 0 1-.7.7h-5.334a.7.7 0 0 0-.7.7v3.795a.7.7 0 0 1-.7.7h-5.622a.7.7 0 0 1-.7-.7v-3.795a.7.7 0 0 0-.7-.7H23.88a.7.7 0 0 1-.7-.7V7.5a.7.7 0 0 1 .7-.7H43.3a.7.7 0 0 1 .7.7z" />
            </svg>
          </RouterLink>
        </template>

        <template #actions>
          <button
            type="button"
            class="dt-docs__search-btn"
            :title="t('chrome.searchHotkey')"
            :aria-label="t('chrome.searchAria')"
            @click="openSearch"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </template>

        <template #profile-dropdown>
          <DtProfileModal
            v-model="showProfile"
            :user="demoUser"
            :theme="theme"
            :locale="locale"
            @theme-change="onThemeChange"
            @locale-change="onLocaleChange"
            @logout="onLogout"
          />
        </template>
      </DtLayoutHeader>
    </template>

    <template #sidebar>
      <DtLayoutSidebar
        :items="sidebarItems"
        :sections="sidebarSections"
        :mobile-items="3"
      />
    </template>

    <RouterView />
  </DtLayout>

  <SearchDialog v-model:open="showSearch" />
</template>

<style>
.dt-docs__brand {
  display: inline-flex;
  align-items: center;
  gap: var(--dt-spacing-md);
  text-decoration: none;
  color: var(--dt-color-text);
  font-weight: var(--dt-font-medium);
}

.dt-docs__brand:hover {
  text-decoration: none;
}

.dt-docs__brand-mark {
  width: 32px;
  height: 32px;
  color: var(--dt-color-text);
  flex-shrink: 0;
}

/* Search trigger — icon-only button sized to match the modules/profile
   action buttons rendered by DtLayoutHeader (40×40 round, ghost). */
.dt-docs__search-btn {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--dt-color-icon-dark);
  cursor: pointer;
  transition: background-color var(--dt-transition-fast);
}

.dt-docs__search-btn:hover,
.dt-docs__search-btn:focus-visible {
  background: var(--dt-color-background-secondary);
  outline: none;
}

.dt-docs__search-btn svg {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}
</style>
