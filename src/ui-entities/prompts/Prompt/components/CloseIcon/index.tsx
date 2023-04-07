import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { UIObject, UIObjectConfig } from '../../../../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../../constants/resources'

export enum PromptCloseIconStyles {
  CLOSEW = `closeW`,
  CLOSED = `closeD`,
}

export type PromptCloseIconConfig = UIObjectConfig & {
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
export class PromptCloseIcon extends UIObject {
  private readonly _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _onMouseDown: Callback

  constructor(
    {
      startHidden = promptCloseIconInitialConfig.startHidden,
      style = promptCloseIconInitialConfig.style,
      width = sourcesComponentsCoordinates.icons[style].sourceWidth,
      height = sourcesComponentsCoordinates.icons[style].sourceHeight,
      xPosition = promptCloseIconInitialConfig.xPosition,
      yPosition = promptCloseIconInitialConfig.yPosition,
      onMouseDown = promptCloseIconInitialConfig.onMouseDown,
    }: PromptCloseIconConfig) {
    super({ startHidden })

    this._section = {
      ...sourcesComponentsCoordinates.icons[style],
      atlasHeight: sourcesComponentsCoordinates.atlasHeight,
      atlasWidth: sourcesComponentsCoordinates.atlasWidth,
    }

    this._width = width
    this._height = height
    this._xPosition = xPosition
    this._yPosition = yPosition
    this._onMouseDown = onMouseDown
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <UiEntity
        key={key}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          width: this._width,
          height: this._height,
          positionType: 'absolute',
          position: { top: this._yPosition, right: this._xPosition },
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: AtlasTheme.ATLAS_PATH_LIGHT,
          },
          uvs: getImageAtlasMapping(this._section),
        }}
        onMouseDown={this._onMouseDown}
      />
    )
  }
}
