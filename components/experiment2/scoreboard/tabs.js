export function addTabsToScoreboard() {
  var tabs = document.createElement("div");
  tabs.className = "tabs";

  var tabsHTML = `
  <div class="tab">
  <button class="tablinks" id="tab-how-to-play" onclick="openTab(event, 'how-to-play')">How To Play</button>
  <button class="tablinks" id="tab-about" onclick="openTab(event, 'about')">About</button>
  <button class="tablinks" id="tab-authors">Authors</button>
</div>

<div id="how-to-play" class="tabcontent">
  <h3>Get Bricked!</h3>
  <p>Spacebar <kbd>Space</kbd> to start!</p>
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
  <li>Abdul</li>
  <li>Jason</li>
  <li>Nik - <a href='google.com'> Link</a></li>
</ul> 

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
