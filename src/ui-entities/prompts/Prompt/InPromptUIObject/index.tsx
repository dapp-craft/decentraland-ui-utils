import ReactEcs from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../../../UIObject'

export type InPromptUIObjectConfig = UIObjectConfig & {
  promptVisible: boolean;
}

export abstract class InPromptUIObject extends UIObject {
  protected _promptVisible: boolean

  protected constructor({ promptVisible, ...config }: InPromptUIObjectConfig) {
    super(config)

    this._promptVisible = promptVisible
  }

  public changedPromptVisible(visible: boolean): void {
    this._promptVisible = visible
  }
}