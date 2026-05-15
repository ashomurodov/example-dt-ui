import { ref, computed, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'dt-theme'

const initial = ((): ThemeMode => {
  if (typeof localStorage === 'undefined') return 'system'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'system'
})()

const mode = ref<ThemeMode>(initial)

const systemPrefersDark = ref(
  typeof window !== 'undefined'
    ? window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
    : false,
)

if (typeof window !== 'undefined') {
  window.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    systemPrefersDark.value = e.matches
  })
}

export const isDark = computed(() => {
  if (mode.value === 'dark') return true
  if (mode.value === 'light') return false
  return systemPrefersDark.value
})

export const theme = computed<ThemeMode>(() => mode.value)

export function setTheme(next: ThemeMode) {
  mode.value = next
  if (next === 'system') {
    localStorage.removeItem(STORAGE_KEY)
  } else {
    localStorage.setItem(STORAGE_KEY, next)
  }
}

let firstApply = true
let transitionTimer: number | undefined

watch(isDark, (next) => {
  const themeAttr = next ? 'dark' : 'light'
  document.documentElement.dataset.theme = themeAttr

  if (firstApply) {
    firstApply = false
    return
  }
  document.documentElement.classList.add('theme-transitioning')
  if (transitionTimer) window.clearTimeout(transitionTimer)
  transitionTimer = window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning')
  }, 250)
}, { immediate: true })

export function useTheme() {
  return { isDark, theme, setTheme, mode }
}
