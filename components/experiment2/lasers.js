import { laserSettings, gameViewSettings } from "./globalsettings.js"
import { checkLaserCollision } from "./collision.js";
import { currentLevel } from "./script.js";
import { levels } from "./levels.js"
import { sounds } from "./globalsettings.js"
import { lifeLost } from "./scoreboard/lives.js";

let gameView = document.querySelector(".gameView");

let laserStartingPosition = [],
    laserPositions = [],
    laser_cooldown = Math.floor(Math.random() * 100)

function createLasers() {
    let aliens = document.querySelectorAll('.alien')
    let random = Math.floor(Math.random() * aliens.length)
    for (let i = 0; i < aliens.length; i++) {
        if (i === random) {
            let alien = aliens[i]
            const laser = document.createElement('img')
            laser.classList.add('laser')
            laser.src = laserSettings.image
            gameView.appendChild(laser)
            laser.style.width = laserSettings.width + 'px'
            laser.style.height = laserSettings.height + 'px'
            laser.style.position = 'absolute'
            laserStartingPosition[0] = parseInt(alien.style.left) + (alien.getBoundingClientRect().width / 2)
                - (laserSettings.width / 2)
            laserStartingPosition[1] = alien.getBoundingClientRect().top + alien.getBoundingClientRect().height
            laserPositions.push([laserStartingPosition[0], laserStartingPosition[1]])
            sounds.alienShoot.play()
        }
    }
}

function moveLasers() {
    let laser = document.querySelectorAll('.laser')
    for (let i = 0; i < laser.length; i++) {
        laser[i].style.left = laserPositions[i][0] + 'px'
        laser[i].style.top = laserPositions[i][1] + 'px'
    }
}

export function laserMovement() {
    //remove lasers when they are at the bottom of game view
    let laserArr = document.querySelectorAll('.laser')
    for (let i = 0; i < laserPositions.length; i++) {
        laserPositions[i][1] += levels[currentLevel].lasers.speed
        if (laserPositions[i][1] >= gameViewSettings.gameViewHeight - (laserSettings.height - gameViewSettings.borderWidth)) {
            laserArr[i].remove()
            laserPositions.splice(i, 1)
        }
    }
    //collision of lasers
    let paddleSizeAndPos = document.querySelector('.paddle').getBoundingClientRect()
    let laserID = checkLaserCollision(paddleSizeAndPos);
    if (typeof laserID !== 'undefined') {
        sounds.alienpaddleHit.play()
        removeLaser(laserID)
        //reset ball to be sticky on the paddle the ball 
        lifeLost()
    }
    moveLasers()
    updateLasers()
}


//the frequency of lasers shot by invaders
function updateLasers() {
    if (laser_cooldown === 0) {
        createLasers()
        moveLasers()
        laser_cooldown = Math.floor(Math.random() * 100)
        return
    }
    laser_cooldown -= levels[currentLevel].lasers.cooldown
}

export function removeLaser(id) {
    let lasers = document.querySelectorAll(".laser")
    lasers[id].remove()
    laserPositions.splice(id, 1)
}