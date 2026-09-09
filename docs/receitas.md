# Receitas

Padrões prontos para copiar ao montar um protótipo. Todos seguem as convenções
descritas no [README](../README.md).

## 1. Página nova

Crie o arquivo em `app/pages/` — o Nuxt gera a rota pelo nome do arquivo
(`app/pages/promocoes.vue` → `/promocoes`).

```vue
<!-- app/pages/promocoes.vue -->
<script setup lang="ts">
import { StTypography } from '@startbet/st-core-ui'
import PromocoesLista from '~/components/promocoes/PromocoesLista.vue'

useHead({ title: 'Promoções · Playground' })
</script>

<template>
  <div class="st-container flex flex-col gap-st-4 py-st-6">
    <header class="flex flex-col">
      <StTypography as="h1" variant="heading-2">Promoções</StTypography>
      <StTypography variant="body-medium" class-name="text-st-content-ghost">
        Ofertas ativas nesta semana.
      </StTypography>
    </header>

    <PromocoesLista />
  </div>
</template>
```

`.st-container` já entrega largura máxima (`max-w-st-160`), centralização e o
padding lateral responsivo.

## 2. Seção com cards em grid

```vue
<StGrid :cols="1" :md-cols="2" :lg-cols="3" :gap="3">
  <StPaper
    v-for="promo in promocoes"
    :key="promo.id"
    variant="surface-0"
    border="1"
    border-radius="2"
    :elevation="1"
    padding="3"
    class-name="flex h-full flex-col gap-st-2"
  >
    <StTypography as="h3" variant="highlight-medium">{{ promo.titulo }}</StTypography>
    <StTypography variant="body-small" class-name="text-st-content-ghost">
      {{ promo.descricao }}
    </StTypography>
    <StButton size="small" class-name="mt-auto">Participar</StButton>
  </StPaper>
</StGrid>
```

`h-full` no card + `mt-auto` no rodapé mantém todos os cards da linha com a
mesma altura e o botão alinhado embaixo.

## 3. Formulário controlado

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { StButton, StInput, StPaper, StSelect } from '@startbet/st-core-ui'

const nome = ref('')
const estado = ref<string | number>('')

const estados = [
  { name: 'São Paulo', value: 'SP' },
  { name: 'Minas Gerais', value: 'MG' }
]

const podeEnviar = computed(() => nome.value.length > 2 && estado.value !== '')

const enviar = () => {
  // protótipo: só logamos o payload
  console.log({ nome: nome.value, estado: estado.value })
}
</script>

<template>
  <StPaper variant="surface-0" border="1" padding="4">
    <form class="flex flex-col gap-st-3" @submit.prevent="enviar">
      <StInput v-model:value="nome" label="Nome" required />
      <StSelect v-model:value="estado" label="Estado" placeholder="Selecione" :options="estados" />

      <StButton type="submit" :disabled="!podeEnviar" full-width>Enviar</StButton>
    </form>
  </StPaper>
</template>
```

Mensagens de validação são props do próprio campo: `message-danger`,
`message-info`, `message-success`.

## 4. Modal

Use o composable [`useStModal`](../app/composables/useStModal.ts). O estado vive
num registro global, então qualquer componente abre ou fecha o mesmo modal
apenas informando o nome.

```vue
<script setup lang="ts">
import { StButton, StModal, StTypography } from '@startbet/st-core-ui'
import { useStModal } from '~/composables/useStModal'

const { open, close, modalBind } = useStModal('confirmar-aposta', {
  closeOnOutsideClick: false,
  onClose: () => console.log('fechou')
})
</script>

<template>
  <StButton @click="open">Confirmar aposta</StButton>

  <StModal v-bind="modalBind" width="64" padding="4">
    <div class="flex flex-col gap-st-3">
      <StTypography as="h2" variant="heading-4">Confirmar aposta</StTypography>
      <div class="flex justify-end gap-st-2">
        <StButton variant="text" @click="close">Cancelar</StButton>
        <StButton color="positive" @click="close">Confirmar</StButton>
      </div>
    </div>
  </StModal>
</template>
```

Sem nome (`useStModal()`) o composable gera um identificador próprio e o modal
fica restrito a quem o criou.

## 5. Listagem com ícone e divisor

```vue
<StUnorderedList>
  <StListItem v-for="jogo in jogos" :key="jogo.id" divider clickable @click="abrir(jogo)">
    <template #startAdornment>
      <StIcon name="dice" :size="3" class-name="text-st-content-secondary" />
    </template>

    <div class="flex flex-col">
      <StTypography variant="highlight-medium">{{ jogo.nome }}</StTypography>
      <StTypography variant="body-small" class-name="text-st-content-ghost">
        {{ jogo.categoria }}
      </StTypography>
    </div>

    <template #endAdornment>
      <StBadge variant="info" :value="jogo.mercados" />
    </template>
  </StListItem>
</StUnorderedList>
```

## 6. Reagir ao tema

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { StIllustration } from '@startbet/st-core-ui'
import { useThemeService } from '~/services/themeService'

const { theme, toggleTheme } = useThemeService()

const logo = computed(() => (theme.value === 'light' ? 'brands/logo_light' : 'brands/logo_dark'))
</script>

<template>
  <StIllustration :name="logo" alt="StartBet" height="6" @click="toggleTheme" />
</template>
```

Cor, sombra e borda **não** precisam disso: os tokens `st-*` já trocam sozinhos.
Só use `theme` quando o próprio ativo mudar (logo, imagem, ilustração).

## 7. Ícone novo

1. Ache o nome no [Font Awesome 6 Free](https://fontawesome.com/search?o=r&m=free).
2. Converta para camelCase com prefixo `fa`: `arrow-right` → `faArrowRight`.
3. Importe e registre em [`app/plugins/stIcons.ts`](../app/plugins/stIcons.ts).

```ts
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
// ...
addIcons(/* ... */, faArrowRight)
```

Para marcas, importe de `@fortawesome/free-brands-svg-icons` e use
`lib="fab"` ou o prefixo `fab:` (`icon-left="fab:instagram"`).

## 8. Componente local

Estrutura usada no projeto (pasta kebab-case, arquivo PascalCase):

```
app/components/promocoes/
├── PromocoesLista.vue
├── PromocoesLista.interface.ts   # tipos das props
├── PromocoesLista.test.ts        # opcional, mas o pre-push roda os testes
└── stylePromocoesLista.ts        # opcional: builders de classe
```

```vue
<!-- PromocoesLista.vue -->
<script setup lang="ts">
import { StPaper } from '@startbet/st-core-ui'
import type { PromocoesListaProps } from './PromocoesLista.interface'

defineOptions({ name: 'PromocoesLista' })

const props = defineProps<PromocoesListaProps>()
</script>

<template>
  <StPaper variant="surface-0" padding="3">{{ props.titulo }}</StPaper>
</template>
```

Importe sempre pelo caminho do arquivo: `import PromocoesLista from
'~/components/promocoes/PromocoesLista.vue'`. Não crie `index.ts` de barril
dentro de `app/components/` — o auto-import do Nuxt reclama de nome duplicado.

## 9. Teste de componente

Os testes rodam com Vitest + happy-dom. Componentes da lib costumam ser
stubbados para o teste checar só o que o componente local faz:

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import PromocoesLista from './PromocoesLista.vue'

vi.mock('@startbet/st-core-ui', async () => {
  const actual: object = await vi.importActual('@startbet/st-core-ui')
  return {
    ...actual,
    StPaper: { template: '<div data-test="paper"><slot /></div>' }
  }
})

describe('PromocoesLista', () => {
  it('renderiza o título', () => {
    const wrapper = mount(PromocoesLista, { props: { titulo: 'Bônus' } })
    expect(wrapper.get('[data-test="paper"]').text()).toBe('Bônus')
  })
})
```

O `NuxtLink` já vem stubbado globalmente em
[`app/tests/setup.ts`](../app/tests/setup.ts).
