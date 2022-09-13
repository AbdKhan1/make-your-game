import { gameViewSettings } from "./globalsettings.js"
import { startBallMovement, rightPressed, leftPressed } from "./input.js";
import { moveBall } from "./ball.js";
    
const gameView = document.querySelector('.gameView')
const paddle = document.createElement('div')


paddle.classList.add('paddle')
gameView.appendChild(paddle)

const gameWidth = gameView.offsetWidth
const paddleWidth = paddle.offsetWidth
const borderWidth = 10

export let paddleCurrentPos = [(gameWidth / 2 - paddleWidth / 2), 50]


export function movePaddle() {
    paddle.style.left = paddleCurrentPos[0] + 'px'
    paddle.style.bottom = paddleCurrentPos[1] + 'px'
}

movePaddle()

let velocityX = 7
console.log(startBallMovement)

export function PaddleMovement() {

    if (!startBallMovement) {
        stickyPaddleMovement()
        return
    }
    
    if (leftPressed) {        
        paddleCurrentPos[0] -= velocityX
    }

    if (rightPressed) {
        paddleCurrentPos[0] += velocityX
    }
        
    if (paddleCurrentPos[0] <= gameViewSettings.borderWidth) {
        paddleCurrentPos[0] = gameViewSettings.borderWidth
    }
    if (paddleCurrentPos[0] >= gameViewSettings.gameViewWidth - (paddleWidth) - (borderWidth)) {
        paddleCurrentPos[0] = gameViewSettings.gameViewWidth - (paddleWidth) - (borderWidth)
    }
        
    

    movePaddle()
}


function stickyPaddleMovement() {
    
    if (leftPressed && paddleCurrentPos[0] > gameViewSettings.borderWidth ) {
        paddleCurrentPos[0] -= velocityX
        moveBall(0, -1, 0, velocityX)        
    }

    if (rightPressed && (paddleCurrentPos[0]  < gameViewSettings.gameViewWidth - (paddleWidth) - (borderWidth)))  {
        paddleCurrentPos[0] += velocityX
        moveBall(0, 1, 0, velocityX)        
    }

    if (paddleCurrentPos[0] <= gameViewSettings.borderWidth) {
        paddleCurrentPos[0] = gameViewSettings.borderWidth        

    }
    if (paddleCurrentPos[0] >= gameViewSettings.gameViewWidth - (paddleWidth) - (borderWidth)) {
        paddleCurrentPos[0] = gameViewSettings.gameViewWidth - (paddleWidth) - (borderWidth)
    }
        
    movePaddle()
}
