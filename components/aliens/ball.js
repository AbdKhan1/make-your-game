import { checkCollision } from "./collision.js";
const grid = document.querySelector(".grid");


let ballSpeed = 4;

let xDirection = ballSpeed;
let yDirection = ballSpeed;

const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
const ballStart = [(grid.offsetWidth / 2 - ball.offsetWidth / 2), 70];
console.log(ballStart)

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
    let paddleSizeAndPos = document.querySelector(".paddle").getBoundingClientRect();

    if (checkCollision(ballSizeAndPos, paddleSizeAndPos)) {
        ballChangeDirection(ballSizeAndPos, paddleSizeAndPos);
    }

    let brickArr = document.getElementsByClassName("brick");
    let brickCollision = false
    let bricknum = 0

    for (let i = 0; i < brickArr.length; i++) {
        let brickSizeandPos = brickArr[i].getBoundingClientRect()
        if (checkCollision(ballSizeAndPos, brickSizeandPos)) {
            brickCollision = true
            bricknum = i
            break
        }
    }

    if (brickCollision) {
        brickArr[bricknum].style.backgroundColor = "white"
       brickChangeDirection(ballSizeAndPos, brickArr[bricknum].getBoundingClientRect())
        // the sweet time seems to be 10ms
        // otherwise bricks sometimes dont get removed and sometimes too many 
        // get removed
        setTimeout(function () {
            brickArr[bricknum].remove()
        }, 10)
    }
    let alienArr = document.getElementsByClassName("alien");
    let alienCollision = false
    let alienNum = 0

    for (let i = 0; i < alienArr.length; i++) {
        let alienSizeAndPos = alienArr[i].getBoundingClientRect()
        if (checkCollision(ballSizeAndPos, alienSizeAndPos)) {
            alienCollision = true
            alienNum = i
            break
        }
    }

    // if (alienCollision) {
    //     //alienArr[alienNum].style.color = "red"
    //    alienChangeDirection(ballSizeAndPos, alienArr[alienNum].getBoundingClientRect())
    //     setTimeout(function () {
    //         alienArr[alienNum].remove()
    //     }, 10)
    // }

    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= 600 - 35) {
        xDirection = -xDirection;
    }

    if (ballCurrentPosition[1] >= window.innerHeight - 25) {
        yDirection = -yDirection;
    }

    if (ballCurrentPosition[1] <= 0) {
        ballCurrentPosition = [(grid.offsetWidth / 2 - ball.offsetWidth / 2),70]
        xDirection = -ballSpeed;
        yDirection = ballSpeed;
        drawBall()
        return

    }

    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;

    drawBall();
}

function alienChangeDirection(ball, alien) {
    switch (true) {
        //bottom right corner
        case ball.y + ball.height > alien.y + alien.height && ball.x + ball.width >= alien.x + alien.width:
            console.log('alien case 1')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //top right corner
        case ball.y < alien.y && ball.x + ball.width >= alien.x + alien.width:
            console.log('alien case 2')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //bottom left corner
        case ball.y + ball.height > alien.y + alien.height && ball.x < alien.x:
            console.log('alien case 3')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //top left corner
        case ball.y < alien.y && ball.x < alien.x:
            console.log('alien case 4')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        // //bottom of the alien
        case ball.y + ball.height > alien.y + alien.height:
            console.log('alien case 5')
            yDirection = -yDirection
            break

        //top of alien
        case ball.y < alien.y:
            console.log('alien case 6')
            yDirection = -yDirection
            break
        // left-side of the alien
        case ball.x < alien.x:
            console.log('alien case 7')
            xDirection = -xDirection
            break
        // right-side of the alien
        case ball.x + ball.width >= alien.x + alien.width:
            console.log('alien case 8')
            xDirection = -xDirection
            break
    }
}

function brickChangeDirection(ball, brick) {
    switch (true) {
        //bottom right corner
        case ball.y + ball.height > brick.y + brick.height && ball.x + ball.width >= brick.x + brick.width:
            console.log('brick case 1')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //top right corner
        case ball.y < brick.y && ball.x + ball.width >= brick.x + brick.width:
            console.log('brick case 2')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //bottom left corner
        case ball.y + ball.height > brick.y + brick.height && ball.x < brick.x:
            console.log('brick case 3')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        //top left corner
        case ball.y < brick.y && ball.x < brick.x:
            console.log('brick case 4')
            // xDirection=-xDirection
            yDirection = -yDirection
            break

        // //bottom of the brick
        case ball.y + ball.height > brick.y + brick.height:
            console.log('brick case 5')
            yDirection = -yDirection
            break

        //top of brick
        case ball.y < brick.y:
            console.log('brick case 6')
            yDirection = -yDirection
            break
        // left-side of the brick
        case ball.x < brick.x:
            console.log('brick case 7')
            xDirection = -xDirection
            break
        // right-side of the brick
        case ball.x + ball.width >= brick.x + brick.width:
            console.log('brick case 8')
            // console.log('brick',brick)
            xDirection = -xDirection
            break
    }
}


function ballChangeDirection(b, p) {
    let pws = p.width / 4
    switch (true) {
        //if the ball hits the first quarter of the paddle
        case ((b.x >= p.x && b.x <= p.x + pws) && b.y <= p.y):
            // console.log("case1")
            xDirection = -ballSpeed;
            yDirection = ballSpeed;
            break

        //if the ball hits the second quarter of the paddle
        case (b.x > (p.x + pws) && b.x <= (p.x + (2 * pws))):
            // console.log("case2")
            xDirection = -Math.ceil(ballSpeed / 2);
            yDirection = ballSpeed;
            break

        //if the ball hits the third quarter of the paddle
        case (b.x > (p.x + (2 * pws)) && b.x <= (p.x + (3 * pws))):
            // console.log("case3")
            xDirection = Math.ceil(ballSpeed / 2);
            yDirection = ballSpeed;
            break

        //if the ball hits the fourth quarter of the paddle
        case ((b.x > (p.x + (3 * pws))) && (b.x <= p.x + p.width) && b.y <= p.y):
            // console.log("case4")
            xDirection = ballSpeed
            yDirection = ballSpeed;
            break

        //if the ball hits the left edge quarter of the paddle
        case (((b.x + b.width > p.x && b.x <= p.x + pws)) && (b.y > p.y && b.y <= p.y + p.height)):
            // console.log("case5")
            xDirection = -ballSpeed - Math.ceil(ballSpeed / 2);
            yDirection = ballSpeed - Math.ceil(ballSpeed / 2);
            break

        //if the ball hits the right edge quarter of the paddle
        case ((b.x > p.x + (3 * pws) && b.x <= p.x + (4 * pws)) && (b.y > p.y && b.y < p.y + p.height)):
            // console.log("case6")
            xDirection = ballSpeed + Math.ceil(ballSpeed / 2);
            yDirection = ballSpeed - Math.ceil(ballSpeed / 2);
            break
    }

}
