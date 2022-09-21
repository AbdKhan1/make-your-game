import { sounds } from "./globalsettings.js"
import { changeStopValue, currentLevel } from "./script.js"
import { score } from "./ball.js";
import { isTopScore } from "./scoreboard/leaderboard.js"
import { changeGameOverValue } from "./scoreboard/lives.js"

// For keyboard input

export let startBallMovement = false,
paddleMoved = false;

export function changeStartBallMovementValue() {
    if (!startBallMovement) {
        startBallMovement = true
    } else {
        startBallMovement = false
    }
}
export function changePaddleMovedValue() {
    if (!paddleMoved) {
        paddleMoved = true
    } else {
        paddleMoved = false
    }
}

addEventListener('keydown', (e) => {
    // Start the ball movement
    if (e.key === ' ') {
        if (startBallMovement === false) { sounds.launchBall.play() }
        startBallMovement = true
    }
    //pause the game using shift
    if (e.keyCode === 27) {
        let pause = document.querySelector('.pause')
        let gameOverPopUp=document.getElementById("myScoreEntry");
        if (gameOverPopUp.style.display!=="block"){
            if (pause.style.display === "none" || pause.style.display === undefined || pause.style.display === '') {
                pause.style.display = "block"
            } else {
                pause.style.display = "none"
            }
        }
        changeStopValue()
    }

})

document.querySelector('#exit').addEventListener("click", (e) => {
    let pause = document.querySelector('.pause')
    pause.style.display = "none"
    gameover()
})

// For paddle movement
export let rightPressed = false,
    leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        paddleMoved = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        paddleMoved = true;
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
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

//reveal game over pop up
export function gameover() {
    // reveal pop allowing user to enter score
    let entry = document.getElementById("myScoreEntry");
    entry.style.display = "block"

    console.log(score, currentLevel)
    // check if the score is a top score
    isTopScore(score, currentLevel, 5).then((result) => {
        if (result) {
            // if it is, allow the user to enter their name
            let input = document.querySelector(".new-hiscore");
            input.style.display = "block"
        }
    })


    // Get the <span> element that closes the pop up
    let span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        entry.style.display = "none";
    }
    changeGameOverValue(true)
}