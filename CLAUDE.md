# Instruções para a IA

Este repositório é um **playground de protótipos** da StartBet. O produto final
de qualquer tarefa aqui é uma tela que parece ter saído do design system
`@startbet/st-core-ui` — não uma tela que só funciona.

Leia antes de escrever código:

- [`docs/componentes.md`](docs/componentes.md) — props, eventos e slots de cada componente.
- [`docs/tokens.md`](docs/tokens.md) — quais classes usar para cor, espaço e texto.
- [`docs/receitas.md`](docs/receitas.md) — padrões prontos (página, grid, formulário, modal, lista).

Storybook oficial: <https://startbet.github.io/st-core-ui/>

## Como decidir o que usar

Antes de escrever uma `<div>` com classes, procure o componente:

| Preciso de…                     | Use                                                             |
| ------------------------------- | --------------------------------------------------------------- |
| qualquer texto                  | `StTypography` (`variant`, não `text-*`)                        |
| card, painel, faixa, superfície | `StPaper` (`variant`, `border`, `elevation`, `padding`)         |
| colunas responsivas             | `StGrid` (`cols`, `mdCols`, `gap`)                              |
| ação                            | `StButton` / `StButtonGroup`                                    |
| campo de formulário             | `StInput`, `StSelect`, `StCheckbox`, `StRadioGroup`, `StSwitch` |
| contador, tag, progresso        | `StBadge`, `StChip`, `StProgressBar`, `StLoading`               |
| menu, dica, diálogo             | `StDropdown`, `StTooltip`, `StModal` (+ `useStModal`)           |
| lista                           | `StUnorderedList` / `StOrderedList` + `StListItem`              |
| ícone                           | `StIcon` (registre em `app/plugins/stIcons.ts`)                 |
| ilustração / logo               | `StIllustration` (`brands/logo_dark`, `brands/logo_light`)      |
| carrossel                       | `StCarousel` (+ `StBullets`)                                    |

`<div>` e `<span>` ficam reservados para layout (`flex`, `grid`, alinhamento).

## Faça

- Importe nominalmente: `import { StButton } from '@startbet/st-core-ui'`.
- Espaçamento com tokens: `gap-st-2`, `p-st-3`, `mt-st-4`, `max-w-st-160`.
- Cor com tokens semânticos: `bg-st-surface-0`, `text-st-content-ghost`,
  `border-st-border-1`.
- `<script setup lang="ts">` com props tipadas e `defineOptions({ name })`.
- Um componente por arquivo, em pasta kebab-case sob `app/components/`.
- Textos de UI em português.
- Importe componentes locais pelo caminho do `.vue`
  (`~/components/promocoes/PromocoesLista.vue`).

## Não faça

- Não escreva `#hex`, `rgb()`, `hsl()` nem cores do Tailwind (`bg-slate-800`,
  `text-blue-500`). Elas não acompanham a troca de tema.
- Não escreva tamanho de texto à mão (`text-2xl`, `font-bold`, `leading-7`) —
  use a `variant` do `StTypography`.
- Não use espaçamento do Tailwind puro (`p-4`, `gap-6`, `mt-8`) — use `*-st-*`.
- Não crie variantes `dark:`. Os tokens já resolvem os dois temas.
- Não adicione bloco `<style>` em componente nem regra nova em `main.css` sem
  necessidade real.
- Não crie `index.ts` de barril em `app/components/` (quebra o auto-import do
  Nuxt com aviso de nome duplicado).
- Não instale biblioteca de UI, de ícones ou de CSS nova.
- Não altere `amplify.yml`, o `publicAssets` do `nuxt.config.ts` nem o
  `safelist` do `tailwind.config.ts` sem motivo explícito — os comentários nesses
  arquivos explicam por que estão daquele jeito.
- Não tente consertar os avisos de _hydration mismatch_ dos ícones: é limitação
  da lib publicada (ver "Armadilhas conhecidas" no README).

## Antes de dizer que terminou

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npm test
```

Os três precisam passar — o hook de pre-push roda exatamente isso. Se a tarefa
mexeu em layout ou build, rode também:

```bash
NITRO_PRESET=static npm run generate
```

## Checklist de revisão

1. Todo texto está em `StTypography`?
2. Toda superfície está em `StPaper` (ou num componente da lib)?
3. Alguma cor, espaço ou tamanho de fonte fora dos tokens `st-*`?
4. Ícones novos foram registrados em `app/plugins/stIcons.ts`?
5. A tela funciona nos dois temas (o alternador está no canto superior direito)?
6. Funciona em mobile (`cols`/`mdCols` do StGrid, `flex-wrap`, `md:` nos paddings)?
7. `lint`, `typecheck` e `test` passando?
