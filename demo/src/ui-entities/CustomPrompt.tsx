import { Color4 } from '@dcl/sdk/math'

import * as ui from '@dcl/ui-scene-utils'

export const customPrompt = new ui.CustomPrompt({ style: ui.PromptStyles.DARKSLANTED })

const promptTitle = customPrompt.addText({
  value: 'What will you do?',
  xPosition: 0,
  yPosition: 130,
  color: Color4.Yellow(),
  size: 30,
})

const promptText = customPrompt.addText({
  value: 'It\'s an important decision',
  xPosition: 0,
  yPosition: 100,
})

const promptCheckbox = customPrompt.addCheckbox({
  text: 'Don\'t show again',
  xPosition: -80,
  yPosition: 50,
  onCheck: () => {
  },
  onUncheck: () => {
  },
})

// const promptSwitch = customPrompt.addSwitch({
//   text: 'Turn me',
//   xPosition: -60,
//   yPosition: 0,
//   onCheck: () => {
//   },
//   onUncheck: () => {
//   },
// })

const promptTextBox = customPrompt.addTextBox({
  placeholder: 'Enter text',
  xPosition: 0,
  yPosition: 0,
  onChange: () => {
  },
})

const promptButtonY = customPrompt.addButton({
  style: ui.ButtonStyles.E,
  text: 'Yeah',
  xPosition: 0,
  yPosition: -60,
  onMouseDown: () => {
  },
})

const promptButtonN = customPrompt.addButton({
  style: ui.ButtonStyles.F,
  text: 'Nope',
  xPosition: 0,
  yPosition: -120,
  onMouseDown: () => {
  },
})

// customPrompt.addIcon({
//   image: 'images/scene-thumbnail.png',
// })

// customPrompt.show()
