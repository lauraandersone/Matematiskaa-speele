// Spēles sākšanas funkcija
function startGame() {
  window.location.href = "index2.html";
}
function restartGame() {
    window.location.href = "index2.html";
}

let currentQuestion = 0;
const totalQuestionsPerLevel = 5; // Piemēram, 5 uzdevumi katram līmenim
let lives = 3; // Sākotnējais dzīvību skaits
let secondsLeft = 120; // Laika limits uzdevuma risināšanai (sekundes)

document.addEventListener("DOMContentLoaded", function() {
    startTimer(); // Sāk laika skaitītāju
    generateQuestion(); // Ģenerē uzdevumu, kad lapa ir ielādēta
});

function startTimer() {
    const timerInterval = setInterval(() => {
        secondsLeft--;
        document.getElementById("timeLeft").textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            alert("Laiks beidzies!");
            nextQuestion();
        }
    }, 1000);
}

function generateQuestion() {
    // Atiestata laika skaitītāju uz sākotnējo vērtību
    secondsLeft = 120;
  
    // Iegūstam jautājumu un atbilžu variantus
    const questions = [
      {
        question: "Monomu 6x² dalot ar monomu 3x², iegūst:",
        answers: [
          { text: "A-3x⁴", isCorrect: true },
          { text: "B-2x⁴", isCorrect: false },
          { text: "C-2x⁶", isCorrect: false },
          { text: "D-3x⁶", isCorrect: false }
        ]
      },
      {
        question: "Izteiksme ",
        answers: [
          { text: "A-36", isCorrect: false },
          { text: "B- -36", isCorrect: false },
          { text: "C-Monom", isCorrect: true },
          { text: "D-Polimon", isCorrect: false }
        ]
      },
      // Pievienojiet vairākus citus uzdevumus ar atbildēm
    ];
  
    // Iegūstam jaunu uzdevumu
    const newQuestion = questions[currentQuestion];
    const question = newQuestion.question;
    const answers = newQuestion.answers;
  
    // Ģenerējam uzdevumu un pievienojam to HTML
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = ''; // Notīra jebkurus esošos uzdevumus
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<h3>Uzdevums</h3><p>${question}</p><p>Palikušās dzīvības: ${lives}</p><p>Palikušais laiks: <span id="timeLeft">${secondsLeft}</span> sekundes</p>`;
    questionContainer.appendChild(questionDiv);
  
    // Pievienojam atbilžu variantus
    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers");
    answers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.classList.add("btn", "btn-secondary", "mx-2");
        answerButton.textContent = answer.text;
        answerButton.addEventListener("click", () => checkAnswer(answer.isCorrect, answerButton));
        answersContainer.appendChild(answerButton);
    });
    questionContainer.appendChild(answersContainer);
}

function checkAnswer(isCorrect, button) {
    if (isCorrect) {
        button.classList.remove("btn-secondary");
        button.classList.add("btn-success");
        alert("Pareizi!");
    } else {
      button.classList.remove("btn-secondary");
      button.classList.add("btn-danger");
    }
    
    // Pagaidām atsvaidzina lapu pēc 2 sekundēm, bet jūs varat to mainīt uz jebkuru citu laika intervālu, ja nepieciešams
    setTimeout(() => {
      location.reload();
    }, 2000); // Atsvaidzina lapu pēc 2 sekundēm
  }