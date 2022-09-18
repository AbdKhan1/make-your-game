import { gameViewSettings, laserSettings } from "./globalsettings.js"
import { checkCollision } from "./collision.js"
import {levels,currentLevel} from "./levels.js"

let gameView = document.querySelector(".gameView");

let laserPositions = [],
    laser_cooldown = Math.floor(Math.random() * 100),
    laserStartingPosition = []

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
            //the laser starting x position will be center of the chosen alien
            laserStartingPosition[0] = parseInt(alien.style.left) + (alien.getBoundingClientRect().width / 2)
                - (laserSettings.width / 2)
            //the lasers starting y coordinate will be below the chosen alien
            laserStartingPosition[1] = alien.getBoundingClientRect().top + alien.getBoundingClientRect().height
            laserPositions.push([laserStartingPosition[0], laserStartingPosition[1]])
        }
    }
}

export function laserMovement() {
    let lasers = document.querySelectorAll('.laser')
    let paddle = document.querySelector('.paddle')

    for (let i = 0; i < lasers.length; i++) {
        let laserSizeAndPos = lasers[i].getBoundingClientRect()

        laserPositions[i][1] += levels[currentLevel].lasers.speed

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
    updateLasers()
}

//the frequency of lasers shot by invaders
export function updateLasers() {
    if (laser_cooldown === 0) {
        createLasers()
        moveLasers()
        laser_cooldown = Math.floor(Math.random() * 100)
        return
    }
    laser_cooldown -= levels[currentLevel].lasers.cooldown
}

function removeLaser(id) {
    let lasers = document.querySelectorAll('.laser')
    lasers[id].remove()
    laserPositions.splice(id, 1)
}