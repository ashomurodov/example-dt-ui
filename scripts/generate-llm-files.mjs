#!/usr/bin/env node
/**
 * Generates LLM-friendly documentation files into public/.
 *
 *   public/llms.txt          — small index for agents (llmstxt.org convention)
 *   public/llms-full.txt     — entire docs as one markdown document
 *   public/components/*.md   — per-component markdown (mirrored from registry)
 *   public/docs/*.md         — per-doc-page markdown (mirrored from content/)
 *
 * Run automatically before vite dev/build via package.json scripts.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const CONTENT_DIR = path.join(ROOT, 'content')
const REGISTRY_DOCS = path.join(ROOT, 'node_modules/aetherx-dt-ui/src/registry/docs')
const PUBLIC_DIR = path.join(ROOT, 'public')

// Resolve site URL — used for absolute links in llms.txt.
// Override at build time with SITE_URL env var.
const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '') || 'https://ui.dthub.uz'

// Order matches the sidebar nav for predictable agent reading order.
const DOC_PAGES = [
  { slug: 'home', title: 'Introduction', source: 'home.md', route: '/' },
  { slug: 'getting-started', title: 'Getting Started', source: 'getting-started.md', route: '/docs/getting-started' },
  { slug: 'cli', title: 'CLI Reference', source: 'cli.md', route: '/docs/cli' },
  { slug: 'theming', title: 'Theming & Tokens', source: 'theming.md', route: '/docs/theming' },
  { slug: 'demo', title: 'Live Demo', source: 'demo.md', route: '/demo' },
]

const COMPONENTS = [
  // Form
  { slug: 'button', title: 'DtButton', group: 'Form' },
  { slug: 'input', title: 'DtInput', group: 'Form' },
  { slug: 'select', title: 'DtSelect', group: 'Form' },
  { slug: 'toggle', title: 'DtToggle', group: 'Form' },
  { slug: 'checkbox', title: 'DtCheckbox', group: 'Form' },
  { slug: 'radio', title: 'DtRadio', group: 'Form' },
  // Data Display
  { slug: 'card', title: 'DtCard', group: 'Data Display' },
  { slug: 'badge', title: 'DtBadge', group: 'Data Display' },
  { slug: 'avatar', title: 'DtAvatar', group: 'Data Display' },
  { slug: 'status-badge', title: 'DtStatusBadge', group: 'Data Display' },
  { slug: 'data-table', title: 'DtDataTable', group: 'Data Display' },
  { slug: 'pagination', title: 'DtPagination', group: 'Data Display' },
  // Navigation
  { slug: 'tab-switcher', title: 'DtTabSwitcher', group: 'Navigation' },
  { slug: 'search-toolbar', title: 'DtSearchToolbar', group: 'Navigation' },
  { slug: 'layout', title: 'DtLayout (bundle)', group: 'Navigation' },
  // Overlay
  { slug: 'dialog', title: 'DtDialog', group: 'Overlay' },
]

function read(file) {
  return fs.readFileSync(file, 'utf-8').trim()
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function readDocContent(slug, filename) {
  const file = path.join(CONTENT_DIR, filename)
  if (!fs.existsSync(file)) {
    console.warn(`[llm-gen] missing content file for ${slug}: ${filename}`)
    return ''
  }
  return read(file)
}

function readComponentDoc(slug) {
  const file = path.join(REGISTRY_DOCS, `${slug}.md`)
  if (!fs.existsSync(file)) {
    console.warn(`[llm-gen] missing registry doc: ${file}`)
    return ''
  }
  return read(file)
}

function buildLlmsIndex() {
  const lines = []
  lines.push(`# dt-ui`)
  lines.push('')
  lines.push(`> Lightweight, copy-based Vue 3 components for the DT ecosystem. CLI-driven, token-driven, dark-mode-ready.`)
  lines.push('')
  lines.push(`The full documentation as a single file: [llms-full.txt](${SITE_URL}/llms-full.txt)`)
  lines.push('')

  lines.push(`## Documentation`)
  lines.push('')
  for (const page of DOC_PAGES) {
    lines.push(`- [${page.title}](${SITE_URL}/docs/${page.slug}.md): ${firstNonEmptyLineAfterTitle(readDocContent(page.slug, page.source))}`)
  }
  lines.push('')

  // Group components
  const groups = new Map()
  for (const c of COMPONENTS) {
    if (!groups.has(c.group)) groups.set(c.group, [])
    groups.get(c.group).push(c)
  }
  for (const [group, items] of groups.entries()) {
    lines.push(`## Components — ${group}`)
    lines.push('')
    for (const c of items) {
      const oneLiner = firstNonEmptyLineAfterTitle(readComponentDoc(c.slug))
      lines.push(`- [${c.title}](${SITE_URL}/components/${c.slug}.md): ${oneLiner}`)
    }
    lines.push('')
  }

  return lines.join('\n').trim() + '\n'
}

/**
 * Pulls the first non-empty paragraph after the H1 title in a markdown doc.
 * Used for one-line descriptions in the index.
 */
function firstNonEmptyLineAfterTitle(md) {
  if (!md) return ''
  const lines = md.split('\n')
  let pastTitle = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (!pastTitle) {
      if (trimmed.startsWith('# ')) pastTitle = true
      continue
    }
    if (!trimmed) continue
    // Skip blockquote markers and headings — we want body text.
    if (trimmed.startsWith('>') || trimmed.startsWith('#')) continue
    // Trim to ~140 chars
    return trimmed.length > 140 ? trimmed.slice(0, 137) + '…' : trimmed
  }
  return ''
}

function buildLlmsFull() {
  const sections = []
  sections.push('# dt-ui — Vue 3 Component Registry')
  sections.push('')
  sections.push('> Lightweight, copy-based Vue 3 components for the DT ecosystem. This file contains the full documentation and component reference in one place.')
  sections.push('')
  sections.push(`Source: [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt)  ·  Index: [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt)`)
  sections.push('')
  sections.push('---')
  sections.push('')

  for (const page of DOC_PAGES) {
    sections.push(readDocContent(page.slug, page.source))
    sections.push('')
    sections.push('---')
    sections.push('')
  }

  sections.push('# Components')
  sections.push('')
  sections.push('Each component below is independently installable via `npx dt-ui add <slug>`. The slug appears at the top of each section.')
  sections.push('')

  for (const c of COMPONENTS) {
    const md = readComponentDoc(c.slug)
    sections.push(`<!-- slug: ${c.slug}  ·  group: ${c.group} -->`)
    sections.push(md)
    sections.push('')
    sections.push('---')
    sections.push('')
  }

  return sections.join('\n').trim() + '\n'
}

// ───────────────────────────────────────────────────────────── Run

console.log('[llm-gen] generating LLM-friendly docs…')

ensureDir(PUBLIC_DIR)
ensureDir(path.join(PUBLIC_DIR, 'docs'))
ensureDir(path.join(PUBLIC_DIR, 'components'))

// /llms.txt
const llmsIndex = buildLlmsIndex()
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsIndex, 'utf-8')

// /llms-full.txt
const llmsFull = buildLlmsFull()
fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFull, 'utf-8')

// /docs/*.md  (mirror per doc page)
for (const page of DOC_PAGES) {
  const md = readDocContent(page.slug, page.source)
  if (md) fs.writeFileSync(path.join(PUBLIC_DIR, 'docs', `${page.slug}.md`), md + '\n', 'utf-8')
}

// /components/*.md  (mirror per component)
for (const c of COMPONENTS) {
  const md = readComponentDoc(c.slug)
  if (md) fs.writeFileSync(path.join(PUBLIC_DIR, 'components', `${c.slug}.md`), md + '\n', 'utf-8')
}

const stats = {
  'llms.txt': llmsIndex.length,
  'llms-full.txt': llmsFull.length,
  'docs/': DOC_PAGES.length,
  'components/': COMPONENTS.length,
}
console.log('[llm-gen] done:', stats)
