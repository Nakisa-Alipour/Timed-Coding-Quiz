// Get HTML elements
var extraInfo = document.getElementById("extra-info");
var startButton = document.querySelector(".start-button");
var highscoreButton = document.querySelector(".highscore-button");
var countdown = document.querySelector(".count-down");
var questionArea = document.querySelector(".question-area");
var multipleChoiceArea = document.querySelector(".multiplechoice-area");
var checkAnswer = document.querySelector(".check-answer");
let correctAnswerNumElement = document.querySelector(".correct-answer-number");
let wrongAnswerNumElement = document.querySelector(".wrong-answer-number");
var resultSubmission = document.querySelector(".result-submission");
var initialInput = document.getElementById("initial");
var submissionButton = document.getElementById("submit");
var retrieveUserInitial = document.getElementById("retrieve-user-initial");
var retrieveUserScore = document.getElementById("retrieve-user-score");
var clearInfoButton = document.getElementById("clear-info-button");
var resultsSection = document.querySelector(".results-section");


// Set initial values and styles
var timerCount;
resultSubmission.style.display = 'none';
resultsSection.style.display = 'none';
let correctAnswerNum = 0;
let wrongAnswerNum = 0;
var currentQuestion = 0;
var correctChoice;
var timeInterval;


// Define questions and answers
var questions = [
  {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>", "<javascript>", "<js>", "<scripting>"],
      correctAnswer: "<script>"
  },
  {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>"],
      correctAnswer: "<script src='xxx.js'>"
  },
  {
      question: "How do you write 'Hello World' in an alert box?",
      choices: ["alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')", "msg('Hello World')"],
      correctAnswer: "alert('Hello World')"
  },
  {
      question: "How do you create a function in JavaScript?",
      choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "create function myFunction()"],
      correctAnswer: "function myFunction()"
  },
  {
      question: "How do you call a function named 'myFunction'?",
      choices: ["myFunction()", "call function myFunction()", "call myFunction()", "execute myFunction()"],
      correctAnswer: "myFunction()"
  }
];



function startGame() {
  timerCount = 60;
  startButton.disabled = true;
  highscoreButton.disabled = true;
  extraInfo.textContent = ' ';
  timer();
  renderMultipleChoice (); 
  resultsSection.style.display = 'block';
  
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


var renderMultipleChoice = function () {
  if (currentQuestion >= Object.keys(questions).length) {
    return;
  }
  
  var question = Object.keys(questions)[currentQuestion];
  var choices = questions[question].slice(0, -1);
  correctChoice = questions[question][4];
  
  questionArea.textContent = question;
  multipleChoiceArea.textContent = "";
  
  for (var i = 0; i < choices.length; i++) {
    var choice = document.createElement("button");
    choice.textContent = choices[i];
    choice.addEventListener("click", function () {
      var userChoice = this.textContent.toString();
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
      currentQuestion++;
      renderMultipleChoice();
    });
    multipleChoiceArea.appendChild(choice);
  }
};

function displayMessage () {
    questionArea.textContent = "All done!";
    multipleChoiceArea.textContent = ' ';
    checkAnswer.textContent = "Your final score is: " + correctAnswerNum.toString();
    resultSubmission.style.display = 'block';
}

function storeScore() {
  var initial = initialInput.value;
  var finalScore = correctAnswerNum;
  localStorage.setItem("initial", initial);
  localStorage.setItem("final-score", finalScore);
  retrieveData();
}

function retrieveData () {
  retrieveUserInitial.textContent = localStorage.getItem("initial");
  retriveUserScore.textContent = localStorage.getItem("final-score");

}

function clearData() {
  localStorage.clear();
  retrieveUserInitial.textContent = " ";
  retriveUserScore.textContent = " ";
}

startButton.addEventListener("click", startGame);
submissionButton.addEventListener("click", storeScore);
clearInfoButton.addEventListener("click", clearData);

