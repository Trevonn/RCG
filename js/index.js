var boxes = document.querySelectorAll(".box");
var labels = document.querySelectorAll(".box-label")
var button = document.querySelector(".button");
// Assign references to elements

function random() {
	for (var i = 0; i < boxes.length; i++) { // For each box
		var color = [];
		for (var x = 0; x < 3; x++) {
			color[x] = Math.floor(Math.random() * 255) + 1;
			// Generate random colour
		}
		boxes[i].style.backgroundColor = "rgb(" + color.toString() + ")";
		// Assign colour to current box.
		labels[i].textContent = "rgb(" + color.toString() + ")";
		// Assign colour name to current box label.
	}
}

random();

button.addEventListener("click", random, false);
