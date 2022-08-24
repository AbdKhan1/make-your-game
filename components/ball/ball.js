

const ballStart = [300, 50]
let ballCurrentPosition = ballStart

let xDirection = -2 //45
let yDirection = 2

//draw Ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
  }


const grid = document.querySelector('.grid')
const ball = document.createElement("div")
ball.classList.add("ball")
grid.appendChild(ball)
drawBall()


//move ball
function moveBall() {
    if (ballCurrentPosition[0]<=0||ballCurrentPosition[0]>=(600-15)){
        xDirection=-xDirection
    }
    if (ballCurrentPosition[1]<=0||ballCurrentPosition[1]>=(window.innerHeight-15)){
        yDirection=-yDirection
    }
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    console.log(ballCurrentPosition)
    drawBall()
    // checkForCollisions()
    
}
// timerId = setInterval(moveBall, 30) 

// for (let i=0;i<1000;i++){
  
//     moveBall()
// }


var stop = false;
var frameCount = 0;
// var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;

//startAnimating(60);

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
        moveBall()


        // TESTING...Report #seconds since start and achieved fps.
        var sinceStart = now - startTime;
        var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // $results.text("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");

    }
}