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
    width: 30,
    height: 30,
    image: "./alien.gif", //path of file 
    hueRotationValue:60,
}


////////////////////////////////////////////////

////////////////////////////////////////////////
/* Lasers */
////////////////////////////////////////////////
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


export const scoreSettings = {
    brick: 100, //number of points
    alien: 150,
    laser: 50,
    comboCount: 5,
    multiplierPoints : 10,


    /* 
    So more aliens > greater the points 
    example: 5 aliens means each brick is worth 5x

    combo:
    if the ball hits the combo count then the multiplier increases
    without hitting the paddle..
    (the combo resets to zero if paddle is hit)
    
    example : ball hits the combo then multiplier increase by 1 and the brick value increases by the multiplier value

    */ 
    
}

export const livesSettings = {
    width: 25,
    height: 25,
    image: "./heart.png"
}

setupGameView()