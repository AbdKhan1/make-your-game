import { BallMovement } from "./ball.js";
import { PaddleMovement } from "./paddle.js";
import { startBallMovement } from "./input.js";
import { createBricks } from "./bricks.js"



createBricks(0);

//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe

let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

fps = 60;

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

    if (startBallMovement) {
      BallMovement();
    }
    PaddleMovement()

  }
}
