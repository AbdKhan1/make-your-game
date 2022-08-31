import { moveBall } from "./ball.js";
import { movePaddle } from "./paddle.js";
import {createBricks} from "./bricks.js"

createBricks()
//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

var stop = false;
var frameCount = 0;
// var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

fps = 60

startAnimating(fps);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    //console.log(startTime);
    animate();
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
       
        moveBall()
        movePaddle()
    }
}
