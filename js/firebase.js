// var config = {
//   apiKey: "AIzaSyAPDOwQrPFJTdIJHG87Zau4wx_3sOTSjpE",
//   authDomain: "rps-multiplayer-a2226.firebaseapp.com",
//   databaseURL: "https://rps-multiplayer-a2226.firebaseio.com",
//   projectId: "rps-multiplayer-a2226",
//   storageBucket: "rps-multiplayer-a2226.appspot.com",
//   messagingSenderId: "1033516579006",
//   appId: "1:1033516579006:web:530151d1b3310a20"
// };

// firebase.initializeApp(config);

// var database = firebase.database();
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");

// connectedRef.on("value", function(data) {
//   if (data.val()) {
//     var con = connectionsRef.push(true);
//     con.onDisconnect().remove();
//   }
// });

// connectionsRef.on("value", function(data) {
//   $("#connected-viewers").text(data.numChildren());
// });

// $("#rock").on("click", function() {
//     database.ref().set({
//       Player1: "Rock",
//       Player2: ""
//     });
//   });
//   $("#paper").on("click", function() {
//     database.ref().set({
//       Player1: "Paper",
//       Player2: ""
//     });
//   });
//   $("#scissors").on("click", function() {
//     database.ref().set({
//       Player1: "Scissors",
//       Player2: ""
//     });
//   });
