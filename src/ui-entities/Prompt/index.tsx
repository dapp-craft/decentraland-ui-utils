import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'
import { Callback } from '@dcl/react-ecs/dist/components/listeners/types'

import { UIObject, UIObjectConfig } from '../UIObject'

import { CloseIcon, CloseIconConfig, CloseIconStyles } from './components/CloseIcon'
import { Text, TextConfig } from './components/Text'
import { Icon, IconConfig } from '../Icon'

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
 * @param {boolean} [startHidden=true] startHidden starting hidden
 *
 */
export class Prompt extends UIObject {
  private _texture: AtlasTheme
  private _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _style: PromptStyles
  private readonly _onClose: Callback
  private _components: any[]
  private readonly _closeIconData: CloseIconConfig

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
      style: CloseIconStyles.CLOSED,
      onMouseDown: this._close,
    }

    this._setStyle()

    this._width = width ? width : this._section.sourceWidth
    this._height = height ? height : this._section.sourceHeight

    this._components = [new CloseIcon(this._closeIconData)]
  }

  public addIcon(config: IconConfig): void {
    this._components.push(new Icon({
      ...config,
      startHidden: false,
      xOffset: this._width / -2 + (config.width || 128) / 2 + (config.xOffset || 0),
      yOffset: this._height / 2 + (config.height || 128) / -2 + (config.yOffset || 0),
    }))
  }

  public addText(config: Omit<TextConfig, 'darkTheme'>): void {
    this._components.push(new Text({ ...config, darkTheme: this._texture !== AtlasTheme.ATLAS_PATH_LIGHT }))
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

        this._closeIconData.style = CloseIconStyles.CLOSED

        break
      case PromptStyles.DARK:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = CloseIconStyles.CLOSEW

        break
      case PromptStyles.LIGHTLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_LIGHT

        this._closeIconData.style = CloseIconStyles.CLOSED

        break
      case PromptStyles.DARKLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = CloseIconStyles.CLOSEW

        break
      case PromptStyles.LIGHTSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_LIGHT

        this._closeIconData.style = CloseIconStyles.CLOSED
        this._closeIconData.xPosition = 15

        break

      case PromptStyles.DARKSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }

        this._texture = AtlasTheme.ATLAS_PATH_DARK

        this._closeIconData.style = CloseIconStyles.CLOSEW
        this._closeIconData.xPosition = 15

        break
    }
  }

  private _close = (): void => {
    this._onClose()

    this.hide()
  }
}
