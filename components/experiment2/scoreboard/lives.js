import { livesSettings } from "../globalsettings.js"
import { changeValue } from "../input.js"

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

function updateLives() {
    let hearts = document.querySelectorAll('.heart')
    if (hearts.length != 1) {
        hearts[hearts.length - 1].remove()
    } else {
        hearts[hearts.length - 1].remove()
        gameOver = true
    }
}

export function lifeLost() {
    updateLives()
    let ball = document.querySelector('.ball')
    let paddle = document.querySelector('.paddle').getBoundingClientRect()
    ball.style.left = ((paddle.left + (paddle.width / 2)) - (ball.getBoundingClientRect().width / 2)) + "px"
    ball.style.bottom = 70 + "px"
    changeValue()
}
