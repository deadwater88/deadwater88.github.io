import Element from './element';

function tagifyText(parent){
  let re = /(>)([^<>]+)(<)/g;
  let content = parent.html();
  let newContent = content.replace(re, (...args)=> {
    let replacement = parseText(args[2]);
    return ">" + replacement + "<";
  });
  parent.html(newContent);
}

function parseText(string){
  return (string ? string.split(" ").map(word => replaceString(word)) : "").join(" ");
}

function replaceString(string){
  if (string === "" || string === '\n') {
    return string;
  }
  let id = (Math.floor(Math.random()*10000) + string);
  return `<a class="ctarget" id="${id}">${string}</a>`;
}

function boardParser(kat){
  tagifyText($("body"));
  $(".ctarget").each((idx, el)=>{
    el = $(el).clone();
    let pos = el.offset();
    let elprops = {el: el,
                   pos: {y:pos.top, x:pos.left},
                  kat: kat,
                   id: el.attr('id')};
    let element = new Element(elprops);
    $("body").append(el);
    el.offset(pos);
    element.word = el.text();
    let row = parseInt(pos.top / this.row_th);
    let col = parseInt(pos.left / this.col_th);
    element.location = {row, col};
    this.words[row][col][el.attr('id')] = element;
    this.allwords.push(element);
    this.count += 1;

  });

}

export default boardParser;
