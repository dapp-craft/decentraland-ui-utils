import * as ui from '@dcl/ui-scene-utils'

export const okPrompt = new ui.OkPrompt({
  text: 'This is an Ok Prompt',
  onAccept: () => {
    console.log(`accepted`)
  },
})

okPrompt.show()