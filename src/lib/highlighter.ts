import { createHighlighterCore, type HighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

// Fine-grained imports → only the langs/themes we actually use ship.
import githubLight from '@shikijs/themes/github-light'
import githubDark from '@shikijs/themes/github-dark'
import vue from '@shikijs/langs/vue'
import typescript from '@shikijs/langs/typescript'
import javascript from '@shikijs/langs/javascript'
import css from '@shikijs/langs/css'
import json from '@shikijs/langs/json'
import bash from '@shikijs/langs/bash'
import html from '@shikijs/langs/html'

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: [vue, typescript, javascript, css, json, bash, html],
      engine: createOnigurumaEngine(import('shiki/wasm')),
    })
  }
  return highlighterPromise
}

export async function highlight(code: string, lang = 'vue'): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  })
}
