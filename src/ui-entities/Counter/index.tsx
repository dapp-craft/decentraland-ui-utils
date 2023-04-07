import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label } from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../UIObject'

import { toFixedLengthStringUtil } from '../../utils/textUtils'

import { defaultFont } from '../../constants/font'

export type CounterConfig = UIObjectConfig & {
  value: number;
  xOffset?: number;
  yOffset?: number;
  color?: Color4;
  size?: number;
  fixedDigits?: number;
}

const counterInitialConfig: Required<CounterConfig> = {
  startHidden: true,
  value: 0,
  xOffset: -40,
  yOffset: 70,
  color: Color4.White(),
  size: 25,
  fixedDigits: 0,
} as const

/**
 * Displays a number on the bottom-right of the UI.
 *
 * @param {boolean} [startHidden=true] starting hidden
 * @param {number} [value=0] starting value
 * @param {number} [xOffset=-40] position on X, to enable fitting several counters
 * @param {number} [yOffset=70] position on Y, to enable fitting several counters
 * @param {Color4} [color=Color4.White()] text color
 * @param {number} [size=25] text size
 * @param {boolean} [fixedDigits=0] display a specific amount of digits, regardless of the value, adding preceding 0s
 *
 */
export class Counter extends UIObject {
  private _value: number
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _color: Color4
  private readonly _size: number
  private readonly _fixedDigits: number
  private readonly _valueStep: number

  constructor(
    {
      startHidden = counterInitialConfig.startHidden,
      value = counterInitialConfig.value,
      xOffset = counterInitialConfig.xOffset,
      yOffset = counterInitialConfig.yOffset,
      color = counterInitialConfig.color,
      size = counterInitialConfig.size,
      fixedDigits = counterInitialConfig.fixedDigits,
    }: CounterConfig) {
    super({ startHidden })

    this._value = value
    this._xOffset = xOffset
    this._yOffset = yOffset
    this._color = color
    this._size = size
    this._fixedDigits = fixedDigits

    this._valueStep = 1
  }

  /**
   * Get the current value of the counter.
   *
   * @return {number} The current value of the counter
   *
   */
  public read(): number {
    return this._value
  }

  public set(value: number): void {
    this._value = value
  }

  /**
   * Increase the value on the counter.
   *
   * @param {number} [amount=1] How much to increase the counter. By default, it increases by 1
   *
   */
  public increase(amount?: number): void {
    this._value += amount ? amount : this._valueStep
  }

  /**
   * Decrease the value on the counter.
   *
   * @param {number} [amount=1] How much to decrease the counter. By default, it decreases by 1
   *
   */
  public decrease(amount?: number): void {
    this._value -= amount ? amount : this._valueStep
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <Label
        key={key}
        value={
          toFixedLengthStringUtil(
            {
              value: this._value,
              fixedDigits: this._fixedDigits,
            },
          )
        }
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