import { gameViewSettings } from "./globalsettings.js"


// DOMRect describes the size and position of a rectangle.

export function checkCollision(ball, objectDOMRect) {
    // https://youtu.be/r0sy-Cr6WHY?t=327

    if (ball.x > objectDOMRect.x + objectDOMRect.width ||
        ball.x + ball.width < objectDOMRect.x ||
        ball.y > objectDOMRect.y + objectDOMRect.height ||
        ball.y + ball.height < objectDOMRect.y) {
        // no collision
        return false
    } else {
        // console.log("collision!!")
        return true
    }

}

export function checkPaddleCollision(ballDOMRect) {
    let paddleDOMRect = document.querySelector(".paddle").getBoundingClientRect()
    return checkCollision(ballDOMRect, paddleDOMRect)
}

export function checkWallCollision(ballDOMRect) {

    // check collision with walls
    // with left wall
    let leftW = document.querySelector(".leftWall")
    if (checkCollision(ballDOMRect, leftW.getBoundingClientRect())) {
        return "left"
    }
    // with right wall
    let rightW = document.querySelector(".rightWall")
    if (checkCollision(ballDOMRect, rightW.getBoundingClientRect())) {
        return "right"
    }
    // with top wall
    let topW = document.querySelector(".topWall")
    if (checkCollision(ballDOMRect, topW.getBoundingClientRect())) {
        return "top"
    }
    // with bottom wall
    let paddleDOMRect = document.querySelector(".paddle").getBoundingClientRect()
    if (ballDOMRect.y > (paddleDOMRect.y + (2 * paddleDOMRect.height))) {
        return "bottom"
    }

    return "none"

}

export function checkBrickCollision(ballDOMRect) {

    let bricks = document.querySelectorAll(".brick")



    for (let i = 0; i < bricks.length; i++) {
        let brickDOMRect = bricks[i].getBoundingClientRect()
        if (checkCollision(ballDOMRect, brickDOMRect)) {
            return i
        }
    }



}

export function checkAlienCollision(ballDOMRect) {

    let aliens = document.querySelectorAll(".alien")

    for (let i = 0; i < aliens.length; i++) {
        let alienDOMRect = aliens[i].getBoundingClientRect()
        if (checkCollision(ballDOMRect, alienDOMRect)) {
            return i
        }
    }


}
export function checkLaserCollision(objectDOMRect) {

    let lasers = document.querySelectorAll(".laser")

    for (let i = 0; i < lasers.length; i++) {
        let laserDOMRect = lasers[i].getBoundingClientRect()
        if (checkCollision(objectDOMRect, laserDOMRect)) {
            return i
        }
    }



}

