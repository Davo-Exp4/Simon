var buttonColours  = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

//Para controlar si se presiono la letra en cualquier parte del documento 
$(document).keypress(function()
{
    if(!start)
    {
        $("#level-title").text("Level " + level);
        nextSecuence();
        started = true;
    }   
});


$(".btn").click(function(){ 
    //console.log(this.id);
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});

function nextSecuence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var ramdomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[ramdomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(250).fadeOut(250).fadeIn(250);
    playSound(randomChosenColour);
    
}

function playSound(name) 
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) 
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){  $("#"+currentColour).removeClass("pressed"); }, 100);

}

function checkAnswer(currentLevel) 
{
    
    if(gamePattern[currentLevel] ===  userClickedPattern[currentLevel])
        {
            console.log("right");   
            if (userClickedPattern.length === gamePattern.length){

                //5. Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function () {
                    nextSecuence();
                }, 1000);
        
              }        
        }
        else
        {
            console.log("Wrong");
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(function(){  $("body").removeClass("game-over"); }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            starOver();

        }

}

function starOver() 
{
    level = 0;
    gamePattern = [];
    start = false;
    
}