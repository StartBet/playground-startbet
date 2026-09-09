<script setup lang="ts">
import { StTypography } from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'

defineOptions({ name: 'ShowcaseTypography' })
</script>

<template>
  <ShowcaseCard
    icon="font"
    title="StTypography"
    description="Escala tipográfica semântica — nunca escreva text-2xl à mão."
  >
    <StTypography as="p" variant="heading-3">heading-3</StTypography>
    <StTypography as="p" variant="highlight-medium">highlight-medium</StTypography>
    <StTypography as="p" variant="body-medium">
      body-medium — o parágrafo padrão, com a família e a altura de linha já definidas pelos tokens.
    </StTypography>
    <StTypography as="p" variant="body-small" class-name="text-st-content-ghost">
      body-small em text-st-content-ghost
    </StTypography>
  </ShowcaseCard>
</template>
