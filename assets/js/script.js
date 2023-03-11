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






function startGame() {
  timerCount = 60;
  startButton.disabled = true;
  highscoreButton.disabled = true;
  extraInfo.textContent = ' ';
  timer();
  showQuestion ();  //show question with multiple choice
  
}



function timer() {
  var timeLeft = 60;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      countdown.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      countdown.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      countdown.textContent = '';
      clearInterval(timeInterval);
      displayMessage(); //clear the page and show a message: All done! your final score is: correctAnswer, enter your initail and submit
    }
  }, 1000);
}


function showQuestion(){} //write it later

function displayMessage () {
    questionArea.textContent = ' ',
    multipleChoiceArea.textContent = ' ';
    checkAnswer.textContent = "Your final score is: " + correctAnswer
    resultSubmission.fadein();
}









startButton.addEventListener("click", startGame);
