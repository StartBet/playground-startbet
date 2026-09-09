import { beforeEach } from 'vitest'
import { config } from '@vue/test-utils'

beforeEach(() => {
  config.global.stubs = {
    NuxtLink: {
      props: ['to'],
      template: '<a :href="to"><slot /></a>'
    }
  }
})
