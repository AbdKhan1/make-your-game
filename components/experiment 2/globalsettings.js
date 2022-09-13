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
setupGameView()