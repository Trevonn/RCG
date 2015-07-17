rcg = {
	// Assign variables
	hexes : "0123456789ABCDEF",

	newNum : function(min, max) {
		'use strict';
		return Math.floor(Math.random() * (max + 1 - min) + min);
	},

	newColor : function(type, min, max) {
		"use strict";
		var color = []; // Create color array

		if (type === "" || type === undefined) {
			type = "rgb";
		}

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
		} // if min or max are empty or do not fit within boundaries use default

		for (var i = 0; i < 3; i++) {
			if (type === "rgb") {
				color[i] = this.newNum(min, max);
			} // Add random RGB color to array

			if (type === "hex") { 
				color[i] = this.hexes.charAt(this.newNum(min, max)) + this.hexes.charAt(this.newNum(min, max));
			} // Add random hex color to array
		}
		return color;
	},

	convert : function(type, input) {
		"use strict";
		var color = []; 

		for (var i = 0; i < input.length; i++) {
			if (type === "rgb") { // Convert hex color to RGB color
				color[i] = parseInt("0x" + input[i], 16);
			}
			if (type === "hex") { // Convert RGB color to hex color
				// Use magic maths to convert RGB value to hex value
				color[i] = this.hexes.charAt((input[i] - input[i] % 16) / 16) + this.hexes.charAt(input[i] % 16);
			}
		}
		return color; // Spit out converted color
	},

	toText : function(type, color) {
		'use strict';
		if (type === "hex") {
			return "#" + color[0] + color[1] + color[2];
		}
		if (type === "rgb") {
			return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
		}
	} 
	/* 
		This function takes color values from an array and places them inside 
		a readable string of text.
	*/
}