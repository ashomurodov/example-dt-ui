<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { DtPageView } from '@/components/ui/layout'
import { DtButton } from '@/components/ui/button'
import { DtCard, DtCardHeader, DtCardContent } from '@/components/ui/card'
import { DtBadge } from '@/components/ui/badge'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <DtPageView max-width="1024px">
    <header class="dx-hero">
      <DtBadge variant="blue" size="sm" style="margin-bottom: 16px;">v0.1.49</DtBadge>
      <h1 class="dx-hero__title">{{ t('pages.home.tagline') }}</h1>
      <p class="dx-hero__lead">{{ t('pages.home.lead') }}</p>
      <div class="dx-hero__actions">
        <DtButton size="xl" @click="router.push('/docs/getting-started')">{{ t('pages.home.getStarted') }}</DtButton>
        <DtButton size="xl" variant="outline" @click="router.push('/demo')">{{ t('pages.home.liveDemo') }}</DtButton>
      </div>
    </header>

    <section class="dx-features">
      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureCopyTitle') }}</h3>
          <p v-html="t('pages.home.featureCopyDesc')" />
        </DtCardHeader>
      </DtCard>

      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureTokensTitle') }}</h3>
          <p v-html="t('pages.home.featureTokensDesc')" />
        </DtCardHeader>
      </DtCard>

      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureDarkTitle') }}</h3>
          <p v-html="t('pages.home.featureDarkDesc')" />
        </DtCardHeader>
      </DtCard>

      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureTypedTitle') }}</h3>
          <p v-html="t('pages.home.featureTypedDesc')" />
        </DtCardHeader>
      </DtCard>

      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureA11yTitle') }}</h3>
          <p v-html="t('pages.home.featureA11yDesc')" />
        </DtCardHeader>
      </DtCard>

      <DtCard>
        <DtCardHeader>
          <h3>{{ t('pages.home.featureLayoutTitle') }}</h3>
          <p v-html="t('pages.home.featureLayoutDesc')" />
        </DtCardHeader>
      </DtCard>
    </section>

    <section class="dx-section" style="margin-top: 96px; text-align: center;">
      <h2>{{ t('pages.home.readyTitle') }}</h2>
      <p style="color: var(--dt-color-text-secondary); margin-bottom: 24px;">
        {{ t('pages.home.readySubtitle') }}
      </p>
      <DtCard style="max-width: 560px; margin: 0 auto; text-align: left;">
        <DtCardContent>
          <pre style="margin: 0; font-family: var(--dt-font-mono); font-size: var(--dt-text-body-sm); line-height: 1.8;">npm install aetherx-dt-ui
npx dt-ui init
npx dt-ui add button input card</pre>
        </DtCardContent>
      </DtCard>
    </section>

    <section class="dx-section" style="margin-top: 64px; text-align: center;">
      <DtBadge variant="gray" size="sm" style="margin-bottom: 12px;">{{ t('pages.home.aiBadge') }}</DtBadge>
      <i18n-t keypath="pages.home.aiText" tag="p" style="color: var(--dt-color-text-secondary); max-width: 56ch; margin: 0 auto;">
        <template #full>
          <a href="/llms-full.txt"><code>/llms-full.txt</code></a>
        </template>
        <template #index>
          <a href="/llms.txt"><code>/llms.txt</code></a>
        </template>
      </i18n-t>
    </section>
  </DtPageView>
</template>
