export let totalSeconds = 0;
export let counterSec = 0

let time = document.querySelector('#time')

export function countUpTimer() {
    
    console.log("timer", totalSeconds)
    if (stop) {
        return
    }
    ++totalSeconds;
    if (totalSeconds % 60 === 0) {
        counterSec = totalSeconds / 60
        let hour = Math.floor(counterSec / 3600);
        let minute = Math.floor((counterSec - hour * 3600) / 60);
        let seconds = (counterSec - (hour * 3600 + minute * 60));
        time.innerHTML = hour + "hr" + ":" + minute + "m" + ":" + seconds + "s";
    }
    
    return totalSeconds
}