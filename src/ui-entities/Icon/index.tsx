import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

type IconSizeType = 'small' | 'medium' | 'large';

export type IconConfig = UIObjectConfig & {
  image: string;
  width?: number;
  height?: number;
  xOffset?: number;
  yOffset?: number;
  size?: IconSizeType;
  section?: ImageAtlasData;
}

export type IconInitialConfig = {
  initial?: Omit<Required<IconConfig>, 'section'>
}

enum IconSize {
  'small' = 32,
  'medium' = 64,
  'large' = 128,
}

const iconInitialConfig: Omit<Required<IconConfig>, 'section'> = {
  startHidden: true,
  image: '',
  width: 128,
  height: 128,
  xOffset: 0,
  yOffset: 0,
  size: 'large',
} as const

/**
 * Displays an icon in the bottom-left corner.
 *
 * @param {boolean} [startHidden=true] startHidden starting hidden
 * @param {string} image path to image file
 * @param {number} width image width
 * @param {number} height image height
 * @param {number} [xOffset=-30] offset on X
 * @param {number} [yOffset=50] offset on Y
 * @param {IconSizeType} [size='medium'] icon size
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class Icon extends UIObject {
  private readonly _image: string
  private readonly _width: number
  private readonly _height: number
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _section?: ImageAtlasData

  constructor(
    {
      initial = iconInitialConfig,
      startHidden = initial.startHidden,
      image = initial.image,
      size = initial.size,
      width = IconSize[size],
      height = IconSize[size],
      xOffset = initial.xOffset,
      yOffset = initial.yOffset,
      section,
    }: IconConfig & IconInitialConfig) {
    super({ startHidden })

    this._image = image
    this._width = width
    this._height = height
    this._xOffset = xOffset
    this._yOffset = yOffset
    if (section) this._section = section
  }

  public render(): ReactEcs.JSX.Element {
    return (
      <UiEntity
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          width: this._width,
          height: this._height,
          positionType: 'absolute',
          position: { bottom: this._yOffset, right: this._xOffset * -1 },
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

const smallIconInitialConfig: Omit<Required<IconConfig>, 'section'> = {
  startHidden: true,
  image: '',
  width: 32,
  height: 32,
  xOffset: -30,
  yOffset: 50,
  size: 'large',
} as const

/**
 * Displays an icon of 32x32 in the bottom-left corner.
 *
 * @param {boolean} [startHidden=false] startHidden starting hidden
 * @param {string} image path to image file
 * @param {number} [width=32] image width
 * @param {number} [height=32] image height
 * @param {number} [xOffset=-30] offset on X
 * @param {number} [yOffset=50] offset on Y
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class SmallIcon extends Icon {
  constructor(config: IconConfig) {
    super({ ...config, size: 'small', initial: smallIconInitialConfig })
  }
}

const mediumIconInitialConfig: Omit<Required<IconConfig>, 'section'> = {
  startHidden: true,
  image: '',
  width: 64,
  height: 64,
  xOffset: -30,
  yOffset: 50,
  size: 'large',
} as const

/**
 * Displays an icon of 64x64 in the bottom-left corner.
 *
 * @param {boolean} [startHidden=false] startHidden starting hidden
 * @param {string} image path to image file
 * @param {number} [width=64] image width
 * @param {number} [height=64] image height
 * @param {number} [xOffset=-30] offset on X
 * @param {number} [yOffset=50] offset on Y
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class MediumIcon extends Icon {
  constructor(config: IconConfig) {
    super({ ...config, size: 'medium', initial: mediumIconInitialConfig })
  }
}

const largeIconInitialConfig: Omit<Required<IconConfig>, 'section'> = {
  startHidden: true,
  image: '',
  width: 128,
  height: 128,
  xOffset: -30,
  yOffset: 50,
  size: 'large',
} as const

/**
 * Displays an icon of 128x128 in the bottom-left corner.
 *
 * @param {boolean} [startHidden=false] startHidden starting hidden
 * @param {string} image path to image file
 * @param {number} [width=128] image width
 * @param {number} [height=128] image height
 * @param {number} [xOffset=-30] offset on X
 * @param {number} [yOffset=50] offset on Y
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class LargeIcon extends Icon {
  constructor(config: IconConfig) {
    super({ ...config, size: 'large', initial: largeIconInitialConfig })
  }
}