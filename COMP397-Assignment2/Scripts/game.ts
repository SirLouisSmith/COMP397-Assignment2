// CreateJS Boilerplate for COMP397

//BUTTON CLASS
class Button {
    //private variables
    private _image: createjs.Bitmap;
    private _x: number;
    private _y: number;
    constructor(path:string, x:number, y:number) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }

    public setX(x: number): void {
        this._x = x;
    }

    public getX(): number {
        return this._x;
    }

    public setY(y: number): void {
        this._y = y;
    }

    public getY(): number {
        return this._y;
    }

    public getImage(): createjs.Bitmap {
        return this._image;
    }

    private _buttonOut(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 1; // 100% Alpha 

    }

    private _buttonOver(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 0.7;

    }
}

// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage
var icons: createjs.Bitmap[] = [];
var slotContainer: createjs.Container[] = [];

// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
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

// GAME OBJECTS
var game: createjs.Container; // Main Game Container Object
var background: createjs.Bitmap;
var spinButton: Button;
var betMaxButton: Button;
var betOneButton: Button;
var resetButton: Button;
var powerButton: Button;
var jackpotTxt: createjs.Text;


// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function init() {



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
}

function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "shredder";
                shredder++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "leo";
                leo++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "michel";
                michel++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "raph";
                raph++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "doni";
                doni++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "splinter";
                splinter++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "april";
                april++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "pizza";
                pizza++;
                break;
        }
    }
    return betLine;
}

function determineWinnings() {
    if (shredder == 0) {
        if (leo == 3) {
            winnings = playerBet * 10;
        }
        else if (michel == 3) {
            winnings = playerBet * 20;
        }
        else if (raph == 3) {
            winnings = playerBet * 30;
        }
        else if (doni == 3) {
            winnings = playerBet * 40;
        }
        else if (splinter == 3) {
            winnings = playerBet * 50;
        }
        else if (april == 3) {
            winnings = playerBet * 75;
        }
        else if (pizza == 3) {
            winnings = playerBet * 100;
        }
        else if (leo == 2) {
            winnings = playerBet * 2;
        }
        else if (michel == 2) {
            winnings = playerBet * 2;
        }
        else if (raph == 2) {
            winnings = playerBet * 3;
        }
        else if (doni == 2) {
            winnings = playerBet * 4;
        }
        else if (splinter == 2) {
            winnings = playerBet * 5;
        }
        else if (april == 2) {
            winnings = playerBet * 10;
        }
        else if (pizza == 2) {
            winnings = playerBet * 20;
        }
        else if (pizza == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        //showWinMessage();
    }
    else {
        lossNumber++;
        //showLossMessage();
    }

}

function spinButtonClicked() {

    spinResult = Reels();
    tmnt = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    for (var slot = 0; slot < slotContainer.length; slot++) {
        slotContainer[slot].removeAllChildren();
        icons[slot] = new createjs.Bitmap("assets/images/" + spinResult[slot] + ".png");
        slotContainer[slot].addChild(icons[slot]);
    }
    jackpotTxt.text = "$" + jackpot;
}

function ButtonOut(event: createjs.MouseEvent) {
    event.currentTarget.alpha = 1; // 100% Alpha 

}

function ButtonOver(event: createjs.MouseEvent) {
    event.currentTarget.alpha = 0.7;

}


function createUI() {
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background);

    for (var index = 0; index < 3; index++) {
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
    spinButton = new Button("assets/images/spinButton.png", 179, 411);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/betMaxButton.png", 442, 509);
    game.addChild(betMaxButton.getImage());

    // Bet One Button
    betOneButton = new Button("assets/images/betOneButton.png", 43, 509);
    game.addChild(betOneButton.getImage());

    // Reset Button
    resetButton = new Button("assets/images/resetButton.png", 135, 365);
    game.addChild(resetButton.getImage());

    // Power Button
    powerButton = new Button("assets/images/powerButton.png", 368, 365);
    game.addChild(powerButton.getImage());

    jackpotTxt = new createjs.Text("$" + jackpot, "26px Arial", "#ffffff");
    game.addChild(jackpotTxt);
    jackpotTxt.x = 280;
    jackpotTxt.y = 22;
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage


}