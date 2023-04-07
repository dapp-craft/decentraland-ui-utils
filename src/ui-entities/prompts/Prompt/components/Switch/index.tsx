import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiLabelProps } from '@dcl/react-ecs/dist/components/Label/types'

import { UIObject, UIObjectConfig } from '../../../../UIObject'

import { getImageAtlasMapping } from '../../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../../constants/resources'
import { defaultFont } from '../../../../../constants/font'

export enum PromptSwitchStyles {
  ROUNDGREEN = `roundGreen`,
  ROUNDRED = `roundRed`,
  SQUAREGREEN = `squareGreen`,
  SQUARERED = `squareRed`
}

export type PromptSwitchConfig = UIObjectConfig & {
  text: string | number;
  xPosition: number;
  yPosition: number;
  onCheck?: () => void;
  onUncheck?: () => void;
  darkTheme?: boolean;
  startChecked?: boolean;
  style?: PromptSwitchStyles;
  promptWidth: number;
  promptHeight: number;
}

const promptSwitchInitialConfig: Required<PromptSwitchConfig> = {
  startHidden: false,
  text: '',
  xPosition: 0,
  yPosition: 0,
  onCheck: () => {},
  onUncheck: () => {},
  darkTheme: false,
  startChecked: false,
  style: PromptSwitchStyles.ROUNDGREEN,
  promptWidth: 400,
  promptHeight: 250,
} as const

/**
 * Prompt switch
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string} [label=''] Text to display on the right of the box
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {() => void} onCheck Function to call every time the box is checked
 * @param {() => void} onUncheck Function to call every time the box is unchecked
 * @param {boolean} [startChecked=false] Starts the checkbox in a default state of already checked
 *
 */
export class PromptSwitch extends UIObject {
  public image: EntityPropTypes
  public label: EntityPropTypes & UiLabelProps

  private _checked: boolean
  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _style: PromptSwitchStyles
  private readonly _onCheck: () => void
  private readonly _onUncheck: () => void

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
    }: PromptSwitchConfig) {
    super({ startHidden })

    this._checked = startChecked

    this._onCheck = onCheck
    this._onUncheck = onUncheck
    this._style = style

    this._xPosition = (promptWidth / -2) + (promptWidth / 2) + xPosition
    this._yPosition = (promptHeight / 2) + (32 / -2) + yPosition

    this.image = {
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

    this.label = {
      value: String(text),
      uiTransform: {
        maxWidth: '100%',
        height: '100%',
      },
      textAlign: 'middle-left',
      font: defaultFont,
      color: darkTheme ? Color4.White() : Color4.Black(),
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
    return (
      <UiEntity
        key={key}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
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
          {...this.image}
          uiBackground={{
            ...this.image.uiBackground, uvs: getImageAtlasMapping({
              ...sourcesComponentsCoordinates.switches[this._getImageStyle()],
              atlasHeight: sourcesComponentsCoordinates.atlasHeight,
              atlasWidth: sourcesComponentsCoordinates.atlasWidth,
            }),
          }}
        />
        <Label {...this.label} />
      </UiEntity>
    )
  }

  private _getImageStyle(): PromptSwitchStyles | 'roundOff' | 'squareOff' {
    if (this._checked) {
      return this._style
    } else {
      if (this._style == PromptSwitchStyles.ROUNDGREEN || this._style == PromptSwitchStyles.ROUNDRED) {
        return 'roundOff'
      } else {
        return 'squareOff'
      }
    }
  }

  private _click = (): void => {
    if (!this._checked) {
      this.check()
      this._onCheck()
    } else {
      this.uncheck()
      this._onUncheck()
    }
  }
}
