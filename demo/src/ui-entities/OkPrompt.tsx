import * as ui from '@dcl/ui-scene-utils'

export const okPrompt = new ui.OkPrompt({
  text: 'This is an Ok Prompt',
  onAccept: () => {
    okPrompt.hide()
    console.log('okPrompt onAccept')
  },
})

// okPrompt.show()