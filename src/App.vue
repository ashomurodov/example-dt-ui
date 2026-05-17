<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  DtLayout,
  DtLayoutSidebar,
} from '@/components/ui/layout'
import { useSidebarNav } from '@/data/nav'
import SearchDialog from '@/partials/SearchDialog.vue'
import { addScriptToHtml } from '@/utils/addScriptToHtml'
import { setTheme, type ThemeMode } from '@/composables/useTheme'
import { setLocale, type AppLocale } from '@/i18n'

const { sidebarItems, sidebarSections } = useSidebarNav()
const showSearch = ref(false)

// Load the dt-header CDN directly — same pattern as bd-cabinet and the other
// DT cabinets. The CDN is public so dev + prod can both point at it.
const CDN_URL = 'https://cdn.dthub.uz/dt-header/dist/dt-header.js'

onMounted(async () => {
  // Cmd/Ctrl+K opens search anywhere (search trigger UI lives in the search dialog)
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      showSearch.value = true
    }
  })

  // dt-header CDN — injects its own <div id="dt-header"> at top of <body>.
  // We deliberately don't pass a #header slot to <DtLayout> so the layout
  // skips its own header element entirely (no double headers).
  try {
    await addScriptToHtml(CDN_URL)
    window.$loadDtHeader?.({
      mode: 'dev',
      activeModule: 'cabinet',
      newDesign: true,
      darkThemeSupport: true,
      badge: 'UI',
      onSelectLanguage: (lang) => setLocale(lang as AppLocale),
      onSelectTheme: (t) => setTheme(t as ThemeMode),
    })
  } catch (e) {
    // CDN failed to load — docs site continues working, just without the top header
    console.warn('[dt-header] CDN failed to load:', e)
  }
})
</script>

<template>
  <DtLayout class="dt-docs-layout">
    <!-- No #header slot — dt-header CDN injects its own header at top of <body> -->
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
/* The CDN header is position: fixed, so reserve top space equal to the
   header height that the CDN exposes via --dt-header-height. */
.dt-docs-layout {
  padding-top: var(--dt-header-height, 0px);
}
</style>
