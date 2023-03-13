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
var retrieveUserInitial = document.getElementById("retrieve-user-initial");
var retriveUserScore = document.getElementById("retrive-user-score")


var timerCount;
resultSubmission.style.display = 'none';
var correctAnswerNum = 0;
var wrongAnswerNum = 0;
var correctChoice;

var questions = {
    "Inside which HTML element do we put the JavaScript?": ["script", "js", "scripting", "javascript", 0],
    "Where is the correct place to insert a JavaScript??": ["head and body", "head", "body", "header or footer only", 0],
    "What is the correct syntax for referring to an external script?": ["script name", "script src", "script href", "script link", 1],
    "What syntax do you use to write in an alert box?": ["msgBox", "alert", "msg", "alertBox", 1],
    "How do you call a function named \"myFunction\"?": ["call function myFunction()", "call myFunction()", "myFunction()", "function(myFunction)", 2],
    "How to write an IF statement in JavaScript?": ["if 1 == 5 then", "if i = 5", "if i = 5 then", "if (i==5)", 3],
    "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?": ["if i <> 5", "if (i <> 5)", "if (i !=5 )", "if i =! 5 then", 2],
    "How does a WHILE loop start?": ["while 1 =1 to 10", "while (i <= 10)", "while (i <= 10; i ++)", "while i<= 10 and i ++", 1],
    "How can you add a comment in a JavaScript?": ["<!--This is a comment-->", "//This is a comment", "'This is a comment' ", "<This is a comment>", 1],
    "How can you detect the client's browser name?": ["navigator.appName ", "browser.name", "client.navName", "nav.clientName", 0],
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
  localStorage.getItem("initial")
  retrieveUserInitial.textContent = "initial";

  

}

startButton.addEventListener("click", startGame);
submissionButton.addEventListener("click", storeScore);

