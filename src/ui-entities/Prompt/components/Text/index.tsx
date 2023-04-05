import ReactEcs, { Label } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

import { UIObject, UIObjectConfig } from '../../../UIObject'

import { defaultFont } from '../../../../constants/font'

export type TextConfig = UIObjectConfig & {
  value: string | number;
  xPosition?: number;
  yPosition?: number;
  darkTheme?: boolean;
  color?: Color4;
  size?: number;
}

const textInitialConfig: Required<TextConfig> = {
  startHidden: false,
  value: '',
  xPosition: 0,
  yPosition: 0,
  darkTheme: false,
  color: Color4.Black(),
  size: 15,
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] startHidden starting hidden
 *
 */
export class Text extends UIObject {
  private readonly _value: string | number
  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _darkTheme: boolean
  private readonly _color: Color4
  private readonly _size: number

  constructor(
    {
      startHidden = textInitialConfig.startHidden,
      value = textInitialConfig.value,
      xPosition = textInitialConfig.xPosition,
      yPosition = textInitialConfig.yPosition,
      darkTheme = textInitialConfig.darkTheme,
      color = darkTheme ? Color4.White() : Color4.Black(),
      size = textInitialConfig.size,
    }: TextConfig) {
    super({ startHidden })

    this._value = value
    this._xPosition = xPosition
    this._yPosition = yPosition
    this._darkTheme = darkTheme
    this._color = color
    this._size = size
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <Label
        key={key}
        value={String(this._value)}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          maxWidth: '100%',
          positionType: 'absolute',
          position: { top: '50%', left: '50%' },
          margin: { left: this._xPosition, top: this._yPosition * -1 }
        }}
        textAlign='middle-center'
        font={defaultFont}
        color={this._color}
        fontSize={this._size}
      />
    )
  }
}
