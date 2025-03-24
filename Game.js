let paddle1Y, paddle2Y;
let paddleHeight = 80;
let paddleWidth = 10;
let ballX, ballY;
let ballSpeedX, ballSpeedY;
let ballSize = 10;
let score1 = 0;
let score2 = 0;
let winningScore = 10;
let input, button;

function setup() {
  createCanvas(600, 400);
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
  resetBall();

  input = createInput(winningScore.toString());
  input.position(20, height + 20);
  input.size(50);

 
  button = createButton('Selecciona el puntaje para ganar');
  button.position(80, height + 20);
  button.mousePressed(updateWinningScore);
}

function draw() {
  background(0);

  fill(0, 0, 255);
  rect(0, paddle1Y, paddleWidth, paddleHeight);
  rect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  fill(0, 255, 0);
  ellipse(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > height) {
    ballSpeedY *= -1;
  }

  if (ballX - ballSize / 2 < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX *= -1;
    ballSpeedX *= 1.1;
  }
  if (ballX + ballSize / 2 > width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX *= -1;
    ballSpeedX *= 1.1;
  }

  if (ballX < 0) {
    score2++;
    resetBall();
  }
  if (ballX > width) {
    score1++;
    resetBall();
  }

  textSize(32);
  fill(255);
  text(score1, width / 4, 50);
  text(score2, 3 * width / 4, 50);

  if (score1 >= winningScore) {
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Jugador 1 Gana!", width / 2, height / 2);
    noLoop();
  }
  if (score2 >= winningScore) {
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Jugador 2 Gana!", width / 2, height / 2);
    noLoop();
  }

  if (keyIsDown(87)) {
    paddle1Y -= 5;
  }
  if (keyIsDown(83)) {
    paddle1Y += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    paddle2Y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    paddle2Y += 5;
  }

  paddle1Y = constrain(paddle1Y, 0, height - paddleHeight);
  paddle2Y = constrain(paddle2Y, 0, height - paddleHeight);
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = random([-3, 3]);
  ballSpeedY = random([-3, 3]);
}

function updateWinningScore() {
  let newScore = int(input.value());
  if (newScore > 0) {
    winningScore = newScore;
    score1 = 0;
    score2 = 0;
    loop(); 
  } else {
    alert("Por favor, ingresa un número válido mayor que 0.");
  }
}