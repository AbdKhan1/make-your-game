import { ballSettings } from "./globalsettings.js"

// object with all the levels
export let levels = {
    // for development
    0: {
        bricks: {
            gapFromTop: ballSettings.size * 6,
            numberOfRows: 1,
            brickWidth: 90,
            brickHeight: 25,
            padding: 0,
            brickRowColors: ["#beef"]

        },
        aliens: {
            gapFromTop: ballSettings.size * 2,
            numberOfAliens: 0,
            numberOfRows: 1,
            drop: 10, //speed of the aliens moving vertically
            velocity: 1, // speed of the aliens moving horizontally
        },
        lasers: {
            speed: 4,
            cooldown: 0.25
        },
        balls: {
            numberOfBalls: 1,
        }
    },
    1: {
        bricks: {
            gapFromTop: ballSettings.size * 4,
            numberOfRows: 0,
            brickWidth: 60,
            brickHeight: 20,
            padding: 1,
            brickRowColors: ["#fff", "#fff", "#fff", "#fff", "#fff"]

        },
        aliens: {
            gapFromTop: ballSettings.size * 2,
            numberOfAliens: 1,
            numberOfRows: 1,
            drop: 15, //speed of the aliens moving vertically
            velocity: 2, // speed of the aliens moving horizontally
        },
        lasers: {
            speed: 6,
            cooldown: 0.25
        },
        balls: {
            numberOfBalls: 1,
        }
    },
    2: {
        bricks: {
            gapFromTop: ballSettings.size * 4,
            numberOfRows: 3,
            brickWidth: 60,
            brickHeight: 20,
            padding: 1,
            brickRowColors: ["#fff", "#fff", "#fff", "#fff", "#fff"]

        },
        aliens: {
            gapFromTop: ballSettings.size * 2,
            numberOfAliens: 2,
            numberOfRows: 1,
            drop: 10, //speed of the aliens moving vertically
            velocity: 1, // speed of the aliens moving horizontally
        },
        lasers: {
            speed: 4,
            cooldown: 0.25
        },
        balls: {
            numberOfBalls: 1,
        }
    },
    3: {
        bricks: {
            gapFromTop: ballSettings.size * 3.5,
            numberOfRows: 5,
            brickWidth: 60,
            brickHeight: 20,
            // marginFromWall: 0,            
            padding: 5,
            brickRowColors: ["#c44a4a", "#c36c40", "#a3a040", "#4d9e49", "#4350c5"]

        },
        aliens: {
            gapFromTop: ballSettings.size * 2,
            numberOfAliens: 4,
            numberOfRows: 2,
            drop: 9,
            velocity: 1,
        },
        lasers: {
            speed: 4.5,
            cooldown: 0.5
        },
        balls: {
            numberOfBalls: 1,
        }
    },
    4: {
        bricks: {
            gapFromTop: ballSettings.size * 3.5,
            numberOfRows: 11,
            brickWidth: 50,
            brickHeight: 15,
            // marginFromWall: 0,            
            padding: 5,
            brickRowColors: ["#75DDF9", "#fff", "#75DDF9", "#000", "#75FA9C", "#fff", "#75FA9C", "#000", "#75DDF9", "#fff", "#75FA9C"]
        },
        aliens: {
            gapFromTop: ballSettings.size,
            numberOfAliens: 5,
            numberOfRows: 1,
            drop: 15,
            velocity: 2,
        },
        lasers: {
            speed: 5,
            cooldown: 0.5
        },
        balls: {
            numberOfBalls: 1,
        }
    },
    5: {
        bricks: {
            gapFromTop: ballSettings.size * 3.5,
            numberOfRows: 6,
            brickWidth: 30,
            brickHeight: 15,
            // marginFromWall: 0,            
            padding: 5,
            brickRowColors: [ "#FFC300", "#FF5733", "#C70039", "#900C3F", "#581845"]
        },
        aliens: {
            gapFromTop: 0,
            numberOfAliens: 6 ,
            numberOfRows: 3,
            drop: 4,
            velocity: 2,
        },
        lasers: {
            speed: 2,
            cooldown: 0.5
        },
        balls: {
            numberOfBalls: 2,
        }

    }
}