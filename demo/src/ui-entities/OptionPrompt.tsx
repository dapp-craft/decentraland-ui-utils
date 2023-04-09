import * as ui from '@dcl/ui-scene-utils'

export const optionPrompt = new ui.OptionPrompt({
  title: 'Pick an option!',
  text: 'What will you choose?',
  onAccept: () => {
    optionPrompt.hide()
    console.log('optionPrompt onAccept')
  },
  onReject: () => {
    optionPrompt.hide()
    console.log('optionPrompt onReject')
  }
})

// optionPrompt.show()