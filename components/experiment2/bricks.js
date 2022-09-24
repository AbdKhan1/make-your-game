import { levels } from './levels.js';

let gameView = document.querySelector('.gameView');

export function createBricks(level) {
    const numberOfBricksPerRow =
        Math.floor(
            gameView.offsetWidth /
                (levels[level].bricks.brickWidth + levels[level].bricks.padding)
        ) - 1;
    // minus 1 because of the border on the right side of the gameView

    console.log('number of bricks', numberOfBricksPerRow);

    const brickStartY = levels[level].bricks.gapFromTop; // The gap for the ball to bounce between the //top and the starting row of bricks

    const brickStartX =
        Math.floor(
            (gameView.offsetWidth -
                numberOfBricksPerRow *
                    (levels[level].bricks.brickWidth +
                        levels[level].bricks.padding)) /
                2
        ) + levels[level].bricks.padding;

    let brickPosition = [brickStartX, brickStartY];

    for (let row = 0; row < levels[level].bricks.numberOfRows; row++) {
        for (let i = 0; i < numberOfBricksPerRow; i++) {
            let brick = document.createElement('div');
            brick.classList.add('brick');
            brick.style.width = levels[level].bricks.brickWidth + 'px';
            brick.style.height = levels[level].bricks.brickHeight + 'px';
            brick.style.backgroundColor =
                levels[level].bricks.brickRowColors[row];
            brick.style.left = brickPosition[0] + 'px';
            brick.style.top = brickPosition[1] + 'px';
            gameView.appendChild(brick);
            brickPosition[0] +=
                levels[level].bricks.brickWidth + levels[level].bricks.padding;
        }
        brickPosition[0] = brickStartX;
        brickPosition[1] +=
            levels[level].bricks.brickHeight + levels[level].bricks.padding;
    }

    removeBricksByColor('rgb(0, 0, 0)');
}

export function removeBrick(id) {
    let bricks = document.querySelectorAll('.brick');
    bricks[id].remove();
}

// remove all bricks with a certain color
function removeBricksByColor(color) {
    // let arr = Array.from(document.querySelectorAll('.brick'))
    // arr.filter(b => {
    //     let bg = b.style.backgroundColor;
    //     console.log(bg)
    //   });
    let bricks = document.querySelectorAll('.brick');

    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].style.backgroundColor == color) {
            bricks[i].remove();
        }
    }
}
