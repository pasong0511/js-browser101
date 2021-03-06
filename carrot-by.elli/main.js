'use strict'

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();     //엘리먼트의 위치 정보를 알아옴
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer =  undefined;


gameBtn.addEventListener("click", () => {
    if(started) {
        stopGame();
    } else {
        starGame();
    }
    started = !started;
});

function stopGame(){

}

function starGame(){
    initGame();
    showStopButton();
    showTimerAndScore();    //게임이 시작시 타이머와 스코어를 보여줌
    startGameTimer();        //타이머 작동

}

function showTimerAndScore() {
    gameTimer.style.visibility = "visible";
    gameScore.style.visibility = "visible";
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);

    timer = setInterval(() => {
        if(remainingTimeSec <= 0){
            crearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const secondes = time % 60;
    gameTimer.innerText = `${minutes}:${secondes}`;
}

function showStopButton() {
    const icon = gameBtn.querySelector(".fa-play");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
}

function initGame() {
    field.innerHTML = "";   //field 초기화  플레이 버튼 누를때마다 초기화
    gameScore.innerText = CARROT_COUNT;

    //벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem("carrot", CARROT_COUNT, "img/carrot.png");
    addItem("bug", BUG_COUNT, "img/bug.png");

}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0 ; i < count; i++) {
        const item = document.createElement("img");
        
        item.setAttribute("class", className);
        item.setAttribute("src", imgPath);
        item.style.position = "absolute";
        
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);

        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}