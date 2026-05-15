import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/demo', name: 'demo', component: () => import('@/views/DemoView.vue') },

  // Docs
  { path: '/docs/getting-started', name: 'getting-started', component: () => import('@/views/docs/GettingStartedView.vue') },
  { path: '/docs/cli', name: 'cli', component: () => import('@/views/docs/CliView.vue') },
  { path: '/docs/theming', name: 'theming', component: () => import('@/views/docs/ThemingView.vue') },

  // Components — Form
  { path: '/components/button', name: 'button', component: () => import('@/views/components/ButtonView.vue') },
  { path: '/components/input', name: 'input', component: () => import('@/views/components/InputView.vue') },
  { path: '/components/select', name: 'select', component: () => import('@/views/components/SelectView.vue') },
  { path: '/components/toggle', name: 'toggle', component: () => import('@/views/components/ToggleView.vue') },
  { path: '/components/checkbox', name: 'checkbox', component: () => import('@/views/components/CheckboxView.vue') },
  { path: '/components/radio', name: 'radio', component: () => import('@/views/components/RadioView.vue') },

  // Components — Data Display
  { path: '/components/card', name: 'card', component: () => import('@/views/components/CardView.vue') },
  { path: '/components/badge', name: 'badge', component: () => import('@/views/components/BadgeView.vue') },
  { path: '/components/badge-group', name: 'badge-group', component: () => import('@/views/components/BadgeGroupView.vue') },
  { path: '/components/avatar', name: 'avatar', component: () => import('@/views/components/AvatarView.vue') },
  { path: '/components/status-badge', name: 'status-badge', component: () => import('@/views/components/StatusBadgeView.vue') },
  { path: '/components/data-table', name: 'data-table', component: () => import('@/views/components/DataTableView.vue') },
  { path: '/components/pagination', name: 'pagination', component: () => import('@/views/components/PaginationView.vue') },

  // Components — Navigation
  { path: '/components/tab-switcher', name: 'tab-switcher', component: () => import('@/views/components/TabSwitcherView.vue') },
  { path: '/components/search-toolbar', name: 'search-toolbar', component: () => import('@/views/components/SearchToolbarView.vue') },
  { path: '/components/layout', name: 'layout', component: () => import('@/views/components/LayoutView.vue') },

  // Components — Overlay
  { path: '/components/dialog', name: 'dialog', component: () => import('@/views/components/DialogView.vue') },
  { path: '/components/dropdown-menu', name: 'dropdown-menu', component: () => import('@/views/components/DropdownMenuView.vue') },

  // 404 → home
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
