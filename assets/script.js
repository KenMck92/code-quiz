var header = document.querySelector(".head")
var rules = document.querySelector("p")
var startQuiz = document.querySelector(".btn");
var form = document.querySelector(".form");

var firstQue = document.querySelector(".first-que");

header.textContent = "Coding Quiz Challenge";
rules.textContent = "This coding quiz consist of timed multiple choice questions. Each time a question is answered incorrectly, the time will be reduced. GOOD LUCK!";

startQuiz.addEventListener("click", function() {
    if (startQuiz) {
        firstQue.textContent = "What is an Array?";
        form.style.display = 'none';
    }
});