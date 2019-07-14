const choices = document.querySelectorAll(".choices");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = {
  player1: 0,
  player2: 0
};

//Play Game
var play = function (event) {
  restart.style.display = "inline-block";
  let player1Choice = event.target.id;
  let player2Choice = getPlayer2Choice();
  const winner = getWinner(player1Choice, player2Choice);
  showWinner(winner, player1Choice, player2Choice);

  console.log(player1Choice, player2Choice, winner);
};

//Player 2 Choice
var getPlayer2Choice = function () {
  const randNum = Math.random();
  if (randNum < 0.34) {
    return "rock";
  } else if (randNum <= 0.67) {
    return "paper";
  } else {
    return "scissors";
  }
};

//Get Winner
var getWinner = function (player1, player2) {
  if (player1 === player2) {
    return "Draw";
  } else if (player1 === "rock") {
    if (player2 === "paper") {
      return "player2";
    } else {
      return "player1";
    }
  } else if (player1 === "paper") {
    if (player2 === "scissors") {
      return "player2";
    } else {
      return "player1";
    }
  } else if (player1 === "scissors") {
    if (player2 === "rock") {
      return "player2";
    } else {
      return "player1";
    }
  }
};

//Show Winner
var showWinner = function (winner, player1Choice, player2Choice) {
  if (winner === "player1") {
    scoreboard.player1++;
    result.innerHTML = `
      <h1 class='text-win'>Player 1 Wins!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() +
        player1Choice.slice(1)}</strong><i class="fas fa-hand-${player1Choice} fa-10x"></i></p>
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() + 
        player2Choice.slice(1)}</strong><i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  } else if (winner === "player2") {
    scoreboard.player2++;
    result.innerHTML = `
      <h1 class='text-lose'>Player 2 Wins!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() + 
        player1Choice.slice(1)}</strong><i class="fas fa-hand-${player1Choice} fa-10x"></i></p>      
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() +
        player2Choice.slice(1)}</strong><i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw... Try Again!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() +
        player1Choice.slice(1)}</strong><i class="fas fa-hand-${player1Choice} fa-10x"></i></p>    
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() +
        player2Choice.slice(1)}</strong><i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  }
  score.innerHTML = `
  <p>Player 1 Score: ${scoreboard.player1}</p>
  <p>Player 2 Score: ${scoreboard.player2}</p> 
  `;
  modal.style.display = "inline-block";
};

//Clear Modal
var clearModal = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Restart Game
var restartGame = function () {
  scoreboard.player1 = 0;
  scoreboard.player2 = 0;
  score.innerHTML = `
    <p>Player 1 Score: 0</p>
    <p>Player 2 Score: 0</p>
    `;
  restart.style.display = "none";
};
//Event Listeners
choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);