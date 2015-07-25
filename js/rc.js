var rc = {} // Declare object
// Assign variables
rc.hexes = '0123456789abcdef';

rc.newNum = function(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

rc.newColor = function(type, min, max) {
  'use strict';
  var color = [];

  if (type === '' || type === undefined) {
    type = 'rgb';
  }

  if (type === 'rgb') {
    if (min === undefined || min < 0 || min > 255 || isNaN(min) || min > max) {
      min = 0;
    }
    if (max === undefined || max > 255 || max < 0 || isNaN(max) || max > min) {
      max = 255;
    }
  } else if (type === 'hex') {
    if (min === undefined || min < 0 || min > 15 || min > max) {
      min = 0;
    }
    if (max === undefined || max > 15 || max < 0 || max > min) {
      max = 15;
    }
  } // if min or max are empty or do not fit within boundaries use default

  for (var i = 0; i < 3; i++) {
    if (type === 'rgb') {
      color[i] = this.newNum(min, max);
    } // Add random RGB color to array

    if (type === 'hex') {
      color[i] = this.hexes.charAt(this.newNum(min, max)) + this.hexes.charAt(this.newNum(min, max));
    } // Add random hex color to array
  }
  return color;
}

rc.convert = function(type, input) {
  'use strict';
  var color = [];

  for (var i = 0; i < input.length; i++) {
    switch (type) {

      case 'rgb':
        color[i] = parseInt('0x' + input[i], 16);
        break;

      case 'hex':
        color[i] = this.hexes.charAt((input[i] - input[i] % 16) / 16) + this.hexes.charAt(input[i] % 16);
        break;

      default:
        console.log('Function: Convert \nError: color type is invalid. \nTry putting quotes around the string.');
        break;
    }
  }
  return color; // Spit out converted color
}

rc.toText = function(type, color) {
  /*
    This function takes color values from an array and places them inside
    a readable string of text.
  */
  'use strict';
  var result;
  switch (type) {

    case 'rgb':
      result = 'rgb(' + color.toString() + ')';
      break;

    case 'hex':
      result = '#' + color[0] + color[1] + color[2];
      result = result.toUpperCase();
      break;

    default:
      console.log('Function: toText \nError: color type is invalid. \nPossible solution: Try putting quotes around the string.');
      break;
  }
  return result;
}
