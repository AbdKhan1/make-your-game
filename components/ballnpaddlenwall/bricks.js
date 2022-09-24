const gridSize = 600;

const brickRowCount = 5;
const brickColumnCount = 10; // bricks per row

let numOfBricks = brickRowCount * brickColumnCount;

const brickSpacing = 10;

const brickWidth = 75;
const brickHeight = 20;

const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];

for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = { x: 0, y: 0 };
    }
}

let grid = document.querySelector('.grid');
let brickWall = document.createElement('div');
brickWall.classList.add('brickwall');

let color = '';
function drawBrick(pos) {
    let brick = document.createElement('div');
    brick.classList.add('brick');

    brick.style.left = pos[0] + 'px';

    brick.style.top = pos[1] + 'px';
    // brick.style.marginRight= "15px"
    // brick.style.paddingLeft = "10px"
    brick.style.backgroundColor = color;

    brickWall.appendChild(brick);
}

let s = 0;
let y = 75;
let count = 0;
let row = 0;

// need to consider the width
export function drawBrickWall() {
    for (let i = 0; i < numOfBricks; i++) {
        if (row === 0) color = '#c44a4a';
        if (row === 1) color = '#c36c40';
        if (row === 2) color = '#a3a040';
        if (row === 3) color = '#4d9e49';
        if (row === 4) color = '#4350c5';

        drawBrick([s, y]);
        s += 57 + 1.1;
        count++;
        if (count == brickColumnCount) {
            y += 15.5;
            s = 0;
            count = 0;
            row++;
        }
    }

    grid.appendChild(brickWall);
}
