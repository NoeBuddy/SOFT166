//I use these variables to signify which lights to turn on when someone wins
var a = 1;
var b = 4;
//start() is just the state I want the game at when you load the page
function start(){
//These parameters measure if one player has won three times. If not, then it clears the board.
    if(a > 3){
        setMessage("X has won the war!!!");
    }

    else if(b > 6){
        setMessage("O has won the war!!!")
    }

    else {
        for (var x = 1; x <= 9; x = x + 1) {
            clearSquare(x);
        }
//Sets the player based on whose turn it is. Its math function makes it so it randomly selects X or O.
        document.turn = "X";
        if (Math.random() < 0.5) {
            document.turn = "O";
        }

        document.win = null;

        setMessage(document.turn + " goes first.");
    }
}
//This function sets the game to its default beginning state
function newGame(){
    for(var lights = 1; lights <= 6; lights = lights + 1){
        getLightURI(lights);
        getLightState(lights);
    }
    a = 1;
    b = 4;
    start();
}

//next() is a function meant to show the text in the box (x or o)
function next(box){
    if(document.win != null){
        setMessage(document.turn + " has won. Get over it!!!");
    }
    else if(box.innerText == "") {
        box.innerText = document.turn;
        switchPlayer();
    }
    else{
        setMessage("You can't use that square.");
    }
}
//switchPlayer() is used to cycle to the other player after one player goes
function switchPlayer(){
    if(winner(document.turn)){
        setMessage(document.turn + " Wins!!!");
        document.win = document.turn;
//These parameters check who won and turns on their corresponding light
        if(document.turn == "X" && a <= 3){
            getLightURI(a);
            togglelight(a);
            a = a + 1;
        }
        else{
            getLightURI(b);
            togglelight(b);
            b = b + 1;
        }
    }
//If there is no winner, then these parameters just switch whose turn it is
    else if(document.turn == "X"){
        document.turn = "O";
        setMessage("It's " + document.turn + "'s turn to go.");
    }
    else{
        document.turn = "X";
        setMessage("It's " + document.turn + "'s turn to go.");
    }
}
//Sets the message on the web page stating whose turn it is
function setMessage(x){
    document.getElementById("message").innerText = x;
}
//Checks to see if there are three similar squares (which aren't blank) in a row vertically, horizontally, and/or diagonally
function checkForWin(x, y, z, move){
    var win = false;

    if(getSquare(x) == move && getSquare(y) == move && getSquare(z) == move){
        win = true;
    }
    return win;
}
//This function merely generates a sort of id for each box in the game
function getSquare(num){
    return document.getElementById("b" + num).innerText;
}
//This functions provides parameters for the checkForWin function. Each way one could win is here
function winner(move){
    var result = false;
    if(checkForWin(1,2,3,move) ||
        checkForWin(4,5,6,move) ||
        checkForWin(7,8,9,move) ||
        checkForWin(1,4,7,move) ||
        checkForWin(2,5,8,move) ||
        checkForWin(3,6,9,move) ||
        checkForWin(1,5,9,move) ||
        checkForWin(3,5,7,move)){
        result = true;
    }
    return result;
}
//This deletes the values in the selected box
function clearSquare(number){
    document.getElementById("b" + number).innerText = "";


}
//This is a modified version of the code provided in treasure.js in one of our labs to get the light uri
function getLightURI(number)
{
    var IP = "http://192.168.0.50/api/";
    var username = "stlaB2I6VZ8O80Qepc-1xfmLrHgyTFvB9IGupaQz";
    var lights = "/lights/";
    var URI = IP + username + lights;
    return URI + number +"/";
}
//This is a modified version of the code provided in treasure.js in one of our labs to turn on/off the selected lights
function togglelight(number)
{
    var getState = $.getJSON(getLightURI(number), function (data)
    {
        var state = data["state"]["on"];
        if (state)
        {
            state = false;
        }
        else
        {
            state = true;
        }

        var lightState = {"on" : state};

        $.ajax({
            url: getLightURI(number) + "state/",
            type: "PUT",
            data: JSON.stringify(lightState)
        })
    });
}


//This is modified from the treasure.js file. This checks whether the light is on or off and turns them all to an off state
function getLightState(number){
    var getState = $.getJSON(getLightURI(number), function (data) {
        var state = data["state"]["on"];
        if (state) {
            state = false;
            var lightState = {"on" : state};

            $.ajax({
                url: getLightURI(number) + "state/",
                type: "PUT",
                data: JSON.stringify(lightState)
            })
        }
        else {
            state = true;
        }
    });

}