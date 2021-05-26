import { baseConfiguration } from 'vimond-replay/default-player/baseConfiguration'
import composePlayer from 'vimond-replay/playerComposer'
import renderPlayerUI from './renderPlayerUI'

const CustomPlayer = composePlayer({
  name: 'CustomPlayer',
  uiRenderMethod: renderPlayerUI,
  configuration: baseConfiguration
})

export default CustomPlayer
