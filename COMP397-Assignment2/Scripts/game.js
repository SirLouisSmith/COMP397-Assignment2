/// <reference path="managers/asset.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="constants/constants.ts" />
// Source file name: game.ts
// Author: Louis Smith
// Last modified by: Louis Smith
// Last modified date: 26/02/2015
// Description: This is the main game code that generates all of the graphics
//              and contains all of the funtionality
// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;
var icons = [];
var slotContainer = [];

// GAME VARIABLES
var playerMoney = constants.INIT_MONEY;
var winnings = 0;
var jackpot = constants.JACKPOT;
var turn = 0;
var playerBet = 0;
var spinResult;
var tmnt = "";
var winRatio = 0;
var leo = 0;
var michel = 0;
var raph = 0;
var doni = 0;
var splinter = 0;
var april = 0;
var pizza = 0;
var shredder = 0;
var rocksteady = 0;
var bebop = 0;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betTenButton;
var resetButton;
var powerButton;
var musicButton;

var jackpotTxt;
var creditsTxt;
var betTxt;
var winningsTxt;
var slotMusic;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    managers.Assets.init();

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// GAMELOOP
function gameLoop() {
    stage.update();
}

function resetTally() {
    leo = 0;
    michel = 0;
    raph = 0;
    doni = 0;
    splinter = 0;
    april = 0;
    pizza = 0;
    shredder = 0;
    rocksteady = 0;
    bebop = 0;
}

function resetAll() {
    playerMoney = constants.INIT_MONEY;
    winnings = 0;
    jackpot = constants.JACKPOT;
    turn = 0;
    playerBet = 0;
    winRatio = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < constants.NUM_SLOT; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 7):
                betLine[spin] = "shredder";
                shredder++;
                break;
            case checkRange(outCome[spin], 8, 17):
                betLine[spin] = "bebop";
                shredder++;
                break;
            case checkRange(outCome[spin], 18, 27):
                betLine[spin] = "rocksteady";
                shredder++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "leo";
                leo++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "michel";
                michel++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "raph";
                raph++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "doni";
                doni++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "splinter";
                splinter++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "april";
                april++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "pizza";
                pizza++;
                break;
        }
    }
    return betLine;
}

function determineWinnings() {
    if (shredder == 0 && bebop == 0 && rocksteady == 0) {
        if (leo == 3) {
            winnings = playerBet * 10;
        } else if (michel == 3) {
            winnings = playerBet * 20;
        } else if (raph == 3) {
            winnings = playerBet * 30;
        } else if (doni == 3) {
            winnings = playerBet * 40;
        } else if (splinter == 3) {
            winnings = playerBet * 50;
        } else if (april == 3) {
            winnings = playerBet * 75;
        } else if (pizza == 3) {
            winnings = jackpot;
        } else if (leo == 2) {
            winnings = playerBet * 2;
        } else if (michel == 2) {
            winnings = playerBet * 2;
        } else if (raph == 2) {
            winnings = playerBet * 3;
        } else if (doni == 2) {
            winnings = playerBet * 4;
        } else if (splinter == 2) {
            winnings = playerBet * 5;
        } else if (april == 2) {
            winnings = playerBet * 10;
        } else if (pizza == 2) {
            winnings = playerBet * 20;
        } else if (pizza == 1) {
            winnings = playerBet * 5;
        } else {
            winnings = playerBet * 1;
        }
        playerMoney += winnings;
    } else {
        jackpot += playerBet;
    }
}

//SPIN CLICK FUNCTION
function spinButtonClicked() {
    if (playerMoney != 0 && playerBet != 0) {
        if (playerBet <= playerMoney) {
            playerMoney -= playerBet;
            spinResult = Reels();
            determineWinnings();
            tmnt = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

            for (var slot = 0; slot < slotContainer.length; slot++) {
                slotContainer[slot].removeAllChildren();
                icons[slot] = new createjs.Bitmap("assets/images/" + spinResult[slot] + ".png");
                slotContainer[slot].addChild(icons[slot]);
            }
            resetTally();
            jackpotTxt.text = "$" + jackpot;
            creditsTxt.text = "$" + playerMoney;
            if (winnings == jackpot) {
                betTxt.text = "JACKPOT!!";
                jackpot = 5000;
            } else {
                betTxt.text = "$" + playerBet;
            }
            winningsTxt.text = "$" + winnings;
            winnings = 0;
        } else {
            playerBet = 0;
            betTxt.text = "$" + playerBet;
            winningsTxt.text = "Can't Bet";
        }
    }
}

//BET $10 BUTTON
function betTenButtonClicked() {
    if (playerBet >= playerMoney) {
        winningsTxt.text = "Not Enough";
    } else {
        playerBet += 10;
        betTxt.text = "$" + playerBet;
        winningsTxt.text = "";
    }
}

//BET MAX BUTTON (spins automatically when pressed
function betMaxButtonClicked() {
    playerBet = playerMoney;
    if (playerBet != 0) {
        playerMoney -= playerBet;
        spinResult = Reels();
        determineWinnings();
        tmnt = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

        for (var slot = 0; slot < slotContainer.length; slot++) {
            slotContainer[slot].removeAllChildren();
            icons[slot] = new createjs.Bitmap("assets/images/" + spinResult[slot] + ".png");
            slotContainer[slot].addChild(icons[slot]);
        }
        resetTally();
        jackpotTxt.text = "$" + jackpot;
        creditsTxt.text = "$" + playerMoney;
        betTxt.text = "$" + playerBet;
        winningsTxt.text = "$" + winnings;
        winnings = 0;
    }
    playerBet = 0;
}

//RESET BUTTON CLICK
function resetButtonClicked() {
    resetAll();
    for (var slot = 0; slot < slotContainer.length; slot++) {
        slotContainer[slot].removeAllChildren();
    }
    jackpotTxt.text = "$" + jackpot;
    creditsTxt.text = "$" + playerMoney;
    betTxt.text = "$" + playerBet;
    winningsTxt.text = "$" + winnings;
}

//MUSIC BUTTON CLICK(the only way I was able to get the music playing)
function musicButtonClicked() {
    slotMusic.stop();
    slotMusic = createjs.Sound.play('music', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
}

//POWER BUTTON CLICK (doesn't work with FireFox)
function powerButtonClicked() {
    window.open('', '_parent', '');
    window.close();
}

function createUI() {
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background);

    for (var index = 0; index < constants.NUM_SLOT; index++) {
        slotContainer[index] = new createjs.Container();
        game.addChild(slotContainer[index]);
    }

    slotContainer[0].x = 40.85;
    slotContainer[0].y = 132;
    slotContainer[1].x = 208.85;
    slotContainer[1].y = 132;
    slotContainer[2].x = 376.85;
    slotContainer[2].y = 132;

    // Spin Button
    spinButton = new objects.Button("assets/images/spinButton.png", 179, 411);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new objects.Button("assets/images/betMaxButton.png", 442, 509);
    game.addChild(betMaxButton.getImage());

    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked);

    // Bet One Button
    betTenButton = new objects.Button("assets/images/betTenButton.png", 43, 509);
    game.addChild(betTenButton.getImage());

    betTenButton.getImage().addEventListener("click", betTenButtonClicked);

    // Reset Button
    resetButton = new objects.Button("assets/images/resetButton.png", 135, 365);
    game.addChild(resetButton.getImage());

    resetButton.getImage().addEventListener("click", resetButtonClicked);

    // Power Button
    powerButton = new objects.Button("assets/images/powerButton.png", 368, 365);
    game.addChild(powerButton.getImage());

    powerButton.getImage().addEventListener("click", powerButtonClicked);

    //Music Button
    musicButton = new objects.Button("assets/images/musicButton.png", 33, 5);
    game.addChild(musicButton.getImage());

    musicButton.getImage().addEventListener("click", musicButtonClicked);

    jackpotTxt = new createjs.Text("$" + jackpot, "26px Arial", "#ffffff");
    game.addChild(jackpotTxt);
    jackpotTxt.x = 280;
    jackpotTxt.y = 22;

    creditsTxt = new createjs.Text("$" + playerMoney, "26px Arial", "#ffffff");
    game.addChild(creditsTxt);
    creditsTxt.x = 134;
    creditsTxt.y = 320;

    betTxt = new createjs.Text("$" + playerBet, "26px Arial", "#ffffff");
    game.addChild(betTxt);
    betTxt.x = 290;
    betTxt.y = 320;

    winningsTxt = new createjs.Text("$" + winnings, "26px Arial", "#ffffff");
    game.addChild(winningsTxt);
    winningsTxt.x = 215;
    winningsTxt.y = 376;

    //this is used to initialise the music
    slotMusic = createjs.Sound.play('music', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 0.5, 0);
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}
//# sourceMappingURL=game.js.map
