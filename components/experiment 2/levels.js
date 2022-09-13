// object with all the levels
export let levels = {
    // for development
    0: {
        bricks: {
            numberOfRows: 3,
            brickWidth: 60,
            brickHeight: 20,
            // marginFromWall: 0,            
            padding: 1,
            brickRowColors: ["#fff", "#fff", "#fff", "#fff", "#fff"]

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

        }
    }
}