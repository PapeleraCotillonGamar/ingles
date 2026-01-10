let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

loadQuestion();

function loadQuestion() {
    answered = false;
    answersEl.innerHTML = "";
    feedbackEl.classList.add("hidden");

    questionEl.textContent = questions[current].question;

    questions[current].answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.className = "answer-btn";
        btn.onclick = () => selectAnswer(btn, index);
        answersEl.appendChild(btn);
    });
}

function selectAnswer(button, index) {
    if (answered) return;
    answered = true;

    const correct = questions[current].correct;
    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.classList.add("correct");
        if (i === index && i !== correct) btn.classList.add("wrong");
    });

    if (index === correct) {
        score++;
        scoreEl.textContent = score;
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    setTimeout(nextQuestion, 1600);
}

function showFeedback(isCorrect) {
    feedbackEl.textContent = isCorrect ? "CORRECTO" : "INCORRECTO";
    feedbackEl.className = "feedback " + (isCorrect ? "right" : "wrong");
}

function nextQuestion() {
    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionEl.textContent = "¡Examen finalizado!";
    answersEl.innerHTML = `
        <h2>Puntuación: ${score} / ${questions.length}</h2>
    `;
}
