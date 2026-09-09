<script setup lang="ts">
import { StIcon, StPaper, StTypography } from '@startbet/st-core-ui'
import type { ShowcaseCardProps } from './ShowcaseCard.interface'

defineOptions({ name: 'ShowcaseCard' })

const props = defineProps<ShowcaseCardProps>()
</script>

<template>
  <StPaper
    variant="surface-0"
    border="1"
    border-radius="2"
    :elevation="1"
    padding="3"
    class-name="flex h-full flex-col gap-st-3"
  >
    <header class="flex items-start gap-st-2">
      <span
        class="flex h-st-5 w-st-5 shrink-0 items-center justify-center rounded-st-1 bg-st-surface-2 text-st-content-secondary"
      >
        <StIcon :name="props.icon" :size="4" />
      </span>

      <div class="flex flex-col">
        <StTypography as="h3" variant="highlight-medium">{{ props.title }}</StTypography>
        <StTypography variant="body-small" class-name="text-st-content-ghost">
          {{ props.description }}
        </StTypography>
      </div>
    </header>

    <div class="flex flex-col gap-st-3">
      <slot />
    </div>
  </StPaper>
</template>
