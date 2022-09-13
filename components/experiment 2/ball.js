import { ballSettings } from "./globalsettings.js"
import { checkBrickCollision, checkWallCollision } from "./collision.js";

let gameView = document.querySelector(".gameView");

let balls = [],
    ballsDirection = []



// initialize and setup the ball(s)
function initBall() {
    for (let i = 0; i < ballSettings.balls; i++) {
        console.log("creating ball")
        createBall(1, 1);
        console.log("ball created")
    }

    /* setTimeout(function () {
        createBall(-1,1);
    }, 0) */

}

initBall()


// this function creates a ball and adds it to the gameView
// takes in the x and y direction of the ball
function createBall(x, y) {
    let ball = document.createElement("div"),
        // set the ball position from the left and from the bottom.. in this case
        // in the middle and 70 pixels from the bottom
        ballStartPosition = [(gameView.offsetWidth / 2 - ballSettings.size / 2), 70];

    ball.classList.add("ball");
    ball.style.width = ballSettings.size + 'px'
    ball.style.height = ballSettings.size + 'px'
    ball.style.backgroundColor = ballSettings.color
    ball.style.left = ballStartPosition[0] + "px";
    ball.style.bottom = ballStartPosition[1] + "px";
    gameView.appendChild(ball);
    balls.push(ball)
    ballsDirection.push([x, y])
}


export function moveBall(id, xDirection, yDirection, customspeed) {
    let currentLeft = parseInt(balls[id].style.left),
        currentBottom = parseInt(balls[id].style.bottom),
        newLeft, newBottom,
        bspeed = customspeed || ballSettings.speed;

    (xDirection > 0) ? newLeft = currentLeft + bspeed : newLeft = currentLeft - bspeed;
    (yDirection > 0) ? newBottom = currentBottom + bspeed : newBottom = currentBottom - bspeed;

    if (xDirection == 0) { newLeft = currentLeft }
    if (yDirection == 0) { newBottom = currentBottom }


    balls[id].style.left = newLeft + "px";
    balls[id].style.bottom = newBottom + "px";

}



export function BallMovement() {

    // move all the balls
    for (let i = 0; i < balls.length; i++) {

        // leaving this for readability
        let xDirection = ballsDirection[i][0], yDirection = ballsDirection[i][1];

        let ballDOMRect = balls[i].getBoundingClientRect();

        // retrieving the new direction and updating the direction of the ball for the next frame
        ballsDirection[i] = bounce(ballDOMRect, xDirection, yDirection);

        moveBall(i, ballsDirection[i][0], ballsDirection[i][1])
    }


}

// Returns the new direction the ball should be bouncing
function bounce(ballDOMRect, x, y) {
    switch (checkWallCollision(ballDOMRect)) {
        case "left":
            return [-x, y];
        case "right":
            return [-x, y];
        case "top":
            return [x, -y];
        case "bottom":
            return [x, -y];
    }

    let xx = checkBrickCollision(ballDOMRect);
    console.log (xx)


    return [x, y];
}


// brick collision

// alien collision