let paddle1Y, paddle2Y;
let paddleHeight = 80;
let paddleWidth = 10;
let ballX, ballY;
let ballSpeedX, ballSpeedY;
let ballSize = 10;
let score1 = 0;
let score2 = 0;
let winningScore = 10;
let input, button, configDiv;
let borderWidth = 12;

function setup() {
  createCanvas(600, 400);
  paddle1Y = height / 2 - paddleHeight / 2;
  paddle2Y = height / 2 - paddleHeight / 2;
  resetBall();

  configDiv = createDiv();
  configDiv.style('width', '100%');
  configDiv.style('text-align', 'center');
  configDiv.style('margin-top', '20px');


  input = createInput(winningScore.toString());
  input.size(50);
  input.style('padding', '5px');
  input.style('font-size', '16px');
  input.style('text-align', 'center');
  input.style('border-radius', '5px');
  input.style('border', '1px solid #3498db');

  button = createButton('Configurar Puntos');
  button.style('padding', '8px 15px');
  button.style('font-size', '16px');
  button.style('background-color', '#3498db');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');
  button.style('margin-left', '10px');
  button.style('transition', 'all 0.3s');
  button.mousePressed(updateWinningScore);

  button.mouseOver(() => {
    button.style('background-color', '#2980b9');
  });
  button.mouseOut(() => {
    button.style('background-color', '#3498db');
  });

  configDiv.child(input);
  configDiv.child(button);

  configDiv.position(0, height + 10);
}

function draw() {
  background(0);
  
  stroke(70); 
  strokeWeight(borderWidth); 
  noFill();
  rect(0, 0, width, height); 

  fill(0, 0, 255);
  noStroke();
  rect(0, paddle1Y, paddleWidth, paddleHeight);
  rect(width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  fill(0, 255, 0);
  ellipse(ballX, ballY, ballSize, ballSize);

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - ballSize/2 <= borderWidth || ballY + ballSize/2 >= height - borderWidth) {
    ballSpeedY *= -1;
  }

  if (ballX - ballSize/2 < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX *= -1;
    ballSpeedX *= 1.1;
  }
  if (ballX + ballSize/2 > width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
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
  noStroke();
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

  paddle1Y = constrain(paddle1Y, borderWidth, height - paddleHeight - borderWidth);
  paddle2Y = constrain(paddle2Y, borderWidth, height - paddleHeight - borderWidth);
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
