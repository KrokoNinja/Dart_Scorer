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
let player_rounds_leg = 0
let player_last_scored = [0]
let player_leg_scored = [0]
let player_scored_leg = 0
let player_scored = 0
let player_leg_average = []
let player_overall_average = []

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", function (){
        if (!buttons[i].classList.contains("hotkey") && input_score.innerHTML.trim() != "0" && buttons[i].value != "togo" && buttons[i].value != "undo" && buttons[i].value != "okay"){
            input_score.innerHTML += buttons[i].value
        }
        else if (!buttons[i].classList.contains("hotkey") && buttons[i].value != "togo" && buttons[i].value != "undo" && buttons[i].value != "okay") {
            input_score.innerHTML = buttons[i].value
        }
        if(buttons[i].value === "clear"){
            input_score.innerHTML = 0;
            input_score.classList.add("btn-outline-dark")
            input_score.classList.remove("btn-outline-warning")
        }
        if (parseInt(input_score.innerHTML) > 180){
            input_score.classList.remove("btn-outline-dark")
            input_score.classList.add("btn-outline-warning")
        }
        if (buttons[i].value == "okay"){
            if (parseInt(input_score.innerHTML) >= 0 && parseInt(input_score.innerHTML) <= 180 && parseInt(player_score.innerHTML) >= 0 && parseInt(player_score.innerHTML) > parseInt(input_score.innerHTML)){
                old_player_score.push(parseInt(player_score.innerHTML))
                player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(input_score.innerHTML)
                player_last_scored.push(parseInt(input_score.innerHTML))
                player_leg_scored.push(parseInt(input_score.innerHTML))
                player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
                input_score.innerHTML = 0
                calculateAverage("okay")
            }
        }
        if (buttons[i].classList.contains("hotkey")){
            if(parseInt(player_score.innerHTML) > parseInt(buttons[i].value)){
                old_player_score.push(parseInt(player_score.innerHTML))
                player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(buttons[i].value)
                player_last_scored.push(parseInt(buttons[i].value))
                player_leg_scored.push(parseInt(buttons[i].value))
                player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
                input_score.innerHTML = 0
                calculateAverage("hotkey")
            }
        }
        if (buttons[i].value == "undo"){
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
                player_leg_scored.pop()
                calculateAverage("undo")
                player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
            }
        }
        if (buttons[i].value == "togo"){
            if (parseInt(player_score.innerHTML) <= 170 && !not_checkable.includes(parseInt(player_score.innerHTML))){
                old_player_score.push(parseInt(player_score.innerHTML))
                player_last_scored.push(parseInt(player_score.innerHTML))
                player_leg_scored.push(parseInt(player_score.innerHTML))
                player_score.innerHTML = 501
                opponent_score.innerHTML = 501
                player_legs_score.innerHTML = parseInt(player_legs_score.innerHTML) + 1
                player_last_score.innerHTML = player_last_scored[player_last_scored.length - 1]
                calculateAverage("togo")
            }
        }
    })
}

function calculateAverage(value) {
    if (value == "togo"){
        player_last_scored.push(0)
        player_rounds += 1
        player_rounds_leg = 0
        player_leg_scored = [0]
    }
    else if (value == "undo") {
        player_rounds -= 1
        player_rounds_leg -= 1
        if (player_rounds_leg == 0 && player_rounds != 0){
            player_leg_average = 0
        }
        else if (player_rounds == 0) {
            player_leg_average = 0
            player_overall_average = 0
        }
    }
    else {
        player_rounds += 1
        player_rounds_leg += 1
    }
    player_scored_leg = player_leg_scored.reduce(function (a,b){return a+b;})
    player_scored = player_last_scored.reduce(function (a,b){return a+b;})
    if (value == "togo"){
        player_leg_average = 0
    }
    else if (player_rounds_leg != 0) {
        player_leg_average = player_scored_leg / player_rounds_leg
    }
    if (player_rounds != 0){
        player_overall_average = player_scored / player_rounds
    }
    player_average_leg.innerHTML = parseFloat(player_leg_average).toFixed(2);
    player_average_overall.innerHTML = parseFloat(player_overall_average).toFixed(2);
}