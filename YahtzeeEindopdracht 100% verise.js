alert("Hallo Billy, en welkom bij deze Yahtzee spel.Veel speel plezier!");
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
let SwitchPersoon = true;
let isScorebordHeld = [false, false, false, false, false];
const total = [];
let isCellFilled = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

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
    showDice();
  }
}

function updateRollCountDisplay() {
  document.getElementById("roll-count").textContent = 3 - rollCount;
}

function resetRollCount() {
  rollCount = 0;
  updateRollCountDisplay();
}

function showDice() {
  for (var i = 0; i < 5; i++) {
    if (!isDiceHeld[i]) {
      document.getElementById("dice" + i).innerHTML = diceValues[i];
    }
  }
}

function cellsin(cellId) {
  const cell = document.getElementById(cellId);
  const playerCell = document.getElementById("player1-" + cell.id);
  if (!isCellFilled[cellId]) {
    playerCell.textContent = cell.textContent;
    isCellFilled[cellId] = true;
  }
}

function volgendeRonde() {
  clearHeldDice();
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

function clearHeldDice() {
  if (rollCount < 3) {
    const diceElements = document.querySelectorAll(".dice");
    diceElements.forEach((die, index) => {
      if (isDiceHeld[index]) {
        die.textContent = index + 1;
        isDiceHeld[index] = false;
        die.style.border = "";
      }
    });
  }
}

function holdDice(diceIndex) {
  if (!isCellFilled[diceIndex]) {
    isDiceHeld[diceIndex] = !isDiceHeld[diceIndex];
    console.log(isDiceHeld);
    const diceElement = document.getElementById(`dice${diceIndex + 1}`);
    diceElement.style.border = isDiceHeld[diceIndex] ? "2px solid black" : "";
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

  const threeOfAKindScore = calculateThreeOfAKind(diceValues);
  document.getElementById("player1dsthreeofakind").innerHTML =
    threeOfAKindScore;

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

  const upperHalfSum = calculatesubtotaal();
  document.getElementById("player1dssubtotal").innerHTML = upperHalfSum + bonus;

  const chanceScore = calculateChance();
  document.getElementById("player1dschance").innerHTML = chanceScore;

  const yahtzeeScore = calculateYahtzee(diceValues);
  document.getElementById("player1dsyahtzee").innerHTML = yahtzeeScore;

  const totalScore = calculateTotalScore();
  document.getElementById("player1dstotal").innerHTML = totalScore;
}

function calculateUpperHalfSum() {
  let upperHalfSum = 0;
  for (let i = 0; i < 6; i++) {
    upperHalfSum += dices[i];
  }
  return upperHalfSum;
}

function calculateBonus() {
  const upperHalfSum = calculateUpperHalfSum();
  if (upperHalfSum >= 63) {
    return 35;
  } else {
    return 0;
  }
}

function calculatesubtotaal() {
  const upperHalfValues = [
    dices[0],
    dices[1],
    dices[2],
    dices[3],
    dices[4],
    dices[5],
  ];
  const upperHalfSum = upperHalfValues.reduce((acc, val) => acc + val, 0);
  return upperHalfSum;
}

function calculateThreeOfAKind(diceValues) {
  let score = 0;
  const sortedValues = diceValues.slice().sort((a, b) => a - b);
  for (let i = 0; i <= sortedValues.length - 3; i++) {
    if (
      sortedValues[i] === sortedValues[i + 1] &&
      sortedValues[i] === sortedValues[i + 2]
    ) {
      score = sortedValues[i] * 3;
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
      score = sortedValues[i] * 4;
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
        if (
          i < uniqueValues.length - 3 ||
          (i === 0 && uniqueValues[3] === uniqueValues[0] + 3)
        ) {
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

function calculateTotalScore() {
  const player1Scores = [
    parseInt(document.getElementById("player1dsones").textContent),
    parseInt(document.getElementById("player1dstwos").textContent),
    parseInt(document.getElementById("player1dsthrees").textContent),
    parseInt(document.getElementById("player1dsfours").textContent),
    parseInt(document.getElementById("player1dsfives").textContent),
    parseInt(document.getElementById("player1dssixes").textContent),
    parseInt(document.getElementById("player1dsthreeofakind").textContent),
    parseInt(document.getElementById("player1dsfourofakind").textContent),
    parseInt(document.getElementById("player1dsfullhouse").textContent),
    parseInt(document.getElementById("player1dssmallstraight").textContent),
    parseInt(document.getElementById("player1dslargestraight").textContent),
    parseInt(document.getElementById("player1dsbonus").textContent),
    parseInt(document.getElementById("player1dssubtotal").textContent),
    parseInt(document.getElementById("player1dschance").textContent),
    parseInt(document.getElementById("player1dsyahtzee").textContent),
  ];

  const totalScore = player1Scores.reduce((total, score) => total + score, 0);

  return totalScore;
}
