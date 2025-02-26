document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("content").innerHTML = "<p>Welcome to the Football Team Owner Simulation. Select an option above to begin.</p>";
});

function loadDraft(classPeriod) {
    document.getElementById("content").innerHTML = `<h2>${classPeriod} Draft</h2>
        <p>Click on a player to draft them. Once selected, they will be removed from the pool.</p>
        <div id="draftPool"></div>`;
    generateDraftPool(classPeriod);
}

function generateDraftPool(classPeriod) {
    const draftPool = document.getElementById("draftPool");
    draftPool.innerHTML = "";
    const players = getDraftPlayers(classPeriod);
    players.forEach(player => {
        let playerElement = document.createElement("button");
        playerElement.textContent = `${player.name} (${player.position}) - $${player.salary}M`;
        playerElement.onclick = function () { draftPlayer(classPeriod, player); };
        draftPool.appendChild(playerElement);
    });
}

function draftPlayer(classPeriod, player) {
    alert(`${player.name} has been drafted!`);
    removeFromDraftPool(classPeriod, player);
    generateDraftPool(classPeriod);
}

function removeFromDraftPool(classPeriod, player) {
    let players = getDraftPlayers(classPeriod);
    let updatedPlayers = players.filter(p => p.name !== player.name);
    saveDraftPlayers(classPeriod, updatedPlayers);
}

function saveDraftPlayers(classPeriod, players) {
    localStorage.setItem(`draftPool_${classPeriod}`, JSON.stringify(players));
}

function getDraftPlayers(classPeriod) {
    let storedPlayers = localStorage.getItem(`draftPool_${classPeriod}`);
    return storedPlayers ? JSON.parse(storedPlayers) : generateDefaultPlayers();
}

function generateDefaultPlayers() {
    return [
        { name: "Darnell Hayes", position: "QB", salary: 50 },
        { name: "Jamal Foster", position: "RB", salary: 18 },
        { name: "Shawn McAllister", position: "WR", salary: 35 },
        { name: "Kyle Thornton", position: "TE", salary: 17 },
        { name: "Iron Titans", position: "OL", salary: 56 },
        { name: "Unit Alpha", position: "DEF", salary: 105 }
    ];
}

function loadStandings() {
    document.getElementById("content").innerHTML = "<h2>League Standings</h2><p>Standings will be updated after each game.</p>";
}

function loadFinances() {
    document.getElementById("content").innerHTML = "<h2>Team Finances</h2><p>Financial reports will be shown here after each game.</p>";
}

function runGameSimulation() {
    document.getElementById("content").innerHTML = "<h2>Simulating Games...</h2><p>Game results will be displayed shortly.</p>";
    setTimeout(() => {
        document.getElementById("content").innerHTML = "<h2>Game Results</h2><p>Games have been simulated. Check the standings and finances for details.</p>";
    }, 3000);
}

function manageTeamPrices() {
    document.getElementById("content").innerHTML = "<h2>Manage Prices</h2><p>Adjust your ticket and concession prices here.</p>";
}
