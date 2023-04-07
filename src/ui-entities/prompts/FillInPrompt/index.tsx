import ReactEcs from '@dcl/sdk/react-ecs'

import { UIObjectConfig } from '../../UIObject'
import { Prompt, PromptStyles } from '../Prompt'
import { PromptButtonStyles } from '../Prompt/components/Button'

type FillInPromptConfig = UIObjectConfig & {
  title: string | number;
  titleSize?: number;
  useDarkTheme?: boolean;
  placeholder?: string | number;
  acceptLabel?: string;
  onAccept: (value: string) => void;
}

type FillInPromptSizeConfig = {
  width?: number;
  height?: number;
}

const fillInPromptInitialConfig: Required<FillInPromptConfig & FillInPromptSizeConfig> = {
  startHidden: true,
  title: '',
  titleSize: 24,
  useDarkTheme: false,
  placeholder: 'Fill in',
  acceptLabel: 'Submit',
  onAccept: () => {
  },
  width: 400,
  height: 250,
} as const

/**
 * Displays a prompt window with a field that can be filled in
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string | number} [title=''] header on dialog
 * @param {number} [titleSize=24] header text size
 * @param {boolean} [useDarkTheme=false] switch to the dark theme
 * @param {string | number} [placeholder='Fill in'] text to display as placeholder in the fill in box
 * @param {string} [acceptLabel='Submit'] string to go in the accept button
 * @param {(value: string) => void} onAccept function that gets executed if player clicks button
 *
 */
export class FillInPrompt extends Prompt {
  private _inputText: string

  constructor(
    {
      startHidden = fillInPromptInitialConfig.startHidden,
      title = fillInPromptInitialConfig.title,
      titleSize = fillInPromptInitialConfig.titleSize,
      useDarkTheme = fillInPromptInitialConfig.useDarkTheme,
      placeholder = fillInPromptInitialConfig.placeholder,
      acceptLabel = fillInPromptInitialConfig.acceptLabel,
      onAccept = fillInPromptInitialConfig.onAccept,
    }: FillInPromptConfig) {
    super(
      {
        startHidden,
        style: useDarkTheme ? PromptStyles.DARK : PromptStyles.LIGHT,
        width: fillInPromptInitialConfig.width,
        height: fillInPromptInitialConfig.height,
      })

    this._inputText = ''

    this.addText({
      value: String(title),
      xPosition: 0,
      yPosition: 90,
      size: titleSize,
    })

    this.addTextBox({
      placeholder: String(placeholder),
      onChange: (value) => {
        this._inputText = value
      },
      xPosition: 0,
      yPosition: 0,
    })

    this.addButton({
      text: String(acceptLabel),
      xPosition: 0,
      yPosition: -70,
      onMouseDown: () => {
        onAccept(this._inputText)
      },
      style: PromptButtonStyles.E,
    })
  }
}
