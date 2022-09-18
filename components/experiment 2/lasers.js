import { gameViewSettings, laserSettings } from "./globalsettings.js"
import { levels } from "./levels.js";
import { checkCollision } from "./collision.js"

let gameView = document.querySelector(".gameView");

let laserPositions = []
let laser_cooldown = Math.floor(Math.random() * 100)
let laserCoords = [0, 0]

function moveLasers() {
    let laser = document.querySelectorAll('.laser')
    for (let i = 0; i < laser.length; i++) {
        laser[i].style.left = laserPositions[i][0] + 'px'
        laser[i].style.top = laserPositions[i][1] + 'px'
    }
}

function createLasers() {
    let aliens = document.querySelectorAll('.alien')
    let randomAlien = Math.floor(Math.random() * aliens.length)
    for (let i = 0; i < aliens.length; i++) {
        if (i === randomAlien) {
            const alien = aliens[i]
            const laser = document.createElement('img')
            laser.classList.add('laser')
            laser.src = laserSettings.image
            gameView.appendChild(laser)
            laser.style.position = 'absolute'
            laser.style.width = laserSettings.width + 'px'
            laser.style.height = laserSettings.height + 'px'
            laserCoords[0] = parseInt(alien.style.left) + (Number(alien.getBoundingClientRect().width / 2) - (laserSettings.width / 2))
            laserCoords[1] = Number(alien.getBoundingClientRect().top) + Number(alien.getBoundingClientRect().height)
            laserPositions.push([laserCoords[0], laserCoords[1]])
        }
    }
    console.log(laserPositions)
}

export function laserMovement(level) {
    let lasers = document.querySelectorAll('.laser')
    let paddle = document.querySelector('.paddle')

    for (let i = 0; i < lasers.length; i++) {
        let laserSizeAndPos = lasers[i].getBoundingClientRect()

        laserPositions[i][1] += levels[level].lasers.speed

        //remove lasers when they are at the bottom of game view
        if (laserPositions[i][1] >= gameViewSettings.gameViewHeight - laserSettings.height - gameViewSettings.borderWidth) {
            removeLaser(i)
        }

        //collision of lasers with paddle
        if (checkCollision(laserSizeAndPos, paddle.getBoundingClientRect())) {
            removeLaser(i)
            console.log('life lost')
        }
    }
    moveLasers()
    updateLasers(level)
}

//the frequency of lasers shot by invaders
export function updateLasers(level) {
    if (laser_cooldown === 0) {
        createLasers()
        moveLasers()
        laser_cooldown = Math.floor(Math.random() * 100)
        return
    }
    laser_cooldown -= levels[level].lasers.cooldown
}

function removeLaser(id) {
    let lasers = document.querySelectorAll('.laser')
    lasers[id].remove()
    laserPositions.splice(id, 1)
}