/**
 * Inject a <script> tag into the document head and resolve when loaded.
 * No-ops (resolves immediately) if the same src is already present.
 *
 * Used by the dt-header CDN integration so we can keep the loader logic
 * in App.vue and let Vue control when the script is fetched.
 */
export function addScriptToHtml(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = (e) => reject(e)
    document.head.appendChild(s)
  })
}

declare global {
  interface Window {
    $loadDtHeader?: (config: {
      mode: 'dev' | 'preprod' | 'prod'
      activeModule: string
      newDesign?: boolean
      darkThemeSupport?: boolean
      canSwitchAccount?: boolean
      position?: 'fixed' | 'absolute' | 'auto'
      logo?: string
      logoHref?: string
      badge?: string
      oauthClientId?: string
      onLogout?: () => void
      onSelectLanguage?: (lang: string) => void
      onSelectTheme?: (theme: 'light' | 'dark' | 'system') => void
      onSelectSwitchAccount?: () => string
    }) => void
  }
}
