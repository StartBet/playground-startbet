# Playground · st-core-ui

Ambiente de protótipos da StartBet. A ideia é simples: pedir uma tela para uma
IA generativa e receber de volta uma página **já dentro do design system**, sem
CSS inventado e sem cor solta. Caso necessário algum componente não disponível
no design system, pode criar mas utilizando as classes e tokens do design system.
**Evitar ao máximo criar algo novo!**

- **Stack:** Nuxt 4 · Vue 3 · TypeScript · Tailwind CSS 3
- **Design system:** [`@startbet/st-core-ui`](https://startbet.github.io/st-core-ui/) v0.32.0
- **Saída:** site estático (`nuxt generate`), publicado via AWS Amplify

## Índice da documentação

| Arquivo                                                          | Para quê                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Este README                                                      | Setup, scripts, estrutura e as regras do projeto.                              |
| [`CLAUDE.md`](CLAUDE.md)                                         | Instruções para a IA que vai editar o projeto.                                 |
| [`docs/componentes.md`](docs/componentes.md)                     | Os 25 componentes do st-core-ui: props, eventos, slots e exemplo.              |
| [`docs/tokens.md`](docs/tokens.md)                               | Cores, superfícies, espaçamentos, tipografia e as classes `st-*`.              |
| [`docs/receitas.md`](docs/receitas.md)                           | Padrões prontos: página, grid de cards, formulário, modal, lista, tema, ícone. |
| [`docs/st-core-ui-referencia.md`](docs/st-core-ui-referencia.md) | Referência longa consolidada da lib, para consulta pontual.                    |

## Começando

Requer Node 22+.

```bash
npm install
```

```bash
npm run dev
```

A aplicação sobe em <http://localhost:3000>.

> Em `nuxt dev` as fontes `Base Neue` e `Montserrat` dão 404 porque o Vite
> intercepta `/assets/*`. É esperado — o texto cai na fonte de sistema e só
> aparece correto no build. Veja [Armadilhas conhecidas](#armadilhas-conhecidas).

## Scripts

| Comando                 | O que faz                                |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento              |
| `npm run generate`      | Gera o site estático em `.output/public` |
| `npm run preview`       | Serve o build local                      |
| `npm run lint`          | ESLint (config do Nuxt + Prettier)       |
| `npm run lint:fix`      | ESLint com correção automática           |
| `npm run format`        | Prettier em todo o projeto               |
| `npm run typecheck`     | `vue-tsc --noEmit`                       |
| `npm test`              | Vitest (happy-dom)                       |
| `npm run test:watch`    | Vitest em watch                          |
| `npm run test:coverage` | Vitest com cobertura                     |

Os hooks do husky rodam `lint-staged` no **pre-commit** e
`lint` + `typecheck` + `test` no **pre-push**. Antes de considerar uma tarefa
pronta, rode os três.

Para gerar o build igual ao do deploy:

```bash
NITRO_PRESET=static npm run generate
```

## Estrutura

```
app/
├── app.vue                    # raiz: data-theme, <title>, favicon
├── assets/css/main.css        # tokens + fontes + Tailwind + .st-container
├── components/
│   ├── home/                  # seções da home (hero, docs)
│   ├── showcase/              # cards de demonstração dos componentes
│   └── theme-switch/          # alternador de tema (usa StSwitch)
├── composables/
│   ├── useStIconLibrary.ts    # registra ícones no Font Awesome
│   └── useStModal.ts          # controla StModal por nome
├── layouts/default.vue        # shell: theme switch fixo + rodapé
├── pages/index.vue            # a home
├── plugins/stIcons.ts         # ÚNICO lugar onde ícones são registrados
├── services/themeService.ts   # tema light/dark
├── stores/modalStore.ts       # registro global de modais abertos
└── tests/setup.ts             # stubs globais do Vitest

docs/                          # documentação do design system
nuxt.config.ts                 # fontes em /assets/fonts, runtimeConfig
tailwind.config.ts             # tema da lib + safelist das classes dinâmicas
amplify.yml                    # pipeline de build/deploy
```

## Como o st-core-ui está integrado

Este projeto usa o **cenário "Tailwind próprio"** documentado pela lib — não o
`style.css` pronto:

1. [`tailwind.config.ts`](tailwind.config.ts) faz merge de `stTailwindTheme` em
   `theme.extend` e adiciona `stTailwindPlugins`. O `content` inclui
   `node_modules/@startbet/st-core-ui/dist/**` para que as classes usadas dentro
   da lib entrem no CSS final.
2. [`app/assets/css/main.css`](app/assets/css/main.css) importa `tokens.css`
   (variáveis de cor por tema), `base-neue.css` e `montserrat.css` (fontes), e
   só depois as diretivas `@tailwind`.
3. [`nuxt.config.ts`](nuxt.config.ts) publica os arquivos de fonte do pacote em
   `/assets/fonts`, porque o CSS da lib os referencia por caminho relativo e o
   Vite não reescreve essa URL.
4. [`app/plugins/stIcons.ts`](app/plugins/stIcons.ts) registra no Font Awesome
   todos os ícones que o projeto usa.

Componentes são importados nominalmente, nunca globalmente:

```vue
<script setup lang="ts">
import { StButton, StPaper, StTypography } from '@startbet/st-core-ui'
</script>
```

## Regras do projeto

1. **Componente da lib antes de HTML cru.** Texto é `StTypography`, caixa é
   `StPaper`, botão é `StButton`. `<div>` só para layout.
2. **Só tokens `st-*` para cor, espaçamento e texto.** Nada de `#hex`,
   `rgb()`, `bg-slate-800`, `text-2xl`, `p-4`. Utilitários de layout do Tailwind
   (`flex`, `grid`, `items-center`, `hidden`) seguem liberados.
3. **Ícone novo → registre em `app/plugins/stIcons.ts`.** Sem isso ele
   simplesmente não aparece, e nenhum erro é lançado.
4. **Nada de CSS global novo.** Estilize por props do componente e classes
   utilitárias. `main.css` só cresce se algo for realmente usado em toda página.
5. **Componentes da lib usam o prefixo `St`; componentes locais, não.** Assim
   dá para saber de onde vem cada coisa lendo o template.
6. **Um arquivo por componente**, em pasta kebab-case, com `defineOptions({ name })`
   e props tipadas em `Componente.interface.ts`. Sem `index.ts` de barril dentro
   de `app/components/` (conflita com o auto-import do Nuxt).
7. **Português nos textos de UI, comentários e nomes de domínio.** Nomes de
   componentes, props e tipos seguem o inglês da lib.

## Armadilhas conhecidas

**Classes montadas em runtime.** Props como `padding`, `margin`, `gap` e `cols`
(StPaper, StGrid, StModal) viram classes por concatenação dentro da lib, então o
scanner do Tailwind não as vê. O `safelist` em
[`tailwind.config.ts`](tailwind.config.ts) cobre esses padrões — se um caso novo
aparecer sem estilo, é lá que se resolve.

**Fontes em `nuxt dev`.** O CSS da lib pede as fontes em `/assets/fonts/...`; o
Nitro as publica no build, mas em dev o Vite intercepta esse caminho e devolve 404. Só o build (`npm run generate`) mostra a tipografia correta.

**Ícones não aparecem no HTML pré-renderizado.** O `@startbet/st-core-ui`
empacota o Font Awesome dentro do próprio bundle, e o FA compartilha os ícones
registrados por um objeto global no `window`. Como no servidor não existe
`window`, o `library.add` da aplicação não alcança a cópia da lib: os ícones só
aparecem depois da hidratação, e o Vue registra avisos de _hydration mismatch_
no console. É limitação da versão publicada da lib — não tente "consertar" no
projeto.

**Tema.** É o atributo `data-theme` no `<html>` que liga os tokens. Ele é
emitido no `useHead` de [`app/app.vue`](app/app.vue) e atualizado em runtime
pelo [`themeService`](app/services/themeService.ts). Não crie variantes `dark:`
do Tailwind — os tokens já resolvem os dois temas.

## Deploy

[`amplify.yml`](amplify.yml) força `NITRO_PRESET=static` para que a rota `/`
seja pré-renderizada em `index.html` (com o preset que o Amplify injeta por
padrão a home ficaria só na função SSR e o arquivo nunca existiria). O build
roda `lint` e `test` antes de gerar, e publica `.output/public`.
