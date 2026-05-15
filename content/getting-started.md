# Getting Started

dt-ui is a copy-based component registry. You install one npm package for the CLI, then copy individual components into your project. After that, the components live in your codebase and your team owns them.

## 1. Install the package

Add it to your existing Vue 3 + Vite (or Nuxt) project.

```bash
npm install aetherx-dt-ui
```

## 2. Initialize the registry

Run the init command from your project root. It writes a small `.dtui.json` config, copies `base.css` with all the design tokens, and sets up the component target directory.

```bash
npx dt-ui init
```

The defaults are `src/components/ui` for components and `src/lib` for shared utilities — accept them unless you have a strong reason to change.

## 3. Add components

Pull in the ones you need. Internal dependencies are resolved automatically.

```bash
npx dt-ui add button input card
```

## 4. Import the styles once

In your app entry, import `base.css` (and the optional table helpers).

```ts
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/base.css'
import '@/styles/table-cells.css'

createApp(App).mount('#app')
```

## 5. Use the components

Each component folder has its own barrel `index.ts`. Import what you need.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DtButton } from '@/components/ui/button'
import { DtInput } from '@/components/ui/input'

const name = ref('')
</script>

<template>
  <DtInput v-model="name" placeholder="Your name">
    <template #label>Name</template>
  </DtInput>

  <DtButton variant="primary">Save</DtButton>
</template>
```

## What next?

- Read about the [token system](/docs/theming) and how to override colors.
- Browse the [component pages](/components/button) for live demos and copy-pasteable examples.
- See it all in action on the [live demo](/demo).
