<script setup lang="ts">
import { useThemeService } from '~/services/themeService'

/**
 * O `data-theme` do `<html>` é o que liga os tokens do st-core-ui ao tema
 * escolhido. Ele é escrito aqui (para o HTML pré-renderizado já sair correto) e
 * atualizado em runtime pelo `themeService`.
 */
const { theme } = useThemeService()

useHead({
  htmlAttrs: {
    lang: 'pt-BR',
    'data-theme': theme
  },
  title: 'Playground · st-core-ui',
  meta: [
    {
      name: 'description',
      content:
        'Ambiente de protótipos da StartBet construído com o design system st-core-ui (Nuxt 4 + Vue 3 + Tailwind).'
    }
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
