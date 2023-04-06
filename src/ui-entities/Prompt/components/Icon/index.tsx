import ReactEcs from '@dcl/sdk/react-ecs'

import { Icon, IconConfig } from '../../../Icon'

export type PromptIconConfig = IconConfig

const promptIconInitialConfig: Omit<Required<IconConfig>, 'section'> = {
  startHidden: false,
  image: '',
  width: 128,
  height: 128,
  xOffset: 0,
  yOffset: 0,
  size: 'large',
} as const

/**
 * Prompt icon
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string} image path to image file
 * @param {number} [width=128] image width
 * @param {number} [height=128] image height
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {IconSizeType} [size='large'] icon size
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class PromptIcon extends Icon {
  constructor(config: PromptIconConfig) {
    super({ ...config, initial: promptIconInitialConfig })
  }
}
