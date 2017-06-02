import Katamari from './katamari';
import Element from './element';
import Board from './board';
import Field from './field';

const INTERVAL = 25;

document.addEventListener("DOMContentLoaded", ()=> {


  let components = [];
  let field = new Field("field");
  let stage = new createjs.Stage("katamari");
  let katamari = new Katamari(stage);
  field.kat = katamari;
  let board = new Board({katamari});
  components.push(stage, katamari, board, field);
  createjs.Ticker.setInterval(INTERVAL);
  createjs.Ticker.on("tick", (event)=>{
    components.forEach(component=> component.update());
  });
});
