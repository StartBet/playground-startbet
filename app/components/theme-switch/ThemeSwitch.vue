<script setup lang="ts">
import { computed } from 'vue'
import { StSwitch } from '@startbet/st-core-ui'
import { useThemeService } from '~/services/themeService'

defineOptions({ name: 'ThemeSwitch' })

const { theme, setTheme } = useThemeService()

const isDark = computed(() => theme.value === 'dark')

const handleChange = (checked: boolean) => {
  setTheme(checked ? 'dark' : 'light')
}
</script>

<template>
  <StSwitch
    :checked="isDark"
    label="Tema escuro"
    icon-on="moon"
    icon-off="sun"
    @update:checked="handleChange"
  />
</template>
