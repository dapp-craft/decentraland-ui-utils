import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { DelayedHidingUIObject, DelayedHidingUIObjectConfig } from '../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

type CenterImageConfig = DelayedHidingUIObjectConfig & {
  image: string;
  duration: number;
  width?: number;
  height?: number;
  xOffset?: number;
  yOffset?: number;
  section?: ImageAtlasData;
}

const centerImageInitialConfig: Omit<Required<CenterImageConfig>, 'section'> = {
  image: '',
  duration: 0,
  startHidden: true,
  width: 512,
  height: 512,
  xOffset: 0,
  yOffset: 0,
} as const

/**
 * Displays an image of 512x512 in the center of the screen for limited time.
 *
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string} image path to image file
 * @param {number} [duration=0] duration time to keep the image visible (in seconds) if starting visible
 * @param {number} [xOffset=0] offset on X
 * @param {number} [yOffset=0] offset on Y
 * @param {number} [width=512] image width
 * @param {number} [height=512] image height
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class CenterImage extends DelayedHidingUIObject {
  private readonly _image: string
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _width: number
  private readonly _height: number
  private readonly _section?: ImageAtlasData

  constructor(
    {
      startHidden = centerImageInitialConfig.startHidden,
      image = centerImageInitialConfig.image,
      duration = centerImageInitialConfig.duration,
      width = centerImageInitialConfig.width,
      height = centerImageInitialConfig.height,
      xOffset = centerImageInitialConfig.xOffset,
      yOffset = centerImageInitialConfig.yOffset,
      section,
    }: CenterImageConfig) {
    super({ startHidden, duration })

    this._image = image
    this._width = width
    this._height = height
    this._xOffset = xOffset
    this._yOffset = yOffset
    if (section) this._section = section
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
            src: this._image,
          },
          uvs: getImageAtlasMapping(this._section),
        }}
      />
    )
  }
}
