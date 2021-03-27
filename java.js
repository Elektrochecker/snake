var size = 15;
var windowSize = 750;
var rows = Math.floor(windowSize / size);
var cols = Math.floor(windowSize / size);
var foodLoc = [Math.floor(Math.random()*rows), Math.floor(Math.random()*cols)];
var foodCol = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
var unkillable = 0;
var snake = {
  total: [[0, 0]],
  dir: [1, 0],
  //head: this.total[this.total.length - 1],
}

function setup() {
  createCanvas(windowSize, windowSize);
  frameRate(16);
  textSize(15);
}

function draw() {
  if (unkillable == 0) {
    background(60);
  } else {
    background(100);
  }

  moveSnake();

  if (unkillable == 0) {
    checkDeath();
  }

  render();
}

function render() {
  for (var i=0; i < snake.total.length; i++) {
    noStroke();
    fill(200);
    rect(snake.total[i][0], snake.total[i][1], size, size);

    fill(255);
    rect(snake.total[snake.total.length-1][0],
         snake.total[snake.total.length-1][1], size, size);

    text(snake.total.length, 2, 15);

    fill(foodCol);
    rect(foodLoc[0] * size, foodLoc[1] * size, size, size);
  }
}

function moveSnake() {
  var newLoc = [constrain(snake.total[snake.total.length - 1][0] +
                snake.dir[0] * size, 0, windowSize - size),
                constrain(snake.total[snake.total.length - 1][1] +
                snake.dir[1] * size, 0, windowSize - size)];
  snake.total.push(newLoc);
  if (eat()) {
    foodLoc = [Math.floor(Math.random()*rows), Math.floor(Math.random()*cols)];
    foodCol = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
  } else {
    snake.total.shift();
  }
}

function keyPressed() {
  if        (keyCode === 38 || keyCode === 87) {
    if (snake.dir[1] !== 1) {
      snake.dir = [0, -1];
    }
  } else if (keyCode === 40 || keyCode === 83) {
    if (snake.dir[1] !== -1) {
      snake.dir = [0, 1];
    }
  } else if (keyCode === 37 || keyCode === 65) {
    if (snake.dir[0] !== 1) {
      snake.dir = [-1, 0];
    }
  } else if (keyCode === 39 || keyCode === 68) {
    if (snake.dir[0] !== -1) {
      snake.dir = [1, 0];
    }
  } else if (keyCode === 32) {
    if (unkillable == 0) {
      unkillable = 1;
    } else {
      unkillable = 0;
    }
  }
}

function eat() {
  if (snake.total[snake.total.length - 1][0] == foodLoc[0] * size
   && snake.total[snake.total.length - 1][1] == foodLoc[1] * size) {
    //console.log("eat");
    return true;
  } else {
    return false;
  }
}

function checkDeath()  {
  for (var i = 0; i < snake.total.length-1; i++) {
    if (snake.total[snake.total.length-1][0] == snake.total[i][0]
     && snake.total[snake.total.length-1][1] == snake.total[i][1]) {
        snake.total = [[0, 0]];
        snake.dir = [1, 0];
        return true;
    }
  }
  return false;
}
