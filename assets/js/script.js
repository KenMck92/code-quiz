
var timer = document.querySelector("#timer");
var leaderBoard = [];
var rules = document.querySelector("p");
var header = document.querySelector("h1")
var head = document.querySelector(".head")

header.textContent = "Coding Quiz Challenge";
rules.textContent = "This coding quiz consist of timed multiple choice questions. Each time a question is answered incorrectly, the time will be reduced. GOOD LUCK!";


var quizQuestions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript",
        options: ["var", "let", "Both A and B", "None of the Above"],
        answer: 0,
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        options: ["Throws and error", "Ignores the statements", "Gives a warning", "None of the above"],
        answer: 1,
    },
    {
        question: "How can a datatype be declared to be a constant type?",
        options: ["constant", "let", "var", "const"],
        answer: 3,
    },
    {
        question: "Which of the following methods is used to access HTML elements using Javascript",
        options: ["getElementbyId()", "getElementsByClassName()", "Both A and B", "None of the Above"],
        answer: 2,
    },
];


var questionIndex = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;
var endTime;


var startQuiz = document.getElementById("start-quiz");
var questionElement = document.getElementById("questions");
var options = document.getElementById("options");
var submit = document.getElementById("submit");
var textBox = document.getElementById("initials");


startQuiz.addEventListener("click", startButtonClicked);
submit.addEventListener("click", saveScore);


submit.style.display = "none";
textBox.style.display = "none";
options.style.display = "none";
timer.style.display = "none";


function startButtonClicked() {
    setQuestion();
    startQuiz.style.display = "none";
    options.style.display = "block";
    head.style.display = "none";
    timer.style.display = "block";
    timerInterval = setInterval(updateTimer, 1175);
};


function updateTimer() {
    if (timeLeft <= 0) {
        endQuiz();
        return;
    };

    timeLeft--;
    timer.textContent = timeLeft;
};


function setQuestion() {
    var currentQuestion = quizQuestions[questionIndex];
    questionElement.textContent = currentQuestion.question;
    options.innerHTML = "";


    for (let i = 0; i < currentQuestion.options.length; i++) {
        const choice = document.createElement("li");
        choice.textContent = currentQuestion.options[i];
        choice.addEventListener("click", () => {
            checkAnswer(i);
        });
        options.appendChild(choice);
    };
};


function checkAnswer(answerIndex) {
    var currentQuestion = quizQuestions[questionIndex];
    if (timeLeft <= 0) {
        endQuiz();
    };

    if (answerIndex === currentQuestion.answer) {
        score++;
    } else {
        timeLeft -= 10;
    };

    questionIndex++;


    if (questionIndex < quizQuestions.length) {
        setQuestion();
    } else {
        endQuiz();
    };
};


function endQuiz() {
    endTime = timeLeft;
    timer.style.display = "none";
    options.style.display = "none";
    textBox.style.display = "block";
    submit.style.display = "block";
    questionElement.textContent = "Your score is " + score + " out of 4, with " + endTime + " seconds left. Enter your initials and click submit to save your score!";
    clearInterval(timerInterval);
};


function saveScore() {
    var initials = textBox.value;
    var userInfo = {
        user: initials,
        score: score,
        timeLeft: endTime
    };
    init();
    leaderBoard.push(userInfo)
    localStorage.setItem("leaderBoard", JSON.stringify(leaderBoard));
    console.log(leaderBoard);
    window.location.href="scoreboard.html";
};

function init() {
    var storedScores = JSON.parse(localStorage.getItem("leaderBoard"));
    
    if (storedScores != null) {
        leaderBoard = storedScores;
    }
};