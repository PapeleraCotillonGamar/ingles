const questions = [
    {
        question: "She was born ___ 1995.",
        answers: ["in", "on", "at", "to"],
        correct: 0
    },
    {
        question: "The meeting starts ___ 9 a.m.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "We have an exam ___ Monday.",
        answers: ["in", "on", "at", "during"],
        correct: 1
    },
    {
        question: "He lives ___ Argentina.",
        answers: ["in", "on", "at", "to"],
        correct: 0
    },
    {
        question: "The shop closes ___ night.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "They arrived ___ the airport early.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "I’ll see you ___ the weekend.",
        answers: ["in", "on", "at", "during"],
        correct: 2
    },
    {
        question: "She is working ___ the moment.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "The keys are ___ the table.",
        answers: ["in", "on", "at", "under"],
        correct: 1
    },
    {
        question: "We usually go on vacation ___ July.",
        answers: ["in", "on", "at", "by"],
        correct: 0
    },
    {
        question: "The concert is ___ Friday night.",
        answers: ["in", "on", "at", "during"],
        correct: 1
    },
    {
        question: "He studies ___ night and works during the day.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "She met him ___ a party.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "We stayed ___ a hotel near the beach.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "The children are playing ___ the garden.",
        answers: ["in", "on", "at", "to"],
        correct: 0
    },
    {
        question: "The movie starts ___ the evening.",
        answers: ["in", "on", "at", "during"],
        correct: 0
    },
    {
        question: "She arrived ___ home late.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "We stopped ___ the traffic lights.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "He was sitting ___ the bus.",
        answers: ["in", "on", "at", "by"],
        correct: 1
    },
    {
        question: "The class is ___ room 204.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "She likes to read ___ bed.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "They got married ___ spring.",
        answers: ["in", "on", "at", "during"],
        correct: 0
    },
    {
        question: "The cat is sleeping ___ the sofa.",
        answers: ["in", "on", "at", "by"],
        correct: 1
    },
    {
        question: "We arrived ___ the restaurant on time.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "He works ___ a hospital.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "The temperature is highest ___ noon.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "She left her phone ___ the office.",
        answers: ["in", "on", "at", "by"],
        correct: 0
    },
    {
        question: "We met ___ the corner of the street.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    },
    {
        question: "He usually wakes up ___ sunrise.",
        answers: ["in", "on", "at", "by"],
        correct: 2
    },
    {
        question: "The exhibition is ___ the city museum.",
        answers: ["in", "on", "at", "to"],
        correct: 2
    }
];

let current = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");

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
        showFeedback(true);
    } else {
        showFeedback(false);
    }

    setTimeout(nextQuestion, 2000);
}

function showFeedback(isCorrect) {
    feedbackEl.textContent = isCorrect ? "RIGHT" : "WRONG";
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
    questionEl.textContent = "Exam Finished!";
    answersEl.innerHTML = `
        <h2>Score: ${score} / ${questions.length}</h2>
        <h3>Level: ${score / questions.length >= 0.7 ? "B2" : "B1"}</h3>
    `;
}
