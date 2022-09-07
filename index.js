const readlineSync = require('readline-sync');
const chalk = require('chalk');

//Defined constants
const correct = chalk.bold.green;
const incorrect = chalk.bold.red;
const nameBg = chalk.greenBright;
const newGameBg = chalk.bold.yellowBright;
const infoBg = chalk.bold.cyan;
const scoreBg = chalk.bold.blueBright;
const buttonBg = chalk.bgGreen.white;
const marvelBg = chalk.bold.red;
const log = console.log;

//Default value initialization
let score = 0;
let userName = '';
let questionsAnswersList = [];

//Questions list
let questionsAndOptionsList = [
  '\n(1) Who is the Winter Soldier?\n\na.Bucky\nb.Tony Stark\nc.Steve Rogers\nd.Clint Barton\n\nYour answer: ',
  '\n(2) Who did Captain America give his shield to in Endgame?\n\na.Sam\nb.Bucky\nc.T\'Challa\nd.Clint Barton\n\nYour answer: ',
  '\n(3) Which movie kicked off the Marvel Cinematic Universe?\n\na.Spider Man\nb.Iron Man\nc.Batman\nd.Captain America\n\nYour answer: ',
  '\n(4) Black Panther is set in which fictional country?\n\na.Westeros\nb.Wakanda\nc.Vormir\nd.Sokovia\n\nYour answer: ',
  '\n(5) Who rescued Tony Stark and Nebula from space?\n\na.Captain America\nb.Captain Marvel\nc.Doctor Strange\nd.Homelander\n\nYour answer: ',
  '\n(6) Who is the firstborn child of Odin?\n\na.Thor\nb.Loki\nc.Hela\nd.Homelander\n\nYour answer: ',
  '\n(7) Scott Lang was trapped in the Quantum Realm for how long?\n\na.Five years\nb.Four years\nc.Six years\nd.Eight years\n\nYour answer: ',
  '\n(8) Thor\'s Mjolnir is made from the ___?\n\na.Magnet\nb.Vibranium\nc.Uru\nd.Infinity Stones\n\nYour answer: ',
  '\n(9) What is Tony Stark\'s daughter\'s name?\na.Pepper Stark\nb.Morgan Stark\nc.Hailey Stark\nd.Michelle Stark\n\nYour answer: ',
  '\n(10) What does S.H.I.E.L.D. stand for?\n\na.Strategic Homeland Intervention, Enforcement and Logistics Department\nb.Strategic Homeland Intervention, Enforcement and Logistics Division\nc.Strategic Homeland Interception, Enforcement and Logistics Division\nd.Strategic Homeland Interference, Enforcement and Logistics Division\n\nYour answer: ',
];

//Answers list
let answersList = [
  'a',
  'a',
  'b',
  'b',
  'b',
  'c',
  'a',
  'c',
  'b',
  'b',
];

//List of high scorers
let highScores = [
  {
    name: 'Gautam',
    score: 10
  },
  {
    name: 'Stan Lee',
    score: 10
  },
  {
    name: 'Robert Downey',
    score: 9
  },
  {
    name: 'Peter Parker',
    score: 8
  },
];

//Function to capitalize the first letter of a string
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//Mapping of questions with answers
function loadQuestionsAndAnswers() {
  for (let i = 0; i < questionsAndOptionsList.length; i++) {
    questionsAnswersList.push({ question: questionsAndOptionsList[i], answer: answersList[i] });
  }
}

//Function to display welcome message
function welcome() {
  let inputName = capitalizeFirstLetter(readlineSync.question('Namaste!\nWhat is your name?\t', {
    defaultInput: 'nobody'
  }));
  userName = nameBg(inputName);
  log(`\nHello ${userName}, let's play a game on how much you know about ${marvelBg('Marvel Cinematic Universe(MCU)')}!`);
  log('\nThe rules are simple. There will be 10 questions related to MCU and for each correct answer you will be rewarded with 1 point.');
  log(`\n${infoBg('Questions are arranged in mcq format so you need to input only the choice mapped against the correct answer i.e. [a, b, c or d]. There is only 1 correct answer in each question.')}`);
}

//Function to start the quiz game
function playQuizGame() {
  log(`\n${newGameBg('Let the Game Begin!')}`);
  log('---------------------');
  log(`\n${infoBg('Round 1 begins!')}`);
  score = 0;
  questionsAnswersList.forEach((currentQues) => checkAnswer(currentQues.question, currentQues.answer));
}

//Function to check the prompt answer with the correct answer
function checkAnswer(question, answer) {
  if (question === questionsAndOptionsList[2]) {
    log(`\n${infoBg('Round 2 begins!')}`);
  } else if (question === questionsAndOptionsList[5]) {
    log(`\n${infoBg('Round 3 begins!')}`);
  } else if (score === 8) {
    log(`\n${infoBg('Great going! Keep it up!')}`);
  }

  let inputAnswer = readlineSync.keyIn(question);

  if (inputAnswer.toLowerCase() === answer) {
    score++;
    log(`\n${correct('Yes, you are correct!')}`);
  } else {
    log(`\n${incorrect('No, you are incorrect!')}`);
  }

  log(`\nCurrent Score : ${scoreBg(score)}`);
  log('-------------------------');
}

//Function to display user score
function displayUserScore() {
  log(`\n${userName}, your total score is ${scoreBg(score)}.`);
  if (score > 7) {
    log('Woah! You nailed it. That\'s a new high score!');
  }
}

//Function to display high scores
function displayHighScores() {
  log('\nCheck out this high scores grid. If you think your name should be there mail the screenshot of your score to gtmbalamurali@gmail.com and I\'ll update it ASAP!');
  log('\n-------------');
  log('Name : Score');
  log('-------------');
  highScores.forEach((player) => log(`${player.name} : ${player.score}`));
}

//Function to play the game again
function playAgain() {
  let answer = readlineSync.keyInYN('\nDo you wish to play again?');
  if (answer) {
    playQuizGame();
    displayUserScore();
    displayHighScores();
    playAgain();
  }
  else {
    log(`\n${newGameBg(`If you wish to play again go to the top right corner of the screen and click on the ${buttonBg('Run')} button or you can simply just reload the page. Thank you!`)}`);
  }
}

loadQuestionsAndAnswers();
welcome();
playQuizGame();
displayUserScore();
displayHighScores();
playAgain();