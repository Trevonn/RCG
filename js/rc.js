'use strict' // Strict Mode

var rc = {} // Declare object
rc.hexes = '0123456789abcdef'
// Assign variables

rc.newNum = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
} // Returns a number between a specified minimum and maximum

rc.newColor = function (type, min, max, amount) { 
  // This function generates a random color
  var colors = []

  for (var i = 0; i < amount; i++) {
    var color = []

    for (var x = 0; x < 3; x++) {
      if (type === 'rgb') {
        color[x] = this.newNum(min, max)
      } // Add new RGB value to array

      if (type === 'hex') {
        color[x] = this.hexes.charAt(this.newNum(min, max)) +
        this.hexes.charAt(this.newNum(min, max))
      } // Add new hex value to array
    }

    colors[i] = color // Add new color to array
    color = [] // Reset color array
  }
  return colors
}

rc.convert = function (type, input) {
  // This function converts a colour from one type to another
  var color = []

  for (var i = 0; i < input.length; i++) {
    switch (type) {
      case 'rgb':
        color[i] = parseInt('0x' + input[i], 16)
        break

      case 'hex':
        color[i] = this.hexes.charAt((input[i] - input[i] % 16) / 16) + this.hexes.charAt(input[i] % 16)
        break

      default:
        console.log('Function: Convert \nError: color type is invalid. \nTry putting quotes around the string.')
        break
    }
  }
  return color // Spit out converted color
}

rc.toText = function (color, type) {
  /*
    This function takes color values from an array and places them inside
    a readable string of text.
  */
  var result

  switch (type) {
    case 'rgb':
      result = 'rgb(' + color.toString() + ')'
      break

    case 'hex':
      result = '#' + color[0] + color[1] + color[2]
      result = result.toUpperCase()
      break

    case undefined:
      result = 'rgb(' + color.toString() + ')'
      break

    default:
      console.log('Function: toText \nError: Color type is invalid. \nFix: The color type must be either hex or rgb')
      break
  }
  return result
}
