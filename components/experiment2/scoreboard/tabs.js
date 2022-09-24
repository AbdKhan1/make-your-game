import { levels } from '../levels.js';

export function addTabsToScoreboard() {
  var tabs = document.createElement("div");
  tabs.className = "tabs";

  var tabsHTML = `
  <div class="tab">
  <button class="tablinks" id="tab-how-to-play" onclick="openTab(event, 'how-to-play')">How To Play</button>
  <button class="tablinks" id="tab-about" onclick="openTab(event, 'about')">About</button>
  <button class="tablinks" id="tab-authors">Authors</button>
  <button class="tablinks" id="tab-levels">Levels</button>
  <button class="tablinks" id="tab-customize">Customize</button>
</div>

<div id="how-to-play" class="tabcontent">
  <h3>Get Bricked!</h3>
  <p><kbd>Space</kbd> to start and launch ball! Left <kbd>&#8592</kbd> and Right <kbd>&#8594</kbd> to move paddle.</p>
  <p>Escape <kbd>Esc</kbd> to pause/continue</p>
</div>

<div id="about" class="tabcontent">
  <h3>Homage to S. Wozniak and T. Nishikado.</h3>
  <p>Breakout is an arcade video game developed and published by Atari 1976. It was designed by Steve Wozniak </p> 
  <p>Space Invaders 1978 shoot 'em up arcade game developed by Tomohiro Nishikado</p> 
</div>

<div id="authors" class="tabcontent">
  <h3>Built using Vanilla JS, CSS, HTML</h3>
  <p>Using no canvas, maintaining 60 fps using request animation frame</p>
  <p>2022 September, by authors: </p>
    <ul>
  <li>Abdul Raheem- <a target=”_blank” href='https://www.linkedin.com/in/abd-al-raheem-khan-898a21246'>LinkedIn</a></li>
  <li>Jason Asante - <a target=”_blank” href='https://www.linkedin.com/in/jason-asante'> LinkedIn</a></li>
  <li>Nik Don - <a target=”_blank” href='https://www.linkedin.com/in/nikdon'> LinkedIn,</a> 
  <a target=”_blank” href='https://github.com/nik-don'> GitHub</a></li>
</ul> 
</div>

<div id="levels" class="tabcontent">
  <h3>Select Level</h3>
 <ul><li><a href="?lvl=0">Level 0</a></li><li><a href="?lvl=1">Level 1</a></li><li><a href="?lvl=2">Level 2</a></li><li><a href="?lvl=3">Level 3</a></li><li><a href="?lvl=4">Level 4</a></li><li><a href="?lvl=5">Level 5</a></li></ul>
  </div>

</div>

<div id="customize" class="tabcontent">
  <h3>Choose your custom colours:</h3>

  <div>
      <input type="color" id="ball-colour-id" name="ball-colour"
            value="#e66465">
      <label for="ball-colour">Ball Colour</label>
  </div>

  <div>
      <input type="color" id="paddle-colour-id" name="paddle-colour"
              value="#f6b73c">
      <label for="paddle-colour">Paddle Colour</label>
  </div>

</div>
`;

  tabs.innerHTML = tabsHTML;
  document.querySelector(".right").appendChild(tabs);

  openTab("how-to-play");

  document.querySelector("#tab-how-to-play").addEventListener("click", () => {
    openTab("how-to-play");
  });
  document.querySelector("#tab-about").addEventListener("click", () => {
    openTab("about");
  });
  document.querySelector("#tab-authors").addEventListener("click", () => {
    openTab("authors");
  });
  document.querySelector("#tab-levels").addEventListener("click", () => {
    openTab("levels");
  });
  document.querySelector("#tab-customize").addEventListener("click", () => {
    openTab("customize");
  });

  let ballColorPicker = document.querySelector("#ball-colour-id");
  ballColorPicker.addEventListener("input", updateBall, false);

  let paddleColorPicker = document.querySelector("#paddle-colour-id");
  paddleColorPicker.addEventListener("input", updatePaddle, false);

}

function updateBall(event) {
  // console.log('chosen color', event.target.value);
  const p = document.querySelector(".ball");
  if (p) {
    p.style.backgroundColor = event.target.value;
  }
}
function updatePaddle(event) {
  // console.log('chosen color', event.target.value);
  const p = document.querySelector(".paddle");
  if (p) {
    p.style.backgroundColor = event.target.value;
  }
}


function openTab(tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  document.getElementById("tab-" + tabName).classList.add("active");
}


// create links to all levels
function createLevelLinks() {

  // length of Object
  var levelsLength = Object.keys(levels).length;
  console.log(levelsLength);

  var levelLinks = document.createElement("div");
  levelLinks.className = "level-links";
  var levelLinksHTML = "<ul>";
  for (var i = 0; i < levelsLength; i++) {
    levelLinksHTML += `<li><a href="?lvl=${i}">Level ${i}</a></li>`;
  }
  levelLinksHTML += "</ul>";

  console.log(levelLinksHTML);
}