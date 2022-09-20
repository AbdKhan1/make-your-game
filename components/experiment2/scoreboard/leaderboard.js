let APP_ID = 'o5IcLhGkOogJO1LXYFMQcdlQUnk19Tx9dqme620P'
let JS_KEY = 'PXq9bu0TALOcNbOO6PrLOgNiLjU3HP0H2YPA8Pry'

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'

export async function saveNewScore(name, score) {
    const leaderboard = new Parse.Object("Leaderboard");

    leaderboard.set("name", name);
    leaderboard.set("score", score);
    try {
        let result = await leaderboard.save()
        alert('New object created with objectId: ' + result.id);
    } catch (error) {
        alert('Failed to create new object, with error code: ' + error.message);
    }
}

export async function retrieveLeaderboard() {
    //empty object to store the results
    let leaderboard = {}
    //Create your Parse Query, and define the class it will be searched
    const query = new Parse.Query("Leaderboard");
    query.descending('score');
    query.limit(5);

    try {
        const results = await query.find();

        let headers = [
            "NAME",
            "SCORE",
          ];
          let table = document.createElement("TABLE"); //makes a table element for the page
          table.setAttribute("class", "leaderboard");
          
           // log the ids of the objects
            for (let i = 0; i < results.length; i++) {
            let object = results[i];
            // console.log(object.get('name'), object.get('score'));
            // leaderboard[object.get('name')] = object.get('score')
            //make json object
            // leaderboard = {
            //     ...leaderboard,
            //     [object.get('name')]: object.get('score')
            // }
            let row = table.insertRow();
            row.insertCell(0).innerHTML = object.get('name');
            // row.insertCell(1).innerHTML = player.time;
            row.insertCell(1).innerHTML = object.get('score');
        }
          
          let header = table.createTHead();     
          let headerRow = header.insertRow(0);
          for (let i = 0; i < headers.length; i++) {
            headerRow.insertCell(i).outerHTML = `<th>${headers[i]}</th>`;
            //cannot use innerhtml.. as it would be inserted as a <td>
            //  headerRow.insertCell(i).innerHTML = ;
          }
          table.style.color = 'white';
          
          document.querySelector(".right").appendChild(table);
       
        return leaderboard

    } catch (error) {
        alert(`Failed to retrieve the object, with error code: ${error.message}`);
    }

}

export async function isTopScore(userscore, limit) {
    const query = new Parse.Query("Leaderboard");
    query.descending('score');
    query.limit(limit);

    try {
        const results = await query.find();

        // check if the userscore is greater than the lowest score in the leaderboard
        if (userscore > results[results.length - 1].get('score')) {
            return true
        } 
       
        return false

    } catch (error) {
        alert(`Failed to retrieve the object, with error code: ${error.message}`);
    }

}