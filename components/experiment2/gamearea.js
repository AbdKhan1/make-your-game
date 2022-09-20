import { gameViewSettings } from "./globalsettings.js"


// Setup the game area view

export function setupGameView() {
    //creates two colums, 
    //the left side will contain the game and the right,game information
    let row = document.createElement("div");
    row.classList.add("row")
    for (let i = 0; i <= 1; i++) {
        let column = document.createElement("div");
        column.classList.add("column")
        column.style.flexWrap = "wrap"
        if (i === 0) {
            column.classList.add("left")
        } else {
            column.classList.add("right")
        }
        row.appendChild(column)
    }

    row.style.backgroundColor = "rgba(133, 125, 125, 0.24);"
    document.querySelector("body").appendChild(row);

    let leftColumn = document.querySelector(".left"),
        rightColumn = document.querySelector(".right")

    leftColumn.style.width = gameViewSettings.gameViewWidth + "px"
    leftColumn.style.height = gameViewSettings.gameViewHeight + "px"

    rightColumn.style.height = (gameViewSettings.gameViewHeight - gameViewSettings.borderWidth) + "px"
    rightColumn.style.backgroundColor = gameViewSettings.gameViewColor
    rightColumn.style.borderStyle = "solid"
    rightColumn.style.borderTopWidth = gameViewSettings.borderWidth + "px"
    rightColumn.style.borderRightWidth = gameViewSettings.borderWidth + "px"
    rightColumn.style.borderBottomWidth = 0 + "px"
    rightColumn.style.borderColor = gameViewSettings.borderColor

    //adjusts display of columns depending on screen size.
    var windowSize = window.matchMedia("(max-width:" + (2 * (window.innerWidth / 3)) + "px)")
    columnView(windowSize)
    windowSize.addListener(columnView)

    let information = `<h2>Leaderboard</h2>
    `
    rightColumn.innerHTML = information

    //creates game view
    let gameView = document.createElement("div");
    gameView.classList.add("gameView");
    gameView.style.width = gameViewSettings.gameViewWidth + "px";
    gameView.style.height = gameViewSettings.gameViewHeight + "px";
    gameView.style.backgroundColor = gameViewSettings.gameViewColor;

    // create left wall
    let leftWall = document.createElement("div");
    leftWall.classList.add("leftWall");
    leftWall.style.position = "absolute";
    leftWall.style.width = gameViewSettings.borderWidth + "px";
    leftWall.style.height = gameViewSettings.gameViewHeight - gameViewSettings.borderWidth + "px";
    leftWall.style.backgroundColor = gameViewSettings.borderColor;
    leftWall.style.left = 0 + "px";
    leftWall.style.top = gameViewSettings.borderWidth + "px";
    gameView.appendChild(leftWall);



    // create right wall
    let rightWall = document.createElement("div");
    rightWall.classList.add("rightWall");
    rightWall.style.position = "absolute";
    rightWall.style.width = gameViewSettings.borderWidth + "px";
    rightWall.style.height = gameViewSettings.gameViewHeight - gameViewSettings.borderWidth + "px";
    rightWall.style.backgroundColor = gameViewSettings.borderColor;
    rightWall.style.right = 0 + "px";
    rightWall.style.top = gameViewSettings.borderWidth + "px";
    gameView.appendChild(rightWall);

    // create top wall
    let topWall = document.createElement("div");
    topWall.classList.add("topWall");
    topWall.style.position = "absolute";
    topWall.style.width = gameViewSettings.gameViewWidth - (gameViewSettings.borderWidth * 2) + "px";
    topWall.style.height = gameViewSettings.borderWidth + "px";
    topWall.style.backgroundColor = gameViewSettings.borderColor;
    topWall.style.left = gameViewSettings.borderWidth + "px";
    topWall.style.top = 0 + "px";
    gameView.appendChild(topWall);


    // adding this two squares to fill the gap between the walls and the game view.
    // this was done so that the collision detection would work properly.    
    // create left wall corner square
    let leftWallCorner = document.createElement("div");
    leftWallCorner.classList.add("leftWallCorner");
    leftWallCorner.style.position = "absolute";
    leftWallCorner.style.width = gameViewSettings.borderWidth + "px";
    leftWallCorner.style.height = gameViewSettings.borderWidth + "px";
    leftWallCorner.style.backgroundColor = gameViewSettings.borderColor;
    leftWallCorner.style.left = 0 + "px";
    leftWallCorner.style.top = 0 + "px";
    gameView.appendChild(leftWallCorner);

    // create right wall corner square
    let rightWallCorner = document.createElement("div");
    rightWallCorner.classList.add("rightWallCorner");
    rightWallCorner.style.position = "absolute";
    rightWallCorner.style.width = gameViewSettings.borderWidth + "px";
    rightWallCorner.style.height = gameViewSettings.borderWidth + "px";
    rightWallCorner.style.backgroundColor = gameViewSettings.borderColor;
    rightWallCorner.style.right = 0 + "px";
    rightWallCorner.style.top = 0 + "px";
    gameView.appendChild(rightWallCorner);

    document.querySelector(".left").appendChild(gameView);
}

//https://www.w3schools.com/howto/howto_js_media_queries.asp
//changes the positioning (grid style) and width of the right column,
//depending on size of the screen
function columnView(windowSize) {
    let row = document.querySelector(".row")
    let rightColumn = document.querySelector(".right")
    // If media query matches
    if (windowSize.matches) {
        row.style.gridTemplateColumns = "repeat(1, 1fr)";
        rightColumn.style.width = (gameViewSettings.gameViewWidth - (2 * gameViewSettings.borderWidth)) + "px"
        rightColumn.style.borderLeftWidth = gameViewSettings.borderWidth + "px"
    } else {
        row.style.gridTemplateColumns = "repeat(2, 1fr)";
        rightColumn.style.width = (800) + "px"
        rightColumn.style.borderLeftWidth = 0 + "px"
    }
}
