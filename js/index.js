var boxes = document.querySelectorAll(".inner-box"),
	box_labels = document.querySelectorAll(".box-label"),
	input_rgb = document.getElementsByClassName("choice")[0],
	input_hex = document.getElementsByClassName("choice")[1],
	btn_rgb = document.querySelector(".btn-rgb"),
	btn_hex = document.querySelector(".btn-hex"),
	btn_refresh = document.querySelector(".btn-refresh"),
	btn_convert = document.querySelector(".btn-convert"),
	copyright = document.querySelector(".copyright"),
	current = "rgb",
	current2 = "hex",
	colors = [],
	min = 0,
	max = 255,
	year = new Date();

// Declare varibales

function changeText(element, text) {
	element.textContent = text;
}

function changeBackground(element, color) {
	element.style.backgroundColor = color
}

function refresh(elements, labels, min, max) {
	'use strict';
	for (var x = 0; x < 6; x++) { // Loop 6 times
		colors[x] = (randomColor(current, min, max)); // Add color to array 
	} 
	for (var i = 0; i < elements.length; i++) { // For each element
		var color = colorToString(current, colors[i]); // Assign color to variable
		changeBackground(elements[i], color); // Change Background color
		changeText(labels[i], color); // Change label
	}
}

if (btn_rgb) { // if rgb button exists
	btn_rgb.addEventListener("click", function() {
		'use strict';

		if (current === "rgb") {
			return
		}

		current = "rgb";
		
		for (var i = 0; i < boxes.length; i++) {
			var converted = convert(current, colors[i]);
			changeText(box_labels[i], colorToString(current, converted));
			colors[i] = converted;
		}
	}, false); // Change color type to RGB
}

if (btn_hex) { // if hex button exists
	btn_hex.addEventListener("click", function() {
		'use strict';

		if (current === "hex") {
			return
		}
		
		current = "hex";

		for (var i = 0; i < boxes.length; i++) {
			var converted = convert(current, colors[i]);
			changeText(box_labels[i], colorToString(current, converted));
			colors[i] = converted;
		}
	}, false); // Change color type to hexadecimal
}

if (btn_refresh) {  // If refresh button exists
	btn_refresh.addEventListener("click", function() {
		'use strict';
		if (current === "rgb") {
			min = parseInt(document.querySelector(".rgb_min").value);
			max = parseInt(document.querySelector(".rgb_max").value);
		} else {
			min = hex_alpha.indexOf(document.querySelector(".hex_min").value.toString().toUpperCase());
			max = hex_alpha.indexOf(document.querySelector(".hex_max").value.toString().toUpperCase());
		}

		refresh(boxes, box_labels, min, max);
		if (current === "rgb") {
			input_rgb.checked = true;
		} else if (current === "hex") {
			input_hex.checked = true;
		}
	}, false);
} // Add function call to refresh button

year = year.getFullYear();

copyright.innerHTML = "&copy; " + year + " - Trevonn";

refresh(boxes, box_labels, min, max); // Initialise
