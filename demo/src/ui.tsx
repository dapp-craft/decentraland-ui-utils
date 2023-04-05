import {ReactEcsRenderer} from '@dcl/sdk/react-ecs'

import * as ui from '@dcl/ui-scene-utils'

const announcement = new ui.Announcement({value: 'Text center'})

const uiComponent = () => {
    return [
        announcement.render(),
    ]
}

export function setupUi() {
    ReactEcsRenderer.setUiRenderer(uiComponent)
}

announcement.show()

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