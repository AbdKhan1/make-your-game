import { moveBall } from "./ball.js";
import { movePaddle } from "./paddle.js";

// const FPS = 60;
// let lastTimestamp = 0;


// function update(timestamp) {
//   requestAnimationFrame(update);
//   if (timestamp - lastTimestamp < 1000 / FPS) return;


//    /* <<< PUT YOUR CODE HERE >>>  */
//    moveBall()
//    movePaddle()

//   lastTimestamp = timestamp;
// }


// update();


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
    console.log(startTime);
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


        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

    }
}




// function checkCollision() {

//     //ball and paddle
//     let ball = document.querySelector('.ball').getBoundingClientRect()
//     let paddle = document.querySelector('.paddle').getBoundingClientRect()


//     // console.log(ball, paddle.width)
//     if (ball.x > paddle.x + paddle.width ||
//         ball.x + ball.width < paddle.x ||
//         ball.y > paddle.y + paddle.height ||
//         ball.y + ball.height < paddle.y) {
//         // no collision
//         return false
//     } else {
//         // collision
//         // console.log("collision!!")
//         return true
//     }


// }