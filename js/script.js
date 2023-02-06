const buttons = document.getElementsByTagName("button")
const input_score = document.getElementById("btn-input-score")
const player_score = document.getElementById("player_score")
const opponent_score = document.getElementById("opponent_score")
let player_legs_score = document.getElementById("player_legs_count")
let player_sets_score = document.getElementById("player_sets_count")
let opponent_legs_score = document.getElementById("opponent_legs_count")
let opponent_sets_score = document.getElementById("opponent_sets_count")

const not_checkable = [169, 168, 166, 165, 163, 162, 159]
let old_player_score = 501

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
                old_player_score = parseInt(player_score.innerHTML)
                player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(input_score.innerHTML)
                input_score.innerHTML = 0;
            }
        }
        if (buttons[i].classList.contains("hotkey")){
            if(parseInt(player_score.innerHTML) > parseInt(buttons[i].value)){
                old_player_score = parseInt(player_score.innerHTML)
                player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(buttons[i].value)
            }
        }
        if (buttons[i].value == "undo"){
            input_score.innerHTML = 0;
            input_score.classList.add("btn-outline-dark")
            input_score.classList.remove("btn-outline-warning")
            player_score.innerHTML = old_player_score
        }
        if (buttons[i].value == "togo"){
            if (parseInt(player_score.innerHTML) <= 170 && !not_checkable.contains(parseInt(player_score.innerHTML))){
                player_score.innerHTML = 501
                opponent_score.innerHTML = 501
                player_legs_score.innerHTML += 1
            }
        }
    })
}