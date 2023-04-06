import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { UIObject, UIObjectConfig } from '../UIObject'

import { PromptCloseIcon, PromptCloseIconConfig, PromptCloseIconStyles } from './components/CloseIcon'
import { PromptText, PromptTextConfig } from './components/Text'
import { PromptIcon, PromptIconConfig } from './components/Icon'
import { PromptButton, PromptButtonConfig } from './components/Button'
import { PromptCheckbox, PromptCheckboxConfig } from './components/Checkbox'
import { PromptSwitch, PromptSwitchConfig } from './components/Switch'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

import { AtlasTheme, sourcesComponentsCoordinates } from '../../constants/resources'

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
  startHidden: false,
  style: PromptStyles.LIGHT,
  width: 400,
  height: 250,
  onClose: () => {
  },
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] starting hidden
 *
 */
export class Prompt extends UIObject {
  private _texture: AtlasTheme
  private _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _style: PromptStyles
  private readonly _onClose: Callback
  private _components: (PromptCloseIcon | PromptText | PromptIcon | PromptButton | PromptCheckbox | PromptSwitch)[]
  private readonly _closeIconData: PromptCloseIconConfig
  private readonly _isDarkTheme: boolean

  constructor(
    {
      startHidden = promptInitialConfig.startHidden,
      style = promptInitialConfig.style,
      width,
      height,
      onClose = promptInitialConfig.onClose,
    }: PromptConfig) {
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

  public addSwitch(config: Omit<Omit<PromptSwitchConfig, 'promptHeight'>, 'promptWidth'>): PromptSwitch {
    const uiSwitch = new PromptSwitch(
      {
        ...config,
        promptWidth: this._width,
        promptHeight: this._height,
        darkTheme: this._isDarkTheme,
      },
    )

    this._components.push(uiSwitch)

    return uiSwitch
  }

  public addCheckbox(config: Omit<Omit<PromptCheckboxConfig, 'promptHeight'>, 'promptWidth'>): PromptCheckbox {
    const uiCheckbox = new PromptCheckbox(
      {
        ...config,
        promptWidth: this._width,
        promptHeight: this._height,
        darkTheme: this._isDarkTheme,
      },
    )

    this._components.push(uiCheckbox)

    return uiCheckbox
  }

  public addButton(config: Omit<Omit<PromptButtonConfig, 'promptHeight'>, 'promptWidth'>): PromptButton {
    const uiButton = new PromptButton(
      {
        ...config,
        promptWidth: this._width,
        promptHeight: this._height,
      },
    )

    this._components.push(uiButton)

    return uiButton
  }

  public addText(config: Omit<PromptTextConfig, 'darkTheme'>): PromptText {
    const uiText = new PromptText({ ...config, darkTheme: this._isDarkTheme })

    this._components.push(uiText)

    return uiText
  }

  public addIcon(config: PromptIconConfig): PromptIcon {
    const uiIcon = new PromptIcon({
      ...config,
      xOffset: this._width / -2 + (config.width || 128) / 2 + (config.xOffset || 0),
      yOffset: this._height / 2 + (config.height || 128) / -2 + (config.yOffset || 0),
    })

    this._components.push(uiIcon)

    return uiIcon
  }

  public render(): ReactEcs.JSX.Element {
    return (
      <UiEntity
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
