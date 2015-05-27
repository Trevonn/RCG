var colours = "0123456789ABCDEF",
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
			color += colours.charAt(
				Math.floor(Math.random() * 16)
			); // Select random hexadecimal value
		}
		return "#" + color; // Spit out hexadecimal colour
	}
}

function convert(type, input_color) {
	if (type === "hex") { // Convert hexadecimal colour to RGB colour
		var color = [];

		color[0] = parseInt("0x" + input_color.substring(1,3), 16);
		// Red
		color[1] = parseInt("0x" + input_color.substring(3,5), 16);
		// Green
		color[2] = parseInt("0x" + input_color.substring(5,7), 16);
		// Blue

		return "rgb(" + color.toString() + ")";
	}
	if (type === "rgb") { // Convert RGB Colour to hexadecimal colour
		var numbers = [],
			c = 0,
			currentColor = "",
			color = "#";
		for (var i = 0; i < input_color.length; i++) {

			var char = input_color.charAt(i);
			var isNum = isNaN(parseInt(char), 10);

			if (isNum === false) {
				currentColor += char;
				numbers[c] = currentColor;
			}
			if (char === ",") {
				numbers[c] = currentColor;
				c++;
				currentColor = "";
			}
		}
		if (numbers.length === 3) {
			for (var i = 0; i < 3; i++) {
				var num2 = numbers[i];
				color += colours.charAt( (num2 - num2 % 16) / 16);
				color += colours.charAt(num2 % 16);
			}
		}
		return color;
	}
}
