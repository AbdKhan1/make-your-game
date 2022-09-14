import { gameViewSettings, paddleSettings } from "./globalsettings.js"
import { startBallMovement, rightPressed, leftPressed } from "./input.js";
import { moveBall } from "./ball.js";

const gameView = document.querySelector('.gameView')
let paddle = document.createElement('div')
let paddleCurrentPos = [(gameViewSettings.gameViewWidth / 2 - paddleSettings.width / 2), 50]

function createPaddle() {

    paddle.classList.add('paddle')
    paddle.style.width = paddleSettings.width + 'px'
    paddle.style.height = paddleSettings.height + 'px'
    paddle.style.backgroundColor = paddleSettings.color
    paddle.style.position = 'absolute'

    paddle.style.left = paddleCurrentPos[0] + 'px'
    paddle.style.bottom = paddleCurrentPos[1] + 'px'
    gameView.appendChild(paddle)
}

createPaddle()

export function movePaddle() {
    paddle.style.left = paddleCurrentPos[0] + 'px'
    paddle.style.bottom = paddleCurrentPos[1] + 'px'
}

export function PaddleMovement() {

    if (!startBallMovement) {
        stickyPaddleMovement()
        return
    }

    if (leftPressed) {
        paddleCurrentPos[0] -= paddleSettings.velocity
    }

    if (rightPressed) {
        paddleCurrentPos[0] += paddleSettings.velocity
    }

    if (paddleCurrentPos[0] <= gameViewSettings.borderWidth) {
        paddleCurrentPos[0] = gameViewSettings.borderWidth
    }
    if (paddleCurrentPos[0] >= gameViewSettings.gameViewWidth - (paddleSettings.width) - (gameViewSettings.borderWidth)) {
        paddleCurrentPos[0] = gameViewSettings.gameViewWidth - (paddleSettings.width) - (gameViewSettings.borderWidth)
    }


    movePaddle()
}


function stickyPaddleMovement() {

    if (leftPressed && paddleCurrentPos[0] > gameViewSettings.borderWidth) {
        paddleCurrentPos[0] -= paddleSettings.velocity
        moveBall(0, -paddleSettings.velocity, 0)
    }

    if (rightPressed && (paddleCurrentPos[0] < gameViewSettings.gameViewWidth - (paddleSettings.width) - (gameViewSettings.borderWidth))) {
        paddleCurrentPos[0] += paddleSettings.velocity
        moveBall(0, paddleSettings.velocity, 0)
    }

    if (paddleCurrentPos[0] <= gameViewSettings.borderWidth) {
        paddleCurrentPos[0] = gameViewSettings.borderWidth

    }
    if (paddleCurrentPos[0] >= gameViewSettings.gameViewWidth - (paddleSettings.width) - (gameViewSettings.borderWidth)) {
        paddleCurrentPos[0] = gameViewSettings.gameViewWidth - (paddleSettings.width) - (gameViewSettings.borderWidth)
    }

    movePaddle()
}
