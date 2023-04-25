import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'

import { InPromptUIObject, InPromptUIObjectConfig } from '../../InPromptUIObject'

import { getImageAtlasMapping } from '../../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../../constants/resources'

export enum PromptCloseIconStyles {
  CLOSEW = `closeW`,
  CLOSED = `closeD`,
}

export type PromptCloseIconConfig = InPromptUIObjectConfig & {
  style: PromptCloseIconStyles;
  width?: number;
  height?: number;
  xPosition?: number;
  yPosition?: number;
  onMouseDown: Callback;
}

const promptCloseIconInitialConfig: Required<PromptCloseIconConfig> = {
  startHidden: false,
  style: PromptCloseIconStyles.CLOSED,
  width: 32,
  height: 32,
  xPosition: 10,
  yPosition: 10,
  onMouseDown: () => {
  },
  promptVisible: false,
  promptWidth: 400,
  promptHeight: 250,
  darkTheme: false,
} as const

/**
 * Prompt close button
 * @param {boolean} [startHidden=false] starting hidden
 * @param {PromptCloseIconStyles} [style=CloseIconStyles.CLOSED] visible variant
 * @param {number} [width=32] image width
 * @param {number} [height=32] image height
 * @param {number} [xPosition=0] position on X
 * @param {number} [yPosition=0] position on Y
 * @param {Callback} [onMouseDown=0] click action
 *
 */
export class PromptCloseIcon extends InPromptUIObject {
  public iconElement: EntityPropTypes

  public style: PromptCloseIconStyles
  public width: number
  public height: number
  public xPosition: number
  public yPosition: number
  public onMouseDown: Callback

  constructor(
    {
      startHidden = promptCloseIconInitialConfig.startHidden,
      style = promptCloseIconInitialConfig.style,
      width = sourcesComponentsCoordinates.icons[style].sourceWidth,
      height = sourcesComponentsCoordinates.icons[style].sourceHeight,
      xPosition = promptCloseIconInitialConfig.xPosition,
      yPosition = promptCloseIconInitialConfig.yPosition,
      onMouseDown = promptCloseIconInitialConfig.onMouseDown,
      promptVisible = promptCloseIconInitialConfig.promptVisible,
      promptWidth,
      promptHeight,
      darkTheme,
    }: PromptCloseIconConfig) {
    super({ startHidden: startHidden || !promptVisible, promptVisible, promptWidth, promptHeight, darkTheme })

    this.onMouseDown = onMouseDown

    this.width = width
    this.height = height
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.style = style

    this.iconElement = {
      uiBackground: {
        textureMode: 'stretch',
        texture: {
          src: AtlasTheme.ATLAS_PATH_LIGHT,
        },
      },
      uiTransform: {
        positionType: 'absolute',
      },
    }
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <UiEntity
        key={key}
        {...this.iconElement}
        uiBackground={{
          ...this.iconElement.uiBackground,
          uvs: getImageAtlasMapping({
            ...sourcesComponentsCoordinates.icons[this.style],
            atlasHeight: sourcesComponentsCoordinates.atlasHeight,
            atlasWidth: sourcesComponentsCoordinates.atlasWidth,
          }),
        }}
        uiTransform={{
          ...this.iconElement.uiTransform,
          display: (this.visible && this.promptVisible) ? 'flex' : 'none',
          width: this.width,
          height: this.height,
          position: { top: this.yPosition, right: this.xPosition },
        }}
        onMouseDown={this.onMouseDown}
      />
    )
  }
}
