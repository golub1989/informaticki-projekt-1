const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answer_text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptAnswer = false;
let score = 0;
let questionCounter = 0;
let allQuestions = [];

let questions = [
    {
        question: "What was the score in the World Cup final 2018?",
        answer1: "France 3-2 Croatia",
        answer2: "France 1-3 Croatia",
        answer3: "France 4-2 Croatia",
        answer4: "France 2-2 Croatia",
        answer: 3
    },
    {
        question: "Who is the first player to score an own goal in a World Cup final?",
        answer1: "Mario Mandžukić",
        answer2: "Raphaël Varane",
        answer3: "Ivan Perišić",
        answer4: "Paul Pogba",
        answer: 1
    },
    {
        question: "Who is the youngest player to score in a World Cup final?",
        answer1: "Antoine Griezmann",
        answer2: "Benjamin Pavard",
        answer3: "Diego Maradona",
        answer4: "Kylian Mbappé",
        answer: 4
    },
    {
        question: "Which stadium hosted World Cup 2018 final match?",
        answer1: "Kaliningrad Stadium",
        answer2: "Luzhniki Stadium",
        answer3: "Fisht Stadium",
        answer4: "Kazan Arena",
        answer: 2
    },
    {
        question: "Who was the referee in the 2018 World Cup final?",
        answer1: "Cüneyt Çakır",
        answer2: "Damir Skomina",
        answer3: "Néstor Pitana",
        answer4: "Enrique Cáceres",
        answer: 3
    }
];

const CORRECT_POINTS = 10;
const MAX_QUESTIONS = 5;

startQuiz = () => {
    questionCounter = 0;
    score: 0;
    allQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (allQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("yourScore", score);
        return window.location.assign("the_end.html");
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * allQuestions.length);
    currentQuestion = allQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    answers.forEach( answer => {
        const number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });

    allQuestions.splice(questionIndex, 1);

    acceptAnswer = true;
};

answers.forEach( answer => {
    answer.addEventListener("click", e => {
        if (!acceptAnswer) return;

        acceptAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const applyAnswer =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (applyAnswer === "correct") {
            incrementScore(CORRECT_POINTS);
        }

        selectedChoice.parentElement.classList.add(applyAnswer);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(applyAnswer);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startQuiz();