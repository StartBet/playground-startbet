import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Caminho absoluto: o `dir` do publicAssets é resolvido a partir do srcDir
// (`app/`), então um caminho relativo apontaria para `app/node_modules/...`.
// O Nitro ignora diretório inexistente em silêncio — nada seria copiado.
const stCoreUiFontsDir = fileURLToPath(
  new URL('./node_modules/@startbet/st-core-ui/src/assets/fonts', import.meta.url)
)

// A versão exibida na UI sai do package.json para não haver número duplicado
// no código quando a lib for atualizada.
const packageJson = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8')
) as { dependencies: Record<string, string> }

const stCoreUiVersion = packageJson.dependencies['@startbet/st-core-ui'].replace(/^[^\d]*/, '')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],

  typescript: {
    strict: true,
    typeCheck: false
  },

  // O módulo do Tailwind injeta este arquivo. Apontar o `cssPath` para ele (em
  // vez de listar em `css`) evita que o Tailwind seja emitido duas vezes.
  tailwindcss: {
    cssPath: '@/assets/css/main.css'
  },

  runtimeConfig: {
    public: {
      stCoreUiVersion,
      storybookUrl: 'https://startbet.github.io/st-core-ui/'
    }
  },

  features: {
    inlineStyles: false
  },

  nitro: {
    // O CSS do @startbet/st-core-ui referencia as fontes em ../assets/fonts/...
    // e o Vite não reescreve essa URL, então o navegador pede /assets/fonts/...
    // O pacote publica os arquivos, mas quem precisa servi-los é a aplicação —
    // sem isto as fontes dão 404 e o site cai em fontes do sistema.
    // Atenção: em `nuxt dev` o Vite intercepta /assets/* e as fontes continuam
    // dando 404; o efeito só aparece no build (`nuxt generate`).
    publicAssets: [
      {
        dir: stCoreUiFontsDir,
        baseURL: '/assets/fonts',
        maxAge: 60 * 60 * 24 * 365
      }
    ],

    prerender: {
      // sem isso, um erro de pré-renderização apenas gera aviso e o build
      // publica o site sem a página que falhou
      failOnError: true
    }
  }
})
