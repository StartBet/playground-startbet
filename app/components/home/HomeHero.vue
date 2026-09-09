<script setup lang="ts">
import { computed } from 'vue'
import { StButton, StChip, StIllustration, StTypography } from '@startbet/st-core-ui'
import { useThemeService } from '~/services/themeService'

defineOptions({ name: 'HomeHero' })

const { theme } = useThemeService()
const { stCoreUiVersion, storybookUrl } = useRuntimeConfig().public

/** A logo tem duas versões no CDN; a escolha acompanha o tema ativo. */
const brandIllustrationName = computed(() =>
  theme.value === 'light' ? 'brands/logo_light' : 'brands/logo_dark'
)
</script>

<template>
  <section
    class="st-container flex min-h-[75vh] flex-col items-center justify-center gap-st-3 py-st-10 text-center"
  >
    <StIllustration :name="brandIllustrationName" alt="StartBet" height="8" class-name="w-auto" />

    <StTypography as="h1" variant="heading-1">Playground</StTypography>

    <StTypography as="p" variant="body-large" class-name="max-w-st-72 text-st-content-ghost">
      Base para prototipar telas da StartBet usando os componentes e os tokens do design system
      <strong class="text-st-content-default">st-core-ui</strong>.
    </StTypography>

    <div class="flex flex-wrap items-center justify-center gap-st-1">
      <StChip variant="primary">st-core-ui v{{ stCoreUiVersion }}</StChip>
      <StChip variant="info">Nuxt 4</StChip>
      <StChip variant="secondary">Vue 3</StChip>
      <StChip variant="system">Tailwind 3</StChip>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-st-2 pt-st-2">
      <a href="#componentes">
        <StButton icon-right="arrow-down">Ver componentes</StButton>
      </a>

      <a :href="storybookUrl" target="_blank" rel="noopener noreferrer">
        <StButton variant="outline" icon-right="up-right-from-square">Storybook</StButton>
      </a>
    </div>
  </section>
</template>
