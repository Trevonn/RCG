'use strict' // Strict Mode

// var ui = {}
// var app = {} // Declare object

// ui.dMin = 0
// ui.dMax = 255
// ui.min = 0
// ui.max = 0

var boxes = document.querySelectorAll('.inner-box')
var boxLabels = document.querySelectorAll('.box-label')
var inputRGB = document.getElementsByClassName('choice')[0]
var inputHEX = document.getElementsByClassName('choice')[1]
var btnType = document.querySelectorAll('.btn-type')
var btnRefresh = document.querySelector('.btn-refresh')
var copyright = document.querySelector('.copyright-js')
var inputs = document.querySelectorAll('.colorInput')
var spinner = document.querySelector('.fa-refresh')
var curType = 'rgb'
var colors = []
var min = 0
var max = 255
var year = new Date()

// Declare varibales

function filterInt (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }
  return NaN
}

function refresh (elements, labels, min, max) {
  if (curType === 'rgb') {
    var customRgbMin = filterInt(inputs[0].value) // RGB Min
    var customRgbMax = filterInt(inputs[1].value) // RGB Max
    // Save chosen values to variables
    if (customRgbMin < 0 || customRgbMin > 255 || isNaN(customRgbMin)) {
      min = 0
      inputs[0].value = '0'
    } else {
      min = customRgbMin
    } 
    // if chosen minimum is invalid reset the input value
    if (customRgbMax < 0 || customRgbMax > 255 || isNaN(customRgbMax)) {
      max = 255
      inputs[1].value = '255'
    } else {
      max = customRgbMax
    } 
    // if chosen maximum is invalid reset the value
  } else {
    var customHexMin = rc.hexes.indexOf(inputs[2].value) // Hex Min
    var customHexMax = rc.hexes.indexOf(inputs[3].value) // Hex Max

    if (customHexMin !== -1) {
      min = customHexMin
    } else {
      inputs[2].value = '0'
      min = 0
    } // if chosen minimum is invalid reset the value
    if (customHexMax !== -1) {
      max = customHexMax
    } else {
      inputs[3].value = 'F'
      max = 15
    } // if chosen maximum is invalid reset the value
  }

  colors = rc.newColor(curType, min, max, elements.length) // Generate colors

  for (var i = 0; i < elements.length; i++) { // For each element
    var color = rc.toText(colors[i], curType) // Assign color to variable
    elements[i].style.backgroundColor = color // Change Background color
    labels[i].textContent = color // Change label
  }
}

function changeType (elements, labels, type1) {
  if (curType === type1) {
    return // Exit if color type is the same
  }

  for (var i = 0; i < elements.length; i++) {
    var converted = rc.convert(type1, colors[i])
    // Assign converted color to variable
    var color = rc.toText(converted, type1)
    labels[i].textContent = color
    // Change labels to converted color
    colors[i] = converted
  // Replace color in color array with converted color
  }

  curType = type1 // Change current color type
}

for (var i = 0; i < btnType.length; i++) {
  btnType[i].addEventListener('click', function () {
    changeType(boxes, boxLabels, this.textContent.toLowerCase())
  }, false)
} // Add event listeners to color type buttons

btnRefresh.addEventListener('click', function () {
  refresh(boxes, boxLabels, min, max)
  if (curType === 'rgb') {
    inputRGB.checked = true
  } else if (curType === 'hex') {
    inputHEX.checked = true
  }
  spinner.classList.add('spin')
  window.setTimeout(function () {
    spinner.classList.remove('spin')
  }, 200)
}, false) // Add function call to refresh button

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    if (curType === 'rgb') {
      inputRGB.checked = true
    } else if (curType === 'hex') {
      inputHEX.checked = true
    }
  }
}

year = year.getFullYear()

copyright.innerHTML = '&copy; ' + year + ' Trevonn'

refresh(boxes, boxLabels, min, max) // Initialise
