// Initialize the canvas
var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');
context.imageSmoothingEnabled= false;
context['imageSmoothingEnabled'] = false;
context.font = "30px Minecraft";

// Add event listeners for getting mouse positions
document.addEventListener("mousemove", function (event) {
    mousePos = getMousePosition(event);
});

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

setInterval(getFPS, 1000)

// Define block textures as images
stone = new Image();
stone.src = './resources/textures/blocks/stone.png';
stone_bricks = new Image();
stone_bricks.src = './resources/textures/blocks/stone_bricks.png';
// Add the textures to a list
var textures = [stone, stone_bricks];

// Initialize variables
var mouseX;
var mouseY;
var world = new Array();
var keyboard = new Array();
var rawCameraX = 0;
var rawCameraY = 0;
var fps = "Fetching...";
var fpsCounter = 0;

// Start the render loop once all resources finish loading
window.onload = function(){
    generateWorld();
    setInterval(renderLoop, 1);
}

// Generate the world
console.log(world);

function renderLoop() {
    fpsCounter++;
    clear(context);

    rawCameraY += upPressed ? 1 : 0;
    rawCameraY -= downPressed ? 1 : 0;
    rawCameraX += leftPressed ? 1 : 0;
    rawCameraX -= rightPressed ? 1 : 0;

    renderTerrain();

    context.fillText("FPS: " + fps, 20, 40);
    context.fillText("Position (X: " + rawCameraX + " Y: " + rawCameraY + ")", 20, 80);
    context.fillText("W: " + upPressed, 20, 120);
}

function getMousePosition(event) {
    mouseX = event.clientX; // Get the horizontal coordinate
    mouseY = event.clientY; // Get the vertical coordinate
}

function clear(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function generateWorld() {
    for (var x = 0; x < 10; x++) {
        world[x] = new Array();
        for (var y = 0; y < 10; y++) {
            world[x][y] = stone_bricks;
        }
    }
}

function renderTerrain() {
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            context.drawImage(world[x][y], x * 75 + rawCameraX, y * 75 + rawCameraY, 75, 75);
        }
    }
}

function randomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

function getFPS() {
    fps = fpsCounter;
    fpsCounter = 0;
}

// Keyboard input handling
var KeyboardHelper = { left: "a", up: "w", right: "d", down: "s"};

function keyDownHandler(event) {
    if(event.key == KeyboardHelper.right) {
        rightPressed = true;
    }
    else if(event.key == KeyboardHelper.left) {
        leftPressed = true;
    }
    if(event.key == KeyboardHelper.down) {
    	downPressed = true;
    }
    else if(event.key == KeyboardHelper.up) {
    	upPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.key == KeyboardHelper.right) {
        rightPressed = false;
    }
    else if(event.key == KeyboardHelper.left) {
        leftPressed = false;
    }
    if(event.key == KeyboardHelper.down) {
    	downPressed = false;
    }
    else if(event.key == KeyboardHelper.up) {
    	upPressed = false;
    }
}