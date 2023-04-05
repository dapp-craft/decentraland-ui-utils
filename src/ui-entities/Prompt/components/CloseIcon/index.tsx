import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { UIObject, UIObjectConfig } from '../../../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../constants/resources'

export enum CloseIconStyles {
  CLOSEW = `closeW`,
  CLOSED = `closeD`,
}

export type CloseIconConfig = UIObjectConfig & {
  style: CloseIconStyles;
  width?: number;
  height?: number;
  xPosition?: number;
  yPosition?: number;
  onMouseDown: Callback;
}

const promptInitialConfig: Required<CloseIconConfig> = {
  startHidden: false,
  style: CloseIconStyles.CLOSED,
  width: 32,
  height: 32,
  xPosition: 10,
  yPosition: 10,
  onMouseDown: () => {
  },
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] startHidden starting hidden
 *
 */
export class CloseIcon extends UIObject {
  private readonly _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _onMouseDown: Callback

  constructor(
    {
      startHidden = promptInitialConfig.startHidden,
      style = promptInitialConfig.style,
      width = sourcesComponentsCoordinates.icons[style].sourceWidth,
      height = sourcesComponentsCoordinates.icons[style].sourceHeight,
      xPosition = promptInitialConfig.xPosition,
      yPosition = promptInitialConfig.yPosition,
      onMouseDown = promptInitialConfig.onMouseDown,
    }: CloseIconConfig) {
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
