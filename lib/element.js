import {diffVectors, normalize, phaseDiff, distance, combineVectors} from './util';

class Element {
  constructor({el, pos, kat, id}){
    this.el = el;
    this.pos = pos
    this.bound = false;
    this.kat = kat;
    this.setElDefaults();
    this.id = id;
  }

  setElDefaults(){
    let pos = this.pos;
    this.el.css({"top": `${pos.y}px`, "left": `${pos.x}px`, "position": "absolute" });
  }

  bind(kat){
    this.kat = kat;
    this.relpos = normalize(diffVectors(this.pos, kat.pos), kat.radius);
    this.bindphase = kat.phase;
    this.kat.bound.push(this);
    this.el.addClass("bound");
    this.el.resetKeyframe();
    this.el.css({"top": `${0}px`, "left": `${0}px`, "position": "absolute" });
    $("#score").html(`Score: ${this.kat.bound.length}`)
  }

  updateStatus(){
    if (!phaseDiff(this.kat.phase.x, this.bindphase.x) && !phaseDiff(this.kat.phase.y, this.bindphase.y)) {
      this.el.css({"z-index": "-100"});
    } else {
      this.el.css({"z-index": "100"});
    }

  }

  scatter(words, row_th, col_th){
    let pushVector = normalize(diffVectors(this.pos, this.kat.pos), 50);
    let {x,y} = pushVector;
    let id = Math.floor((Math.random() * 90)) - 45;
    $.keyframe.define({
    name: `push${id}`,
    from: {
        'transform': `rotateZ(0deg) translateX(0px) translateY(0px)`
    },
    to: {
        'transform': `rotateZ(${id}deg) translateX(${x}px) translateY(${y}px)`
    }
    });

    this.el.playKeyframe(
    `push${id} .05s linear 0s 1 normal forwards`
    );
    this.pos = combineVectors(this.pos, pushVector);
    let {row,col} = this.location;
    delete words[row][col][this.id]
    let pos = this.pos;
    row = parseInt(pos.y / row_th);
    col = parseInt(pos.x / col_th);
    words[row][col][this.id] = this;

  }

  updateTransformation(){
    let netpos = combineVectors(this.kat.pos, this.relpos);
        netpos = {x:Math.round(netpos.x), y: Math.round(netpos.y)};
    let {x,y} = this.relpos;
    x = Math.round(x);
    y = Math.round(y);
    this.el.css('transform-origin', `${-x*1.1}px ${-y*1.1}px`);
    this.el.css({'transform': `translateX(${netpos.x}px)
                  translateY(${netpos.y}px)
                  rotateX(${this.bindphase.y + this.kat.phase.y}rad)
                  rotateY(${this.bindphase.x + this.kat.phase.x}rad)`});
  }

  checkCollision(){

    if (!this.kat.inAir() && distance(this.pos, this.kat.pos) < this.kat.radius + 10) {
      this.bound = true;
      this.bind(this.kat);
      this.kat.radius + .5;
    }

  }


  update(){
    if (!this.bound) {
      this.checkCollision();
    } else {
      this.updateStatus();
      this.updateTransformation();
    }
  }

}

export default Element;
