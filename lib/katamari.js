import {normalize, amplify, combineVectors, diffVectors} from './util'

class Katamari {
  constructor(stage, interval){
    this.setBounds();
    this.pos = {x: 100, y: 100}
    this.velocity = {x:50, y:50};
    this.radius = 25
    this.acceleration = 0
    this.accelerating = false;
    this.createCircle();
    // this.drawLine1();
    stage.addChild(this.line);
    stage.addChild(this.circle);
    this.interval = interval
    this.mouseDiff = 0
    stage.on("stagemousemove", (e)=>{
      this.updateMouseDiff({x:e.stageX, y:e.stageY})
    })
  }

  updateMouseDiff(mousePos) {
    this.mouseDiff = diffVectors(this.pos, mousePos)
  }

  setBounds(){
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    this.bounds = {x:w, y:h}
  }

  detectCollision(){
    let bounds = this.bounds
    let radius = this.radius
    switch (true) {
      case this.pos.x < radius:
        this.velocity.x = Math.abs(this.velocity.x);
        break;
      case this.pos.x > bounds.x - radius:
        this.velocity.x = -Math.abs(this.velocity.x);
        break;
      case this.pos.y < radius:
        this.velocity.y = Math.abs(this.velocity.y);
        break;
      case this.pos.y > this.bounds.y - radius:
        this.velocity.y = -Math.abs(this.velocity.y);
        break;
    }
  }

  createCircle(){
    this.circle = new createjs.Shape().set(this.pos);
    this.circle.graphics.s("black").ss(1);
    this.circle.graphics.arc(0,0,this.radius,0,6.29);
  }

  drawLine1(){
    let direction = normalize(this.velocity, 5)
    let perp = {x:-direction.y, y:direction.x}
    this.line = new createjs.Shape();
    this.line.graphics.setStrokeStyle(1).beginStroke("red")
      .moveTo(this.pos.x - perp.x, this.pos.y - perp.y)
      .lineTo(this.pos.x + perp.x, this.pos.y + perp.y);
  }

  decelerate(factor){
    this.velocity = amplify(this.velocity, factor)
  }

  accelerate(){
    this.velocity = diffVectors(this.velocity, this.mouseDiff)
  }

  update(acceleration){
    this.decelerate(0.995)
    if (this.accelerating) {
      this.accelerate();
    }
    this.detectCollision();
    this.pos = {x:this.pos.x + this.velocity.x / 1000, y: this.pos.y + this.velocity.y / 1000}
    this.circle.set(this.pos)
  }
}

export default Katamari;
