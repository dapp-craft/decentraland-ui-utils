import {ReactEcsRenderer} from '@dcl/sdk/react-ecs'

import * as ui from '@dcl/ui-scene-utils'

const announcement = new ui.Announcement({value: 'Text center'})
const loadingIcon = new ui.LoadingIcon()
const smallIcon = new ui.SmallIcon({image: 'images/icons/heart-icon.png', xOffset: -100, yOffset: 100})
const mediumIcon = new ui.MediumIcon({image: 'images/icons/heart-icon.png', xOffset: -200, yOffset: 200})
const largeIcon = new ui.LargeIcon({image: 'images/icons/heart-icon.png', xOffset: -300, yOffset: 300})
const uiCounter = new ui.UICounter({value: 123})
const cornerLabel = new ui.CornerLabel({value: 'Label', xOffset: -300, yOffset: 70})
const uiBar = new ui.UIBar({value: .5, xOffset: -500, yOffset: 60})

const uiComponent = () => {
    return [
        announcement.render(),
        loadingIcon.render(),
        smallIcon.render(),
        mediumIcon.render(),
        largeIcon.render(),
        uiCounter.render(),
        cornerLabel.render(),
        uiBar.render(),
    ]
}

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

announcement.show()
loadingIcon.show()
smallIcon.show()
mediumIcon.show()
largeIcon.show()
uiCounter.show()
cornerLabel.show()
uiBar.show()

// let timer: number = 10
//
// function LoopSystem(dt: number) {
//   timer -= dt
//   if (timer <= 0) {
//     timer = 10
//     // DO SOMETHING
//
//     console.log('index timer2 --------------------------------------------------------')
//   }
// }
//
// engine.addSystem(LoopSystem)