const buttons = document.getElementsByTagName("button")
const input_score = document.getElementById("btn-input-score")
const player_score = document.getElementById("player_score")
const opponent_score = document.getElementById("opponent_score")

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
            if (parseInt(input_score.innerHTML) >= 0 && parseInt(input_score.innerHTML) <= 180){
                player_score.innerHTML = parseInt(player_score.innerHTML) - parseInt(input_score.innerHTML)
                input_score.innerHTML = 0;
            }
        }
    })
}