const questions = [
    {
        question: "She ___ finished her homework before dinner.",
        answers: ["has", "had", "was", "is"],
        correct: 0
    },
    {
        question: "The report ___ by the assistant yesterday.",
        answers: ["writes", "is written", "was written", "has written"],
        correct: 2
    },
    {
        question: "He said: 'I am studying for the test.'",
        answers: [
            "He said he is studying for the test.",
            "He said he was studying for the test.",
            "He said he studied for the test.",
            "He said he has studied for the test."
        ],
        correct: 1
    },
    {
        question: "If she ___ more confident, she would speak more.",
        answers: ["is", "was", "were", "had been"],
        correct: 2
    },
    {
        question: "The house ___ painted at the moment.",
        answers: ["is", "is being", "was being", "has been"],
        correct: 1
    },
    {
        question: "They ___ for the bus when it started raining.",
        answers: ["wait", "waited", "were waiting", "have waited"],
        correct: 2
    },
    {
        question: "She asked me what I ___ doing.",
        answers: ["am", "was", "were", "have been"],
        correct: 1
    },
    {
        question: "The invitations ___ next week.",
        answers: ["send", "are sending", "will be sent", "have sent"],
        correct: 2
    },
    {
        question: "He ___ never seen that movie before.",
        answers: ["has", "had", "was", "is"],
        correct: 0
    },
    {
        question: "If you press this button, the machine ___.",
        answers: ["start", "started", "will start", "would start"],
        correct: 2
    },
    {
        question: "The room ___ cleaned when we arrived.",
        answers: ["is", "was", "has been", "had been"],
        correct: 3
    },
    {
        question: "She said that she ___ late.",
        answers: ["is", "was", "will be", "has been"],
        correct: 1
    },
    {
        question: "This product ___ in several countries.",
        answers: ["sells", "is selling", "is sold", "sold"],
        correct: 2
    },
    {
        question: "By the time he arrived, we ___ dinner.",
        answers: ["finish", "finished", "had finished", "have finished"],
        correct: 2
    },
    {
        question: "He asked if I ___ the instructions.",
        answers: ["understand", "understood", "will understand", "have understood"],
        correct: 1
    },
    {
        question: "The error ___ immediately.",
        answers: ["noticed", "was noticed", "has noticing", "was noticing"],
        correct: 1
    },
    {
        question: "If I had studied more, I ___ the exam.",
        answers: ["pass", "passed", "would pass", "would have passed"],
        correct: 3
    },
    {
        question: "She usually ___ coffee in the morning.",
        answers: ["drink", "drinks", "is drinking", "drank"],
        correct: 1
    },
    {
        question: "The work ___ already been completed.",
        answers: ["has", "had", "was", "is"],
        correct: 0
    },
    {
        question: "He said: 'We are moving next month.'",
        answers: [
            "He said they are moving next month.",
            "He said they were moving the next month.",
            "He said they moved next month.",
            "He said they had moved next month."
        ],
        correct: 1
    },
    {
        question: "The package ___ delivered this morning.",
        answers: ["is", "was", "has been", "will be"],
        correct: 2
    },
    {
        question: "We ___ this software since January.",
        answers: ["use", "are using", "have been using", "used"],
        correct: 2
    },
    {
        question: "She asked me to ___ the door.",
        answers: ["close", "closing", "closed", "to closing"],
        correct: 0
    },
    {
        question: "If he doesn't hurry, he ___ late.",
        answers: ["is", "was", "will be", "would be"],
        correct: 2
    },
    {
        question: "The movie ___ by a famous director.",
        answers: ["directs", "is directing", "is directed", "directed"],
        correct: 2
    },
    {
        question: "He ___ when the teacher entered the room.",
        answers: ["talks", "talked", "was talking", "has talked"],
        correct: 2
    },
    {
        question: "She said she ___ already finished.",
        answers: ["has", "had", "was", "is"],
        correct: 1
    },
    {
        question: "The exams ___ right now.",
        answers: ["correct", "are correcting", "are being corrected", "have corrected"],
        correct: 2
    },
    {
        question: "If they had listened, they ___ the problem.",
        answers: ["avoid", "avoided", "would avoid", "would have avoided"],
        correct: 3
    },
    {
        question: "This word ___ often used in formal English.",
        answers: ["doesn't", "isn't", "wasn't", "hasn't"],
        correct: 1
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
