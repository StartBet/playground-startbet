<script setup lang="ts">
import { StPaper, StTypography } from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'

defineOptions({ name: 'ShowcaseSurfaces' })

const surfaces = ['surface-0', 'surface-1', 'surface-2', 'surface-3', 'surface-4'] as const

const semanticSurfaces = [
  { variant: 'surface-info', label: 'info' },
  { variant: 'surface-positive', label: 'positive' },
  { variant: 'surface-warning', label: 'warning' },
  { variant: 'surface-negative', label: 'negative' }
] as const
</script>

<template>
  <ShowcaseCard
    icon="palette"
    title="StPaper e tokens"
    description="Superfícies, bordas e elevações vindas do tema — sem cor solta."
  >
    <div class="flex flex-wrap gap-st-1">
      <StPaper
        v-for="surface in surfaces"
        :key="surface"
        :variant="surface"
        border="1"
        :elevation="0"
        padding="1 2"
      >
        <StTypography variant="body-small">{{ surface }}</StTypography>
      </StPaper>
    </div>

    <div class="flex flex-wrap gap-st-1">
      <StPaper
        v-for="surface in semanticSurfaces"
        :key="surface.variant"
        :variant="surface.variant"
        :elevation="0"
        padding="1 2"
      >
        <StTypography variant="body-small">{{ surface.label }}</StTypography>
      </StPaper>
    </div>

    <div class="flex flex-wrap items-end gap-st-2">
      <StPaper
        v-for="elevation in [0, 1, 2, 3, 4] as const"
        :key="elevation"
        variant="surface-2"
        :elevation="elevation"
        padding="2"
      >
        <StTypography variant="body-small">e{{ elevation }}</StTypography>
      </StPaper>
    </div>
  </ShowcaseCard>
</template>
