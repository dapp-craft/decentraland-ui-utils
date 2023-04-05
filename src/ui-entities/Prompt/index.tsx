import ReactEcs, { UiEntity } from '@dcl/sdk/react-ecs'

import { UIObject, UIObjectConfig } from '../UIObject'

import { getImageAtlasMapping, ImageAtlasData } from '../../utils/imageUtils'

import { atlasPathDark, atlasPathLight, sourcesComponentsCoordinates } from '../../constants/resources'

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
}

const promptInitialConfig: Required<PromptConfig> = {
  startHidden: false,
  style: PromptStyles.LIGHT,
  width: 400,
  height: 250,
} as const

/**
 * Displays a loading icon in the center of the screen
 * @param {boolean} [startHidden=true] startHidden starting hidden
 *
 */
export class Prompt extends UIObject {
  private readonly _texture: string
  private _section: ImageAtlasData
  private readonly _width: number
  private readonly _height: number
  private readonly _style: PromptStyles

  constructor(
    {
      startHidden = promptInitialConfig.startHidden,
      width = promptInitialConfig.width,
      height = promptInitialConfig.height,
      style = promptInitialConfig.style,
    }: PromptConfig) {
    super({ startHidden })

    this._width = width
    this._height = height
    this._style = style

    this._texture = atlasPathLight

    this._section = {
      ...sourcesComponentsCoordinates.backgrounds.promptBackground,
      atlasHeight: sourcesComponentsCoordinates.atlasHeight,
      atlasWidth: sourcesComponentsCoordinates.atlasWidth,
    }

    this._setStyle();
  }

  public render(): ReactEcs.JSX.Element {
    return (
      <UiEntity
        uiTransform={{
          display: this.visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'flex-start',
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
        {/*<Label*/}
        {/*  font={defaultFont}*/}
        {/*  value={String(this._text)}*/}
        {/*/>*/}
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
        // this.texture = lightTheme
        // setSection(this.background, resources.backgrounds.promptBackground)
        // setSection(this.closeIcon, resources.icons.closeD)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175
        // this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.DARK:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }
        // this.texture = darkTheme
        // this.darkTheme = true
        // setSection(this.background, resources.backgrounds.promptBackground)
        // setSection(this.closeIcon, resources.icons.closeW)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175
        // this.closeIcon.positionY = height ? height / 2 - 25 : 145
        break
      case PromptStyles.LIGHTLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }
        // this.texture = lightTheme
        // setSection(this.background, resources.backgrounds.promptLargeBackground)
        // setSection(this.closeIcon, resources.icons.closeD)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        // this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.DARKLARGE:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptLargeBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }
        // this.texture = darkTheme
        // this.darkTheme = true
        // setSection(this.background, resources.backgrounds.promptLargeBackground)
        // setSection(this.closeIcon, resources.icons.closeW)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        // this.closeIcon.positionY = height ? height / 2 - 25 : 145 + 20
        break
      case PromptStyles.LIGHTSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }
        // this.texture = lightTheme
        // setSection(this.background, resources.backgrounds.promptSlantedBackground)
        // setSection(this.closeIcon, resources.icons.closeD)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        // this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break

      case PromptStyles.DARKSLANTED:
        this._section = {
          ...sourcesComponentsCoordinates.backgrounds.promptSlantedBackground,
          atlasHeight: sourcesComponentsCoordinates.atlasHeight,
          atlasWidth: sourcesComponentsCoordinates.atlasWidth,
        }
        // this.texture = darkTheme
        // this.darkTheme = true
        // setSection(this.background, resources.backgrounds.promptSlantedBackground)
        // setSection(this.closeIcon, resources.icons.closeW)
        // this.closeIcon.positionX = width ? width / 2 - 25 : 175 + 40
        // this.closeIcon.positionY = height ? height / 2 - 25 : 100 + 38
        break
      default:
        // this.texture = new Texture(style)
        // this.closeIcon.visible = false
    }
  }
}
