class game {
  mySnake;
  myFood;

  constructor() {
    this.myCanvas = document.getElementById('screen');
    this.height_width = this.myCanvas.height;
    this.ctx = this.myCanvas.getContext('2d');
    this.fps = 30;
    this.scale = 20;

  };
  random_Coordinates() {
    let max = this.height_width/this.scale;
    let result = this.scale * Math.floor(Math.random() * max);
    return result;
  };
  init() {
    let x_snake = this.random_Coordinates();
    let y_snake = this.random_Coordinates();
    this.mySnake = new snake(x_snake, y_snake, 1);

    let towards = ['Top', 'Bottom', 'Right', 'Left'];
    let index = Math.floor(Math.random() * towards.length);
    this.mySnake.draw(towards[index]);

    let x_food, y_food;
    do {
      x_food = this.random_Coordinates();
      y_food = this.random_Coordinates();
    } while(x_food === x_snake && y_food === y_snake);

    this.myFood = new food(x_food, y_food);
    this.myFood.draw();
  }
  start() {
    this.init();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.mySnake.draw
      });
    }, 1000 / this.fps);
  }
};

class board extends game {
  constructor() {
    super();
    this.rows_columns = this.height_width / this.scale;
  }
  drawGrid() {
    this.ctx.strokeStyle = '#FFFFFF';
    for(let i=0; i<this.rows_columns; i++) {
      this.ctx.moveTo(0, this.scale*i);
      this.ctx.lineTo(this.height_width, this.scale*i);
      this.ctx.stroke();
    }
    for(let i=0; i<this.rows_columns; i++) {
      this.ctx.moveTo(this.scale*i, 0);
      this.ctx.lineTo(this.scale*i, this.height_width);
      this.ctx.stroke();
    }
  }
};

class cell extends board {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.isFilled = false;
  }
  draw() {
    if(!this.isFilled) {
      this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
      this.isFilled = true;
    }
  }
  destroy() {
    if(this.isFilled) {
      this.ctx.clearRect(this.x, this.y, this.scale, this.scale);
      this.isFilled = false;
    }
  }
};

class snake extends cell {
  constructor(x, y, length) {
    super();
    this.x = x;
    this.y = y;
    this.ctx.fillStyle = '#808080';
    this.body = new Array(length);
  }
  draw(towards) {
    for(let i=0; i<this.body.length; i++) {
      switch(towards) {
        case 'Top':
          var myCell = (this.y-this.scale*i >= 0) ?
            new cell(this.x, this.y-this.scale*i) :
            new cell(this.x, this.height_width+this.y-this.scale*i);
          break;
        case 'Bottom':
          var myCell = (this.y+this.scale*i >= 500) ?
            new cell(this.x, this.y+this.scale*i-this.height_width) :
            new cell(this.x, this.y+this.scale*i);
          break;
        case 'Right':
          var myCell = (this.x+this.scale*i >= 500) ?
            new cell(this.x+this.scale*i-this.height_width, this.y) :
            new cell(this.x+this.scale*i, this.y);
          break;
        case 'Left':
          var myCell = (this.x-this.scale*i >= 0) ?
            new cell(this.x-this.scale*i, this.y) :
            new cell(this.height_width+this.x-this.scale*i, this.y);
          break;
      }
      this.body[i] = myCell;
      this.body[i].draw();
    }
  }
  addTail() {
    let x = this.body[this.body.length-1].x;
    let y = this.body[this.body.length-1].y;
  }
  destroy() {
    for(let i=this.body.length-1; i>=0; i--) {
      this.body[i].destroy();
      this.body.pop();
    }
  }
  destroyFromTail(length) {
    let originalLength = this.body.length;
    for(let i=this.body.length-1; i>=originalLength-length; i--) {
      this.body[i].destroy();
      this.body.pop();
    }
  }
  destroyTail() {
    this.body[this.body.length-1].destroy();
    this.body.pop();
  }
};

class food extends cell {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.ctx.fillStyle = '#FF0000';
    this.isFilled = false;
  }
  draw() {
    if(!this.isFilled) {
      this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
      this.isFilled = true;
    }
  }
  destroy() {
    if(this.isFilled) {
      this.ctx.clearRect(this.x, this.y, this.scale, this.scale);
      this.isFilled = false;
    }
  }
};

myGame = new game();
myGame.start();