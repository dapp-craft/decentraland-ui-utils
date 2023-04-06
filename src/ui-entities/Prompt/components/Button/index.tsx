import ReactEcs, { Label, UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'
import { Color4 } from '@dcl/sdk/math'
import { EntityPropTypes } from '@dcl/react-ecs/dist/components/types'
import { UiLabelProps } from '@dcl/react-ecs/dist/components/Label/types'

import { UIObject, UIObjectConfig } from '../../../UIObject'

import { getImageAtlasMapping } from '../../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../../constants/resources'
import { defaultFont } from '../../../../constants/font'

export enum PromptButtonStyles {
  E = `E`,
  F = `F`,
  DARK = `dark`,
  RED = `red`,
  ROUNDBLACK = `roundBlack`,
  ROUNDWHITE = `roundWhite`,
  ROUNDSILVER = `roundSilver`,
  ROUNDGOLD = `roundGold`,
  SQUAREBLACK = `squareBlack`,
  SQUAREWHITE = `squareWhite`,
  SQUARESILVER = `squareSilver`,
  SQUAREGOLD = `squareGold`
}

enum PromptButtonCustomBgStyles {
  BUTTONE = `buttonE`,
  BUTTONF = `buttonF`,
}

export type PromptButtonConfig = UIObjectConfig & {
  text: string | number;
  xPosition: number;
  yPosition: number;
  onMouseDown: Callback;
  style?: PromptButtonStyles;
  promptWidth: number;
  promptHeight: number;
}

const promptButtonInitialConfig: Required<PromptButtonConfig> = {
  startHidden: false,
  text: '',
  xPosition: 0,
  yPosition: 0,
  onMouseDown: () => {
  },
  style: PromptButtonStyles.ROUNDSILVER,
  promptWidth: 400,
  promptHeight: 250,
} as const

/**
 * Prompt button
 * @param {boolean} [startHidden=false] startHidden starting hidden
 * @param {string | number} [text=''] label text
 * @param {number} [xPosition=0] Position on X on the prompt, counting from the center of the prompt
 * @param {number} [yPosition=0] Position on Y on the prompt, counting from the center of the prompt
 * @param {Callback} [onMouseDown=0] click action
 * @param {PromptButtonStyles} [style=CloseIconStyles.ROUNDSILVER] visible variant
 *
 */
export class PromptButton extends UIObject {
  public label: EntityPropTypes & UiLabelProps
  public image: EntityPropTypes
  public icon: EntityPropTypes

  private readonly _xPosition: number
  private readonly _yPosition: number
  private readonly _onMouseDown: Callback
  private readonly _width: number
  private readonly _height: number
  private _disabled: boolean
  private readonly _labelColor: Color4
  private readonly _labelDisabledColor: Color4
  private readonly _style: PromptButtonStyles

  constructor(
    {
      startHidden = promptButtonInitialConfig.startHidden,
      text = promptButtonInitialConfig.text,
      xPosition = promptButtonInitialConfig.xPosition,
      yPosition = promptButtonInitialConfig.yPosition,
      onMouseDown = promptButtonInitialConfig.onMouseDown,
      style = promptButtonInitialConfig.style,
      promptWidth,
      promptHeight,
    }: PromptButtonConfig) {
    super({ startHidden })

    this._style = style

    let buttonImg: PromptButtonCustomBgStyles | PromptButtonStyles = this._style
    let labelXOffset: number = 0

    if (this._style == PromptButtonStyles.E) {
      buttonImg = PromptButtonCustomBgStyles.BUTTONE
      labelXOffset = 25
    }

    if (this._style == PromptButtonStyles.F) {
      buttonImg = PromptButtonCustomBgStyles.BUTTONF
      labelXOffset = 25
    }

    this._width = 174
    this._height = 46

    this._xPosition = promptWidth / -2 + this._width / 2 + xPosition
    this._yPosition = promptHeight / 2 + this._height / -2 + yPosition
    this._onMouseDown = onMouseDown

    this._disabled = false

    this._labelDisabledColor = Color4.Gray()
    this._labelColor = this._style == PromptButtonStyles.ROUNDWHITE || this._style == PromptButtonStyles.SQUAREWHITE
      ? Color4.Black()
      : Color4.White()

    this.label = {
      value: String(text),
      font: defaultFont,
      fontSize: 20,
      textAlign: 'middle-center',
      uiTransform: {
        width: '100%',
        height: '100%',
        margin: {
          left: labelXOffset,
        },
      },
    }

    this.image = {
      uiTransform: {
        width: '100%',
        height: '100%',
        positionType: 'absolute',
        position: {
          top: 0,
          left: 0,
        },
      },
      uiBackground: {
        textureMode: 'stretch',
        texture: {
          src: AtlasTheme.ATLAS_PATH_LIGHT,
        },
        uvs: getImageAtlasMapping({
          ...sourcesComponentsCoordinates.buttons[buttonImg],
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }),
      },
    }

    this.icon = {
      uiTransform: {
        width: 26,
        height: 26,
        positionType: 'absolute',
        position: {
          top: '50%',
          left: '50%',
        },
        margin: {
          top: -26 / 2,
          left: this._buttonIconPos(String(text).length) - 26 / 2,
        },
      },
      uiBackground: {
        textureMode: 'stretch',
        texture: {
          src: AtlasTheme.ATLAS_PATH_LIGHT,
        },
        uvs: getImageAtlasMapping({
          ...sourcesComponentsCoordinates.buttons[this._style],
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }),
      },
    }
  }

  public grayOut(): void {
    this._disabled = true
  }

  public enable(): void {
    this._disabled = false
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <UiEntity
        key={key}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: this._width,
          height: this._height,
          positionType: 'absolute',
          position: { bottom: this._yPosition, right: this._xPosition * -1 },
        }}
        onMouseDown={this._click}
      >
        <UiEntity {...this.image} />
        <UiEntity
          {...this.icon}
          uiTransform={{
            ...this.icon.uiTransform,
            display: (this._disabled || (this._style != PromptButtonStyles.E && this._style != PromptButtonStyles.F)) ? 'none' : 'flex',
          }}
        />
        <Label
          {...this.label}
          color={this._disabled ? this._labelDisabledColor : this._labelColor}
        />
      </UiEntity>
    )
  }

  private _click = () => {
    if (this._disabled) return

    this._onMouseDown()
  }

  private _buttonIconPos(textLen: number): number {
    let pos = -20 - textLen * 4
    return pos > -65 ? pos : -65
  }
}
