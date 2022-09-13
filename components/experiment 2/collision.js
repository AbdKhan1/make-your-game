import { gameViewSettings } from "./globalsettings.js"

// https://youtu.be/r0sy-Cr6WHY?t=327

export function checkCollision(ball,ballDOMRect) {

    if (ball.x > ballDOMRect.x + ballDOMRect.width ||
        ball.x + ball.width < ballDOMRect.x ||
        ball.y > ballDOMRect.y + ballDOMRect.height ||
        ball.y + ball.height < ballDOMRect.y) {
        // no collision
        return false
    } else {
        // console.log("collision!!")
        return true
    }


}

export function checkWallCollision(ballDOMRect) {

    // check collision with walls
    // with left wall
    let leftW = document.querySelector(".leftWall")
    if (checkCollision(ballDOMRect,leftW.getBoundingClientRect())) {
        return "left"
    }
    // with right wall
    let rightW = document.querySelector(".rightWall")
    if (checkCollision(ballDOMRect,rightW.getBoundingClientRect())) {
        return "right"
    }
    // with top wall
    let topW = document.querySelector(".topWall")
    if (checkCollision(ballDOMRect,topW.getBoundingClientRect())) {
        return "top"
    }
    // with bottom wall
    if (ballDOMRect.y + ballDOMRect.height > gameViewSettings.gameViewHeight) {
        return "bottom"
    }

    return "none"

}

export function checkBrickCollision(ballDOMRect) {

    let bricks = document.getElementsByClassName(".brick")


    for (let i = 0; i < bricks.length; i++) {
        let brickDOMRect = bricks[i].getBoundingClientRect()
        if (checkCollision(ballDOMRect, brickDOMRect)) {
            
            return i
        }
    }

  

}