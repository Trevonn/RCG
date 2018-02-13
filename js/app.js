'use strict' // Strict Mode

var ui = {
  boxes: document.querySelectorAll('.inner-box'),
  boxLabels: document.querySelectorAll('.box-label'),
  inputRGB: document.getElementsByClassName('choice')[0],
  inputHEX: document.getElementsByClassName('choice')[1],
  btnType: document.querySelectorAll('.btn-type'),
  btnRefresh: document.querySelector('.btn-refresh'),
  copyright: document.querySelector('.copyright-js'),
  inputs: document.querySelectorAll('.colorInput'),
  spinner: document.querySelector('.fa-refresh'),
  year: new Date(),
}

var app = {
  min: 0,
  app: 255,
  curType: 'rgb',
  colors: []
}

app.filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }
  return NaN
} // Grab interger from input

app.refresh = function(elements, labels, min, max) {
  if (app.curType === 'rgb') {
    var RgbMin = app.filterInt(ui.inputs[0].value) // RGB Min
    var RgbMax = app.filterInt(ui.inputs[1].value) // RGB Max
    // Save chosen values to variables
    if (RgbMin < 0 || RgbMin > 255 || isNaN(RgbMin)) {
      app.min = 0
      ui.inputs[0].value = '0'
    } else {
      app.min = RgbMin
    }
    // if chosen minimum is invalid reset the input value
    if (RgbMax < 0 || RgbMax > 255 || isNaN(RgbMax)) {
      app.max = 255
      ui.inputs[1].value = '255'
    } else {
      app.max = RgbMax
    }
    // if chosen maximum is invalid reset the value
  } else {
    var HexMin = rc.hexes.indexOf(ui.inputs[2].value) // Hex Min
    var HexMax = rc.hexes.indexOf(ui.inputs[3].value) // Hex Max
    if (HexMin !== -1) {
      app.min = HexMin
    } else {
      app.min = 0
      ui.inputs[2].value = '0'
    } // if chosen minimum is invalid reset the value
    if (HexMax !== -1) {
      app.max = HexMax
    } else {
      app.max = 15
      ui.inputs[3].value = 'f'
    } // if chosen maximum is invalid reset the value
  }

  app.colors = rc.newColor(app.curType, app.min, app.max, elements.length) // Generate app.colors

  for (var i = 0; i < elements.length; i++) { // For each element
    var color = rc.toText(app.colors[i], app.curType) // Assign color to variable
    elements[i].style.backgroundColor = color // Change Background color
    labels[i].textContent = color // Change label
  }
}

function changeType(elements, labels, type1) {
  if (app.curType === type1) {
    return // Exit if color type is the same
  }

  for (var i = 0; i < elements.length; i++) {
    var converted = rc.convert(type1, app.colors[i])
    // Assign converted color to variable
    var color = rc.toText(converted, type1)
    labels[i].textContent = color
    // Change labels to converted color
    app.colors[i] = converted
  // Replace color in color array with converted color
  }

  app.curType = type1 // Change current color type
}

for (var i = 0; i < ui.btnType.length; i++) {
  ui.btnType[i].addEventListener('click', function() {
    changeType(ui.boxes, ui.boxLabels, this.textContent.toLowerCase())
  }, false)
} // Add event listeners to color type buttons

ui.btnRefresh.addEventListener('click', function() {
  app.refresh(ui.boxes, ui.boxLabels, app.min, app.max)
  if (app.curType === 'rgb') {
    ui.inputRGB.checked = true
  } else if (app.curType === 'hex') {
    ui.inputHEX.checked = true
  }
  ui.spinner.classList.add('spin')
  window.setTimeout(function() {
    ui.spinner.classList.remove('spin')
  }, 200)
}, false) // Add function call to refresh button

document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    if (app.curType === 'rgb') {
      ui.inputRGB.checked = true
    } else if (app.curType === 'hex') {
      ui.inputHEX.checked = true
    }
  }
}

ui.year = ui.year.getFullYear()

ui.copyright.innerHTML = '&copy; ' + ui.year + ' Trevonn'

app.refresh(ui.boxes, ui.boxLabels, app.min, app.max) // Initialise
