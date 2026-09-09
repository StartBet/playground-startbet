# Componentes do st-core-ui

Referência rápida de tudo que `@startbet/st-core-ui@0.32.0` exporta. Os exemplos
usam a sintaxe que já funciona neste projeto (Vue 3 + `<script setup>`).

Storybook oficial: <https://startbet.github.io/st-core-ui/>

Convenções desta página:

- Prop obrigatória aparece marcada com `*`.
- Props no formato `onAlgumaCoisa` também funcionam como evento
  (`onValueChange` → `@value-change`). Onde existe `update:x`, use `v-model:x`.
- A prop de classe extra chama-se sempre `className` (no template: `class-name`).
- Onde aparecer `SizeValue`, os valores aceitos são:

```text
auto | full | fit-content | min-content | max-content
1 .. 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 96 | 128 | 144 | 160 | 168 | 240
```

## Índice

| Categoria    | Componentes                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Estrutura    | [StGrid](#stgrid), [StPaper](#stpaper), [StModal](#stmodal)                                                                                                           |
| Texto        | [StTypography](#sttypography)                                                                                                                                         |
| Ações        | [StButton](#stbutton), [StButtonGroup](#stbuttongroup)                                                                                                                |
| Formulário   | [StInput](#stinput), [StSelect](#stselect), [StOption](#stoption), [StCheckbox](#stcheckbox), [StRadio / StRadioGroup](#stradio--stradiogroup), [StSwitch](#stswitch) |
| Sinalização  | [StBadge](#stbadge), [StChip](#stchip), [StProgressBar](#stprogressbar), [StLoading](#stloading)                                                                      |
| Listas       | [StUnorderedList / StOrderedList / StListItem](#stunorderedlist--storderedlist--stlistitem)                                                                           |
| Sobreposição | [StDropdown](#stdropdown), [StTooltip](#sttooltip)                                                                                                                    |
| Mídia        | [StIcon](#sticon), [StIllustration](#stillustration)                                                                                                                  |
| Carrossel    | [StCarousel](#stcarousel), [StBullets](#stbullets)                                                                                                                    |
| Extras       | [Composables](#composables), [Tipos e tokens](#tipos-e-tokens-exportados)                                                                                             |

---

## Estrutura

### StGrid

Grid CSS com colunas responsivas e espaçamento em tokens.

| Prop                                 | Valores                  | Default |
| ------------------------------------ | ------------------------ | ------- |
| `cols`, `smCols`, `mdCols`, `lgCols` | `1`..`12`                | `1`     |
| `gap`, `gapX`, `gapY`                | `1`..`12`                | —       |
| `padding`, `sm/md/lgPadding`         | shorthand de espaçamento | —       |
| `margin`, `sm/md/lgMargin`           | shorthand de espaçamento | —       |
| `className`                          | `string`                 | `''`    |

```vue
<StGrid :cols="1" :md-cols="2" :lg-cols="3" :gap="3">
  <ShowcaseCard v-for="card in cards" :key="card.id" v-bind="card" />
</StGrid>
```

As props responsivas afetam **apenas** as colunas; o `gap` é único para todos os
breakpoints.

### StPaper

Superfície base: background, borda, raio, elevação e espaçamento por token. É o
componente com o qual quase todo bloco visual começa.

| Prop                                   | Valores                                                                                                                                                       | Default     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `variant`                              | `surface-0`..`surface-4`, `surface-primary`, `surface-secondary`, `surface-info`, `surface-system`, `surface-warning`, `surface-positive`, `surface-negative` | `surface-1` |
| `border`                               | `none`, `1`, `2`, `3`, `primary`, `secondary`, `info`, `system`, `warning`, `positive`, `negative`                                                            | `none`      |
| `borderRadius`                         | `none`, `1`, `2`                                                                                                                                              | `1`         |
| `elevation`                            | `0`..`4`                                                                                                                                                      | `1`         |
| `interactive`                          | `boolean` — cursor + estados de hover/active                                                                                                                  | `false`     |
| `bgImage`                              | `string` (URL)                                                                                                                                                | —           |
| `width` / `height`                     | `SizeValue`                                                                                                                                                   | —           |
| `padding`, `margin` (+ `Sm`/`Md`/`Lg`) | shorthand de espaçamento                                                                                                                                      | —           |
| `as`                                   | tag HTML                                                                                                                                                      | `div`       |

```vue
<StPaper variant="surface-0" border="1" border-radius="2" :elevation="2" padding="3">
  <StTypography as="h3" variant="heading-4">Título do card</StTypography>
</StPaper>
```

**Shorthand de espaçamento** (mesma ordem do CSS, com tokens `st-*`):

| Valor             | Classes geradas           |
| ----------------- | ------------------------- |
| `padding="2"`     | `p-st-2`                  |
| `padding="2 4"`   | `py-st-2 px-st-4`         |
| `padding="1 2 3"` | `pt-st-1 px-st-2 pb-st-3` |
| `margin="4 auto"` | `my-st-4 mx-auto`         |
| `paddingMd="3 6"` | `md:py-st-3 md:px-st-6`   |

### StModal

`Teleport` para `body` + `StPaper` no centro, então herda toda a API visual do
StPaper.

| Prop                                | Valores                    | Default |
| ----------------------------------- | -------------------------- | ------- |
| `open`                              | `boolean` (`v-model:open`) | `false` |
| `showCloseButton`                   | `boolean`                  | `false` |
| `closeOnOutsideClick`               | `boolean`                  | `false` |
| `width` / `height`                  | `SizeValue`                | —       |
| + todas as props visuais do StPaper |                            |         |

Eventos: `update:open`, `close`. `Escape` fecha enquanto está aberto.

Neste projeto prefira o composable [`useStModal`](../app/composables/useStModal.ts),
que já entrega as props e os listeners prontos:

```vue
<script setup lang="ts">
import { StButton, StModal, StTypography } from '@startbet/st-core-ui'
import { useStModal } from '~/composables/useStModal'

const { open, modalBind } = useStModal('detalhes')
</script>

<template>
  <StButton @click="open">Abrir</StButton>

  <StModal v-bind="modalBind" width="64" padding="4">
    <StTypography as="h2" variant="heading-4">Detalhes</StTypography>
  </StModal>
</template>
```

---

## Texto

### StTypography

| Prop            | Valores                                                                                                                  | Default       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `variant`       | `hero-title`, `heading-1`..`heading-4`, `highlight-large`, `highlight-medium`, `body-large`, `body-medium`, `body-small` | `body-medium` |
| `as`            | `p`, `h1`..`h6`, `span`, `div`                                                                                           | `p`           |
| `size`          | `1`..`12` (sobrescreve o tamanho da variante)                                                                            | —             |
| `weight`        | `thin` .. `black`                                                                                                        | —             |
| `family`        | `body`, `heading`, `highlight`, `display`                                                                                | —             |
| `lineHeight`    | `tight`, `snug`, `normal`, `relaxed`, `loose`                                                                            | —             |
| `letterSpacing` | `tighter` .. `widest`                                                                                                    | —             |
| `align`         | `left`, `center`, `right`, `justify`                                                                                     | —             |
| flags booleanas | `italic`, `underline`, `strikethrough`, `uppercase`, `lowercase`, `capitalize`, `truncate`                               | `false`       |
| `maxLines`      | `number` (line clamp)                                                                                                    | —             |

```vue
<StTypography as="h1" variant="heading-1">Playground</StTypography>
<StTypography as="p" variant="body-medium" class-name="text-st-content-ghost">
  Texto secundário.
</StTypography>
```

Nunca escreva `text-2xl`, `font-bold` e afins à mão: a escala semântica já traz
tamanho, peso, família e altura de linha corretos para cada papel de texto.

---

## Ações

### StButton

| Prop                    | Valores                                        | Default   |
| ----------------------- | ---------------------------------------------- | --------- |
| `variant`               | `solid`, `outline`, `text`                     | `solid`   |
| `size`                  | `small`, `medium`, `large`                     | `medium`  |
| `color`                 | `primary`, `secondary`, `positive`, `negative` | `primary` |
| `fullWidth`             | `boolean`                                      | `false`   |
| `type`                  | `button`, `submit`, `reset`                    | `button`  |
| `iconLeft`, `iconRight` | nome do ícone (`fab:` para marcas)             | —         |
| `value`                 | `string \| number` (lido pelo StButtonGroup)   | —         |
| `disabled`              | `boolean`                                      | `false`   |

Slots: `default`, `startAdornment`, `endAdornment`.

```vue
<StButton icon-left="check" color="positive">Confirmar</StButton>
<StButton variant="outline" size="small" @click="onCancel">Cancelar</StButton>
```

### StButtonGroup

Agrupa `StButton` (cada um com `value`) em seleção única ou múltipla, com
navegação por setas do teclado.

| Prop                                   | Valores                                | Default      |
| -------------------------------------- | -------------------------------------- | ------------ |
| `value`                                | `string \| string[]` (`v-model:value`) | —            |
| `defaultValue`                         | `string \| string[]`                   | —            |
| `multiple`                             | `boolean`                              | `false`      |
| `orientation`                          | `horizontal`, `vertical`               | `horizontal` |
| `variant`, `size`, `color`, `disabled` | herdados pelos filhos                  | —            |

```vue
<StButtonGroup v-model:value="periodo" size="small">
  <StButton value="dia">Dia</StButton>
  <StButton value="semana">Semana</StButton>
</StButtonGroup>
```

---

## Formulário

Todos os controles aceitam modo controlado (`v-model:...`) ou não controlado
(`defaultValue` / `defaultChecked`).

### StInput

| Prop                                                          | Valores                                                                                                          |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `value` / `defaultValue`                                      | `string \| number` (`v-model:value`)                                                                             |
| `label`, `placeholder`, `name`, `autoComplete`                | `string`                                                                                                         |
| `type`                                                        | `text`, `password`, `email`, `search`, `tel`, `url`, `number`, `date`, `datetime-local`, `month`, `week`, `time` |
| `mask`                                                        | `phone-br`, `cpf`                                                                                                |
| `icon`                                                        | nome do ícone                                                                                                    |
| `messageInfo` / `messageDanger` / `messageSuccess`            | `string`                                                                                                         |
| `maxLength`, `min`, `max`, `pattern`, `required`, `inputMode` | validação nativa                                                                                                 |
| `disabled`, `readOnly`                                        | `boolean`                                                                                                        |

Eventos: `update:value`, `input`, `change`, `focus`, `blur`, `keydown`, `keyup`,
`click`.
Métodos via `ref`: `focus()`, `blur()`, `clear()`, `setInvalidity()`,
`setValidity()`, `reportValidity()`.

```vue
<StInput
  v-model:value="email"
  label="E-mail"
  type="email"
  icon="envelope"
  message-danger="E-mail inválido"
/>
```

### StSelect

| Prop                                                     | Valores                                       |
| -------------------------------------------------------- | --------------------------------------------- |
| `value` / `defaultValue`                                 | `string \| number` (`v-model:value`)          |
| `options`                                                | `{ name: string; value: string \| number }[]` |
| `label`, `placeholder`, `icon`, `name`                   | `string`                                      |
| `messageInfo` / `messageDanger` / `messageSuccess`       | `string`                                      |
| `placement`, `offset`, `closeOnSelect`, `panelClassName` | painel (reusa o StDropdown)                   |
| `required`, `disabled`, `readOnly`                       | `boolean`                                     |

Eventos: `update:value`, `value-change`. Mesmos métodos expostos do StInput.

```vue
<StSelect
  v-model:value="esporte"
  label="Esporte"
  :options="[
    { name: 'Futebol', value: 'futebol' },
    { name: 'Basquete', value: 'basquete' }
  ]"
/>
```

### StOption

Item selecionável, usado no painel do StSelect ou em listas próprias.
Props: `value`, `selected`, `onClick`, `className`.
Slots: `default`, `startAdornment`, `endAdornment`.

### StCheckbox

Props: `checked` (`v-model:checked`), `defaultChecked`, `label`, `disabled`,
`className`. Eventos: `update:checked`, `change`. O slot padrão substitui o
`label`.

```vue
<StCheckbox v-model:checked="aceitou" label="Aceito os termos" />
```

### StRadio / StRadioGroup

`StRadio`: `checked`, `defaultChecked`, `label`, `disabled`. O `value` segue
como atributo nativo do `input`.

`StRadioGroup`: `value` (`v-model:value`), `defaultValue`, `name`,
`orientation` (`vertical` | `horizontal`), `dense`, `disabled`. Compartilha o
estado com os filhos via `provide/inject` e renderiza `role="radiogroup"`.

```vue
<StRadioGroup v-model:value="periodo" orientation="horizontal">
  <StRadio value="dia" label="Dia" />
  <StRadio value="semana" label="Semana" />
</StRadioGroup>
```

### StSwitch

Props: `checked` (`v-model:checked`), `defaultChecked`, `label`, `disabled`,
`iconOn`, `iconOff`. Renderiza `input[type=checkbox]` com `role="switch"`.

```vue
<StSwitch v-model:checked="isDark" label="Tema escuro" icon-on="moon" icon-off="sun" />
```

---

## Sinalização

### StBadge

Props: `variant` (`info` | `system` | `warning` | `positive` | `negative`),
`size` (`small` | `medium`), `value` (`number | string`), `pulse`, `className`.

```vue
<StBadge variant="negative" :value="3" pulse />
```

### StChip

Props: `variant` (`primary` | `secondary` | `info` | `system` | `warning` |
`positive` | `negative`), `clickable`, `closable`, `onClose`, `className`.
Evento: `click`.

```vue
<StChip variant="info" closable @close="remover(tag)">{{ tag }}</StChip>
```

### StProgressBar

Props: `percent` (`0`..`100`, com clamp), `text`, `variant` (as sete cores
semânticas), `size` (`small` | `large`), `className`.

```vue
<StProgressBar :percent="64" text="64%" variant="positive" />
```

### StLoading

Props: `type` (`arrow` | `spinner` | `cyclical`), `variant` (`primary` |
`secondary` | `tertiary`), `size` (`3` | `4` | `6` | `8`), `value` (`0`..`100`,
só no `cyclical`), `className`.

```vue
<StLoading type="spinner" size="6" />
<StLoading type="cyclical" :value="progresso" size="8" />
```

---

## Listas

### StUnorderedList / StOrderedList / StListItem

`StUnorderedList` (`<ul>`) e `StOrderedList` (`<ol>`) aceitam `orientation`
(`vertical` | `horizontal`), `dense` e `className`.

`StListItem`: `size` (`small` | `medium` | `large`), `dense`, `divider`,
`selected`, `disabled`, `clickable`, `expanded` / `defaultExpanded` /
`onExpandedChange` (submenu), `onClick`.
Slots: `default`, `startAdornment`, `endAdornment`.

```vue
<StUnorderedList>
  <StListItem v-for="item in itens" :key="item.id" divider clickable>
    <template #startAdornment><StIcon name="dice" :size="3" /></template>
    {{ item.nome }}
  </StListItem>
</StUnorderedList>
```

---

## Sobreposição

Os dois usam o slot `#trigger` para o elemento que abre o painel.

### StDropdown

| Prop                   | Valores                                     | Default |
| ---------------------- | ------------------------------------------- | ------- |
| `placement`            | `auto`, `top`, `bottom`, `left`, `right`    | `auto`  |
| `width`                | `SizeValue`                                 | `auto`  |
| `offset`               | `number` (px)                               | `8`     |
| `open` / `defaultOpen` | `boolean` (`v-model:open`)                  | `false` |
| `closeOnOutsideClick`  | `boolean`                                   | `true`  |
| `triggerAsChild`       | não envolve o trigger em `<button>` próprio | `false` |
| `panelClassName`       | `string`                                    | `''`    |

```vue
<StDropdown placement="bottom">
  <template #trigger>
    <StButton variant="outline">Menu</StButton>
  </template>

  <div class="flex min-w-st-30 flex-col gap-st-1">
    <button type="button" class="rounded-st-1 px-st-2 py-st-1 text-left hover:bg-st-surface-2">
      Perfil
    </button>
  </div>
</StDropdown>
```

### StTooltip

Props: `placement` (`top` | `bottom` | `left` | `right`), `offset`, `open` /
`defaultOpen`, `disabled`, `triggerProps`, `panelClassName`.
Eventos: `update:open`, `open-change`. Abre no hover **e** no foco.

```vue
<StTooltip placement="top">
  <template #trigger>
    <StButton variant="text" size="small">Ajuda</StButton>
  </template>
  Explicação curta.
</StTooltip>
```

---

## Mídia

### StIcon

| Prop        | Valores                                          | Default |
| ----------- | ------------------------------------------------ | ------- |
| `name` \*   | nome Font Awesome sem `fa-` (ex.: `circle-info`) | —       |
| `lib`       | `fa` (solid) ou `fab` (brands)                   | `fa`    |
| `size`      | `1`..`12`                                        | `2`     |
| `ariaLabel` | `string`                                         | —       |

O `name` também aceita o prefixo embutido: `icon-left="fab:instagram"`.

> **Todo ícone precisa ser registrado** em
> [`app/plugins/stIcons.ts`](../app/plugins/stIcons.ts). Sem registro o ícone
> simplesmente não aparece — nenhum erro é lançado.

### StIllustration

| Prop               | Valores                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `name` \*          | caminho relativo no CDN, com ou sem `.svg` (ex.: `brands/logo_dark`) |
| `alt` \*           | texto alternativo                                                    |
| `width` / `height` | `SizeValue`                                                          |

A URL final é `https://cdn.start.bet.br/illustrations/<name>.svg`. Nunca passe
URL completa nem caminho local.

Categorias do catálogo: `arrows`, `balls`, `brands`, `casino`, `characters`,
`coins`, `cup`, `football`, `papers`, `random`, `safety`, `smoke`, `stickers`,
`time`, `various`.

```vue
<StIllustration name="brands/logo_dark" alt="StartBet" height="8" />
```

---

## Carrossel

### StCarousel

Carrossel com arrastar, autoplay, loop infinito e configuração por breakpoint.
Toda prop de layout tem as variantes `sm*`, `md*` e `lg*`.

| Prop                                                | Valores                            | Default                   |
| --------------------------------------------------- | ---------------------------------- | ------------------------- |
| `slidePerPage` (+ `sm/md/lg`)                       | `number`                           | `1`                       |
| `gap` (+ `sm/md/lg`)                                | `0`..`12`                          | —                         |
| `peek` (+ `sm/md/lg`)                               | `0`..`6` (prévia do próximo slide) | `0`                       |
| `slideAlign` (+ `sm/md/lg`)                         | `left`, `center`                   | `left`                    |
| `arrows` / `bullets` (+ `sm/md/lg`)                 | `outside`, `inside`, `none`        | `outside`                 |
| `bulletsPosition`                                   | `left`, `center`, `right`          | `center`                  |
| `autoplay`, `autoplayTimeout`, `autoplayHoverPause` | `boolean` / `number` (ms)          | `false` / `5000` / `true` |
| `infiniteLoop`, `autoHeight`, `grab`, `highlight`   | `boolean`                          | —                         |
| `modelValue`                                        | índice ativo (`v-model`)           | `0`                       |
| `transitionDuration`                                | ms                                 | `350`                     |

Eventos: `update:modelValue`, `change`, `page-change`.
Slots extras: `#arrow-prev`, `#arrow-next`.
Expostos via `ref`: `next()`, `prev()`, `goToSlide(i)`, `goToPage(p)`,
`activeIndex`, `activePage`, `pageCount`, `visibleIndexes`.

```vue
<StCarousel :slide-per-page="1" :md-slide-per-page="3" :gap="2" infinite-loop autoplay>
  <StPaper v-for="jogo in jogos" :key="jogo.id" padding="3">{{ jogo.nome }}</StPaper>
</StCarousel>
```

### StBullets

Indicador de paginação isolado (o StCarousel já o usa internamente).

Props: `total` \*, `modelValue` (`v-model`), `size` (`small` | `medium` |
`large`), `align` (`left` | `center` | `right`), `interactive`, `ariaLabel`,
`itemAriaLabel`. Eventos: `update:modelValue`, `select`.

---

## Composables

| Composable                                                                                 | Para que serve                                                                                      |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `useCheckableControl`                                                                      | Estado controlado/não controlado de checkbox, radio e switch (base do StCheckbox/StRadio/StSwitch). |
| `useListContainer`                                                                         | Contexto de lista (orientação, nível, atributos) usado por StOrderedList/StUnorderedList.           |
| `useResponsiveValue`                                                                       | Resolve um `ResponsiveValue<T>` (`{ base, sm?, md?, lg? }`) conforme os breakpoints ativos.         |
| `useCarouselAutoplay`, `useCarouselDrag`, `useCarouselPagination`, `useCarouselAutoHeight` | Partes internas do StCarousel, reaproveitáveis em carrosséis próprios.                              |

Utilitários do mesmo módulo: `useActiveBreakpoints()`, `resolveResponsiveValue()`,
`toResponsiveValue()`, `stBreakpointMinWidths`, `stBreakpointOrder`.

## Tipos e tokens exportados

```ts
import {
  stTailwindTheme, // objeto de tema para o tailwind.config
  stTailwindPlugins, // plugins (utilities text-shadow-*)
  stCssTokenImport // '@startbet/st-core-ui/tokens.css'
} from '@startbet/st-core-ui'

import type {
  SizeValue,
  UsualSizeValue, // '1'..'12'
  ResponsiveValue, // { base: T; sm?: T; md?: T; lg?: T }
  StBreakpoint // 'sm' | 'md' | 'lg'
} from '@startbet/st-core-ui'
```

Também são exportados os tipos de props e variantes de cada componente
(`StProgressBarProps`, `StCarouselProps`, `StBulletsProps`,
`StIllustrationProps`, …).
