import Katamari from './katamari';
import Element from './element';
import Board from './board';

const INTERVAL = 25;

document.addEventListener("DOMContentLoaded", ()=> {
  let stage = new createjs.Stage("katamari");
  let katamari = new Katamari(stage);
  let board = new Board({katamari});
  window.stage = stage;
  window.katamari = katamari;
  window.board = board
  createjs.Ticker.setInterval(INTERVAL);
  createjs.Ticker.on("tick", tick);
});


document.addEventListener('mousedown', ()=>{
  katamari.accelerating = true;
});

document.addEventListener('mouseup', ()=>{
  katamari.accelerating = false;
});

window.addEventListener('resize', ()=>{
  katamari.setBounds();
});


function tick(event) {
  // Other stuff
  katamari.update();
  stage.update(event);
  board.update();
}
