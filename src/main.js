import "./styles/style.scss";

const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
	let span = document.createElement("span");
	let txt = document.createTextNode(letter);
	span.appendChild(txt);
	span.className = "letter-box";
	lettersContainer.appendChild(span);
});

const words = {
	programming: [
		"php",
		"javascript",
		"go",
		"scala",
		"fortran",
		"r",
		"mysql",
		"python",
	],
	movies: [
		"Prestige",
		"Inception",
		"Parasite",
		"Interstellar",
		"Whiplash",
		"Memento",
		"Coco",
		"Up",
	],
	people: [
		"Albert Einstein",
		"Hitchcock",
		"Alexander",
		"Cleopatra",
		"Mahatma Ghandi",
	],
	countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Random Property

let allKeys = Object.keys(words);
let randomPropNum = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNum];
let randomPropVal = words[randomPropName];

// Random Value
let randomValNum = Math.floor(Math.random() * randomPropVal.length);
let randomValName = randomPropVal[randomValNum];

// Set category info

document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select letters guess container
let guessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to array

let lettersAndSpace = Array.from(randomValName);

// create spans depend on word

lettersAndSpace.forEach((letter) => {
	// create empty span
	let span = document.createElement("span");
	// If letter is space
	if (letter === "") {
		// add class to the span
		span.classList.add("space");
	}
	// append span to the guess container
	guessContainer.appendChild(span);
});

// Select guess span

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;

let draw = document.querySelector(".hangman-draw");

// handle clicking on letters

let success = new Audio("/assets/sounds/success.mp3");
let lose = new Audio("/assets/sounds/lose.mp3");
let correct = new Audio("/assets/sounds/correct.mp3");
let fail = new Audio("/assets/sounds/fail.mp3");

document.addEventListener("click", (e) => {
	let gameStatus = false;
	if (e.target.className === "letter-box") {
		e.target.classList.add("clicked");
		// get clicked letter
		let clickedLetter = e.target.innerHTML.toLowerCase();
		// the chosen word
		let chosenWord = Array.from(randomValName.toLowerCase());
		// chosen word
		chosenWord.forEach((currentLetter, wordIndex) => {
			// if the clicked letter equal to one of the chosen word letter
			if (clickedLetter == currentLetter) {
				// Set status correct
				gameStatus = true;
				// loop on all guess spans
				guessSpans.forEach((span, spanIndex) => {
					if (wordIndex === spanIndex) {
						span.innerHTML = clickedLetter;
					}
				});
			}
		});
		if (gameStatus !== true) {
			// increase the wrong attempt
			if (wrongAttempts !== 8) {
				wrongAttempts++;
				draw.classList.add(`wrong-${wrongAttempts}`);
				fail.play();
			} else {
				endGame("lose");
			}
		} else {
			correct.play();
			let str = "";
			guessSpans.forEach((span) => {
				str += span.innerHTML;
			});
			if (str.length === randomValName.length) endGame("winner");
		}
	}
});
console.log(randomValName);

let popup = document.querySelector(".pop-up");
function endGame(behavior) {
	if (behavior === "lose") {
		// popup
		popup.style.display = "block";
		popup.src = "/assets/imgs/failed.png";
		lose.play();
		document.body.style.pointerEvents = "none";
	} else {
		// popup
		popup.style.display = "block";
		popup.src = "/assets/imgs/passed.png";
		success.play();
		document.body.style.pointerEvents = "none";
	}
}
