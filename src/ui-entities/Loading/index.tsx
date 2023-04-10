import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { DelayedHidingUIObject, DelayedHidingUIObjectConfig } from '../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../constants/resources'

type LoadingConfig = DelayedHidingUIObjectConfig & {
  duration?: number;
  xOffset?: number;
  yOffset?: number;
  scale?: number;
}

type LoadingSizeConfig = {
  width: number;
  height: number;
}

const loadingInitialConfig: Required<LoadingConfig & LoadingSizeConfig> = {
  startHidden: true,
  duration: 0,
  xOffset: 0,
  yOffset: 0,
  width: 50,
  height: 66,
  scale: 1,
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] starting hidden
 * @param {number} [duration=0] duration time to keep the icon visible (in seconds) if starting visible
 * @param {number} [xOffset=0] offset on X
 * @param {number} [yOffset=0] offset on Y
 * @param {number} [scale=1] multiplier for the size of the bar. 1 = 50 x 66
 *
 */
export class Loading extends DelayedHidingUIObject {
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _width: number
  private readonly _height: number

  private readonly _section: ImageAtlasData

  constructor(
    {
      startHidden = loadingInitialConfig.startHidden,
      duration = loadingInitialConfig.duration,
      xOffset = loadingInitialConfig.xOffset,
      yOffset = loadingInitialConfig.yOffset,
      scale = loadingInitialConfig.scale,
    }: LoadingConfig | undefined = {}) {
    super({ startHidden, duration })

    this._width = loadingInitialConfig.width * scale
    this._height = loadingInitialConfig.height * scale
    this._xOffset = xOffset
    this._yOffset = yOffset

    this._section = {
      ...sourcesComponentsCoordinates.icons['TimerLarge'],
      atlasHeight: sourcesComponentsCoordinates.atlasHeight,
      atlasWidth: sourcesComponentsCoordinates.atlasWidth,
    }
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
          position: { top: '50%', left: '50%' },
          margin: { top: this._yOffset * -1 - this._height / 2, left: this._xOffset - this._width / 2 },
        }}
        uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: AtlasTheme.ATLAS_PATH_LIGHT,
          },
          uvs: getImageAtlasMapping(this._section),
        }}
      />
    )
  }
}
