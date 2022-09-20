import { livesSettings, ballSettings, paddleSettings } from "../globalsettings.js"
import { changeValue, startBallMovement } from "../input.js"

export let gameOver = false

const lives = document.querySelector('.lives')

export function createHearts() {
    for (let i = 0; i < livesSettings.defaultNoOfLives; i++) {
        let heart = document.createElement('img')
        heart.classList.add('heart')
        heart.src = livesSettings.image
        heart.style.width = livesSettings.width + 'px'
        heart.style.height = livesSettings.height + 'px'

        lives.appendChild(heart)
    }
}

createHearts()

//removes heart
function updateLives() {
    let hearts = document.querySelectorAll('.heart')
    if (hearts.length != 1) {
        hearts[hearts.length - 1].remove()
    } else {
        hearts[hearts.length - 1].remove()

        // reveal pop allowing user to enter score
        let entry = document.getElementById("myScoreEntry");
        entry.style.display = "block"
        // Get the <span> element that closes the pop up
        let span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            entry.style.display = "none";
        }

        gameOver = true
    }
}

//resets ball to the center of the paddle
export function lifeLost() {
    updateLives()
    let ball = document.querySelector('.ball')
    let paddle = document.querySelector('.paddle')
    ball.style.left = ((Number(paddle.style.left.replace("px", "")) + (paddleSettings.width / 2)) - (ballSettings.size / 2)) + "px"
    ball.style.bottom = 70 + "px"
    if (startBallMovement) {
        changeValue()
    }
}
