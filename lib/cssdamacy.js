import Katamari from './katamari';

const INTERVAL = 25

document.addEventListener("DOMContentLoaded", ()=> {
  let stage = new createjs.Stage("katamari")
  let katamari = new Katamari(stage);
  window.stage = stage;
  window.katamari = katamari;
  createjs.Ticker.setInterval(INTERVAL);
  createjs.Ticker.on("tick", tick);
})

document.addEventListener("click", () =>{
  katamari.circle.set({x:300, y:300});
})

document.addEventListener('mousedown', ()=>{
  katamari.accelerating = true;
  console.log("accelerating")
})

document.addEventListener('mouseup', ()=>{
  katamari.accelerating = false;
  console.log("not accelerating");
})

window.addEventListener('resize', ()=>{
  katamari.setBounds();
})


function tick(event) {
  // Other stuff
  katamari.update()
  stage.update(event);
}
