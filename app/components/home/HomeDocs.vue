<script setup lang="ts">
import { StListItem, StPaper, StTypography, StUnorderedList } from '@startbet/st-core-ui'

defineOptions({ name: 'HomeDocs' })

const docs = [
  {
    path: 'README.md',
    description: 'Setup, scripts, estrutura de pastas e o fluxo para criar uma página nova.'
  },
  {
    path: 'CLAUDE.md',
    description: 'As regras que a IA deve seguir ao gerar uma tela aqui.'
  },
  {
    path: 'docs/componentes.md',
    description: 'Todos os componentes do st-core-ui com props, eventos, slots e exemplo.'
  },
  {
    path: 'docs/tokens.md',
    description: 'Cores, superfícies, espaçamentos, tipografia e as classes utilitárias st-*.'
  },
  {
    path: 'docs/receitas.md',
    description: 'Padrões prontos: layout de página, formulário, modal, listagem e tema.'
  },
  {
    path: 'docs/st-core-ui-referencia.md',
    description: 'Referência longa consolidada da biblioteca, para consulta pontual.'
  }
] as const
</script>

<template>
  <section class="st-container pb-st-10">
    <StPaper variant="surface-0" border="1" border-radius="2" :elevation="1" padding="4">
      <div class="flex flex-col gap-st-3">
        <div class="flex flex-col">
          <StTypography as="h2" variant="heading-4">Documentação do projeto</StTypography>
          <StTypography variant="body-small" class-name="text-st-content-ghost">
            Leia antes de pedir uma tela nova para a IA — é o que mantém o protótipo dentro do
            design system.
          </StTypography>
        </div>

        <StUnorderedList>
          <StListItem v-for="doc in docs" :key="doc.path" divider>
            <div class="flex flex-col">
              <StTypography variant="highlight-medium" class-name="font-mono">
                {{ doc.path }}
              </StTypography>
              <StTypography variant="body-small" class-name="text-st-content-ghost">
                {{ doc.description }}
              </StTypography>
            </div>
          </StListItem>
        </StUnorderedList>
      </div>
    </StPaper>
  </section>
</template>
