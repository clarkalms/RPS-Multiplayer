// Firebase
var config = {
  apiKey: "AIzaSyAPDOwQrPFJTdIJHG87Zau4wx_3sOTSjpE",
  authDomain: "rps-multiplayer-a2226.firebaseapp.com",
  databaseURL: "https://rps-multiplayer-a2226.firebaseio.com",
  projectId: "rps-multiplayer-a2226",
  storageBucket: "rps-multiplayer-a2226.appspot.com",
  messagingSenderId: "1033516579006",
  appId: "1:1033516579006:web:530151d1b3310a20"
};

firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function (data) {
  if (data.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function (data) {
  $("#connected-viewers").text(data.numChildren());
});

//Gameplay Code
const choices = document.querySelectorAll(".choices");
const score = $("#score");
const result = $("#result");
const start = $("#start");
const restart = $("#restart");
const modal = document.querySelector(".modal");
let scoreboard = {
  player1: 0,
  player2: 0
};
let PlayerOneSelection = [];
let PlayerTwoSelection = [];

var play = function (event) {
  restart[0].style.display = "inline-block";
  let player1Choice = event.target.id;
  let player2Choice = getPlayer2Choice();
  const winner = getWinner(player1Choice, player2Choice);
//   $("#title").text("Player 2: Make your selection");
  showWinner(winner, player1Choice, player2Choice);
};

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

var PlayerOneWinner = function(player1, player2){
	database.ref().set({
        Player1: player1,
        Player2: player2,
        Winner: "Player1",
        Player1Score: scoreboard.player1,
        Player2Score: scoreboard.player2
    
  });
};

var PlayerTwoWinner = function(player1, player2){
	database.ref().set({
        Player1: player1,
        Player2: player2,
        Winner: "Player2",
        Player1Score: scoreboard.player1,
        Player2Score: scoreboard.player2
  });
};

var Draw = function(player1, player2){
	database.ref().set({
		Player1: player1,
		Player2: player2,
		Winner: "Draw",
		Player1Score: scoreboard.player1,
		Player2Score: scoreboard.player2
	  })
};

var getWinner = function (player1, player2) {
  if (player1 === player2) {
    Draw(player1, player2);
    return "Draw";
  } else if (player1 === "rock") {
    if (player2 === "paper") {
      scoreboard.player2++;
      PlayerTwoWinner(player1, player2);
      return "player2";
    } else {
      scoreboard.player1++;
	  PlayerOneWinner(player1, player2);
      return "player1";
    }
  } else if (player1 === "paper") {
    if (player2 === "scissors") {
      scoreboard.player2++;
      PlayerTwoWinner(player1, player2);
      return "player2";
    } else {
      scoreboard.player1++;
	  PlayerOneWinner(player1, player2);
      return "player1";
    }
  } else if (player1 === "scissors") {
    if (player2 === "rock") {
      scoreboard.player2++;
      PlayerTwoWinner(player1, player2);
      return "player2";
    } else {
      scoreboard.player1++;
      PlayerOneWinner(player1, player2);
      return "player1";
    }
  }
};

var showWinner = function (winner, player1Choice, player2Choice) {
  if (winner === "player1") {
    result[0].innerHTML = `
      <h1 class='text-win'>Player 1 Wins!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() + player1Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player1Choice} fa-10x"></i></p>
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() + player2Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  } else if (winner === "player2") {
    result[0].innerHTML = `
      <h1 class='text-lose'>Player 2 Wins!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() + player1Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player1Choice} fa-10x"></i></p>      
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() +player2Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  } else {
    result[0].innerHTML = `
      <h1>It's A Draw... Try Again!</h1>
      <p>Player 1 Chose: <strong>${player1Choice.charAt(0).toUpperCase() + player1Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player1Choice} fa-10x"></i></p>    
      <p id="player2">Player 2 Chose: <strong>${player2Choice.charAt(0).toUpperCase() + player2Choice.slice(1)}</strong>
      <i class="fas fa-hand-${player2Choice} fa-10x"></i></p>
      `;
  }
  score[0].innerHTML = `
  <p>Player 1 Score: ${scoreboard.player1}</p>
  <p>Player 2 Score: ${scoreboard.player2}</p> 
  `;
  modal.style.display = "inline-block";
};

var clearModal = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var restartGame = function () {
  scoreboard.player1 = 0;
  scoreboard.player2 = 0;
  score[0].innerHTML = `
    <p>Player 1 Score: 0</p>
    <p>Player 2 Score: 0</p>
    `;
  restart[0].style.display = "none";
  start[0].style.display = "inline-block";
  database.ref().set({
    Game: "Press 'Start Game' To Play"
  });
};

var startGame = function () {
  choices[0].style.display = "inline-block";
  start[0].style.display = "none";
  restart[0].style.display = "inline-block";
  $("#title").text("Player 1: Make your selection.");
  database.ref().set({
    Player1: "Make Your Choice",
    Player2: "Make Your Choice",
    Winner: "Play Game To See Who Wins!",
    Player1Score: 0,
    Player2Score: 0
  });
};

choices.forEach(choice => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
$("#restart").on("click", restartGame);
$("#start").on("click", startGame);
