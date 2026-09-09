import { ref } from 'vue'

export type Theme = 'light' | 'dark'

export const DEFAULT_THEME: Theme = 'dark'

const theme = ref<Theme>(DEFAULT_THEME)

/**
 * O st-core-ui resolve seus tokens a partir do atributo `data-theme` no
 * elemento raiz. O `color-scheme` acompanha para que scrollbars e controles
 * nativos sigam o mesmo tema.
 */
const applyThemeToDocument = (newTheme: Theme) => {
  if (typeof document === 'undefined' || !document?.documentElement) return

  document.documentElement.setAttribute('data-theme', newTheme)
  document.documentElement.style.colorScheme = newTheme
}

applyThemeToDocument(theme.value)

export const useThemeService = () => {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    applyThemeToDocument(newTheme)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    setTheme,
    toggleTheme
  }
}
