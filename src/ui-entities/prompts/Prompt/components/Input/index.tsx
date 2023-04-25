import ReactEcs, { Input } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiInputProps } from '@dcl/react-ecs/dist/components/Input/types'

import { InPromptUIObject, InPromptUIObjectConfig } from '../../InPromptUIObject'

import { defaultFont } from '../../../../../constants/font'

export type PromptInputConfig = InPromptUIObjectConfig & {
  placeholder?: string | number;
  xPosition: number;
  yPosition: number;
  onChange?: (value: string) => void;
}

const promptInputInitialConfig: Required<PromptInputConfig> = {
  startHidden: false,
  placeholder: 'Fill in',
  xPosition: 0,
  yPosition: 0,
  onChange: () => {
  },
  promptVisible: false,
  promptWidth: 400,
  promptHeight: 250,
  darkTheme: false,
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
export class PromptInput extends InPromptUIObject {
  public fillInBoxElement: EntityPropTypes & Partial<UiInputProps>

  public placeholder: string | number
  public xPosition: number
  public yPosition: number
  public onChange: (value: string) => void

  private _xPosition: number | undefined
  private _yPosition: number | undefined
  private readonly _width: number
  private readonly _height: number

  constructor(
    {
      startHidden = promptInputInitialConfig.startHidden,
      placeholder = promptInputInitialConfig.placeholder,
      xPosition = promptInputInitialConfig.xPosition,
      yPosition = promptInputInitialConfig.yPosition,
      onChange = promptInputInitialConfig.onChange,
      promptWidth = promptInputInitialConfig.promptWidth,
      promptHeight = promptInputInitialConfig.promptHeight,
      promptVisible = promptInputInitialConfig.promptVisible,
      darkTheme,
    }: PromptInputConfig) {
    super({ startHidden: startHidden || !promptVisible, promptVisible, promptWidth, promptHeight, darkTheme })

    this._width = 312
    this._height = 46

    this.placeholder = placeholder
    this.xPosition = xPosition
    this.yPosition = yPosition

    this.onChange = onChange

    this.fillInBoxElement = {
      uiTransform: {
        width: this._width,
        height: this._height,
        positionType: 'absolute',

      },
      placeholder: String(this.placeholder),
      fontSize: 22,
      textAlign: 'middle-center',
      font: defaultFont,
      color: Color4.Black(),
    }
  }

  public render(key?: string): ReactEcs.JSX.Element {
    this._xPosition = this.promptWidth / -2 + this._width / 2 + this.xPosition
    this._yPosition = this.promptHeight / 2 + this._height / -2 + this.yPosition

    return (
      <Input
        key={key}
        {...this.fillInBoxElement}
        uiTransform={{
          ...this.fillInBoxElement.uiTransform,
          display: (this.visible && this.promptVisible) ? 'flex' : 'none',
          position: { bottom: this._yPosition, right: this._xPosition * -1 },
        }}
        onChange={this.onChange}
      />
    )
  }
}
