<script setup lang="ts">
import {
  StBadge,
  StButton,
  StCarousel,
  StGrid,
  StIcon,
  StPaper,
  StProgressBar,
  StTypography
} from '@startbet/st-core-ui'

const beneficios = ['Torneios públicos', 'Minigames', 'Cashback até 20%']

const desafios = [
  { titulo: 'Confirme seu e-mail', descricao: '+500 xp e 5 giros no Aviator', percent: 25 },
  { titulo: 'Complete seu perfil', descricao: '+300 xp e 3 giros no Aviator', percent: 40 },
  { titulo: 'Faça sua primeira aposta', descricao: '+700 xp e 10 giros no Aviator', percent: 60 },
  { titulo: 'Jogue em um torneio', descricao: '+1.000 xp e 20 giros no Aviator', percent: 15 },
  { titulo: 'Explore os minigames', descricao: '+400 xp e 5 giros no Aviator', percent: 35 },
  { titulo: 'Aposte em um jogo ao vivo', descricao: '+600 xp e 8 giros no Aviator', percent: 20 },
  { titulo: 'Acerte três palpites', descricao: '+800 xp e 12 giros no Aviator', percent: 50 },
  { titulo: 'Volte amanhã', descricao: '+200 xp e 2 giros no Aviator', percent: 75 }
]

const paginasDeDesafios = [desafios.slice(0, 4), desafios.slice(4)]

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

    <StPaper
      variant="surface-0"
      border="1"
      border-radius="2"
      :elevation="2"
      padding="3"
      padding-md="4"
      class-name="flex flex-col gap-st-3"
    >
      <div class="flex flex-col gap-st-1">
        <StTypography as="h2" variant="heading-3">Desafios disponíveis</StTypography>
        <StTypography variant="body-medium" class-name="text-st-content-ghost">
          Complete os desafios e avance ainda mais na sua jornada.
        </StTypography>
      </div>

      <StCarousel :slide-per-page="1" :gap="3" arrows="outside" bullets="outside" auto-height>
        <div v-for="(pagina, indice) in paginasDeDesafios" :key="indice" class="w-full">
          <StGrid :cols="1" :md-cols="2" :gap="2">
            <StPaper
              v-for="desafio in pagina"
              :key="desafio.titulo"
              variant="surface-1"
              border="1"
              border-radius="1"
              :elevation="0"
              padding="2"
              class-name="flex min-h-st-24 flex-col gap-st-2"
            >
              <div class="flex items-center gap-st-2">
                <span
                  class="flex h-st-6 w-st-6 shrink-0 items-center justify-center rounded-st-1 bg-st-surface-primary text-st-content-primary"
                >
                  <StIcon name="check" :size="3" aria-label="Desafio" />
                </span>
                <div class="flex min-w-0 flex-1 flex-col">
                  <StTypography variant="highlight-medium" class-name="truncate">
                    {{ desafio.titulo }}
                  </StTypography>
                  <StTypography variant="body-small" class-name="text-st-content-ghost">
                    {{ desafio.descricao }}
                  </StTypography>
                </div>
              </div>

              <StProgressBar
                :percent="desafio.percent"
                :text="`${desafio.percent}%`"
                variant="positive"
                size="small"
              />

              <StButton variant="outline" size="small" class-name="self-start">
                Verificar agora
              </StButton>
            </StPaper>
          </StGrid>
        </div>
      </StCarousel>
    </StPaper>
  </div>
</template>
