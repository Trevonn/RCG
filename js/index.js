var boxes = document.querySelectorAll(".inner-box"),
	box_labels = document.querySelectorAll(".box-label"),
	input_rgb = document.getElementsByClassName("choice")[0],
	input_hex = document.getElementsByClassName("choice")[1],
	btn_rgb = document.querySelector(".btn-rgb"),
	btn_hex = document.querySelector(".btn-hex"),
	btn_refresh = document.querySelector(".btn-refresh"),
	copyright = document.querySelector(".copyright-js"),
	current = "rgb",
	current2 = "hex",
	colors = [],
	colors2 = [],
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
	for (var i = 0; i < elements.length; i++) {   // For each element
		colors[i] = rcg.newColor(current, min, max); // Add color to array
		var color = rcg.toText(current, colors[i]); // Assign color to variable
		changeBackground(elements[i], color);     // Change Background color
		changeText(labels[i], color);             // Change label
	}
}

if (btn_rgb) { // if rgb button exists
	btn_rgb.addEventListener("click", function() {
		'use strict';

		if (current === "rgb") {
			return
		} // If colours types are the same then stop
	
		for (var i = 0; i < boxes.length; i++) {
			var converted = rcg.convert("rgb", colors[i]);
			changeText(box_labels[i], rcg.toText("rgb", converted));
			colors[i] = converted;
		}

		current = "rgb";
		current2 = "hex";
	}, false); // Change color type to RGB
}

if (btn_hex) { // if hex button exists
	btn_hex.addEventListener("click", function() {
		'use strict';

		if (current === "hex") {
			return
		} // If colours types are the same then stop
	
		for (var i = 0; i < boxes.length; i++) {
			var converted = rcg.convert("hex", colors[i]);
			changeText(box_labels[i], rcg.toText("hex", converted));
			colors[i] = converted;
		}

		current = "hex";
		current2 = "rgb";
	}, false); // Change color type to hexadecimal
}

if (btn_refresh) {  // If refresh button exists
	btn_refresh.addEventListener("click", function() {
		'use strict';
		if (current === "rgb") {
			min = parseInt(document.querySelector(".rgb_min").value);
			max = parseInt(document.querySelector(".rgb_max").value);
		} else {
			min = rcg.hexes.indexOf(document.querySelector(".hex_min").value.toString().toUpperCase());
			max = rcg.hexes.indexOf(document.querySelector(".hex_max").value.toString().toUpperCase());
		}

		refresh(boxes, box_labels, min, max);
		if (current === "rgb") {
			input_rgb.checked = true;
		} else if (current === "hex") {
			input_hex.checked = true;
		}
	}, false);
} // Add function call to refresh button

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    if (current === "rgb") {
		input_rgb.checked = true;
	} else if (current === "hex") {
		input_hex.checked = true;
	}
  }
}

year = year.getFullYear();

copyright.innerHTML = "&copy; " + year + " - Trevonn";

refresh(boxes, box_labels, min, max); // Initialise
