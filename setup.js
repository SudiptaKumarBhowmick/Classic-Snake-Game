document.addEventListener("DOMContentLoaded",function() {
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
});


const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const obstacle_col = 'darkred';
const obstacle_border = 'black';


let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
];

let obstacle1 = [
    {x: 450, y: 400},
    {x: 440, y: 400},
    {x: 430, y: 400},
    {x: 420, y: 400}
];
let obstacle2 = [
    {x: 450, y: 400},
    {x: 450, y: 390},
    {x: 450, y: 380},
    {x: 450, y: 370}
];
let obstacle3 = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150}
];

//True if changing direction
let changing_direction = false;
//Horizontal Velocity
let food_x;
let food_y;
let dx = 10;
//Vertical Velocity
let dy = 0;

var score = 0;

// Faster speed of snake
let timeOutInterval = 145;

//random number to increase the size of snake
let frame = 4;

// Get the canvas element
const snakeboard = document.getElementById('snakeboard');
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext('2d');

//image
const background_image = new Image();
background_image.src = 'background.PNG';