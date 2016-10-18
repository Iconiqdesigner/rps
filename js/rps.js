

//RUN THE PROGRAM
function runProgram() {
  clearResultsLists("user-choices", "computer-choices", "match-results")

  var gameLimit = setNumGames();
  var currentGame = 1;

  var winArray = [0, 0, 0];

  while (currentGame <= gameLimit) {
    var userChoice = getUserSelection(currentGame);
    var computerChoice = getCompSelection();
    var winner = getWinner(computerChoice, userChoice);
    var finalWinCount = countWins(winArray, winner);
    currentGame++
  }

    printWins(finalWinCount);
}


//Clear uls on creation of a new game.
function clearResultsLists(userList, computerList, resultsList) {
  document.getElementById(userList).innerHTML = "";
  document.getElementById(computerList).innerHTML = "";
  document.getElementById(resultsList).innerHTML = "";
}

function countWins(winArray, winner) {
  if (winner === "user") {
    winArray[0]++;
  } else if (winner === "computer") {
    winArray[1]++;
  } else {
    winArray[2]++;
  }
  return winArray
}

//Populate uls at end of game
function addListItem(user, selection) {
  var ul = document.getElementById(user);
  var li = document.createElement("li");
  li.className += "throws-" + selection;
  ul.appendChild(li);
}

//Turn plurals to singular
function formatUserResponse(response) {
  response = response.trim().toLowerCase();

  var lastLetter = response.length -1 ;
  if(response.charAt(lastLetter) === "s") {
    response = response.slice(0, lastLetter);
  }
  var singularResponse = response;
  return singularResponse;

}

function printWins(winCounts) {
  var userGames = (winCounts[0] === 1) ? "game" : "games";
  var computerGames = (winCounts[1] === 1) ? "game" : "games";
  var tieGames = (winCounts[2] === 1) ? "tie" : "ties";
  var tieTense = (winCounts[2] === 1) ? "was" : "were";
  document.getElementById('scorekeeper').innerHTML = "You won " + winCounts[0] + " " + userGames + ". The computer won " + winCounts[1] + " " + computerGames + ". There " + tieTense + " " + winCounts[2] + " " + tieGames + ".";
}

//LET THE USER SET A SPECIFIC NUMBER OF GAMES TO PLAY
function setNumGames() {
  //Ask the user if they want to play
  var numOfGames = prompt("How many games of Rock, Paper, Scissors would you like to play?");
  //If they hit cancel
  if (numOfGames === null) {
    return;
  }
  //Turn the value into a number
  numOfGames = Math.floor(parseInt(numOfGames, 10));
  //If check if the value is NaN
  if (isNaN(numOfGames)) {
    while (isNaN(numOfGames)) {
      //Ask them again
      var numOfGames = prompt("Sorry, we need your answer as a number, how many games of Rock, Paper, Scissors would you like to play?");
      //If they cancel
      if (numOfGames === null) { break; }
      //Turn their value into a number and do it all again
      numOfGames = parseInt(numOfGames, 10);
    }
  }
  return numOfGames;
}

function getUserSelection(gameNumber) {
  var checkSelection = prompt("Make your choice for game " + gameNumber + ". Choose 'rock', 'paper', or 'scissors'.");
  checkSelection = formatUserResponse(checkSelection);
  //console.log(checkSelection);
  //Strip any extra spaces and transform the option to lowercase
  //If the user makes any selection other than Rock, rock, Paper, paper, Scissors, or scissors
  if ((checkSelection != "rock") && (checkSelection != "paper") && (checkSelection != "scissor")) {
    //Keep asking until they either cancel or give the right answer
    while (checkSelection != "rock" && checkSelection != "paper" && checkSelection != "scissors") {
      var checkSelection = prompt("Sorry, you have to choose 'rock', 'paper', or 'scissors'.");
      checkSelection = formatUserResponse(checkSelection);
    }
    //ENDWHILE
  }
  //ENDIF
  addListItem("user-choices", checkSelection);
  //Returns the value of checkSelection
  return checkSelection;
}

function getCompSelection() {
  //Setup an array of all the possible choices the computer could make
  var availableOptions = ["rock", "paper", "scissor"];
  //Return a random value from the array
  var computerChoice = availableOptions[Math.floor(Math.random() * availableOptions.length)];
  addListItem("computer-choices", computerChoice);
  return computerChoice;
}

function getWinner(computerChoice, userChoice, currentGame) {
  var matchResult = "";
  var whoWon = "";

  if (computerChoice === userChoice) {
    matchResult = "tie";
    whoWon = "tie";
  } else if (computerChoice === "rock") {
    if (userChoice === "paper") {
      matchResult = "win";
      whoWon = "user";
    } else {
      matchResult = "loss";
      whoWon = "computer";
    }
  }  else if (computerChoice === "paper") {
    if (userChoice === "scissor") {
      matchResult = "win";
      whoWon = "user";
    } else {
      matchResult = "loss";
      whoWon = "computer";
    }
  }  else {
    if (userChoice === "rock") {
      matchResult = "win";
      whoWon = "user";
    } else {
      matchResult = "loss";
      whoWon = "computer";
    }
  }
  //Add the match result to the match result list
  addListItem("match-results", matchResult);
  return whoWon;
}
