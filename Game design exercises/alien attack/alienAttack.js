//game variables
var alienX = 80;
var alienY = 20;
var guessX = 0;
var guessY = 0;
var shotsRemaining = 8;
var shotsMade = 0;
var gameState = "";
var gameWon = false;

//game objects
var cannon = document.querySelector("#cannon");
var alien = document.querySelector("#alien");
var missile = document.querySelector("#missile");
var explosion = document.querySelector("#explosion");
explosion.addEventListener("webkitAnimationEnd", animEnd, false);

//input and output fields
var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var output = document.querySelector("#output");

//the button
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

function render()
{
    //position the alien
    alien.style.left = alienX + "px";
    //console.log(alienX + "px");
    alien.style.top = alienY + "px";
    
    //position the cannon
    cannon.style.left = guessX + "px";
    
    //position the missile
    missile.style.left = guessX + "px";
    missile.style.top = guessY + "px";
    
    if (gameWon)
        {
            explosion.style.display = "block";
            explosion.style.left = guessX + "px";
            explosion.style.top = (guessY - 18) + "px";
            alien.style.display = "none";
            missile.style.display = "none";
        }
}

function animEnd(event)
{
    explosion.style.display = "none";
}

function clickHandler()
{
    playGame();
}

function playGame()
{
    shotsRemaining -= 1;
    shotsMade += 1;
    gameState = " Shots: " + shotsMade + ", Remaining: " + shotsRemaining;
    
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);
    
    //find out whether the player's X and Y guesses are inside. 
    //the alien's area
    if (guessX >= alienX && guessX <= alienX + 23)
        {
            //yes, it's within the X range, so let's check the Y range
            if (guessY >= alienY && guessY <= alienY + 18)
                {
                    //it's in both the X and Y range, so it's a hit!
                    gameWon = true;
                    endGame();
                }
        }
       else 
        {
            output.innerHTML = "Miss!" + gameState;
        
            //check for the end of the game
            if (shotsRemaining < 1)
            endGame();
        }
            
    //update the alien's position if the game hasn't been won
    if (!gameWon)
        {
            //update the alien's X position
            alienX = Math.floor(Math.random() * 278);
            alienY += 30;
        }

        //render the new game state
        render();
        console.log("X: " + alienX);
        console.log("Y: " + alienY);
}

function endGame()
{
    if(gameWon)
        {
            output.innerHTML = "Hit! You saved the earth!" + "<br>" + "It only took you " + shotsMade + " shots.";
        }
    else
        {
            output.innerHTML = "You lost!" + "<br>" + "The earth has been invaded :(";
        }
}
