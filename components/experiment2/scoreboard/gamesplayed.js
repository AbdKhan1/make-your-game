import { getLeaderboardSize } from "./leaderboard.js"

export async function updateGamesPlayed(level) {
    let gamesPlayed = document.createElement('div')
    gamesPlayed.id = 'games-played'
    gamesPlayed.innerHTML = "<hr>" + await getLeaderboardSize(level)  + " Number of games played and saved. Don't Forget to save your score!" 

    document.getElementById('how-to-play').appendChild(gamesPlayed)
}