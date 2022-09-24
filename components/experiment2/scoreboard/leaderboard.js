import { score, resetScore } from '../ball.js';
import { timeplayed } from './timer.js';

let APP_ID = 'o5IcLhGkOogJO1LXYFMQcdlQUnk19Tx9dqme620P';
let JS_KEY = 'PXq9bu0TALOcNbOO6PrLOgNiLjU3HP0H2YPA8Pry';

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export async function saveNewScore(name, score, time, level) {
    const leaderboard = new Parse.Object('Leaderboard' + level);
    // trim the length of the name to 5 characters
    name = name.substring(0, 5);

    leaderboard.set('name', name);
    leaderboard.set('score', score);
    leaderboard.set('time', time);
    try {
        let result = await leaderboard.save();
        console.log('New object created with objectId: ' + result.id);
    } catch (error) {
        // alert("Failed to create new object, with error code: " + error.message);
    }
}

export async function retrieveLeaderboard(level) {
    //Create your Parse Query, and define the class it will be searched
    const query = new Parse.Query('Leaderboard' + level);
    query.descending('score');
    //add another sorting condition, not overriding previous one.
    query.addAscending('time');
    query.limit(5);

    try {
        const results = await query.find();

        let headers = ['RANK', 'NAME', 'SCORE', 'TIME'];
        let table = document.createElement('TABLE'); //makes a table element for the page
        table.setAttribute('class', 'leaderboard');

        // log the ids of the objects
        for (let i = 0; i < results.length; i++) {
            let object = results[i];
            let row = table.insertRow();
            row.insertCell(0).innerHTML = i + 1;
            row.insertCell(1).innerHTML = object.get('name');
            row.insertCell(2).innerHTML = object.get('score');
            row.insertCell(3).innerHTML = convertTime(object.get('time'));
        }

        let header = table.createTHead();
        let headerRow = header.insertRow(0);
        for (let i = 0; i < headers.length; i++) {
            headerRow.insertCell(i).outerHTML = `<th>${headers[i]}</th>`;
            //cannot use innerhtml.. as it would be inserted as a <td>
            //  headerRow.insertCell(i).innerHTML = ;
        }
        table.style.color = 'white';

        document.querySelector('.right').appendChild(table);
    } catch (error) {
        // alert(`Failed to retrieve the object, with error code: ${error.message}`);
    }
}

export async function isTopScore(userscore, level, limit) {
    const query = new Parse.Query('Leaderboard' + level);
    query.descending('score');
    query.addAscending('time');
    query.limit(limit);

    try {
        const results = await query.find();

        // check if the userscore is greater than the lowest score in the leaderboard
        if (userscore > results[results.length - 1].get('score')) {
            return true;
        }

        return false;
    } catch (error) {
        // alert(`Failed to retrieve the object, with error code: ${error.message}`);
    }
}

document
    .getElementById('saveScore')
    .addEventListener('click', async function (e) {
        let input = document.getElementById('name'),
            val = input.value.trim();
        if (val === '') {
            alert('Please fill in name');
            input.focus();
        }
        //set max length of name to 5 characters
        if (val.length > 5) {
            alert('Please enter a name with less than 5 characters');
            input.focus();
        }

        if (val.length < 6 && (await checkProfanity(val))) {
            alert('Please do not use profanity in your name');
            input.focus();
        } else {
            console.log('submitting score for', val, timeplayed);
            let level = document.getElementById('level').innerHTML;
            saveNewScore(val, score, timeplayed, level);
            resetScore();

            let hiscoreDisplay = document.querySelector('.new-hiscore');
            hiscoreDisplay.style.display = 'none';
        }
    });

document
    .getElementById('saveScore-completed')
    .addEventListener('click', async function (e) {
        let input = document.getElementById('name-completed'),
            val = input.value.trim();

        if (val === '') {
            alert('Please fill in name');
            input.focus();
        }
        //set max length of name to 5 characters
        if (val.length > 5) {
            alert('Please enter a name with less than 5 characters');
            input.focus();
        }

        if (val.length < 6 && (await checkProfanity(val))) {
            alert('Please do not use profanity in your name');
            input.focus();
        } else {
            console.log('submitting score for', val);
            let level = document.getElementById('level').innerHTML;
            saveNewScore(val, score, timeplayed, level);
            resetScore();

            let hiscoreDisplay = document.querySelector(
                '.new-hiscore-completed'
            );
            hiscoreDisplay.style.display = 'none';
        }
    });

export async function randomScoreGen(amount, level) {
    for (let i = 0; i < amount; i++) {
        let r = (Math.random() + 1).toString(36).substring(9);
        await saveNewScore(
            r.toUpperCase(),
            Math.floor(Math.random() * (999 - 100 + 1) + 100),
            Math.floor(Math.random() * (360 - 100 + 1) + 100),
            level
        );
    }
}

// function to check profanity in the name input
async function checkProfanity(name) {
    let profanity = false;

    // send to reqest to the profanity api
    let response = await fetch(
        'https://www.purgomalum.com/service/containsprofanity?text=' + name
    );
    let data = await response.json();

    // if the response is true, then the name contains profanity
    if (data) {
        profanity = true;
    }

    return profanity;
}

// function to convert seconds to minutes and seconds
function convertTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    //return string of minutes and seconds
    return `${minutes}m ${seconds}s`;
}

//function get number of entries in leaderboard
export async function getLeaderboardSize(level) {
    const query = new Parse.Query('Leaderboard' + level);
    try {
        const results = await query.find();
        console.log(results.length);
        return results.length;
    } catch (error) {
        // alert(`Failed to retrieve the object, with error code: ${error.message}`);
    }
}
