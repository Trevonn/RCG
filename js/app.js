var boxes = document.querySelectorAll('.inner-box'),
	boxLabels = document.querySelectorAll('.box-label'),
	inputRGB = document.getElementsByClassName('choice')[0],
	inputHEX = document.getElementsByClassName('choice')[1],
	btnType = document.querySelectorAll('.btn-type'),
	btnRefresh = document.querySelector('.btn-refresh'),
	copyright = document.querySelector('.copyright-js'),
	inputs = document.querySelectorAll('.colorInput'),
	curType = 'rgb',
	colors = [],
	min = 0,
	max = 255,
	year = new Date();

// Declare varibales

function filterInt(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
  return Number(value);
  return NaN;
}

function refresh(elements, labels, min, max) {
  'use strict';
  if (curType === 'rgb') {
    var customRgbMin = filterInt(inputs[0].value);
    var customRgbMax = filterInt(inputs[1].value);
    if (customRgbMin < 0 || customRgbMin > 255 || isNaN(customRgbMin)) {
      min = 0;
      inputs[0].value = '0';
    } else {
      min = customRgbMin;
    }
    if (customRgbMax < 0 || customRgbMax > 255 || isNaN(customRgbMax)) {
      max = 255;
      inputs[1].value = '255';
    } else {
      max = customRgbMax;
    }
  } else {
    var customHexMin = rc.hexes.indexOf(inputs[2].value);
    var customHexMax = rc.hexes.indexOf(inputs[3].value);
    if (customHexMin !== -1) {
      min = customHexMin;
    } else {
      inputs[2].value = '0';
      min = 0;
    } //
    if (customHexMax !== -1) {
      max = customHexMax;
    } else {
      inputs[3].value = 'F';
      max = 15;
    } //
  }

  for (var i = 0; i < elements.length; i++) {    // For each element
    colors[i] = rc.newColor(curType, min, max); // Add color to array
    var color = rc.toText(curType, colors[i]);  // Assign color to variable
    elements[i].style.backgroundColor = color;   // Change Background color
    labels[i].textContent = color;               // Change label
  }
}

function changeType(elements, labels, type1) {
  'use strict';

  if (curType === type1) {
    return; // Exit if color type is the same
  }

  for (var i = 0; i < elements.length; i++) {
    var converted = rc.convert(type1, colors[i]);
    // Assign converted color to variable
    var color = rc.toText(type1, converted);
    labels[i].textContent = color;
    // Change labels to converted color
    colors[i] = converted;
    // Replace color in color array with converted color
  }

  curType = type1; // Change current color type
}

for (var i = 0; i < btnType.length; i++) {
  btnType[i].addEventListener('click', function() {
    'use strict';
    changeType(boxes, boxLabels, this.textContent.toLowerCase());
  }, false);
} // Add event listeners to color type buttons

if (btnRefresh) {  // If refresh button exists
  btnRefresh.addEventListener('click', function() {
    'use strict';
    refresh(boxes, boxLabels, min, max);
    if (curType === 'rgb') {
      inputRGB.checked = true;
    } else if (curType === 'hex') {
      inputHEX.checked = true;
    }
  }, false);
} // Add function call to refresh button

document.onreadystatechange = function() {
  'use strict';
  if (document.readyState == 'complete') {
    if (curType === 'rgb') {
      inputRGB.checked = true;
    } else if (curType === 'hex') {
      inputHEX.checked = true;
    }
  }
};

year = year.getFullYear();

copyright.innerHTML = '&copy; ' + year + ' - Trevonn';

refresh(boxes, boxLabels, min, max); // Initialise
