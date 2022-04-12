"use strict";
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;

const playSound = function (color) {
	let sound = new Audio(`/sounds/${color}.mp3`);
	sound.play();
};

let animatePress = function (currentColor) {
	$(`.${currentColor}`).attr("class", `pressed ${currentColor}`);
	setTimeout(() => {
		$(`.${currentColor}`).attr("class", `${currentColor}`);
	}, 100);
};

$(document).keypress(function () {
	if (gamePattern.length === 0) {
		$("h1").text(`Level ${level}`);
		nextSequence();
	}
});

const startGame = function () {};

const nextSequence = function () {
	level++;
	$("h1").text(`Level ${level}`);
	userClickPattern = [];
	let randomNum = Math.trunc(Math.random() * 4);
	let randomChosenColor = buttonColors[randomNum];
	gamePattern.push(randomChosenColor);
	$(`.${randomChosenColor}`).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
};

$("button").on("click", function (e) {
	let userChosenColor = e.target.classList[0];
	userClickPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkSequence(userClickPattern.length - 1);
});

function checkSequence(newestClick) {
	if (userClickPattern[newestClick] === gamePattern[newestClick]) {
		console.log("success");
		if (userClickPattern.length === gamePattern.length) {
			setTimeout(() => nextSequence(), 1000);
		}
	} else {
		$("body").attr("class", "fail");
		setTimeout(() => $("body").attr("class", ""), 200);
		console.log("wrong");
		playSound("wrong");
		$("h1").text("Game Over😭: Press Any Key to Continue🏁");
		gamePattern = [];
		level = 0;
	}
}

// $(document).on("keypress", function (e) {
// 	switch (e.originalEvent.key.toUpperCase()) {
// 		case "I":
// 			userClickPattern.push("red");
// 			playSound(userChosenColor);
// 			animatePress(userChosenColor);
// 			checkSequence(userClickPattern.length - 1);
// 			break;

// 		case "O":
// 			userClickPattern.push("yellow");
// 			playSound(userChosenColor);
// 			animatePress(userChosenColor);
// 			checkSequence(userClickPattern.length - 1);
// 			break;

// 		case "K":
// 			userClickPattern.push("green");
// 			playSound(userChosenColor);
// 			animatePress(userChosenColor);
// 			checkSequence(userClickPattern.length - 1);
// 			break;

// 		case "L":
// 			userClickPattern.push("blue");
// 			playSound(userChosenColor);
// 			animatePress(userChosenColor);
// 			checkSequence(userClickPattern.length - 1);
// 			break;
// 	}
// });
