var boxes = document.querySelectorAll('.inner-box'),
  boxLabels = document.querySelectorAll('.box-label'),
  inputRGB = document.getElementsByClassName('choice')[0],
  inputHEX = document.getElementsByClassName('choice')[1],
  btnType = document.querySelectorAll('.btn-type'),
  btnRefresh = document.querySelector('.btn-refresh'),
  copyright = document.querySelector('.copyright-js'),
  curType = 'rgb',
  colors = [],
  min = 0,
  max = 255,
  year = new Date();

// Declare varibales

function refresh(elements, labels, min, max) {
  'use strict';
  if (curType === 'rgb') {
    min = parseInt(document.querySelector('.rgb_min').value);
    // Store chosen minimum value in a variable
    if (isNaN(parseInt(min)) === true ||
        parseInt(min) < 0 ||
        parseInt(min) > 255) {
      min = 0;
      document.querySelector('.rgb_min').value = '0';
    } // If input is invalid use default minimum value

    max = parseInt(document.querySelector('.rgb_max').value);
    // Store chosen maximum value in a variable
    if (isNaN(parseInt(max)) === true ||
        parseInt(max) < 0 ||
        parseInt(max) > 255) {
      max = 255;
      document.querySelector('.rgb_max').value = '255';
    } // If input is invalid use default maximum value
  } else {
    min = rcg.hexes.indexOf(
      document.querySelector('.hex_min').value.toString().toUpperCase()
    ); // Store chosen minimum value in a variable
    max = rcg.hexes.indexOf(
      document.querySelector('.hex_max').value.toString().toUpperCase()
    ); // Store chosen maximum value in a variable
  }

  for (var i = 0; i < elements.length; i++) {    // For each element
    colors[i] = rcg.newColor(curType, min, max); // Add color to array
    var color = rcg.toText(curType, colors[i]);  // Assign color to variable
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
    var converted = rcg.convert(type1, colors[i]);
    // Assign converted color to variable
    labels[i].textContent = rcg.toText(type1, converted);
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
