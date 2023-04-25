import { Color4 } from '@dcl/sdk/math'

import * as ui from '@dcl/ui-scene-utils'

export const customPrompt = new ui.CustomPrompt(
  {
    style: ui.PromptStyles.DARKLARGE,
    height: 550,
    width: 500,
    onClose: () => console.log('close customPrompt____________'),
  },
)

customPrompt.width = 800

const promptTitle = customPrompt.addText({
  value: 'What will you do?',
  xPosition: 0,
  yPosition: 250,
  color: Color4.Yellow(),
  size: 30,
})

promptTitle.textElement.textAlign = 'bottom-center'

const promptIcon = customPrompt.addIcon({
  image: 'images/scene-thumbnail.png',
  xPosition: 0,
  yPosition: 128,
})

const promptText = customPrompt.addText({
  value: 'It\'s an important decision',
  xPosition: 0,
  yPosition: 50,
})

promptText.textElement.textAlign = 'top-right'

const promptTextBox = customPrompt.addTextBox({
  placeholder: 'Enter text',
  xPosition: 0,
  yPosition: -20,
  onChange: () => {
    console.log('addTextBox onChange')
  },
})

promptTextBox.fillInBoxElement.placeholderColor = Color4.Yellow()

const promptCheckbox = customPrompt.addCheckbox({
  text: 'Don\'t show again',
  xPosition: -80,
  yPosition: -70,
  onCheck: () => {
    console.log('addCheckbox onCheck')
  },
  onUncheck: () => {
    console.log('addCheckbox onUncheck')
  },
})

promptCheckbox.labelElement.fontSize = 12

const promptSwitch = customPrompt.addSwitch({
  text: 'Turn me',
  xPosition: -60,
  yPosition: -120,
  onCheck: () => {
    console.log('addSwitch onCheck')
  },
  onUncheck: () => {
    console.log('addSwitch onUncheck')
  },
})

promptSwitch.labelElement.color = Color4.Green()

const promptButtonE = customPrompt.addButton({
  style: ui.ButtonStyles.E,
  text: 'Yeah',
  xPosition: -100,
  yPosition: -200,
  onMouseDown: () => {
    console.log('addButton onMouseDown')
  },
})

promptButtonE.labelElement.color = Color4.Yellow()

const promptButtonF = customPrompt.addButton({
  style: ui.ButtonStyles.F,
  text: 'Nope',
  xPosition: 100,
  yPosition: -200,
  onMouseDown: () => {
    console.log('addButton onMouseDown')
  },
})

// customPrompt.show()

customPrompt.closeIcon.hide()