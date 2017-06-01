import {diffVectors, normalize, phaseDiff, distance} from './util';

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
    this.underphase = kat.phase;
  }

  updateStatus(){
    if (!phaseDiff(this.kat.phase.x, this.underphase.x) && !phaseDiff(this.kat.phase.y, this.underphase.y)) {
      this.el.css({"z-index": "-100"});
    } else {
      this.el.css({"z-index": "100"});
    }
  }

  checkCollision(){
    if (distance(this.pos, this.kat.pos) < 25) {
      this.bound = true;
      this.bind(this.kat);
      this.el.addClass("bound");
      this.diff = diffVectors(this.pos, this.kat.pos);
      let diff = this.diff;
      this.el.css({"top": `${diff.y}px`, "left": `${diff.x}px`, "position": "absolute" });
      $("#mark").append(this.el);
    }

  }


  update(){
    if (!this.bound) {
      this.checkCollision();
    } else {
      this.updateStatus();
    }
  }

}

export default Element;
