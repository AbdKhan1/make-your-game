const grid = document.querySelector(".grid")
const ball = document.querySelector(".ball")
const numberOfRows = 5
const brickWidth = 60
const brickHeight = 20
const borderWidth = 10
const numberOfBricks = Math.floor(grid.offsetWidth / (brickWidth + 5))-1
const brickStartY =ball.offsetWidth*2
const brickStartX = (Math.floor((grid.offsetWidth - (borderWidth * 2) - (numberOfBricks * (brickWidth+5)))/ 2))
let brickPosition = [brickStartX, brickStartY]
let color=""
export function createBricks() {
    console.log(numberOfBricks)
    for (let row = 0; row < numberOfRows; row++) {
        if (row === 0) color = "#c44a4a"
        if (row === 1) color = "#c36c40"
        if (row === 2) color = "#a3a040"
        if (row === 3) color = "#4d9e49"
        if (row === 4) color = "#4350c5"
        for (let i = 0; i < numberOfBricks; i++) {
            const brick = document.createElement('div')
            brick.classList.add('brick')
            grid.appendChild(brick)
            brick.style.width=brickWidth+'px'
            brick.style.height=brickHeight+'px'
            brick.style.backgroundColor = color
            brick.style.left = brickPosition[0] + 'px'
            brick.style.top = brickPosition[1] + 'px'
            brickPosition[0] += brickWidth+5
        }
        brickPosition[0]=brickStartX
        brickPosition[1]+=25
    }
}
