const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballImage = new Image();
ballImage.src = "ball.png";

var paddleImage = new Image();
paddleImage.src = "paddle.png";

var ballY = 50;
var ballX = 50;

var paddleX = 5;

start();
render();

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
	renderPaddleLeft(touch.clientY);
}, false);


var game = {
	//height: 
}

function start(){
	canvas.width = document.body.clientWidth;
	canvas.height = window.innerHeight;
}

function clear(){
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function render(){
	renderBall();
	renderPaddleLeft();
	//clear();
}

function renderBall(){
	ctx.drawImage(ballImage,ballX,ballY,10,10);
}
function renderPaddleLeft(var paddleY){
	ctx.drawImage(paddleImage,paddleX,paddleY,10,100);
}