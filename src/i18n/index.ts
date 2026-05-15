import { createI18n } from 'vue-i18n'
import { computed } from 'vue'
import en from './messages/en'
import ru from './messages/ru'
import uz from './messages/uz'

export type AppLocale = 'en' | 'ru' | 'uz'

const STORAGE_KEY = 'dt-locale'

function detectInitialLocale(): AppLocale {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'ru' || saved === 'uz') return saved
  }
  if (typeof navigator !== 'undefined') {
    const browser = navigator.language?.slice(0, 2).toLowerCase()
    if (browser === 'ru') return 'ru'
    if (browser === 'uz') return 'uz'
  }
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages: { en, ru, uz },
})

export const locale = computed<AppLocale>({
  get: () => i18n.global.locale.value as AppLocale,
  set: (next) => {
    i18n.global.locale.value = next
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next)
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next
    }
  },
})

export function setLocale(next: AppLocale) {
  locale.value = next
}

// Apply initial lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = locale.value
}
