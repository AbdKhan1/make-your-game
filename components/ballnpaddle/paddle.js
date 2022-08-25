const grid = document.querySelector('.grid')
const paddle=document.createElement('div')
paddle.classList.add('paddle')
grid.appendChild(paddle)

let paddleCurrentPos=[275,50]


function drawPaddle(){
    paddle.style.left=paddleCurrentPos[0]+'px'
    paddle.style.bottom=paddleCurrentPos[1]+'px'
}

drawPaddle()

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let velocityX= 7
export function movePaddle(){
    if (rightPressed){
    paddleCurrentPos[0]+=velocityX
}
if (leftPressed){
    paddleCurrentPos[0]+=-velocityX
}
if (paddleCurrentPos[0]<=0){
       paddleCurrentPos[0]=0 
    }
    if(paddleCurrentPos[0]>=530){
        paddleCurrentPos[0]=530
    }

drawPaddle()
}



