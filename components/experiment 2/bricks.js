import { levels } from "./levels.js";
import { ballSettings } from "./globalsettings.js"


let gameView = document.querySelector(".gameView");

export function createBricks(level) {
    // console.log("creating bricks", levels[level])
    const numberOfBricksPerRow = Math.floor(gameView.offsetWidth
        / (levels[level].bricks.brickWidth + levels[level].bricks.padding)) - 1
    // minus 1 because of the border on the right side of the gameView
    console.log(levels[level].bricks.brickWidth)
    
    console.log("number of bricks", numberOfBricksPerRow)

    const brickStartY = ballSettings.size * 4
    console.log(brickStartY)

    const brickStartX = (Math.floor((gameView.offsetWidth
        - (numberOfBricksPerRow * (levels[level].bricks.brickWidth + levels[level].bricks.padding))
        ) / 2)) + levels[level].bricks.padding
        
    console.log(brickStartX)

    let brickPosition = [brickStartX, brickStartY]

    for (let row = 0; row < levels[level].bricks.numberOfRows; row++){
        
        for (let i = 0; i < numberOfBricksPerRow; i++){
            let brick = document.createElement("div");
            brick.classList.add("brick");            
            brick.style.width = levels[level].bricks.brickWidth + "px";
            brick.style.height = levels[level].bricks.brickHeight + "px";
            brick.style.backgroundColor = levels[level].bricks.brickRowColors[row];
            brick.style.left = brickPosition[0] + "px";
            brick.style.top = brickPosition[1] + "px";
            gameView.appendChild(brick);
            brickPosition[0] += levels[level].bricks.brickWidth + levels[level].bricks.padding
            
        }
        brickPosition[0] = brickStartX
        brickPosition[1] += levels[level].bricks.brickHeight + levels[level].bricks.padding

    }


}