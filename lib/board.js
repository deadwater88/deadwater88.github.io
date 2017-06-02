import randomWords from 'random-words';
import Element from './element';
import {distance} from './util';

class Board {
  constructor({bounds, katamari, count}){
    this.kat = katamari;
    this.bounds = bounds || {x:{start:0, end:2000}, y:{start:0, end:1000}};
    this.count = count||20;
    this.allwords = []
    this.words = {};
    this.setUpWords(10,10);
    this.spawnWords(this.count);
    this.setUpListeners();
  }

  detectCollision(){
    // if (this.inAir()) {
    //   return;
    // }
    let kat = this.kat
    let {bounds, radius, velocity, pos} = kat
    switch (true) {
      case pos.x < radius:
        kat.velocity.x = Math.abs(velocity.x);
        this.shake();
        break;
      case pos.x > bounds.x - radius:
        kat.velocity.x = -Math.abs(velocity.x);
        this.shake();
        break;
      case pos.y < radius:
        kat.velocity.y = Math.abs(velocity.y);
        this.shake();
        break;
      case pos.y > bounds.y - radius:
        kat.velocity.y = -Math.abs(velocity.y);
        this.shake();
        break;
    }
  }

  setUpListeners(){
    this.pressFlag = true;
    document.addEventListener('keypress', (e)=>{
      if (e.keyCode === 32) {
        e.preventDefault();
      }

      if (e.keyCode === 32 && !this.jumping && this.pressFlag) {
        console.log("jump")
        this.jump();
      }
      this.pressFlag = false;
      console.log(e.keyCode);
    });

    document.addEventListener('keyup', (e)=>{
      this.pressFlag = true;
    });
  }

  shake() {
    $(`body`).playKeyframe(
        'shake 0.2s cubic-bezier(.36,.07,.19,.97) both',
        ()=> $(`body`).resetKeyframe()
    );
  }

  jump(){
    let kat = this.kat
    kat.jumping = true;
    setTimeout(()=>{
      kat.jumping = false;
      kat.falling = true;
      setTimeout(()=> {kat.falling = false
        this.impact();
      }, kat.jumptime)

    } , kat.jumptime)
  }

  impact(){
    this.shake();
    this.allwords.forEach(el=>{
      if (!el.bound && distance(el.pos, this.kat.pos) < this.kat.radius * 6) {
        el.scatter(this.words, this.row_th, this.col_th);
      }
    })

  }


  setUpWords(_cols,_rows){
    this.row_th = Math.floor((this.bounds.y.end - this.bounds.y.start) / _rows);
    this.col_th = Math.floor((this.bounds.x.end - this.bounds.x.start) / _cols);
    Array(_rows + 1).fill("").forEach((el,idx)=> {
      this.words[idx] = {};
      let row = this.words[idx];
      Array(_cols + 1).fill("").forEach((el2,idx2)=>{
        row[idx2] = {};
      });
    });
  }


  spawnWord(){
    let word = randomWords();
    let $div = $(`<div>${word}</div>`);
    $div.addClass("target");
    $("#body").append($div);
    let id = (Math.floor(Math.random()*10000) + word)
    let elProps = {el: $div,
                  pos: this.generateRandomPos($div),
                  kat: this.kat,
                  id: id };
    let element = new Element(elProps);
    element.word = word;
    let pos = element.pos;
    let row = parseInt(pos.y / this.row_th);
    let col = parseInt(pos.x / this.col_th);
    element.location = {row, col}
    this.words[row][col][id] = element;
    this.allwords.push(element);
    this.count += 1;
  }

  spawnWords(count){
    for (var i = 0; i < count; i++) {
      this.spawnWord();
    }
  }

  generateRandomPos($div){
    let {x,y} = this.bounds;
    let pos = {};
    pos.x = Math.floor(Math.random() * (x.end - x.start + 1) + x.start);
    pos.y = Math.floor(Math.random() * (y.end - y.start + 1) + y.start);
    pos.x = pos.x + $div.width()/2;
    pos.y = pos.y + $div.height()/2;
    return pos;
  }

  update(){
    this.detectCollision();
    let pos = this.kat.pos;
    let row = parseInt(pos.y / this.row_th);
    let col = parseInt(pos.x / this.col_th);
    for (let key in this.words[row][col]) {
      this.words[row][col][key].update()
    }
  }

}

export default Board;
