const questions = [
    {
        question: "She ___ a video when the phone rang.",
        answers: ["edits", "was editing", "has edited", "will edit"],
        correct: 1
    },
    {
        question: "By next week, we ___ the project.",
        answers: ["finish", "finished", "will have finished", "are finishing"],
        correct: 2
    },
    {
        question: "The video ___ yesterday.",
        answers: ["is edited", "was edited", "has edited", "edited"],
        correct: 1
    },
    {
        question: "The audio ___ by the editor right now.",
        answers: ["is being mixed", "was mixed", "mixes", "has mixed"],
        correct: 0
    },
    {
        question: "He said: 'I am exporting the video.'",
        answers: [
            "He said he is exporting the video.",
            "He said he was exporting the video.",
            "He said he exports the video.",
            "He said he had exported the video."
        ],
        correct: 1
    },
    {
        question: "She said: 'We finished the edit.'",
        answers: [
            "She said they finished the edit.",
            "She said they had finished the edit.",
            "She said they finish the edit.",
            "She said they were finishing the edit."
        ],
        correct: 1
    },
    {
        question: "If I ___ more time, I would learn color grading.",
        answers: ["have", "had", "will have", "has"],
        correct: 1
    },
    {
        question: "If you export in 4K, the file ___ bigger.",
        answers: ["is", "was", "will be", "would be"],
        correct: 2
    },
    {
        question: "The footage had already ___ when we arrived.",
        answers: ["edit", "editing", "edited", "been edited"],
        correct: 3
    },
    {
        question: "He asked me if I ___ the timeline.",
        answers: ["finish", "finished", "had finished", "have finished"],
        correct: 2
    },
    {
        question: "This effect ___ in most professional videos.",
        answers: ["uses", "is used", "used", "was using"],
        correct: 1
    },
    {
        question: "She told me not ___ the original file.",
        answers: ["delete", "to delete", "deleting", "deleted"],
        correct: 1
    }
];

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

    setTimeout(nextQuestion, 1800);
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
