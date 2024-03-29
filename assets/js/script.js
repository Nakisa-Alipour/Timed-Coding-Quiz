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
var initialInput = document.getElementById("name");
var formScore = document.getElementById("score");
var submissionButton = document.getElementById("submit");
var form = document.querySelector('form');
var resultsSection = document.querySelector(".results-section");
const dateField = document.getElementById('date');
var scoreTable = document.getElementById('scoreTable');

// Set initial values and styles
var timerCount;
let correctAnswerNum = 0;
let wrongAnswerNum = 0;
var currentQuestion = 0;
var correctChoice;
var timeInterval;


// Check items exist on page before applying style changes
if (resultSubmission) {
  resultSubmission.style.display = 'none';
}
if (resultsSection) {
  resultsSection.style.display = 'none';
}
if (dateField) {
// Get the date input field
const dateField = document.getElementById('date');
// Set the disabled attribute
dateField.disabled = true;
// Get the current date and time
const now = new Date();
// Format the date and time as a string
const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
// Set the value of the date input field
dateField.value = dateString;
}

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
    },
    {
      question: "How to write an IF statement in JavaScript?",
      choices: ["if (i == 5)", "if i = 5", "if i = 5 then", "if i == 5 then"],
      correctAnswer: "if (i == 5)"
    },
  
];

// Start the quiz
function startGame() {
  timerCount = 60;
  highscoreButton.style.display = "none";
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
  highscoreButton.style.display = "block";
  timerCount = 0;
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
  // Set the value of the formScore input field to the final score
  formScore.value = correctAnswerNum;
}

//Listen for form submissions & Write data to local storage

if (form) {
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // prevent form submission
  
      // Save the data from form field values to local storage
      var data = JSON.parse(localStorage.getItem('data')) || [];
      data.push({ initials: initialInput.value, score: formScore.value, date: dateField.value });
      localStorage.setItem('data', JSON.stringify(data));
  
      // Show alert window with "High Score Saved!" message
      window.alert('High Score Saved!');
  
      // Disable the form fields to prevent multiple submissions
      initialInput.disabled = true;
      formScore.disabled = true;
      dateField.disabled = true;
      submissionButton.disabled = true;
      submissionButton.style.backgroundColor = "limegreen";
      submissionButton.textContent = "Submission successful";
  });
  }
  if (startButton) {
      startButton.addEventListener("click", startGame);
  }
  
  //On click navigate to HighScore
  if (highscoreButton) {
  highscoreButton.addEventListener('click', () => {
      window.location.href = './highscore.html';
  });
  }
  
  
  // Retrieve the data from local storage and parse it to a JavaScript object
  const data = JSON.parse(localStorage.getItem('data'));
  function clearLocalStorage() {
      // Clear local storage
      localStorage.clear();
  
      // Display alert message
      alert("High score erased.");
  
      // Refresh the page
      location.reload();
  }
  
  if (scoreTable) {
  
  //handles empty local storage to prevent null errors in the console
  if (data !== null) {
      // Sort the data by score in descending order
      data.sort((a, b) => b.score - a.score);
  
      // Create a table row for each data item and add it to the table
      const tbody = document.querySelector('#scoreTable tbody');
      data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <td>${item.initials}</td>
          <td>${item.score}</td>
          <td>${item.date}</td>
        `;
          tbody.appendChild(row);
      });
  } else {
      window.alert('High score table is currently empty!');
  }
  }