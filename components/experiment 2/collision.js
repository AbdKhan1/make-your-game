import { gameViewSettings } from "./globalsettings.js"

// https://youtu.be/r0sy-Cr6WHY?t=327

export function checkCollision(ball,object) {

    if (ball.x > object.x + object.width ||
        ball.x + ball.width < object.x ||
        ball.y > object.y + object.height ||
        ball.y + ball.height < object.y) {
        // no collision
        return false
    } else {
        // console.log("collision!!")
        return true
    }


}

export function checkWallCollision(object) {

    // check collision with walls
    // with left wall
    let leftW = document.querySelector(".leftWall")
    if (checkCollision(object,leftW.getBoundingClientRect())) {
        return "left"
    }
    // with right wall
    let rightW = document.querySelector(".rightWall")
    if (checkCollision(object,rightW.getBoundingClientRect())) {
        return "right"
    }
    // with top wall
    let topW = document.querySelector(".topWall")
    if (checkCollision(object,topW.getBoundingClientRect())) {
        return "top"
    }
    // with bottom wall
    if (object.y + object.height > gameViewSettings.gameViewHeight) {
        return "bottom"
    }

    return "none"

}