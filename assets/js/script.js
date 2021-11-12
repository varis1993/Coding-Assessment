// list of all questions, choices, and answers
var questions = [
    {
      title: "After how many Year’s FIFA World Cup is held?:",
      choices: ["2 years", "3 years", "4 years", "Every Year"],
      answer: "4 years"
    },
    {
      title:
        "Which Team did Kobe Bryant play for?:",
      choices: ["Chicago Bulls", "Golden State Warriors", "Los Angeles Lakers", "Miami Heat"],
      answer: "Los Angeles Lakers"
    },
    {
      title: "What is the National Sports of Canada?:",
      choices: ["Cricket", "Ice hockey", "Field Hockey", "Football"],
      answer: "Ice hockey"
    },
    {
      title:
        "What is the 100m World Record of Usain Bolt?:",
      choices: ["14.35 Sec", "9.58 Sec", "9.05 Sec", "10.12 Sec"],
      answer: "9.58 Sec"
    },
    {
      title: "Which Sport is Performed by the Legend “Muhammad Ali”?",
      choices: ["Weight Lifting", "Swiming", "Boxing ", "Shooting"],
      answer: "Boxing"
    },
    {
      title:
        "Which Sport does Roger Federer play?",
      choices: ["Volleyball", "Tennis", "Table Tennis", "Badminton"],
      answer: "Tennis"
    }
  ];

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function startQuiz() {
  // hide start screen
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("class", "start hide");

  // un-hide questions section
  questionsEl.setAttribute("class", " ");
  // start timer
  timerId = setInterval(function(){
    clockTick();
  }, 1000);
  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionsEl.children[0].textContent = currentQuestion.title;
  // clear out any old question choices
  while (choicesEl.hasChildNodes()) {
    choicesEl.removeChild(choicesEl.lastChild);
  }
  // loop over choices
  for(var i = 0; i < currentQuestion.choices.length; i++){

    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    
    // display on the page
    choicesEl.appendChild(choiceButton);
  }
  // attach click event listener to each choice
  choicesEl.children[0].addEventListener("click", function(event){
    questionClick(choicesEl.children[0]);
  });
  choicesEl.children[1].addEventListener("click", function(event){
    questionClick(choicesEl.children[1]);
  });
  choicesEl.children[2].addEventListener("click", function(event){
    questionClick(choicesEl.children[2]);
  });
  choicesEl.children[3].addEventListener("click", function(event){
    questionClick(choicesEl.children[3]);
  });
}

function questionClick(answerChoice) {
  // check if user guessed wrong  
  if(answerChoice.textContent != questions[currentQuestionIndex].answer){
    // penalize time
    time -= 10;
    // display new time on page
    feedbackEl.textContent = "Incorrect";
  }
  // else 
  else{
    feedbackEl.textContent = "Correct";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setInterval(function(){
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if(currentQuestionIndex === questions.length)
    // quizEnd
    quizEnd();
  // else 
  else
    // getQuestion
    getQuestion();
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  timerEl.textContent = time;

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.setAttribute("class", " ");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if(time <= 0)
    quizEnd();
  
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.toUpperCase();
  // make sure value wasn't empty
  if(initials === ""){ 
    alert("Input mustn't be blank'");
    return;
  }
  else if(initials.length > 3){
    alert("Input must be no more than 3 characters");
    return;
  }
  else{
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores;
    if(JSON.parse(localStorage.getItem("highscores")) != null)
      highscores = JSON.parse(window.localStorage.getItem("highscores"));
    else
      highscores = [];
    // format new score object for current user
    var newScore = {
      initials: initials,
      score: time
    };
    highscores.push(newScore);
    // save to localstorage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
    if(event.keyCode === 13)
      saveHighscore();
}

function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highScores = JSON.parse(localStorage.getItem("highscores"));
    if(highScores != null){
      // (optional) sort highscores by score property in descending order
      highScores.sort(function(a, b) {
        return parseInt(b.score) - parseInt(a.score);
      });
      // for each score
      for(var i = 0; i < highScores.length; i++){
        // create li tag for each high score
        var scoreLi = document.createElement("li");
        scoreLi.textContent = highScores[i].initials + " - " + highScores[i].score;
        // display on page
        document.getElementById("highscores").appendChild(scoreLi);
      }
      
    }
    else{
      var temp = document.getElementById("highscores");
      temp.textContent = "NO HIGH SCORES";     
    }
    
      
  }
  
  function clearHighscores() {
    // (and reload)
    localStorage.removeItem("highscores");
    location.reload();
  }
  
  // attach clear event to clear score button
  var clearButton = document.getElementById("clear");
  clearButton.addEventListener("click", function(){
    clearHighscores();
  })
  // run printhighscore when page loads
  printHighscores();

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

