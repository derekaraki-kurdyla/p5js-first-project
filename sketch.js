let leftPaddle;
let rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  leftPaddle = new Paddle(true, "blue");
  rightPaddle = new Paddle(false, "darkorange");
  ball = new Ball();
}

function draw() {
  background(255,36,36);
  leftPaddle.show();
  rightPaddle.show();
  ball.show();
  ball.update();
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);
  displayScores();
}

function keyPressed() {
  if (key === 'w') {
    leftPaddle.moveUp();
  } else if (key === 's') {
    leftPaddle.moveDown();
  }

  if (keyCode === UP_ARROW) {
    rightPaddle.moveUp();
  } else if (keyCode === DOWN_ARROW) {
    rightPaddle.moveDown();
  }
}

function displayScores() {
  fill(255);
  textSize(32);
  text(leftScore, width / 4, 50);
  text(rightScore, 3 * width / 4, 50);
}

class Paddle {
  constructor(isLeft, col) {
    this.col = color(col);
    this.width = 10;
    this.height = 80;
    this.x = isLeft ? 20 : width - 30;
    this.y = height / 2 - this.height / 2;
    this.speed = 20;
  }

  show() {
    fill(this.col);
    rect(this.x, this.y, this.width, this.height);
  }

  moveUp() {
    this.y = constrain(this.y - this.speed, 0, height - this.height);
  }

  moveDown() {
    this.y = constrain(this.y + this.speed, 0, height - this.height);
  }
}

class Ball {
  constructor() {
    this.size = 20;
    this.x = width / 2;
    this.y = height / 2;
    this.speedX = 5;
    this.speedY = 5;
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.size);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reflect the ball if it hits the top or bottom
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.speedY *= -1;
    }

    // Reset the ball if it goes beyond the left or right edge
    if (this.x - this.size / 2 < 0){
      this.x = width / 2;
      this.y = height / 2;
      rightScore += 1;
    }  
    if(this.x + this.size / 2 > width) {
      this.x = width / 2;
      this.y = height / 2;
      leftScore += 1;
    }
  }

  checkCollision(paddle) {
    
    if (
      this.x - this.size / 2 < paddle.x + paddle.width / 2 &&
      
      this.x + this.size / 2 > paddle.x - paddle.width / 2 &&
      
      //bottom y coord of ball < top of paddle (b/c y coord for rectangles is bottom left)
      this.y - this.size / 2 < paddle.y + paddle.height &&
      
      //top y coord of ball > bottom of paddle
      this.y + this.size / 2 > paddle.y
    ) {
      this.speedX *= -1;
    }
  }
}
