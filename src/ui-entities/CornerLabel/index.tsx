import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label } from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../UIObject'

import { defaultFont } from '../../constants/font'

export type CornerLabelConfig = UIObjectConfig & {
  value: string | number;
  xOffset?: number;
  yOffset?: number;
  color?: Color4;
  size?: number;
}

const cornerLabelInitialConfig: Required<CornerLabelConfig> = {
  startHidden: true,
  value: '',
  xOffset: -40,
  yOffset: 70,
  color: Color4.White(),
  size: 25,
} as const

/**
 * Displays a text on center of the UI.
 *
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string | number} [value=''] starting value
 * @param {number} [xOffset=-40] offset on X
 * @param {number} [yOffset=70] offset on Y
 * @param {Color4} [color=Color4.White()] text color
 * @param {number} [size=25] text size
 *
 */
export class CornerLabel extends UIObject {
  private _value: string | number
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _color: Color4
  private readonly _size: number

  constructor(
    {
      startHidden = cornerLabelInitialConfig.startHidden,
      value = cornerLabelInitialConfig.value,
      xOffset = cornerLabelInitialConfig.xOffset,
      yOffset = cornerLabelInitialConfig.yOffset,
      color = cornerLabelInitialConfig.color,
      size = cornerLabelInitialConfig.size,
    }: CornerLabelConfig) {
    super({ startHidden })

    this._value = value
    this._xOffset = xOffset
    this._yOffset = yOffset
    this._color = color
    this._size = size
  }

  /**
   * Sets the label's value to a new string.
   *
   * @param {string | number} [newValue=''] New value for the label
   *
   */
  public set(newValue: string | number = ''): void {
    this._value = newValue
  }

  public render(): ReactEcs.JSX.Element {
    return (
      <Label
        value={String(this._value)}
        color={this._color}
        fontSize={this._size}
        textAlign='bottom-right'
        font={defaultFont}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          positionType: 'absolute',
          position: { bottom: this._yOffset, right: this._xOffset * -1 },
        }}
      />
    )
  }
}