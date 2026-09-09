# Tokens e classes utilitárias

Tudo que este projeto usa de cor, espaçamento, raio, sombra e tipografia vem do
tema do `@startbet/st-core-ui`, que é injetado no `theme.extend` do
[`tailwind.config.ts`](../tailwind.config.ts).

A regra prática: **se a classe não tem `st-` no nome, provavelmente é a classe
errada.** Utilitários de layout (`flex`, `grid`, `items-center`, `hidden`,
`sticky`, `w-full`, `max-w-*`) continuam sendo os do Tailwind puro — só cor,
espaçamento e texto é que precisam ser tokens.

## Cor

O tema define os tokens em `rgb(var(--st-color-*))`, e o valor de cada variável
muda conforme o atributo `data-theme` do `<html>` (`dark` é o padrão deste
projeto). Por isso **nunca** escreva hex, `rgb()` ou cores do Tailwind
(`bg-slate-800`): elas não acompanham a troca de tema.

### Superfícies — `bg-st-surface-*`

| Classe                         | Uso típico                              |
| ------------------------------ | --------------------------------------- |
| `bg-st-surface-0`              | cards e painéis sobre o fundo da página |
| `bg-st-surface-1`              | fundo da página                         |
| `bg-st-surface-2`              | blocos internos, hover de lista         |
| `bg-st-surface-3`              | blocos mais afundados                   |
| `bg-st-surface-4`              | faixas de destaque / rodapés            |
| `bg-st-surface-primary`        | destaque de marca                       |
| `bg-st-surface-secondary`      | destaque secundário                     |
| `bg-st-surface-info`           | informação                              |
| `bg-st-surface-system`         | estado neutro do sistema                |
| `bg-st-surface-warning`        | atenção                                 |
| `bg-st-surface-positive`       | sucesso                                 |
| `bg-st-surface-negative`       | erro                                    |
| `bg-st-surface-shadow-0`..`-3` | véus / overlays                         |

### Conteúdo (texto e ícone) — `text-st-content-*`

| Classe                                                                      | Uso típico                            |
| --------------------------------------------------------------------------- | ------------------------------------- |
| `text-st-content-default`                                                   | texto padrão                          |
| `text-st-content-ghost`                                                     | texto de apoio, legendas              |
| `text-st-content-disable`                                                   | desabilitado                          |
| `text-st-content-bright`                                                    | texto sobre superfície escura         |
| `text-st-content-din`                                                       | texto sobre superfície clara/colorida |
| `text-st-content-primary`                                                   | ênfase de marca                       |
| `text-st-content-secondary`                                                 | ênfase secundária                     |
| `text-st-content-info` / `-system` / `-warning` / `-positive` / `-negative` | estados                               |

### Cores sistêmicas de valor único

Servem para detalhes que não são superfície nem texto (ícone de destaque,
divisor colorido, barra): `st-brand`, `st-primary`, `st-secondary`, `st-info`,
`st-system`, `st-warning`, `st-positive`, `st-negative` — usadas como
`bg-st-primary`, `text-st-negative`, `border-st-positive`.

### Bordas e estados

- `border-st-border-1`, `border-st-border-2`, `border-st-border-3`
- `ring-st-focus` (anel de foco), `bg-st-hover`, `bg-st-pressed`

### Escalas cruas

Além dos aliases semânticos existem as escalas completas, para casos raros:
`st-brand-primary-*`, `st-brand-secondary-*`, `st-info-*`, `st-system-*`,
`st-positive-*`, `st-attention-*`, `st-negative-*`, `st-neutral-*`,
`st-blue-*`, `st-ocean-*`, `st-green-*`, `st-yellow-*`, `st-orange-*`,
`st-red-*`, `st-pink-*`, `st-purple-*`, `st-crema-*`, `st-shadow-scale-*`,
`st-light-scale-*` — todas com passos `100`..`950` (`st-neutral-*` começa em
`0`). Exemplo: `bg-st-brand-primary-800`.

Prefira sempre o alias semântico. Recorrer à escala crua é sinal de que a
superfície ou o papel do texto não foi escolhido corretamente — e a escala crua
**não** muda com o tema.

## Espaçamento — `p-st-*`, `m-st-*`, `gap-st-*`

Duas escalas convivem no mesmo namespace:

**Escala nomeada** (rem, para espaços tipográficos):

| Token     | Valor      | Token    | Valor      |
| --------- | ---------- | -------- | ---------- |
| `st-xxs`  | `0.625rem` | `st-2xl` | `1.875rem` |
| `st-xs`   | `0.75rem`  | `st-3xl` | `2.25rem`  |
| `st-sm`   | `0.875rem` | `st-4xl` | `3rem`     |
| `st-base` | `1rem`     | `st-5xl` | `3.75rem`  |
| `st-md`   | `1.125rem` | `st-6xl` | `4.5rem`   |
| `st-lg`   | `1.25rem`  | `st-7xl` | `5rem`     |
| `st-xl`   | `1.5rem`   |          |            |

**Escala numérica** (px, para layout — passo de 8px):

| Token  | px  | Token   | px  | Token    | px   |
| ------ | --- | ------- | --- | -------- | ---- |
| `st-1` | 8   | `st-9`  | 72  | `st-32`  | 256  |
| `st-2` | 16  | `st-10` | 80  | `st-40`  | 320  |
| `st-3` | 24  | `st-11` | 88  | `st-48`  | 384  |
| `st-4` | 32  | `st-12` | 96  | `st-56`  | 448  |
| `st-5` | 40  | `st-15` | 120 | `st-64`  | 512  |
| `st-6` | 48  | `st-16` | 128 | `st-72`  | 584  |
| `st-7` | 56  | `st-20` | 160 | `st-80`  | 640  |
| `st-8` | 64  | `st-24` | 192 | `st-96`  | 768  |
|        |     | `st-30` | 240 | `st-128` | 1024 |
|        |     |         |     | `st-144` | 1152 |
|        |     |         |     | `st-160` | 1280 |
|        |     |         |     | `st-168` | 1344 |
|        |     |         |     | `st-240` | 1920 |

A escala também vale para largura e altura: `w-st-40`, `h-st-6`, `max-w-st-160`,
`min-w-st-30`.

> A largura de conteúdo padrão das páginas é `max-w-st-160` (1280px) — já
> embutida no utilitário `.st-container` definido em
> [`app/assets/css/main.css`](../app/assets/css/main.css).

## Tipografia

### Famílias

| Classe              | Fonte                 |
| ------------------- | --------------------- |
| `font-st-heading`   | `Base Neue Condensed` |
| `font-st-highlight` | `Montserrat`          |
| `font-st-body`      | `Montserrat`          |

As duas famílias são carregadas em `main.css` (`base-neue.css` e
`montserrat.css`) e servidas em `/assets/fonts` pelo `publicAssets` do
[`nuxt.config.ts`](../nuxt.config.ts).

> Em `nuxt dev` o Vite intercepta `/assets/*` e as fontes dão 404 — o texto cai
> na fonte de sistema. Isso é esperado; o resultado correto só aparece em
> `npm run generate` / `npm run build`.

### Escala semântica

Estas classes já combinam tamanho, altura de linha e peso. O `StTypography`
aplica exatamente elas — use o componente em vez da classe sempre que possível.

| Classe                     | Tamanho    | Altura | Peso |
| -------------------------- | ---------- | ------ | ---- |
| `text-st-hero-title`       | `3rem`     | 1.5    | 800  |
| `text-st-heading-1`        | `3rem`     | 1.1    | 800  |
| `text-st-heading-2`        | `2.25rem`  | 1.1    | 800  |
| `text-st-heading-3`        | `1.875rem` | 1.25   | 800  |
| `text-st-heading-4`        | `1.5rem`   | 1.25   | 800  |
| `text-st-highlight-large`  | `1.5rem`   | 1.5    | 800  |
| `text-st-highlight-medium` | `1.125rem` | 1.5    | 800  |
| `text-st-body-large`       | `1.125rem` | 1.75   | 400  |
| `text-st-body-medium`      | `1rem`     | 1.75   | 400  |
| `text-st-body-small`       | `0.875rem` | 1.5    | 400  |

Escala bruta de tamanho: `text-st-xxs` .. `text-st-7xl`.
Altura de linha: `leading-st-tight | snug | normal | relaxed | loose`.
Espaçamento de letra: `tracking-st-tight | normal | wide | wider`.

## Raio, sombra e animação

| Categoria   | Classes                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------- |
| Raio        | `rounded-st-1`, `rounded-st-2`                                                              |
| Elevação    | `shadow-st-paper-0` .. `shadow-st-paper-4`                                                  |
| Interação   | `shadow-st-action-hover`, `shadow-st-action-pressed`                                        |
| Drop shadow | `drop-shadow-st-action-hover`, `drop-shadow-st-action-pressed`                              |
| Text shadow | `text-shadow-st-small`, `-st-medium`, `-st-large`, `-st-action-hover`, `-st-action-pressed` |
| Animação    | `animate-st-loading-arrow`, `animate-st-spinner-infinite`                                   |

O `text-shadow-*` vem do plugin `stTailwindPlugins`, não do Tailwind padrão.

## Tema claro / escuro

O tema é escolhido pelo atributo `data-theme` no `<html>`, escrito pelo
[`app/services/themeService.ts`](../app/services/themeService.ts):

```ts
const { theme, setTheme, toggleTheme } = useThemeService()
```

O `data-theme` inicial também é emitido pelo `useHead` em
[`app/app.vue`](../app/app.vue), para o HTML pré-renderizado já sair no tema
certo. Como todos os tokens são variáveis CSS, trocar o tema não exige nenhuma
classe condicional — exceto quando o próprio ativo muda (é o caso da logo, que
tem `brands/logo_light` e `brands/logo_dark`).

## Armadilha: classes montadas em runtime

Props como `padding`, `margin`, `gap` e `cols` (StPaper, StGrid, StModal) são
convertidas em classes por concatenação **dentro da lib**, então o scanner do
Tailwind não as encontra no `dist`. Sem ajuda, `padding="3"` não geraria CSS
nenhum.

Por isso o [`tailwind.config.ts`](../tailwind.config.ts) tem um `safelist` que
cobre esses padrões. Se você adicionar um componente da lib que gere classes por
concatenação em outro namespace, acrescente o padrão lá.
