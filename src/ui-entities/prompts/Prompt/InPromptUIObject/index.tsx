import ReactEcs from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../../../UIObject'

export type InPromptUIObjectConfig = UIObjectConfig & {
  promptVisible: boolean;
  promptWidth: number;
  promptHeight: number;
  darkTheme: boolean;
}

export abstract class InPromptUIObject extends UIObject {
  public promptVisible: boolean
  public promptWidth: number
  public promptHeight: number
  public darkTheme: boolean

  protected constructor({ promptVisible, promptWidth, promptHeight, darkTheme, ...config }: InPromptUIObjectConfig) {
    super(config)

    this.promptVisible = promptVisible
    this.promptWidth = promptWidth
    this.promptHeight = promptHeight
    this.darkTheme = darkTheme
  }

  public changedPromptVisible(visible: boolean): void {
    this.promptVisible = visible
  }
}