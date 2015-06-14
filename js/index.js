var boxes = document.querySelectorAll(".box"),
	box_labels = document.querySelectorAll(".box-label"),
	input_rgb = document.getElementsByClassName("choice")[0],
	input_hex = document.getElementsByClassName("choice")[1],
	btn_rgb = document.querySelector(".btn-rgb"),
	btn_hex = document.querySelector(".btn-hex"),
	btn_refresh = document.querySelector(".btn-refresh"),
	btn_convert = document.querySelector(".btn-convert"),
	current = "rgb",
	current2 = "hex",
	colours = [];

// Declare varibales

function refresh(elements, labels, min, max) {
  'use strict';
  for (var x = 0; x < 6; x++) {
    colours[x] = (randomColor(current, min, max));
  }
  for (var i = 0; i < elements.length; i++) {
    var color = colorToString(current, colours[i]);
    elements[i].style.backgroundColor = color;
    labels[i].textContent = color;

    // Change background colour of each element
  }
}

if (btn_rgb) { // if rgb button exists
  btn_rgb.addEventListener("click", function() {
    'use strict';
    current = "rgb";
  }, false); // Change colour type to RGB
}

if (btn_hex) { // if hex button exists
  btn_hex.addEventListener("click", function() {
    'use strict';
    current = "hex";
  }, false); // Change colour type to hexadecimal
}

if (btn_refresh) {  // If refresh button exists
  btn_refresh.addEventListener("click", function() {
    'use strict';
    var rgb_min = parseInt(document.querySelector(".rgb_min").value),
    rgb_max = parseInt(document.querySelector(".rgb_max").value);

    refresh(boxes, box_labels, rgb_min, rgb_max);
    if (current === "rgb") {
      input_rgb.checked = true;
    } else if (current === "hex") {
      input_hex.checked = true;
    }
  }, false);
} // Add function call to refresh button

if (btn_convert) { // if convert button exists.
  btn_convert.addEventListener("click", function() {
    'use strict';
    
    if (box_labels[0].textContent.charAt(0) === "r") {
      input_rgb.checked = true;
      current = "rgb";
      current2 = "hex";
    } else if (box_labels[0].textContent.charAt(0) === "#") {
      input_hex.checked = true;
      current = "hex";
      current2 = "rgb";
    }
    
    for (var i = 0; i < boxes.length; i++) {
      var converted = convert(current2, colours[i]);
      box_labels[i].textContent = colorToString(current2, converted);
      colours[i] = converted;
    }

    if (current === "rgb") {
      input_rgb.checked = true;
    } else if (current === "hex") {
      input_hex.checked = true;
    }

  }, false);
}

refresh(boxes, box_labels, 0, 255); // Initialise
