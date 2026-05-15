<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { highlight } from '@/lib/highlighter'

const props = withDefaults(defineProps<{
  code: string
  lang?: string
}>(), {
  lang: 'vue',
})

const html = ref<string>('')
const copied = ref(false)
let copyTimer: number | undefined

watchEffect(async () => {
  html.value = await highlight(props.code.trim(), props.lang)
})

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code.trim())
    copied.value = true
    if (copyTimer) window.clearTimeout(copyTimer)
    copyTimer = window.setTimeout(() => { copied.value = false }, 1500)
  } catch {
    /* fallback skipped — modern browsers all support clipboard API */
  }
}
</script>

<template>
  <div class="dx-code">
    <button
      type="button"
      class="dx-code__copy"
      :class="{ 'dx-code__copy--ok': copied }"
      :title="copied ? 'Copied!' : 'Copy to clipboard'"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy"
    >
      {{ copied ? '✓ Copied' : 'Copy' }}
    </button>
    <div v-if="html" class="dx-code__content" v-html="html" />
    <pre v-else class="dx-code__fallback"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.dx-code {
  position: relative;
  background: var(--dt-color-background-tertiary);
  border: 1px solid var(--dt-color-border-light);
  border-radius: var(--dt-radius-md);
  overflow-x: auto;
  font-size: var(--dt-text-xs);
  font-family: var(--dt-font-mono);
}

.dx-code__copy {
  position: absolute;
  top: var(--dt-spacing-md);
  right: var(--dt-spacing-md);
  z-index: 1;
  padding: 4px var(--dt-spacing-md);
  font-size: 11px;
  font-family: inherit;
  font-weight: var(--dt-font-medium);
  color: var(--dt-color-text-secondary);
  background: var(--dt-color-background);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-xxs);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--dt-transition-fast),
              border-color var(--dt-transition-fast),
              color var(--dt-transition-fast);
}

.dx-code:hover .dx-code__copy,
.dx-code__copy:focus-visible {
  opacity: 1;
}

.dx-code__copy:hover {
  border-color: var(--dt-color-accent);
  color: var(--dt-color-accent);
}

.dx-code__copy--ok {
  opacity: 1 !important;
  color: var(--dt-color-success);
  border-color: var(--dt-color-success);
}

.dx-code__content,
.dx-code__fallback {
  margin: 0;
  padding: var(--dt-spacing-xl);
  padding-right: 80px;  /* leave room for copy button */
  font-family: var(--dt-font-mono);
  font-size: var(--dt-text-xs);
  line-height: 1.6;
}

.dx-code :deep(pre) {
  margin: 0;
  background: transparent !important;
  font-family: inherit;
}

.dx-code :deep(code) {
  font-family: inherit;
}

/* Light/dark theme via shiki CSS vars */
html:not([data-theme='dark']) .dx-code :deep(.shiki),
html:not([data-theme='dark']) .dx-code :deep(.shiki span) {
  color: var(--shiki-light) !important;
}

html[data-theme='dark'] .dx-code :deep(.shiki),
html[data-theme='dark'] .dx-code :deep(.shiki span) {
  color: var(--shiki-dark) !important;
}
</style>
