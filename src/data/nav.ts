import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DtNavItem, DtNavSection } from '@/components/ui/layout'

export function useSidebarNav() {
  const { t } = useI18n()

  const sidebarItems = computed<DtNavItem[]>(() => [
    { key: 'home', to: '/', label: t('nav.home') },
    { key: 'demo', to: '/demo', label: t('nav.demo'), badge: 'CRM' },
  ])

  const sidebarSections = computed<DtNavSection[]>(() => [
    {
      title: t('nav.sections.getStarted'),
      items: [
        { key: 'getting-started', to: '/docs/getting-started', label: t('nav.introduction') },
        { key: 'cli', to: '/docs/cli', label: t('nav.cli') },
        { key: 'theming', to: '/docs/theming', label: t('nav.theming') },
      ],
    },
    {
      title: t('nav.sections.form'),
      items: [
        { key: 'c-button', to: '/components/button', label: t('nav.button') },
        { key: 'c-input', to: '/components/input', label: t('nav.input') },
        { key: 'c-select', to: '/components/select', label: t('nav.select') },
        { key: 'c-toggle', to: '/components/toggle', label: t('nav.toggle') },
        { key: 'c-checkbox', to: '/components/checkbox', label: t('nav.checkbox') },
        { key: 'c-radio', to: '/components/radio', label: t('nav.radio') },
      ],
    },
    {
      title: t('nav.sections.dataDisplay'),
      items: [
        { key: 'c-card', to: '/components/card', label: t('nav.card') },
        { key: 'c-badge', to: '/components/badge', label: t('nav.badge') },
        { key: 'c-avatar', to: '/components/avatar', label: t('nav.avatar') },
        { key: 'c-status-badge', to: '/components/status-badge', label: t('nav.statusBadge') },
        { key: 'c-data-table', to: '/components/data-table', label: t('nav.dataTable') },
        { key: 'c-pagination', to: '/components/pagination', label: t('nav.pagination') },
      ],
    },
    {
      title: t('nav.sections.navigation'),
      items: [
        { key: 'c-tab-switcher', to: '/components/tab-switcher', label: t('nav.tabSwitcher') },
        { key: 'c-search-toolbar', to: '/components/search-toolbar', label: t('nav.searchToolbar') },
        { key: 'c-layout', to: '/components/layout', label: t('nav.layout') },
      ],
    },
    {
      title: t('nav.sections.overlay'),
      items: [
        { key: 'c-dialog', to: '/components/dialog', label: t('nav.dialog') },
      ],
    },
  ])

  return { sidebarItems, sidebarSections }
}
