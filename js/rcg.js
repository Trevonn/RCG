var hex_alpha = "0123456789ABCDEF",
	current = "",
	default_rgb_min = 0,
	default_rgb_max = 255,
	options = {};

// Assign variables

function rcg(type, min, max) {

	if (min === undefined) { min = default_rgb_min }
	else if (min < 0 || min > 255) { min = default_rgb_min }
	if (max === undefined) { max = default_rgb_max }
	else if (max > 255 || max < 0) { max = default_rgb_max }
	// fail case for out of boundary min and max

	current = type;
	if (type === "rgb") { // rgb colour generator
		var color = [];
		for (var x = 0; x < 3; x++) {
			color[x] = Math.floor(Math.random() * (max + 1 - min) + min);
			// Generate 3 rgb values and append them to an array
		}
		return "rgb(" + color.toString() + ")";
	} else if (type === "hex") { // hexadecimal colour generator
		var color = ""; // Create color string
		for (var x = 0; x < 6; x++) { // Loop six times
			color += hex_alpha.charAt(
				Math.floor(Math.random() * 16)
			); // Select random hexadecimal value
		}
		return "#" + color; // Spit out hexadecimal colour
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
		console.log("Successfully converted a " + type +" colour");

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
				// Use magic maths to deduce
			}
		}

		console.log("Successfully converted a " + type +" colour");
		return color;
	}
}
