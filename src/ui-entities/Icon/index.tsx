import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'

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
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string} image path to image file
 * @param {number} [width=128] image width
 * @param {number} [height=128] image height
 * @param {number} [xOffset=0] offset on X
 * @param {number} [yOffset=0] offset on Y
 * @param {IconSizeType} [size='large'] icon size
 * @param {ImageAtlasData} section cut out a section of the image, as an object specifying atlasWidth, atlasHeight, sourceLeft, sourceTop, sourceWidth and sourceHeight
 *
 */
export class Icon extends UIObject {
  public imageElement: EntityPropTypes

  public image: string
  public size: IconSizeType
  public width: number
  public height: number
  public xOffset: number
  public yOffset: number
  public section: ImageAtlasData | undefined

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

    this.image = image
    this.size = size
    this.width = width
    this.height = height
    this.xOffset = xOffset
    this.yOffset = yOffset
    if (section) this.section = section

    this.imageElement = {
      uiBackground: {
        textureMode: 'stretch',
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
        {...this.imageElement}
        uiBackground={{
          ...this.imageElement.uiBackground,
          texture: {
            src: this.image,
          },
          uvs: getImageAtlasMapping(this.section),
        }}
        uiTransform={{
          ...this.imageElement.uiTransform,
          width: this.width,
          height: this.height,
          display: this.visible ? 'flex' : 'none',
          position: { bottom: this.yOffset, right: this.xOffset * -1 },
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
 * @param {boolean} [startHidden=false] starting hidden
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
 * @param {boolean} [startHidden=false] starting hidden
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
 * @param {boolean} [startHidden=false] starting hidden
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