checkCollision(){
  let {top, left, right, bottom} this.el[0].getBoundingClientRect();
  let {x, y} = this.kat.pos;
  let {radius, pos} = this.kat;
  let betweenTopandBot = y < bottom && y > top;
  let betweenLeftandRight = x > left && x < right;
  let corners = [{x: left , y: top},
                 {x: left , y: bottom},
                 {x: right , y: top},
                 {x: right , y: bottom}]
  cornerContact = corners.some((corner)=> distance(corner, pos) < radius)
  tbContact = betweenLeftandRight && (Math.abs(y - top) < radius || Math.abs(y - bottom) < radius)
  sContact = betweenTopandBot && (Math.abs(x - left) < radius || Math.abs(x - right) < radius)
  return cornerContact || tbContact || sContact
}


let kat = this.kat;
if (kat.inAir()){
  return "";
}
let {top, left, right, bottom} = this.bounding;
let {x, y} = this.kat.pos;
let betweenTopandBot = y < bottom && y > top;
let betweenLeftandRight = x > left && x < right;
switch (true) {
  case Math.abs(x - left) < kat.radius && betweenTopandBot:
    this.kat.velocity.x = -this.kat.velocity.x;
    this.shake();
    break;
  case Math.abs(x - right) < kat.radius && betweenTopandBot:
    this.kat.velocity.x = -this.kat.velocity.x;
    this.shake();
    break;
  case Math.abs(y - top) < kat.radius && betweenLeftandRight:
    this.kat.velocity.y = -this.kat.velocity.y;
    this.shake();
    break;
  case Math.abs(y - bottom) < kat.radius && betweenLeftandRight:
    this.kat.velocity.y = -this.kat.velocity.y;
    this.shake();
    break;
}
