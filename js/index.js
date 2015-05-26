var boxes = document.querySelectorAll(".box"),
	labels = document.querySelectorAll(".box-label"),
	input_rgb = document.getElementsByClassName("choice")[0],
	input_hex = document.getElementsByClassName("choice")[1],
	btn_rgb = document.querySelector(".btn-rgb"),
	btn_hex = document.querySelector(".btn-hex"),
	btn_refresh = document.querySelector(".btn-refresh"),
	btn_convert = document.querySelector(".btn-convert"),
    rgb_min = parseInt(document.querySelector(".rgb_min").value),
    rgb_max = parseInt(document.querySelector(".rgb_max").value);

btn_rgb.addEventListener("click", function() {
	current = "rgb";
}, false); // Change colour type to RGB

btn_hex.addEventListener("click", function() {
	current = "hex";
}, false); // Change colour type to hexadecimal

btn_refresh.addEventListener("click", function() {
	rcg(current, boxes, labels, rgb_min, rgb_max);
	if (current === "rgb") {
		input_rgb.checked = true;
	} else if (current === "hex") {
		input_hex.checked = true;
	}
}, false); // Add function call to refresh button

btn_convert.addEventListener("click", function() {
	convert(current, boxes, labels);
	if (input_hex.checked === true) {
		input_rgb.checked = true;
		current = "rgb";
	} else if (input_rgb === true) {
		input_hex.checked = true;
		current = "hex";
	}
})

rcg("rgb", boxes, labels, rgb_min, rgb_max);
// Default to rgb colours on startup
