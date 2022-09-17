import { ballSettings } from "./globalsettings.js"

export let currentLevel = 0
// object with all the levels
export let levels = {
    // for development
    0: {
        bricks: {
            gapFromTop: ballSettings.size * 4,
            numberOfRows: 3,
            brickWidth: 60,
            brickHeight: 20,
            // marginFromWall: 0,            
            padding: 1,
            brickRowColors: ["#fff", "#fff", "#fff", "#fff", "#fff"]

        },
        aliens: {
            gapFromTop: ballSettings.size * 2,
            numberOfAliens: 4,
            numberOfRows: 1,
            drop:10, //speed of the aliens moving vertically
            velocity:1, // speed of the aliens moving horizontally
            laserSpeed:4
        }
    },
    1: {
        bricks: {
            numberOfRows: 5,
            brickWidth: 60,
            brickHeight: 20,
            // marginFromWall: 0,            
            padding: 5,
            brickRowColors: ["#c44a4a", "#c36c40", "#a3a040", "#4d9e49", "#4350c5"]

        },
        aliens:{
            numberOfAliens: 3,
            numberOfRows: 2,
            drop:12, 
            velocity:1,
            laserSpeed:4.5
        }
    },
    5: {
        bricks: {
            numberOfRows: 11,
            brickWidth: 30,
            brickHeight: 15,
            // marginFromWall: 0,            
            padding: 5,
            brickRowColors: ["#75DDF9", "#fff", "#75DDF9", "#000", "#75FA9C", "#fff", "#75FA9C", "#000", "#75DDF9", "#fff", "#75FA9C"]
        },
        aliens:{
            numberOfAliens: 3,
            numberOfRows: 2,
            drop:20, 
            velocity:2,
            laserSpeed:5
        }
    }
}