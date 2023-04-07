import ReactEcs from '@dcl/sdk/react-ecs'

import { UIObjectConfig } from '../../UIObject'
import { Prompt, PromptStyles } from '../Prompt'
import { PromptButtonStyles } from '../Prompt/components/Button'

type OptionPromptConfig = UIObjectConfig & {
  title: string | number;
  titleSize?: number;
  text: string | number;
  textSize?: number;
  useDarkTheme?: boolean;
  acceptLabel?: string;
  rejectLabel?: string;
  onAccept: () => void;
  onReject?: () => void;
}

type OptionPromptSizeConfig = {
  width?: number;
  height?: number;
}

const okPromptInitialConfig: Required<OptionPromptConfig & OptionPromptSizeConfig> = {
  startHidden: true,
  title: '',
  titleSize: 24,
  text: '',
  textSize: 21,
  useDarkTheme: false,
  acceptLabel: 'Yes',
  rejectLabel: 'No',
  onAccept: () => {},
  onReject: () => {},
  width: 480,
  height: 384,
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] starting hidden
 * @param {string | number} [title=''] header on dialog
 * @param {number} [titleSize=24] header text size
 * @param {string | number} [text=''] smaller print instructions
 * @param {number} [textSize=21] smaller print instructions size
 * @param {boolean} [useDarkTheme=false] switch to the dark theme
 * @param {string} [acceptLabel='Yes'] string to go in the accept button
 * @param {string} [rejectLabel='No'] string to go in the reject button
 * @param {() => void} onAccept function that gets executed if player clicks button
 * @param {() => void} onReject function that gets executed if player clicks reject
 *
 */
export class OptionPrompt extends Prompt {
  constructor(
    {
      startHidden = okPromptInitialConfig.startHidden,
      title = okPromptInitialConfig.title,
      titleSize = okPromptInitialConfig.titleSize,
      text = okPromptInitialConfig.text,
      textSize = okPromptInitialConfig.textSize,
      useDarkTheme = okPromptInitialConfig.useDarkTheme,
      acceptLabel = okPromptInitialConfig.acceptLabel,
      rejectLabel = okPromptInitialConfig.rejectLabel,
      onAccept = okPromptInitialConfig.onAccept,
      onReject = okPromptInitialConfig.onReject,
    }: OptionPromptConfig) {
    super(
      {
        startHidden,
        style: useDarkTheme ? PromptStyles.DARK : PromptStyles.LIGHT,
        width: okPromptInitialConfig.width,
        height: okPromptInitialConfig.height,
      })

    this.addText({
      value: String(title),
      xPosition: 0,
      yPosition: 160,
      size: titleSize,
    })

    this.addText({
      value: String(text),
      xPosition: 0,
      yPosition: 40,
      size: textSize,
    })

    this.addButton({
      text: String(acceptLabel),
      xPosition: -100,
      yPosition: -120,
      onMouseDown: onAccept,
      style: PromptButtonStyles.E,
    })

    this.addButton({
      text: String(rejectLabel),
      xPosition: 100,
      yPosition: -120,
      onMouseDown: onReject,
      style: PromptButtonStyles.F,
    })
  }
}
