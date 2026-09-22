<script setup lang="ts">
import {
  StBadge,
  StButton,
  StGrid,
  StIcon,
  StPaper,
  StProgressBar,
  StTypography
} from '@startbet/st-core-ui'

const beneficios = ['Torneios públicos', 'Minigames', 'Cashback até 20%']

defineOptions({ name: 'GamificacaoPage' })

useHead({ title: 'Gamificação · Playground' })
</script>

<template>
  <div class="st-container flex flex-col gap-st-4 py-st-6 md:py-st-10">
    <header class="flex flex-col gap-st-1">
      <StTypography as="h1" variant="heading-2">Gamificação</StTypography>
      <StTypography variant="body-medium" class-name="text-st-content-ghost">
        Acompanhe seu nível e desbloqueie novas experiências.
      </StTypography>
    </header>

    <StPaper
      variant="surface-0"
      border="1"
      border-radius="2"
      :elevation="2"
      padding="3"
      padding-md="4"
      class-name="w-full"
    >
      <StGrid :cols="1" :md-cols="2" :gap="4" class-name="items-center">
        <div class="flex flex-col items-center gap-st-3 text-center md:pr-st-4">
          <StPaper
            variant="surface-primary"
            border="1"
            border-radius="2"
            :elevation="1"
            padding="3"
            class-name="flex h-st-12 w-st-12 items-center justify-center"
          >
            <StIcon name="trophy" :size="6" aria-label="Troféu" />
          </StPaper>

          <div class="flex flex-col gap-st-1">
            <StTypography as="h2" variant="heading-3">Iniciante</StTypography>
            <div class="flex items-center justify-center gap-st-1">
              <StTypography variant="highlight-medium">1.237</StTypography>
              <StTypography variant="body-small" class-name="text-st-content-ghost">
                pontos
              </StTypography>
            </div>
          </div>

          <div class="flex w-full max-w-st-40 flex-col gap-st-1">
            <StProgressBar :percent="10" text="10%" variant="positive" />
            <div class="flex justify-between gap-st-2">
              <StTypography variant="body-small" class-name="text-st-content-ghost">
                Nível 1 · 1–10
              </StTypography>
              <StTypography variant="body-small" class-name="text-st-content-ghost">
                2.099 XP
              </StTypography>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-st-3 border-t border-st-border-1 pt-st-4 md:border-l md:border-t-0 md:pl-st-4 md:pt-0"
        >
          <StTypography as="h3" variant="highlight-medium">Benefícios do seu nível</StTypography>

          <div class="flex flex-col gap-st-2">
            <div
              v-for="beneficio in beneficios"
              :key="beneficio"
              class="flex items-center gap-st-2"
            >
              <span
                class="flex h-st-4 w-st-4 shrink-0 items-center justify-center rounded-st-1 bg-st-surface-positive text-st-content-positive"
              >
                <StIcon name="check" :size="2" aria-label="Disponível" />
              </span>
              <StTypography variant="body-medium" class-name="flex-1">{{ beneficio }}</StTypography>
              <StBadge variant="info" value="Novo" size="small" />
            </div>
          </div>

          <StButton
            variant="solid"
            color="positive"
            icon-right="chevron-right"
            class-name="self-start"
          >
            Ver tudo
          </StButton>
        </div>
      </StGrid>
    </StPaper>
  </div>
</template>
