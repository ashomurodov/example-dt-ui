<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DtDialog, DtDialogContent } from '@/components/ui/dialog'
import { DtInput } from '@/components/ui/input'
import { DtBadge } from '@/components/ui/badge'
import { useSearchIndex, type SearchEntry } from '@/data/search-index'

const { t } = useI18n()
const searchIndex = useSearchIndex()

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const router = useRouter()
const query = ref('')
const inputRef = ref<InstanceType<typeof DtInput> | null>(null)
const activeIndex = ref(0)

const isOpen = computed({
  get: () => props.open,
  set: (v) => emit('update:open', v),
})

const results = computed<SearchEntry[]>(() => {
  const q = query.value.trim().toLowerCase()
  const all = searchIndex.value
  if (!q) return all
  return all.filter(entry => {
    const haystack = `${entry.title} ${entry.group} ${entry.keywords} ${entry.description}`.toLowerCase()
    return haystack.includes(q)
  })
})

// Group results by section for display
const grouped = computed(() => {
  const map = new Map<string, SearchEntry[]>()
  for (const entry of results.value) {
    const list = map.get(entry.group) ?? []
    list.push(entry)
    map.set(entry.group, list)
  }
  return Array.from(map.entries())
})

// Reset state every time we open
watch(() => props.open, (next) => {
  if (next) {
    query.value = ''
    activeIndex.value = 0
    nextTick(() => {
      const el = (inputRef.value as unknown as { $el: HTMLElement } | null)?.$el?.querySelector('input')
      el?.focus()
    })
  }
})

// Keep activeIndex valid as results change
watch(results, () => { activeIndex.value = 0 })

function go(entry: SearchEntry) {
  isOpen.value = false
  void router.push(entry.to)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const entry = results.value[activeIndex.value]
    if (entry) go(entry)
  }
}

// Map groups to badge color
const groupColor: Record<string, 'gray' | 'green' | 'blue' | 'orange' | 'red' | 'yellow'> = {
  Pages: 'gray',
  Docs: 'blue',
  Form: 'green',
  'Data Display': 'orange',
  Navigation: 'yellow',
  Overlay: 'red',
}
</script>

<template>
  <DtDialog v-model="isOpen">
    <DtDialogContent class="dx-search">
      <div class="dx-search__input">
        <DtInput
          ref="inputRef"
          v-model="query"
          :placeholder="t('chrome.searchPlaceholder')"
          @keydown="onKeydown"
        />
      </div>

      <div class="dx-search__results">
        <p v-if="!results.length" class="dx-search__empty">
          {{ t('search.noMatches', { query }) }}
        </p>

        <template v-else>
          <section v-for="[group, entries] in grouped" :key="group" class="dx-search__group">
            <header class="dx-search__group-title">{{ t(`search.groups.${group}`) }}</header>
            <button
              v-for="entry in entries"
              :key="entry.to"
              type="button"
              class="dx-search__item"
              :class="{ 'dx-search__item--active': results[activeIndex]?.to === entry.to }"
              @click="go(entry)"
              @mouseenter="activeIndex = results.indexOf(entry)"
            >
              <div class="dx-search__item-row">
                <span class="dx-search__item-title">{{ entry.title }}</span>
                <DtBadge :variant="groupColor[entry.group] ?? 'gray'" size="sm">{{ t(`search.groups.${entry.group}`) }}</DtBadge>
              </div>
              <p class="dx-search__item-desc">{{ entry.description }}</p>
            </button>
          </section>
        </template>
      </div>

      <footer class="dx-search__footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> {{ t('search.keyboard.navigate') }}</span>
        <span><kbd>↵</kbd> {{ t('search.keyboard.open') }}</span>
        <span><kbd>Esc</kbd> {{ t('search.keyboard.close') }}</span>
      </footer>
    </DtDialogContent>
  </DtDialog>
</template>

<style>
.dx-search {
  width: 100% !important;
  max-width: 600px !important;
  padding: 0 !important;
  display: flex;
  flex-direction: column;
  max-height: min(560px, calc(100vh - 64px));
  overflow: hidden;
}

.dx-search__input {
  padding: var(--dt-spacing-xl);
  border-bottom: 1px solid var(--dt-color-border-light);
  background: var(--dt-color-background);
}

.dx-search__results {
  flex: 1;
  overflow-y: auto;
  padding: var(--dt-spacing-md) 0;
}

.dx-search__empty {
  padding: var(--dt-spacing-3xl) var(--dt-spacing-xl);
  text-align: center;
  color: var(--dt-color-text-secondary);
  margin: 0;
}

.dx-search__group {
  padding: var(--dt-spacing-md) 0;
}

.dx-search__group-title {
  padding: var(--dt-spacing-md) var(--dt-spacing-xl) var(--dt-spacing-md);
  font-size: var(--dt-text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--dt-color-text-tertiary);
  font-weight: var(--dt-font-medium);
}

.dx-search__item {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: 0;
  padding: var(--dt-spacing-md) var(--dt-spacing-xl);
  font-family: inherit;
  cursor: pointer;
  color: var(--dt-color-text);
}

.dx-search__item:hover,
.dx-search__item--active {
  background: var(--dt-color-background-secondary);
}

.dx-search__item-row {
  display: flex;
  align-items: center;
  gap: var(--dt-spacing-md);
}

.dx-search__item-title {
  font-size: var(--dt-text-sm);
  font-weight: var(--dt-font-medium);
}

.dx-search__item-desc {
  margin: var(--dt-spacing-xs) 0 0;
  font-size: var(--dt-text-xs);
  color: var(--dt-color-text-secondary);
}

.dx-search__footer {
  display: flex;
  gap: var(--dt-spacing-3xl);
  padding: var(--dt-spacing-md) var(--dt-spacing-xl);
  border-top: 1px solid var(--dt-color-border-light);
  background: var(--dt-color-background-secondary);
  font-size: var(--dt-text-xs);
  color: var(--dt-color-text-tertiary);
}

.dx-search__footer kbd {
  font-family: var(--dt-font-mono);
  font-size: 11px;
  background: var(--dt-color-background);
  border: 1px solid var(--dt-color-border);
  border-radius: var(--dt-radius-xxs);
  padding: 1px var(--dt-spacing-sm);
  margin-right: var(--dt-spacing-xs);
}
</style>
