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



function startGame() {
  timerCount = 60;
  startButton.disabled = true;
  highscoreButton.disabled = true;
  extraInfo.textContent = ' ';
  timer();
  showQuestion ();  //show question with multiple choice
  
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


function showQuestion(){} //I will write it later

function displayMessage () {
    questionArea.textContent = "All done!";
    multipleChoiceArea.textContent = ' ';
    checkAnswer.textContent = "Your final score is: " + correctAnswer;
    resultSubmission.style.display = 'block';
}

function storeScore() {
  var initial = localStorage.setItem("initial", intialInput);
  var finalScore = localStorage.setItem("final-score", correctAnswer);
}

startButton.addEventListener("click", startGame);
submissionButton.addEventListener("click", storeScore);
