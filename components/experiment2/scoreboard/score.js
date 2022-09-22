import { scoreSettings, sounds } from "../globalsettings.js"

const score = document.querySelector('#score')

function updateScore(newscore) {
    score.innerHTML = newscore
}


export function calculateScore(currentScore, brickHits, collisionObject) {
    switch(collisionObject){
        case "brick":
            let alienLength=document.querySelectorAll(".alien").length
            if (alienLength!=0){
                currentScore+=( scoreSettings.brick *(alienLength))
            }else{
                currentScore+=( scoreSettings.brick)
            }
        
            if(brickHits%scoreSettings.comboCount===0){
                currentScore += (scoreSettings.multiplierPoints *(brickHits/scoreSettings.comboCount))
            }

            break
        
        case "alien":
            currentScore+=scoreSettings.alien
            break
        
        case "laser":
            currentScore+=scoreSettings.laser
            break
    }
    
    //update the new score
    updateScore(currentScore)
    return currentScore
        
}