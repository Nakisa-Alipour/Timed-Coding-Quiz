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
var resultSubmission = document.querySelector("#result-submission");
var initialInput = document.getElementById("initial");
var submissionButton = document.getElementById("submit");
var retrieveUserInitial = document.getElementById("retrieve-user-initial");
var retrieveUserScore = document.getElementById("retrieve-user-score");
var clearInfoButton = document.getElementById("clear-info-button");
var resultsSection = document.querySelector("#results-section");


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
  startButton.style.display = "none";
  startButton.disabled = true;
  
}

// End the quiz
function endQuiz() {
  clearInterval(timeInterval);
  highscoreButton.disabled = false;
  // Display the user's score and ask for their initials
  displayMessage();
}

// Start the timer
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

// Render multiple choice questions on the screen
function renderMultipleChoice() {
  // Get the current question from the questions array based on the current question number
  var question = questions[currentQuestion].question;

  // Get the choices for the current question
  var choices = questions[currentQuestion].choices;

  // Get the correct choice for the current question
  correctChoice = questions[currentQuestion].correctAnswer;

  // Update the question area with the current question
  questionArea.textContent = question;

  // Clear the multipleChoiceArea before adding new choices
  multipleChoiceArea.innerHTML = '';

  // Loop through each choice and create a button for each choice
  for (var i = 0; i < choices.length; i++) {
    var choice = document.createElement("button");
    choice.textContent = choices[i];
    multipleChoiceArea.appendChild(choice);

    // Add event listener to each choice button to check if the user's choice is correct
    choice.addEventListener("click", function () {
        // Disable buttons: Ensure they can't be pressed multiple times - Disables all buttons on click
        var choiceButtons = document.querySelectorAll(".multiplechoice-area button");
        for (var j = 0; j < choiceButtons.length; j++) {
            choiceButtons[j].disabled = true;
        }
        var userChoice = this.textContent;
        if (userChoice === correctChoice) {
            // Update the check answer area to indicate that the user's choice is correct
            checkAnswer.textContent = "Correct!";
            checkAnswer.style.backgroundColor = "limegreen";
            checkAnswer.style.color = "white";
            // Increment the number of correct answers
            correctAnswerNumElement.textContent = ++correctAnswerNum;
        } else {
            // Update the check answer area to indicate that the user's choice is wrong
            checkAnswer.textContent = "Wrong!";
            checkAnswer.style.backgroundColor = "red";
            checkAnswer.style.color = "white";
            // Increment the number of wrong answers
            wrongAnswerNumElement.textContent = ++wrongAnswerNum;
            // Subtract 15 seconds from the timer if the user's choice is wrong
            timerCount -= 15;
            // Make sure the timer does not go below zero
            if (timerCount < 0) {
                timerCount = 0;
            }
        }
        // Move to the next question after a short delay
        setTimeout(function() {
          // Remove Right/Wrong message from earlier question
          checkAnswer.textContent = "";
          currentQuestion++;
          if (currentQuestion < questions.length) {
              renderMultipleChoice();
          } else {
              endQuiz();
          }
      }, 1000);
  });
}};
      

// This function displays the final score and allows the user to submit their initials
function displayMessage () {
  questionArea.textContent = "All done!";
  // Clear the multiple choice area
  multipleChoiceArea.textContent = ' ';
  // Display the final score
  checkAnswer.textContent = "Your final score is: " + correctAnswerNum.toString();
  // Display the form for submitting the user's initials
  resultSubmission.style.display = 'flex';
  resultSubmission.style.justifyContent = 'center';
}

// Store the user's initials and final score in local storage
function storeScore() {
  var initial = initialInput.toString();
  var finalScore = correctAnswerNum.toString();
  localStorage.setItem("initial", initial);
  localStorage.setItem("final-score", finalScore);
  retrieveData();
}

// Retrieve the user's initials and final score from local storage and displays them
function retrieveData () {
  window.location.href = 'highscore.html';
  resultSubmission.textContent = localStorage.getItem("initial");
  resultsSection.textContent = localStorage.getItem("final-score");
}

// Clear the user's initials and final score from local storage
function clearData() {
  localStorage.clear();
  resultSubmission.textContent = " ";
  resultsSection.textContent = " ";
}

// Add event listeners to buttons if they exist
if (startButton) {
  startButton.addEventListener("click", startGame);
}

if (submissionButton) {
  submissionButton.addEventListener("click", storeScore);
}

if (clearInfoButton) {
  clearInfoButton.addEventListener("click", clearData);
}

if (highscoreButton) {
  highscoreButton.addEventListener("click", retrieveData);
}

if (clearInfoButton) {
  clearInfoButton.addEventListener("click", clearData);
}