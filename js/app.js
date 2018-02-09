'use strict' // Strict Mode

var ui = {
  year: new Date()
}
var app = {} // Declare object

app.min = 0
app.max = 255

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

// Declare varibales

app.filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }
  return NaN
} // Grab interger from input

app.refresh = function(elements, labels, min, max) {
  if (curType === 'rgb') {
    var RgbMin = app.filterInt(inputs[0].value) // RGB Min
    var RgbMax = app.filterInt(inputs[1].value) // RGB Max
    // Save chosen values to variables
    if (RgbMin < 0 || RgbMin > 255 || isNaN(RgbMin)) {
      app.min = 0
      inputs[0].value = '0'
    } else {
      app.min = RgbMin
      console.log(app.min)
    }
    // if chosen minimum is invalid reset the input value
    if (RgbMax < 0 || RgbMax > 255 || isNaN(RgbMax)) {
      app.max = 255
      inputs[1].value = '255'
    } else {
      app.max = RgbMax
      console.log(app.max)
    }
    // if chosen maximum is invalid reset the value
  } else {
    var HexMin = rc.hexes.indexOf(inputs[2].value) // Hex Min
    var HexMax = rc.hexes.indexOf(inputs[3].value) // Hex Max
    console.log("HexMin: " + HexMin)
    console.log("HexMax: " + HexMax)
    if (HexMin !== -1) {
      app.min = HexMin
      console.log(app.min)
    } else {
      app.min = 0
      inputs[2].value = '0'
    } // if chosen minimum is invalid reset the value
    if (HexMax !== -1) {
      app.max = HexMax
      console.log(app.max)
    } else {
      app.max = 15
      inputs[3].value = 'F'
    } // if chosen maximum is invalid reset the value
  }

  colors = rc.newColor(curType, min, max, elements.length) // Generate colors

  for (var i = 0; i < elements.length; i++) { // For each element
    var color = rc.toText(colors[i], curType) // Assign color to variable
    elements[i].style.backgroundColor = color // Change Background color
    labels[i].textContent = color // Change label
  }
}

function changeType(elements, labels, type1) {
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
  btnType[i].addEventListener('click', function() {
    changeType(boxes, boxLabels, this.textContent.toLowerCase())
  }, false)
} // Add event listeners to color type buttons

btnRefresh.addEventListener('click', function() {
  app.refresh(boxes, boxLabels, app.min, app.max)
  if (curType === 'rgb') {
    inputRGB.checked = true
  } else if (curType === 'hex') {
    inputHEX.checked = true
  }
  spinner.classList.add('spin')
  window.setTimeout(function() {
    spinner.classList.remove('spin')
  }, 200)
}, false) // Add function call to refresh button

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    if (curType === 'rgb') {
      inputRGB.checked = true
    } else if (curType === 'hex') {
      inputHEX.checked = true
    }
  }
}

ui.year = ui.year.getFullYear()

copyright.innerHTML = '&copy; ' + ui.year + ' Trevonn'

app.refresh(boxes, boxLabels, app.min, app.max) // Initialise
