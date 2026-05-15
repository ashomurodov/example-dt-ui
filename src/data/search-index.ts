import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type SearchEntry = {
  title: string
  group: string
  to: string
  keywords: string  // additional words for matching, not displayed
  description: string
}

type SearchSeed = {
  titleKey: string
  descKey: string
  group: string
  to: string
  keywords: string
}

const seeds: SearchSeed[] = [
  // Top-level
  { titleKey: 'nav.home',           descKey: 'search.descriptions.home',           group: 'Pages',        to: '/',                       keywords: 'landing intro overview features' },
  { titleKey: 'nav.demo',           descKey: 'search.descriptions.demo',           group: 'Pages',        to: '/demo',                   keywords: 'crm documents list table example real app' },
  // Docs
  { titleKey: 'nav.introduction',   descKey: 'search.descriptions.introduction',   group: 'Docs',         to: '/docs/getting-started',   keywords: 'install setup first component init add introduction quickstart' },
  { titleKey: 'nav.cli',            descKey: 'search.descriptions.cli',            group: 'Docs',         to: '/docs/cli',               keywords: 'init add update list commands' },
  { titleKey: 'nav.theming',        descKey: 'search.descriptions.theming',        group: 'Docs',         to: '/docs/theming',           keywords: 'color tokens dark mode css variables override scale brand' },
  // Form
  { titleKey: 'nav.button',         descKey: 'search.descriptions.button',         group: 'Form',         to: '/components/button',      keywords: 'click action submit primary secondary outline ghost loading' },
  { titleKey: 'nav.input',          descKey: 'search.descriptions.input',          group: 'Form',         to: '/components/input',       keywords: 'text field form label hint error success' },
  { titleKey: 'nav.select',         descKey: 'search.descriptions.select',         group: 'Form',         to: '/components/select',      keywords: 'dropdown combobox option choice' },
  { titleKey: 'nav.toggle',         descKey: 'search.descriptions.toggle',         group: 'Form',         to: '/components/toggle',      keywords: 'switch on off boolean' },
  { titleKey: 'nav.checkbox',       descKey: 'search.descriptions.checkbox',       group: 'Form',         to: '/components/checkbox',    keywords: 'check tick boolean' },
  { titleKey: 'nav.radio',          descKey: 'search.descriptions.radio',          group: 'Form',         to: '/components/radio',       keywords: 'radio group single choice' },
  // Data Display
  { titleKey: 'nav.card',           descKey: 'search.descriptions.card',           group: 'Data Display', to: '/components/card',        keywords: 'container section panel header content footer' },
  { titleKey: 'nav.badge',          descKey: 'search.descriptions.badge',          group: 'Data Display', to: '/components/badge',       keywords: 'tag pill chip count color indicator' },
  { titleKey: 'nav.badgeGroup',     descKey: 'search.descriptions.badgeGroup',     group: 'Data Display', to: '/components/badge-group', keywords: 'announcement banner release notice callout pill modern' },
  { titleKey: 'nav.avatar',         descKey: 'search.descriptions.avatar',         group: 'Data Display', to: '/components/avatar',      keywords: 'profile user image initials photo group label status online offline' },
  { titleKey: 'nav.statusBadge',    descKey: 'search.descriptions.statusBadge',    group: 'Data Display', to: '/components/status-badge', keywords: 'pill state active inactive moderation rejected' },
  { titleKey: 'nav.dataTable',      descKey: 'search.descriptions.dataTable',      group: 'Data Display', to: '/components/data-table',  keywords: 'table list grid columns rows striped loading empty' },
  { titleKey: 'nav.pagination',     descKey: 'search.descriptions.pagination',     group: 'Data Display', to: '/components/pagination',  keywords: 'page navigation prev next ellipsis' },
  // Navigation
  { titleKey: 'nav.tabSwitcher',    descKey: 'search.descriptions.tabSwitcher',    group: 'Navigation',   to: '/components/tab-switcher', keywords: 'tabs filter status flip indicator' },
  { titleKey: 'nav.searchToolbar',  descKey: 'search.descriptions.searchToolbar',  group: 'Navigation',   to: '/components/search-toolbar', keywords: 'search filter list page header create add' },
  { titleKey: 'nav.layout',         descKey: 'search.descriptions.layout',         group: 'Navigation',   to: '/components/layout',      keywords: 'shell app header sidebar nav modules profile page divider' },
  // Overlay
  { titleKey: 'nav.dialog',         descKey: 'search.descriptions.dialog',         group: 'Overlay',      to: '/components/dialog',      keywords: 'modal popup overlay confirm form' },
  { titleKey: 'nav.dropdownMenu',   descKey: 'search.descriptions.dropdownMenu',   group: 'Overlay',      to: '/components/dropdown-menu', keywords: 'dropdown menu popover floating action contextual submenu checkbox radio reka' },
]

export function useSearchIndex() {
  const { t } = useI18n()
  return computed<SearchEntry[]>(() =>
    seeds.map((s) => ({
      title: t(s.titleKey),
      group: s.group,
      to: s.to,
      keywords: s.keywords,
      description: t(s.descKey),
    })),
  )
}
