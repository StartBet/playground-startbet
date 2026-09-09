import type { Config } from 'tailwindcss'
import { stTailwindPlugins, stTailwindTheme } from '@startbet/st-core-ui'

/**
 * Cenário "projeto com Tailwind próprio" do st-core-ui: o tema da biblioteca
 * entra em `theme.extend` e os plugins dela são somados aos locais.
 *
 * Não adicione paletas próprias aqui. Tudo que um protótipo precisa de cor,
 * espaçamento, raio e sombra já existe como token `st-*` — ver docs/tokens.md.
 */
export default <Partial<Config>>{
  content: [
    './app/**/*.{js,ts,vue}',
    './nuxt.config.{js,ts}',
    './node_modules/@startbet/st-core-ui/dist/**/*.{js,ts,vue}'
  ],

  /**
   * Props como `padding`, `margin`, `gap` e `cols` (StPaper, StGrid, StModal)
   * são convertidas em classes por concatenação em runtime dentro da lib, então
   * o scanner do Tailwind não consegue enxergá-las no `dist`. Sem o safelist,
   * `padding="3"` simplesmente não gera CSS.
   */
  safelist: [
    { pattern: /^grid-cols-(1[0-2]|[1-9])$/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^gap(-x|-y)?-st-/ },
    { pattern: /^p[trblxy]?-st-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^m[trblxy]?-st-/, variants: ['sm', 'md', 'lg'] },
    { pattern: /^m[xy]?-auto$/, variants: ['sm', 'md', 'lg'] }
  ],

  theme: {
    extend: {
      ...stTailwindTheme
    }
  },

  plugins: [...stTailwindPlugins]
}
