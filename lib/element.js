import {diffVectors, normalize, phaseDiff, distance} from './util';

class Element {
  constructor(id, kat){
    this.el = $(`${id}`);
    this.pos = {x:parseInt(this.el.css("left")), y:parseInt(this.el.css("top"))};
    this.bound = false;
    this.kat = kat;
  }

  bind(kat){
    this.kat = kat
    this.relpos = normalize(diffVectors(this.pos, kat.pos), kat.radius);
    this.underphase = kat.phase
  }

  updateStatus(){
    if (!phaseDiff(this.kat.phase.x, this.underphase.x) && !phaseDiff(this.kat.phase.y, this.underphase.y)) {
      this.el.css({"z-index": "-100"})
    } else {
      this.el.css({"z-index": "100"})
    }
  }

  checkCollision(){
    console.log(distance(this.pos, this.kat.pos) );
    if (distance(this.pos, this.kat.pos) < 40) {
      this.bound = true;
      console.log(this.bound);
      this.bind(this.kat)
      this.el.addClass("bound");
      let diff = diffVectors(this.pos, this.kat.pos)
      this.el.css({"top": `${diff.y}px`, "left": `${diff.x}px`, "position": "absolute" })
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
