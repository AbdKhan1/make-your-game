import { gameViewSettings } from "./globalsettings.js"


// Setup the game area view

export function setupGameView() {
    let gameView = document.createElement("div");
    gameView.classList.add("gameView");
    gameView.style.width = gameViewSettings.gameViewWidth + "px";
    gameView.style.height = gameViewSettings.gameViewHeight + "px";
    gameView.style.backgroundColor = gameViewSettings.gameViewColor;

    // gameView.style.left = gameViewSettings.borderWidth + "px";
    // gameView.style.top = gameViewSettings.borderWidth + "px";
    
    // create left wall
    let leftWall = document.createElement("div");
    leftWall.classList.add("leftWall");
    leftWall.style.position = "absolute";
    leftWall.style.width = gameViewSettings.borderWidth + "px";
    leftWall.style.height = gameViewSettings.gameViewHeight + "px";
    leftWall.style.backgroundColor = gameViewSettings.borderColor;
    leftWall.style.left = 0 + "px";
    leftWall.style.top = 0 + "px";
    gameView.appendChild(leftWall);
     
    // create right wall
    let rightWall = document.createElement("div");
    rightWall.classList.add("rightWall");
    rightWall.style.position = "absolute";
    rightWall.style.width = gameViewSettings.borderWidth + "px";
    rightWall.style.height = gameViewSettings.gameViewHeight + "px";
    rightWall.style.backgroundColor = gameViewSettings.borderColor;
    rightWall.style.right = 0 + "px";
    rightWall.style.top = 0 + "px";
    gameView.appendChild(rightWall);

    // create top wall
    let topWall = document.createElement("div");
    topWall.classList.add("topWall");
    topWall.style.position = "absolute";
    topWall.style.width = gameViewSettings.gameViewWidth + "px";
    topWall.style.height = gameViewSettings.borderWidth + "px";
    topWall.style.backgroundColor = gameViewSettings.borderColor;
    topWall.style.left = 0 + "px";
    topWall.style.top = 0 + "px";
    gameView.appendChild(topWall);

    document.querySelector("body").appendChild(gameView);
}

