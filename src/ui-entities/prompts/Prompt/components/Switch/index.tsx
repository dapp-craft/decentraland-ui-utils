import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiLabelProps } from '@dcl/react-ecs/dist/components/Label/types'

import { InPromptUIObject, InPromptUIObjectConfig } from '../../InPromptUIObject'

import { getImageAtlasMapping } from '../../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../../constants/resources'
import { defaultFont } from '../../../../../constants/font'

export enum PromptSwitchStyles {
  ROUNDGREEN = `roundGreen`,
  ROUNDRED = `roundRed`,
  SQUAREGREEN = `squareGreen`,
  SQUARERED = `squareRed`
}

export type PromptSwitchConfig = InPromptUIObjectConfig & {
  text: string | number;
  xPosition: number;
  yPosition: number;
  onCheck?: () => void;
  onUncheck?: () => void;
  darkTheme?: boolean;
  startChecked?: boolean;
  style?: PromptSwitchStyles;
}

const promptSwitchInitialConfig: Required<PromptSwitchConfig> = {
  startHidden: false,
  text: '',
  xPosition: 0,
  yPosition: 0,
  onCheck: () => {
  },
  onUncheck: () => {
  },
  startChecked: false,
  style: PromptSwitchStyles.ROUNDGREEN,
  promptVisible: false,
  promptWidth: 400,
  promptHeight: 250,
  darkTheme: false,
} as const

/**
 * Prompt switch
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string} [text=''] Text to display on the right of the box
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {() => void} onCheck Function to call every time the box is checked
 * @param {() => void} onUncheck Function to call every time the box is unchecked
 * @param {boolean} [startChecked=false] Starts the checkbox in a default state of already checked
 *
 */
export class PromptSwitch extends InPromptUIObject {
  public imageElement: EntityPropTypes
  public labelElement: EntityPropTypes & UiLabelProps

  public text: string | number
  public xPosition: number
  public yPosition: number
  public style: PromptSwitchStyles
  public startChecked: boolean
  public onUncheck: () => void
  public onCheck: () => void

  private _checked: boolean
  private _xPosition: number | undefined
  private _yPosition: number | undefined

  constructor(
    {
      startHidden = promptSwitchInitialConfig.startHidden,
      text = promptSwitchInitialConfig.text,
      xPosition = promptSwitchInitialConfig.xPosition,
      yPosition = promptSwitchInitialConfig.yPosition,
      onCheck = promptSwitchInitialConfig.onCheck,
      onUncheck = promptSwitchInitialConfig.onUncheck,
      startChecked = promptSwitchInitialConfig.startChecked,
      darkTheme = promptSwitchInitialConfig.darkTheme,
      style = promptSwitchInitialConfig.style,
      promptWidth = promptSwitchInitialConfig.promptWidth,
      promptHeight = promptSwitchInitialConfig.promptHeight,
      promptVisible = promptSwitchInitialConfig.promptVisible,
    }: PromptSwitchConfig) {
    super({ startHidden: startHidden || !promptVisible, promptVisible, promptWidth, promptHeight, darkTheme })

    this.text = text
    this.xPosition = xPosition
    this.yPosition = yPosition
    this.style = style
    this.startChecked = startChecked
    this.onUncheck = onUncheck
    this.onCheck = onCheck

    this._checked = startChecked

    this.imageElement = {
      uiTransform: {
        width: 64,
        height: 32,
        margin: {
          right: 5,
        },
      },
      uiBackground: {
        textureMode: 'stretch',
        texture: {
          src: AtlasTheme.ATLAS_PATH_LIGHT,
        },
      },
    }

    this.labelElement = {
      value: String(this.text),
      uiTransform: {
        maxWidth: '100%',
        height: '100%',
      },
      textAlign: 'middle-left',
      font: defaultFont,
      fontSize: 20,
    }
  }

  /**
   * Sets the box state to unchecked.
   */
  public uncheck(): void {
    this._checked = false
  }

  /**
   * Sets the box state to checked.
   */
  public check(): void {
    this._checked = true
  }

  public render(key?: string): ReactEcs.JSX.Element {
    this._xPosition = (this.promptWidth / -2) + (this.promptWidth / 2) + this.xPosition
    this._yPosition = (this.promptHeight / 2) + (32 / -2) + this.yPosition

    return (
      <UiEntity
        key={key}
        uiTransform={{
          display: (this.visible && this.promptVisible) ? 'flex' : 'none',
          width: '100%',
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          positionType: 'absolute',
          position: { bottom: this._yPosition, right: this._xPosition * -1 },
        }}
        onMouseDown={this._click}
      >
        <UiEntity
          {...this.imageElement}
          uiBackground={{
            ...this.imageElement.uiBackground, uvs: getImageAtlasMapping({
              ...sourcesComponentsCoordinates.switches[this._getImageStyle()],
              atlasHeight: sourcesComponentsCoordinates.atlasHeight,
              atlasWidth: sourcesComponentsCoordinates.atlasWidth,
            }),
          }}
        />
        <Label
          {...this.labelElement}
          value={String(this.text)}
          color={this.labelElement.color || this.darkTheme ? Color4.White() : Color4.Black()}
        />
      </UiEntity>
    )
  }

  private _getImageStyle(): PromptSwitchStyles | 'roundOff' | 'squareOff' {
    if (this._checked) {
      return this.style
    } else {
      if (this.style == PromptSwitchStyles.ROUNDGREEN || this.style == PromptSwitchStyles.ROUNDRED) {
        return 'roundOff'
      } else {
        return 'squareOff'
      }
    }
  }

  private _click = (): void => {
    if (!this._checked) {
      this.check()
      this.onCheck()
    } else {
      this.uncheck()
      this.onUncheck()
    }
  }
}
