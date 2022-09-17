import { levels, currentLevel } from "./levels.js";
import { invaderSettings } from "./globalsettings.js"
import { startBallMovement } from "./input.js";

let gameView = document.querySelector(".gameView");
let alienPositions = []

//this is the speed at which the aliens move.
let velocity = levels[currentLevel].aliens.velocity


export function createAliens(level) {

    // The starting Y coordinate for the aliens
    // Gap 
    // BrickHeight + the small padding multiplied by Rows    
    // Gap 
    let aliensStartingY =
        levels[level].bricks.gapFromTop
        + (levels[level].bricks.numberOfRows * (levels[level].bricks.brickHeight + levels[level].bricks.padding)
            + levels[level].aliens.gapFromTop)


    // Space each alien evenly
    //GameView width
    //numberofAliens * alienWidth
    //numberOfAliens
    let spaceBetweenAliens = (gameView.offsetWidth -
        (levels[level].aliens.numberOfAliens * invaderSettings.width))
        / levels[level].aliens.numberOfAliens

    // The starting X coordinate for the aliens
    // Gameview Width - SpaceBetweenAliens
    // divided by two
    let aliensStartingX = spaceBetweenAliens / 2


    let alienStartingPosition = [aliensStartingX, aliensStartingY]

    for (let r = 1; r <= levels[level].aliens.numberOfRows; r++) {
        for (let a = 1; a <= levels[level].aliens.numberOfAliens; a++) {
            const alien = document.createElement('img')
            alien.classList.add('alien')
            alien.src = invaderSettings.image
            gameView.appendChild(alien)
            alien.style.position = 'absolute'
            alien.style.width = invaderSettings.width + 'px'
            alien.style.height = invaderSettings.height + 'px'
            alien.style.left = alienStartingPosition[0] + 'px'
            alien.style.top = alienStartingPosition[1] + 'px'
            alienPositions.push([alienStartingPosition[0], alienStartingPosition[1]])
            alienStartingPosition[0] += invaderSettings.width + spaceBetweenAliens
        }
        alienStartingPosition[0] = aliensStartingX
        alienStartingPosition[1] += invaderSettings.width + 10
    }
}

function moveAlien() {
    // just going to update the dom
    let invaders = document.querySelectorAll('.alien')
    for (let i = 0; i < invaders.length; i++) {
        invaders[i].style.left = alienPositions[i][0] + 'px'
        invaders[i].style.top = alienPositions[i][1] + 'px'
    }
}

export function alienMovement(level) {
    let invaders = document.querySelectorAll('.alien')
    if (invaders.length === 0) {
        return
    }

    let aliencloseToBorder = closestToEdges()

    //when the aliens collide with the wall, add the appropriate number to their y-coordinates, making them move down
    //10 is the width of the border
    if (parseInt(aliencloseToBorder[1].style.left) <= 10 || parseInt(aliencloseToBorder[0].style.left) >= (gameView.offsetWidth - invaderSettings.width - 10)) {
        if (startBallMovement) {
            for (let i = 0; i < invaders.length; i++) {
                alienPositions[i][1] += levels[level].aliens.drop
            }
        }
        velocity = -velocity
    }

    // to check when aliens move below the paddle
    for (let i = 0; i < invaders.length; i++) {
        //50 pixels from the bottom is the position of the paddle
        if (alienPositions[i][1] >= (gameView.offsetHeight - 50 - invaderSettings.height)) {
            //gameover
            alienPositions[i][1] =
                levels[level].bricks.gapFromTop
                + (levels[level].bricks.numberOfRows * (levels[level].bricks.brickHeight + levels[level].bricks.padding)
                    + levels[level].aliens.gapFromTop)
        }
        alienPositions[i][0] = alienPositions[i][0] + velocity
    }
    moveAlien()
}

//verifies which alien/s are closest to the border, in anticipation of wall collision
function closestToEdges() {
    let invaders = document.querySelectorAll('.alien')


    let furthestRight = invaders[0]
    let furthestRightNum = Number(furthestRight.style.left.replace('px', ''))


    let closestLeft = invaders[0]
    let closestLeftNum = Number(closestLeft.style.left.replace('px', ''))

    //finds the alien with the greatest "left" value which would be closest to the right wall
    for (let i = 0; i < invaders.length; i++) {
        let invadersNum = invaders[i].style.left.replace('px', '')
        if (closestLeftNum > invadersNum) {
            closestLeft = invaders[i];
        }
    }
    //finds the alien with the smallest "left" value which would be closest to the left wall
    for (let i = 0; i < invaders.length; i++) {
        let invadersNum = invaders[i].style.left.replace('px', '')
        if (furthestRightNum < invadersNum) {
            furthestRight = invaders[i];
        }
    }
    return [furthestRight, closestLeft]
}

export function removeAlien(id) {
    let aliens = document.querySelectorAll(".alien")
    aliens[id].remove()
    alienPositions.splice(id,1)
}