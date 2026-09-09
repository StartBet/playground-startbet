import { ref } from 'vue'

export type ModalName = 'login' | 'register' | string

const openModals = ref<Set<ModalName>>(new Set())

export const useModalStore = () => {
  const isOpen = (name: ModalName) => openModals.value.has(name)

  const open = (name: ModalName) => {
    openModals.value.add(name)
  }

  const close = (name: ModalName) => {
    openModals.value.delete(name)
  }

  const toggle = (name: ModalName) => {
    if (isOpen(name)) {
      close(name)
    } else {
      open(name)
    }
  }

  return {
    openModals,
    isOpen,
    open,
    close,
    toggle
  }
}
