let teams = {}; // Stores team information
let players = []; // Stores drafted players
let finances = {}; // Stores financial data

function startDraft() {
    document.getElementById("output").innerHTML = "Draft has started!";
    // You will later add logic to display available players and allow selection
}

function simulateGame() {
    document.getElementById("output").innerHTML = "Game Simulation in Progress...";
    setTimeout(() => {
        document.getElementById("output").innerHTML = "Game Over! Check the results.";
    }, 2000);
}

function viewFinances() {
    document.getElementById("output").innerHTML = "Displaying team finances...";
}

