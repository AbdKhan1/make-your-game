import { BallMovement } from "./ball.js";
import { PaddleMovement } from "./paddle.js";
import { startBallMovement, paddleMoved } from "./input.js";
import { createBricks } from "./bricks.js"
import { createAliens, alienMovement } from "./invaders.js";
import { laserMovement } from "./lasers.js";
import { countUpTimer } from "./scoreboard/timer.js"
import "./scoreboard/lives.js"
import { updateLevel } from "./scoreboard/level.js"
import { gameOver } from "./scoreboard/lives.js";
import { retrieveLeaderboard } from "./scoreboard/leaderboard.js";
import { addTabsToScoreboard } from "./scoreboard/tabs.js";

export let currentLevel;

onLoad()

//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe


let stop = false;
let fps = 60, fpsInterval, startTime, now, then, elapsed;

startAnimating(fps);


function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  animate();
}

let duration = 0

function animate(newtime) {
  // stop
  if (stop) {
    return;
  }

  if (gameOver) {
    return
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
      countUpTimer(stop, duration)

      duration++
    }
    alienMovement(currentLevel)
    if (startBallMovement || paddleMoved) {
      laserMovement()
    }
    PaddleMovement()

  }
}


async function onLoad() {
  const QueryString = window.location.search;
  const urlParams = new URLSearchParams(QueryString);
  currentLevel = urlParams.get("lvl") || 0;

  updateLevel(currentLevel)
  createBricks(currentLevel);
  createAliens(currentLevel);
  await retrieveLeaderboard(currentLevel)
  addTabsToScoreboard()
}

export function changeStopValue() {
  if (stop) {
    stop = false
  } else {
    stop = true
  }
  startAnimating(fps)
}

export function changeCurrentLevelValue(newLevel) {
  currentLevel = newLevel
}