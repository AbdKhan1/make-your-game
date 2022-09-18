import { setupGameView } from "./gamearea.js"

/* global */
// export 

////////////////////////////////////////////////
/* gameView settings */
////////////////////////////////////////////////
export const gameViewSettings = {
    gameViewWidth: 600,
    gameViewHeight: innerHeight > 680 ? 680 : innerHeight < 200 ? innerHeight : 680, //takes up the full height or 680px
    gameViewColor: "black",
    borderWidth: 10,      // px - side borderwidth 
    borderColor: "gray",
    gapTop: 15 * 3  //     
}

////////////////////////////////////////////////


////////////////////////////////////////////////
/* ball */
////////////////////////////////////////////////
export const ballSettings = {
    size: 15,
    speed: 4,
    balls: 1,
    color: 'hotpink'
}



////////////////////////////////////////////////

////////////////////////////////////////////////
/* paddle */
////////////////////////////////////////////////
export const paddleSettings = {
    velocity: 6,
    width: 100,
    height: 15,
    color: "white" //'darkorange' 
}



////////////////////////////////////////////////
////////////////////////////////////////////////

// ////////////////////////////////////////////////
// /* Bricks */
// ////////////////////////////////////////////////
// export const brickSettings = {

// }



////////////////////////////////////////////////

////////////////////////////////////////////////
/* Invaders */
////////////////////////////////////////////////
export const invaderSettings = {
    width: 35,
    height: 35,
    image: "./alien.gif", //path of file 
}

export const laserSettings = {
    width: 25,
    height: 25,
    image: "./laser.png"
}

////////////////////////////////////////////////


export const sounds = {
    launchBall: new Audio("../../sounds/launch.mp3"),
    bouncePaddle: new Audio("../../sounds/bounce-paddle.mp3"),
    bounceBrick: new Audio("../../sounds/bounce-brick.mp3"),
    bounceWallLeft: new Audio("../../sounds/bounce-wall-left.mp3"),
    bounceWallRight: new Audio("../../sounds/bounce-wall.mp3"),
    bounceWallLTop: new Audio("../../sounds/bounce-wall.mp3"),
    loseLife: new Audio("../../sounds/lose-life.mp3"),
    invadersMusic: new Audio("../../sounds/spaceInvaders.mp3"),

    bounceLaser: new Audio("../../sounds/cover_explosion.wav"),

    alienExplode: new Audio("../../sounds/alien-explosion-sfx.wav"),
    alienShoot: new Audio("../../sounds/alien-bullet-sfx.wav"),
    alienShieldBounce: new Audio("../../sounds/invader_hurt.wav"),
    alienpaddleHit: new Audio("../../sounds/player_explosion.wav"),

}

setupGameView()