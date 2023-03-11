var extraInfo= document.getElementById("extra-info");
var startButton= document.querySelector(".start-button");
var highscoreButton= document.querySelector(".highscore-button");
var countdown = document.querySelector(".count-down");
var questionArea = document.querySelector(".question-area");
var multipleChoiceArea = document.querySelector(".multiplechoice-area");
var checkAnswer = document.querySelector(".check-answer");
var correctAnswerNum = document.querySelector(".correct-answer-number");
var wrongAnswerNum = document.querySelector(".wrong-answer-number");
var resultSubmission = document.querySelector(".result-submission");

var initialInput = document.getElementById("initial");
var submissionButton = document.getElementById("submit");


var timerCount;
resultSubmission.style.display = 'none';
var correctAnswerNum = 0;
var wrongAnswerNum = 0;
var correctChoice;

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
  renderMultipleChoice (); 
  
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


function renderMultipleChoice() {
  var currentQuestion = 0;
  var question = Object.keys(questions)[currentQuestion];
  var choices = questions [question].slice(0,-1);
  correctChoice = questions [question][4];
  questionArea.textContent = question;
  
  for (var i = 0; i < 4; i++) {
    var choice = document.createElement("button")
    choice.textContent= choices[i];
    multipleChoiceArea.appendChild(choice);
    choice.addEventListener("click", function () {
      var userChoice = this.textContent;
      if (userChoice === correctChoice) {
        checkAnswer.textContent = "Correct!";
        correctAnswerNum++;
      } else {
        checkAnswer.textContent = "Wrong!";
        wrongAnswerNum++;
        timerCount -= 15; 
        if (timerCount < 0) {
          timerCount = 0;
        }
      }
  }
  )
} 
}

function displayMessage () {
    questionArea.textContent = "All done!";
    multipleChoiceArea.textContent = ' ';
    checkAnswer.textContent = "Your final score is: " + correctAnswer.toString();
    resultSubmission.style.display = 'block';
}

function storeScore() {
  var initial = initialInput.value;
  var finalScore = correctAnswerNum;
  localStorage.setItem("initial", initial);
  localStorage.setItem("final-score", finalScore);
}

startButton.addEventListener("click", startGame);
submissionButton.addEventListener("click", storeScore);

