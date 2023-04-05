import { Announcement } from './ui-entities/Announcement'
import { CornerLabel } from './ui-entities/CornerLabel'
import { Counter as UICounter } from './ui-entities/Counter'
import { BarStyles, ProgressBar as UIBar } from './ui-entities/ProgressBar'
import { LargeIcon, MediumIcon, SmallIcon } from './ui-entities/Icon'
import { Loading as LoadingIcon } from './ui-entities/Loading'
import { CenterImage } from './ui-entities/CenterImage'
import { Prompt } from './ui-entities/Prompt'

// import { engine } from '@dcl/sdk/ecs'

export {
  Announcement,
  UICounter,
  UIBar,
  BarStyles,
  CornerLabel,
  MediumIcon,
  SmallIcon,
  LargeIcon,
  CenterImage,
  LoadingIcon,
  Prompt,
}


// let timer: number = 7
//
// function LoopSystem(dt: number) {
//   timer -= dt
//   if (timer <= 0) {
//     timer = 7
//     // DO SOMETHING
//
//     console.log('index timer4444 --------------------------------------------------------')
//   }
// }
//
// engine.addSystem(LoopSystem)