// https://youtu.be/r0sy-Cr6WHY?t=327

// when cleaning the this function remove the 'a.y > b.y + b.height' as the ball
// would be underneath the paddle and therefore should not bounce (it will )
export function checkCollision(ball,paddle) {

    if (ball.x > paddle.x + paddle.width ||
        ball.x + ball.width < paddle.x ||
        ball.y > paddle.y + paddle.height ||
        ball.y + ball.height < paddle.y) {
        // no collision
        return false
    } else {
        // console.log("collision!!")
        return true
    }


}