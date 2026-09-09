import { describe, it, expect } from 'vitest'

describe('Exemplo de teste', () => {
  it('deve somar dois números corretamente', () => {
    const soma = (a: number, b: number) => a + b
    expect(soma(2, 3)).toBe(5)
  })

  it('deve verificar se array contém item', () => {
    const items = ['nuxt', 'vue', 'tailwind']
    expect(items).toContain('tailwind')
  })
})
