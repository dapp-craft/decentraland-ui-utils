import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../constants/resources'

export enum BarStyles {
  ROUNDBLACK = `roundBlack`,
  ROUNDWHITE = `roundWhite`,
  ROUNDSILVER = `roundSilver`,
  ROUNDGOLD = `roundGold`,
  SQUAREBLACK = `squareBlack`,
  SQUAREWHITE = `squareWhite`,
  SQUARESILVER = `squareSilver`,
  SQUAREGOLD = `squareGold`
}

export type ProgressBarConfig = UIObjectConfig & {
  value: number;
  scale?: number;
  color?: Color4;
  xOffset?: number;
  yOffset?: number;
  style?: BarStyles;
}

const progressBarInitialConfig: Required<ProgressBarConfig> = {
  startHidden: true,
  value: 0,
  scale: 1,
  color: Color4.Red(),
  xOffset: -30,
  yOffset: 60,
  style: BarStyles.ROUNDSILVER,
} as const

/**
 * Displays a colored bar that can be filled up and updated to different values.
 *
 * @param {boolean} [startHidden=true] startHidden starting hidden
 * @param {number} [value=0] starting value
 * @param {number} [xOffset=-30] offset on X
 * @param {number} [yOffset=60] offset on Y
 * @param {Color4} [fillColor=Color4.Red()] color of the bar
 * @param {BarStyles} [style=BarStyles.ROUNDSILVER] margin style of the bar, from the BarStyles enum
 * @param {number} [scale=1] multiplier for the size of the bar. 1 = 128 x 32
 *
 */
export class ProgressBar extends UIObject {
  private _value: number
  private readonly _scale: number
  private readonly _color: Color4
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _style: BarStyles

  private readonly _valueMax: number
  private readonly _valueMin: number
  private readonly _valueChangeStep: number

  private readonly _width: number
  private readonly _height: number

  private readonly _progressWidth: number
  private readonly _progressHeight: number
  private readonly _progressPaddingTop: number
  private readonly _progressPaddingBottom: number
  private readonly _progressPaddingLeft: number
  private readonly _progressPaddingRight: number

  private readonly _section: ImageAtlasData

  constructor(
    {
      startHidden = progressBarInitialConfig.startHidden,
      value = progressBarInitialConfig.value,
      scale = progressBarInitialConfig.scale,
      color = progressBarInitialConfig.color,
      xOffset = progressBarInitialConfig.xOffset,
      yOffset = progressBarInitialConfig.yOffset,
      style = progressBarInitialConfig.style,
    }: ProgressBarConfig) {
    super({ startHidden })

    this._value = value
    this._scale = scale
    this._color = color
    this._xOffset = xOffset
    this._yOffset = yOffset
    this._style = style

    this._valueMax = 1
    this._valueMin = 0
    this._valueChangeStep = 0.1

    this._width = 128 * this._scale
    this._height = 32 * this._scale

    const isNotDefaultBorders = (
      this._style === BarStyles.ROUNDWHITE ||
      this._style === BarStyles.ROUNDBLACK ||
      this._style === BarStyles.SQUAREWHITE ||
      this._style === BarStyles.SQUAREBLACK
    )

    this._progressPaddingTop = (isNotDefaultBorders ? 3 : 2) * this._scale
    this._progressPaddingBottom = (isNotDefaultBorders ? 3 : 4) * this._scale
    this._progressPaddingLeft = (isNotDefaultBorders ? 3 : 2) * this._scale
    this._progressPaddingRight = (isNotDefaultBorders ? 3 : 2) * this._scale
    this._progressWidth = this._width * this._value - this._progressPaddingLeft - this._progressPaddingRight
    this._progressHeight = this._height - this._progressPaddingTop - this._progressPaddingBottom

    this._section = {
      ...sourcesComponentsCoordinates.buttons[this._style],
      atlasHeight: sourcesComponentsCoordinates.atlasHeight,
      atlasWidth: sourcesComponentsCoordinates.atlasWidth,
    }
  }

  /**
   * Get the current value of the bar
   *  * @return {number} The current value of the bar, as a value from 0 to 1
   *
   */
  public read(): number {
    return this._value
  }

  /**
   * Sets the bar's value to a specific amount, regardless of what it was before.
   *
   * @param {number} amount New value for the bar, between 0 and 1
   *
   */
  public set(amount: number): void {
    this._setValueInRange(amount)
  }

  /**
   * Increase the value on the bar.
   *
   * @param {number} [amount=0.1] How much to increase the bar, up to a maximum of 1. By default, it increases by 0.1
   *
   */
  public increase(amount?: number): void {
    this._setValueInRange(this._value + (amount ? amount : this._valueChangeStep))
  }

  /**
   * Decrease the value on the bar.
   *
   * @param {number} [amount=0.1] How much to decrease the bar, down to a minimum of 0. By default, it decreases by 0.1
   *
   */
  public decrease(amount?: number): void {
    this._setValueInRange(this._value - (amount ? amount : this._valueChangeStep))
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
      >
        <UiEntity
          uiTransform={{
            width: '100%',
            height: '100%',
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: AtlasTheme.ATLAS_PATH_LIGHT,
            },
            uvs: getImageAtlasMapping(this._section),
          }}
        />
        <UiEntity
          uiTransform={{
            width: this._progressWidth,
            height: this._progressHeight,
            positionType: 'absolute',
            position: {
              top: this._progressPaddingTop,
              left: this._progressPaddingLeft,
            },
          }}
          uiBackground={{
            color: this._color,
            textureMode: 'stretch',
            texture: {
              src: AtlasTheme.ATLAS_PATH_LIGHT,
            },
            uvs: getImageAtlasMapping({
              ...sourcesComponentsCoordinates.buttons[this._style.startsWith('round') ? 'roundWhite' : 'squareWhite'],
              atlasHeight: sourcesComponentsCoordinates.atlasHeight,
              atlasWidth: sourcesComponentsCoordinates.atlasWidth,
            }),
          }}
        />
      </UiEntity>
    )
  }

  private _setValueInRange(value: number): void {
    this._value = (value > this._valueMax) ? this._valueMax : (value < this._valueMin) ? this._valueMin : value
  }
}