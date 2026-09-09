<script setup lang="ts">
import { StButton, StPaper, StTypography } from '@startbet/st-core-ui'
import ThemeSwitch from '~/components/theme-switch/ThemeSwitch.vue'

const { stCoreUiVersion, storybookUrl } = useRuntimeConfig().public
</script>

<template>
  <div class="flex min-h-screen flex-col bg-st-surface-1">
    <div class="fixed right-st-2 top-st-2 z-50">
      <StPaper variant="surface-0" border="1" :elevation="2" padding="1 2">
        <ThemeSwitch />
      </StPaper>
    </div>

    <main class="flex-1">
      <slot />
    </main>

    <footer role="contentinfo" class="border-t border-st-border-1 py-st-3">
      <div class="st-container flex flex-wrap items-center justify-between gap-st-2">
        <StTypography variant="body-small" class-name="text-st-content-ghost">
          Playground · @startbet/st-core-ui v{{ stCoreUiVersion }}
        </StTypography>

        <a :href="storybookUrl" target="_blank" rel="noopener noreferrer">
          <StButton variant="text" size="small" icon-right="up-right-from-square">
            Storybook
          </StButton>
        </a>
      </div>
    </footer>
  </div>
</template>
