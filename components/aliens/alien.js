const grid = document.querySelector(".grid");
const center = window.innerWidth / 2 - grid.offsetWidth / 2;
grid.style.marginLeft = center + "px";
const scoreboard = document.querySelector(".scoreboard");
scoreboard.style.marginLeft = center + "px";
grid.style.height =
  window.innerHeight - scoreboard.getBoundingClientRect().height + "px";
const ball = document.querySelector(".ball");
const brickHeightAndSeparation = 20 + 5;
const brickNumberOfRows = 5;
const paddlePos = 70;
const alienWidth = 30;
const alienHeight = 25;
const numberOfRows = 1;
export const numberOfAliens = 6;
const space = (grid.offsetWidth - numberOfAliens * alienWidth) / numberOfAliens;
const AlienStartX = space / 2;
const AlienStartY = 15 * 4 + brickHeightAndSeparation * brickNumberOfRows + 5;
const drop = 10;
const laserWidth = 30;
const laserHeight = 25;
const laserSpeed = 4;

export let alienCoords = [];
let alienStart = [AlienStartX, AlienStartY];
let furthestRight;
let closestLeft;
let velocity = 1;

let lasers = [];
let laser_cooldown = Math.floor(Math.random() * 100);
let laserCoords = [0, 0];

function drawAlien() {
  let invaders = document.querySelectorAll(".alien");
  for (let i = 0; i < invaders.length; i++) {
    invaders[i].style.left = alienCoords[i][0] + "px";
    invaders[i].style.top = alienCoords[i][1] + "px";
  }
}

export function createAliens() {
  for (let r = 1; r <= numberOfRows; r++) {
    for (let a = 1; a <= numberOfAliens; a++) {
      const alien = document.createElement("img");
      alien.classList.add("alien");
      alien.src = "./alien.png";
      grid.appendChild(alien);
      alien.style.width = alienWidth + "px";
      alien.style.height = alienHeight + "px";
      alien.style.left = alienStart[0] + "px";
      alien.style.top = alienStart[1] + "px";
      alienCoords.push([alienStart[0], alienStart[1]]);
      alienStart[0] += alienWidth + space;
    }
    alienStart[0] = AlienStartX;
    alienStart[1] += alienWidth + 10;
  }
}

function closestToEdges() {
  let invaders = document.querySelectorAll(".alien");
  furthestRight = invaders[0];
  let furthestRightNum = Number(furthestRight.style.left.replace("px", ""));
  closestLeft = invaders[0];
  let closestLeftNum = Number(closestLeft.style.left.replace("px", ""));

  for (let i = 0; i < invaders.length; i++) {
    let invadersNum = invaders[i].style.left.replace("px", "");
    if (closestLeftNum > invadersNum) {
      closestLeft = invaders[i];
    }
  }

  for (let i = 0; i < invaders.length; i++) {
    let invadersNum = invaders[i].style.left.replace("px", "");
    if (furthestRightNum < invadersNum) {
      furthestRight = invaders[i];
    }
  }
}

import { startMoveBall } from "./script.js";
export function moveAliens() {
  let invaders = document.querySelectorAll(".alien");
  if (invaders.length === 0) {
    return;
  }
  closestToEdges();

  if (
    closestLeft.style.left.replace("px", "") <= 0 ||
    furthestRight.style.left.replace("px", "") >=
      grid.offsetWidth - alienWidth - 20
  ) {
    if (startMoveBall) {
      for (let i = 0; i < invaders.length; i++) {
        alienCoords[i][1] += drop;
      }
    }
    velocity = -velocity;
  }
  for (let i = 0; i < invaders.length; i++) {
    if (alienCoords[i][1] >= grid.offsetHeight - paddlePos - alienHeight) {
      //gameover
      alienCoords[i][1] = AlienStartY;
    }
    alienCoords[i][0] = alienCoords[i][0] + velocity;
  }
  drawAlien();
}

function drawLasers() {
  let laser = document.querySelectorAll(".laser");
  for (let i = 0; i < laser.length; i++) {
    laser[i].style.left = lasers[i][0] + "px";
    laser[i].style.top = lasers[i][1] + "px";
  }
}

export function createLasers() {
  let aliens = document.querySelectorAll(".alien");
  let random = Math.floor(Math.random() * aliens.length);
  for (let i = 0; i < aliens.length; i++) {
    if (i === random) {
      let alien = aliens[i];
      const laser = document.createElement("img");
      laser.classList.add("laser");
      laser.src = "./laser.png";
      grid.appendChild(laser);
      laser.style.width = laserWidth + "px";
      laser.style.height = laserHeight + "px";
      laserCoords[0] =
        Number(alien.style.left.replace("px", "")) +
        (Number(alien.getBoundingClientRect().width / 2) - laserWidth / 2);
      laserCoords[1] =
        Number(alien.getBoundingClientRect().top) +
        Number(alien.getBoundingClientRect().height);
      lasers.push([laserCoords[0], laserCoords[1]]);
    }
  }
}

export let lives = 3;

import { checkCollision } from "./collision.js";
export function moveLasers() {
  let laserArr = document.querySelectorAll(".laser");
  for (let i = 0; i < lasers.length; i++) {
    lasers[i][1] += laserSpeed;
    if (lasers[i][1] >= window.innerHeight - laserHeight - 10) {
      laserArr[i].remove();
      lasers.splice(i, 1);
    }
  }

  let paddleSizeAndPos = document
    .querySelector(".paddle")
    .getBoundingClientRect();
  let paddle = document.querySelector(".paddle");

  for (let i = 0; i < laserArr.length; i++) {
    let laserSizeAndPos = laserArr[i].getBoundingClientRect();
    if (checkCollision(laserSizeAndPos, paddleSizeAndPos)) {
      lives--;
      const numberOfLives = document.querySelector("#lives");
      numberOfLives.innerHTML = lives;
      if (lives === 2) {
        paddle.style.backgroundColor = "purple";
      } else if (lives === 1) {
        paddle.style.backgroundColor = "red";
      }
      laserArr[i].remove();
      lasers.splice(i, 1);
    }
  }
  drawLasers();
}

export function updateLasers() {
  if (laser_cooldown === 0) {
    createLasers();
    drawLasers();
    laser_cooldown = Math.floor(Math.random() * 100);
    return;
  }
  laser_cooldown -= 0.5;
}
