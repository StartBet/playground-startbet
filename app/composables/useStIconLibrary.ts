import type { IconDefinitionOrPack } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'

export const useStIconLibrary = () => {
  const addIcons = (...icons: Array<IconDefinitionOrPack | IconDefinitionOrPack[]>) => {
    library.add(...icons)
  }

  return { addIcons }
}
