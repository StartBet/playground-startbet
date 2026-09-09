<script setup lang="ts">
import { ref } from 'vue'
import { StButton, StButtonGroup } from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'

defineOptions({ name: 'ShowcaseButtons' })

const selectedGroup = ref<string | string[]>('esportes')
</script>

<template>
  <ShowcaseCard
    icon="hand-pointer"
    title="StButton / StButtonGroup"
    description="Três variantes, quatro cores e três tamanhos."
  >
    <div class="flex flex-wrap items-center gap-st-2">
      <StButton variant="solid">solid</StButton>
      <StButton variant="outline">outline</StButton>
      <StButton variant="text">text</StButton>
    </div>

    <div class="flex flex-wrap items-center gap-st-2">
      <StButton color="secondary" size="small">secondary</StButton>
      <StButton color="positive" size="small" icon-left="check">positive</StButton>
      <StButton color="negative" size="small" variant="outline">negative</StButton>
      <StButton size="small" disabled>disabled</StButton>
    </div>

    <StButtonGroup v-model:value="selectedGroup" size="small">
      <StButton value="esportes">Esportes</StButton>
      <StButton value="cassino">Cassino</StButton>
      <StButton value="live">Live</StButton>
    </StButtonGroup>
  </ShowcaseCard>
</template>
