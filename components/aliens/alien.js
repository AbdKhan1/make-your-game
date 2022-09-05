const grid = document.querySelector(".grid")
const ball = document.querySelector(".ball")
const brickHeightAndSeparation = 20 + 5
const brickNumberOfRows = 5
const paddlePos = 70
const alienWidth = 60
const alienHeight = 50
const numberOfRows = 1
const numberOfAliens = 3
const space = (grid.offsetWidth - (numberOfAliens * alienWidth)) / numberOfAliens
const AlienStartX = space / 2
const AlienStartY = (ball.offsetWidth * 4) + (brickHeightAndSeparation * brickNumberOfRows) + 5
const drop = 10

let alienCoords = []
let alienStart = [AlienStartX, AlienStartY]
let furthestRight
let closestLeft
let velocity = 1

function drawAlien() {
    let invaders = document.querySelectorAll('.alien')
    for (let i = 0; i < invaders.length; i++) {
        invaders[i].style.left = alienCoords[i][0] + 'px'
        invaders[i].style.top = alienCoords[i][1] + 'px'
    }
}


export function createAliens() {
    for (let r = 1; r <= numberOfRows; r++) {
        for (let a = 1; a <= numberOfAliens; a++) {
            const alien = document.createElement('img')
            alien.classList.add('alien')
            alien.src = './alien.png'
            grid.appendChild(alien)
            alien.style.width = alienWidth + 'px'
            alien.style.height = alienHeight + 'px'
            alien.style.left = alienStart[0] + 'px'
            alien.style.top = alienStart[1] + 'px'
            alienCoords.push([alienStart[0], alienStart[1]])
            alienStart[0] += alienWidth + space
        }
        alienStart[0] = AlienStartX
        alienStart[1] += alienWidth + 10
    }
}

function closestToEdges() {
    let invaders = document.querySelectorAll('.alien')
    furthestRight = invaders[0]
    let furthestRightNum = Number(furthestRight.style.left.replace('px', ''))
    closestLeft = invaders[0]
    let closestLeftNum = Number(closestLeft.style.left.replace('px', ''))

    for (let i = 0; i < invaders.length; i++) {
        let invadersNum = invaders[i].style.left.replace('px', '')
        if (closestLeftNum > invadersNum) {
            closestLeft = invaders[i];
        }
    }

    for (let i = 0; i < invaders.length; i++) {
        let invadersNum = invaders[i].style.left.replace('px', '')
        if (furthestRightNum < invadersNum) {
            furthestRight = invaders[i];
        }
    }
}

export function moveAliens() {
    let invaders = document.querySelectorAll('.alien')
    if (invaders.length === 0) {
        return
    }
    closestToEdges()

    if (closestLeft.style.left.replace('px', '') <= 0 || furthestRight.style.left.replace('px', '') >= (grid.offsetWidth - alienWidth - 20)) {
        for (let i = 0; i < invaders.length; i++) {
            alienCoords[i][1] += drop
        }
        velocity = -velocity
    }
    for (let i = 0; i < invaders.length; i++) {
        if (alienCoords[i][1] >= (grid.offsetHeight - paddlePos - alienHeight)) {
            //gameover
            alienCoords[i][1] = AlienStartY
        }
        alienCoords[i][0] = alienCoords[i][0] + velocity
    }
    drawAlien()
}