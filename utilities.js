// Start game
main();

//Generate food for the first time
gen_food();

//draw obstacle one


document.addEventListener("keydown", change_direction);

// main function called repeatedly to keep the game running
function main() {
    if (has_game_ended()) return;
    changing_direction = false;
    setTimeout(function onTick() {
        clearCanvas();
        snakeboard_ctx.drawImage(background_image,0,0,600,600);
        drawFood();
        drawObstacle();
        move_snake();
        drawSnake();
        //call the main again
        main();
    }, timeOutInterval)
}

// draw a border around the canvas
function clearCanvas() {
    // select the color to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    // select the color for the border of the canvas
    snakeboard_ctx.strokeStyle = board_border;
    // draw a filled rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // draw a border around the entire canvas
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart);
}

function drawFood() {
    snakeboard_ctx.fillStyle = 'lightgreen';
    snakeboard_ctx.strokeStyle = 'darkgreen';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
}

// Draw one snake part
function drawSnakePart(snakePart) {
    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokeStyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Draw the obstacle on the canvas
function drawObstacle() {
    obstacle1.forEach(drawObstaclePart);
    obstacle2.forEach(drawObstaclePart);
    obstacle3.forEach(drawObstaclePart);
}

// Draw each part of obstacle
function drawObstaclePart(obstaclePart) {
    //Set the color of the obstacle part
    snakeboard_ctx.fillStyle = obstacle_col;
    //Set the border color of the obstacle part
    snakeboard_ctx.strokeStyle = obstacle_border;
    //Draw a "filled" rectangle to reporesent the obstacle part at the coordinates the part is located
    snakeboard_ctx.fillRect(obstaclePart.x, obstaclePart.y, 10, 10);
    //Draw a border around the obstacle part
    snakeboard_ctx.strokeRect(obstaclePart.x, obstaclePart.y, 10, 10);
}

function has_game_ended() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    for (let i = 0; i < obstacle1.length; i++) {
        if(snake[0].x > obstacle1[i].x - 10) return true;
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function gen_food() {
    //Generate a random number the food x-coordinate
    food_x = random_food(0, snakeboard.width - 10);
    //Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
    obstacle1.forEach(function has_food_under_obstacle1(part){
        const has_obstacle1 = part.x == food_x && part.y == food_y;
        if(has_obstacle1) gen_food();
    });
    obstacle2.forEach(function has_food_under_obstacle2(part){
        const has_obstacle2 = part.x == food_x && part.y == food_y;
        if(has_obstacle2) gen_food();
    });
    obstacle3.forEach(function has_food_under_obstacle3(part){
        const has_obstacle3 = part.x == food_x && part.y == food_y;
        if(has_obstacle3) gen_food();
    });
}

function change_direction(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    //prevent the snake from reversing
    if (changing_direction) return;
    changing_direction = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}

function move_snake() {
    //Create the new snake's head
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    //Add the new head to the beginning of snake body
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    snake.unshift(head);
    if (has_eaten_food) {
    let randomise = Math.floor(Math.random() * 4 + 1);
        //Increase score
        if (score >= 10000){
            score += 100;
            timeOutInterval -= 0.05;
        }
        else if(score >= 1000 && score < 10000){ // 20 * 1.25 = 25
            score += 50;
            timeOutInterval -= 1.25;
        }
        else if(score >= 500 && score < 1000){ // 16 * 1.25 = 20
            score += 30;
            timeOutInterval -= 1.25;
        }
        else if(score >= 100 && score < 500){ // 25 * 0.6 = 15 sec
            score += 20;
            timeOutInterval -= 0.6;
        }
        else if(score >= 50 && score < 100){ // 5 * 2 = 10 sec
            score += 10;
            timeOutInterval -= 2;
        }
        else{ // 10 * 0.5 = 5 sec
            score += 5;
            timeOutInterval -= 0.5;
        }
        console.log('snake length: '+ snake.length);
        console.log('randomise: '+randomise);
        //Increase snake size
        if (score > 20 && (randomise % frame != 0)) {
            snake.pop();
            console.log('snake length not increase.');
        }

        //Display score on screen
        document.getElementById('score').innerHTML = 'score: ' + score;
        //Generate new food location
        gen_food();
    }
    else {
        //Remove the last part of the snake body
        snake.pop();
    }
}