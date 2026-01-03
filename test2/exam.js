const questions = [
    {
        question: "They ___ a new lesson before the class started.",
        answers: ["prepare", "were preparing", "had prepared", "have prepared"],
        correct: 2
    },
    {
        question: "The email ___ by the manager every morning.",
        answers: ["checks", "is checked", "was checked", "has checked"],
        correct: 1
    },
    {
        question: "She said: 'I will call you later.'",
        answers: [
            "She said she will call me later.",
            "She said she would call me later.",
            "She said she calls me later.",
            "She said she had called me later."
        ],
        correct: 1
    },
    {
        question: "If he ___ harder, he would pass the exam.",
        answers: ["studies", "studied", "will study", "has studied"],
        correct: 1
    },
    {
        question: "The project ___ by the team right now.",
        answers: ["is finishing", "is finished", "is being finished", "has finished"],
        correct: 2
    },
    {
        question: "We ___ the movie when the power went out.",
        answers: ["watch", "watched", "were watching", "have watched"],
        correct: 2
    },
    {
        question: "She asked me where I ___ from.",
        answers: ["am", "was", "were", "have been"],
        correct: 1
    },
    {
        question: "The documents ___ tomorrow.",
        answers: ["send", "are sent", "will be sent", "have sent"],
        correct: 2
    },
    {
        question: "He ___ already finished the report.",
        answers: ["has", "had", "will have", "is"],
        correct: 0
    },
    {
        question: "If we leave now, we ___ on time.",
        answers: ["arrive", "arrived", "will arrive", "would arrive"],
        correct: 2
    },
    {
        question: "The room ___ cleaned before the guests arrived.",
        answers: ["is", "was", "has been", "had been"],
        correct: 3
    },
    {
        question: "She told me that she ___ busy.",
        answers: ["is", "was", "will be", "has been"],
        correct: 1
    },
    {
        question: "This software ___ in many schools.",
        answers: ["uses", "is using", "is used", "used"],
        correct: 2
    },
    {
        question: "By the time we arrived, they ___ eating.",
        answers: ["start", "started", "had started", "have started"],
        correct: 2
    },
    {
        question: "He asked if I ___ help.",
        answers: ["need", "needed", "will need", "have needed"],
        correct: 1
    },
    {
        question: "The mistake ___ by the teacher.",
        answers: ["noticed", "was noticing", "was noticed", "has noticing"],
        correct: 2
    },
    {
        question: "If I had known, I ___ earlier.",
        answers: ["come", "came", "would come", "would have come"],
        correct: 3
    },
    {
        question: "She ___ to music while studying.",
        answers: ["listens", "is listening", "was listening", "has listened"],
        correct: 0
    },
    {
        question: "The lesson ___ already been explained.",
        answers: ["has", "had", "was", "is"],
        correct: 0
    },
    {
        question: "He said: 'I can't finish today.'",
        answers: [
            "He said he can't finish today.",
            "He said he couldn't finish that day.",
            "He said he won't finish today.",
            "He said he hadn't finished today."
        ],
        correct: 1
    },
    {
        question: "The car ___ repaired last week.",
        answers: ["is", "was", "has been", "will be"],
        correct: 1
    },
    {
        question: "We ___ this app for months.",
        answers: ["develop", "are developing", "have been developing", "developed"],
        correct: 2
    },
    {
        question: "She asked me to ___ quiet.",
        answers: ["be", "being", "been", "was"],
        correct: 0
    },
    {
        question: "If it rains, we ___ at home.",
        answers: ["stay", "stayed", "will stay", "would stay"],
        correct: 2
    },
    {
        question: "The song ___ by millions of people.",
        answers: ["listens", "is listened", "is listened to", "was listening"],
        correct: 2
    },
    {
        question: "He ___ TV when I called him.",
        answers: ["watches", "watched", "was watching", "has watched"],
        correct: 2
    },
    {
        question: "She said she ___ never been there before.",
        answers: ["has", "had", "was", "is"],
        correct: 1
    },
    {
        question: "The test ___ at the moment.",
        answers: ["corrects", "is correcting", "is being corrected", "has corrected"],
        correct: 2
    },
    {
        question: "If they had left earlier, they ___ the train.",
        answers: ["catch", "caught", "would catch", "would have caught"],
        correct: 3
    },
    {
        question: "This rule ___ explained clearly.",
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
