var extraInfo= document.querySelector(".extra-info");
var startButton= document.querySelector(".start-button");
var highscoreButton= document.querySelector(".highscore-button");
var countdown = document.querySelector(".count-down");
var questionArea = document.querySelector(".question-area");
var multipleChoiceArea = document.querySelector(".multiplechoice-area");
var checkAnswer = document.querySelector(".check-answer");
var correctAnswer = document.querySelector(".correct-answer");
var wrongAnswer = document.querySelector(".wrong-answer");
var resultSubmission = document.querySelector(".result-submission");

var intialInput = document.getElementById("initial");
var submissionButton = document.getElementById("submit");


var timeleft;
resultSubmission.style.display = 'none';
var correctAnswer = 0;
var wrongAnswer = 0;

var questions = {
    "Which of the following is not an international organisation?": ["FIFA", "NATO", "ASEAN", "FBI", 3],
    "Which of the following disorders is the fear of being alone?": ["Agoraphobia", "Aerophobia", "Acrophobia", "Arachnophobia", 0],
    "What is the speed of sound?": ["120 km/h", "1200 km/h", "400 km/h", "700 km/h", 1],
    "What do we call a newly hatched butterfly?": ["A moth", "A butter", "A caterpillar", "A chrysalis", 2],
    "Which did Viking people use as money?": ["Rune stones", "Jewellery", "Seal skins", "Wool", 1],
    "What is the main component of the sun?": ["Liquid lava", "Gas", "Molten iron", "Rock", 1],
    "Goulash is a type of beef soup in which country?": ["Hungary", "Czech Republic", "Slovakia", "Ireland", 0],
    "Which of the following animals can run the fastest?": ["Cheetah", "Leopard", "Tiger", "Lion", 0],
    "What does the term “SOS” commonly stand for?": ["Save Our Sheep", "Save Our Ship", "Save Our Seal", "Save Our Souls", 3]
  };



function startGame() {
  timerCount = 60;
  startButton.disabled = true;
  highscoreButton.disabled = true;
  extraInfo.textContent = ' ';
  timer();
  renderMultipleChoice ();  //show question with multiple choice
  
}



function timer() {
  var timeInterval = setInterval(function () {
    if (timerCount > 1) {
      countdown.textContent = timerCount + ' seconds remaining';
      timerCount--;
    } else if (timerCount === 1) {
      countdown.textContent = timerCount + ' second remaining';
      timerCount--;
    } else {
      countdown.textContent = '';
      clearInterval(timeInterval);
      displayMessage(); 
    }
  }, 1000);
}

function checkUserChoice (){};

function renderMultipleChoice() {
  var question = Object.keys(questions)[0];
  var choices = questions [question].slice(0,-1);
  questionArea.textContent = question;
  for (var i = 0, i<4, i++) {
    var choices[i] = questions[Object.keys(questions)[i]];
    multipleChoiceArea.children[i].textContent= choices[i];
  }
  choices.addEventListener("click", checkUserChoice());
} 

function displayMessage () {
    questionArea.textContent = "All done!";
    multipleChoiceArea.textContent = ' ';
    checkAnswer.textContent = "Your final score is: " + correctAnswer.toString();
    resultSubmission.style.display = 'block';
}

function storeScore() {
  var initial = intialInput.value;
  var finalScore = correctAnswer
  localStorage.setItem("initial", initial);
  localStorage.setItem("final-score", finalScore);
}

startButton.addEventListener("click", startGame);
submissionButton.addEventListener("click", storeScore);
