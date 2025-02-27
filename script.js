document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("content").innerHTML = "<p>Welcome to the Football Team Owner Simulation. Select an option above to begin.</p>";
});

let draftPool = []; // Store the full draft pool

// Load the player data from JSON
fetch("players.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        draftPool = data; // Ensure `draftPool` is assigned as an array
        console.log("Draft Pool Loaded:", draftPool); // Debugging log
    })
    .catch(error => console.error("Error loading player data:", error));


function loadClass(classPeriod) {
    document.getElementById("content").innerHTML = `<h2>${classPeriod} Dashboard</h2>
        <nav>
            <button onclick="viewRosters('${classPeriod}')">View Rosters</button>
            <button onclick="viewFinances('${classPeriod}')">View Finances</button>
            <button onclick="manageFinances('${classPeriod}')">Manage Finances</button>
            <button onclick="viewStandings('${classPeriod}')">View Standings</button>
            <button onclick="inputTeamNames('${classPeriod}')">Input Team Names</button>
            <button onclick="manageRoster('${classPeriod}')">Manage Roster</button>
            <button onclick="setDraftOrder('${classPeriod}')">Set Draft Order</button>
            <button onclick="startDraft('${classPeriod}')">Start Draft</button>
        </nav>
        <div id="classContent">
            <p>Select an option above.</p>
        </div>`;
}

// Store team names
let teams = { "3rd Hour": [], "5th Hour": [] };

function inputTeamNames(classPeriod) {
    let numTeams = prompt("Enter the number of teams (max 10):");
    numTeams = Math.min(10, Math.max(2, parseInt(numTeams)));

    let teamInputs = "";
    for (let i = 0; i < numTeams; i++) {
        teamInputs += `<input type="text" id="team${i}" placeholder="Enter Team Name ${i + 1}"><br>`;
    }
    teamInputs += `<button onclick="saveTeamNames('${classPeriod}', ${numTeams})">Save Teams</button>`;

    document.getElementById("classContent").innerHTML = `<h3>Input Team Names - ${classPeriod}</h3>` + teamInputs;
}

function saveTeamNames(classPeriod, numTeams) {
    teams[classPeriod] = [];
    for (let i = 0; i < numTeams; i++) {
        let teamName = document.getElementById(`team${i}`).value;
        if (teamName) {
            teams[classPeriod].push(teamName);
        }
    }
    alert("Teams saved successfully!");
    displayTeams(classPeriod);
}

function displayTeams(classPeriod) {
    let teamList = `<h3>${classPeriod} Teams:</h3><ul>`;
    teams[classPeriod].forEach(team => {
        teamList += `<li>${team}</li>`;
    });
    teamList += "</ul>";
    document.getElementById("classContent").innerHTML += teamList;
}

// Draft logic
let draftOrder = [];
function setDraftOrder(classPeriod) {
    draftOrder = [...teams[classPeriod]];
    let orderHtml = `<h3>Set Draft Order - ${classPeriod}</h3>`;
    orderHtml += `<p>Click teams in the desired draft order.</p><ul id="draftOrderList"></ul>`;
    orderHtml += `<button onclick="startDraft('${classPeriod}')">Start Draft</button>`;

    document.getElementById("classContent").innerHTML = orderHtml;

    let draftList = document.getElementById("draftOrderList");
    teams[classPeriod].forEach(team => {
        let listItem = document.createElement("li");
        listItem.innerText = team;
        listItem.onclick = function () {
            draftOrder.push(team);
            listItem.style.fontWeight = "bold";
            listItem.onclick = null;
        };
        draftList.appendChild(listItem);
    });
}

function startDraft(classPeriod) {
    if (draftOrder.length === 0) {
        alert("Please set a draft order first.");
        return;
    }

    let draftHtml = `<h3>Draft - ${classPeriod}</h3>
        <p>Click a player to draft.</p>
        <p><strong>Round 1, Pick 1 - ${draftOrder[0]}</strong></p>
        <ul id="playerList"></ul>`;
    
    document.getElementById("classContent").innerHTML = draftHtml;

    let playerList = document.getElementById("playerList");
    draftPool.forEach(player => {
        let listItem = document.createElement("li");
        listItem.innerText = `${player.name} (${player.position}) - ${player.salary}`;
        listItem.onclick = function () {
            assignPlayerToTeam(classPeriod, player);
            listItem.style.textDecoration = "line-through";
            listItem.onclick = null;
        };
        playerList.appendChild(listItem);
    });
}

function assignPlayerToTeam(classPeriod, player) {
    let team = draftOrder.shift(); // Assigns to the first team in the draft order
    if (!team) {
        alert("Draft complete!");
        return;
    }

    alert(`${player.name} has been drafted by ${team}.`);
    draftPool = draftPool.filter(p => p !== player); // Remove drafted player

    // Show next pick
    if (draftOrder.length > 0) {
        startDraft(classPeriod);
    } else {
        alert("Draft completed for all teams!");
    }
}
