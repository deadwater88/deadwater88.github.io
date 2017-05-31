import {diffVectors} from './utils';

class element {
  construct(id){
    this.el = $(`${id}`);
    this.pos = elPos;
  }

  bind(kat){
    this.relpos = diffVectors(this.pos, kat.pos);

  }

}
