import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import ThemeSwitch from './ThemeSwitch.vue'
import { useThemeService } from '~/services/themeService'

vi.mock('@startbet/st-core-ui', async () => {
  const actual: object = await vi.importActual('@startbet/st-core-ui')
  return {
    ...actual,
    StSwitch: {
      props: ['checked', 'label', 'iconOn', 'iconOff'],
      emits: ['update:checked'],
      template:
        '<button data-test="switch" :data-checked="String(checked)" @click="$emit(\'update:checked\', !checked)">{{ label }}</button>'
    }
  }
})

describe('ThemeSwitch', () => {
  beforeEach(() => {
    useThemeService().setTheme('dark')
  })

  it('reflete o tema atual no estado do switch', () => {
    const wrapper = mount(ThemeSwitch)

    expect(wrapper.get('[data-test="switch"]').attributes('data-checked')).toBe('true')
  })

  it('alterna entre dark e light ao mudar o switch', async () => {
    const wrapper = mount(ThemeSwitch)
    const { theme } = useThemeService()

    await wrapper.get('[data-test="switch"]').trigger('click')
    expect(theme.value).toBe('light')

    await wrapper.get('[data-test="switch"]').trigger('click')
    expect(theme.value).toBe('dark')
  })
})
