import { ballSettings } from "./globalsettings.js"
import { checkCollision, checkWallCollision } from "./collision.js";

let gameView = document.querySelector(".gameView");

let balls = [],
    ballsDirection = [],
    ballStartPosition


// initialize and setup the ball(s)
function initBall() {
    for (let i = 0; i < ballSettings.ballCount; i++) {
        console.log("creating ball")
        createBall(1,1);
        console.log("ball created")
    }

             
    /* setTimeout(function () {
        createBall(-1,1);
    }, 0) */

    
}

initBall()


// this function creates a ball and adds it to the gameView
// takes in the x and y direction of the ball
function createBall(x,y){
    let ball = document.createElement("div");
    // set the ball position from the left and from the bottom.. in this case
    // in the middle and 70 pixels from the bottom
    ballStartPosition = [(gameView.offsetWidth / 2 - ballSettings.ballSize / 2), 70];

    ball.classList.add("ball");
    ball.style.width = ballSettings.ballSize + 'px'
    ball.style.height = ballSettings.ballSize + 'px'
    ball.style.backgroundColor = ballSettings.ballColor
    ball.style.left = ballStartPosition[0] + "px";
    ball.style.bottom = ballStartPosition[1] + "px";
    gameView.appendChild(ball);
    balls.push(ball)
    ballsDirection.push([x,y])
}


function moveBall(id, xDirection, yDirection)  {    
    let currentLeft = parseInt(balls[id].style.left),
        currentBottom = parseInt(balls[id].style.bottom),
    newLeft, newBottom,
    bspeed = ballSettings.ballSpeed;

    (xDirection > 0) ? newLeft = currentLeft + bspeed : newLeft = currentLeft - bspeed;
    (yDirection > 0) ? newBottom = currentBottom + bspeed : newBottom = currentBottom - bspeed;


    balls[id].style.left = newLeft + "px";
    balls[id].style.bottom = newBottom + "px";
   
}



export function BallMovement() {    

    // move all the balls
    for (let i = 0; i < balls.length; i++) {
        
        let xDirection = ballsDirection[i][0], yDirection = ballsDirection[i][1];

        // check collisions
        let ballSizeAndPos = balls[i].getBoundingClientRect();
        // console.log(ballSizeAndPos.x, ballSizeAndPos.y)
        // if (!checkCollision(ballSizeAndPos, gameView.getBoundingClientRect())) alert()

        if (checkWallCollision(ballSizeAndPos) == "right") { 
            xDirection = -xDirection;
        }

       
        if (checkWallCollision(ballSizeAndPos) == "left") { 
            xDirection = -xDirection;
            
        }

         if (checkWallCollision(ballSizeAndPos) == "top") {
            yDirection = -yDirection;
        }
          
        if (ballSizeAndPos.y >= 880) {
            yDirection = -yDirection;
        }

        // updating the direction of the ball for the next frame
        ballsDirection[i][0] = xDirection;
        ballsDirection[i][1] = yDirection;

        moveBall(i, xDirection, yDirection)
    }
  
 
}

// Returns the new direction the ball should be bouncing
// so that the translate methode can be used
function bounce(x, y) {
    switch (true) {


    }
}


// //draw Ball
// export function moveBall(id) {

//     let ball = document.getElementsByClassName('ball')[id]
//     console.log(ball)
//     alert()
  
//     ball.style.left = ballMovePosition[0] + "px";
//     ball.style.bottom = ballMovePosition[1] + "px";
   
// }

// //move ball
// export function BallMovement() {



//     if (ballMovePosition[0] <= 0 || ballMovePosition[0] >= 600 - 35) {
//         xDirection = -xDirection;
//     }

//     if (ballMovePosition[1] >= window.innerHeight - 25) {
//         yDirection = -yDirection;
//     }

//     if (ballMovePosition[1] <= 0) {
//         ballMovePosition = [(gameView.offsetWidth / 2 - ball.offsetWidth / 2), 70]
//         xDirection = -ballSettings.ballSpeed;
//         yDirection = ballSettings.ballSpeed;
//         moveBall()
//         return

//     }

//     ballMovePosition[0] += xDirection;
//     ballMovePosition[1] += yDirection;

    

//     moveBall();
// }

