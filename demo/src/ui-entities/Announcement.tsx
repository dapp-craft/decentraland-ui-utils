import * as ui from '@dcl/ui-scene-utils'
import { Color4 } from '@dcl/sdk/math'

export const announcement = new ui.Announcement({ startHidden: true, value: 'Text center', yOffset: 400, duration: 3 })

announcement.textElement.color = Color4.Blue()