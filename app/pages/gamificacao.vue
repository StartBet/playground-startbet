<script setup lang="ts">
import {
  StAvatar,
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
  {
    status: 'Iniciante',
    objetivo: 'Confirme seu e-mail',
    recompensa: '+500 xp e 5 giros no Aviator',
    percent: 25
  },
  {
    status: 'Iniciante',
    objetivo: 'Complete seu perfil',
    recompensa: '+300 xp e 3 giros no Aviator',
    percent: 40
  },
  {
    status: 'Iniciante',
    objetivo: 'Faça sua primeira aposta',
    recompensa: '+700 xp e 10 giros no Aviator',
    percent: 60
  },
  {
    status: 'Iniciante',
    objetivo: 'Jogue em um torneio',
    recompensa: '+1.000 xp e 20 giros no Aviator',
    percent: 15
  },
  {
    status: 'Iniciante',
    objetivo: 'Explore os minigames',
    recompensa: '+400 xp e 5 giros no Aviator',
    percent: 35
  },
  {
    status: 'Iniciante',
    objetivo: 'Aposte em um jogo ao vivo',
    recompensa: '+600 xp e 8 giros no Aviator',
    percent: 20
  },
  {
    status: 'Iniciante',
    objetivo: 'Acerte três palpites',
    recompensa: '+800 xp e 12 giros no Aviator',
    percent: 50
  },
  {
    status: 'Iniciante',
    objetivo: 'Volte amanhã',
    recompensa: '+200 xp e 2 giros no Aviator',
    percent: 75
  }
]

const paginasDeDesafios = [desafios.slice(0, 4), desafios.slice(4)]

const niveis = [
  {
    nome: 'Intermediário',
    percent: 12,
    faixa: 'Nível 11 · 11–20',
    beneficios: ['Torneio exclusivo', 'Minigame diário', 'Cashback até 20%']
  },
  {
    nome: 'Profissional',
    percent: 22,
    faixa: 'Nível 21 · 21–30',
    beneficios: ['Torneio exclusivo', '2 minigames diário', 'Giros extras']
  },
  {
    nome: 'Expert',
    percent: 32,
    faixa: 'Nível 31 · 31–40',
    beneficios: ['Cashback 1%', 'Prêmio diário', 'Girasorte']
  }
]

const premiosProximoNivel = ['Cashback 3%', 'Bônus Jogador', 'Bônus Aniversário']

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

      <StCarousel :slide-per-page="1" :gap="2" arrows="none" bullets="outside" auto-height>
        <div v-for="(pagina, indice) in paginasDeDesafios" :key="indice" class="w-full">
          <StGrid :cols="1" :md-cols="2" :gap="2">
            <StPaper
              v-for="desafio in pagina"
              :key="desafio.objetivo"
              variant="surface-1"
              border="1"
              border-radius="1"
              :elevation="0"
              padding="1"
              class-name="flex flex-row items-center gap-st-1"
            >
              <span
                class="flex h-st-6 w-st-6 shrink-0 items-center justify-center rounded-st-1 bg-st-surface-primary text-st-content-primary"
              >
                <StIcon name="check" :size="3" aria-label="Desafio" />
              </span>

              <div class="flex min-w-0 flex-1 flex-col justify-center gap-st-1">
                <StTypography variant="body-medium">{{ desafio.status }}</StTypography>
                <StProgressBar
                  :percent="desafio.percent"
                  variant="positive"
                  size="small"
                  class-name="w-full"
                />
                <StTypography variant="body-small" class-name="text-st-content-default">
                  {{ desafio.objetivo }}
                </StTypography>
                <StTypography variant="body-small" class-name="text-st-content-ghost">
                  {{ desafio.recompensa }}
                </StTypography>
              </div>

              <StButton variant="ghost" size="small" class-name="shrink-0 self-center">
                Verificar agora
              </StButton>
            </StPaper>
          </StGrid>
        </div>
      </StCarousel>
    </StPaper>

    <StPaper
      variant="surface-0"
      border="1"
      border-radius="2"
      :elevation="2"
      padding="3"
      padding-md="4"
      class-name="flex flex-col gap-st-4"
    >
      <div class="flex flex-col gap-st-1">
        <StTypography as="h2" variant="heading-3">Níveis</StTypography>
        <StTypography variant="body-medium" class-name="text-st-content-ghost">
          Evolua sua jornada e desbloqueie benefícios exclusivos.
        </StTypography>
      </div>

      <StCarousel
        :slide-per-page="1"
        :md-slide-per-page="3"
        :gap="2"
        arrows="none"
        bullets="outside"
        auto-height
      >
        <StPaper
          v-for="nivel in niveis"
          :key="nivel.nome"
          variant="surface-1"
          border="1"
          border-radius="2"
          :elevation="0"
          padding="2"
          class-name="flex flex-col gap-st-2"
        >
          <div class="flex items-center gap-st-2">
            <StPaper
              variant="surface-primary"
              border="1"
              border-radius="1"
              :elevation="0"
              padding="1"
              class-name="flex h-st-8 w-st-8 shrink-0 items-center justify-center"
            >
              <StIcon name="trophy" :size="4" aria-label="Nível" />
            </StPaper>
            <div class="flex min-w-0 flex-1 flex-col">
              <StTypography variant="highlight-medium">{{ nivel.nome }}</StTypography>
              <div class="flex items-center gap-st-1">
                <StTypography variant="highlight-medium">1.237</StTypography>
                <StTypography variant="body-small" class-name="text-st-content-ghost">
                  | 2.099 xp
                </StTypography>
              </div>
            </div>
          </div>

          <StProgressBar :percent="nivel.percent" variant="positive" size="small" />
          <div class="flex justify-between gap-st-1">
            <StTypography variant="body-small" class-name="text-st-content-ghost">
              {{ nivel.faixa }}
            </StTypography>
            <StTypography variant="body-small" class-name="text-st-content-ghost">
              {{ nivel.percent }}%
            </StTypography>
          </div>

          <div class="flex flex-col gap-st-1">
            <div
              v-for="beneficio in nivel.beneficios"
              :key="beneficio"
              class="flex items-center gap-st-1"
            >
              <StIcon name="check" :size="2" aria-label="Benefício" />
              <StTypography variant="body-small" class-name="flex-1">{{ beneficio }}</StTypography>
              <StBadge variant="info" value="Novo" size="small" />
            </div>
          </div>

          <StButton color="positive" full-width icon-right="chevron-right">Ver tudo</StButton>
        </StPaper>
      </StCarousel>

      <div class="border-t border-st-border-1 pt-st-3">
        <StTypography variant="body-medium" class-name="text-st-content-ghost">
          Prêmios do próximo nível:
        </StTypography>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-st-2">
        <div class="flex items-center gap-st-2">
          <StAvatar name="Jogador" alt="Jogador" size="large" color="purple" />
          <div class="flex flex-col">
            <StTypography variant="highlight-medium">Jogador</StTypography>
            <StTypography variant="body-small" class-name="text-st-content-ghost">
              Nv. 21 | Nv. 30
            </StTypography>
          </div>
        </div>
        <StButton variant="ghost" size="small">Faltam 10 níveis</StButton>
      </div>

      <div class="flex flex-col gap-st-1">
        <StPaper
          v-for="premio in premiosProximoNivel"
          :key="premio"
          variant="surface-2"
          border="1"
          border-radius="1"
          :elevation="0"
          padding="1 2"
          class-name="flex items-center gap-st-2"
        >
          <StIcon name="check" :size="3" aria-label="Prêmio" />
          <StTypography variant="body-medium" class-name="flex-1">{{ premio }}</StTypography>
          <StIcon name="lock" :size="3" aria-label="Bloqueado" class-name="text-st-content-ghost" />
        </StPaper>
      </div>

      <StTypography variant="body-medium" align="center" class-name="text-st-content-ghost">
        Desbloqueie tudo no Nível 21.
      </StTypography>
    </StPaper>
  </div>
</template>
