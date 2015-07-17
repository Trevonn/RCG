var boxes = document.querySelectorAll(".inner-box"),
	box_labels = document.querySelectorAll(".box-label"),
	input_rgb = document.getElementsByClassName("choice")[0],
	input_hex = document.getElementsByClassName("choice")[1],
	btn_type = document.querySelectorAll(".btn-type"),
	btn_refresh = document.querySelector(".btn-refresh"),
	copyright = document.querySelector(".copyright-js"),
	curType = "rgb",
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

  if (curType === "rgb") {
    min = parseInt(document.querySelector(".rgb_min").value);
    max = parseInt(document.querySelector(".rgb_max").value);
  } else {
    min = rcg.hexes.indexOf(document.querySelector(".hex_min").value.toString().toUpperCase());
    max = rcg.hexes.indexOf(document.querySelector(".hex_max").value.toString().toUpperCase());
  }

  for (var i = 0; i < elements.length; i++) {    // For each element
    colors[i] = rcg.newColor(curType, min, max); // Add color to array
    var color = rcg.toText(curType, colors[i]);  // Assign color to variable
    changeBackground(elements[i], color);        // Change Background color
    changeText(labels[i], color);                // Change label
  }
}

function changeType(elements, labels, type1) {
	'use strict';

	if (curType === type1) {
		return
	}

	for (var i = 0; i < elements.length; i++) {
		var converted = rcg.convert(type1, colors[i]);
    // Assign converted color to array
    console.log("color sucessfully converted");
    changeText(labels[i], rcg.toText(type1, converted));
    // Change labels to converted color
    colors[i] = converted;
    // Replace color in color array with converted color
	}

	curType = type1;
}

for (var i = 0; i < btn_type.length; i++) {
	btn_type[i].addEventListener("click", function() {
    'use strict';
    changeType(boxes, box_labels, this.textContent.toLowerCase());
  }, false);
};


if (btn_refresh) {  // If refresh button exists
  btn_refresh.addEventListener("click", function() {
    'use strict';

    refresh(boxes, box_labels, min, max);
    if (curType === "rgb") {
      input_rgb.checked = true;
    } else if (curType === "hex") {
      input_hex.checked = true;
    }
  }, false);
} // Add function call to refresh button

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
    if (curType === "rgb") {
      input_rgb.checked = true;
    } else if (curType === "hex") {
      input_hex.checked = true;
    }
  }
}

year = year.getFullYear();

copyright.innerHTML = "&copy; " + year + " - Trevonn";

refresh(boxes, box_labels, min, max); // Initialise
