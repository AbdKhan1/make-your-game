import { moveBall } from "./ball.js";
import { movePaddle, paddleMoved } from "./paddle.js";
import { createBricks } from "./bricks.js";
import { createAliens, moveAliens, updateLasers, moveLasers } from "./alien.js";

export let startMoveBall = false
let numberOfLives = document.querySelector('#lives')
let grid = document.querySelector('.grid')

let red = 150
let green = 0
let blue = 0
let colorRotation = 0

function disco() {
    let newRGB = "rgb(" + red + "," + " " + green + "," + " " + blue + ")"
    grid.style.borderRightColor = newRGB
    grid.style.borderLeftColor = newRGB
    grid.style.borderTopColor = newRGB
}

createBricks()
createAliens()

//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

let stop = false;
let fps, fpsInterval, startTime, now, then, elapsed;
let pauseBox = document.querySelector(".pause")

fps = 60


startAnimating(fps);


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;

    animate();
}

addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        startMoveBall = true
    }
    if (e.keyCode === 16) {
        if (stop) {
            stop = false
            pauseBox.style.display = "none";
            startAnimating(60)
        } else if (!stop) {
            pauseBox.style.display = "block";
            stop = true
        }

    }
})

document.querySelector('#continue').addEventListener('click',(e)=>{
    stop = false 
    pauseBox.style.display = "none";
    startAnimating(60)
})

const time = document.querySelector('#time')

let totalSeconds = 0;
let counterSec = 0
function countUpTimer() {
    if (stop) {
        return
    }
    ++totalSeconds;
    if (totalSeconds % 60 === 0) {
        counterSec = totalSeconds / 60
        let hour = Math.floor(counterSec / 3600);
        let minute = Math.floor((counterSec - hour * 3600) / 60);
        let seconds = (counterSec - (hour * 3600 + minute * 60));
        time.innerHTML = hour + "hr" + ":" + minute + "m" + ":" + seconds + "s";
    }
}

function animate(newtime) {
    if (colorRotation === 1) {
        red = 50
        blue = 50
        green = 150
        colorRotation=0
    }
    if (red !== 255) {
        red++
    } else if (red === 255 && green !== 255) {
        green++
    } else if (red === 255 && green === 255 && blue !== 255) {
        blue++
    } else if (red === 255 && green === 255 && blue === 255) {
        red = 50
        blue = 150
        green = 50
        colorRotation++
    }


    // stop
    if (stop) {
        return;
    }

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = newtime;
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        then = now - (elapsed % fpsInterval);
        // draw stuff here
        moveAliens()
        if (startMoveBall) {
            moveBall()
        }
        if (numberOfLives.innerText == 0) {
            stop = true
            let aliens = document.querySelectorAll('.alien')
            let lasers = document.querySelectorAll('.laser')
            let ball = document.querySelector('.ball')
            ball.remove()
            for (let i = 0; i < aliens.length; i++) {
                aliens[i].remove()
            }
            for (let i = 0; i < lasers.length; i++) {
                lasers[i].remove()
            }
            aliens = []
            lasers = []
            let loseBox = document.querySelector(".lose")
            loseBox.style.display = "block";
            // document.querySelector(".grid").appendChild(loseBox)
        }
        if (paddleMoved || startMoveBall) {
            updateLasers()
        }
        moveLasers()
        movePaddle()
        if (paddleMoved || startMoveBall) {
            countUpTimer()
        }
        disco()
    }
}