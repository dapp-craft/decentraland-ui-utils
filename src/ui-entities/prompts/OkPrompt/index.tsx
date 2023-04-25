import ReactEcs from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { Prompt, PromptExternalConfig, PromptStyles } from '../Prompt'
import { PromptButton, PromptButtonStyles } from '../Prompt/components/Button'
import { PromptText } from '../Prompt/components/Text'

type OkPromptConfig = PromptExternalConfig & {
  text: string | number;
  textSize?: number;
  useDarkTheme?: boolean;
  acceptLabel?: string;
  onAccept?: () => void;
}

const okPromptInitialConfig: Required<OkPromptConfig> = {
  startHidden: true,
  text: '',
  textSize: 24,
  useDarkTheme: false,
  acceptLabel: 'Ok',
  width: 400,
  height: 250,
  onAccept: () => {
  },
  onClose: () => {
  },
} as const

/**
 * Displays a prompt window with a custom string and an OK button
 * @param {boolean} [startHidden=true] starting hidden
 * @param {number} width background width
 * @param {number} height background height
 * @param {string | number} [text=''] notification string
 * @param {number} [textSize=24] notification string size
 * @param {boolean} [useDarkTheme=false] switch to the dark theme
 * @param {string} [acceptLabel='Ok'] string to go in the accept button
 * @param {() => void} onAccept function that gets executed if player clicks button
 * @param {Callback} onClose callback on prompt close
 *
 */
export class OkPrompt extends Prompt {
  public textElement: PromptText
  public buttonElement: PromptButton

  constructor(
    {
      startHidden = okPromptInitialConfig.startHidden,
      text = okPromptInitialConfig.text,
      textSize = okPromptInitialConfig.textSize,
      useDarkTheme = okPromptInitialConfig.useDarkTheme,
      acceptLabel = okPromptInitialConfig.acceptLabel,
      onAccept = okPromptInitialConfig.onAccept,
      onClose = okPromptInitialConfig.onClose,
    }: OkPromptConfig) {
    super(
      {
        startHidden,
        style: useDarkTheme ? PromptStyles.DARK : PromptStyles.LIGHT,
        width: okPromptInitialConfig.width,
        height: okPromptInitialConfig.height,
        onClose,
      })

    this.textElement = this.addText({
      value: String(text),
      xPosition: 0,
      yPosition: 40,
      size: textSize,
    })

    this.buttonElement = this.addButton({
      text: String(acceptLabel),
      xPosition: 0,
      yPosition: -70,
      onMouseDown: onAccept,
      style: PromptButtonStyles.E,
    })
  }
}