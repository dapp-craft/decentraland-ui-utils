import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { UIObject, UIObjectConfig } from '../../UIObject'

import { PromptCloseIcon, PromptCloseIconConfig, PromptCloseIconStyles } from './components/CloseIcon'
import { PromptText, PromptTextConfig } from './components/Text'
import { PromptIcon, PromptIconConfig } from './components/Icon'
import { PromptButton, PromptButtonConfig } from './components/Button'
import { PromptCheckbox, PromptCheckboxConfig } from './components/Checkbox'
import { PromptSwitch, PromptSwitchConfig } from './components/Switch'
import { PromptInput, PromptInputConfig } from './components/Input'

import { getImageAtlasMapping, ImageAtlasData } from '../../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../../constants/resources'

export enum PromptStyles {
  LIGHT = `light`,
  DARK = `dark`,
  LIGHTLARGE = `lightlarge`,
  DARKLARGE = `darklarge`,
  LIGHTSLANTED = `lightslanted`,
  DARKSLANTED = `darkslanted`
}

type PromptConfig = UIObjectConfig & {
  style?: PromptStyles;
  width?: number;
  height?: number;
  onClose?: Callback;
}

const promptInitialConfig: Required<PromptConfig> = {
  startHidden: true,
  style: PromptStyles.LIGHT,
  width: 400,
  height: 250,
  onClose: () => {},
} as const

/**
 * Creates a prompt object that includes a background and a close icon, and supports adding as many custom UI elements as desired
 * @param {boolean} [startHidden=true] starting hidden
 * @param {PromptStyles} [style=PromptStyles.LIGHT]: pick from a few predefined options of color, shape and size, or provide the string path to a custom image
 * @param {number} width background width
 * @param {number} height background height
 * @param {Callback} onClose callback on prompt close
 *
 */
export class Prompt extends UIObject {
  private _texture: AtlasTheme
  private _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _style: PromptStyles
  private readonly _onClose: Callback
  private _components: (PromptCloseIcon | PromptText | PromptIcon | PromptButton | PromptCheckbox | PromptSwitch | PromptInput)[]
  private readonly _closeIconData: PromptCloseIconConfig
  private readonly _isDarkTheme: boolean

  constructor(
    {
      startHidden = promptInitialConfig.startHidden,
      style = promptInitialConfig.style,
      width,
      height,
      onClose = promptInitialConfig.onClose,
    }: PromptConfig | undefined = {}) {
    super({ startHidden })

    this._style = style
    this._onClose = onClose

    this._texture = AtlasTheme.ATLAS_PATH_LIGHT

    this._section = {
      ...sourcesComponentsCoordinates.backgrounds.promptBackground,
      atlasHeight: sourcesComponentsCoordinates.atlasHeight,
      atlasWidth: sourcesComponentsCoordinates.atlasWidth,
    }

    this._closeIconData = {
      promptVisible: this.visible,
      width: 32,
      height: 32,
      style: PromptCloseIconStyles.CLOSED,
      onMouseDown: this._close,
    }

    this._setStyle()

    this._width = width ? width : this._section.sourceWidth
    this._height = height ? height : this._section.sourceHeight

    this._components = [new PromptCloseIcon(this._closeIconData)]

    this._isDarkTheme = this._texture !== AtlasTheme.ATLAS_PATH_LIGHT
  }

  public show() {
    super.show()

    this._components.forEach((component) => {
      component.changedPromptVisible(true)
      component.show()
    })
  }

  public hide() {
    super.hide()

    this._components.forEach((component) => {
      component.changedPromptVisible(false)
      component.hide()
    })
  }

  public addTextBox(config: Omit<PromptInputConfig, 'promptHeight' | 'promptWidth' | 'promptVisible'>): PromptInput {
    const uiInput = new PromptInput({
      ...config,
      promptVisible: this.visible,
      promptWidth: this._width,
      promptHeight: this._height,
    })

    this._components.push(uiInput)

    return uiInput
  }

  public addSwitch(config: Omit<PromptSwitchConfig, 'promptHeight' | 'promptWidth' | 'promptVisible'>): PromptSwitch {
    const uiSwitch = new PromptSwitch(
      {
        ...config,
        promptVisible: this.visible,
        promptWidth: this._width,
        promptHeight: this._height,
        darkTheme: this._isDarkTheme,
      },
    )

    this._components.push(uiSwitch)

    return uiSwitch
  }

  public addCheckbox(config: Omit<PromptCheckboxConfig, 'promptHeight' | 'promptWidth' | 'promptVisible'>): PromptCheckbox {
    const uiCheckbox = new PromptCheckbox(
      {
        ...config,
        promptVisible: this.visible,
        promptWidth: this._width,
        promptHeight: this._height,
        darkTheme: this._isDarkTheme,
      },
    )

    this._components.push(uiCheckbox)

    return uiCheckbox
  }

  public addButton(config: Omit<PromptButtonConfig, 'promptHeight' | 'promptWidth' | 'promptVisible'>): PromptButton {
    const uiButton = new PromptButton(
      {
        ...config,
        promptVisible: this.visible,
        promptWidth: this._width,
        promptHeight: this._height,
      },
    )

    this._components.push(uiButton)

    return uiButton
  }

  public addText(config: Omit<PromptTextConfig, 'darkTheme' | 'promptVisible'>): PromptText {
    const uiText = new PromptText(
      {
        ...config,
        promptVisible: this.visible,
        darkTheme: this._isDarkTheme,
      },
    )

    this._components.push(uiText)

    return uiText
  }

  public addIcon(config: Omit<PromptIconConfig, 'promptHeight' | 'promptWidth' | 'promptVisible'>): PromptIcon {
    const uiIcon = new PromptIcon({
      ...config,
      promptVisible: this.visible,
      promptWidth: this._width,
      promptHeight: this._height,
    })

    this._components.push(uiIcon)

    return uiIcon
  }

  public render(key?: string): ReactEcs.JSX.Element {
    return (
      <UiEntity
        key={key}
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          positionType: 'absolute',
          position: { top: '50%', left: '50%' },
          margin: { top: -this._height / 2, left: -this._width / 2 },
          width: this._width,
          height: this._height,
        }}
      >
        <UiEntity
          uiTransform={{
            positionType: 'absolute',
            position: { top: 0, left: 0 },
            width: '100%',
            height: '100%',
          }}
          uiBackground={{
            textureMode: 'stretch',
            texture: {
              src: this._texture,
            },
            uvs: getImageAtlasMapping(this._section),
          }}
        />
        {
          this._components.map((component, idx) => (
            component.render(`prompt-component-${idx}`)
          ))
        }
      </UiEntity>
    )
  }

  private _setStyle() {
    switch (this._style) {
      case PromptStyles.LIGHT:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_LIGHT

        this._closeIconData.style = PromptCloseIconStyles.CLOSED

        break
      case PromptStyles.DARK:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = PromptCloseIconStyles.CLOSEW

        break
      case PromptStyles.LIGHTLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_LIGHT

        this._closeIconData.style = PromptCloseIconStyles.CLOSED

        break
      case PromptStyles.DARKLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = PromptCloseIconStyles.CLOSEW

        break
      case PromptStyles.LIGHTSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_LIGHT

        this._closeIconData.style = PromptCloseIconStyles.CLOSED
        this._closeIconData.xPosition = 15

        break

      case PromptStyles.DARKSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = PromptCloseIconStyles.CLOSEW
        this._closeIconData.xPosition = 15

        break
    }
  }

  private _close = (): void => {
    this._onClose()

    this.hide()
  }
}