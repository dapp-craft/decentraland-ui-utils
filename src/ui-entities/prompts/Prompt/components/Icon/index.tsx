import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'

import { InPromptUIObject, InPromptUIObjectConfig } from '../../InPromptUIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../../../../utils/imageUtils'

export type PromptIconConfig = InPromptUIObjectConfig & {
  image: string;
  width?: number;
  height?: number;
  xPosition?: number;
  yPosition?: number;
  section?: ImageAtlasData;
  promptWidth: number;
  promptHeight: number;
}

const promptIconInitialConfig: Omit<Required<PromptIconConfig>, 'section'> = {
  startHidden: false,
  promptVisible: false,
  image: '',
  width: 128,
  height: 128,
  xPosition: 0,
  yPosition: 0,
  promptWidth: 400,
  promptHeight: 250,
} as const

/**
 * Prompt icon
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string} image path to image file
 * @param {number} [width=128] image width
 * @param {number} [height=128] image height
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class PromptIcon extends InPromptUIObject {
  public image: EntityPropTypes

  private readonly _width: number
  private readonly _height: number
  private readonly _xPosition: number
  private readonly _yPosition: number

  constructor(
    {
      startHidden = promptIconInitialConfig.startHidden,
      image = promptIconInitialConfig.image,
      width = promptIconInitialConfig.width,
      height = promptIconInitialConfig.height,
      xPosition = promptIconInitialConfig.xPosition,
      yPosition = promptIconInitialConfig.yPosition,
      promptVisible = promptIconInitialConfig.promptVisible,
      section,
      promptWidth,
      promptHeight,
    }: PromptIconConfig) {
    super({ startHidden: startHidden || !promptVisible, promptVisible })

    this._width = width
    this._height = height

    this._xPosition = promptWidth / -2 + this._width / 2 + xPosition
    this._yPosition = promptHeight / 2 + this._height / -2 + yPosition

    this.image = {
      uiTransform: {
        width: this._width,
        height: this._height,
        positionType: 'absolute',
        position: { bottom: this._yPosition, right: this._xPosition * -1 },
      },
      uiBackground: {
        textureMode: 'stretch',
        texture: {
          src: image,
        },
        uvs: getImageAtlasMapping(section),
      },
    }
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <UiEntity
        key={key}
        {...this.image}
        uiTransform={{
          ...this.image.uiTransform,
          display: (this.visible && this._promptVisible) ? 'flex' : 'none',
        }}
      />
    )
  }
}
