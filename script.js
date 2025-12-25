const questionPool = [
    {question:"Who is the current President of India?", options:["Ram Nath Kovind","Droupadi Murmu","Pranab Mukherjee","APJ Abdul Kalam"], answer:"Droupadi Murmu"},
    {question:"Which country won the FIFA World Cup 2022?", options:["Brazil","Argentina","France","Germany"], answer:"Argentina"},
    {question:"The headquarters of IMF is located in?", options:["New York","Geneva","Washington DC","London"], answer:"Washington DC"},
    {question:"National Science Day is celebrated on?", options:["28 Feb","15 March","22 April","1 Jan"], answer:"28 Feb"},
    {question:"Which planet is known as the Red Planet?", options:["Earth","Mars","Jupiter","Venus"], answer:"Mars"},
    {question:"The Prime Minister of India in 2025 is?", options:["Narendra Modi","Amit Shah","Rajnath Singh","Yogi Adityanath"], answer:"Narendra Modi"},
    {question:"Which river is called 'Sorrow of Bihar'?", options:["Ganga","Kosi","Yamuna","Ghaghara"], answer:"Kosi"},
    {question:"The largest desert in the world is?", options:["Sahara","Gobi","Kalahari","Thar"], answer:"Sahara"},
    {question:"India won its first Olympic gold in hockey in?", options:["1928","1932","1948","1952"], answer:"1928"},
    {question:"Which is the fastest animal on land?", options:["Cheetah","Lion","Tiger","Leopard"], answer:"Cheetah"},
];

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let quizCount = 0;
const maxQuizzes = 10;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const progressBar = document.getElementById('progress-bar');

let timer;
const timeLimit = 10; // 10 seconds per question
let timeRemaining;

// ==== Confetti Animation ====
function createConfetti() {
    for(let i=0;i<50;i++){
        const conf = document.createElement('div');
        conf.classList.add('confetti');
        conf.style.left = Math.random()*100 + 'vw';
        conf.style.background = `hsl(${Math.random()*360},100%,50%)`;
        conf.style.animationDuration = 3+Math.random()*2+'s';
        conf.style.width = 6+Math.random()*8+'px';
        conf.style.height = 6+Math.random()*8+'px';
        document.body.appendChild(conf);
        setTimeout(()=> conf.remove(),5000);
    }
}

// ==== Start Quiz ====
function startQuiz() {
    if(quizCount >= maxQuizzes){
        questionEl.innerHTML = "All quizzes completed!";
        optionsEl.innerHTML = "";
        restartBtn.style.display = "none";
        progressBar.style.width = "100%";
        createConfetti();
        return;
    }

    currentQuestions = [];
    currentIndex = 0;
    score = 0;
    scoreEl.innerHTML = "";
    restartBtn.style.display = "none";

    let tempPool = [...questionPool];
    for(let i=0;i<10;i++){
        let idx = Math.floor(Math.random()*tempPool.length);
        currentQuestions.push(tempPool[idx]);
        tempPool.splice(idx,1);
    }

    progressBar.style.width = "0%";
    showQuestion();
}

// ==== Show Current Question ====
function showQuestion() {
    if(currentIndex >= currentQuestions.length){
        scoreEl.innerHTML = `Your score: ${score} / ${currentQuestions.length}`;
        restartBtn.style.display = "block";
        quizCount++;
        createConfetti();
        return;
    }

    const q = currentQuestions[currentIndex];
    questionEl.innerHTML = q.question + ` <span style="font-size:16px; color:#0ff;">(Time: 10s)</span>`;
    optionsEl.innerHTML = "";

    q.options.forEach(option=>{
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.onclick = () => selectAnswer(option);
        optionsEl.appendChild(btn);
    });

    progressBar.style.width = ((currentIndex+1)/currentQuestions.length)*100 + "%";

    // Start timer
    timeRemaining = timeLimit;
    updateTimerDisplay();
    clearInterval(timer);
    timer = setInterval(countdown, 1000);
}

// ==== Timer Countdown ====
function countdown() {
    timeRemaining--;
    updateTimerDisplay();
    if(timeRemaining <= 0){
        clearInterval(timer);
        alert("Time's up! You lost this question.");
        nextQuestion();
    }
}

function updateTimerDisplay() {
    const timeSpan = document.createElement('span');
    timeSpan.id = "timer-span";
    timeSpan.innerText = ` (${timeRemaining}s left)`;
    const existing = document.getElementById("timer-span");
    if(existing) existing.remove();
    questionEl.appendChild(timeSpan);
}

// ==== Select Answer ====
function selectAnswer(selected){
    clearInterval(timer);
    const correct = currentQuestions[currentIndex].answer;
    if(selected === correct) score++;
    nextQuestion();
}

// ==== Go to Next Question ====
function nextQuestion(){
    currentIndex++;
    setTimeout(showQuestion, 300); // small delay for smooth transition
}

// ==== Restart Quiz ====
restartBtn.addEventListener('click', startQuiz);

// ==== Initial Start ====
startQuiz();
