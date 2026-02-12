const availBtn = ['red', 'blue', 'green', 'yellow'];
var sequenceBtn = [];
var nextIndex = 0;
var level = 1;
var gameStarted = false;

$(".btn").on("click", handleClick);
$(document).on("keydown", keyFunction);

function keyFunction(){
    $("h1").text("Level " + level);
    gameStarted = true;
    sequenceBtn.push(availBtn[Math.floor(Math.random()*4)]);
    simonSays(sequenceBtn.at(-1));
    $(document).off("keydown");
}

function handleClick(){
    if (!gameStarted){
        return;
    }
    var buttonClicked = this.id;
    audio(this.id);
    $("."+buttonClicked).addClass("pressed");
    setTimeout(function(){$("."+buttonClicked).removeClass("pressed");}, 250);
    if (this.id === sequenceBtn[nextIndex]){
        nextIndex += 1;
        if (nextIndex === sequenceBtn.length){
            level ++;
            nextIndex = 0;
            setTimeout(function(){keyFunction();}, 250);
            
        }
    }
    else {
        gameStarted = false;
        audio("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 500);
        sequenceBtn = [];
        nextIndex = 0;
        level = 1;
        $("h1").text("Game Over, Press Any Key to Restart");
        $(document).on("keydown", keyFunction);
        }
        
        
}

function audio(btn){
    new Audio("sounds/"+btn+".mp3").play();
}

function simonSays(btn){
    $("." + btn).addClass("pressed-simon");
    setTimeout(function(){$("."+ btn).removeClass("pressed-simon");}, 350);
}