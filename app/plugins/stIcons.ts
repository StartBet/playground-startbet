import {
  faArrowDown,
  faBell,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faDice,
  faEnvelope,
  faFont,
  faHandPointer,
  faKeyboard,
  faLayerGroup,
  faMoon,
  faPalette,
  faSun,
  faUpRightFromSquare,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { useStIconLibrary } from '~/composables/useStIconLibrary'

/**
 * O `StIcon` do st-core-ui usa o Font Awesome, que só desenha ícones já
 * registrados na library. Todo ícone novo usado em um protótipo — inclusive os
 * passados via `iconLeft`, `iconRight` e `icon` — precisa ser adicionado aqui.
 *
 * Os `chevron-*` e o `xmark` são usados internamente pelo StSelect, StCarousel,
 * StChip e StModal: não remova.
 *
 * Para ícones de marca (`lib="fab"`), importe de
 * `@fortawesome/free-brands-svg-icons` e adicione na mesma chamada.
 */
export default defineNuxtPlugin(() => {
  const { addIcons } = useStIconLibrary()

  addIcons(
    faArrowDown,
    faBell,
    faCheck,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faDice,
    faEnvelope,
    faFont,
    faHandPointer,
    faKeyboard,
    faLayerGroup,
    faMoon,
    faPalette,
    faSun,
    faUpRightFromSquare,
    faXmark
  )
})
