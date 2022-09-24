import { checkCollision } from "./collision.js";
const grid = document.querySelector(".grid");
let ballSpeed = 5;

let xDirection = -ballSpeed;
let yDirection = ballSpeed;

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
const ballStart = [grid.offsetWidth / 2 - ball.offsetWidth / 2, 70];
let ballCurrentPosition = ballStart;
drawBall();

//draw Ball
function drawBall() {
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
    changeDirection(ballSizeAndPos, paddleSizeAndPos);
  }

  if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= 600 - 35) {
    xDirection = -xDirection;
  }
  //when cleaning the code, removing the 'ballCurrentPosition[1] <= 0', as the ball
  //would be below the grid and therefore off screen.
  if (
    ballCurrentPosition[1] <= 0 ||
    ballCurrentPosition[1] >= window.innerHeight - 25
  ) {
    yDirection = -yDirection;
  }
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
}

function changeDirection(b, p) {
  let pws = p.width / 4;
  switch (true) {
    //if the ball hits the first quarter of the paddle
    case b.x >= p.x && b.x <= p.x + pws && b.y <= p.y:
      console.log("case1");
      xDirection = -ballSpeed;
      yDirection = ballSpeed;
      break;

    //if the ball hits the second quarter of the paddle
    case b.x > p.x + pws && b.x <= p.x + 2 * pws:
      console.log("case2");
      xDirection = -Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed;
      break;

    //if the ball hits the third quarter of the paddle
    case b.x > p.x + 2 * pws && b.x <= p.x + 3 * pws:
      console.log("case3");
      xDirection = Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed;
      break;

    //if the ball hits the fourth quarter of the paddle
    case b.x > p.x + 3 * pws && b.x <= p.x + p.width && b.y <= p.y:
      console.log("case4");
      xDirection = ballSpeed;
      yDirection = ballSpeed;
      break;

    //if the ball hits the left edge quarter of the paddle
    case b.x + b.width > p.x &&
      b.x <= p.x + pws &&
      b.y > p.y &&
      b.y <= p.y + p.height:
      console.log("case5");
      xDirection = -ballSpeed - Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed - Math.ceil(ballSpeed / 2);
      break;

    //if the ball hits the right edge quarter of the paddle
    case b.x > p.x + 3 * pws &&
      b.x <= p.x + 4 * pws &&
      b.y > p.y &&
      b.y < p.y + p.height:
      console.log("case6");
      xDirection = ballSpeed + Math.ceil(ballSpeed / 2);
      yDirection = ballSpeed + Math.ceil(ballSpeed / 2);
      break;
  }
}
