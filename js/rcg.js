var hex_alpha = "0123456789ABCDEF",
	current = "";

// Assign variables

function randomNumber(min, max) {
	'use strict';
	return Math.floor(Math.random() * (max + 1 - min) + min);
}

function randomColor(type, min, max) {
	"use strict";
	var color = [];

	if (type === "rgb") {
		if (min === undefined || min < 0 || min > 255) {
			min = 0;
		}
		if (max === undefined || max > 255 || max < 0) {
			max = 255;
		}
	} else if (type === "hex") {
		if (min === undefined || min < 0 || min > 15) {
			min = 0;
		}
		if (max === undefined || max > 15 || max < 0) {
			max = 15;
		}
	}

	// fail case for out of boundary min and max

	for (var i = 0; i < 3; i++) {
		if (type === "rgb") { // RGB colour generator
			color[i] = randomNumber(min, max);
		}
		if (type === "hex") { // hexadecimal colour generator
			color[i] = hex_alpha.charAt(randomNumber(min, max)) + hex_alpha.charAt(randomNumber(min, max));
		}
	}
	return color; // Spit out hexadecimal colour
}

function convert(type, input) {
	"use strict";
	var tempColor = "",
		color = []; 

	for (var i = 0; i < input.length; i++) {
		if (type === "rgb") { // Convert hexadecimal colour to RGB colour
			color[i] = parseInt("0x" + input[i], 16);
		}
		if (type === "hex") { // Convert RGB Colour to hexadecimal colour
			tempColor += hex_alpha.charAt((input[i] - input[i] % 16) / 16);
			tempColor += hex_alpha.charAt(input[i] % 16);
			// Use magic maths to convert RGB value to hexadecimal value
			color[i] = tempColor;
			tempColor = "";
		}
	}
	return color; // Spit out converted colour
}

function colorToString(type, color) {
	'use strict';
	if (type === "hex") {
		return "#" + color[0] + color[1] + color[2];
	}
	if (type === "rgb") {
		return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
	}
}
