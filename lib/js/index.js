// 3rd party modules

// local modules

// collect elements from the page
const encoderElement = document.getElementById("encoder")
const answerElement = document.getElementById("answer")
const questionElement = document.getElementById("question")
const submitElement = document.getElementById("submit")
const errorElement = document.getElementById("error")
const fadeInOutElement = document.getElementById("fader")

const PRAYER = 'Universe, please answer me'
const DEFAULT_ERROR_ANSWERS = ['You do not believe', 'Try harder', 'Not a true believer here', 'Not good enough',
  'Keep trying', 'You can do it!', 'No luck this time', 'Better luck next time', 'Not there yet']

// set some defaults
let answer = ''
let isEncodedMode = false
let lastChar = ''
let answerTimer

// this listener is used for every pressed character within the encoded input
encoderElement.addEventListener('keypress', function(event) {
  lastChar = event.key

  // when "." is pressed, only switch encode mode
  if (event.key === '.') {
    isEncodedMode = !isEncodedMode
  } else {
    // only update "answers" while in "encoded" mode
    if (isEncodedMode) answer = answer.concat(event.key)
  }
});

// this method updates the "encoded" input field
function onEncodedInput () {
  // only update the field if in "encoded" mode or if last character was "."
  if (isEncodedMode || lastChar === '.') {
    encoderElement.value = PRAYER.substring(0, encoderElement.value.length)
  }
}

// called on "prayer" submit
function onSubmit () {
  // disable double submit actions
  submitElement.disabled = true

  // is entered prayer correct?
  if (encoderElement.value !== PRAYER) {
    errorElement.innerHTML = 'Invalid prayer entered'
    return
  }

  let questionLength = Math.floor(questionElement.value.length / 10)
  if (questionLength > 10) questionLength = 10

  fadeInOutElement.className = 'fadeIn'

  answerTimer = setTimeout(() => {
    fadeInOutElement.className = 'disabled'
    // if answer does not exist display some random error
    answerElement.innerHTML = answer || getRandomErrorMessage()

  }, questionLength * 1000)
}

// reset all to defaults
function onReset () {
  encoderElement.value = ''
  questionElement.value = ''
  answerElement.innerHTML = ''
  errorElement.innerHTML = ''
  submitElement.disabled = false
  answer = ''
  fadeInOutElement.className = 'disabled'
  if (answerTimer) clearTimeout(answerTimer)
}

// pick randomly message from the error array
function getRandomErrorMessage () {
  const randomIndex = getRandomInt(DEFAULT_ERROR_ANSWERS.length)
  return DEFAULT_ERROR_ANSWERS[randomIndex] || DEFAULT_ERROR_ANSWERS[0]
}

const getRandomInt = (maxNumber) => Math.floor(Math.random() * maxNumber)

// setup popover with jquery
$(function () {
  const title = 'Some basic instructions'
  const content = 'Some content WIP Some content WIP Some content WIP Some content WIP Some content WIP Some content WIP '

  $('[data-toggle="popover"]').popover({ title, content })
})

// some jquery magic for removing popover on outside click
$('html').on('click', function(e) {
  if (typeof $(e.target).data('original-title') == 'undefined' &&
    !$(e.target).parents().is('.popover.fade')) {
      $('[data-original-title]').popover('hide');
    }
});
