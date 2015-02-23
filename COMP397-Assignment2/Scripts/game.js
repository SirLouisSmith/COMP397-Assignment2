// CreateJS Boilerplate for COMP397
// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betOneButton;
var resetButton;
var powerButton;

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

function spinButtonClicked() {
    console.log("Spin Button Clicked");
}

function spinButtonOut() {
    spinButton.alpha = 1; // 100% Alpha
}

function spinButtonOver() {
    spinButton.alpha = 0.7;
}

function createUI() {
    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background);

    // Spin Button
    spinButton = new createjs.Bitmap("assets/images/spinButton.png");
    game.addChild(spinButton);
    spinButton.x = 179;
    spinButton.y = 411;

    // Spin Button Event Listeners
    spinButton.addEventListener("click", spinButtonClicked);
    spinButton.addEventListener("mouseover", spinButtonOver);
    spinButton.addEventListener("mouseout", spinButtonOut);

    // Bet Max Button
    betMaxButton = new createjs.Bitmap("assets/images/betMaxButton.png");
    game.addChild(betMaxButton);
    betMaxButton.x = 442;
    betMaxButton.y = 509;

    // Bet One Button
    betOneButton = new createjs.Bitmap("assets/images/betOneButton.png");
    game.addChild(betOneButton);
    betOneButton.x = 43;
    betOneButton.y = 509;

    // Reset Button
    resetButton = new createjs.Bitmap("assets/images/resetButton.png");
    game.addChild(resetButton);
    resetButton.x = 135;
    resetButton.y = 365;

    // Power Button
    powerButton = new createjs.Bitmap("assets/images/powerButton.png");
    game.addChild(powerButton);
    powerButton.x = 368;
    powerButton.y = 365;
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}
//# sourceMappingURL=game.js.map
