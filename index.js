console.log('Script Starting...');

// Get our canvas element and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// set page to listen for keyboard presses
document.addEventListener('keydown', handleKeyPress);

// Function to handle key presses to move the paddle
function handleKeyPress(e) {
    console.log(e.key);

    if (e.key == 'a' || e.key == 'ArrowLeft') {
        // move left
        obj.x -= paddle.hspeed;
    }
    else if (e.key == 'd' || e.key == 'ArrowRight') {
        // move right
        obj.x += paddle.hspeed;
    }
    else if (e.key == 'w' || e.key == 'ArrowUp') {
        // move right
        obj.x += paddle.vspeed;
    }
    else if (e.key == 's' || e.key == 'ArrowDown') {
        // move right
        obj.x -= paddle.vspeed;
    }
}

// function to draw a circle on the canvas with the given parameters
function drawCircle(x, y, radius, color, startAngle=0, endAngle=Math.PI*2) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
}

// function to draw a circle on canvas according to object attributes
function drawCircleObj(obj) {
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI*2);
    ctx.fill();
}

// function to draw a rectangle on canvas according to object attributes
function drawRectObj(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Define our circle object that will bounce around the canvas
const bouncingCircle = {
    x: 32,
    y: 32,
    radius: 32,
    hspeed: 2,
    vspeed: 2,
    color: 'red'
}

// Function that defines the behavior of our bouncing circle object
function moveWithBounce(obj) {

    // Move object according to current speed
    obj.x += obj.hspeed;
    obj.y += obj.vspeed;

    // Reverse speed if object off screen horizontally
    if (obj.x-obj.radius < 0 || obj.x+obj.radius > canvas.width) {
        obj.hspeed *= -1;
    }

    // Reverse speed if object off sceen vertically
    if (obj.y-obj.radius < 0 || obj.y+obj.radius > canvas.height) {
        obj.vspeed *= -1;
    }
}

// This is our main loop that will repeat indefinitely
function drawLoop() {
    //Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Update objects
    moveWithBounce(bouncingCircle);
    

    //Draw objects
    drawCircleObj(bouncingCircle);
    drawRectObj(paddle);

    //Call drawLoop
    requestAnimationFrame(drawLoop);
}

// Iniitial call to loop to start program
drawLoop();
