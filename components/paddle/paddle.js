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

let velocityX= 5
function movePaddle(){
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

var stop = false;
var frameCount = 0;
// var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(60);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    console.log(startTime);
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
        movePaddle()


        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

    }
}