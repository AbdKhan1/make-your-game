// https://youtu.be/r0sy-Cr6WHY?t=327

export function checkCollision(ball, object) {
    if (
        ball.x > object.x + object.width ||
        ball.x + ball.width < object.x ||
        ball.y > object.y + object.height ||
        ball.y + ball.height < object.y
    ) {
        // no collision
        return false;
    } else {
        // console.log("collision!!")
        return true;
    }
}
