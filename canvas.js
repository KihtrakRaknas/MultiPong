const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballImage = new Image();
ballImage.src = "ball.png";

var paddleImage = new Image();
paddleImage.src = "paddle.png";

var ballY = 50;
var ballX = 50;

var paddleX = 5;
var paddleY = 5;

window.onload = function(e){
	console.log("START");
	start();
}

canvas.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

canvas.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

canvas.addEventListener("touchmove", function (e) {
	var touch = e.touches[0];
	if (e.target == canvas) {
		e.preventDefault();
	}
	paddleY = touch.clientY;
}, false);


var game = {
	//height: 
}

function start(){
	canvas.width = document.body.clientWidth;
	canvas.height = window.innerHeight;
	var loop = setInterval(render,50);
}

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render(){
	clear();
	renderBall();
	renderPaddle();	
}

function renderBall(){
	ctx.drawImage(ballImage,ballX,ballY,10,10);
}

function renderPaddle(){
	console.log("DRAW "+ paddleY)
	ctx.drawImage(paddleImage,paddleX,paddleY,10,100);
}