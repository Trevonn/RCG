var colours = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],
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
		var color = "";
		for (var x = 0; x < 6; x++) {
			color += colours[Math.floor(Math.random() * 16)].toString();
			// Generate 6 hexadecimal values
		}
		return "#" + color.toString();
	}
}

function convert(type, element, label) {

	for (var i = 0; i < label.length; i++) {
		if (type === "hex") {
			var color = [],
				colorLabel = label[i].textContent;

			color[0] = parseInt("0x" + colorLabel.substring(1,3), 16);
			// Red
			color[1] = parseInt("0x" + colorLabel.substring(3,5), 16);
			// Green
			color[2] = parseInt("0x" + colorLabel.substring(5,7), 16);
			// Blue

			element[i].style.backgroundColor = "rgb(" + color.toString() + ")";
			// Assign colour to current box.
			label[i].textContent = "rgb(" + color.toString() + ")";
			// Assign colour name to current box label.

		}
		if (type === "rgb") {

		}
		if (i === label.length) {
			current = "rgb";

		}
	}
}
