import ReactEcs, { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'

import * as ui from '@dcl/ui-scene-utils'

const fillInPrompt = new ui.FillInPrompt({
  title: 'What are you thinking?',
  onAccept: (value: string) => {
    console.log(`accepted`, value)
  },
})
const optionPrompt = new ui.OptionPrompt({
  title: 'Pick an option!',
  text: 'What will you choose?',
  onAccept: () => {
    console.log(`accepted`)
  },
})
const okPrompt = new ui.OkPrompt({
  text: 'This is an Ok Prompt',
  onAccept: () => {
    console.log(`accepted`)
  },
})
const customPrompt = new ui.CustomPrompt({ style: ui.PromptStyles.DARKSLANTED })
const announcement = new ui.Announcement({ value: 'Text center', yOffset: 400 })
const loadingIcon = new ui.LoadingIcon({ yOffset: 300 })
const smallIcon = new ui.SmallIcon({ image: 'images/scene-thumbnail.png', yOffset: 150 })
const mediumIcon = new ui.MediumIcon({ image: 'images/scene-thumbnail.png', yOffset: 210 })
const largeIcon = new ui.LargeIcon({ image: 'images/scene-thumbnail.png', yOffset: 300 })
const uiCounter = new ui.UICounter({ value: 123 })
const cornerLabel = new ui.CornerLabel({ value: 'Label', xOffset: -300, yOffset: 70 })
const uiBar = new ui.UIBar({ value: .5, xOffset: -500, yOffset: 60 })

const uiComponent = () => {
  return [
    fillInPrompt.render('fillInPrompt'),
    optionPrompt.render('optionPrompt'),
    okPrompt.render('okPrompt'),
    customPrompt.render('customPrompt'),
    announcement.render('announcement'),
    loadingIcon.render('loadingIcon'),
    smallIcon.render('smallIcon'),
    mediumIcon.render('mediumIcon'),
    largeIcon.render('largeIcon'),
    uiCounter.render('uiCounter'),
    cornerLabel.render('cornerLabel'),
    uiBar.render('uiBar'),
  ]
}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

// fillInPrompt.show()

// optionPrompt.show()

okPrompt.show()

// customPrompt.show()

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

announcement.show()
loadingIcon.show()
smallIcon.show()
mediumIcon.show()
largeIcon.show()
uiCounter.show()
cornerLabel.show()
uiBar.show()