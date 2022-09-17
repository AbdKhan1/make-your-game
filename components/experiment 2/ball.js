import { ballSettings } from "./globalsettings.js"
import { checkBrickCollision, checkWallCollision, checkPaddleCollision, checkAlienCollision } from "./collision.js";
import { removeBrick } from "./bricks.js"
import { removeAlien } from "./invaders.js"

let gameView = document.querySelector(".gameView");

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


        moveBall(i, ballsDirection[i][0], ballsDirection[i][1]);
    }


}

// Returns the new direction the ball should be bouncing
function bounce(ballDOMRect, x, y) {

    if (checkPaddleCollision(ballDOMRect)) {
        console.log("paddle collision")

        // check if the ball is hitting the paddle in different areas
        // and return the new direction accordingly

        let newDirection = calculatePaddleBounce(ballDOMRect)
        return newDirection || [x, y]   // catching any undefined values before returning

        // y = -y;
        // return [x, y]
    }

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


    let brickID = checkBrickCollision(ballDOMRect);
    if (typeof brickID !== 'undefined') {
        // alert("brick collision " + brickID)        
        return (calculateBrickBounce(ballDOMRect, brickID, x, y))
    }

    let alienID = checkAlienCollision(ballDOMRect);
    if (typeof alienID !== 'undefined') {
        //alert("alien collision " + alienID)        
        return (calculateAlienBounce(ballDOMRect, alienID, x, y))
    }

    // no collision
    return [x, y];
}

function calculatePaddleBounce(b) {
    let p = document.querySelector(".paddle").getBoundingClientRect(),
        pws = p.width / 4,
        bspeed = ballSettings.speed

    switch (true) {
        //if the ball hits the first quarter of the paddle
        case ((b.x >= p.x && b.x <= p.x + pws) && b.y <= p.y):
            return [-bspeed, bspeed]

        //if the ball hits the second quarter of the paddle
        case (b.x > (p.x + pws) && b.x <= (p.x + (2 * pws))):
            return [-Math.ceil(bspeed / 2), bspeed]

        //if the ball hits the third quarter of the paddle
        case (b.x > (p.x + (2 * pws)) && b.x <= (p.x + (3 * pws))):
            return [Math.ceil(bspeed / 2), bspeed]

        //if the ball hits the fourth quarter of the paddle
        case ((b.x > (p.x + (3 * pws))) && (b.x <= p.x + p.width) && b.y <= p.y):
            return [bspeed, bspeed]

        //if the ball hits the top left corner of the paddle
        case b.y < p.y && b.x < p.x:
            return [-bspeed, bspeed];

        // if the ball hits the top right corner of the paddle
        case b.y < p.y && b.x + b.width >= p.x + p.width:
            return [bspeed, bspeed]


        //if the ball hits the left edge quarter of the paddle
        case b.x < p.x:
            return [(-bspeed - Math.ceil(bspeed / 2)), (bspeed - Math.ceil(bspeed / 2))];

        // if the ball hits the bottom right of the paddle
        case b.y + b.height > p.y + p.height && b.x + b.width >= p.x + p.width:
            return [bspeed, -bspeed]

        //if the ball hits the bottom left
        case b.y + b.height > p.y + p.height && b.x < p.x:
            return [bspeed, -bspeed]


        //bottom of the paddle
        case b.y + b.height > p.y + p.height:
            return [bspeed, -bspeed]


        //if the ball hits the right edge quarter of the paddle
        case ((b.x > p.x + (3 * pws) && b.x <= p.x + (4 * pws)) && (b.y > p.y && b.y < p.y + p.height)):
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

// alien collision
function calculateAlienBounce(ball, alienID, xDirection, yDirection) {
    console.log('alien ID', alienID)
    let aliens = document.querySelectorAll(".alien"),
        alien = aliens[alienID].getBoundingClientRect()



    switch (true) {
        //bottom right corner
        case ball.y + ball.height > alien.y + alien.height && ball.x + ball.width >= alien.x + alien.width:
            removeAlien(alienID)
            return [xDirection, -yDirection]


        //top right corner
        case ball.y < alien.y && ball.x + ball.width >= alien.x + alien.width:
            return [xDirection, -yDirection]

        //bottom left corner
        case ball.y + ball.height > alien.y + alien.height && ball.x < alien.x:
            removeAlien(alienID)
            return [xDirection, -yDirection]

        //top left corner
        case ball.y < alien.y && ball.x < alien.x:
            return [xDirection, -yDirection]

        // //bottom of the alien
        case ball.y + ball.height > alien.y + alien.height:
            removeAlien(alienID)
            
            return [xDirection, -yDirection]

        //top of alien
        case ball.y < alien.y:
            return [xDirection, -yDirection]

        // left-side of the alien
        case ball.x < alien.x:
            removeAlien(alienID)
            return [-xDirection, yDirection]

        // right-side of the alien
        case ball.x + ball.width > alien.x + alien.width:
            removeAlien(alienID)
            return [-xDirection, yDirection]
    }
}