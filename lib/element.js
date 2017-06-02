import {diffVectors, normalize, phaseDiff, distance, combineVectors} from './util';

class Element {
  constructor(el, pos, kat){
    this.el = el;
    this.pos = pos;
    this.bound = false;
    this.kat = kat;
    this.setElDefaults();
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
    this.el.css({"top": `${0}px`, "left": `${0}px`, "position": "absolute" });
  }

  updateStatus(){
    if (!phaseDiff(this.kat.phase.x, this.bindphase.x) && !phaseDiff(this.kat.phase.y, this.bindphase.y)) {
      this.el.css({"z-index": "-100"});
    } else {
      this.el.css({"z-index": "100"});
    }

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
    if (distance(this.pos, this.kat.pos) < this.kat.radius + 20) {
      this.bound = true;
      this.bind(this.kat);

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
