# st-core-ui REFERÊNCIA CONSOLIDADA

> **Leia primeiro [`componentes.md`](componentes.md).** Este arquivo é um dump
> longo gerado a partir do código-fonte da lib na versão **0.30.0**; o projeto
> hoje usa a **0.32.0**. O que veio depois — `StCarousel`, `StBullets`,
> `StProgressBar`, o composable `useResponsiveValue` e os tipos
> `ResponsiveValue` / `StBreakpoint` — está documentado apenas em
> `componentes.md`. Use este arquivo para consulta pontual de detalhes internos
> (regras de classe, tabelas completas de token, código do tema Tailwind).

---

## 1. Como instalar e integrar

Baseado em: README.md raiz + src/tokens/README.md + src/css/README.md + GetStarted.stories.ts

### 1.1 Instalação

```bash
npm install @startbet/st-core-ui
```

### 1.2 Cenário 1: Projeto novo ou simples

Use esse fluxo quando o projeto consumidor ainda não possui uma configuração Tailwind própria relevante e você quer carregar rapidamente a base visual da biblioteca.

```ts
import { createApp } from 'vue'
import App from './App.vue'

import '@startbet/st-core-ui/style.css'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { StTypography } from '@startbet/st-core-ui'
</script>

<template>
  <StTypography as="h2" variant="heading-3"> Título da seção </StTypography>
</template>
```

### 1.3 Cenário 2: Projeto existente com Tailwind próprio

Use esse fluxo quando o projeto consumidor já controla o próprio `tailwind.config` e você não quer sobrescrever a configuração local.

Nesse caso:

- mantenha a configuração atual do projeto consumidor
- faça merge de `stTailwindTheme` em `theme.extend`
- adicione `stTailwindPlugins` junto com os plugins locais
- carregue `tokens.css` no CSS global principal do projeto
- não use `style.css` como entrada principal nesse cenário

Exemplo de merge em um `tailwind.config.js` existente:

```ts
import { stTailwindPlugins, stTailwindTheme } from '@startbet/st-core-ui'

export default {
  content: ['./app/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ...stTailwindTheme.colors
      },
      fontFamily: {
        ...stTailwindTheme.fontFamily
      },
      fontSize: {
        ...stTailwindTheme.fontSize
      },
      lineHeight: {
        ...stTailwindTheme.lineHeight
      },
      letterSpacing: {
        ...stTailwindTheme.letterSpacing
      },
      borderRadius: {
        ...stTailwindTheme.borderRadius
      },
      boxShadow: {
        ...stTailwindTheme.boxShadow
      },
      dropShadow: {
        ...stTailwindTheme.dropShadow
      },
      spacing: {
        ...stTailwindTheme.spacing
      },
      textShadow: {
        ...stTailwindTheme.textShadow
      },
      keyframes: {
        ...stTailwindTheme.keyframes
      },
      animation: {
        ...stTailwindTheme.animation
      }
    }
  },
  plugins: [...stTailwindPlugins]
}
```

Exemplo de import dos tokens no CSS global principal:

```css
@import '@startbet/st-core-ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 1.4 Integração mínima (projeto novo)

```ts
import type { Config } from 'tailwindcss'

import { stTailwindPlugins, stTailwindTheme } from '@startbet/st-core-ui'

export default {
  content: ['./src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: stTailwindTheme
  },
  plugins: stTailwindPlugins
} satisfies Config
```

### 1.5 Fontes

Use quando quiser disponibilizar apenas a família Base Neue:

```ts
import '@startbet/st-core-ui/base-neue.css'
```

Ou a família Montserrat:

```ts
import '@startbet/st-core-ui/montserrat.css'
```

### 1.6 Exports públicos do pacote CSS

- `@startbet/st-core-ui/style.css` — entrada principal com Tailwind + tokens
- `@startbet/st-core-ui/tokens.css` — variáveis CSS de cores, superfícies, estados e tema dark
- `@startbet/st-core-ui/base-neue.css` — declarações de `@font-face` da família Base Neue
- `@startbet/st-core-ui/montserrat.css` — declarações de `@font-face` da família Montserrat

### 1.7 Scripts do projeto

```bash
npm run storybook
npm run build-storybook
npm run lint
npm run test:run
npm run test:coverage
npm run build
```

### 1.8 Release com Semantic Release

Branches configuradas:

- `main`: release de produção
- `develop`: prerelease beta

Formato de commits válidos:

```bash
feat(button): adicionar nova variante
fix(tokens): corrigir token de hover
refactor(theme): reorganizar tema tailwind
```

---

## 2. TAILWIND THEME REAL

Arquivo: `src/tokens/tailwind-theme.ts` — CÓDIGO INTEIRO

```ts
const cssVar = (token: string) => `var(${token})`

type TailwindPluginApi = {
  addUtilities: (utilities: Record<string, Record<string, string>>[]) => void
  theme: (path: string) => unknown
}

type ScaleValue = 0 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

const toneScaleValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
const neutralScaleValues = [0, ...toneScaleValues] as const

const sizeScale = {
  'st-xs': '0.75rem',
  'st-sm': '0.875rem',
  'st-base': '1rem',
  'st-md': '1.125rem',
  'st-lg': '1.25rem',
  'st-xl': '1.5rem',
  'st-2xl': '1.875rem',
  'st-3xl': '2.25rem',
  'st-4xl': '3rem',
  'st-5xl': '3.75rem',
  'st-6xl': '4.5rem',
  'st-7xl': '5rem'
} as const

const spacingScale = {
  ...sizeScale,
  'st-1': '8px',
  'st-2': '16px',
  'st-3': '24px',
  'st-4': '32px',
  'st-5': '40px',
  'st-6': '48px',
  'st-7': '56px',
  'st-8': '64px',
  'st-9': '72px',
  'st-10': '80px',
  'st-11': '88px',
  'st-12': '96px',
  'st-15': '120px',
  'st-16': '128px',
  'st-20': '160px',
  'st-24': '192px',
  'st-30': '240px',
  'st-32': '256px',
  'st-40': '320px',
  'st-48': '384px',
  'st-56': '448px',
  'st-64': '512px',
  'st-72': '584px',
  'st-80': '640px',
  'st-96': '768px',
  'st-128': '1024px',
  'st-144': '1152px',
  'st-160': '1280px',
  'st-168': '1344px',
  'st-240': '1920px'
} as const

const colorScalePrefixes = {
  'brand-primary': 'brand-primary',
  'brand-secondary': 'brand-secondary',
  info: 'info-color',
  system: 'system-color',
  positive: 'positive-color',
  attention: 'attention-color',
  negative: 'negative-color',
  blue: 'blue-color',
  ocean: 'ocean-color',
  green: 'green-color',
  yellow: 'yellow-color',
  orange: 'orange-color',
  red: 'red-color',
  pink: 'pink-color',
  purple: 'purple-color'
} as const

const tokenObject = <const T extends Record<string, string>>(
  tokens: T
): { [K in keyof T]: string } =>
  Object.fromEntries(Object.entries(tokens).map(([key, token]) => [key, cssVar(token)])) as {
    [K in keyof T]: string
  }

const scale = <const T extends readonly ScaleValue[]>(
  prefix: string,
  values: T
): { [K in T[number]]: string } =>
  Object.fromEntries(values.map((value) => [value, cssVar(`--st-${prefix}-${value}`)])) as {
    [K in T[number]]: string
  }

const createScaleGroup = <
  const TPrefixes extends Record<string, string>,
  const TValues extends readonly ScaleValue[] = typeof toneScaleValues
>(
  prefixes: TPrefixes,
  values?: TValues
): { [K in keyof TPrefixes]: { [V in TValues[number]]: string } } => {
  const resolvedValues = (values ?? toneScaleValues) as TValues

  return Object.fromEntries(
    Object.entries(prefixes).map(([key, prefix]) => [key, scale(prefix, resolvedValues)])
  ) as { [K in keyof TPrefixes]: { [V in TValues[number]]: string } }
}

const textStyle = (fontSize: string, lineHeight: string, fontWeight: string, letterSpacing = '0') =>
  [fontSize, { lineHeight, letterSpacing, fontWeight }] as const

const createTextShadowUtilities = (shadows?: Record<string, string>) =>
  Object.entries(shadows ?? {}).map(([key, value]) => ({
    [`.text-shadow-${key}`]: {
      textShadow: value
    }
  }))

export const stTailwindTheme = {
  colors: {
    ...tokenObject({
      'st-brand': '--st-color-brand',
      'st-primary': '--st-color-primary',
      'st-secondary': '--st-color-secondary',
      'st-info': '--st-color-info',
      'st-system': '--st-color-system',
      'st-warning': '--st-color-warning',
      'st-positive': '--st-color-positive',
      'st-negative': '--st-color-negative'
    }),
    'st-surface': {
      ...tokenObject({
        0: '--st-color-surface-0',
        1: '--st-color-surface-1',
        2: '--st-color-surface-2',
        3: '--st-color-surface-3',
        4: '--st-color-surface-4',
        primary: '--st-color-surface-primary',
        secondary: '--st-color-surface-secondary',
        info: '--st-color-surface-info',
        system: '--st-color-surface-system',
        warning: '--st-color-surface-warning',
        positive: '--st-color-surface-positive',
        negative: '--st-color-surface-negative'
      }),
      shadow: tokenObject({
        0: '--st-color-surface-shadow-0',
        1: '--st-color-surface-shadow-1',
        2: '--st-color-surface-shadow-2',
        3: '--st-color-surface-shadow-3'
      })
    },
    'st-content': tokenObject({
      default: '--st-color-content-default',
      disable: '--st-color-content-disable',
      ghost: '--st-color-content-ghost',
      bright: '--st-color-content-bright',
      din: '--st-color-content-din',
      primary: '--st-color-content-primary',
      secondary: '--st-color-content-secondary',
      info: '--st-color-content-info',
      system: '--st-color-content-system',
      warning: '--st-color-content-warning',
      positive: '--st-color-content-positive',
      negative: '--st-color-content-negative'
    }),
    'st-border': tokenObject({
      1: '--st-color-border-1',
      2: '--st-color-border-2',
      3: '--st-color-border-3'
    }),
    ...tokenObject({
      'st-focus': '--st-color-focus',
      'st-pressed': '--st-color-pressed',
      'st-hover': '--st-color-hover'
    }),
    st: {
      ...createScaleGroup(colorScalePrefixes),
      neutral: {
        ...scale('neutral-color', neutralScaleValues),
        0: cssVar('--st-neutral-color-0')
      },
      ...createScaleGroup({
        'shadow-scale': 'shadow-scale',
        'light-scale': 'light-scale'
      })
    }
  },
  fontFamily: {
    'st-heading': ['"Base Neue Condensed"', 'sans-serif'],
    'st-highlight': ['"Base Neue Condensed"', 'sans-serif'],
    'st-body': ['Montserrat', 'sans-serif']
  },
  fontSize: {
    ...sizeScale,
    'st-heading-1': textStyle('3rem', '1.1', '800'),
    'st-heading-2': textStyle('2.25rem', '1.1', '800'),
    'st-heading-3': textStyle('1.875rem', '1.25', '800'),
    'st-heading-4': textStyle('1.5rem', '1.25', '800'),
    'st-highlight-large': textStyle('1.5rem', '1.5', '600'),
    'st-highlight-medium': textStyle('1.125rem', '1.5', '600'),
    'st-body-large': textStyle('1.125rem', '1.75', '400'),
    'st-body-medium': textStyle('1rem', '1.75', '400'),
    'st-body-small': textStyle('0.875rem', '1.5', '400'),
    'st-hero-title': textStyle('3rem', '1.5', '800')
  },
  lineHeight: {
    'st-tight': '1.1',
    'st-snug': '1.25',
    'st-normal': '1.5',
    'st-relaxed': '1.75',
    'st-loose': '2'
  },
  letterSpacing: {
    'st-tight': '-0.025em',
    'st-normal': '0',
    'st-wide': '0.025em',
    'st-wider': '0.05em'
  },
  borderRadius: {
    'st-1': '8px',
    'st-2': '16px'
  },
  boxShadow: {
    'st-paper-0': '0 0 0 0 transparent',
    'st-paper-1': '0 1px 3px 0 var(--st-color-shadow-0), 0 1px 2px 0 var(--st-color-shadow-1)',
    'st-paper-2':
      '0 4px 6px -1px var(--st-color-shadow-0), 0 2px 4px -1px var(--st-color-shadow-1)',
    'st-paper-3':
      '0 10px 15px -3px var(--st-color-shadow-0), 0 4px 6px -2px var(--st-color-shadow-1)',
    'st-paper-4':
      '0 20px 25px -5px var(--st-color-shadow-0), 0 10px 10px -5px var(--st-color-shadow-1)',
    'st-action-hover': '0 0 16px 2px var(--st-color-shadow-hover)',
    'st-action-pressed': '0 0 16px 4px var(--st-color-shadow-pressed)'
  },
  dropShadow: {
    'st-action-hover': [
      '0 0 8px var(--st-color-shadow-hover)',
      '0 0 16px var(--st-color-shadow-hover)'
    ],
    'st-action-pressed': [
      '0 0 16px var(--st-color-shadow-pressed)',
      '0 0 24px var(--st-color-shadow-pressed)'
    ]
  },
  spacing: spacingScale,
  textShadow: {
    'st-small': '-1px 1px transparent, -2px 2px var(--st-shadow-scale-950)',
    'st-medium': '-1px 1px transparent, -3px 3px var(--st-shadow-scale-950)',
    'st-large': '-2px 2px transparent, -4px 4px var(--st-shadow-scale-950)',
    'st-action-hover': '0 0 16px var(--st-color-shadow-hover)',
    'st-action-pressed': '0 0 16px var(--st-color-shadow-pressed)'
  },
  keyframes: {
    'st-loading-arrow': {
      '0%': { transform: 'translateX(-200%)' },
      '33%': { transform: 'translateX(0%)' },
      '66%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(200%)' }
    },
    'st-s10-1': {
      '0%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,50% 0%,50% 0%,50% 0%,50% 0%)'
      },
      '12.5%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 0%,100% 0%,100% 0%)'
      },
      '25%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 100%,100% 100%,100% 100%)'
      },
      '50%': {
        clipPath: 'polygon(50% 50%,0 0,50% 0%,100% 0%,100% 100%,50% 100%,0% 100%)'
      },
      '62.5%': {
        clipPath: 'polygon(50% 50%,100% 0,100% 0%,100% 0%,100% 100%,50% 100%,0% 100%)'
      },
      '75%': {
        clipPath: 'polygon(50% 50%,100% 100%,100% 100%,100% 100%,100% 100%,50% 100%,0% 100%)'
      },
      '100%': {
        clipPath: 'polygon(50% 50%,50% 100%,50% 100%,50% 100%,50% 100%,50% 100%,0% 100%)'
      }
    },
    'st-s10-2': {
      '0%': { transform: 'scaleY(1) rotate(0deg)' },
      '49.9%': { transform: 'scaleY(1) rotate(135deg)' },
      '50%': { transform: 'scaleY(-1) rotate(0deg)' },
      '100%': { transform: 'scaleY(-1) rotate(-135deg)' }
    }
  },
  animation: {
    'st-loading-arrow': 'st-loading-arrow 1.5s ease-in-out infinite',
    'st-spinner-infinite': 'st-s10-1 0.8s infinite linear alternate, st-s10-2 1.6s linear infinite'
  }
} as const

export const stTailwindPlugins = [
  function ({ addUtilities, theme }: TailwindPluginApi) {
    addUtilities(
      createTextShadowUtilities(theme('textShadow') as Record<string, string> | undefined)
    )
  }
]

export const stCssTokenImport = '@startbet/st-core-ui/tokens.css'
```

---

## 3. TABELA DE TOKENS CSS

Extraída de `src/css/tokens.css` — valores reais de light (tema padrão `:root`) e dark (`:root[data-theme='dark']`).

### 3.1 Escalas base de cores

| Variável                   | Valor (Light) | Valor (Dark) |
| -------------------------- | ------------- | ------------ |
| `--st-brand-primary-100`   | `#efebfc`     | (mesma base) |
| `--st-brand-primary-200`   | `#e0d9fb`     | (mesma base) |
| `--st-brand-primary-300`   | `#d7cff8`     | (mesma base) |
| `--st-brand-primary-400`   | `#ad8fff`     | (mesma base) |
| `--st-brand-primary-500`   | `#6c3cad`     | (mesma base) |
| `--st-brand-primary-600`   | `#622daa`     | (mesma base) |
| `--st-brand-primary-700`   | `#3f136d`     | (mesma base) |
| `--st-brand-primary-800`   | `#2f1557`     | (mesma base) |
| `--st-brand-primary-900`   | `#270644`     | (mesma base) |
| `--st-brand-primary-950`   | `#1d0533`     | (mesma base) |
| `--st-brand-secondary-100` | `#e5facd`     | (mesma base) |
| `--st-brand-secondary-200` | `#cdf6a0`     | (mesma base) |
| `--st-brand-secondary-300` | `#acee68`     | (mesma base) |
| `--st-brand-secondary-400` | `#80dd24`     | (mesma base) |
| `--st-brand-secondary-500` | `#6ec61c`     | (mesma base) |
| `--st-brand-secondary-600` | `#5aa816`     | (mesma base) |
| `--st-brand-secondary-700` | `#3f7d10`     | (mesma base) |
| `--st-brand-secondary-800` | `#2e5c0c`     | (mesma base) |
| `--st-brand-secondary-900` | `#1f3d08`     | (mesma base) |
| `--st-brand-secondary-950` | `#142705`     | (mesma base) |
| `--st-neutral-color-0`     | `#ffffff`     | (mesma base) |
| `--st-neutral-color-100`   | `#f5f5f5`     | (mesma base) |
| `--st-neutral-color-200`   | `#e5e5e5`     | (mesma base) |
| `--st-neutral-color-300`   | `#d4d4d4`     | (mesma base) |
| `--st-neutral-color-400`   | `#a3a3a3`     | (mesma base) |
| `--st-neutral-color-500`   | `#737373`     | (mesma base) |
| `--st-neutral-color-600`   | `#525252`     | (mesma base) |
| `--st-neutral-color-700`   | `#404040`     | (mesma base) |
| `--st-neutral-color-800`   | `#262626`     | (mesma base) |
| `--st-neutral-color-900`   | `#171717`     | (mesma base) |
| `--st-neutral-color-950`   | `#0a0a0a`     | (mesma base) |
| `--st-info-color-100`      | `#cffafe`     | (mesma base) |
| `--st-info-color-200`      | `#a5f3fc`     | (mesma base) |
| `--st-info-color-300`      | `#67e8f9`     | (mesma base) |
| `--st-info-color-400`      | `#22d3ee`     | (mesma base) |
| `--st-info-color-500`      | `#06b6d4`     | (mesma base) |
| `--st-info-color-600`      | `#0891b2`     | (mesma base) |
| `--st-info-color-700`      | `#0e7490`     | (mesma base) |
| `--st-info-color-800`      | `#155e75`     | (mesma base) |
| `--st-info-color-900`      | `#164e63`     | (mesma base) |
| `--st-info-color-950`      | `#083344`     | (mesma base) |
| `--st-system-color-100`    | `#eaf0f1`     | (mesma base) |
| `--st-system-color-200`    | `#cbdadc`     | (mesma base) |
| `--st-system-color-300`    | `#a1bdc0`     | (mesma base) |
| `--st-system-color-400`    | `#789fa3`     | (mesma base) |
| `--st-system-color-500`    | `#54868b`     | (mesma base) |
| `--st-system-color-600`    | `#2f6c72`     | (mesma base) |
| `--st-system-color-700`    | `#29575c`     | (mesma base) |
| `--st-system-color-800`    | `#24474b`     | (mesma base) |
| `--st-system-color-900`    | `#223c3f`     | (mesma base) |
| `--st-system-color-950`    | `#11262a`     | (mesma base) |
| `--st-positive-color-100`  | `#a7f3cb`     | (mesma base) |
| `--st-positive-color-200`  | `#6de8b0`     | (mesma base) |
| `--st-positive-color-300`  | `#3fdd94`     | (mesma base) |
| `--st-positive-color-400`  | `#1fcc77`     | (mesma base) |
| `--st-positive-color-500`  | `#0cab58`     | (mesma base) |
| `--st-positive-color-600`  | `#0a8a49`     | (mesma base) |
| `--st-positive-color-700`  | `#086a39`     | (mesma base) |
| `--st-positive-color-800`  | `#064f2b`     | (mesma base) |
| `--st-positive-color-900`  | `#04351d`     | (mesma base) |
| `--st-positive-color-950`  | `#022113`     | (mesma base) |
| `--st-attention-color-100` | `#fff6bf`     | (mesma base) |
| `--st-attention-color-200` | `#ffea73`     | (mesma base) |
| `--st-attention-color-300` | `#ffda30`     | (mesma base) |
| `--st-attention-color-400` | `#fea900`     | (mesma base) |
| `--st-attention-color-500` | `#df7000`     | (mesma base) |
| `--st-attention-color-600` | `#b65600`     | (mesma base) |
| `--st-attention-color-700` | `#8a4100`     | (mesma base) |
| `--st-attention-color-800` | `#6a3000`     | (mesma base) |
| `--st-attention-color-900` | `#4a2100`     | (mesma base) |
| `--st-attention-color-950` | `#2f1500`     | (mesma base) |
| `--st-negative-color-100`  | `#ffcbc9`     | (mesma base) |
| `--st-negative-color-200`  | `#ff9e9b`     | (mesma base) |
| `--st-negative-color-300`  | `#ff7f7a`     | (mesma base) |
| `--st-negative-color-400`  | `#fa746f`     | (mesma base) |
| `--st-negative-color-500`  | `#f1433c`     | (mesma base) |
| `--st-negative-color-600`  | `#d53630`     | (mesma base) |
| `--st-negative-color-700`  | `#ab2b26`     | (mesma base) |
| `--st-negative-color-800`  | `#82201c`     | (mesma base) |
| `--st-negative-color-900`  | `#5a1613`     | (mesma base) |
| `--st-negative-color-950`  | `#3a0e0c`     | (mesma base) |

### 3.2 Escalas de sombra e transparência

| Variável                | Valor (Light)               | Valor (Dark) |
| ----------------------- | --------------------------- | ------------ |
| `--st-shadow-scale-100` | `rgba(30, 5, 52, 0.04)`     | (mesma base) |
| `--st-shadow-scale-200` | `rgba(30, 5, 52, 0.08)`     | (mesma base) |
| `--st-shadow-scale-300` | `rgba(30, 5, 52, 0.16)`     | (mesma base) |
| `--st-shadow-scale-400` | `rgba(30, 5, 52, 0.24)`     | (mesma base) |
| `--st-shadow-scale-500` | `rgba(30, 5, 52, 0.32)`     | (mesma base) |
| `--st-shadow-scale-600` | `rgba(30, 5, 52, 0.4)`      | (mesma base) |
| `--st-shadow-scale-700` | `rgba(30, 5, 52, 0.48)`     | (mesma base) |
| `--st-shadow-scale-800` | `rgba(30, 5, 52, 0.56)`     | (mesma base) |
| `--st-shadow-scale-900` | `rgba(30, 5, 52, 0.64)`     | (mesma base) |
| `--st-shadow-scale-950` | `rgba(30, 5, 52, 0.72)`     | (mesma base) |
| `--st-light-scale-100`  | `rgba(180, 124, 255, 0.04)` | (mesma base) |
| `--st-light-scale-200`  | `rgba(180, 124, 255, 0.08)` | (mesma base) |
| `--st-light-scale-300`  | `rgba(180, 124, 255, 0.16)` | (mesma base) |
| `--st-light-scale-400`  | `rgba(180, 124, 255, 0.24)` | (mesma base) |
| `--st-light-scale-500`  | `rgba(180, 124, 255, 0.32)` | (mesma base) |
| `--st-light-scale-600`  | `rgba(180, 124, 255, 0.4)`  | (mesma base) |
| `--st-light-scale-700`  | `rgba(180, 124, 255, 0.48)` | (mesma base) |
| `--st-light-scale-800`  | `rgba(180, 124, 255, 0.56)` | (mesma base) |
| `--st-light-scale-900`  | `rgba(180, 124, 255, 0.64)` | (mesma base) |
| `--st-light-scale-950`  | `rgba(180, 124, 255, 0.72)` | (mesma base) |
| `--st-bright-scale-100` | `rgba(255, 255, 255, 0.04)` | (mesma base) |
| `--st-bright-scale-200` | `rgba(255, 255, 255, 0.08)` | (mesma base) |
| `--st-bright-scale-300` | `rgba(255, 255, 255, 0.16)` | (mesma base) |
| `--st-bright-scale-400` | `rgba(255, 255, 255, 0.24)` | (mesma base) |
| `--st-bright-scale-500` | `rgba(255, 255, 255, 0.32)` | (mesma base) |
| `--st-bright-scale-600` | `rgba(255, 255, 255, 0.4)`  | (mesma base) |
| `--st-bright-scale-700` | `rgba(255, 255, 255, 0.48)` | (mesma base) |
| `--st-bright-scale-800` | `rgba(255, 255, 255, 0.56)` | (mesma base) |
| `--st-bright-scale-900` | `rgba(255, 255, 255, 0.64)` | (mesma base) |
| `--st-bright-scale-950` | `rgba(255, 255, 255, 0.72)` | (mesma base) |
| `--st-din-scale-100`    | `rgba(0, 0, 0, 0.04)`       | (mesma base) |
| `--st-din-scale-200`    | `rgba(0, 0, 0, 0.08)`       | (mesma base) |
| `--st-din-scale-300`    | `rgba(0, 0, 0, 0.16)`       | (mesma base) |
| `--st-din-scale-400`    | `rgba(0, 0, 0, 0.24)`       | (mesma base) |
| `--st-din-scale-500`    | `rgba(0, 0, 0, 0.32)`       | (mesma base) |
| `--st-din-scale-600`    | `rgba(0, 0, 0, 0.4)`        | (mesma base) |
| `--st-din-scale-700`    | `rgba(0, 0, 0, 0.48)`       | (mesma base) |
| `--st-din-scale-800`    | `rgba(0, 0, 0, 0.56)`       | (mesma base) |
| `--st-din-scale-900`    | `rgba(0, 0, 0, 0.64)`       | (mesma base) |
| `--st-din-scale-950`    | `rgba(0, 0, 0, 0.72)`       | (mesma base) |

### 3.3 Escalas cromáticas extras

| Variável                     | Valor (Light)                                      |
| ---------------------------- | -------------------------------------------------- |
| `--st-blue-color-100..950`   | Azul Tailwind padrão (100=`#dbeafe`…950=`#172554`) |
| `--st-ocean-color-100..950`  | Ciano/Oceano (igual info-color)                    |
| `--st-green-color-100..950`  | Verde Tailwind (100=`#dcfce7`…950=`#052e16`)       |
| `--st-yellow-color-100..950` | Amarelo Tailwind (100=`#fef9c3`…950=`#422006`)     |
| `--st-orange-color-100..950` | Laranja Tailwind (100=`#ffedd5`…950=`#431407`)     |
| `--st-red-color-100..950`    | Vermelho Tailwind (100=`#fee2e2`…950=`#450a0a`)    |
| `--st-pink-color-100..950`   | Rosa Tailwind (100=`#fce7f3`…950=`#500724`)        |
| `--st-purple-color-100..950` | Roxo Tailwind (100=`#f3e8ff`…950=`#3b0764`)        |

### 3.4 Aliases semânticos de cores sistêmicas (Light vs Dark)

| Variável               | Light                           | Dark                            |
| ---------------------- | ------------------------------- | ------------------------------- |
| `--st-color-brand`     | `var(--st-brand-primary-700)`   | `var(--st-brand-primary-700)`   |
| `--st-color-primary`   | `var(--st-brand-primary-600)`   | `var(--st-brand-primary-600)`   |
| `--st-color-secondary` | `var(--st-brand-secondary-400)` | `var(--st-brand-secondary-400)` |
| `--st-color-info`      | `var(--st-info-color-500)`      | `var(--st-info-color-500)`      |
| `--st-color-system`    | `var(--st-system-color-600)`    | `var(--st-system-color-600)`    |
| `--st-color-warning`   | `var(--st-attention-color-300)` | `var(--st-attention-color-300)` |
| `--st-color-positive`  | `var(--st-positive-color-500)`  | `var(--st-positive-color-500)`  |
| `--st-color-negative`  | `var(--st-negative-color-500)`  | `var(--st-negative-color-500)`  |

### 3.5 Tokens de superfície (bg-st-surface-*)

| Variável                       | Light                           | Dark                            |
| ------------------------------ | ------------------------------- | ------------------------------- |
| `--st-color-surface-0`         | `var(--st-neutral-color-0)`     | `var(--st-brand-primary-700)`   |
| `--st-color-surface-1`         | `var(--st-brand-primary-100)`   | `var(--st-brand-primary-800)`   |
| `--st-color-surface-2`         | `var(--st-brand-primary-200)`   | `var(--st-brand-primary-900)`   |
| `--st-color-surface-3`         | `var(--st-brand-primary-300)`   | `var(--st-brand-primary-950)`   |
| `--st-color-surface-4`         | `var(--st-brand-primary-300)`   | `var(--st-brand-primary-950)`   |
| `--st-color-surface-primary`   | `var(--st-brand-primary-300)`   | `var(--st-brand-primary-950)`   |
| `--st-color-surface-secondary` | `var(--st-brand-secondary-300)` | `var(--st-brand-secondary-800)` |
| `--st-color-surface-info`      | `var(--st-info-color-100)`      | `var(--st-info-color-950)`      |
| `--st-color-surface-system`    | `var(--st-system-color-200)`    | `var(--st-brand-primary-900)`   |
| `--st-color-surface-warning`   | `var(--st-attention-color-200)` | `var(--st-attention-color-950)` |
| `--st-color-surface-positive`  | `var(--st-positive-color-200)`  | `var(--st-positive-color-800)`  |
| `--st-color-surface-negative`  | `var(--st-negative-color-200)`  | `var(--st-negative-color-900)`  |
| `--st-color-surface-shadow-0`  | `var(--st-shadow-scale-500)`    | `var(--st-shadow-scale-500)`    |
| `--st-color-surface-shadow-1`  | `var(--st-shadow-scale-600)`    | `var(--st-shadow-scale-600)`    |
| `--st-color-surface-shadow-2`  | `var(--st-shadow-scale-700)`    | `var(--st-shadow-scale-700)`    |
| `--st-color-surface-shadow-3`  | `var(--st-shadow-scale-800)`    | `var(--st-shadow-scale-800)`    |

### 3.6 Tokens de conteúdo (text-st-content-*)

| Variável                       | Light                           | Dark                            |
| ------------------------------ | ------------------------------- | ------------------------------- |
| `--st-color-content-default`   | `var(--st-neutral-color-800)`   | `var(--st-neutral-color-100)`   |
| `--st-color-content-disable`   | `var(--st-neutral-color-700)`   | `var(--st-neutral-color-200)`   |
| `--st-color-content-ghost`     | `var(--st-neutral-color-400)`   | `var(--st-neutral-color-300)`   |
| `--st-color-content-bright`    | `var(--st-neutral-color-0)`     | `var(--st-neutral-color-0)`     |
| `--st-color-content-din`       | `var(--st-neutral-color-950)`   | `var(--st-neutral-color-950)`   |
| `--st-color-content-primary`   | `var(--st-brand-primary-950)`   | `var(--st-brand-primary-100)`   |
| `--st-color-content-secondary` | `var(--st-brand-secondary-700)` | `var(--st-brand-secondary-300)` |
| `--st-color-content-info`      | `var(--st-info-color-700)`      | `var(--st-info-color-200)`      |
| `--st-color-content-system`    | `var(--st-system-color-800)`    | `var(--st-system-color-300)`    |
| `--st-color-content-warning`   | `var(--st-attention-color-800)` | `var(--st-attention-color-300)` |
| `--st-color-content-positive`  | `var(--st-positive-color-800)`  | `var(--st-positive-color-400)`  |
| `--st-color-content-negative`  | `var(--st-negative-color-900)`  | `var(--st-negative-color-400)`  |

### 3.7 Tokens de borda, estados e sombras

| Variável                    | Light                        | Dark                         |
| --------------------------- | ---------------------------- | ---------------------------- |
| `--st-color-border-1`       | `var(--st-shadow-scale-600)` | `var(--st-light-scale-700)`  |
| `--st-color-border-2`       | `var(--st-shadow-scale-700)` | `var(--st-light-scale-800)`  |
| `--st-color-border-3`       | `var(--st-shadow-scale-800)` | `var(--st-light-scale-900)`  |
| `--st-color-focus`          | `var(--st-purple-color-500)` | `var(--st-purple-color-500)` |
| `--st-color-pressed`        | `var(--st-shadow-scale-100)` | `var(--st-shadow-scale-300)` |
| `--st-color-shadow-pressed` | `var(--st-shadow-scale-300)` | `var(--st-light-scale-700)`  |
| `--st-color-hover`          | `var(--st-shadow-scale-200)` | `var(--st-shadow-scale-400)` |
| `--st-color-shadow-hover`   | `var(--st-shadow-scale-300)` | `var(--st-light-scale-700)`  |
| `--st-color-shadow-0`       | `var(--st-shadow-scale-100)` | `var(--st-shadow-scale-500)` |
| `--st-color-shadow-1`       | `var(--st-shadow-scale-200)` | `var(--st-shadow-scale-600)` |
| `--st-color-shadow-2`       | `var(--st-shadow-scale-300)` | `var(--st-shadow-scale-700)` |
| `--st-color-shadow-3`       | `var(--st-shadow-scale-400)` | `var(--st-shadow-scale-800)` |
| `--st-color-light-0`        | `var(--st-light-scale-400)`  | `var(--st-light-scale-400)`  |
| `--st-color-light-1`        | `var(--st-light-scale-500)`  | `var(--st-light-scale-500)`  |
| `--st-color-light-2`        | `var(--st-light-scale-600)`  | `var(--st-light-scale-600)`  |
| `--st-color-light-3`        | `var(--st-light-scale-700)`  | `var(--st-light-scale-700)`  |

---

## 4. EXPORTS PÚBLICOS do package

Arquivo: `src/index.ts`

| Componente / Export   | Path (origem)                       | Tipo exportado                        | Props / características conhecidas                                                                                                                                                                                                                                                                                                           |
| --------------------- | ----------------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `StBadge`             | `./components/badge`                | default export (Vue component)        | variant (info/system/warning/positive/negative), size (small/medium), value, pulse, className                                                                                                                                                                                                                                                |
| `StButton`            | `./components/buttons/button`       | default export (Vue component)        | variant (solid/outline/text), size (small/medium/large), color (primary/secondary/positive/negative), fullWidth, type, value, iconLeft, iconRight, disabled, className. Slots: default, startAdornment, endAdornment                                                                                                                         |
| `StButtonGroup`       | `./components/buttons/button-group` | default export (Vue component)        | value, defaultValue, onValueChange, multiple, orientation (horizontal/vertical), variant, size, color, disabled, className                                                                                                                                                                                                                   |
| `StChip`              | `./components/chip`                 | default export (Vue component)        | variant (primary/secondary/info/system/warning/positive/negative), clickable, closable, onClose, className                                                                                                                                                                                                                                   |
| `StDropdown`          | `./components/dropdown`             | default export (Vue component)        | placement (auto/top/bottom/left/right), width, offset, open, defaultOpen, onOpenChange, closeOnOutsideClick, triggerAsChild, className, panelClassName. Slots: trigger, default                                                                                                                                                              |
| `StGrid`              | `./components/grid`                 | default export (Vue component)        | cols, gap, gapX, gapY, smCols, mdCols, lgCols, padding (+ sm/md/lg), margin (+ sm/md/lg), className                                                                                                                                                                                                                                          |
| `StIllustration`      | `./components/illustrations`        | default export (Vue component)        | name (path CDN), alt, width (SizeValue), height (SizeValue), className                                                                                                                                                                                                                                                                       |
| `StLoading`           | `./components/loading`              | default export (Vue component)        | type (arrow/spinner/cyclical), variant (primary/secondary/tertiary), size (3/4/6/8), value (progress cyclical 0-100), className                                                                                                                                                                                                              |
| `StListItem`          | `./components/list`                 | named export (Vue component)          | size (small/medium/large), dense, divider, selected, disabled, clickable, expanded, defaultExpanded, onExpandedChange, onClick, className. Slots: default, startAdornment, endAdornment                                                                                                                                                      |
| `StOrderedList`       | `./components/list`                 | named export (Vue component)          | orientation (vertical/horizontal), dense, className. Baseada em `<ol>`                                                                                                                                                                                                                                                                       |
| `StUnorderedList`     | `./components/list`                 | named export (Vue component)          | orientation (vertical/horizontal), dense, className. Baseada em `<ul>`                                                                                                                                                                                                                                                                       |
| `StModal`             | `./components/modal`                | default export (Vue component)        | open, showCloseButton, closeOnOutsideClick, variant (surface), border, borderRadius, elevation, interactive, bgImage, width/height, padding (+ sm/md/lg), margin (+ sm/md/lg), className. Eventos: update:open, close                                                                                                                        |
| `StCheckbox`          | `./components/form/checkbox`        | default export (Vue component)        | checked, defaultChecked, disabled, label, className. Eventos: update:checked, change                                                                                                                                                                                                                                                         |
| `StInput`             | `./components/form/input`           | default export (Vue component)        | value, defaultValue, label, icon, type, mask (phone-br/cpf), messageInfo, messageDanger, messageSuccess, maxLength, disabled, readOnly. Eventos: update:value, input, change, focus, blur, keydown, keyup, click. Métodos: focus(), blur(), clear(), setInvalidity(), setValidity(), reportValidity()                                        |
| `StOption`            | `./components/form/option`          | default export (Vue component)        | value, selected, className, onClick. Slots: default, startAdornment, endAdornment                                                                                                                                                                                                                                                            |
| `StRadio`             | `./components/form/radio`           | default export (Vue component)        | checked, defaultChecked, disabled, label, className. Eventos: update:checked, change. Integra com StRadioGroup via provide/inject                                                                                                                                                                                                            |
| `StRadioGroup`        | `./components/form/radio-group`     | default export (Vue component)        | name, value, defaultValue, onValueChange, disabled, dense, orientation (vertical/horizontal), className. Eventos: update:value, value-change. Role=radiogroup                                                                                                                                                                                |
| `StSelect`            | `./components/form/select`          | default export (Vue component)        | value, defaultValue, onValueChange, options, label, icon, placeholder, name, required, disabled, readOnly, messageInfo, messageDanger, messageSuccess, className, panelClassName, placement, offset, closeOnSelect. Eventos: update:value, value-change. Métodos: focus(), blur(), clear(), setInvalidity(), setValidity(), reportValidity() |
| `StSwitch`            | `./components/form/switch`          | default export (Vue component)        | checked, defaultChecked, disabled, label, iconOff, iconOn, className. Eventos: update:checked, change. Baseado em input[type=checkbox] com role=switch                                                                                                                                                                                       |
| `StTooltip`           | `./components/tooltip`              | default export (Vue component)        | placement (top/bottom/left/right), offset, open, defaultOpen, onOpenChange, disabled, triggerProps, className, panelClassName. Slots: trigger, default. Eventos: update:open, open-change                                                                                                                                                    |
| `StIcon`              | `./components/icon`                 | default export (Vue component)        | name (fa default ou fab:prefix), lib (fa/fab), size (1..12), ariaLabel, className. Baseado em Font Awesome (free-solid + free-brands)                                                                                                                                                                                                        |
| `StPaper`             | `./components/paper`                | default export (Vue component)        | variant (surface-0..4 / surface-info/system/warning/positive/negative/primary/secondary), border (none/1/2/3), borderRadius (1/2), elevation (0..4), interactive, bgImage, width/height (SizeValue), padding (+ sm/md/lg), margin (+ sm/md/lg), as (tag), className                                                                          |
| `StTypography`        | `./components/typography`           | default export (Vue component)        | variant (heading-1..4, highlight-large/medium, body-large/medium/small, hero-title), as, size, weight, family, lineHeight, letterSpacing, align, italic, underline, strikethrough, uppercase, lowercase, capitalize, truncate, maxLines, lines, className                                                                                    |
| `useCheckableControl` | `./composables`                     | named composable export               | Gerenciamento de checked controlado/não-controlado, hasLabel (slot vs prop), inputAttrs (filtra class/style), handleChange. Usado por StCheckbox, StRadio, StSwitch                                                                                                                                                                          |
| `useListContainer`    | `./composables`                     | named composable export               | Contexto de lista (provide/inject), navOrientation, renderOrientation, level, wrapperClass/Style, listAttrs. Usado por StOrderedList, StUnorderedList                                                                                                                                                                                        |
| `StIllustrationProps` | `./components/illustrations`        | type export (Props do StIllustration) | name, alt, width?, height?, className?                                                                                                                                                                                                                                                                                                       |
| `SizeValue`           | `./types`                           | type export                           | 'auto' \| 'full' \| 'fit-content' \| 'min-content' \| 'max-content' \| '1'..'12' \| '16' \| '20' \| '24' \| '32' \| '40' \| '48' \| '56' \| '64' \| '72' \| '80' \| '96' \| '128' \| '144' \| '160' \| '168' \| '240'                                                                                                                        |
| `UsualSizeValue`      | `./types`                           | type export                           | '1' \| '2' \| ... \| '12'                                                                                                                                                                                                                                                                                                                    |
| `stCssTokenImport`    | `./tokens`                          | string export                         | `'@startbet/st-core-ui/tokens.css'`                                                                                                                                                                                                                                                                                                          |
| `stTailwindPlugins`   | `./tokens`                          | array of TailwindPluginFn             | Adiciona utilities `.text-shadow-*` via addUtilities                                                                                                                                                                                                                                                                                         |
| `stTailwindTheme`     | `./tokens`                          | theme object (as const)               | Objeto completo do tema Tailwind com colors, fontFamily, fontSize, lineHeight, letterSpacing, borderRadius, boxShadow, dropShadow, spacing, textShadow, keyframes, animation                                                                                                                                                                 |

---

## 5. DOC DE CADA COMPONENTE

Conteúdo INTEIRO dos READMEs de cada componente (mantido em inglês como no projeto original).

---

### 5.1 StButton

````markdown
# StButton

Componente de botao da biblioteca para acoes principais e secundarias, com suporte a variantes visuais, tamanhos, cores semanticas, largura fluida, estado desabilitado e modo `icon only`.

## Import

```ts
import { StButton } from '@startbet/st-core-ui'
```
````

## Variantes disponiveis

- `solid`
- `outline`
- `text`

## Cores disponiveis

- `primary`
- `secondary`
- `positive`
- `negative`

## Tamanhos disponiveis

- `small`
- `medium`
- `large`

## Props principais

- `variant`: define o estilo visual do botao. Default: `solid`.
- `size`: define a escala visual do botao. Default: `medium`.
- `color`: define a cor semantica usada pela variante. Default: `primary`.
- `fullWidth`: expande o botao para `w-full` quando existe conteudo textual.
- `type`: controla o tipo nativo do elemento. Default: `button`.
- `value`: repassa o valor para o elemento nativo.
- `iconLeft`: renderiza um `StIcon` antes do conteudo a partir do nome informado.
- `iconRight`: renderiza um `StIcon` depois do conteudo a partir do nome informado.
- `disabled`: aplica estilo desabilitado e bloqueia interacao. Default: `false`.
- `className`: injeta classes extras no elemento raiz.

## Slots

- `default`: conteudo principal do botao.
- `startAdornment`: area extra antes do conteudo.
- `endAdornment`: area extra depois do conteudo.

## Exemplo basico

```vue
<script setup lang="ts">
import { StButton } from '@startbet/st-core-ui'
</script>

<template>
  <StButton>Salvar</StButton>
</template>
```

## Exemplo com variantes

```vue
<template>
  <div class="flex flex-wrap gap-st-2">
    <StButton variant="solid" color="primary">Primary</StButton>
    <StButton variant="outline" color="secondary">Secondary</StButton>
    <StButton variant="text" color="negative">Negative</StButton>
  </div>
</template>
```

## Exemplo com adornos

```vue
<template>
  <StButton iconLeft="plus" iconRight="chevron-right">Continuar</StButton>
</template>
```

## Regras internas

- Sem conteudo no slot `default` e com apenas um adorno, o componente entra em modo `icon only`.
- O modo `icon only` troca o comportamento de largura por um tamanho quadrado baseado na altura do botao.
- O estado `disabled` sobrescreve as classes da variante e aplica cores neutras da biblioteca.
- `iconLeft` e `iconRight` reutilizam o `StIcon`, respeitando a library atual do Font Awesome.

## Observacoes

- O componente usa os tokens semanticos de cor e conteudo ja publicados no tema Tailwind da biblioteca.
- Para os icones aparecerem, a aplicacao consumidora precisa registrar no Font Awesome os `IconDefinition` utilizados.

````

---

### 5.2 StButtonGroup

```markdown
# StButtonGroup

Componente de agrupamento de botoes da biblioteca para compor selecoes simples ou multiplas em cima do `StButton`, com suporte a orientacao horizontal ou vertical, estado controlado e navegacao por teclado.

## Import

```ts
import { StButton, StButtonGroup } from '@startbet/st-core-ui';
````

## Variantes disponiveis

- `solid`
- `outline`
- `text`

## Cores disponiveis

- `primary`
- `secondary`
- `positive`
- `negative`

## Tamanhos disponiveis

- `small`
- `medium`
- `large`

## Props principais

- `value`: controla o valor selecionado quando o grupo esta em modo controlado.
- `defaultValue`: define o valor inicial no modo nao controlado.
- `onValueChange`: callback disparado sempre que a selecao muda.
- `multiple`: permite selecionar mais de um botao. Default: `false`.
- `orientation`: define a direcao visual do grupo. Default: `horizontal`.
- `variant`: define a variante base aplicada aos botoes filhos. Default: `solid`.
- `size`: define o tamanho base aplicado aos botoes filhos. Default: `medium`.
- `color`: define a cor semantica base aplicada aos botoes filhos. Default: `primary`.
- `disabled`: desabilita todos os botoes do grupo. Default: `false`.
- `className`: injeta classes extras no container raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { StButton, StButtonGroup } from '@startbet/st-core-ui'
</script>

<template>
  <StButtonGroup defaultValue="sports">
    <StButton value="sports">Esportes</StButton>
    <StButton value="casino">Casino</StButton>
    <StButton value="live">Live</StButton>
  </StButtonGroup>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StButton, StButtonGroup } from '@startbet/st-core-ui'

const selected = ref<string | string[]>('week')
</script>

<template>
  <StButtonGroup v-model:value="selected">
    <StButton value="day">Dia</StButton>
    <StButton value="week">Semana</StButton>
    <StButton value="month">Mes</StButton>
  </StButtonGroup>
</template>
```

## Exemplo com multiple

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StButton, StButtonGroup } from '@startbet/st-core-ui'

const filters = ref<string | string[]>(['pix'])
</script>

<template>
  <StButtonGroup v-model:value="filters" multiple color="positive" variant="outline">
    <StButton value="pix">Pix</StButton>
    <StButton value="card">Cartao</StButton>
    <StButton value="wallet">Carteira</StButton>
  </StButtonGroup>
</template>
```

## Exemplo vertical

```vue
<template>
  <StButtonGroup orientation="vertical" size="small" color="secondary">
    <StButton value="all">Todos</StButton>
    <StButton value="open">Abertos</StButton>
    <StButton value="closed">Fechados</StButton>
  </StButtonGroup>
</template>
```

## Exemplo com icones

```vue
<template>
  <StButtonGroup defaultValue="instagram" color="secondary" variant="outline">
    <StButton value="facebook" iconLeft="fab:facebook-f">Facebook</StButton>
    <StButton value="instagram" iconLeft="fab:instagram">Instagram</StButton>
  </StButtonGroup>
</template>
```

## Regras internas

- O grupo aceita qualquer quantidade de `StButton` como filhos no slot `default`.
- Quando `multiple` for `false`, apenas um valor fica ativo por vez.
- Quando `multiple` for `true`, os cliques alternam inclusao e remocao do item selecionado.
- Para `primary` e `secondary`, o item ativo alterna para a cor oposta mantendo a variante.
- Para `positive` e `negative`, o item ativo mantem a cor e alterna entre `solid` e `outline`.
- O componente suporta navegacao por teclado com setas: `ArrowLeft` e `ArrowRight` no modo horizontal, `ArrowUp` e `ArrowDown` no modo vertical.
- Os botoes filhos continuam podendo usar `iconLeft` e `iconRight`, porque o grupo apenas orquestra e complementa o `StButton`.

## Observacoes

- O componente faz `v-bind="$attrs"` no container raiz, aceitando `id`, `data-*` e atributos nativos extras.
- Os botoes filhos recebem automaticamente as classes de colapso visual do grupo, com raio apenas nas extremidades.
- Quando os filhos usarem icones, a aplicacao consumidora precisa registrar os `IconDefinition` desejados no Font Awesome.

````

---

### 5.3 StGrid

```markdown
# StGrid

Componente de layout da biblioteca para composicao de grades com controle de colunas, gaps, comportamento responsivo e shorthand de espacamento usando os tokens `st-*` do projeto.

## Import

```ts
import { StGrid } from '@startbet/st-core-ui';
````

## Props principais

- `cols`: define a quantidade base de colunas. Default: `1`.
- `gap`: aplica o gap geral entre linhas e colunas.
- `gapX`: aplica apenas o gap horizontal.
- `gapY`: aplica apenas o gap vertical.
- `smCols`, `mdCols`, `lgCols`: ajustam a quantidade de colunas por breakpoint.
- `padding`, `smPadding`, `mdPadding`, `lgPadding`: aplicam shorthand de espacamento para padding.
- `margin`, `smMargin`, `mdMargin`, `lgMargin`: aplicam shorthand de espacamento para margin.
- `className`: injeta classes extras no container raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { StGrid } from '@startbet/st-core-ui'
</script>

<template>
  <StGrid :cols="2" :gap="2">
    <div class="rounded-st-1 bg-st-surface-2 p-st-2">Item 1</div>
    <div class="rounded-st-1 bg-st-surface-2 p-st-2">Item 2</div>
    <div class="rounded-st-1 bg-st-surface-2 p-st-2">Item 3</div>
    <div class="rounded-st-1 bg-st-surface-2 p-st-2">Item 4</div>
  </StGrid>
</template>
```

## Exemplo responsivo

```vue
<script setup lang="ts">
import { StGrid } from '@startbet/st-core-ui'
</script>

<template>
  <StGrid :cols="1" :sm-cols="2" :md-cols="3" :lg-cols="4" gap="3">
    <div
      v-for="item in 8"
      :key="item"
      class="rounded-st-1 bg-st-surface-1 p-st-2 text-st-content-default"
    >
      Card {{ item }}
    </div>
  </StGrid>
</template>
```

## Shorthand de espacamento

O shorthand segue o padrao do CSS:

- `1 valor`: todos os lados
- `2 valores`: `vertical horizontal`
- `3 valores`: `top horizontal bottom`
- `4 valores`: `top right bottom left`

Exemplos:

- `padding="2"` -> `p-st-2`
- `padding="2 4"` -> `py-st-2 px-st-4`
- `margin="4 auto"` -> `my-st-4 mx-auto`
- `mdPadding="3 6"` -> `md:py-st-3 md:px-st-6`

## Observacoes

- O componente renderiza um `div` com a classe base `grid`.
- As props responsivas controlam apenas as colunas; os gaps seguem o valor informado nas props base.
- `className` pode ser usado para complementar alinhamento, largura ou outras utilidades de layout no container.

````

---

### 5.4 StPaper

```markdown
# StPaper

Componente de superficie da biblioteca para compor containers com controle de background, borda, raio, sombra, dimensoes e espacamento usando os tokens `st-*` do projeto.

## Import

```ts
import { StPaper } from '@startbet/st-core-ui';
````

## Variantes disponiveis

- `surface-0`
- `surface-1`
- `surface-2`
- `surface-3`
- `surface-4`
- `surface-info`
- `surface-system`
- `surface-warning`
- `surface-positive`
- `surface-negative`
- `surface-primary`
- `surface-secondary`

## Props principais

- `variant`: define o background semantico da superficie. Default: `surface-1`.
- `border`: controla a borda do container. Default: `none`.
- `borderRadius`: controla o raio do container. Default: `1`.
- `elevation`: controla a sombra base entre `0` e `4`. Default: `1`.
- `interactive`: aplica estados de interacao com `cursor`, `active` e aumento de sombra no hover.
- `bgImage`: aplica uma imagem de fundo via `background-image`.
- `width` e `height`: aplicam classes semanticas de dimensao com a escala `st-*`.
- `padding`, `paddingSm`, `paddingMd`, `paddingLg`: aplicam shorthand de espacamento para padding.
- `margin`, `marginSm`, `marginMd`, `marginLg`: aplicam shorthand de espacamento para margin.
- `as`: permite trocar a tag HTML renderizada. Default: `div`.
- `className`: injeta classes extras no elemento raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { StPaper, StTypography } from '@startbet/st-core-ui'
</script>

<template>
  <StPaper variant="surface-2" padding="3" borderRadius="2">
    <StTypography as="h3" variant="heading-4"> Titulo do card </StTypography>
  </StPaper>
</template>
```

## Exemplo com interacao

```vue
<StPaper as="button" variant="surface-primary" border="1" elevation="2" interactive padding="2 3">
  Acao destacada
</StPaper>
```

## Shorthand de espacamento

O shorthand segue o padrao do CSS:

- `1 valor`: todos os lados
- `2 valores`: `vertical horizontal`
- `3 valores`: `top horizontal bottom`
- `4 valores`: `top right bottom left`

Exemplos:

- `padding="2"` -> `p-st-2`
- `padding="2 4"` -> `py-st-2 px-st-4`
- `margin="4 auto"` -> `my-st-4 mx-auto`
- `paddingMd="3 6"` -> `md:py-st-3 md:px-st-6`

## Observacoes

- O componente usa os tokens de `surface`, `border` e `shadow` ja publicados no tema Tailwind da biblioteca.
- Quando `interactive` esta ativo e `elevation` for menor que `4`, o componente sobe a sombra no hover automaticamente.
- `bgImage` adiciona tambem `bg-cover`, `bg-center` e `bg-no-repeat`.

````

---

### 5.5 StTypography

```markdown
# StTypography

Componente base de tipografia da biblioteca para renderizar textos semanticos com os tokens de `fontFamily`, `fontSize`, `lineHeight` e `letterSpacing` expostos pelo tema Tailwind.

## Import

```ts
import { StTypography } from '@startbet/st-core-ui';
````

## Variantes disponiveis

- `heading-1`
- `heading-2`
- `heading-3`
- `heading-4`
- `highlight-large`
- `highlight-medium`
- `body-large`
- `body-medium`
- `body-small`
- `hero-title`

## Props principais

- `variant`: aplica uma variante semantica predefinida. Default: `body-medium`.
- `as`: define a tag HTML renderizada. Default: `p`.
- `size`: sobrescreve o tamanho com a escala numerica do tema.
- `weight`: sobrescreve o peso da fonte.
- `family`: sobrescreve a familia tipografica entre `body`, `heading`, `highlight` e `display`.
- `lineHeight`: sobrescreve o line-height com os tokens do tema.
- `letterSpacing`: sobrescreve o tracking com os tokens do tema.
- `align`: aplica alinhamento de texto.
- `italic`, `underline`, `strikethrough`, `uppercase`, `lowercase`, `capitalize`: aplicam transformacoes utilitarias.
- `truncate`: aplica truncamento em uma linha.
- `maxLines`: aplica clamp entre 1 e 6 linhas.
- `lines`: divide o texto em multiplas linhas quando o slot for apenas texto puro. Foi pensado principalmente para `hero-title`.
- `className`: injeta classes extras no elemento raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { StTypography } from '@startbet/st-core-ui'
</script>

<template>
  <StTypography as="h2" variant="heading-3"> Titulo da secao </StTypography>

  <StTypography variant="body-medium">
    Texto de apoio usando a tipografia padrao da biblioteca.
  </StTypography>
</template>
```

## Exemplo com overrides

```vue
<StTypography as="span" variant="body-small" weight="bold" align="center" uppercase>
  Status do componente
</StTypography>
```

## Observacoes

- O componente depende dos tokens CSS e das fontes publicadas pela biblioteca.
- Para o `hero-title`, a prop `lines` permite destacar visualmente a ultima linha quando o slot contiver apenas texto simples.

````

---

### 5.6 StIcon

```markdown
# StIcon

Componente de icone da biblioteca baseado em Font Awesome, com suporte a bibliotecas `fa` e `fab`, controle de tamanho pela escala visual do design system e fallback seguro quando o icone nao existir.

## Import

```ts
import { StIcon } from '@startbet/st-core-ui';
````

## Bibliotecas disponiveis

- `fa`
- `fab`

## Tamanhos disponiveis

- `1`
- `2`
- `3`
- `4`
- `5`
- `6`
- `7`
- `8`
- `9`
- `10`
- `11`
- `12`

## Props principais

- `name`: nome do icone a ser resolvido. Aceita nome simples como `plus` ou prefixado como `fab:facebook-f`.
- `lib`: define a biblioteca usada como fallback quando `name` nao vier prefixado. Default: `fa`.
- `size`: define a escala visual do container do icone entre `1` e `12`.
- `ariaLabel`: aplica rotulo acessivel no container e no `svg`.
- `className`: injeta classes extras no elemento raiz.

## Exemplo basico

```vue
<script setup lang="ts">
import { StIcon } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex items-center gap-st-2">
    <StIcon name="plus" :size="2" aria-label="Adicionar" />
    <StIcon name="chevron-right" :size="2" aria-label="Avancar" />
  </div>
</template>
```

## Exemplo com brand

```vue
<template>
  <div class="flex items-center gap-st-2">
    <StIcon name="fab:facebook-f" :size="3" aria-label="Facebook" />
    <StIcon name="fab:instagram" :size="3" aria-label="Instagram" />
  </div>
</template>
```

## Regras internas

- O componente registra os packs `free-solid` e `free-brands` do Font Awesome.
- O `name` e normalizado para lowercase e troca `_` por `-` antes da busca.
- Quando `name` vier com prefixo, como `fab:facebook-f`, esse prefixo sobrescreve o `lib`.
- Quando o icone nao for encontrado, o componente mantem o `span` raiz e nao renderiza o `svg`.

## Observacoes

- O tamanho usa classes `w-st-*` e `h-st-*` derivadas da escala visual do projeto.
- O `svg` interno usa `w-[90%]` e `h-[90%]` para manter respiro dentro do container.
- O componente faz `v-bind="$attrs"` no elemento raiz, aceitando `id`, `data-*` e atributos extras.

````

---

### 5.7 StIllustration

```markdown
# StIllustration

Componente da biblioteca para renderizar ilustrações SVG publicadas no CDN da StartBet a partir de um caminho relativo.

## Import

```ts
import { StIllustration } from '@startbet/st-core-ui';
````

## Props principais

- `name`: caminho relativo da ilustração no CDN. Exemplo: `arrows/chip_3d`.
- `alt`: texto alternativo obrigatório da imagem.
- `width`: largura opcional usando os mesmos `SizeValue` expostos pela biblioteca.
- `height`: altura opcional usando os mesmos `SizeValue` expostos pela biblioteca.
- `className`: permite complementar as classes do elemento `<img>`.

## Exemplo básico

```vue
<template>
  <StIllustration name="arrows/chip_3d" alt="Chip 3D" height="24" />
</template>
```

## Exemplo com tamanho e classes extras

```vue
<template>
  <StIllustration
    name="brands/logo_dark"
    alt="Logo StartBet escura"
    width="56"
    className="rounded-st-1"
  />
</template>
```

## Formato do `name`

- O valor deve ser enviado como caminho relativo dentro de `https://cdn.start.bet.br/illustrations`.
- O componente aceita nomes com ou sem a extensão `.svg`.
- Não use caminhos locais da máquina ou URLs completas no `name`.

Exemplos válidos:

- `arrows/chip_3d`
- `brands/logo_dark`
- `characters/soccer_player_01`
- `random/star_3d_01.svg`

## Categorias disponíveis no catálogo atual

- `arrows`
- `balls`
- `brands`
- `casino`
- `characters`
- `coins`
- `cup`
- `football`
- `papers`
- `random`
- `safety`
- `smoke`
- `stickers`
- `time`
- `various`

## Regras internas

- O componente monta automaticamente a URL final do CDN com base no `name`.
- `width` e `height` numéricos também são refletidos nos atributos nativos da imagem.
- Atributos extras como `loading`, `decoding` e `referrerpolicy` podem ser encaminhados via `$attrs`.

````

---

### 5.8 StBadge

```markdown
# StBadge

Componente de badge da biblioteca para exibir contagens, estados pontuais e indicadores semanticos com suporte a `dot`, valor formatado e animacao de pulse.

## Import

```ts
import { StBadge } from '@startbet/st-core-ui';
````

## Variantes disponiveis

- `info`
- `system`
- `warning`
- `positive`
- `negative`

## Tamanhos disponiveis

- `small`
- `medium`

## Props principais

- `variant`: define a cor semantica do badge. Default: `info`.
- `size`: define a escala visual do badge. Default: `small`.
- `value`: renderiza um valor numerico ou textual. Sem valor, o componente vira um `dot`.
- `pulse`: aplica `animate-ping` no ring do badge.
- `className`: injeta classes extras no container.

## Exemplo basico

```vue
<script setup lang="ts">
import { StBadge } from '@startbet/st-core-ui'
</script>

<template>
  <StBadge />
  <StBadge :value="7" />
</template>
```

## Exemplo com variantes

```vue
<template>
  <div class="flex items-center gap-st-2">
    <StBadge variant="info" :value="12" />
    <StBadge variant="negative" :value="120" />
    <StBadge variant="warning" size="medium" pulse />
  </div>
</template>
```

## Regras internas

- Sem `value`, o componente renderiza como `dot`.
- `number > 99` vira `99+`.
- `string` com mais de `4` caracteres e truncada para `4` caracteres com `…`.
- O ring sempre e renderizado como elemento interno com `border` da variante.

## Observacoes

- O badge usa os tokens semanticos de cor da biblioteca (`st-info`, `st-system`, `st-warning`, `st-positive`, `st-negative`).
- O tamanho `small` usa `text-st-xs` quando renderiza valor.
- O tamanho `medium` usa `text-st-sm` quando renderiza valor.

````

---

### 5.9 StChip

```markdown
# StChip

Componente de chip da biblioteca para exibir estados semânticos compactos, com suporte a modo clicável, fechamento opcional e integração com `StIcon`.

## Import

```ts
import { StChip } from '@startbet/st-core-ui';
````

## Variantes disponíveis

- `primary`
- `secondary`
- `info`
- `system`
- `warning`
- `positive`
- `negative`

## Props principais

- `variant`: define a cor semântica do chip. Default: `primary`.
- `clickable`: habilita interação por mouse e teclado. Default: `false`.
- `closable`: renderiza o botão interno de fechar. Default: `false`.
- `onClose`: callback disparado ao clicar no botão de fechar.
- `className`: injeta classes extras no container.

## Exemplo básico

```vue
<script setup lang="ts">
import { StChip } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-wrap gap-st-2">
    <StChip>Default</StChip>
    <StChip variant="warning">Warning</StChip>
  </div>
</template>
```

## Exemplo clicável

```vue
<script setup lang="ts">
const handleClick = () => console.log('chip click')
</script>

<template>
  <StChip clickable @click="handleClick">Clicável</StChip>
</template>
```

## Exemplo fechável

```vue
<script setup lang="ts">
const handleClose = () => console.log('chip close')
</script>

<template>
  <StChip closable :on-close="handleClose">Fechável</StChip>
</template>
```

## Regras internas

- Quando `clickable=true`, o chip recebe `role="button"` e `tabindex="0"`.
- `Enter` e `Space` disparam o mesmo evento de `click` do container.
- Quando `closable=true`, o botão interno usa `@click.stop` para não propagar o click do chip.
- O botão de close renderiza `StIcon` com `xmark`.

## Observações

- O componente faz `v-bind="$attrs"` no container, mas filtra `onClick`, `onKeydown` e `onKeyDown` para manter a regra de interação baseada em `clickable`.
- O `xmark` usado no close é registrado internamente pelo próprio componente.

````

---

### 5.10 StDropdown

```markdown
# StDropdown

Componente de dropdown da biblioteca para exibir conteúdo flutuante a partir de um trigger, com suporte a posicionamento, largura configurável e modos controlado e não controlado.

## Import

```ts
import { StDropdown } from '@startbet/st-core-ui';
````

## Slots

- `trigger`: conteúdo que abre ou fecha o dropdown.
- `default`: conteúdo renderizado no painel flutuante.

## Props principais

- `placement`: define a direção preferencial do painel. Default: `auto`.
- `width`: controla a largura do painel. Default: `auto`.
- `offset`: define o espaçamento entre trigger e painel. Default: `8`.
- `open`: controla o estado aberto de forma externa.
- `defaultOpen`: define o estado inicial no modo não controlado. Default: `false`.
- `onOpenChange`: callback disparado quando o estado aberto muda.
- `closeOnOutsideClick`: fecha ao clicar fora. Default: `true`.
- `triggerAsChild`: delega o trigger para o slot com `open`, `toggle`, `setTriggerEl` e `attrs`.
- `className`: injeta classes extras no container raiz.
- `panelClassName`: injeta classes extras no painel.

## Placements disponíveis

- `auto`
- `top`
- `bottom`
- `left`
- `right`

## Exemplo básico

```vue
<script setup lang="ts">
import { StButton, StDropdown } from '@startbet/st-core-ui'
</script>

<template>
  <StDropdown>
    <template #trigger>
      <StButton variant="outline">Abrir menu</StButton>
    </template>

    <div class="flex min-w-st-40 flex-col gap-st-1">
      <button type="button" class="rounded-st-1 px-st-2 py-st-1 text-left hover:bg-st-surface-2">
        Perfil
      </button>
      <button type="button" class="rounded-st-1 px-st-2 py-st-1 text-left hover:bg-st-surface-2">
        Configurações
      </button>
    </div>
  </StDropdown>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StButton, StDropdown } from '@startbet/st-core-ui'

const open = ref(false)
</script>

<template>
  <StDropdown :open="open" @update:open="open = $event">
    <template #trigger>
      <StButton variant="solid">
        {{ open ? 'Fechar' : 'Abrir' }}
      </StButton>
    </template>

    <div class="min-w-st-32 rounded-st-1 bg-st-surface-1 p-st-2">
      Painel controlado externamente
    </div>
  </StDropdown>
</template>
```

## Exemplo com `triggerAsChild`

```vue
<script setup lang="ts">
import { StButton, StDropdown } from '@startbet/st-core-ui'
</script>

<template>
  <StDropdown trigger-as-child>
    <template #trigger="{ open, toggle, setTriggerEl, attrs }">
      <StButton :ref="setTriggerEl" variant="outline" v-bind="attrs" @click="toggle">
        {{ open ? 'Fechar ações' : 'Abrir ações' }}
      </StButton>
    </template>

    <div class="min-w-st-32 p-st-1">Conteúdo do painel</div>
  </StDropdown>
</template>
```

## Regras internas

- Quando `placement="auto"`, o componente escolhe entre `bottom` e `top` com base no espaço disponível.
- Quando `width="full"`, o painel recebe a mesma largura do trigger.
- O painel usa `position: fixed` para facilitar o reposicionamento durante `scroll` e `resize`.
- O componente monitora clique fora apenas enquanto o painel está aberto.

## Observações

- No modo controlado, o componente emite `update:open` e `open-change`, mas depende da atualização do prop `open` para refletir o novo estado.
- No modo `triggerAsChild`, o slot recebe `attrs` com `aria-haspopup` e `aria-expanded` para manter a acessibilidade do trigger.

````

---

### 5.11 StTooltip

```markdown
# StTooltip

Componente de tooltip da biblioteca para exibir conteúdo contextual flutuante a partir de hover, foco ou controle externo.

## Import

```ts
import { StTooltip } from '@startbet/st-core-ui';
````

## Slots

- `trigger`: conteúdo que recebe a interação do tooltip.
- `default`: conteúdo exibido no painel do tooltip.

## Props principais

- `placement`: define a posição do painel. Aceita `top`, `bottom`, `left` ou `right`. Default: `top`.
- `offset`: define a distância entre trigger e painel. Default: `8`.
- `open`: controla o estado aberto de forma externa.
- `defaultOpen`: define o estado inicial no modo não controlado. Default: `false`.
- `onOpenChange`: callback disparado quando o estado aberto muda.
- `disabled`: impede abertura por hover, foco ou interação de teclado. Default: `false`.
- `triggerProps`: permite encaminhar atributos e handlers extras para o wrapper do trigger.
- `className`: injeta classes extras no container raiz.
- `panelClassName`: injeta classes extras no painel flutuante.

## Eventos

- `update:open`: emitido quando o estado aberto muda.
- `open-change`: emitido junto com a mudança de estado.

## Exemplo básico

```vue
<template>
  <StTooltip>
    <template #trigger>
      <button type="button" class="rounded-st-1 border border-st-border-2 px-st-2 py-st-1">
        Passe o mouse
      </button>
    </template>

    Conteúdo do tooltip
  </StTooltip>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <StTooltip :open="open" @update:open="open = $event">
    <template #trigger>
      <button type="button" class="rounded-st-1 border border-st-border-2 px-st-2 py-st-1">
        Tooltip controlado
      </button>
    </template>

    Tooltip aberto por estado externo
  </StTooltip>
</template>
```

## Exemplo com `triggerProps`

```vue
<template>
  <StTooltip
    :trigger-props="{
      title: 'Ajuda contextual',
      className: 'rounded-st-1 outline outline-1 outline-st-border-2'
    }"
  >
    <template #trigger>
      <span tabindex="0" class="inline-flex px-st-2 py-st-1">Foque aqui</span>
    </template>

    Tooltip com atributos adicionais no trigger
  </StTooltip>
</template>
```

## Regras internas

- O painel usa `role="tooltip"` e associa o trigger com `aria-describedby` quando aberto.
- O posicionamento usa `position: fixed` com atualização em `resize`, `scroll` e `ResizeObserver`.
- O tooltip fecha com `Escape`, `mouseleave` e `blur`.

````

---

### 5.12 StModal

```markdown
# StModal

Componente de modal da biblioteca para exibir conteúdo sobreposto ao viewport, com `Teleport`, fechamento por `Escape` e reaproveitamento da API visual do `StPaper`.

## Import

```ts
import { StModal } from '@startbet/st-core-ui';
````

## Slots

- `default`: conteúdo renderizado dentro do modal.

## Props principais

- `open`: controla a visibilidade do modal. Default: `false`.
- `showCloseButton`: exibe o botão de fechar no canto superior. Default: `false`.
- `closeOnOutsideClick`: fecha ao clicar no overlay. Default: `false`.
- `variant`: controla a superfície visual do container.
- `border`: define a borda aplicada ao `StPaper`.
- `borderRadius`: define o raio do container. Default: `1`.
- `elevation`: define a sombra do container. Default: `2`.
- `interactive`: reaproveita o comportamento visual interativo do `StPaper`.
- `bgImage`: aplica imagem de fundo ao container.
- `width` / `height`: controlam dimensões do container.
- `padding`, `paddingSm`, `paddingMd`, `paddingLg`: controlam o espaçamento interno.
- `margin`, `marginSm`, `marginMd`, `marginLg`: controlam o espaçamento externo.
- `className`: injeta classes extras no container do modal.

## Eventos

- `update:open`: retorna `false` quando o modal é fechado por ação interna.
- `close`: emitido junto com o fechamento do modal.

## Exemplo básico

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StButton, StModal, StTypography } from '@startbet/st-core-ui'

const open = ref(false)
</script>

<template>
  <StButton @click="open = true">Abrir modal</StButton>

  <StModal :open="open" width="64" padding="4" @update:open="open = $event">
    <div class="flex flex-col gap-st-3">
      <StTypography as="h2" variant="heading-3">Título do modal</StTypography>
      <StTypography as="p" variant="body-medium"> Conteúdo principal do modal. </StTypography>
      <StButton @click="open = false">Fechar</StButton>
    </div>
  </StModal>
</template>
```

## Exemplo com botão de fechar

```vue
<StModal
  :open="open"
  show-close-button
  close-on-outside-click
  width="64"
  padding="4"
  @update:open="open = $event"
>
  <div class="flex flex-col gap-st-3">
    <p class="m-0">Este modal pode ser fechado pelo botão, clique fora ou Escape.</p>
  </div>
</StModal>
```

## Regras internas

- O componente usa `Teleport` para `body`.
- O conteúdo central é renderizado com `StPaper`, então o modal reaproveita toda a API visual desse componente.
- O fechamento por `Escape` só fica ativo enquanto o modal está aberto.

````

---

### 5.13 StLoading

```markdown
# StLoading

Componente de carregamento da biblioteca para indicar processamento assíncrono com três variações visuais: `arrow`, `spinner` e `cyclical`.

## Import

```ts
import { StLoading } from '@startbet/st-core-ui';
````

## Props principais

- `type`: define o tipo visual do loading. Aceita `arrow`, `spinner` ou `cyclical`.
- `variant`: controla a paleta aplicada ao indicador. Aceita `primary`, `secondary` ou `tertiary`.
- `size`: define o tamanho do container. Aceita `3`, `4`, `6` ou `8`.
- `value`: controla o progresso do modo `cyclical`, com valores de `0` a `100`.
- `className`: permite complementar as classes do container raiz.

## Exemplo básico

```vue
<template>
  <StLoading />
</template>
```

## Exemplo com spinner

```vue
<template>
  <StLoading type="spinner" variant="secondary" size="6" />
</template>
```

## Exemplo com progresso

```vue
<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(72)
</script>

<template>
  <StLoading type="cyclical" :value="progress" size="8" />
</template>
```

## Regras internas

- O componente expõe `role="status"` com `aria-live="polite"` para anunciar o estado de carregamento.
- A prop `value` só afeta a variação `cyclical`.
- Em tamanhos menores, a seta interna é simplificada para preservar legibilidade.

````

---

### 5.14 StList (Conjunto: StUnorderedList / StOrderedList / StListItem)

#### 5.14.1 README geral do conjunto

```markdown
# StList

Conjunto de componentes de lista da biblioteca para compor navegacao, menus e agrupamentos de itens com suporte a orientacao horizontal ou vertical, densidade reduzida e sub-listas aninhadas.

## Import

```ts
import {
  StListItem,
  StOrderedList,
  StUnorderedList
} from '@startbet/st-core-ui';
````

## Componentes disponíveis

- `StListItem`: item base da lista, com suporte a slots, estados e submenu.
- `StOrderedList`: container baseado em `<ol>`.
- `StUnorderedList`: container baseado em `<ul>`.

## Exemplo básico

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList>
    <StListItem clickable>Painel</StListItem>
    <StListItem clickable>Apostas</StListItem>
    <StListItem clickable>Promoções</StListItem>
  </StUnorderedList>
</template>
```

## Exemplo com submenu

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList orientation="horizontal">
    <StListItem clickable>Início</StListItem>
    <StListItem clickable>
      Produtos

      <StUnorderedList>
        <StListItem clickable>Esportes</StListItem>
        <StListItem clickable>Cassino</StListItem>
      </StUnorderedList>
    </StListItem>
  </StUnorderedList>
</template>
```

## Regras internas

- Sub-listas sempre renderizam visualmente em orientacao vertical, mesmo quando a lista pai e horizontal.
- Quando a navegacao principal e horizontal, o `StListItem` abre a primeira sub-lista encontrada via `StDropdown`.
- Quando a navegacao principal e vertical, o `StListItem` expande ou recolhe a sub-lista inline.
- O primeiro `StOrderedList` ou `StUnorderedList` encontrado dentro do slot default de `StListItem` e tratado como submenu.

## Observações

- Os stories do conjunto ficam centralizados em `src/components/list/StList.stories.ts`.
- O submenu usa `StButton`, `StDropdown` e `StIcon`, então os ícones usados no contexto da aplicacao precisam estar registrados.

````

#### 5.14.2 StListItem

```markdown
# StListItem

Item de lista da biblioteca para composicao de navegacao e menus, com suporte a adornos, estados visuais e sub-listas aninhadas.

## Import

```ts
import { StListItem } from '@startbet/st-core-ui';
````

## Props principais

- `size`: controla o padding e a escala tipografica entre `small`, `medium` e `large`. Default: `medium`.
- `dense`: reduz o espacamento interno do item.
- `divider`: aplica divisor inferior e destaque visual na interacao.
- `selected`: aplica o estado selecionado do item.
- `disabled`: bloqueia a interacao do item e do submenu.
- `clickable`: renderiza a area principal como botao.
- `expanded`: controla externamente a abertura do submenu.
- `defaultExpanded`: define o estado inicial do submenu no modo nao controlado.
- `onExpandedChange`: callback executado ao alternar o submenu.
- `onClick`: callback executado ao clicar no item principal.
- `className`: injeta classes extras no elemento raiz.

## Slots

- `default`: conteudo principal do item.
- `startAdornment`: conteudo renderizado no inicio do item.
- `endAdornment`: conteudo renderizado no fim do item.

## Exemplo básico

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList>
    <StListItem clickable>
      <template #startAdornment>
        <span class="text-st-body-small text-st-content-default">D</span>
      </template>

      Dashboard

      <template #endAdornment>
        <span class="text-st-body-small text-st-content-ghost">12</span>
      </template>
    </StListItem>
  </StUnorderedList>
</template>
```

## Exemplo com submenu

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList>
    <StListItem clickable>
      Produtos

      <StUnorderedList>
        <StListItem clickable>Esportes</StListItem>
        <StListItem clickable>Cassino</StListItem>
      </StUnorderedList>
    </StListItem>
  </StUnorderedList>
</template>
```

## Regras internas

- O primeiro `StOrderedList` ou `StUnorderedList` encontrado no slot default e tratado como submenu.
- Em listas verticais, o submenu abre inline.
- Em listas horizontais, o submenu abre via `StDropdown`.
- Quando `clickable=false`, o conteudo principal permanece estatico, mas o submenu continua disponivel quando existir.

````

#### 5.14.3 StOrderedList

```markdown
# StOrderedList

Lista ordenada da biblioteca baseada em `<ol>`, pensada para sequencias numeradas e navegacoes que precisam manter contexto hierarquico com `StListItem`.

## Import

```ts
import { StOrderedList } from '@startbet/st-core-ui';
````

## Props principais

- `orientation`: controla a orientacao da lista entre `vertical` e `horizontal`. Default: `vertical`.
- `dense`: reduz ou remove o gap entre os itens.
- `className`: injeta classes extras no container raiz.

## Exemplo básico

```vue
<script setup lang="ts">
import { StListItem, StOrderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StOrderedList>
    <StListItem clickable>Passo 1</StListItem>
    <StListItem clickable>Passo 2</StListItem>
    <StListItem clickable>Passo 3</StListItem>
  </StOrderedList>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { StListItem, StOrderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StOrderedList orientation="horizontal">
    <StListItem clickable>Início</StListItem>
    <StListItem clickable>Conferência</StListItem>
    <StListItem clickable>Resumo</StListItem>
  </StOrderedList>
</template>
```

## Regras internas

- Quando renderizada dentro de outra lista, a orientacao visual passa a ser vertical automaticamente.
- O contexto interno continua propagando a `navOrientation` da lista pai para o comportamento de submenu do `StListItem`.
- No modo horizontal, a lista remove a numeracao nativa e usa layout flexivel em linha.

````

#### 5.14.4 StUnorderedList

```markdown
# StUnorderedList

Lista não ordenada da biblioteca baseada em `<ul>`, usada para menus, agrupamentos e estruturas de navegacao compostas com `StListItem`.

## Import

```ts
import { StUnorderedList } from '@startbet/st-core-ui';
````

## Props principais

- `orientation`: controla a orientacao da lista entre `vertical` e `horizontal`. Default: `vertical`.
- `dense`: reduz ou remove o gap entre os itens.
- `className`: injeta classes extras no container raiz.

## Exemplo básico

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList>
    <StListItem clickable>Painel</StListItem>
    <StListItem clickable>Bilhetes</StListItem>
    <StListItem clickable>Carteira</StListItem>
  </StUnorderedList>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { StListItem, StUnorderedList } from '@startbet/st-core-ui'
</script>

<template>
  <StUnorderedList orientation="horizontal">
    <StListItem clickable>Início</StListItem>
    <StListItem clickable>Ao vivo</StListItem>
    <StListItem clickable>Promoções</StListItem>
  </StUnorderedList>
</template>
```

## Regras internas

- Quando renderizada dentro de outra lista, a orientacao visual passa a ser vertical automaticamente.
- A `navOrientation` do contexto pai continua sendo propagada para controlar o comportamento de submenu em `StListItem`.
- No modo horizontal, a lista usa layout flexivel com quebra de linha e sem bullets nativos.

````

---

### 5.15 Componentes de Formulário

#### 5.15.1 StCheckbox

```markdown
# StCheckbox

Componente de checkbox da biblioteca para seleção booleana, com suporte a modos controlado e não controlado, label por prop ou slot e encaminhamento de attrs para o `input`.

## Import

```ts
import { StCheckbox } from '@startbet/st-core-ui';
````

## Props principais

- `checked`: controla o estado marcado de forma externa.
- `defaultChecked`: define o estado inicial no modo não controlado.
- `disabled`: desabilita o input. Default: `false`.
- `label`: define o texto do label quando o slot padrão não é usado.
- `className`: injeta classes extras no wrapper.

## Eventos emitidos

- `update:checked`: retorna o novo valor booleano do checkbox.
- `change`: retorna o evento nativo disparado pelo input.

## Exemplo básico

```vue
<script setup lang="ts">
import { StCheckbox } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-col gap-st-2">
    <StCheckbox label="Aceito os termos" />
    <StCheckbox default-checked label="Receber notificações" />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StCheckbox } from '@startbet/st-core-ui'

const checked = ref(false)
</script>

<template>
  <StCheckbox
    :checked="checked"
    label="Ativar modo controlado"
    @update:checked="checked = $event"
  />
</template>
```

## Exemplo com slot

```vue
<script setup lang="ts">
import { StCheckbox } from '@startbet/st-core-ui'
</script>

<template>
  <StCheckbox>
    <span class="text-st-body-small text-st-content-default">
      Quero receber novidades por e-mail
    </span>
  </StCheckbox>
</template>
```

## Regras internas

- O componente usa um `input[type="checkbox"]` real para manter acessibilidade e comportamento nativo.
- Quando `checked` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultChecked` é usado sem `checked`, o estado é gerenciado internamente.
- `class` e `style` passados via attrs são aplicados no wrapper, enquanto os demais attrs são encaminhados ao `input`.

## Observações

- O wrapper é um `label`, então clicar no texto também alterna o checkbox quando ele não está desabilitado.
- Se `label` e slot padrão forem usados ao mesmo tempo, o conteúdo do slot tem prioridade visual.

````

#### 5.15.2 StInput

```markdown
# StInput

Componente de input da biblioteca para entrada textual e numérica, com suporte a modos controlado e não controlado, ícone opcional, máscaras, contador de caracteres e mensagens de feedback.

## Import

```ts
import { StInput } from '@startbet/st-core-ui';
````

## Props principais

- `value`: controla o valor de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `label`: renderiza o texto acima do campo.
- `icon`: nome do ícone exibido dentro do campo.
- `type`: define o tipo do input. Default: `text`.
- `mask`: aplica uma máscara de entrada. Valores disponíveis: `phone-br`, `cpf`.
- `messageInfo`: mensagem exibida quando o campo está válido e não existe `messageSuccess`.
- `messageDanger`: mensagem exibida quando o campo está inválido.
- `messageSuccess`: mensagem exibida quando o campo está válido.
- `maxLength`: habilita o contador de caracteres restantes.
- `disabled`: desabilita o input. Default: `false`.
- `readOnly`: impede edição mantendo o campo focável.
- `placeholder`, `name`, `min`, `max`, `autoComplete`, `required`, `pattern`, `inputMode`: attrs nativos encaminhados ao `input`.
- `className`: injeta classes extras no próprio campo.

## Eventos emitidos

- `update:value`: retorna o valor atual do campo.
- `input`: retorna o evento nativo de input.
- `change`: retorna o evento nativo de change.
- `focus`: retorna o evento de foco.
- `blur`: retorna o evento de blur.
- `keydown`: retorna o evento de teclado ao pressionar.
- `keyup`: retorna o evento de teclado ao soltar.
- `click`: retorna o evento de click do input.

## Métodos expostos

- `focus()`
- `blur()`
- `clear()`
- `setInvalidity()`
- `setValidity()`
- `reportValidity()`

## Exemplo básico

```vue
<script setup lang="ts">
import { StInput } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-col gap-st-3">
    <StInput label="Nome" placeholder="Digite seu nome" />
    <StInput type="email" label="E-mail" placeholder="voce@exemplo.com" auto-complete="email" />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StInput } from '@startbet/st-core-ui'

const value = ref('')
</script>

<template>
  <StInput
    :value="value"
    label="Campo controlado"
    placeholder="Digite algo"
    @update:value="value = String($event)"
  />
</template>
```

## Exemplo com máscara e contador

```vue
<script setup lang="ts">
import { StInput } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-col gap-st-3">
    <StInput type="tel" mask="phone-br" label="Telefone" placeholder="(00) 00000-0000" />
    <StInput max-length="11" label="CPF" mask="cpf" placeholder="000.000.000-00" />
  </div>
</template>
```

## Regras internas

- O componente usa `inheritAttrs: false` para aplicar `class` e `style` no wrapper e encaminhar os demais attrs para o `input`.
- Quando `value` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.
- O contador mostra a quantidade de caracteres restantes com mudança visual quando restam poucos caracteres.
- Quando `type="datetime"`, o tipo real do input é resolvido para `datetime-local`.

## Observações

- A prop `icon` usa `StIcon`, então o ícone precisa estar registrado no contexto de uso da biblioteca.
- `messageSuccess` tem prioridade sobre `messageInfo` quando o campo está válido.
- As máscaras são aplicadas apenas para valores de texto e mantêm o valor emitido já formatado.

````

#### 5.15.3 StOption

```markdown
# StOption

Componente de opção clicável da biblioteca para compor listas de ações e seleções customizadas, com suporte a estado selecionado, adornos opcionais e callback de clique.

## Import

```ts
import { StOption } from '@startbet/st-core-ui';
````

## Props principais

- `value`: define o valor lógico da opção.
- `selected`: aplica o estado visual de seleção. Default: `false`.
- `className`: injeta classes extras no botão da opção.
- `onClick`: callback disparado ao clicar na opção.

## Slots

- `default`: conteúdo principal da opção.
- `startAdornment`: conteúdo exibido antes do texto principal.
- `endAdornment`: conteúdo exibido depois do texto principal.

## Exemplo básico

```vue
<script setup lang="ts">
import { StOption } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex max-w-st-48 flex-col gap-st-1">
    <StOption value="profile">Perfil</StOption>
    <StOption value="settings">Configurações</StOption>
    <StOption value="logout">Sair</StOption>
  </div>
</template>
```

## Exemplo com seleção

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StOption } from '@startbet/st-core-ui'

const selected = ref('settings')
</script>

<template>
  <div class="flex max-w-st-48 flex-col gap-st-1">
    <StOption
      value="profile"
      :selected="selected === 'profile'"
      :on-click="() => (selected = 'profile')"
    >
      Perfil
    </StOption>
    <StOption
      value="settings"
      :selected="selected === 'settings'"
      :on-click="() => (selected = 'settings')"
    >
      Configurações
    </StOption>
  </div>
</template>
```

## Exemplo com adornos

```vue
<script setup lang="ts">
import { StOption } from '@startbet/st-core-ui'
</script>

<template>
  <StOption value="wallet">
    <template #startAdornment>
      <span>R$</span>
    </template>

    Carteira

    <template #endAdornment>
      <span>+</span>
    </template>
  </StOption>
</template>
```

## Regras internas

- O componente renderiza um `button` com `type="button"` para evitar submit acidental em formulários.
- Quando `selected=true`, a opção recebe `aria-pressed="true"` e um estilo visual fixo de seleção.
- `inheritAttrs: false` é usado para filtrar attrs específicos de teclado antes de repassá-los ao botão.
- O `value` é refletido em `data-value`, facilitando integrações e seleção por atributo.

## Observações

- A prop `onClick` é compatível com o padrão legado do componente.
- Listeners passados via attrs, como `@click`, continuam funcionando no botão raiz.

````

#### 5.15.4 StRadio

```markdown
# StRadio

Componente de radio da biblioteca para seleção exclusiva, com suporte a uso isolado ou integrado ao `StRadioGroup`, modo controlado e não controlado, além de label por prop ou slot.

## Import

```ts
import { StRadio } from '@startbet/st-core-ui';
````

## Props principais

- `checked`: controla o estado marcado de forma externa.
- `defaultChecked`: define o estado inicial no modo não controlado.
- `disabled`: desabilita o input. Default: `false`.
- `label`: define o texto do label quando o slot padrão não é usado.
- `className`: injeta classes extras no wrapper.

## Eventos emitidos

- `update:checked`: retorna o novo valor booleano do radio.
- `change`: retorna o evento nativo disparado pelo input.

## Exemplo básico

```vue
<script setup lang="ts">
import { StRadio } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-col gap-st-2">
    <StRadio label="Opção A" name="example" value="a" />
    <StRadio label="Opção B" name="example" value="b" />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StRadio } from '@startbet/st-core-ui'

const checked = ref(false)
</script>

<template>
  <StRadio :checked="checked" label="Modo controlado" @update:checked="checked = $event" />
</template>
```

## Exemplo com grupo

```vue
<script setup lang="ts">
import { StRadio, StRadioGroup } from '@startbet/st-core-ui'
</script>

<template>
  <StRadioGroup default-value="b">
    <StRadio value="a" label="Opção A" />
    <StRadio value="b" label="Opção B" />
    <StRadio value="c" label="Opção C" />
  </StRadioGroup>
</template>
```

## Regras internas

- O componente usa um `input[type="radio"]` real para manter acessibilidade e comportamento nativo.
- Quando `checked` é informado, o componente entra em modo controlado.
- Quando é usado dentro de `StRadioGroup`, o estado marcado passa a depender do `value` compartilhado pelo grupo.
- `class` e `style` passados via attrs são aplicados no wrapper, enquanto os demais attrs são encaminhados ao `input`.

## Observações

- Fora de um grupo, use `name` para manter o comportamento nativo de exclusividade entre radios relacionados.
- Se `label` e slot padrão forem usados ao mesmo tempo, o conteúdo do slot tem prioridade visual.

````

#### 5.15.5 StRadioGroup

```markdown
# StRadioGroup

Componente de agrupamento de radios da biblioteca para seleção única, com suporte a modos controlado e não controlado, propagação de `name` e `disabled`, além de orientação vertical ou horizontal.

## Import

```ts
import { StRadio, StRadioGroup } from '@startbet/st-core-ui';
````

## Props principais

- `name`: define o atributo `name` compartilhado entre os radios do grupo.
- `value`: controla o valor selecionado de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `onValueChange`: callback disparado quando a seleção muda.
- `disabled`: desabilita todos os radios filhos. Default: `false`.
- `dense`: reduz o espaçamento interno entre os itens.
- `orientation`: define a orientação do grupo. Valores: `vertical`, `horizontal`. Default: `vertical`.
- `className`: injeta classes extras no container do grupo.

## Eventos emitidos

- `update:value`: retorna o novo valor selecionado.
- `value-change`: retorna o novo valor selecionado após a mudança.

## Exemplo básico

```vue
<script setup lang="ts">
import { StRadio, StRadioGroup } from '@startbet/st-core-ui'
</script>

<template>
  <StRadioGroup default-value="b">
    <StRadio value="a" label="Opção A" />
    <StRadio value="b" label="Opção B" />
    <StRadio value="c" label="Opção C" />
  </StRadioGroup>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StRadio, StRadioGroup } from '@startbet/st-core-ui'

const value = ref('a')
</script>

<template>
  <StRadioGroup :value="value" @update:value="value = $event">
    <StRadio value="a" label="Opção A" />
    <StRadio value="b" label="Opção B" />
  </StRadioGroup>
</template>
```

## Exemplo horizontal

```vue
<script setup lang="ts">
import { StRadio, StRadioGroup } from '@startbet/st-core-ui'
</script>

<template>
  <StRadioGroup orientation="horizontal">
    <StRadio value="sports" label="Esportes" />
    <StRadio value="casino" label="Cassino" />
    <StRadio value="poker" label="Poker" />
  </StRadioGroup>
</template>
```

## Regras internas

- O componente renderiza um container com `role="radiogroup"`.
- O grupo compartilha `name`, `value` e `disabled` com os radios filhos via `provide/inject`.
- Quando `value` é informado, o grupo entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.

## Observações

- O grupo escuta `change` no container para atualizar a seleção a partir dos radios filhos.
- `aria-disabled` é aplicado apenas quando `disabled=true`.

````

#### 5.15.6 StSelect

```markdown
# StSelect

Componente de select customizado da biblioteca para seleção única, com suporte a modos controlado e não controlado, opções via prop ou slot, ícone opcional, mensagens de feedback e integração com formulários.

## Import

```ts
import { StOption, StSelect } from '@startbet/st-core-ui';
````

## Props principais

- `value`: controla o valor selecionado de forma externa.
- `defaultValue`: define o valor inicial no modo não controlado.
- `onValueChange`: callback executado a cada mudança de seleção, recebendo o valor escolhido.
- `options`: lista de opções no formato `{ name, value }`.
- `label`: renderiza o texto acima do select.
- `icon`: nome do ícone exibido no trigger.
- `placeholder`: texto exibido quando não há valor selecionado. Default: `Selecione uma opção`.
- `name`: cria um `input[type="hidden"]` para integração com formulários.
- `required`: marca o campo como obrigatório e afeta o estado de validação.
- `disabled`: desabilita a interação. Default: `false`.
- `readOnly`: impede alteração do valor mantendo o campo focável.
- `messageInfo`: mensagem exibida quando o campo está válido e não existe `messageSuccess`.
- `messageDanger`: mensagem exibida quando o campo está inválido.
- `messageSuccess`: mensagem exibida quando o campo está válido.
- `className`: injeta classes extras no wrapper do componente.
- `panelClassName`: injeta classes extras no painel de opções.
- `placement`: define o posicionamento preferencial do dropdown.
- `offset`: define o espaçamento entre trigger e painel. Default: `8`.
- `closeOnSelect`: fecha o painel ao selecionar uma opção. Default: `true`.

## Eventos emitidos

- `update:value`: retorna o novo valor selecionado.
- `value-change`: retorna o novo valor selecionado após a mudança.

## Métodos expostos

- `focus()`
- `blur()`
- `clear()`
- `setInvalidity()`
- `setValidity()`
- `reportValidity()`

## Exemplo básico

```vue
<script setup lang="ts">
import { StSelect } from '@startbet/st-core-ui'

const options = [
  { name: 'Esportes', value: 'sports' },
  { name: 'Cassino', value: 'casino' },
  { name: 'Poker', value: 'poker' }
]
</script>

<template>
  <StSelect label="Categoria" placeholder="Selecione uma categoria" :options="options" />
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StSelect } from '@startbet/st-core-ui'

const value = ref('casino')
</script>

<template>
  <StSelect
    :value="value"
    label="Campo controlado"
    :options="[
      { name: 'Esportes', value: 'sports' },
      { name: 'Cassino', value: 'casino' }
    ]"
    @update:value="value = String($event)"
  />
</template>
```

## Exemplo com slot

```vue
<script setup lang="ts">
import { StOption, StSelect } from '@startbet/st-core-ui'
</script>

<template>
  <StSelect label="Seleção com slot">
    <StOption value="profile">Perfil</StOption>
    <StOption value="wallet">Carteira</StOption>
    <StOption value="settings">Configurações</StOption>
  </StSelect>
</template>
```

## Regras internas

- O componente usa `StDropdown` em modo `triggerAsChild` para controlar abertura, fechamento e posicionamento do painel.
- Quando `value` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultValue` é usado sem `value`, o estado é gerenciado internamente.
- As opções podem ser fornecidas por `options` ou por slot com `StOption`.
- Quando `name` é informado, o valor atual também é refletido em um `input[type="hidden"]`.

## Observações

- A prop `icon` e o chevron do trigger usam `StIcon`, então os ícones precisam estar registrados no contexto de uso da biblioteca.
- `messageSuccess` tem prioridade sobre `messageInfo` quando o campo está válido.
- Quando `closeOnSelect=false`, o painel permanece aberto após a seleção.

````

#### 5.15.7 StSwitch

```markdown
# StSwitch

Componente de switch da biblioteca para alternância booleana, com suporte a modos controlado e não controlado, label por prop ou slot e ícones opcionais nos estados ligado e desligado.

## Import

```ts
import { StSwitch } from '@startbet/st-core-ui';
````

## Props principais

- `checked`: controla o estado ligado de forma externa.
- `defaultChecked`: define o estado inicial no modo não controlado.
- `disabled`: desabilita o input. Default: `false`.
- `label`: define o texto do label quando o slot padrão não é usado.
- `iconOff`: nome do ícone exibido no lado desligado.
- `iconOn`: nome do ícone exibido no lado ligado.
- `className`: injeta classes extras no wrapper.

## Eventos emitidos

- `update:checked`: retorna o novo valor booleano do switch.
- `change`: retorna o evento nativo disparado pelo input.

## Exemplo básico

```vue
<script setup lang="ts">
import { StSwitch } from '@startbet/st-core-ui'
</script>

<template>
  <div class="flex flex-col gap-st-2">
    <StSwitch label="Receber notificações" />
    <StSwitch default-checked label="Modo turbo" />
  </div>
</template>
```

## Exemplo controlado

```vue
<script setup lang="ts">
import { ref } from 'vue'

import { StSwitch } from '@startbet/st-core-ui'

const checked = ref(false)
</script>

<template>
  <StSwitch :checked="checked" label="Modo controlado" @update:checked="checked = $event" />
</template>
```

## Exemplo com ícones

```vue
<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

import { StSwitch } from '@startbet/st-core-ui'

library.add(faCheck, faXmark)
</script>

<template>
  <StSwitch label="Ativar confirmações visuais" icon-off="xmark" icon-on="check" />
</template>
```

## Regras internas

- O componente usa um `input[type="checkbox"]` real com `role="switch"` para manter acessibilidade e comportamento nativo.
- Quando `checked` é informado, o componente entra em modo controlado e depende da atualização externa da prop.
- Quando `defaultChecked` é usado sem `checked`, o estado é gerenciado internamente.
- `class` e `style` passados via attrs são aplicados no wrapper, enquanto os demais attrs são encaminhados ao `input`.

## Observações

- O wrapper é um `label`, então clicar no texto também alterna o switch quando ele não está desabilitado.
- Se `label` e slot padrão forem usados ao mesmo tempo, o conteúdo do slot tem prioridade visual.
- Os ícones exibidos em `iconOff` e `iconOn` dependem do registro prévio no Font Awesome usado pela aplicação consumidora.

````

---

## 6. COMPOSABLES E UTILS

### 6.1 useCheckableControl

Arquivo: `src/composables/useCheckableControl.ts`

**Propósito**: Composable reutilizado por `StCheckbox`, `StRadio` e `StSwitch` para gerenciar o ciclo de vida de inputs "checáveis" (controlado/não-controlado, label dinâmico, attrs filtrados).

**Assinatura**:
```ts
export const useCheckableControl = <T extends CheckableControlProps>(
  props: T,
  emitters: {
    updateChecked: (checked: boolean) => void;
    change: (event: Event) => void;
  }
) => {
  isControlled: ComputedRef<boolean>;
  internalChecked: Ref<boolean>;
  checkedValue: ComputedRef<boolean>;
  hasLabel: ComputedRef<boolean>;    // verifica slot.default OU prop.label
  inputAttrs: ComputedRef<Record<string, unknown>>;   // filtra class/style
  handleChange: (event: Event) => void;
  attrs: ReturnType<typeof useAttrs>;
};
````

**Tipos internos**:

```ts
type CheckableControlProps = {
  checked?: boolean
  defaultChecked?: boolean
  label?: string
}
```

**Regras**:

- `checked !== undefined` → modo controlado (usa props.checked via `Boolean`)
- senão → usa `internalChecked` inicializado com `defaultChecked ?? false`
- `hasLabel` verifica se slot default tem nós OU se prop.label tem length>0
- `inputAttrs` faz spread de `useAttrs()` e remove `class` + `style` (para o input nativo não herdar wrapper classes)
- `handleChange` lê `target.checked` do HTMLInputElement; se não existir, inverte `checkedValue`. Atualiza `internalChecked` apenas se não for controlado. Emite `updateChecked(next)` + `change(event)`.

---

### 6.2 useListContainer

Arquivo: `src/composables/useListContainer.ts`

**Propósito**: Composable usado por `StOrderedList` e `StUnorderedList` para gerenciar contexto de lista (provide/inject), nível de aninhamento e orientação de navegação.

**Assinatura**:

```ts
export const useListContainer = <T extends ListContainerProps>(
  props: T,
  buildClasses: (props: T, renderOrientation: StListNavOrientation) => string
) => {
  classes: ComputedRef<string>
  wrapperClass: ComputedRef<string> // classes + attrs.class (normalizado)
  wrapperStyle: ComputedRef<unknown> // attrs.style
  listAttrs: ComputedRef<Record<string, unknown>> // attrs sem class/style
}
```

**Tipos internos**:

```ts
type ListContainerProps = {
  className?: string
  orientation?: 'vertical' | 'horizontal'
}
```

**Regras**:

- `navOrientation`: se existe contexto pai, herda `parentContext.navOrientation`; senão usa `props.orientation ?? 'vertical'`
- `renderOrientation`: se existe pai, sempre `'vertical'` (sub-listas sempre verticais visualmente); senão usa `navOrientation`
- `level`: (parentContext.level ?? 0) + 1
- Fornece `provide(stListContextKey, { navOrientation, level })` reativo via `reactive` + `watch`
- `listAttrs` remove `class` e `style` de `attrs`
- `wrapperClass` normaliza com `normalizeClass([classes.value, attrs.class])`

---

### 6.3 spacingShorthand

Arquivo: `src/utils/spacingShorthand.ts`

**Propósito**: Converte shorthand de espaçamento no estilo CSS (1/2/3/4 valores) em classes Tailwind prefixadas com `st-*`, com suporte opcional a prefixo responsivo (`sm:`, `md:`, `lg:`).

**Funções e constantes exportadas**:

```ts
export const sizeClassSuffixes: Record<SizeValue, string>
export const createSizeClasses: (prefix: 'w' | 'h') => Record<SizeValue, string>
export const sizeWidthClasses: Record<SizeValue, string> // createSizeClasses('w')
export const sizeHeightClasses: Record<SizeValue, string> // createSizeClasses('h')
export const spacingShorthandToClasses: (
  value: string | undefined,
  rule: 'p' | 'm',
  responsivePrefix?: 'sm' | 'md' | 'lg'
) => string[]
```

**Mapeamento SizeValue → suffix** (exemplos):

| SizeValue       | suffix   |
| --------------- | -------- |
| `'1'`           | `st-1`   |
| `'12'`          | `st-12`  |
| `'160'`         | `st-160` |
| `'240'`         | `st-240` |
| `'auto'`        | `auto`   |
| `'full'`        | `full`   |
| `'fit-content'` | `fit`    |
| `'min-content'` | `min`    |
| `'max-content'` | `max`    |

**Regras do spacingShorthandToClasses**:

- Valor vazio/undefined → `[]`
- Aplica `toValueSuffix` em cada parte: `'0' → '0'`, `'auto' → 'auto'`, senão `'st-${value}'`
- 1 valor: `['{prefix}{rule}-{v0}']` — ex: `padding="2"` → `['p-st-2']`
- 2 valores: `['{prefix}{rule}y-{v0}', '{prefix}{rule}x-{v1}']` — ex: `padding="2 4"` → `['py-st-2', 'px-st-4']`
- 3 valores: `['{prefix}{rule}t-{v0}', '{prefix}{rule}x-{v1}', '{prefix}{rule}b-{v2}']`
- 4 valores: `['{prefix}{rule}t-{v0}', '{prefix}{rule}r-{v1}', '{prefix}{rule}b-{v2}', '{prefix}{rule}l-{v3}']`
- `responsivePrefix` define prefixo antes de cada classe: ex `mdPadding="3"` → `'md:p-st-3'`

---

### 6.4 inputMask (applyInputMask)

Arquivo: `src/utils/inputMask.ts`

**Propósito**: Aplica máscaras de formatação BR para valores de texto usados no `StInput`.

**Export**:

```ts
export const applyInputMask = (
  mask: StInputMask | undefined, // 'phone-br' | 'cpf'
  value: string
) => string
```

**Máscara `phone-br`** (até 11 dígitos):

- ≤2 dígitos → `(${digits}`
- ≤6 → `(${d0d1}) ${resto}`
- ≤10 → `(${d0d1}) ${d2d3d4d5}-${resto}`
- 11 → `(${d0d1}) ${d2d3d4d5d6}-${resto}` (9º dígito extra)

**Máscara `cpf`** (até 11 dígitos):

- ≤3 → dígitos puros
- ≤6 → `d0d1d2.d3d4d5${resto}`
- ≤9 → `d0d1d2.d3d4d5.d6d7d8${resto}`
- 11 → `d0d1d2.d3d4d5.d6d7d8-d9d10`

---

### 6.5 splitTextIntoLines

Arquivo: `src/utils/splitTextIntoLines.ts`

**Propósito**: Divide um texto em `N` linhas com distribuição balanceada de palavras. Usado pelo `StTypography` na prop `lines` (especialmente `hero-title`).

**Export**:

```ts
export const splitTextIntoLines = (text: string, lineCount: number) => string[];
```

**Algoritmo**:

1. `normalized = max(1, trunc(lineCount))`. Se `≤1` → `[text.trim()]`
2. Split por whitespace → palavras (filtra vazias)
3. `cappedLines = min(normalized, palavras.length)`
4. `base = floor(palavras / cappedLines)`, `remainder = palavras % cappedLines`
5. Cada linha `i` recebe `base + (i < remainder ? 1 : 0)` palavras (primeiras linhas recebem 1 palavra extra)
6. Retorna array de strings (linhas unidas por espaço)

---

## 7. GUIDE DE ESPAÇAMENTOS E TIPOGRAFIA

Baseado em: Spacing.stories.ts + Typography.stories.ts + tailwind-theme.ts

### 7.1 Escala completa de espaçamentos (tokens)

Fonte: `Spacing.stories.ts` (valores em px, base 16px)

| Token Tailwind | Valor em px | Observação                     |
| -------------- | ----------- | ------------------------------ |
| `st-xs`        | 12px        | Tamanho tipográfico            |
| `st-sm`        | 14px        | Tamanho tipográfico            |
| `st-base`      | 16px        | Tamanho tipográfico            |
| `st-md`        | 18px        | Tamanho tipográfico            |
| `st-lg`        | 20px        | Tamanho tipográfico            |
| `st-xl`        | 24px        | Tamanho tipográfico            |
| `st-2xl`       | 30px        | Tamanho tipográfico            |
| `st-3xl`       | 36px        | Tamanho tipográfico            |
| `st-4xl`       | 48px        | Tamanho tipográfico            |
| `st-5xl`       | 60px        | Tamanho tipográfico            |
| `st-6xl`       | 72px        | Tamanho tipográfico            |
| `st-7xl`       | 80px        | Tamanho tipográfico            |
| `st-1`         | 8px         | Espaçamento numérico (8-point) |
| `st-2`         | 16px        |                                |
| `st-3`         | 24px        |                                |
| `st-4`         | 32px        |                                |
| `st-5`         | 40px        |                                |
| `st-6`         | 48px        |                                |
| `st-7`         | 56px        |                                |
| `st-8`         | 64px        |                                |
| `st-9`         | 72px        |                                |
| `st-10`        | 80px        |                                |
| `st-11`        | 88px        |                                |
| `st-12`        | 96px        |                                |
| `st-15`        | 120px       |                                |
| `st-16`        | 128px       |                                |
| `st-20`        | 160px       |                                |
| `st-24`        | 192px       |                                |
| `st-30`        | 240px       |                                |
| `st-32`        | 256px       |                                |
| `st-40`        | 320px       |                                |
| `st-48`        | 384px       |                                |
| `st-56`        | 448px       |                                |
| `st-64`        | 512px       |                                |
| `st-72`        | 584px       |                                |
| `st-80`        | 640px       |                                |
| `st-96`        | 768px       |                                |
| `st-128`       | 1024px      |                                |
| `st-144`       | 1152px      |                                |
| `st-160`       | 1280px      |                                |
| `st-168`       | 1344px      |                                |
| `st-240`       | 1920px      | Full HD width                  |

**Aplicação**:

- Margin: `m-st-4`, `mx-auto`, `my-st-2`
- Padding: `p-st-3`, `px-st-4`
- Gap (grid/flex): `gap-st-2`, `gap-x-st-3`
- Width/Height: `w-st-64`, `h-st-12`
- Responsivo: `md:p-st-6`, `lg:gap-st-4`

### 7.2 Famílias tipográficas

| Classe Tailwind     | Família             | Uso recomendado                                                         |
| ------------------- | ------------------- | ----------------------------------------------------------------------- |
| `font-st-heading`   | Base Neue Condensed | Headings do Design System                                               |
| `font-st-highlight` | Base Neue Condensed | Textos de destaque, títulos com mais personalidade (geralmente itálico) |
| `font-st-body`      | Montserrat          | Textos corridos, descrições e apoio                                     |

**Import**:

```ts
import '@startbet/st-core-ui/base-neue.css' // Base Neue (Condensed/Default/Wide)
import '@startbet/st-core-ui/montserrat.css' // Montserrat
```

### 7.3 Escala tipográfica semântica (fontSize + lineHeight + fontWeight)

| Variante (StTypography) | Classe Tailwind            | Font Size       | Line Height | Font Weight |
| ----------------------- | -------------------------- | --------------- | ----------- | ----------- |
| `hero-title`            | `text-st-hero-title`       | 3rem (48px)     | 1.5         | 800         |
| `heading-1`             | `text-st-heading-1`        | 3rem (48px)     | 1.1         | 800         |
| `heading-2`             | `text-st-heading-2`        | 2.25rem (36px)  | 1.1         | 800         |
| `heading-3`             | `text-st-heading-3`        | 1.875rem (30px) | 1.25        | 800         |
| `heading-4`             | `text-st-heading-4`        | 1.5rem (24px)   | 1.25        | 800         |
| `highlight-large`       | `text-st-highlight-large`  | 1.5rem (24px)   | 1.5         | 600         |
| `highlight-medium`      | `text-st-highlight-medium` | 1.125rem (18px) | 1.5         | 600         |
| `body-large`            | `text-st-body-large`       | 1.125rem (18px) | 1.75        | 400         |
| `body-medium`           | `text-st-body-medium`      | 1rem (16px)     | 1.75        | 400         |
| `body-small`            | `text-st-body-small`       | 0.875rem (14px) | 1.5         | 400         |

### 7.4 Tokens auxiliares de tipografia

**Line Heights**:

| Token                | Valor | Uso                 |
| -------------------- | ----- | ------------------- |
| `leading-st-tight`   | 1.1   | Headings densos     |
| `leading-st-snug`    | 1.25  | Headings médios     |
| `leading-st-normal`  | 1.5   | Textos compactos    |
| `leading-st-relaxed` | 1.75  | Body text padrão    |
| `leading-st-loose`   | 2     | Textos bem arejados |

**Letter Spacing (tracking)**:

| Token                | Valor    |
| -------------------- | -------- |
| `tracking-st-tight`  | -0.025em |
| `tracking-st-normal` | 0        |
| `tracking-st-wide`   | 0.025em  |
| `tracking-st-wider`  | 0.05em   |

---

## ANEXO A: SEMANTIC RELEASE (resumo)

Arquivo: `SEMANTIC_RELEASE_SETUP.md`

**Branches**:

- `main` → releases de produção
- `develop` → prereleases beta

**Tipos de commit → bump**:

| Tipo                                                 | Bump                  | Exemplo                                            |
| ---------------------------------------------------- | --------------------- | -------------------------------------------------- |
| `feat(*)`                                            | Minor (0.1.0 → 0.2.0) | `feat(button): adicionar variante outline`         |
| `fix(*)` / `perf` / `revert` / `refactor`            | Patch (0.1.0 → 0.1.1) | `fix(tokens): corrigir token hover`                |
| `BREAKING CHANGE:` no footer                         | Major (1.0.0 → 2.0.0) | `feat(api): mudar estrutura. BREAKING CHANGE: ...` |
| `docs` / `style` / `chore` / `test` / `build` / `ci` | Sem release           | `docs: atualizar README`                           |

**Plugins**: commit-analyzer, release-notes-generator, changelog, npm, git, github.

---

## ANEXO B: CHANGELOG — Últimas versões (topo)

Arquivo: `CHANGELOG.md` (extraídas primeiras entradas)

| Versão     | Data       | Descrição                                           |
| ---------- | ---------- | --------------------------------------------------- |
| **0.23.0** | 2026-07-10 | **feat(tooltip):** add new component (#36)          |
| **0.22.0** | 2026-07-10 | **feat(modal):** add new component (#35)            |
| **0.21.0** | 2026-07-09 | **feat(loading):** add new component (#34)          |
| **0.20.0** | 2026-07-09 | **feat(list):** add new component (#33)             |
| **0.19.0** | 2026-07-09 | **feat(grid):** add new component (#32)             |
| **0.18.0** | 2026-07-09 | **feat(switch):** add new component (#31)           |
| **0.17.0** | 2026-07-09 | **feat(select):** add new component (#30)           |
| **0.16.0** | 2026-07-07 | **feat(radio):** add new component (#29)            |
| **0.15.0** | 2026-07-07 | **new st option** (#28)                             |
| **0.14.0** | 2026-07-07 | **new st input** (#27)                              |
| **0.13.0** | 2026-07-07 | **new st checkbox** (#26)                           |
| **0.12.1** | 2026-07-07 | **fix(dropdown):** fixing problem with w-auto (#25) |
| **0.12.0** | 2026-07-07 | **new st dropdown** (#24)                           |
| **0.11.0** | 2026-07-07 | **new st chip** (#23)                               |

---

> Documentação consolidada gerada a partir dos arquivos fonte de `@startbet/st-core-ui` em 2026-08-20. Estrutura: README raiz + tokens README + CSS README → tailwind-theme.ts (código inteiro) → tokens.css (tabela completa light/dark) → exports públicos src/index.ts → READMEs INTEIROS de cada componente → composables/utils → spacing/typography guide → anexos release/changelog.
