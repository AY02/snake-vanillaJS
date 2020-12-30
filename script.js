class game {
  constructor() {
    this.myCanvas = document.getElementById('screen');
    this.height = this.myCanvas.height;
    this.width = this.myCanvas.width;
    this.ctx = this.myCanvas.getContext('2d');
    this.fps = 30;
  };
  start() {

  }
};

class board extends game {
  constructor() {
    super();
    this.scale = 20;
    this.rows = this.height / this.scale;
    this.columns = this.width / this.scale;
  }
  drawGrid() {
    this.ctx.strokeStyle = '#FFFFFF';
    for(let i=0; i<this.rows; i++) {
      this.ctx.moveTo(0, this.scale*i);
      this.ctx.lineTo(this.width, this.scale*i);
      this.ctx.stroke();
    }
    for(let i=0; i<this.columns; i++) {
      this.ctx.moveTo(this.scale*i, 0);
      this.ctx.lineTo(this.scale*i, this.height);
      this.ctx.stroke();
    }
  }
};

class cell extends board {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.ctx.fillStyle = '#FF0000';
  }
  draw() {
    this.ctx.fillRect(this.x, this.y, this.scale, this.scale);
  }
  destroy() {
    this.ctx.clearRect(this.x, this.y, this.scale, this.scale);
  }
};

class snake extends cell {
  constructor(x, y, length) {
    super();
    this.x = x;
    this.y = y;
    this.body = new Array(length);
  }
  draw(towards) {
    for(let i=0; i<this.body.length; i++)
      switch(towards) {
        case 'Top':
          var myCell = (this.y-this.scale*i >= 0) ?
            new cell(this.x, this.y-this.scale*i) :
            new cell(this.x, this.height+this.y-this.scale*i);
          myCell.draw();
          break;
        case 'Bottom':
          var myCell = (this.y+this.scale*i >= 500) ?
            new cell(this.x, this.y+this.scale*i - this.height) :
            new cell(this.x, this.y+this.scale*i);
          myCell.draw();
          break;
        case 'Right':
          var myCell = (this.x+this.scale*i >= 500) ?
            new cell(this.x+this.scale*i-this.width, this.y) :
            new cell(this.x+this.scale*i, this.y);
          myCell.draw();
          break;
        case 'Left':
          console.log(this.x-this.scale*i)
          var myCell = (this.x-this.scale*i >= 0) ?
            new cell(this.x-this.scale*i, this.y) :
            new cell(this.width+this.x-this.scale*i, this.y);
          myCell.draw();
          break;
        default:
          console.log('Towards unknown');
      }
  }
  destroyFromTail(length) {

  }
  destroyTail() {

  }
};

class food extends cell {

};

mySnake = new snake(20, 0, 1);
mySnake.draw('Top');