//get a random word from the file
import { wordList } from './words/wordList.js';
import { guessList } from './words/guessList.js';


var word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
// https://gist.github.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b
var gameOver = 0;
var numGuesses = 6;
var letterLength = 5;
var col = 0;
var row = 0;

window.onload = function() {
	game();
}

function game(){
	// creates the board 
	for(let r = 0; r < numGuesses; r++){
		for(let c = 0; c < letterLength; c++){
			let letter = document.createElement('span');
			letter.id = r.toString() + '-' + c.toString();
			letter.classList.add('letter');
			letter.innerText = '';
			document.getElementById('board').appendChild(letter)
		}
	}
	// waits for input
	document.addEventListener('keyup', (e) => {
		input(e)
	})
}

function input(e){
	
	if(gameOver) return;
	// Gets input from keyboard A - Z
	if('KeyA' <= e.code && e.code <= 'KeyZ'){

		// doesn't let the input go above 5 letters
		if(col < letterLength){

			// currLetter will be used to get the current letter in the a tile
			let currLetter = document.getElementById(row.toString() + '-' + col.toString());	

			// Add the input into the current tile
			if(currLetter.innerText == ''){
				currLetter.innerText = e.code[3];
				col += 1
			}
		}	
		// deletes the input if backspace is pressed 
	} else if(e.code == 'Backspace'){
			if(0 < col && col <= letterLength){
				col -= 1
		}
		let currLetter = document.getElementById(row.toString() + '-' + col.toString());
		currLetter.innerText = '';

	// once enter is hit it checks the guess if its right or not
	}else if(e.code == 'Enter'){
		check_guess();
	}

	// once all guesses have been entered and the word isn't guesses then the word will be revealed 
	if(!gameOver && row == numGuesses){
		let answer = document.getElementById('answer');
		let slider = document.getElementById('dark_mode');
		gameOver = true;
		if(slider.checked){
			answer.style.color = 'white';
		}else{
			answer.style.color = 'black';
		}
		answer.innerText = word;
	}
}

async function check_guess(){
	let guess = '';
	let correct = 0;
	document.getElementById('answer').style.color = 'white'
  document.getElementById('answer').innerText = '___';
	

	// gets every letter from the row and creates the guess word 
	for (let i = 0; i < letterLength; i++) {
		let currLetter = document.getElementById(row.toString() + '-' + i.toString());
		guess += currLetter.innerText;
	}
	
	guess = guess.toLowerCase();

	// if the guess is not in the list of available words then it doesn't allow for entry
	if(!guessList.includes(guess)){
		let answer = document.getElementById('answer');
		let slider = document.getElementById('dark_mode');
		if(slider.checked){
			answer.style.color = 'white';
		}else{
			answer.style.color = 'black'
		}
		answer.innerText = 'Not In Word List';
		return;
	}
	// gets every letter in the guess for later use
	let letterCount = {};
	for (let i = 0; i < word.length; i++) {
		let letter = word[i];
		if(letterCount[letter]){
			letterCount[letter] += 1;
		} else  
			letterCount[letter] = 1;
		}

	for (let i = 0; i< word.length; i++) {
		let currLetter = document.getElementById(row.toString() + '-' + i.toString());
		// if the letter is in the same spot it marks it as correct 
		if(word[i] == currLetter.innerText){
			currLetter.classList.add('temp-correct');
			correct += 1;
			letterCount[currLetter.innerText] -= 1;
		}
		
		if(correct == letterLength){
			gameOver = true;
		}
	}
	
	for (let i = 0; i < word.length; i++) {
		let currLetter = document.getElementById(row.toString() + '-' + i.toString());
		if(!currLetter.classList.contains('temp-correct')){
			if(word.includes(currLetter.innerText) && letterCount[currLetter.innerText] > 0){
				currLetter.classList.add('temp-present');
				letterCount[currLetter.innerText] -= 1;
			}else{
				currLetter.classList.add('temp-absent');
			}
		}
	}

	for (let i = 0; i < word.length; i++) {
		let currLetter = document.getElementById(row.toString() + '-' + i.toString());
		if(currLetter.classList.contains('temp-correct')){
			currLetter.classList.add('animation');
			await sleep(500);
			currLetter.classList.add('correct');
		}else if (currLetter.classList.contains('temp-present')){
			currLetter.classList.add('animation');
			await sleep(500);
			currLetter.classList.add('present');
		}else{
			currLetter.classList.add('animation');
			await sleep(500);
			currLetter.classList.add('absent');
		}
	}
	row += 1;
	col = 0;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}