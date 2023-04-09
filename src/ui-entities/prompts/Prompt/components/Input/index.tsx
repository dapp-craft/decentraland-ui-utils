import ReactEcs, { Input } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiInputProps } from '@dcl/react-ecs/dist/components/Input/types'

import { UIObject, UIObjectConfig } from '../../../../UIObject'

import { defaultFont } from '../../../../../constants/font'

export type PromptInputConfig = UIObjectConfig & {
  placeholder?: string | number;
  xPosition: number;
  yPosition: number;
  onChange?: (value: string) => void;
  promptWidth: number;
  promptHeight: number;
}

const promptInputInitialConfig: Required<PromptInputConfig> = {
  startHidden: false,
  placeholder: 'Fill in',
  xPosition: 0,
  yPosition: 0,
  onChange: () => {
  },
  promptWidth: 400,
  promptHeight: 250,
} as const

/**
 * Prompt input box
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string | number} [placeholder='Fill in'] Default string to display in the box
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {() => void} onChange Function to call every time the value in the text box is modified by the player
 *
 */
export class PromptInput extends UIObject {
  public fillInBox: EntityPropTypes & Partial<UiInputProps>
  public currentText: string = ''

  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _width: number
  private readonly _height: number
  private readonly _onChange: (value: string) => void

  constructor(
    {
      startHidden = promptInputInitialConfig.startHidden,
      placeholder = promptInputInitialConfig.placeholder,
      xPosition = promptInputInitialConfig.xPosition,
      yPosition = promptInputInitialConfig.yPosition,
      onChange = promptInputInitialConfig.onChange,
      promptWidth = promptInputInitialConfig.promptWidth,
      promptHeight = promptInputInitialConfig.promptHeight,
    }: PromptInputConfig) {
    super({ startHidden })

    this._width = 312
    this._height = 46

    this._onChange = onChange
    this._xPosition = promptWidth / -2 + this._width / 2 + xPosition
    this._yPosition = promptHeight / 2 + this._height / -2 + yPosition

    this.fillInBox = {
      uiTransform: {
        width: this._width,
        height: this._height,
        positionType: 'absolute',
        position: { bottom: this._yPosition, right: this._xPosition * -1 },
      },
      placeholder: String(placeholder),
      fontSize: 22,
      textAlign: 'middle-center',
      font: defaultFont,
      color: Color4.Black(),
    }
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <Input
        key={key}
        {...this.fillInBox}
        uiTransform={{
          ...this.fillInBox.uiTransform,
          display: this.visible ? 'flex' : 'none',
        }}
        onChange={this._onChange}
      />
    )
  }
}
