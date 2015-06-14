var hex_alpha = "0123456789ABCDEF",
	colorNames = ["red", "green", "blue"],
	current = "";

// Assign variables

function randomNumber(min, max) {
  'use strict';
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function genColor() {
  'use strict';
  var obj = {
    red: 0,
    green: 0,
    blue: 0
  };
  return obj;
}

function randomColor(type, min, max) {
  "use strict";
  var color = genColor(),
  key;

  if (min === undefined) {
    min = 0;
  } else if (min < 0 || min > 255) {
    min = 0;
  }
  if (max === undefined) {
    max = 255;
  } else if (max > 255 || max < 0) {
    max = 255;
  }

  // fail case for out of boundary min and max

  current = type;
  if (type === "rgb") { // RGB colour generator
    for (key in color) {
      color[key] = randomNumber(min, max);
    }
    return color;
  } else if (type === "hex") { // hexadecimal colour generator
    for (key in color) {
      if (color.hasOwnProperty(key)) {
        color[key] = hex_alpha.charAt(randomNumber(0, 15)).toString() + hex_alpha.charAt(randomNumber(0, 15)).toString();
      }
    }
    return color; // Spit out hexadecimal colour
  }
}

function convert(type, colorInput) {
  "use strict";
  var color = genColor(),
  key;

  for (key in color) {
    if (type === "rgb") { // Convert hexadecimal colour to RGB colour

      color[key] = parseInt("0x" + colorInput[key], 16);
    }

    if (type === "hex") { // Convert RGB Colour to hexadecimal colour

      var newColor = "";

      // Assing current position to vaiable

      newColor += hex_alpha.charAt((colorInput[key] - colorInput[key] % 16) / 16);
      newColor += hex_alpha.charAt(colorInput[key] % 16);

      color[key] = newColor;

      // Use magic maths to convert RGB value to hexadecimal value
    }

  }
  return color; // Spit out converted colour
}

function colorToString(type, color) {
  'use strict';

  if (type === "hex") {
    return "#" + color.red + color.green + color.blue;
  }

  if (type === "rgb") {
    return "rgb(" + color.red + "," + color.green + "," + color.blue + ")";
  }
}
