const time=document.querySelector('#time')

export function countUpTimer(stop, framePerSecond) {
  if (stop) {
    return
  }
  framePerSecond++;
  if (framePerSecond % 60 === 0) {
    let counterSec = framePerSecond / 60
    let hour = Math.floor(counterSec / 3600);
    let minute = Math.floor((counterSec - hour * 3600) / 60);
    let seconds = (counterSec - (hour * 3600 + minute * 60));
    time.innerHTML =  minute + "m" + ":" + seconds + "s";
  }   
}