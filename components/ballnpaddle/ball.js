import { checkCollision } from "./collision.js";

const ballStart = [300, 70];
let ballCurrentPosition = ballStart;

let ballSpeed = 6;

let xDirection = -ballSpeed; //45
let yDirection = ballSpeed;

const grid = document.querySelector(".grid");
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

// setup ball
export function initBall() { }

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
        changeDirection();
    }

    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= 600 - 15) {
        xDirection = -xDirection;
    }
    if (
        ballCurrentPosition[1] <= 0 ||
        ballCurrentPosition[1] >= window.innerHeight - 15
    ) {
        yDirection = -yDirection;
    }
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    // console.log(ballCurrentPosition)
    drawBall();
    // checkForCollisions()
}
// timerId = setInterval(moveBall, 30)

// for (let i=0;i<1000;i++){

//     moveBall()
// }

function changeDirection() {
    switch (true) {
        case xDirection > 0 && yDirection > 0:
            console.log("case1")
            yDirection = -ballSpeed;

            

        case xDirection > 0 && yDirection < 0:
            console.log("case2")
            xDirection = -ballSpeed;
            


        case xDirection < 0 && yDirection > 0:
            console.log("case3")
            xDirection = ballSpeed;
            

        case xDirection < 0 && yDirection < 0:
            console.log("case4")
            yDirection = ballSpeed;
            
    }
}
