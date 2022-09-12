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

export function checkWallCollision(ball) {

    // check collision with walls
    // with left wall
    let leftW = document.querySelector(".leftWall")
    if (checkCollision(ball,leftW.getBoundingClientRect())) {
        return "left"
    }
    // with right wall
    let rightW = document.querySelector(".rightWall")
    if (checkCollision(ball,rightW.getBoundingClientRect())) {
        return "right"
    }
    // with top wall
    let topW = document.querySelector(".topWall")
    if (checkCollision(ball,topW.getBoundingClientRect())) {
        return "top"
    }

    return "none"

}