alert("Hallo Joris, en welkom bij deze Yahtzee spel.Veel speel plezier!");
let userInput = prompt("Voer hier je naam in");
const playerNamePlaceHolder = document.getElementById("player-name");
playerNamePlaceHolder.innerHTML = userInput;

let score = [];
let rollCount = 0;
let currentPlayer = 1;
let isDiceHeld = [false, false, false, false, false];
let diceValues = [1, 1, 1, 1, 1];
const dice = [0, 0, 0, 0, 0, 0];
const dices = [0, 0, 0, 0, 0, 0];
let player1DiceValues = [1, 1, 1, 1, 1];
let isScorebordHeld = [false, false, false, false, false];
const total = [];
let isCellFilled = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,];
let upperscore = 0;
let lowerscore = 0;
let totalscore = 0;
let player1Scores = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let threeOfAKindScore = 0;
let subtotal = 0;
let fourOfAKindScore = 0;
let fullHouse = 0;
let smallStraight = 0;
let largeStraight = 0;
let bonus = 0;
let chanceScore = 0;
let calculateYahtzeeScore = 0;
let upperHalfSum = 0;

function rollDice() {
  if (rollCount < 3) {
    const diceElements = document.querySelectorAll(".dice");
    diceElements.forEach((die, index) => {
      if (!isDiceHeld[index]) {
        const value = Math.floor(Math.random() * 6) + 1;
        die.textContent = value;
        diceValues[index] = value;
      }
    });
    rollCount++;
    updateRollCountDisplay();
    scoreboard1();
  }
}

function updateRollCountDisplay() {
  document.getElementById("roll-count").textContent = 3 - rollCount;
}

function resetRollCount() {
  rollCount = 0;
  updateRollCountDisplay();
}

function checkAllCellsFilled() {
  return isCellFilled.every((cell) => cell === true);
}


function cellsin(cellId) {
  const cell = document.getElementById(cellId);
  const playerCell = document.getElementById("player1-" + cell.id);
  if (!isCellFilled[cellId]) {
    playerCell.innerHTML = cell.innerHTML;
    isCellFilled[cellId] = true;
    calculateUpperScore();
    calculateLowerSectionScore();
    totalScore();
  }
}

function releaseAllDice() {
  isDiceHeld = [false, false, false, false, false];
  const diceElements = document.querySelectorAll(".dice");
  diceElements.forEach((die) => (die.style.border = ""));
}

function volgendeRonde() {
  clearHeldDice();
  releaseAllDice();
  if (rollCount !== 0 && rollCount < 3) {
    return;
  } else if (rollCount === 3) {
    rollDice();
    rollCount = 0;
    document.getElementById("volgende-ronde-btn").disabled = false;
    updateRollCountDisplay();
  } else {
    rollDice();
    rollCount++;
    if (rollCount === 3) {
      document.getElementById("volgende-ronde-btn").disabled = true;
    }
  }
}


function holdDice(diceIndex) {
  if (!isCellFilled[diceIndex]) {
    isDiceHeld[diceIndex] = !isDiceHeld[diceIndex];
    console.log(isDiceHeld);
    const diceElement = document.getElementById(`dice${diceIndex + 1}`);
    diceElement.style.border = isDiceHeld[diceIndex] ? "2px solid red" : "";
  }
}

function clearHeldDice() {
  if (rollCount < 3) {
    const diceElements = document.querySelectorAll(".dice");
    diceElements.forEach((die, index) => {
      if (isDiceHeld[index]) {
        die.textContent = index + 1;
        isDiceHeld[index] = true;
        die.style.border = "";
      }
    });
  }
}

function resetDice() {
  const diceElements = document.querySelectorAll(".dice");
  diceElements.forEach((die) => (die.textContent = "1"));
  rollCount = 0;
  document.getElementById("roll-btn").disabled = false;
  player1DiceValues = [1, 1, 1, 1, 1];
}

function scoreboard1() {
  player1Scores = [0, 0, 0, 0, 0, 0];
  for (i = 0; i < 6; i++) {
    dice[i] = diceValues.filter((num) => num == i + 1).length;
  }
  dices[0] = dice[0] * 1;
  dices[1] = dice[1] * 2;
  dices[2] = dice[2] * 3;
  dices[3] = dice[3] * 4;
  dices[4] = dice[4] * 5;
  dices[5] = dice[5] * 6;

  document.getElementById("player1dsones").innerHTML = dices[0];
  document.getElementById("player1dstwos").innerHTML = dices[1];
  document.getElementById("player1dsthrees").innerHTML = dices[2];
  document.getElementById("player1dsfours").innerHTML = dices[3];
  document.getElementById("player1dsfives").innerHTML = dices[4];
  document.getElementById("player1dssixes").innerHTML = dices[5];

  upperscore = dices[0] + dices[1] + dices[2] + dices[3] + dices[4] + dices[5];
  document.getElementById("player1dssubtotal").innerHTML = upperscore;
  
  const upperHalfSum = calculateSubtotal();
  document.getElementById("player1dssubtotal").innerHTML = upperHalfSum;

  const threeOfAKindScore = calculateThreeOfAKind(diceValues);
  document.getElementById("player1dsthreeofakind").innerHTML = threeOfAKindScore;

  const fourOfAKindScore = calculateFourOfAKind(diceValues);
  document.getElementById("player1dsfourofakind").innerHTML = fourOfAKindScore;

  const fullHouse = calculateFullHouse(diceValues);
  document.getElementById("player1dsfullhouse").innerHTML = fullHouse;

  const smallStraight = calculateSmallstraight();
  document.getElementById("player1dssmallstraight").innerHTML = smallStraight;

  const largeStraight = calculateLargestraight();
  document.getElementById("player1dslargestraight").innerHTML = largeStraight;

  const bonus = calculateBonus();
  document.getElementById("player1dsbonus").innerHTML = bonus;

  const chanceScore = calculateChance();
  document.getElementById("player1dschance").innerHTML = chanceScore;

  const yahtzeeScore = calculateYahtzee(diceValues);
  document.getElementById("player1dsyahtzee").innerHTML = yahtzeeScore;

  const lowerSectionTotal = calculateLowerSectionScore();
  document.getElementById("player1dssecondsection").textContent= lowerSectionTotal;
  
 
}

function calculateBonus() {
  const upperHalfSum = calculateUpperHalfSum();
  if (upperHalfSum >= 63) {
    return 35;
  } else {
    return 0;
  }
}

function calculateThreeOfAKind(diceValues) {
  let score = 0;
  const sortedValues = diceValues.slice().sort((a, b) => a - b);
  for (let i = 0; i <= sortedValues.length - 3; i++) {
    if (
      sortedValues[i] === sortedValues[i + 1] &&
      sortedValues[i] === sortedValues[i + 2]
    ) {
      const threeOfAKindScore = sortedValues[i] * 3;
        const remainingDiceValues = sortedValues.slice(0, i).concat(sortedValues.slice(i + 3));
          const remainingScore = remainingDiceValues.reduce((acc, val) => acc + val, 0);
            score = threeOfAKindScore + remainingScore;
      break;
    }
  }
  return score;
}


function calculateFourOfAKind(diceValues) {
  let score = 0;
  const sortedValues = diceValues.slice().sort((a, b) => a - b);
  for (let i = 0; i <= sortedValues.length - 4; i++) {
    if (
      sortedValues[i] === sortedValues[i + 1] &&
      sortedValues[i] === sortedValues[i + 2] &&
      sortedValues[i] === sortedValues[i + 3]
    ) {
      const fourOfAKindScore = sortedValues[i] * 4;
        const remainingDiceValues = sortedValues.slice(0, i).concat(sortedValues.slice(i + 4));
          const remainingScore = remainingDiceValues.reduce((acc, val) => acc + val, 0);
            score = fourOfAKindScore + remainingScore;
      break;
    }
  }
  return score;
}

function calculateFullHouse(diceValues) {
  const sortedValues = diceValues.slice().sort((a, b) => a - b);
  if (
    (sortedValues[0] === sortedValues[2] &&
      sortedValues[3] === sortedValues[4]) ||
    (sortedValues[0] === sortedValues[1] && sortedValues[2] === sortedValues[4])
  ) {
    return 25;
  } else {
    return 0;
  }
}

function calculateSmallstraight() {
  var diceValues = Array.from(document.querySelectorAll(".dice")).map((die) =>
    parseInt(die.textContent)
  );
  var uniqueValues = Array.from(new Set(diceValues)).sort((a, b) => a - b);
  if (uniqueValues.length >= 4) {
    for (var i = 0; i < uniqueValues.length - 1; i++) {
      if (uniqueValues[i] === uniqueValues[i + 1] - 1) {
        if (i < uniqueValues.length - 3 || (i === 0 && uniqueValues[3] === uniqueValues[0] + 3)){
          return 30;
        }
      }
    }
  }
  return 0;
}

function calculateLargestraight() {
  var diceValues = Array.from(document.querySelectorAll(".dice")).map((die) =>
    parseInt(die.textContent)
  );
  var uniqueValues = Array.from(new Set(diceValues)).sort((a, b) => a - b);
  if (uniqueValues.length >= 5 && uniqueValues[4] - uniqueValues[0] === 4) {
    return 40;
  }
  return 0;
}

function calculateChance() {
  var diceValues = Array.from(document.querySelectorAll(".dice")).map((die) =>
    parseInt(die.textContent)
  );
  var sum = diceValues.reduce((total, value) => total + value, 0);
  return sum;
}

function calculateYahtzee(diceValues) {
  const uniqueValues = new Set(diceValues);
  if (uniqueValues.size === 1) {
    return 50;
  } else {
    return 0;
  }
}

function calculateUpperScore() {
  const upperscoreL = [
    parseInt(document.getElementById("player1-player1dsones").textContent),
    parseInt(document.getElementById("player1-player1dstwos").textContent),
    parseInt(document.getElementById("player1-player1dsthrees").textContent),
    parseInt(document.getElementById("player1-player1dsfours").textContent),
    parseInt(document.getElementById("player1-player1dsfives").textContent),
    parseInt(document.getElementById("player1-player1dssixes").textContent),
    parseInt(document.getElementById("player1-player1dsbonus").textContent),
  ];
  for (let i = 0; i < 7; i++) {
    if (isNaN(upperscoreL[i])) {
      upperscoreL[i] = 0;
    }
    console.log(upperscoreL[i]);
  }
  document.getElementById("player1-player1dssubtotal").textContent =
    upperscoreL.reduce((total, score) => total + score, 0);
}   

function calculateLowerSectionScore() {
  const lowerscoreL = [
    parseInt(document.getElementById("player1-player1dsthreeofakind").textContent),
    parseInt(document.getElementById("player1-player1dsfourofakind").textContent),
    parseInt(document.getElementById("player1-player1dsfullhouse").textContent),
    parseInt(document.getElementById("player1-player1dssmallstraight").textContent),
    parseInt(document.getElementById("player1-player1dslargestraight").textContent),
    parseInt(document.getElementById("player1-player1dsyahtzee").textContent),
    parseInt(document.getElementById("player1-player1dschance").textContent),
  ];
  for(let i = 0; i < 7; i++){
    if(isNaN(lowerscoreL[i])){
      lowerscoreL[i] = 0;
    }
    console.log(lowerscoreL[i]);

    document.getElementById("player1dssecondsection").innerHTML;
  }
  document.getElementById("player1-player1dssecondsection").textContent =
  lowerscoreL.reduce((total, score) => total + score, 0);
}

function calculateUpperHalfSum() {
  upperHalfSum = upperscore + bonus;
}

//subtotal in de cell te krijgen
function calculateSubtotal() {
  let subtotal = 0;
  const playerCells = document.querySelectorAll(
    ".player-table tbody tr:last-child td:not(.Player1Table):not(#player1-player-name)"
  );
  playerCells.forEach((cell) => {
    const value = parseInt(cell.innerHTML);
    if (!isNaN(value)) {
      subtotal += value;
    }
  });
  return subtotal;
}

function totalScore(){
  const totalScore = [
    parseInt(document.getElementById("player1-player1dssecondsection").textContent),
    parseInt(document.getElementById("player1-player1dssubtotal").textContent),
  ]
  for(let i = 0; i < 2; i++){
  }
  document.getElementById("player1-player1dstotal").textContent =
  totalScore.reduce((total, score) => total + score, 0);

}


