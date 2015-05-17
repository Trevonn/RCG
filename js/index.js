var boxes = document.querySelectorAll(".box"),
	labels = document.querySelectorAll(".box-label"),
	btn_rgb = document.querySelector(".btn-rgb"),
	btn_hex = document.querySelector(".btn-hex"),
	btn_refresh = document.querySelector(".btn-refresh"),
	colours = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],
	current = "";
// Assign variables

function random(type) {
	current = type;
	if (type === "rgb") { // rgb colour generator
		for (var i = 0; i < boxes.length; i++) { // For each box
			var color = [];
			for (var x = 0; x < 3; x++) {
				color[x] = Math.floor(Math.random() * 256);
				// Generate 3 rgb values and append them to an array
			}
			boxes[i].style.backgroundColor = "rgb(" + color.toString() + ")";
			// Assign colour to current box.
			labels[i].textContent = "rgb(" + color.toString() + ")";
			// Assign colour name to current box label.
		}
	} else if (type === "hex") { // hexadecimal colour generator
		for (var i = 0; i < boxes.length; i++) { // For each box
			var color = "";
			for (var x = 0; x < 6; x++) {
				color += colours[Math.floor(Math.random() * 16)].toString();
				// Generate 6 hexadecimal values
			}
			boxes[i].style.backgroundColor = "#" + color;
			// Assign colour to current box.
			labels[i].textContent = "#" + color;
			// Assign colour name to current box label.
		}
	}
}

btn_rgb.addEventListener("click", function() {
	current = "rgb";
}, false); // Change colour type to RGB

btn_hex.addEventListener("click", function() {
	current = "hex";
}, false); // Change colour type to hexadecimal

btn_refresh.addEventListener("click", function() {
	random(current);
}, false); // Add function call to refresh button


random("rgb"); // Default to rgb colours on startup
