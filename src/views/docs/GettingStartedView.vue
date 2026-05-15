<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import CodeBlock from '@/partials/CodeBlock.vue'

const { t } = useI18n()

// `IMP` placeholder avoids Vite/Rolldown's dep-scanner from seeing `import '…'`
// strings inside template literals as real imports.
const IMP = 'import'

const installSnippet = `npm install aetherx-dt-ui`

const initSnippet = `npx dt-ui init`

const addSnippet = `npx dt-ui add button input card`

const importStyles = `// src/main.ts
${IMP} { createApp } from 'vue'
${IMP} App from './App.vue'

${IMP} '@/styles/base.css'
${IMP} '@/styles/table-cells.css'

createApp(App).mount('#app')`

const usage = `<script setup lang="ts">
${IMP} { ref } from 'vue'
${IMP} { DtButton } from '@/components/ui/button'
${IMP} { DtInput } from '@/components/ui/input'

const name = ref('')
<\/script>

<template>
  <DtInput v-model="name" placeholder="Your name">
    <template #label>Name</template>
  </DtInput>

  <DtButton>Save</DtButton>
</template>`
</script>

<template>
  <DtPageView :title="t('pages.gettingStarted.title')">
    <div class="dx-doc">
      <p class="dx-lead">{{ t('pages.gettingStarted.lead') }}</p>

      <h2>{{ t('pages.gettingStarted.step1Title') }}</h2>
      <p>{{ t('pages.gettingStarted.step1Body') }}</p>
      <CodeBlock :code="installSnippet" lang="bash" />

      <h2>{{ t('pages.gettingStarted.step2Title') }}</h2>
      <p v-html="t('pages.gettingStarted.step2Body')" />
      <CodeBlock :code="initSnippet" lang="bash" />
      <p v-html="t('pages.gettingStarted.step2Defaults')" />

      <h2>{{ t('pages.gettingStarted.step3Title') }}</h2>
      <p>{{ t('pages.gettingStarted.step3Body') }}</p>
      <CodeBlock :code="addSnippet" lang="bash" />

      <h2>{{ t('pages.gettingStarted.step4Title') }}</h2>
      <p v-html="t('pages.gettingStarted.step4Body')" />
      <CodeBlock :code="importStyles" lang="typescript" />

      <h2>{{ t('pages.gettingStarted.step5Title') }}</h2>
      <p v-html="t('pages.gettingStarted.step5Body')" />
      <CodeBlock :code="usage" lang="vue" />

      <h2>{{ t('pages.gettingStarted.whatNext') }}</h2>
      <ul>
        <li>
          {{ t('pages.gettingStarted.next1Prefix') }}<RouterLink to="/docs/theming">{{ t('pages.gettingStarted.next1Link') }}</RouterLink>{{ t('pages.gettingStarted.next1Suffix') }}
        </li>
        <li>
          {{ t('pages.gettingStarted.next2Prefix') }}<RouterLink to="/components/button">{{ t('pages.gettingStarted.next2Link') }}</RouterLink>{{ t('pages.gettingStarted.next2Suffix') }}
        </li>
        <li>
          {{ t('pages.gettingStarted.next3Prefix') }}<RouterLink to="/demo">{{ t('pages.gettingStarted.next3Link') }}</RouterLink>{{ t('pages.gettingStarted.next3Suffix') }}
        </li>
      </ul>
    </div>
  </DtPageView>
</template>
