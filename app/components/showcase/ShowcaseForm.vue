<script setup lang="ts">
import { ref } from 'vue'
import {
  StCheckbox,
  StInput,
  StRadio,
  StRadioGroup,
  StSelect,
  StSwitch
} from '@startbet/st-core-ui'
import ShowcaseCard from './ShowcaseCard.vue'

defineOptions({ name: 'ShowcaseForm' })

const email = ref('')
const sport = ref<string | number>('futebol')
const acceptedTerms = ref(true)
const notifications = ref(false)
const period = ref('semana')

const sportOptions = [
  { name: 'Futebol', value: 'futebol' },
  { name: 'Basquete', value: 'basquete' },
  { name: 'Tênis', value: 'tenis' }
]
</script>

<template>
  <ShowcaseCard
    icon="keyboard"
    title="Formulário"
    description="Input, select, checkbox, switch e radio com label e mensagens."
  >
    <StInput
      v-model:value="email"
      label="E-mail"
      type="email"
      icon="envelope"
      placeholder="voce@start.bet.br"
      message-info="Usamos apenas para o protótipo."
    />

    <StSelect v-model:value="sport" label="Esporte" icon="dice" :options="sportOptions" />

    <div class="flex flex-col gap-st-2">
      <StCheckbox v-model:checked="acceptedTerms" label="Aceito os termos" />
      <StSwitch v-model:checked="notifications" label="Receber notificações" />
    </div>

    <StRadioGroup v-model:value="period" orientation="horizontal">
      <StRadio value="dia" label="Dia" />
      <StRadio value="semana" label="Semana" />
      <StRadio value="mes" label="Mês" />
    </StRadioGroup>
  </ShowcaseCard>
</template>
