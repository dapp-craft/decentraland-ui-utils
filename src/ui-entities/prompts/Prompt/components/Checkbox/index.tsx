import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiLabelProps } from '@dcl/react-ecs/dist/components/Label/types'

import { InPromptUIObject, InPromptUIObjectConfig } from '../../InPromptUIObject'

import { getImageAtlasMapping } from '../../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../../constants/resources'
import { defaultFont } from '../../../../../constants/font'

export type PromptCheckboxConfig = InPromptUIObjectConfig & {
  text: string | number;
  xPosition: number;
  yPosition: number;
  onCheck?: () => void;
  onUncheck?: () => void;
  large?: boolean;
  darkTheme?: boolean;
  startChecked?: boolean;
  promptWidth: number;
  promptHeight: number;
}

const promptCheckboxInitialConfig: Required<PromptCheckboxConfig> = {
  startHidden: false,
  promptVisible: false,
  text: '',
  xPosition: 0,
  yPosition: 0,
  onCheck: () => {
  },
  onUncheck: () => {
  },
  large: false,
  darkTheme: false,
  startChecked: false,
  promptWidth: 400,
  promptHeight: 250,
} as const

/**
 * Prompt checkbox
 * @param {boolean} [startHidden=false] starting hidden
 * @param {string} [label=''] Text to display on the right of the box
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {() => void} onCheck Function to call every time the box is checked
 * @param {() => void} onUncheck Function to call every time the box is unchecked
 * @param {boolean} [large=false] Makes the checkbox significantly larger
 * @param {boolean} [startChecked=false] Starts the checkbox in a default state of already checked
 *
 */
export class PromptCheckbox extends InPromptUIObject {
  public image: EntityPropTypes
  public label: EntityPropTypes & UiLabelProps

  private _checked: boolean
  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _darkTheme: boolean
  private readonly _large: boolean
  private readonly _onCheck: () => void
  private readonly _onUncheck: () => void

  constructor(
    {
      startHidden = promptCheckboxInitialConfig.startHidden,
      text = promptCheckboxInitialConfig.text,
      xPosition = promptCheckboxInitialConfig.xPosition,
      yPosition = promptCheckboxInitialConfig.yPosition,
      onCheck = promptCheckboxInitialConfig.onCheck,
      onUncheck = promptCheckboxInitialConfig.onUncheck,
      large = promptCheckboxInitialConfig.large,
      startChecked = promptCheckboxInitialConfig.startChecked,
      darkTheme = promptCheckboxInitialConfig.darkTheme,
      promptWidth = promptCheckboxInitialConfig.promptWidth,
      promptHeight = promptCheckboxInitialConfig.promptHeight,
      promptVisible = promptCheckboxInitialConfig.promptVisible,
    }: PromptCheckboxConfig) {
    super({ startHidden: startHidden || !promptVisible, promptVisible })

    this._checked = startChecked
    this._darkTheme = darkTheme
    this._large = large

    this._onCheck = onCheck
    this._onUncheck = onUncheck

    this._xPosition = (promptWidth / -2) + (promptWidth / 2) + xPosition
    this._yPosition = (promptHeight / 2) + (32 / -2) + yPosition

    this.image = {
      uiTransform: {
        width: this._large ? 32 : 24,
        height: this._large ? 32 : 24,
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
          display: (this.visible && this._promptVisible) ? 'flex' : 'none',
          width: '100%',
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          positionType: 'absolute',
          position: { bottom: this._yPosition, right: this._xPosition * -1 },
        }}
      >
        <UiEntity
          {...this.image}
          uiBackground={{
            ...this.image.uiBackground, uvs: getImageAtlasMapping({
              ...sourcesComponentsCoordinates.checkboxes[this._getImageStyle()],
              atlasHeight: sourcesComponentsCoordinates.atlasHeight,
              atlasWidth: sourcesComponentsCoordinates.atlasWidth,
            }),
          }}
          onMouseDown={this._click}
        />
        <Label{...this.label} />
      </UiEntity>
    )
  }

  private _getImageStyle(): 'wLargeOff' | 'wLargeOn' | 'wOff' | 'wOn' | 'dLargeOff' | 'dLargeOn' | 'dOff' | 'dOn' {
    if (this._darkTheme) {
      if (this._large) {
        return !this._checked ? 'wLargeOff' : 'wLargeOn'
      } else {
        return !this._checked ? 'wOff' : 'wOn'
      }
    } else {
      if (this._large) {
        return !this._checked ? 'dLargeOff' : 'dLargeOn'
      } else {
        return !this._checked ? 'dOff' : 'dOn'
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
