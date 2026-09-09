<script setup lang="ts">
import { StBadge, StChip, StLoading, StProgressBar, StTypography } from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'

defineOptions({ name: 'ShowcaseFeedback' })

const chipVariants = ['primary', 'info', 'positive', 'warning', 'negative'] as const
</script>

<template>
  <ShowcaseCard
    icon="bell"
    title="Feedback"
    description="Badge, chip, barra de progresso e loading nas cores semânticas."
  >
    <div class="flex flex-wrap items-center gap-st-3">
      <StBadge variant="info" :value="3" />
      <StBadge variant="warning" value="99+" />
      <StBadge variant="negative" :value="1" pulse />
      <StBadge variant="positive" value="novo" size="medium" />
    </div>

    <div class="flex flex-wrap items-center gap-st-1">
      <StChip v-for="variant in chipVariants" :key="variant" :variant="variant">
        {{ variant }}
      </StChip>
    </div>

    <StProgressBar :percent="64" text="64%" variant="positive" />

    <div class="flex items-center gap-st-2">
      <StLoading type="spinner" size="6" />
      <StLoading type="cyclical" :value="40" size="6" variant="secondary" />
      <StTypography variant="body-small" class-name="text-st-content-ghost">
        StLoading spinner e cyclical
      </StTypography>
    </div>
  </ShowcaseCard>
</template>
