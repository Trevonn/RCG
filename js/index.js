var boxes = document.querySelectorAll(".box");
var labels = document.querySelectorAll(".box-label")
var btn_rgb = document.querySelector(".btn-rgb");
var btn_hex = document.querySelector(".btn-hex");
var colours = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
// Assign references to elements

function random(type) {
		for (var i = 0; i < boxes.length; i++) { // For each box
			var color = [];
			for (var x = 0; x < 3; x++) {
			}
			boxes[i].style.backgroundColor = "rgb(" + color.toString() + ")";
			// Assign colour to current box.
			labels[i].textContent = "rgb(" + color.toString() + ")";
			// Assign colour name to current box label.
		}
	}
		for (var i = 0; i < boxes.length; i++) { // For each box
			var color = "";
			for (var x = 0; x < 6; x++) {
				color += colours[Math.floor(Math.random() * (16 - 0)) + 0].toString();
			}
			boxes[i].style.backgroundColor = "#" + color.toString();
			// Assign colour to current box.
			labels[i].textContent = "#" + color.toString();
			// Assign colour name to current box label.
		}
	}
}

btn_rgb.addEventListener("click", function() {
	random("rgb");
}, false); // Add function call to RGB button

btn_hex.addEventListener("click", function() {
	random("hex");
}, false); // Add function call to hexadecimal button

random("hex");
