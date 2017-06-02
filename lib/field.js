class Field {
  constructor(id, kat){
    this.bounding = document.getElementById(id).getBoundingClientRect();
    this.kat = kat;
    this.id = id;
  }

  shake() {
    $(`#${this.id}`).playKeyframe(
        'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
        ()=> $(`#${this.id}`).resetKeyframe()
    );
  }


  detectCollision(){
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

  }


  updatebounding(){
    this.bounding = document.getElementById(this.id).getBoundingClientRect();
  }

  update(){
    this.updatebounding();
    this.detectCollision();
  }

}

export default Field;
