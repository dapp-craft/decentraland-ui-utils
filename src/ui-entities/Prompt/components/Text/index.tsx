import ReactEcs, { Label } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiLabelProps } from '@dcl/react-ecs/dist/components/Label/types'

import { UIObject, UIObjectConfig } from '../../../UIObject'

import { defaultFont } from '../../../../constants/font'

export type PromptTextConfig = UIObjectConfig & {
  value: string | number;
  xPosition: number;
  yPosition: number;
  darkTheme?: boolean;
  color?: Color4;
  size?: number;
}

const promptTextInitialConfig: Required<PromptTextConfig> = {
  startHidden: false,
  value: '',
  xPosition: 0,
  yPosition: 0,
  darkTheme: false,
  color: Color4.Black(),
  size: 15,
} as const

/**
 * Prompt text
 * @param {boolean} [startHidden=false] startHidden starting hidden
 * @param {string | number} [value=''] starting value
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {boolean} [darkTheme=false] prompt color style
 * @param {Color4} [color=Color4.Black()] text color
 * @param {number} [size=15] text size
 *
 */
export class PromptText extends UIObject {
  public text: EntityPropTypes & UiLabelProps

  constructor(
    {
      startHidden = promptTextInitialConfig.startHidden,
      value = promptTextInitialConfig.value,
      xPosition = promptTextInitialConfig.xPosition,
      yPosition = promptTextInitialConfig.yPosition,
      darkTheme = promptTextInitialConfig.darkTheme,
      color = darkTheme ? Color4.White() : Color4.Black(),
      size = promptTextInitialConfig.size,
    }: PromptTextConfig) {
    super({ startHidden })

    this.text = {
      value: String(value),
      uiTransform: {
        display: this.visible ? 'flex' : 'none',
        maxWidth: '100%',
        positionType: 'absolute',
        position: { top: '50%', left: '50%' },
        margin: { left: xPosition, top: yPosition * -1 },
      },
      textAlign: 'middle-center',
      font: defaultFont,
      color,
      fontSize: size,
    }
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <Label
        key={key}
        {...this.text}
      />
    )
  }
}
