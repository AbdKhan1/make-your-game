import { ballSettings, invaderSettings, sounds } from "./globalsettings.js"
import { checkBrickCollision, checkWallCollision, checkPaddleCollision, checkAlienCollision, checkLaserCollision } from "./collision.js";
import { removeBrick } from "./bricks.js"
import { removeAlien } from "./invaders.js"
import { removeLaser } from "./lasers.js"
import { calculateScore } from "./scoreboard/score.js"
import { lifeLost } from "./scoreboard/lives.js"
import { changeStopValue, currentLevel } from "./script.js";
import { gameover } from "./input.js";
import { isTopScore } from "./scoreboard/leaderboard.js"


let gameView = document.querySelector(".gameView");

export let score = 0

let brickHits = 0

let balls = [],
    ballsDirection = []


// initialize and setup the ball(s)
function initBall() {
    for (let i = 0; i < ballSettings.balls; i++) {
        createBall(ballSettings.speed, ballSettings.speed);
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


export function moveBall(id, xDirection, yDirection) {
    let currentLeft = parseInt(balls[id].style.left),
        currentBottom = parseInt(balls[id].style.bottom),
        newLeft = currentLeft + xDirection,
        newBottom = currentBottom + yDirection

    balls[id].style.left = newLeft + "px";
    balls[id].style.bottom = newBottom + "px";

}


export function BallMovement() {

    // move all the balls
    for (let i = 0; i < balls.length; i++) {

        let xDirection = ballsDirection[i][0], yDirection = ballsDirection[i][1];

        let ballDOMRect = balls[i].getBoundingClientRect();

        // retrieving the new direction and updating the direction of the ball for the next frame
        ballsDirection[i] = bounce(ballDOMRect, xDirection, yDirection);

        nextLevelCheck()

        moveBall(i, ballsDirection[i][0], ballsDirection[i][1]);
    }


}



// Returns the new direction the ball should be bouncing
function bounce(ballDOMRect, x, y) {

    laserBounce(ballDOMRect)

    if (checkPaddleCollision(ballDOMRect)) {
        sounds.bouncePaddle.play()
        console.log("paddle collision")
        // reset
        brickHits = 0

        // check if the ball is hitting the paddle in different areas
        // and return the new direction accordingly

        let newDirection = calculatePaddleBounce(ballDOMRect)
        return newDirection || [x, y]   // catching any undefined values before returning

    }

    switch (checkWallCollision(ballDOMRect)) {
        case "left":
            sounds.bounceWallLeft.play()
            return [-x, y];
        case "right":
            sounds.bounceWallRight.play()
            return [-x, y];
        case "top":
            console.log("top")
            sounds.bounceWallLTop.play()
            return [x, -y];
        case "bottom":
            sounds.loseLife.play()
            //reset ball to be stcky on the paddle the ball 
            lifeLost()
            return [ballSettings.speed, ballSettings.speed];
    }


    let brickID = checkBrickCollision(ballDOMRect);
    if (typeof brickID !== 'undefined') {
        sounds.bounceBrick.play()
        brickHits++
        score = calculateScore(score, brickHits, "brick")

        // alert("brick collision " + brickID)        
        return (calculateBrickBounce(ballDOMRect, brickID, x, y))
    }

    let alienID = checkAlienCollision(ballDOMRect);
    if (typeof alienID !== 'undefined') {
        return alienBounce(alienID, x, y)
    }

    // no collision
    return [x, y];
}


function alienBounce(alienID, x, y) {
    let aliens = document.querySelectorAll('.alien')
    // if there is a collision from the alien    
    // remove alien if the ball moving upwards
    if (y > 0) {
        removeAlien(alienID)
        score = calculateScore(score, brickHits, "alien")
    } else {
        sounds.alienShieldBounce.play()
        //change colour of alien
        // hueChange(alienID)
    }

    return ([x, -y])

}

let hueRotation = invaderSettings.hueRotationValue
function hueChange(alienID) {

    let aliens = document.querySelectorAll('.alien')
    aliens[alienID].style.filter = 'hue-rotate(' + hueRotation + 'deg)'
    if (hueRotation >= 360) {
        hueRotation = 0
    } else {
        hueRotation += 60
    }
}

function laserBounce(ballDOMRect) {
    let laserID = checkLaserCollision(ballDOMRect);
    if (typeof laserID !== 'undefined') {
        sounds.bounceLaser.play()
        score = calculateScore(score, brickHits, "laser")
        removeLaser(laserID)
    }
}

function calculatePaddleBounce(ball) {
    let paddle = document.querySelector(".paddle").getBoundingClientRect(),
        paddleWidthSplit = paddle.width / 4,
        bspeed = ballSettings.speed

    switch (true) {
        //if the ball hits the first quarter of the paddle
        case ((ball.x >= paddle.x && ball.x <= paddle.x + paddleWidthSplit) && ball.y <= paddle.y):
            return [-bspeed, bspeed]

        //if the ball hits the second quarter of the paddle
        case (ball.x > (paddle.x + paddleWidthSplit) && ball.x <= (paddle.x + (2 * paddleWidthSplit))):
            return [-Math.ceil(bspeed / 2), bspeed]

        //if the ball hits the third quarter of the paddle
        case (ball.x > (paddle.x + (2 * paddleWidthSplit)) && ball.x <= (paddle.x + (3 * paddleWidthSplit))):
            return [Math.ceil(bspeed / 2), bspeed]

        //if the ball hits the fourth quarter of the paddle
        case ((ball.x > (paddle.x + (3 * paddleWidthSplit))) && (ball.x <= paddle.x + paddle.width) && ball.y <= paddle.y):
            return [bspeed, bspeed]

        //if the ball hits the top left corner of the paddle
        case ball.y < paddle.y && ball.x < paddle.x:
            return [-bspeed, bspeed];

        // if the ball hits the top right corner of the paddle
        case ball.y < paddle.y && ball.x + ball.width >= paddle.x + paddle.width:
            return [bspeed, bspeed]

        //if the ball hits the left edge quarter of the paddle
        case ball.x < paddle.x:
            return [(-bspeed - Math.ceil(bspeed / 2)), (bspeed - Math.ceil(bspeed / 2))];

        // if the ball hits the bottom right of the paddle
        case ball.y + ball.height > paddle.y + paddle.height && ball.x + ball.width >= paddle.x + paddle.width:
            return [bspeed, -bspeed]

        //if the ball hits the bottom left
        case ball.y + ball.height > paddle.y + paddle.height && ball.x < paddle.x:
            return [bspeed, -bspeed]

        //bottom of the paddle
        case ball.y + ball.height > paddle.y + paddle.height:
            return [bspeed, -bspeed]

        //if the ball hits the right edge quarter of the paddle
        case ((ball.x > paddle.x + (3 * paddleWidthSplit) && ball.x <= paddle.x + (4 * paddleWidthSplit)) && (ball.y > paddle.y && ball.y < paddle.y + paddle.height)):
            return [bspeed + Math.ceil(bspeed / 2), bspeed - Math.ceil(bspeed / 2)]

    }

}

function calculateBrickBounce(ball, brickID, xDirection, yDirection) {
    let bricks = document.querySelectorAll(".brick"),
        brick = bricks[brickID].getBoundingClientRect()



    switch (true) {
        //bottom right corner
        case ball.y + ball.height > brick.y + brick.height && ball.x + ball.width >= brick.x + brick.width:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        //top right corner
        case ball.y < brick.y && ball.x + ball.width >= brick.x + brick.width:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        //bottom left corner
        case ball.y + ball.height > brick.y + brick.height && ball.x < brick.x:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        //top left corner
        case ball.y < brick.y && ball.x < brick.x:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        // //bottom of the brick
        case ball.y + ball.height > brick.y + brick.height:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        //top of brick
        case ball.y < brick.y:
            removeBrick(brickID)
            return [xDirection, -yDirection]

        // left-side of the brick
        case ball.x < brick.x:
            removeBrick(brickID)
            return [-xDirection, yDirection]

        // right-side of the brick
        case ball.x + ball.width > brick.x + brick.width:
            removeBrick(brickID)
            return [-xDirection, yDirection]
    }
}

function nextLevelCheck() {
    let bricks = document.querySelectorAll('.brick')
    let aliens = document.querySelectorAll('.alien')

    if (bricks.length === 0 && aliens.length === 0) {
        changeStopValue()
        let nextLevelPopUp = document.querySelector('.nextLevel')
        nextLevelPopUp.style.display = 'block'
        let newCurrentLevel = currentLevel
        let newLevel = Number(newCurrentLevel) + 1
        isTopScore(score, currentLevel, 5).then((result) => {
            if (result) {
                // if it is, allow the user to enter their name
                let input = document.querySelector(".new-hiscore-completed");
                input.style.display = "block"
            }
        })
        document.querySelector('#yes').addEventListener("click", (e) => {
            nextLevelPopUp.style.display = 'none'
            document.querySelector('.nextLevelLink').href = "http://localhost:5500/components/experiment2/?lvl=" + newLevel
        })
    }

    document.querySelector('#no').addEventListener("click", (e) => {
        nextLevelPopUp.style.display = 'none'
        gameover()
    })
}

export function resetBallDirection(){
    ballsDirection[0]=[ballSettings.speed, ballSettings.speed]
}