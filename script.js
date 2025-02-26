document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("content").innerHTML = "<p>Welcome to the Football Team Owner Simulation. Select an option above to begin.</p>";
});

function loadClass(classPeriod) {
    document.getElementById("content").innerHTML = `<h2>${classPeriod} Dashboard</h2>
        <nav>
            <button onclick="viewRosters('${classPeriod}')">View Rosters</button>
            <button onclick="viewFinances('${classPeriod}')">View Finances</button>
            <button onclick="manageFinances('${classPeriod}')">Manage Finances</button>
            <button onclick="viewStandings('${classPeriod}')">View Standings</button>
            <button onclick="inputTeamNames('${classPeriod}')">Input Team Names</button>
            <button onclick="manageRoster('${classPeriod}')">Manage Roster</button>
            <button onclick="startDraft('${classPeriod}')">Start Draft</button>
        </nav>
        <div id="classContent">
            <p>Select an option above.</p>
        </div>`;
}

function viewRosters(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Rosters - ${classPeriod}</h3><p>Display team rosters here.</p>`;
}

function viewFinances(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Finances - ${classPeriod}</h3><p>Display financial status of teams.</p>`;
}

function manageFinances(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Manage Finances - ${classPeriod}</h3><p>Adjust ticket, concession, and merchandise prices.</p>`;
}

function viewStandings(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Standings - ${classPeriod}</h3><p>Display league standings sorted by wins.</p>`;
}

function inputTeamNames(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Input Team Names - ${classPeriod}</h3>
        <p>Assign an NFL franchise to each team.</p>
        <input type="text" id="teamName" placeholder="Enter Team Name">
        <button onclick="saveTeamName('${classPeriod}')">Save Team</button>`;
}

function saveTeamName(classPeriod) {
    let teamName = document.getElementById("teamName").value;
    alert(`Team ${teamName} has been assigned!`);
}

function manageRoster(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Manage Rosters - ${classPeriod}</h3>
        <p>Select a team to add/drop/trade players.</p>
        <button onclick="tradePlayers('${classPeriod}')">Trade Players</button>`;
}

function tradePlayers(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Trade Players - ${classPeriod}</h3>
        <p>Select two teams and the players to trade.</p>`;
}

function startDraft(classPeriod) {
    document.getElementById("classContent").innerHTML = `<h3>Draft - ${classPeriod}</h3>
        <p>Select the draft order and pick players for each team.</p>
        <button onclick="setDraftOrder('${classPeriod}')">Set Draft Order</button>
        <div id="draftPool">Draft Pool will be displayed here.</div>`;
}

function setDraftOrder(classPeriod) {
    document.getElementById("draftPool").innerHTML = `<p>Edit the draft order. Players will be assigned to teams in order.</p>`;
}
