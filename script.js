const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        {text: "Hyper Text Markup Language", correct: true},
        {text: "High Text Machine Language", correct: false},
        {text: "Hyper Tool Multi Language", correct: false},
        {text: "Home Tool Markup Language", correct: false}
    ]
},
{
    question: "Which language is used for styling web pages?",
    answers: [
        {text: "HTML", correct: false},
        {text: "CSS", correct: true},
        {text: "Python", correct: false},
        {text: "Java", correct: false}
    ]
},
{
    question: "Which language is used to make websites interactive?",
    answers: [
        {text: "CSS", correct: false},
        {text: "JavaScript", correct: true},
        {text: "HTML", correct: false},
        {text: "SQL", correct: false}
    ]
},
{
    question: "Which tag is used for the largest heading?",
    answers: [
        {text: "<h6>", correct: false},
        {text: "<heading>", correct: false},
        {text: "<h1>", correct: true},
        {text: "<head>", correct: false}
    ]
},
{
    question: "Which company developed JavaScript?",
    answers: [
        {text: "Google", correct: false},
        {text: "Microsoft", correct: false},
        {text: "Netscape", correct: true},
        {text: "Apple", correct: false}
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const progressFill =
document.getElementById("progress-fill");

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz(){

    currentQuestionIndex = 0;
    score = 0;

    nextBtn.innerHTML = "Next";

    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    nextBtn.innerHTML =
    currentQuestionIndex === questions.length - 1
    ? "Submit"
    : "Next";
    progress.innerHTML =
    `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressFill.style.width =
    `${((currentQuestionIndex + 1) / questions.length) * 100}%`;

    questionElement.innerHTML =
    currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("btn");

        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });

}

function resetState(){

    nextBtn.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){

    const selectedBtn = e.target;

    const isCorrect =
    selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {

        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;

    });
    console.log(currentQuestionIndex);

    nextBtn.style.display = "block";
}

function showScore(){

    resetState();

    progress.innerHTML = "Quiz Completed!";

    let message = "";

    if(score === 5){
        message = "🏆 Excellent!";
    }
    else if(score >= 3){
        message = "👏 Good Job!";
    }
    else{
        message = "📚 Keep Practicing!";
    }

    questionElement.innerHTML =
    `You scored ${score} out of ${questions.length}<br><br>${message}`;

    nextBtn.innerHTML = "Restart Quiz";

    nextBtn.style.display = "block";
}

function handleNextButton(){

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }

});
