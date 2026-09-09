import { computed, type ComputedRef } from 'vue'
import { useModalStore, type ModalName } from '~/stores/modalStore'

export interface UseStModalOptions {
  /** Exibe o botão de fechar do StModal. Default: `true`. */
  showCloseButton?: boolean
  /** Fecha o modal ao clicar no overlay. Default: `true`. */
  closeOnOutsideClick?: boolean
  /** Executado quando o modal passa de fechado para aberto. */
  onOpen?: () => void
  /** Executado quando o modal passa de aberto para fechado. */
  onClose?: () => void
}

/** Props e listeners prontos para serem repassados ao StModal via `v-bind`. */
export interface UseStModalBindings {
  open: boolean
  showCloseButton: boolean
  closeOnOutsideClick: boolean
  'onUpdate:open': (value: boolean) => void
  onClose: () => void
}

export interface UseStModalReturn {
  /** Nome usado como chave no registro global de modais. */
  name: ModalName
  isOpen: ComputedRef<boolean>
  open: () => void
  close: () => void
  toggle: () => void
  modalBind: ComputedRef<UseStModalBindings>
}

let autoNameCount = 0

const buildAutoName = (): ModalName => `st-modal-${++autoNameCount}`

/**
 * Controla a abertura e o fechamento de um modal renderizado com o `StModal`
 * do `@startbet/st-core-ui`.
 *
 * O estado vive no registro global do `useModalStore`, então qualquer
 * componente pode abrir ou fechar o mesmo modal apenas informando o nome.
 * Sem nome, a composable gera um identificador próprio e o modal fica restrito
 * a quem o criou.
 *
 * ```vue
 * <script setup lang="ts">
 * import { StModal, StTypography } from '@startbet/st-core-ui'
 * import { useStModal } from '~/composables/useStModal'
 *
 * const { open, modalBind } = useStModal('detalhes-da-aposta')
 * </script>
 *
 * <template>
 *   <StButton @click="open">Abrir</StButton>
 *   <StModal v-bind="modalBind" width="96">
 *     <StTypography variant="heading-3">Detalhes da aposta</StTypography>
 *   </StModal>
 * </template>
 * ```
 */
export const useStModal = (
  name: ModalName = buildAutoName(),
  options: UseStModalOptions = {}
): UseStModalReturn => {
  const { showCloseButton = true, closeOnOutsideClick = true, onOpen, onClose } = options

  const modalStore = useModalStore()

  const isOpen = computed(() => modalStore.isOpen(name))

  const open = () => {
    if (isOpen.value) return

    modalStore.open(name)
    onOpen?.()
  }

  /**
   * O StModal emite `update:open` e `close` no mesmo fechamento, por isso a
   * troca de estado é guardada para o callback não rodar duas vezes.
   */
  const close = () => {
    if (!isOpen.value) return

    modalStore.close(name)
    onClose?.()
  }

  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  const handleUpdateOpen = (value: boolean) => {
    if (value) {
      open()
    } else {
      close()
    }
  }

  const modalBind = computed<UseStModalBindings>(() => ({
    open: isOpen.value,
    showCloseButton,
    closeOnOutsideClick,
    'onUpdate:open': handleUpdateOpen,
    onClose: close
  }))

  return {
    name,
    isOpen,
    open,
    close,
    toggle,
    modalBind
  }
}
