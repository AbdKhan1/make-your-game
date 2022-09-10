import { moveBall } from "./ball.js";
import { movePaddle } from "./paddle.js";
import { createBricks } from "./bricks.js";
import { createAliens, moveAliens, updateLasers, moveLasers } from "./alien.js";

export let startMoveBall = false

createBricks()
createAliens()

//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

fps = 60


startAnimating(fps);


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    //console.log(startTime);
    animate();
}

addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        startMoveBall = true
    }
    if (e.keyCode === 16) {
        console.log(stop)
        if (stop) {
            stop = false
            startAnimating(60)
        } else if(!stop) {
            stop = true
        }

    }
})

const time=document.querySelector('#time')

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
        updateLasers()
        moveLasers()
        movePaddle()
        countUpTimer()
    }
}
