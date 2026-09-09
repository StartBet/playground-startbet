<script setup lang="ts">
import { StButton, StDropdown, StModal, StTooltip, StTypography } from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'
import { useStModal } from '~/composables/useStModal'

defineOptions({ name: 'ShowcaseOverlays' })

const { open: openModal, close: closeModal, modalBind } = useStModal('showcase-overlays')
</script>

<template>
  <ShowcaseCard
    icon="layer-group"
    title="Sobreposição"
    description="Tooltip, dropdown e modal — todos com slot #trigger ou controle externo."
  >
    <div class="flex flex-wrap items-center gap-st-2">
      <StTooltip placement="top">
        <template #trigger>
          <StButton variant="outline" size="small">Tooltip</StButton>
        </template>
        Aparece no hover e no foco.
      </StTooltip>

      <StDropdown placement="bottom">
        <template #trigger>
          <StButton variant="outline" size="small">Dropdown</StButton>
        </template>

        <div class="flex min-w-st-30 flex-col gap-st-1">
          <button
            type="button"
            class="rounded-st-1 px-st-2 py-st-1 text-left hover:bg-st-surface-2"
          >
            Perfil
          </button>
          <button
            type="button"
            class="rounded-st-1 px-st-2 py-st-1 text-left hover:bg-st-surface-2"
          >
            Configurações
          </button>
        </div>
      </StDropdown>

      <StButton size="small" @click="openModal">Modal</StButton>
    </div>

    <StModal v-bind="modalBind" width="64" padding="4">
      <div class="flex flex-col gap-st-3">
        <StTypography as="h2" variant="heading-4">StModal</StTypography>
        <StTypography as="p" variant="body-medium">
          O estado vive no <code>useStModal</code>, então qualquer componente consegue abrir ou
          fechar o mesmo modal pelo nome.
        </StTypography>
        <StButton variant="outline" @click="closeModal">Fechar</StButton>
      </div>
    </StModal>
  </ShowcaseCard>
</template>
