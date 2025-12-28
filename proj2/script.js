/**************** AUTH ****************/
let isLogin = true;

const authPage = document.getElementById("authPage");
const quizPage = document.getElementById("quizPage");
const authTitle = document.getElementById("authTitle");
const authBtn = document.getElementById("authBtn");
const toggleAuth = document.getElementById("toggleAuth");

toggleAuth.onclick = () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? "Login" : "Register";
    authBtn.innerText = isLogin ? "Login" : "Register";
    toggleAuth.innerText = isLogin ? "New user? Register" : "Already have account? Login";
};

authBtn.onclick = () => {
    const u = username.value.trim();
    const p = password.value.trim();
    if (!u || !p) return alert("Fill all fields");

    if (isLogin) {
        if (localStorage.getItem(u) === p) {
            authPage.classList.add("hidden");
            quizPage.classList.remove("hidden");
            resetBank();
            startNewSet();
        } else {
            alert("Invalid login");
        }
    } else {
        localStorage.setItem(u, p);
        alert("Registered successfully");
        toggleAuth.click();
    }
};

/**************** QUESTIONS (ADD UP TO 50+) ****************/
const originalBank = [
 {q:"Preamble declares India as?", o:["Republic","Monarchy","Empire","Dictatorship"], a:0},
 {q:"Article 14 relates to?", o:["Freedom","Equality","Religion","Remedy"], a:1},
 {q:"Father of Indian Constitution?", o:["Nehru","Ambedkar","Gandhi","Patel"], a:1},
 {q:"Right to Life is Article?", o:["19","20","21","22"], a:2},
 {q:"DPSP is in?", o:["Part III","Part IV","Part V","Part VI"], a:1},
 {q:"Anti-defection law?", o:["9th","10th","11th","12th"], a:1},
 {q:"Languages in Schedule?", o:["7th","8th","9th","10th"], a:1},
 {q:"Emergency Part?", o:["XVII","XVIII","XIX","XX"], a:1},
 {q:"Guardian of Constitution?", o:["President","PM","Supreme Court","Parliament"], a:2},
 {q:"Constitution adopted in?", o:["1947","1949","1950","1952"], a:1}
];

/**************** QUIZ ENGINE ****************/
let questionPool = [];
let currentSet = [];
let index = 0;
let score = 0;
let time = 10;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const infoEl = document.getElementById("info");
const timerEl = document.getElementById("timer");

function resetBank() {
    questionPool = [...originalBank];
}

function startNewSet() {
    if (questionPool.length < 5) resetBank();

    currentSet = questionPool.splice(0, 5);
    index = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    time = 10;
    updateTimer();

    const q = currentSet[index];
    questionEl.innerText = q.q;
    optionsEl.innerHTML = "";
    infoEl.innerText = `Question ${index + 1} of 5`;

    q.o.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(btn, i);
        optionsEl.appendChild(btn);
    });

    timer = setInterval(() => {
        time--;
        updateTimer();
        if (time === 0) nextQuestion();
    }, 1000);
}

function updateTimer() {
    timerEl.innerText = "Time: " + time;
}

function checkAnswer(button, i) {
    clearInterval(timer);
    const correctIndex = currentSet[index].a;
    const buttons = document.querySelectorAll(".option");

    buttons.forEach(b => b.disabled = true);

    if (i === correctIndex) {
        button.style.background = "green";
        score++;
    } else {
        button.style.background = "red";
        buttons[correctIndex].style.background = "green";
    }

    setTimeout(nextQuestion, 800);
}

function nextQuestion() {
    index++;
    if (index < 5) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionEl.innerText = "Set Finished";
    optionsEl.innerHTML = "";

    if (score === 5) {
        infoEl.innerText = "🎉 You did best! Score: 5/5";
    } else {
        infoEl.innerText = `Score: ${score}/5 | Next set starting...`;
    }

    setTimeout(startNewSet, 2500);
}
const forgotPass = document.getElementById("forgotPass");

forgotPass.onclick = () => {
    const u = prompt("Enter your username");
    if (!u) return;

    if (localStorage.getItem(u)) {
        const newPass = prompt("Enter new password");
        if (!newPass) return;
        localStorage.setItem(u, newPass);
        alert("Password reset successful. Please login.");
    } else {
        alert("User not found");
    }
};
