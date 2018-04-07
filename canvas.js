// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtLRlcXkrQQTcs-1Qp1Od2rbPoYcwTEHE",
    authDomain: "sync-test-game.firebaseapp.com",
    databaseURL: "https://sync-test-game.firebaseio.com",
    projectId: "sync-test-game",
    storageBucket: "sync-test-game.appspot.com",
    messagingSenderId: "825894585819"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


database.ref().update({
  	//first: false,
	x:50,
	y:500,
	screenWidth: document.body.clientWidth
  });



const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballImage = new Image();
ballImage.src = "ball.png";

var ballY = 5;
var ballX = 5;

var paddleX = 5;
var paddleY = 5;

var ballVX = 10;
var ballVY = 10;


paddleImage.onload = function(e){
	console.log("START");
	start();


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


}


var game = {
	//height: 
}

function start(){
	canvas.width = document.body.clientWidth;
	canvas.height = window.innerHeight;
	var loop = setInterval(render,10);
}
var MASTER=false;
var oppWidth;
var RUN = false;
database.ref().once("value", function(e){
  	if(e.val().first == null || e.val().first == false){
		database.ref().update({first: true});
		MASTER=true;
		paddleX=5;
	}else{
		MASTER=false;
		paddleX=document.body.clientWidth-5;
	}
	console.log(MASTER);
	oppWidth = e.val().screenWidth;
	RUN = true;
  });

database.ref().on("value", function(e){
	if(RUN){
	if(MASTER){
  		ballX = e.val().x;
	}else{
		ballX = e.val().x-oppWidth;
	}
	ballY = e.val().y;
	}
  });

function clear(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderBall(){
	ctx.beginPath();
	ctx.arc(ballX, ballY, 50, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function renderPaddle(){
	ctx.drawImage(paddleImage,paddleX,paddleY,10,100);
}
var count =0;
function render(){
	count++;
	clear();
	if(MASTER){
		if(ballY+ballVY<0||ballY+ballVY>window.innerHeight){
			ballVY=ballVY*-1;
			console.log("FLIP");
		}
		database.ref().update({
   			x:ballX+ballVX,
			y:ballY+ballVY
		});
	}
	renderPaddle();	
	renderBall();
}
