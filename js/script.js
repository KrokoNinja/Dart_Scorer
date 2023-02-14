const buttons = document.getElementsByTagName("button")
const input_score = document.getElementById("btn-input-score")
const player_score = document.getElementById("player_score")
const opponent_score = document.getElementById("opponent_score")
let player_legs_score = document.getElementById("player_legs_count")
let player_sets_score = document.getElementById("player_sets_count")
let opponent_legs_score = document.getElementById("opponent_legs_count")
let opponent_sets_score = document.getElementById("opponent_sets_count")
let player_last_score = document.getElementById("player_last")
let opponent_last_score = document.getElementById("opponent_last")
let player_average_leg = document.getElementById("player_average_leg")
let player_average_overall = document.getElementById("player_average_overall")

const not_checkable = [169, 168, 166, 165, 163, 162, 159]
let old_player_score = []
let player_rounds = 0
let player_rounds_leg = [0]
let player_last_scored = [0]
let player_leg_average = []
let player_overall_average = []

let lastTouchEnd = 0
document.addEventListener("touchstart", function (e) {
    lastTouchEnd = e.timeStamp
})
document.addEventListener("touchend", function (e){
    const now = e.timeStamp
    if (now-lastTouchEnd <= 10){
        e.preventDefault()
    }
})


function doubleTapPreventZoom(event) {
    const now = event.timeStamp;
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}

document.addEventListener("keyup", (pressed) => {
    for(let i = 0; i < buttons.length; i++){
        buttons[i].blur()
    }
    var name = pressed.key;
    var code = pressed.code;
     // Alert the key name and key code on keydown
    if (code.startsWith("Digit")){
        if (input_score.innerHTML == 0){
            input_score.innerHTML = name
        }
        else{
            input_score.innerHTML += name
        }
        if (parseInt(input_score.innerHTML) > 180){
            input_score.classList.remove("btn-outline-dark")
            input_score.classList.add("btn-outline-warning")
        }
    }
    if (code == "Backspace"){
        input_score.innerHTML = input_score.innerHTML.slice(0,-1)
        if (input_score.innerHTML == ""){
            input_score.innerHTML = 0
        }
        if (parseInt(input_score.innerHTML) < 180){
            input_score.classList.add("btn-outline-dark")
            input_score.classList.remove("btn-outline-warning")
        }
    }
    if (code == "Enter" && !input_score.classList.contains("btn-outline-warning")){
        buttonPressed("okay")
    }

})

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function (){
        if (!buttons[i].classList.contains("hotkey") && input_score.innerHTML.trim() != "0" && buttons[i].value != "togo" && buttons[i].value != "undo" && buttons[i].value != "okay"){
            input_score.innerHTML += buttons[i].value
        }
        else if (!buttons[i].classList.contains("hotkey") && buttons[i].value != "togo" && buttons[i].value != "undo" && buttons[i].value != "okay") {
            input_score.innerHTML = buttons[i].value
        }
        if (parseInt(input_score.innerHTML) > 180){
            input_score.classList.remove("btn-outline-dark")
            input_score.classList.add("btn-outline-warning")
        }
        if(buttons[i].value == "clear"){
            buttonPressed("clear")
        }
        if (buttons[i].value == "okay"){
            if (parseInt(input_score.innerHTML) >= 0 && parseInt(input_score.innerHTML) <= 180 && parseInt(player_score.innerHTML) >= 0 && parseInt(player_score.innerHTML) > parseInt(input_score.innerHTML)){
                buttonPressed("okay")
            }
        }
        if (buttons[i].classList.contains("hotkey")){
            if(parseInt(player_score.innerHTML) > parseInt(buttons[i].value)){
                buttonPressed("hotkey", buttons[i].value)
            }
        }
        if (buttons[i].value == "undo"){
            buttonPressed("undo")
        }
        if (buttons[i].value == "togo"){
            if (parseInt(player_score.innerHTML) <= 170 && !not_checkable.includes(parseInt(player_score.innerHTML))){
                newLeg()
            }
        }
    })
}


function buttonPressed(key, value = 0){
    switch (key) {
        case "okay":
            old_player_score.push(parseInt(player_score.innerHTML))
            player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(input_score.innerHTML)
            player_last_scored.push(parseInt(input_score.innerHTML))
            player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
            input_score.innerHTML = 0
            calculateAverage("okay")
            break;
        case "undo":
            undoScore()
            break;
        case "hotkey":
            old_player_score.push(parseInt(player_score.innerHTML))
            player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(value)
            player_last_scored.push(parseInt(value))
            player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
            input_score.innerHTML = 0
            calculateAverage("hotkey")
            break;
        case "clear":
            input_score.innerHTML = 0;
            input_score.classList.add("btn-outline-dark")
            input_score.classList.remove("btn-outline-warning")
            break;
    }
}

function newLeg() {
    old_player_score.push(parseInt(player_score.innerHTML))
    player_last_scored.push(parseInt(player_score.innerHTML))
    player_score.innerHTML = 501
    opponent_score.innerHTML = 501
    player_legs_score.innerHTML = parseInt(player_legs_score.innerHTML) + 1
    player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
    player_rounds += 1
    player_rounds_leg.push(0)
    player_leg_average = 0
    calculateAverage("togo")
}

function undoScore() {
    input_score.innerHTML = 0;
    input_score.classList.add("btn-outline-dark")
    input_score.classList.remove("btn-outline-warning")
    if (old_player_score.length > 0) {
        if (parseInt(player_score.innerHTML) == 501) {
            player_legs_score.innerHTML = parseInt(player_legs_score.innerHTML) - 1
        }
        player_score.innerHTML = old_player_score[old_player_score.length - 1]
        old_player_score.pop()
        player_last_scored.pop()
        player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
        player_rounds -= 1
        if (player_rounds_leg.length >= parseInt(player_legs_score.innerHTML) + 2){
            player_rounds_leg.pop()
        }
        else if (player_rounds_leg[parseInt(player_legs_score.innerHTML)] - 1 >= 0){
            player_rounds_leg[parseInt(player_legs_score.innerHTML)] -= 1
        }
        if (player_rounds_leg[parseInt(player_legs_score.innerHTML)] == 0 && player_rounds != 0){
            player_leg_average = 0
        }
        else if (player_rounds == 0) {
            player_leg_average = 0
            player_overall_average = 0
        }
        calculateAverage("undo")
    }
}

function calculateAverage(key) {
    if (key !== "togo" && key !== "undo"){
        player_rounds += 1
        player_rounds_leg[parseInt(player_legs_score.innerHTML)] += 1
    }
    let player_scored = player_last_scored.reduce(function (a,b){return a+b;})
    if (player_rounds_leg[parseInt(player_legs_score.innerHTML)] != 0) {
        player_leg_average = (501 - player_score.innerHTML) / player_rounds_leg[parseInt(player_legs_score.innerHTML)]
    }
    if (player_rounds != 0){
        player_overall_average = player_scored / player_rounds
    }
    player_average_leg.innerHTML = parseFloat(player_leg_average).toFixed(2);
    player_average_overall.innerHTML = parseFloat(player_overall_average).toFixed(2);
}