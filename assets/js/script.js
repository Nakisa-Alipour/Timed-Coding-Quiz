var extraInfo= document.querySelector(".extra-info");
var startButton= document.querySelector(".start-button");
var highscoreButton= document.querySelector("highscore-button");
var countdown = document.querySelector(".countdown");
var questionArea = document.querySelector(".question-area");
var multiChoiceArea = document.querySelector(".multichoice-area");
var checkAnswer = document.querySelector(".check-answer");
var correctAnswer = document.querySelector(".correct-answer");
var correctAnswer = document.querySelector(".wrong-answer");








function startGame() {
  isWin = false;
  timerCount = 60;
  startButton.disabled = true;
  extraInfoEl.textContent = ' ';
  countdown()
  renderBlanks()
  
}



function countdown() {
  var timeLeft = 60;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      displayMessage();
    }
  }, 1000);
}








startButton.addEventListener("click", startGame);