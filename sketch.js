let gamePlay;
let gameOver;
let score;

let imgCerdo;
let imgFondo;
let imgMoneda;

function preload(){
    imgCerdo= loadImage('cerdo.png');
    imgFondo= loadImage('fondo2.jpg');
    imgMoneda= loadImage('moneda.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	frameRate(60);
	ellipseMode(RADIUS);
	rectMode(CORNERS);
	textAlign(CENTER, CENTER);
	gamePlay = new Game(windowHeight - 100);
	gameOver = false;
	score = 0;
}

function draw() {
	mainScene();
	gamePlay.move();
	gamePlay.moveObstacle();
	gamePlay.obstacleHit();
	gamePlay.display();
    gamePlay.obstacleHit
	if(gameOver == true) {
		background(0);
		gameOverScene();
	}
}

function keyPressed() {
	gamePlay.movingSwitch();
	if(keyCode === LEFT_ARROW) {
		gamePlay.moveLeft();
	} else if(keyCode === RIGHT_ARROW) {
		gamePlay.moveRight();
	}
}

function keyTyped() {
	if(key === ' ') {
		 gamePlay.pause();
	}
}

function absoluteValue(x) {
	if(x < 0) {
		return 0 - x;
	} else {
		return x;
	}
}

function reverseValue(x){
	if(x > windowWidth) {
		return absoluteValue(windowWidth - x);
	} else {
		return x;
	}
}

function gaussianStart(x, s) {
	var value = randomGaussian(x, s);
	if(value < 0) {
		return absoluteValue(value);
	} else if(value > windowWidth) {
		return reverseValue(value);					
	} else {
		return value;
	}
}

let moving = {
	state: false,
	direction: ''
};

class Game {
	constructor(ground) {
		this.x = windowWidth/2;
		this.y = ground + 42;
		this.ground = ground + 42;
		this.radius = 75;
		this.height = 40;
		this.obstacleX = gaussianStart(windowWidth/2, 150);
		this.mangoX = gaussianStart(windowWidth/2, 600);
		this.obstacleY = -70;
		this.obstacleRadius = 70;
		this.obstacleSpeed = 4;
		this.standardDeviation = 20;
	}
	movingSwitch () {
		moving.state = true;
	}
	pause() {
		moving.state = false;
	}
	moveLeft() {
		moving.direction = 'left';
	}
	moveRight() {
		moving.direction = 'right';
	}
	move() {
		if(keyIsPressed && moving.state == true) {
			if(moving.direction == 'left' && keyCode === LEFT_ARROW) {
				 this.x -= 5;
			} else if(moving.direction == 'right' && keyCode === RIGHT_ARROW) {
				this.x += 5;
			} 
		}
		if(this.x > windowWidth - 40) {
			this.x = windowWidth - 40;
		} else if(this.x < -40) {
			this.x = -40;
		}
	}
	obstacleReset() {
		this.obstacleX = random(30, windowWidth - 30);
		this.obstacleY = -50;
		this.obstacleSpeed += 0.5;
		//this.radius += random(1.5, 2.5);
		this.standardDeviation -= 1;
		this.obstacleRadius -= 2;
		if(gameOver == false) {
			score++;
		}
	}
	moveObstacle() {
		this.obstacleY += this.obstacleSpeed;
		if(this.obstacleY > windowHeight + 50) {
            gameOver = true;
			gameOverScene();
		}
	}
	obstacleHit() {
		if(this.obstacleY + this.obstacleRadius > this.y - this.radius && this.obstacleY - this.obstacleRadius < this.y + this.radius && this.obstacleX - this.obstacleRadius < this.x + this.radius && this.obstacleX + this.obstacleRadius > this.x - this.radius) {
            this.obstacleReset();
            
        }
	}
	display() {
		image(imgCerdo, this.x, this.y - 60, this.radius, this.radius);
		image(imgMoneda, this.obstacleX, this.obstacleY, this.obstacleRadius, this.obstacleRadius);
	}
}

function mainScene() {
    var formatScore = String(score)
	background(imgFondo);
	strokeWeight(7);
	stroke(2, 166, 10);
	line(-1, gamePlay.ground, windowWidth + 1, gamePlay.ground);
	noStroke();
	fill(0, 255, 12);
	rect(-1, gamePlay.ground, windowWidth + 1, windowHeight + 1);
	fill(255, 100, 0);
	textSize(20);
	text('Score: ' + formatScore, 50, 30);
}

function gameOverScene() {
	var formatScore = String(score);
    background(240, 128, 128);
    textSize(80);
    fill(236, 64, 122 );
    stroke(244, 143, 177 );
    strokeWeight(7);
    text('GAME OVER', windowWidth / 2, windowHeight / 2 - 40);
    textSize(30);
    text('Sigue participando!', windowWidth / 2, windowHeight / 2 + 30);
    textSize(50);
    text('SCORE: ' + formatScore, windowWidth / 2, windowHeight / 2 + 100);
}