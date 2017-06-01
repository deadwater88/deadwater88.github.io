import randomWords from 'random-words';
import Element from './element';

class Board {
  constructor({bounds, katamari, count}){
    this.kat = katamari;
    this.bounds = bounds || {x:{start:0, end:2000}, y:{start:0, end:1000}};
    this.count = count||20;
    this.words = {};
    this.setUpWords(3,3);
    this.spawnWords(this.count);
  }

  setUpWords(_cols,_rows){
    this.row_th = Math.floor((this.bounds.y.end - this.bounds.y.start) / _rows);
    this.col_th = Math.floor((this.bounds.x.end - this.bounds.x.start) / _cols);
    Array(_rows).fill("").forEach((el,idx)=> {
      this.words[idx] = {};
      let row = this.words[idx];
      Array(_cols).fill("").forEach((el2,idx2)=>{
        row[idx2] = [];
      });
    });
  }

  spawnWord(){
    let word = randomWords();
    let $div = $(`<div>${word}</div>`, {id: "target" + this.wordCount, "class": "target" });
    $("#body").append($div);
    let element = new Element($div, this.generateRandomPos($div), this.kat);
    element.word = word;
    let pos = element.pos;
    let row = parseInt(pos.y / this.row_th);
    let col = parseInt(pos.x / this.col_th);
    this.words[row][col].push(element);
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
    pos.y = pos.y + $div.length()/2;
    return pos;
  }

  update(){
    let pos = this.kat.pos;
    let row = parseInt(pos.y / this.row_th);
    let col = parseInt(pos.x / this.col_th);
    this.words[row][col].forEach((element)=> element.update());
  }

}

export default Board;
