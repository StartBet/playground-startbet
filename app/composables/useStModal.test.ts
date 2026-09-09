import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { StModal } from '@startbet/st-core-ui'
import { useStModal } from './useStModal'

const buildHost = (name: string) =>
  defineComponent({
    setup() {
      const { open, isOpen, modalBind } = useStModal(name)
      return { open, isOpen, modalBind }
    },
    render() {
      return h('div', [
        h('button', { id: 'trigger', onClick: this.open }, 'abrir'),
        h(StModal, this.modalBind, { default: () => h('p', { id: 'body' }, 'conteudo') })
      ])
    }
  })

describe('useStModal', () => {
  it('deve iniciar fechado', () => {
    const { isOpen } = useStModal('modal-inicial')

    expect(isOpen.value).toBe(false)
  })

  it('deve abrir e fechar o modal', () => {
    const { isOpen, open, close } = useStModal('modal-abrir-fechar')

    open()
    expect(isOpen.value).toBe(true)

    close()
    expect(isOpen.value).toBe(false)
  })

  it('deve alternar o estado do modal', () => {
    const { isOpen, toggle, close } = useStModal('modal-toggle')

    toggle()
    expect(isOpen.value).toBe(true)

    toggle()
    expect(isOpen.value).toBe(false)

    close()
  })

  it('deve compartilhar o estado entre instâncias com o mesmo nome', () => {
    const gatilho = useStModal('modal-compartilhado')
    const conteudo = useStModal('modal-compartilhado')

    gatilho.open()
    expect(conteudo.isOpen.value).toBe(true)

    conteudo.close()
    expect(gatilho.isOpen.value).toBe(false)
  })

  it('deve isolar modais com nomes diferentes', () => {
    const login = useStModal('modal-login')
    const cadastro = useStModal('modal-cadastro')

    login.open()
    expect(login.isOpen.value).toBe(true)
    expect(cadastro.isOpen.value).toBe(false)

    login.close()
  })

  it('deve gerar nomes independentes quando o nome não é informado', () => {
    const primeiro = useStModal()
    const segundo = useStModal()

    expect(primeiro.name).not.toBe(segundo.name)

    primeiro.open()
    expect(segundo.isOpen.value).toBe(false)

    primeiro.close()
  })

  it('deve expor as props e listeners do StModal em modalBind', () => {
    const { modalBind, open, close } = useStModal('modal-bind', {
      showCloseButton: false,
      closeOnOutsideClick: false
    })

    expect(modalBind.value.open).toBe(false)
    expect(modalBind.value.showCloseButton).toBe(false)
    expect(modalBind.value.closeOnOutsideClick).toBe(false)

    open()
    expect(modalBind.value.open).toBe(true)

    close()
  })

  it('deve habilitar botão de fechar e clique no overlay por padrão', () => {
    const { modalBind } = useStModal('modal-bind-default')

    expect(modalBind.value.showCloseButton).toBe(true)
    expect(modalBind.value.closeOnOutsideClick).toBe(true)
  })

  it('deve fechar pelos listeners emitidos pelo StModal', () => {
    const { isOpen, open, modalBind } = useStModal('modal-listeners')

    open()
    modalBind.value['onUpdate:open'](false)
    expect(isOpen.value).toBe(false)

    open()
    modalBind.value.onClose()
    expect(isOpen.value).toBe(false)
  })

  it('deve disparar onOpen e onClose apenas na troca de estado', () => {
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const { open, close } = useStModal('modal-callbacks', { onOpen, onClose })

    open()
    open()
    expect(onOpen).toHaveBeenCalledTimes(1)

    close()
    close()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('deve disparar onClose uma única vez quando o StModal emite update:open e close juntos', () => {
    const onClose = vi.fn()
    const { open, modalBind } = useStModal('modal-fechamento-duplo', { onClose })

    open()

    const bind = modalBind.value
    bind['onUpdate:open'](false)
    bind.onClose()

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})

describe('useStModal integrado ao StModal', () => {
  it('deve renderizar o conteúdo do StModal somente quando aberto', async () => {
    const wrapper = mount(buildHost('modal-integrado-render'), { attachTo: document.body })

    expect(document.querySelector('#body')).toBeNull()

    await wrapper.find('#trigger').trigger('click')
    await nextTick()

    expect(document.querySelector('#body')).not.toBeNull()

    wrapper.unmount()
  })

  it('deve fechar pelo botão de fechar do StModal', async () => {
    const wrapper = mount(buildHost('modal-integrado-botao'), { attachTo: document.body })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()

    document.querySelector<HTMLElement>('[aria-label="Fechar modal"]')?.click()
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)
    expect(document.querySelector('#body')).toBeNull()

    wrapper.unmount()
  })

  it('deve fechar pela tecla Escape', async () => {
    const wrapper = mount(buildHost('modal-integrado-escape'), { attachTo: document.body })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)

    wrapper.unmount()
  })

  it('deve fechar pelo clique no overlay', async () => {
    const wrapper = mount(buildHost('modal-integrado-overlay'), { attachTo: document.body })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()

    document.querySelector<HTMLElement>('[data-test="modal-overlay"]')?.click()
    await nextTick()

    expect(wrapper.vm.isOpen).toBe(false)

    wrapper.unmount()
  })
})
