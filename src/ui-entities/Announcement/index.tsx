import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Label } from '@dcl/sdk/react-ecs'

import { DelayedHidingUIObject, DelayedHidingUIObjectConfig } from '../UIObject'

import { defaultFont } from '../../constants/font'

export type AnnouncementConfig = DelayedHidingUIObjectConfig & {
  value: string | number;
  duration?: number;
  xOffset?: number;
  yOffset?: number;
  color?: Color4;
  size?: number;
}

const announcementInitialConfig: Required<AnnouncementConfig> = {
  startHidden: true,
  value: '',
  duration: 3,
  xOffset: 0,
  yOffset: 0,
  color: Color4.Yellow(),
  size: 50,
} as const

/**
 * Displays a text on center of the UI.
 *
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string | number} [value=''] starting value
 * @param {number} [duration=3] duration time to keep the text visible (in seconds) if starting visible
 * @param {number} [xOffset=0] offset on X
 * @param {number} [yOffset=0] offset on Y
 * @param {Color4} [color=Color4.Yellow()] text color
 * @param {number} [size=50] text size
 *
 */
export class Announcement extends DelayedHidingUIObject {
  private readonly _value: string | number
  private readonly _xOffset: number
  private readonly _yOffset: number
  private readonly _color: Color4
  private readonly _size: number

  constructor(
    {
      startHidden = announcementInitialConfig.startHidden,
      value = announcementInitialConfig.value,
      duration = announcementInitialConfig.duration,
      xOffset = announcementInitialConfig.xOffset,
      yOffset = announcementInitialConfig.yOffset,
      color = announcementInitialConfig.color,
      size = announcementInitialConfig.size,
    }: AnnouncementConfig) {
    super({ startHidden, duration })

    this._value = value
    this._xOffset = xOffset
    this._yOffset = yOffset
    this._color = color
    this._size = size
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <Label
        key={key}
        value={String(this._value)}
        color={this._color}
        fontSize={this._size}
        textAlign='bottom-center'
        font={defaultFont}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          positionType: 'absolute',
          position: { bottom: '50%', left: '50%' },
          margin: { left: this._xOffset, bottom: this._yOffset },
        }}
      />
    )
  }
}