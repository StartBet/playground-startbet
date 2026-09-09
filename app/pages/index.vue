<script setup lang="ts">
import { StGrid, StTypography } from '@startbet/st-core-ui'
import HomeDocs from '~/components/home/HomeDocs.vue'
import HomeHero from '~/components/home/HomeHero.vue'
import ShowcaseButtons from '~/components/showcase/ShowcaseButtons.vue'
import ShowcaseFeedback from '~/components/showcase/ShowcaseFeedback.vue'
import ShowcaseForm from '~/components/showcase/ShowcaseForm.vue'
import ShowcaseOverlays from '~/components/showcase/ShowcaseOverlays.vue'
import ShowcaseSurfaces from '~/components/showcase/ShowcaseSurfaces.vue'
import ShowcaseTypography from '~/components/showcase/ShowcaseTypography.vue'
</script>

<template>
  <div>
    <HomeHero />

    <section id="componentes" class="st-container flex flex-col gap-st-3 pb-st-10">
      <div class="flex flex-col">
        <StTypography as="h2" variant="heading-3">Componentes</StTypography>
        <StTypography variant="body-medium" class-name="text-st-content-ghost">
          Uma amostra do que já vem pronto. A lista completa fica no Storybook e em
          <code>docs/componentes.md</code>.
        </StTypography>
      </div>

      <StGrid :cols="1" :md-cols="2" :lg-cols="3" :gap="3">
        <ShowcaseTypography />
        <ShowcaseButtons />
        <ShowcaseForm />
        <ShowcaseFeedback />
        <ShowcaseOverlays />
        <ShowcaseSurfaces />
      </StGrid>
    </section>

    <HomeDocs />
  </div>
</template>
