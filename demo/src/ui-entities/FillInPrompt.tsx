import * as ui from '@dcl/ui-scene-utils'

export const fillInPrompt = new ui.FillInPrompt({
  title: 'What are you thinking?',
  onAccept: (value: string) => {
    console.log('fillInPrompt onAccept', value)
  },
})

// fillInPrompt.show()