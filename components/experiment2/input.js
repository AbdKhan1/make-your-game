import { sounds } from "./globalsettings.js"

// For keyboard input

export let startBallMovement = false

export function changeValue() {
    if (!startBallMovement) {
        startBallMovement = true
    } else {
        startBallMovement = false
    }
}

// Start the ball movement
addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        if (startBallMovement === false) { sounds.launchBall.play() }
        startBallMovement = true
    }

})

// For paddle movement
export let rightPressed = false,
    leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
//prevent arrows and space bar from moving the screen
window.addEventListener("keydown", function stopCrolling(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);