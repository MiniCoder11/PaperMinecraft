// Initialize the canvas
var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d');
fitCanvasToScreen();
context.imageSmoothingEnabled= false;
context['imageSmoothingEnabled'] = false;
context.font = "30px Minecraft";

// Add event listeners for getting mouse positions
document.addEventListener("mousemove", function (event) {
    var mousePosition = getMousePosition(event);
});

window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);
window.addEventListener('resize', fitCanvasToScreen, false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

setInterval(getFPS, 1000)

// Define block textures as images
var stone = new Image();
stone.src = './resources/textures/blocks/stone.png';
var stone_bricks = new Image();
stone_bricks.src = './resources/textures/blocks/stone_bricks.png';
var dirt = new Image();
dirt.src = './resources/textures/blocks/dirt.png';
var iron_block = new Image();
iron_block.src = './resources/textures/blocks/iron_block.png';
var gold_block = new Image();
gold_block.src = './resources/textures/blocks/gold_block.png';
// Add the textures to a list
var textures = [stone, stone_bricks, dirt, iron_block, gold_block];

// Initialize variables
var mouseX;
var mouseY;
var mouseBlockX;
var mouseBlockY;
var world = new Array();
var keyboard = new Array();
var rawCameraX = 0;
var rawCameraY = 0;
var fps = "Fetching...";
var fpsCounter = 0;
var tilesRendered = 0;

// Start the render loop once all resources finish loading
window.onload = function(){
    generateWorld();
    setInterval(renderLoop, 1);
}

// Generate the world
console.log(world);

function renderLoop() {
    tilesRendered = 0;
    fpsCounter++;
    clear(context);

    rawCameraY += upPressed ? 2 : 0;
    rawCameraY -= downPressed ? 2 : 0;
    rawCameraX += leftPressed ? 2 : 0;
    rawCameraX -= rightPressed ? 2 : 0;

    for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
            drawChunk(x, y);
        }
    }

    context.beginPath();
    context.fillStyle = "rgba(0, 0, 0, 0.50)";
    context.rect(10, 10, 440, 240);
    context.fill();

    drawShadowText("FPS: " + fps, 20, 40);
    drawShadowText("Position (X: " + rawCameraX + " Y: " + rawCameraY + ")", 20, 80);
    drawShadowText("Tiles Rendered: " + tilesRendered, 20, 120);

    mouseBlockX = Math.floor((mouseX - rawCameraX) / 100);
    mouseBlockY = Math.floor((mouseY - rawCameraY) / 100);

    drawShadowText("Mouse X: " + mouseBlockX, 20, 160);
    drawShadowText("Mouse Y: " + mouseBlockY, 20, 200);

    drawShadowText("Potato", 20, 240, "green");

    if (mouseBlockX > -1 && mouseBlockX < 10 && mouseBlockY > -1 && mouseBlockY < 10) {
        world[mouseBlockX][mouseBlockY] = stone;
    }
    
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
            if (Math.random() < 0.5) {
                world[x][y] = stone_bricks;
            } else if (Math.random() < 0.5) {
                world[x][y] = stone;
            } else if (Math.random() < 0.5) {
                world[x][y] = dirt;
            } else if (Math.random() < 0.5) {
                world[x][y] = iron_block;
            } else {
                world[x][y] = gold_block;
            }
        }
    }
}

function drawChunk(chunkX, chunkY) {
    for (var y = 0; y < 10; y++) {
        for (var x = 0; x < 10; x++) {
            if (x * 100 + rawCameraX + (chunkX * 1000) < window.innerWidth) {
                if (y * 100 + rawCameraY + (chunkY * 1000) < window.innerHeight) {
                    if (x * 100 + rawCameraX + (chunkX * 1000) > -100) {
                        if (y * 100 + rawCameraY + (chunkY * 1000) > -100) {
                            context.drawImage(world[x][y], x * 100 + rawCameraX + (chunkX * 1000), y * 100 + rawCameraY + (chunkY * 1000), 100, 100);
                                                tilesRendered++;
                        }
                    }
                }
            }
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

function drawShadowText(text, x, y, primaryColor) {
    context.fillStyle = "black";
    context.fillText(text, x + 3, y + 3);
    if (!primaryColor == "") {
        context.fillStyle = primaryColor;
    } else {
        context.fillStyle = "white";
    }
    context.fillText(text, x, y);
}

function fitCanvasToScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled= false;
    context['imageSmoothingEnabled'] = false;
    context.font = "30px Minecraft";
}