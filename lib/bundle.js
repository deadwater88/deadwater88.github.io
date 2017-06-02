/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const normalize = (vector, scale) => {
  var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  if (norm != 0) {
    return {x:scale * vector.x / norm, y:scale * vector.y / norm};
  }
};
/* harmony export (immutable) */ __webpack_exports__["d"] = normalize;


const amplify = (vector, factor) => {
  return {x:vector.x*factor , y:vector.y*factor };
};
/* harmony export (immutable) */ __webpack_exports__["f"] = amplify;


const combineVectors = (vector1, vector2) => {
  return {x:vector1.x +vector2.x, y: vector1.y + vector2.y};
};
/* harmony export (immutable) */ __webpack_exports__["e"] = combineVectors;


const diffVectors = (vector1, vector2) => {
  return {x:vector1.x - vector2.x, y: vector1.y - vector2.y};
};
/* harmony export (immutable) */ __webpack_exports__["b"] = diffVectors;


const phaseDiff = (phase1, phase2) => {
  return Math.abs(((Math.abs(phase1 - phase2) % (Math.PI * 2))) - Math.PI) < (Math.PI/2);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = phaseDiff;


const distance = (pos1, pos2) => {
  let x = (pos1.x - pos2.x);
  let y = (pos1.y - pos2.y);
  return Math.pow((x*x + y*y), 0.5);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = distance;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);


class Element {
  constructor({el, pos, kat, id}){
    this.el = el;
    this.pos = pos
    this.bound = false;
    this.kat = kat;
    this.setElDefaults();
    this.id = id;
  }

  setElDefaults(){
    let pos = this.pos;
    this.el.css({"top": `${pos.y}px`, "left": `${pos.x}px`, "position": "absolute" });
  }

  bind(kat){
    this.kat = kat;
    this.relpos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* diffVectors */])(this.pos, kat.pos);
    this.bindphase = kat.phase;
    this.kat.bound.push(this);
    this.el.addClass("bound");
    this.el.resetKeyframe();
    this.el.css({"top": `${0}px`, "left": `${0}px`, "position": "absolute" });
    $("#score").html(`Score: ${this.kat.bound.length}`)
  }

  updateStatus(){
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* phaseDiff */])(this.kat.phase.x - Math.PI/4, this.bindphase.x) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* phaseDiff */])(this.kat.phase.y - Math.PI/4, this.bindphase.y)) {
      this.el.css({"z-index": "-501"});
    } else {
      this.el.css({"z-index": "501"});
    }

  }

  scatter(words, row_th, col_th){
    let pushVector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* normalize */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* diffVectors */])(this.pos, this.kat.pos), 50);
    let {x,y} = pushVector;
    let id = Math.floor((Math.random() * 90)) - 45;
    $.keyframe.define({
    name: `push${id}`,
    from: {
        'transform': `rotateZ(0deg) translateX(0px) translateY(0px)`
    },
    to: {
        'transform': `rotateZ(${id}deg) translateX(${x}px) translateY(${y}px)`
    }
    });

    this.el.playKeyframe(
    `push${id} .05s linear 0s 1 normal forwards`
    );
    this.pos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* combineVectors */])(this.pos, pushVector);
    let {row,col} = this.location;
    delete words[row][col][this.id]
    let pos = this.pos;
    row = parseInt(pos.y / row_th);
    col = parseInt(pos.x / col_th);
    words[row][col][this.id] = this;

  }

  updateTransformation(){
    let netpos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* combineVectors */])(this.kat.pos, this.relpos);
        netpos = {x:Math.round(netpos.x), y: Math.round(netpos.y)};
    let {x,y} = this.relpos;
    x = Math.round(x);
    y = Math.round(y);
    this.el.css('transform-origin', `${-x}px ${-y}px`);
    this.el.css({'transform': `translateX(${netpos.x}px)
                  translateY(${netpos.y}px)
                  rotateX(${this.bindphase.y - this.kat.phase.y}rad)
                  rotateY(${this.bindphase.x - this.kat.phase.x}rad)`});
  }

  checkCollision(){
    if (this.kat.inAir()){
      return "";
    }

    let {top, left, right, bottom} = this.el[0].getBoundingClientRect();
    let {x, y} = this.kat.pos;
    let {radius, pos} = this.kat;
    let betweenTopandBot = y < bottom && y > top;
    let betweenLeftandRight = x > left && x < right;
    let corners = [{x: left , y: top},
                   {x: left , y: bottom},
                   {x: right , y: top},
                   {x: right , y: bottom}]
    let cornerContact = corners.some((corner)=> __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* distance */])(corner, pos) < radius)
    let tbContact = betweenLeftandRight && (Math.abs(y - top) < radius || Math.abs(y - bottom) < radius)
    let sContact = betweenTopandBot && (Math.abs(x - left) < radius || Math.abs(x - right) < radius)
    if (cornerContact || tbContact || sContact) {
      this.bound = true;
      this.bind(this.kat);
      this.kat.radius += 2;
    };

  }


  update(){
    if (!this.bound) {
      this.checkCollision();
    } else {
      this.updateStatus();
      this.updateTransformation();
    }

  }

}

/* harmony default export */ __webpack_exports__["a"] = (Element);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cssdamacy__ = __webpack_require__(3);



const FREQ_CONV_FACTOR = Math.PI * 180 /150;

class Katamari {
  constructor(stage, interval, startbound){
    this.setUpProps();
    this.setUpListeners();
    this.setBounds();
    this.createCircle();
    // this.drawLine1();
    stage.addChild(this.line);
    stage.addChild(this.circle);
    this.interval = interval;
    this.mouseDiff = 0;
    stage.on("stagemousemove", (e)=>{
      this.updateMouseDiff({x:e.stageX, y:e.stageY});
    });

  }

  setUpProps(){
    this.pos = {x: 500, y: 200};
    this.velocity = {x:1000, y:0};
    this.radius = 25;
    this.acceleration = 0;
    this.accelerating = false;
    this.bound = [];
    this.jumping = false;
    this.jumptime = 500;
    let canvas = document.getElementById("katamari")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setBounds(){
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.bounds = {x:w, y:h};
  }

  setUpListeners(){
    document.addEventListener('mousedown', ()=>{
      this.accelerating = true;
    });

    document.addEventListener('mouseup', ()=>{
      this.accelerating = false;
    });

    window.addEventListener('resize', ()=>{
      this.setBounds();
      let canvas = document.getElementById("katamari")
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });


  }

  detectCollision(){
    // if (this.inAir()) {
    //   return;
    // }
    let bounds = this.bounds;
    let radius = this.radius;
    switch (true) {
      case this.pos.x < radius:
        this.velocity.x = Math.abs(this.velocity.x);
        break;
      case this.pos.x > bounds.x - radius:
        this.velocity.x = -Math.abs(this.velocity.x);
        break;
      case this.pos.y < radius:
        this.velocity.y = Math.abs(this.velocity.y);
        break;
      case this.pos.y > this.bounds.y - radius:
        this.velocity.y = -Math.abs(this.velocity.y);
        break;
    }
  }




  createCircle(){
    this.circle = new createjs.Shape().set(this.pos);
    this.circle.graphics.s("black").ss(1);
    this.circle.graphics.beginFill("red");
    this.circle.graphics.arc(0,0,this.radius,0,6.29);
  }

  drawLine1(){
    let direction = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* normalize */])(this.velocity, 5);
    let perp = {x:-direction.y, y:direction.x};
    this.line = new createjs.Shape();
    this.line.graphics.setStrokeStyle(1).beginStroke("red")
      .moveTo(this.pos.x - perp.x, this.pos.y - perp.y)
      .lineTo(this.pos.x + perp.x, this.pos.y + perp.y);
  }

  decelerate(factor){
    this.velocity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* amplify */])(this.velocity, factor);
  }

  accelerate(){
    this.velocity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* diffVectors */])(this.velocity, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* normalize */])(this.mouseDiff,200));
  }

  updateSpin(){
    $.keyframe.define({
    name: 'spin',
    from: {
        'transform': `rotateX(0deg) rotateY(0deg)`
    },
    to: {
        'transform': `rotateX(${this.freqY}deg) rotateY(${this.freqX}deg)`
    }
    });
  }

  inAir(){
    return this.jumping || this.falling;
  }

  updateMouseDiff(mousePos) {
    this.mouseDiff = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* diffVectors */])(this.pos, mousePos);
  }

  updateMark(){
    $("#mark").css({"top": this.pos.y, "left": this.pos.x});
  }

  updatePosition(){
    this.pos = {x:this.pos.x + this.velocity.x / (25000 / __WEBPACK_IMPORTED_MODULE_1__cssdamacy__["INTERVAL"]), y: this.pos.y + this.velocity.y / (25000/ __WEBPACK_IMPORTED_MODULE_1__cssdamacy__["INTERVAL"])};
    this.circle.set(this.pos);
  }

  updateFrequency(){
    this.freqX = (this.velocity.x) / this.radius * FREQ_CONV_FACTOR ;
    this.freqY = (this.velocity.y) / this.radius * FREQ_CONV_FACTOR ;
  }

  updatePhase(){
    this.phase = {x:(this.pos.x/(this.radius)) % (2 * Math.PI), y:(this.pos.y/(this.radius)) % (2 * Math.PI)};
  }

  updateBound(){
    this.bound.forEach((el)=> el.update());
  }

  updateHeight(){
    if (this.jumping) {
      this.radius += 1;
    } else if (this.falling) {
      this.radius -= 1;
    }
    this.circle.graphics.command.radius = this.radius;
  }



  update(acceleration){
    if (this.accelerating) {
      this.accelerate();
    }
    this.updateBound();
    this.decelerate(.995);
    // this.detectCollision();
    this.updatePosition();
    this.updateFrequency();
    this.updateMark();
    this.updateSpin();
    this.updatePhase();
    this.updateHeight();

  }
}

/* harmony default export */ __webpack_exports__["a"] = (Katamari);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__katamari__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__board__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__field__ = __webpack_require__(6);





const INTERVAL = 20;
/* harmony export (immutable) */ __webpack_exports__["INTERVAL"] = INTERVAL;


document.addEventListener("DOMContentLoaded", ()=> {


  let components = [];
  let field = new __WEBPACK_IMPORTED_MODULE_3__field__["a" /* default */]("field");
  let stage = new createjs.Stage("katamari");
  let katamari = new __WEBPACK_IMPORTED_MODULE_0__katamari__["a" /* default */](stage);
  field.kat = katamari;
  let board = new __WEBPACK_IMPORTED_MODULE_2__board__["a" /* default */]({katamari});
  components.push(stage, katamari, board, field);
  createjs.Ticker.setInterval(INTERVAL);
  createjs.Ticker.on("tick", (event)=>{
    components.forEach(component=> component.update());
  });
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_words__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_random_words___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_random_words__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);




class Board {
  constructor({bounds, katamari, count}){
    this.kat = katamari;
    this.bounds = bounds || {x:{start:0, end:2000}, y:{start:0, end:1000}};
    this.count = count||20;
    this.allwords = [];
    this.words = {};
    this.setUpWords(5,5);
    this.spawnWords(this.count);
    this.setUpListeners();
  }

  detectCollision(){
    // if (this.inAir()) {
    //   return;
    // }
    let kat = this.kat;
    let {bounds, radius, velocity, pos} = kat;
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
      if (!el.bound && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* distance */])(el.pos, this.kat.pos) < this.kat.radius * 6) {
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
    let word = __WEBPACK_IMPORTED_MODULE_0_random_words___default()();
    let $div = $(`<div>${word}</div>`);
    $div.addClass("target");
    $("#body").append($div);
    let id = (Math.floor(Math.random()*10000) + word)
    let elProps = {el: $div,
                  pos: this.generateRandomPos($div),
                  kat: this.kat,
                  id: id };
    let element = new __WEBPACK_IMPORTED_MODULE_1__element__["a" /* default */](elProps);
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

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var wordList = [
  // Borrowed from xkcd password generator which borrowed it from wherever
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away","baby","back","bad","badly","bag","balance","ball",
  "balloon","band","bank","bar","bare","bark","barn","base",
  "baseball","basic","basis","basket","bat","battle","be","bean",
  "bear","beat","beautiful","beauty","became","because","become","becoming",
  "bee","been","before","began","beginning","begun","behavior","behind",
  "being","believed","bell","belong","below","belt","bend","beneath",
  "bent","beside","best","bet","better","between","beyond","bicycle",
  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
  "black","blank","blanket","blew","blind","block","blood","blow",
  "blue","board","boat","body","bone","book","border","born",
  "both","bottle","bottom","bound","bow","bowl","box","boy",
  "brain","branch","brass","brave","bread","break","breakfast","breath",
  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
  "broad","broke","broken","brother","brought","brown","brush","buffalo",
  "build","building","built","buried","burn","burst","bus","bush",
  "business","busy","but","butter","buy","by","cabin","cage",
  "cake","call","calm","came","camera","camp","can","canal",
  "cannot","cap","capital","captain","captured","car","carbon","card",
  "care","careful","carefully","carried","carry","case","cast","castle",
  "cat","catch","cattle","caught","cause","cave","cell","cent",
  "center","central","century","certain","certainly","chain","chair","chamber",
  "chance","change","changing","chapter","character","characteristic","charge","chart",
  "check","cheese","chemical","chest","chicken","chief","child","children",
  "choice","choose","chose","chosen","church","circle","circus","citizen",
  "city","class","classroom","claws","clay","clean","clear","clearly",
  "climate","climb","clock","close","closely","closer","cloth","clothes",
  "clothing","cloud","club","coach","coal","coast","coat","coffee",
  "cold","collect","college","colony","color","column","combination","combine",
  "come","comfortable","coming","command","common","community","company","compare",
  "compass","complete","completely","complex","composed","composition","compound","concerned",
  "condition","congress","connected","consider","consist","consonant","constantly","construction",
  "contain","continent","continued","contrast","control","conversation","cook","cookies",
  "cool","copper","copy","corn","corner","correct","correctly","cost",
  "cotton","could","count","country","couple","courage","course","court",
  "cover","cow","cowboy","crack","cream","create","creature","crew",
  "crop","cross","crowd","cry","cup","curious","current","curve",
  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
  "dark","darkness","date","daughter","dawn","day","dead","deal",
  "dear","death","decide","declared","deep","deeply","deer","definition",
  "degree","depend","depth","describe","desert","design","desk","detail",
  "determine","develop","development","diagram","diameter","did","die","differ",
  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
  "disease","dish","distance","distant","divide","division","do","doctor",
  "does","dog","doing","doll","dollar","done","donkey","door",
  "dot","double","doubt","down","dozen","draw","drawn","dream",
  "dress","drew","dried","drink","drive","driven","driver","driving",
  "drop","dropped","drove","dry","duck","due","dug","dull",
  "during","dust","duty","each","eager","ear","earlier","early",
  "earn","earth","easier","easily","east","easy","eat","eaten",
  "edge","education","effect","effort","egg","eight","either","electric",
  "electricity","element","elephant","eleven","else","empty","end","enemy",
  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
  "environment","equal","equally","equator","equipment","escape","especially","essential",
  "establish","even","evening","event","eventually","ever","every","everybody",
  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
  "exist","expect","experience","experiment","explain","explanation","explore","express",
  "expression","extra","eye","face","facing","fact","factor","factory",
  "failed","fair","fairly","fall","fallen","familiar","family","famous",
  "far","farm","farmer","farther","fast","fastened","faster","fat",
  "father","favorite","fear","feathers","feature","fed","feed","feel",
  "feet","fell","fellow","felt","fence","few","fewer","field",
  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
  "film","final","finally","find","fine","finest","finger","finish",
  "fire","fireplace","firm","first","fish","five","fix","flag",
  "flame","flat","flew","flies","flight","floating","floor","flow",
  "flower","fly","fog","folks","follow","food","foot","football",
  "for","force","foreign","forest","forget","forgot","forgotten","form",
  "former","fort","forth","forty","forward","fought","found","four",
  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
  "full","fully","fun","function","funny","fur","furniture","further",
  "future","gain","game","garage","garden","gas","gasoline","gate",
  "gather","gave","general","generally","gentle","gently","get","getting",
  "giant","gift","girl","give","given","giving","glad","glass",
  "globe","go","goes","gold","golden","gone","good","goose",
  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
  "graph","grass","gravity","gray","great","greater","greatest","greatly",
  "green","grew","ground","group","grow","grown","growth","guard",
  "guess","guide","gulf","gun","habit","had","hair","half",
  "halfway","hall","hand","handle","handsome","hang","happen","happened",
  "happily","happy","harbor","hard","harder","hardly","has","hat",
  "have","having","hay","he","headed","heading","health","heard",
  "hearing","heart","heat","heavy","height","held","hello","help",
  "helpful","her","herd","here","herself","hidden","hide","high",
  "higher","highest","highway","hill","him","himself","his","history",
  "hit","hold","hole","hollow","home","honor","hope","horn",
  "horse","hospital","hot","hour","house","how","however","huge",
  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
  "hurt","husband","ice","idea","identity","if","ill","image",
  "imagine","immediately","importance","important","impossible","improve","in","inch",
  "include","including","income","increase","indeed","independent","indicate","individual",
  "industrial","industry","influence","information","inside","instance","instant","instead",
  "instrument","interest","interior","into","introduced","invented","involved","iron",
  "is","island","it","its","itself","jack","jar","jet",
  "job","join","joined","journey","joy","judge","jump","jungle",
  "just","keep","kept","key","kids","kill","kind","kitchen",
  "knew","knife","know","knowledge","known","label","labor","lack",
  "lady","laid","lake","lamp","land","language","large","larger",
  "largest","last","late","later","laugh","law","lay","layers",
  "lead","leader","leaf","learn","least","leather","leave","leaving",
  "led","left","leg","length","lesson","let","letter","level",
  "library","lie","life","lift","light","like","likely","limited",
  "line","lion","lips","liquid","list","listen","little","live",
  "living","load","local","locate","location","log","lonely","long",
  "longer","look","loose","lose","loss","lost","lot","loud",
  "love","lovely","low","lower","luck","lucky","lunch","lungs",
  "lying","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making","man","managed","manner",
  "manufacturing","many","map","mark","market","married","mass","massage",
  "master","material","mathematics","matter","may","maybe","me","meal",
  "mean","means","meant","measure","meat","medicine","meet","melted",
  "member","memory","men","mental","merely","met","metal","method",
  "mice","middle","might","mighty","mile","military","milk","mill",
  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","mostly","mother",
  "motion","motor","mountain","mouse","mouth","move","movement","movie",
  "moving","mud","muscle","music","musical","must","my","myself",
  "mysterious","nails","name","nation","national","native","natural","naturally",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
  "never","new","news","newspaper","next","nice","night","nine",
  "no","nobody","nodded","noise","none","noon","nor","north",
  "nose","not","note","noted","nothing","notice","noun","now",
  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
  "ocean","of","off","offer","office","officer","official","oil",
  "old","older","oldest","on","once","one","only","onto",
  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
  "order","ordinary","organization","organized","origin","original","other","ought",
  "our","ourselves","out","outer","outline","outside","over","own",
  "owner","oxygen","pack","package","page","paid","pain","paint",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pig","pile","pilot","pine","pink",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","prize","probably","problem","process","produce","product",
  "production","program","progress","promised","proper","properly","property","protection",
  "proud","prove","provide","public","pull","pupil","pure","purple",
  "purpose","push","put","putting","quarter","queen","question","quick",
  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
  "rain","raise","ran","ranch","range","rapidly","rate","rather",
  "raw","rays","reach","read","reader","ready","real","realize",
  "rear","reason","recall","receive","recent","recently","recognize","record",
  "red","refer","refused","region","regular","related","relationship","religious",
  "remain","remarkable","remember","remove","repeat","replace","replied","report",
  "represent","require","research","respect","rest","result","return","review",
  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
  "rise","rising","river","road","roar","rock","rocket","rocky",
  "rod","roll","roof","room","root","rope","rose","rough",
  "round","route","row","rubbed","rubber","rule","ruler","run",
  "running","rush","sad","saddle","safe","safety","said","sail",
  "sale","salmon","salt","same","sand","sang","sat","satellites",
  "satisfied","save","saved","saw","say","scale","scared","scene",
  "school","science","scientific","scientist","score","screen","sea","search",
  "season","seat","second","secret","section","see","seed","seeing",
  "seems","seen","seldom","select","selection","sell","send","sense",
  "sent","sentence","separate","series","serious","serve","service","sets",
  "setting","settle","settlers","seven","several","shade","shadow","shake",
  "shaking","shall","shallow","shape","share","sharp","she","sheep",
  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
  "shoe","shoot","shop","shore","short","shorter","shot","should",
  "shoulder","shout","show","shown","shut","sick","sides","sight",
  "sign","signal","silence","silent","silk","silly","silver","similar",
  "simple","simplest","simply","since","sing","single","sink","sister",
  "sit","sitting","situation","six","size","skill","skin","sky",
  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
  "smile","smoke","smooth","snake","snow","so","soap","social",
  "society","soft","softly","soil","solar","sold","soldier","solid",
  "solution","solve","some","somebody","somehow","someone","something","sometime",
  "somewhere","son","song","soon","sort","sound","source","south",
  "southern","space","speak","special","species","specific","speech","speed",
  "spell","spend","spent","spider","spin","spirit","spite","split",
  "spoken","sport","spread","spring","square","stage","stairs","stand",
  "standard","star","stared","start","state","statement","station","stay",
  "steady","steam","steel","steep","stems","step","stepped","stick",
  "stiff","still","stock","stomach","stone","stood","stop","stopped",
  "store","storm","story","stove","straight","strange","stranger","straw",
  "stream","street","strength","stretch","strike","string","strip","strong",
  "stronger","struck","structure","struggle","stuck","student","studied","studying",
  "subject","substance","success","successful","such","sudden","suddenly","sugar",
  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
  "swept","swim","swimming","swing","swung","syllable","symbol","system",
  "table","tail","take","taken","tales","talk","tall","tank",
  "tape","task","taste","taught","tax","tea","teach","teacher",
  "team","tears","teeth","telephone","television","tell","temperature","ten",
  "tent","term","terrible","test","than","thank","that","thee",
  "them","themselves","then","theory","there","therefore","these","they",
  "thick","thin","thing","think","third","thirty","this","those",
  "thou","though","thought","thousand","thread","three","threw","throat",
  "through","throughout","throw","thrown","thumb","thus","thy","tide",
  "tie","tight","tightly","till","time","tin","tiny","tip",
  "tired","title","to","tobacco","today","together","told","tomorrow",
  "tone","tongue","tonight","too","took","tool","top","topic",
  "torn","total","touch","toward","tower","town","toy","trace",
  "track","trade","traffic","trail","train","transportation","trap","travel",
  "treated","tree","triangle","tribe","trick","tried","trip","troops",
  "tropical","trouble","truck","trunk","truth","try","tube","tune",
  "turn","twelve","twenty","twice","two","type","typical","uncle",
  "under","underline","understanding","unhappy","union","unit","universe","unknown",
  "unless","until","unusual","up","upon","upper","upward","us",
  "use","useful","using","usual","usually","valley","valuable","value",
  "vapor","variety","various","vast","vegetable","verb","vertical","very",
  "vessels","victory","view","village","visit","visitor","voice","volume",
  "vote","vowel","voyage","wagon","wait","walk","wall","want",
  "war","warm","warn","was","wash","waste","watch","water",
  "wave","way","we","weak","wealth","wear","weather","week",
  "weigh","weight","welcome","well","went","were","west","western",
  "wet","whale","what","whatever","wheat","wheel","when","whenever",
  "where","wherever","whether","which","while","whispered","whistle","white",
  "who","whole","whom","whose","why","wide","widely","wife",
  "wild","will","willing","win","wind","window","wing","winter",
  "wire","wise","wish","with","within","without","wolf","women",
  "won","wonder","wonderful","wood","wooden","wool","word","wore",
  "work","worker","world","worried","worry","worse","worth","would",
  "wrapped","write","writer","writing","written","wrong","wrote","yard",
  "year","yellow","yes","yesterday","yet","you","young","younger",
  "your","yourself","youth","zero","zoo"
];

function words(options) {
  function word() {
    return wordList[randInt(wordList.length)];
  }

  function randInt(lessThan) {
    return Math.floor(Math.random() * lessThan);
  }

  // No arguments = generate one word
  if (typeof(options) === 'undefined') {
    return word();
  }

  // Just a number = return that many words
  if (typeof(options) === 'number') {
    options = { exactly: options };
  }

  // options supported: exactly, min, max, join

  if (options.exactly) {
    options.min = options.exactly;
    options.max = options.exactly;
  }
  var total = options.min + randInt(options.max + 1 - options.min);
  var results = [];
  for (var i = 0; (i < total); i++) {
    results.push(word());
  }
  if (options.join) {
    results = results.join(options.join);
  }
  return results;
}

module.exports = words;
// Export the word list as it is often useful
words.wordList = wordList;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Field);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map