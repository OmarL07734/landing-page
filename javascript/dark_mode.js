function darkMode(){
	var slider = document.getElementById('dark_mode');
	var answer = document.getElementById('answer');
	var text = document.getElementsByClassName('dark_text');
	var body = document.getElementsByTagName('body');
	var board = document.getElementById('board');
	let tiles = document.getElementsByClassName('letter');
	
	if(slider.checked){
		for(let i = 0; i < text.length; i++){
			text[i].style.color = 'white';
			body[0].style.backgroundColor = '#212422';
		}
		for(let i = 0; i < tiles.length; i++){
			tiles[i].style.border = "2px solid #404241";
		}
		board.style.color = 'white';
		answer.style.color = 'white';
	}else{
		for(let i = 0; i < text.length; i++){
			text[i].style.color = '#212422';
			body[0].style.backgroundColor = 'white';
		}
		for(let i = 0; i < tiles.length; i++){
			tiles[i].style.border = "2px solid #d3d6da";
		}
		board.style.color = '#212422';
		answer.style.color = 'black';
	}
}
