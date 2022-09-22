import { score } from "../ball.js";

let APP_ID = "o5IcLhGkOogJO1LXYFMQcdlQUnk19Tx9dqme620P";
let JS_KEY = "PXq9bu0TALOcNbOO6PrLOgNiLjU3HP0H2YPA8Pry";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

export async function saveNewScore(name, score, level) {
  const leaderboard = new Parse.Object("Leaderboard" + level);

  leaderboard.set("name", name);
  leaderboard.set("score", score);
  try {
    let result = await leaderboard.save();
    // alert("New object created with objectId: " + result.id);
  } catch (error) {
    // alert("Failed to create new object, with error code: " + error.message);
  }
}

export async function retrieveLeaderboard(level) {
  //Create your Parse Query, and define the class it will be searched
  const query = new Parse.Query("Leaderboard" + level);
  query.descending("score");
  query.limit(5);

  try {
    const results = await query.find();

    let headers = ["NAME", "SCORE"];
    let table = document.createElement("TABLE"); //makes a table element for the page
    table.setAttribute("class", "leaderboard");

    // log the ids of the objects
    for (let i = 0; i < results.length; i++) {
      let object = results[i];
      let row = table.insertRow();
      row.insertCell(0).innerHTML = object.get("name");
      row.insertCell(1).innerHTML = object.get("score");
    }

    let header = table.createTHead();
    let headerRow = header.insertRow(0);
    for (let i = 0; i < headers.length; i++) {
      headerRow.insertCell(i).outerHTML = `<th>${headers[i]}</th>`;
      //cannot use innerhtml.. as it would be inserted as a <td>
      //  headerRow.insertCell(i).innerHTML = ;
    }
    table.style.color = "white";

    document.querySelector(".right").appendChild(table);
  } catch (error) {
    // alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}

export async function isTopScore(userscore, level, limit) {
  const query = new Parse.Query("Leaderboard" + level);
  query.descending("score");
  query.limit(limit);

  try {
    const results = await query.find();

    // check if the userscore is greater than the lowest score in the leaderboard
    if (userscore > results[results.length - 1].get("score")) {
      return true;
    }

    return false;
  } catch (error) {
    // alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}

document.getElementById("saveScore").addEventListener("click", function (e) {
  let input = document.getElementById("name"),
    val = input.value.trim();
  if (val === "") {
    alert("Please fill in name");
    input.focus();
  } else {
    console.log("submitting score for", val);
    let level = document.getElementById("level").innerHTML
    saveNewScore(val, score, level);
  }
  let hiscoreDisplay = document.querySelector(".new-hiscore");
  hiscoreDisplay.style.display = "none"
});

document.getElementById("saveScore-completed").addEventListener("click", function (e) {
  let input = document.getElementById("name-completed"),
    val = input.value.trim();
  if (val === "") {
    alert("Please fill in name");
    input.focus();
  } else {
    console.log("submitting score for", val);
    let level = document.getElementById("level").innerHTML
    saveNewScore(val, score, level);
  }
  let hiscoreDisplay = document.querySelector(".new-hiscore-completed");
  hiscoreDisplay.style.display = "none"
});

export async function randomScoreGen(amount, level) {
  for (let i = 0; i < amount; i++) {
    let r = (Math.random() + 1).toString(36).substring(9);
    await saveNewScore(r.toUpperCase(), Math.floor(Math.random() * (999 - 100 + 1) + 100), level)
  }
}