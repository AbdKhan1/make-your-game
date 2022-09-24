import { checkCollision } from "./collision.js";
import { alienCoords } from "./alien.js";
import { startMoveBall } from "./script.js";
const grid = document.querySelector(".grid");
const score = document.querySelector("#score");
let points = 0;
let pointsCombo = 0;
let comboCount = 0;
let multiplier = 1;
export let movingBall = true;

let ballSpeed = 4;
let xDirection = ballSpeed;
let yDirection = ballSpeed;

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
const ballStart = [grid.offsetWidth / 2 - ball.offsetWidth / 2, 70];

export let ballCurrentPosition = ballStart;
drawBall();

export function changeValue() {
  if (startMoveBall) {
    movingBall = true;
  } else {
    movingball = false;
  }
}

//draw Ball
export function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}
//move ball
export function moveBall() {
  //ball and paddle
  let ballSizeAndPos = ball.getBoundingClientRect();
  let paddleSizeAndPos = document
    .querySelector(".paddle")
    .getBoundingClientRect();

  if (checkCollision(ballSizeAndPos, paddleSizeAndPos)) {
    pointsCombo = 0;
    multiplier = 1;
    comboCount = 0;
    ballChangeDirection(ballSizeAndPos, paddleSizeAndPos);
  }

  let brickArr = document.getElementsByClassName("brick");
  let brickCollision = false;
  let bricknum = 0;

  let alienArr = document.getElementsByClassName("alien");
  let alienCollision = false;
  let alienNum = 0;

  for (let i = 0; i < brickArr.length; i++) {
    let brickSizeandPos = brickArr[i].getBoundingClientRect();
    if (checkCollision(ballSizeAndPos, brickSizeandPos)) {
      brickCollision = true;
      bricknum = i;
      break;
    }
  }

  if (brickCollision) {
    comboCount++;
    if (comboCount % 5 == 0) {
      multiplier++;
    }
    if (alienArr.length != 0) {
      points += 100 * alienArr.length;
    } else {
      points += 50;
    }
    points += pointsCombo;
    pointsCombo += 10 * multiplier;

    score.innerHTML = points;
    brickArr[bricknum].style.backgroundColor = "white";
    brickChangeDirection(
      ballSizeAndPos,
      brickArr[bricknum].getBoundingClientRect()
    );
    // the sweet time seems to be 10ms
    // otherwise bricks sometimes dont get removed and sometimes too many
    // get removed
    setTimeout(function () {
      brickArr[bricknum].remove();
    }, 10);
  }

  for (let i = 0; i < alienArr.length; i++) {
    let alienSizeAndPos = alienArr[i].getBoundingClientRect();
    if (checkCollision(ballSizeAndPos, alienSizeAndPos)) {
      alienCollision = true;
      alienNum = i;
      break;
    }
  }

  if (alienCollision) {
    points += 150;
    score.innerHTML = points;
    alienChangeDirection(
      ballSizeAndPos,
      alienArr[alienNum].getBoundingClientRect()
    );
    alienArr[alienNum].style.filter = "hue-rotate(260deg)";
    setTimeout(function () {
      alienArr[alienNum].remove();
      alienCoords.splice(alienNum, 1);
      console.log(alienCoords);
    }, 10);
  }

  if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= 600 - 35) {
    xDirection = -xDirection;
  }

  if (ballCurrentPosition[1] >= window.innerHeight - 25) {
    yDirection = -yDirection;
  }

  if (ballCurrentPosition[1] <= 0) {
    ballCurrentPosition = [grid.offsetWidth / 2 - ball.offsetWidth / 2, 70];
    let resetPaddle = [grid.offsetWidth / 2 - paddleSizeAndPos.width / 2, 50];
    movingBall = false;
    drawBall();
    console.log(resetPaddle);
  }

  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;

  drawBall();
}

function alienChangeDirection(ball, alien) {
  switch (true) {
    //bottom right corner
    case ball.y + ball.height > alien.y + alien.height &&
      ball.x + ball.width >= alien.x + alien.width:
      yDirection = -yDirection;
      break;

    //top right corner
    case ball.y < alien.y && ball.x + ball.width >= alien.x + alien.width:
      yDirection = -yDirection;
      break;

    //bottom left corner
    case ball.y + ball.height > alien.y + alien.height && ball.x < alien.x:
      yDirection = -yDirection;
      break;

    //top left corner
    case ball.y < alien.y && ball.x < alien.x:
      yDirection = -yDirection;
      break;

    // //bottom of the alien
    case ball.y + ball.height > alien.y + alien.height:
      yDirection = -yDirection;
      break;

    //top of alien
    case ball.y < alien.y:
      yDirection = -yDirection;
      break;
    // left-side of the alien
    case ball.x < alien.x:
      xDirection = -xDirection;
      break;
    case ball.x + ball.width >= alien.x + alien.width:
      xDirection = -xDirection;
      break;
  }
}

function brickChangeDirection(ball, brick) {
  switch (true) {
    //bottom right corner
    case ball.y + ball.height > brick.y + brick.height &&
      ball.x + ball.width >= brick.x + brick.width:
      yDirection = -yDirection;
      break;

    //top right corner
    case ball.y < brick.y && ball.x + ball.width >= brick.x + brick.width:
      yDirection = -yDirection;
      break;

    //bottom left corner
    case ball.y + ball.height > brick.y + brick.height && ball.x < brick.x:
      yDirection = -yDirection;
      break;

    //top left corner
    case ball.y < brick.y && ball.x < brick.x:
      yDirection = -yDirection;
      break;

    // //bottom of the brick
    case ball.y + ball.height > brick.y + brick.height:
      yDirection = -yDirection;
      break;

    //top of brick
    case ball.y < brick.y:
      yDirection = -yDirection;
      break;

    // left-side of the brick
    case ball.x < brick.x:
      xDirection = -xDirection;
      break;

    // right-side of the brick
    case ball.x + ball.width >= brick.x + brick.width:
      xDirection = -xDirection;
      break;
  }
}

function ballChangeDirection(b, p) {
  let pws = p.width / 4;
  switch (true) {
    //if the ball hits the first quarter of the paddle
    case b.x >= p.x && b.x <= p.x + pws && b.y <= p.y:
      xDirection = -ballSpeed;
      yDirection = ballSpeed;
      break;

    //if the ball hits the second quarter of the paddle
    case b.x > p.x + pws && b.x <= p.x + 2 * pws:
      xDirection = -Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed;
      break;

    //if the ball hits the third quarter of the paddle
    case b.x > p.x + 2 * pws && b.x <= p.x + 3 * pws:
      xDirection = Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed;
      break;

    //if the ball hits the fourth quarter of the paddle
    case b.x > p.x + 3 * pws && b.x <= p.x + p.width && b.y <= p.y:
      xDirection = ballSpeed;
      yDirection = ballSpeed;
      break;

    //if the ball hits the left edge quarter of the paddle
    case b.x + b.width > p.x &&
      b.x <= p.x + pws &&
      b.y > p.y &&
      b.y <= p.y + p.height:
      xDirection = -ballSpeed - Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed - Math.ceil(ballSpeed / 2);
      break;

    //if the ball hits the right edge quarter of the paddle
    case b.x > p.x + 3 * pws &&
      b.x <= p.x + 4 * pws &&
      b.y > p.y &&
      b.y < p.y + p.height:
      xDirection = ballSpeed + Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed - Math.ceil(ballSpeed / 2);
      break;
  }
}
