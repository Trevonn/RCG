var hex_alpha = "0123456789ABCDEF",
	current = "",
	options = {};

// Assign variables

function rcg(type, min, max) {
	var color = {
		red: 0,
		green: 0,
		blue: 0
	};

	if (min === undefined) { min = 0}
	else if (min < 0 || min > 255) { min = 0 }
	if (max === undefined) { max = 255 }
	else if (max > 255 || max < 0) { max = 255 }
	// fail case for out of boundary min and max

	current = type;
	if (type === "rgb") { // rgb colour generator
		for(var key in color) {
			if (color.hasOwnProperty(key)) {
				color[key] = Math.floor(Math.random() * (max + 1 - min) + min);
			}
		}
		return color;
	} else if (type === "hex") { // hexadecimal colour generator
		for(var key in color) {
			if (color.hasOwnProperty(key)) {
				color[key] = hex_alpha.charAt(Math.floor(Math.random() * 16)).toString()
						   + hex_alpha.charAt(Math.floor(Math.random() * 16)).toString();
			}
		}
		return color; // Spit out hexadecimal colour
	}
}

function convert(type, colorInput) {

	if (type === "hex") { // Convert hexadecimal colour to RGB colour
		var colorArray = [];

		colorArray[0] = parseInt("0x" + colorInput.substring(1,3), 16);
		// Red
		colorArray[1] = parseInt("0x" + colorInput.substring(3,5), 16);
		// Green
		colorArray[2] = parseInt("0x" + colorInput.substring(5,7), 16);
		// Blue

		return "rgb(" + colorArray.toString() + ")";
	}

	if (type === "rgb") { // Convert RGB Colour to hexadecimal colour
		var	position = 0,
			color = "#",
			colorArray = [],
			currentColor = "";
			// Declare variables

		for (var i = 0; i < colorInput.length; i++) {
			// Loop through colour string

			var currentChar = colorInput.charAt(i);
			// Assign current position in the colour string to variable

			var isNum = isNaN(parseInt(currentChar), 10);
			// Determine whether the current character is a number or not

			if (!isNum) { // if the current character is a number
				currentColor += currentChar;
				colorArray[position] = currentColor; // Add colour to array
			}
			if (currentChar === ",") {
				colorArray[position] = currentColor; // Add colour to array
				position++; // Move on to next colour
				currentColor = ""; // Delete current colour
			}
		}

		if (colorArray.length === 3) { // if colour array contains 3 colours
			for (var i = 0; i < 3; i++) { // loop through colour array

				var colorValue = colorArray[i];
				// Assing current position to vaiable

				color += hex_alpha.charAt( (colorValue - colorValue % 16) / 16);
				color += hex_alpha.charAt(colorValue % 16);
				// Use magic maths to convert RGB value to hexadecimal value
			}
		}

		return color; // Spit out converted colour
	}
}

function colourToString(type, color) {

	if (type === "hex") {
		return "#" + color.red + color.green + color.blue;
	}

	if (type === "rgb") {
		return "rgb("+ color.red + "," + color.green + "," + color.blue +")";
	}
}
