import ReactEcs from '@dcl/sdk/react-ecs'

import { UIObjectConfig } from '../../UIObject'
import { Prompt, PromptStyles } from '../Prompt'
import { PromptButtonStyles } from '../Prompt/components/Button'

type OkPromptConfig = UIObjectConfig & {
  text: string | number;
  textSize?: number;
  useDarkTheme?: boolean;
  acceptLabel?: string;
  onAccept?: () => void;
}

type OkPromptSizeConfig = {
  width?: number;
  height?: number;
}

const okPromptInitialConfig: Required<OkPromptConfig & OkPromptSizeConfig> = {
  startHidden: true,
  text: '',
  textSize: 24,
  useDarkTheme: false,
  acceptLabel: 'Ok',
  onAccept: () => {
  },
  width: 400,
  height: 250,
} as const

/**
 * Displays a prompt window with a custom string and an OK button
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string | number} [text=''] notification string
 * @param {number} [textSize=24] notification string size
 * @param {boolean} [useDarkTheme=false] switch to the dark theme
 * @param {string} [acceptLabel='Ok'] string to go in the accept button
 * @param {() => void} onAccept function that gets executed if player clicks button
 *
 */
export class OkPrompt extends Prompt {
  constructor(
    {
      startHidden = okPromptInitialConfig.startHidden,
      text = okPromptInitialConfig.text,
      textSize = okPromptInitialConfig.textSize,
      useDarkTheme = okPromptInitialConfig.useDarkTheme,
      acceptLabel = okPromptInitialConfig.acceptLabel,
      onAccept = okPromptInitialConfig.onAccept,
    }: OkPromptConfig) {
    super(
      {
        startHidden,
        style: useDarkTheme ? PromptStyles.DARK : PromptStyles.LIGHT,
        width: okPromptInitialConfig.width,
        height: okPromptInitialConfig.height,
      })

    this.addText({
      value: String(text),
      xPosition: 0,
      yPosition: 40,
      size: textSize,
    })

    this.addButton({
      text: String(acceptLabel),
      xPosition: 0,
      yPosition: -70,
      onMouseDown: onAccept,
      style: PromptButtonStyles.E,
    })
  }
}
