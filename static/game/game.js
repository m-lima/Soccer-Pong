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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/drawables.js":
/*!**************************!*\
  !*** ./src/drawables.js ***!
  \**************************/
/*! exports provided: DrawableCircle, Crosshair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawableCircle", function() { return DrawableCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Crosshair", function() { return Crosshair; });
/* harmony import */ var _shapes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes.js */ "./src/shapes.js");


class DrawableCircle extends _shapes_js__WEBPACK_IMPORTED_MODULE_0__["Circle"] {
  constructor(app, color, x, y, r) {
    super(x, y, r)

    this.shape = new PIXI.Graphics()

    this.shape.lineStyle(0)
    this.shape.beginFill(color)
    this.shape.drawCircle(0, 0, this.r)
    this.shape.endFill()

    app.stage.addChild(this.shape)

    this.setCoordinates(x, y)
  }

  setCoordinates(x, y) {
    this.x = x
    this.shape.x = x
    this.y = y
    this.shape.y = y
  }

  move(x, y) {
    this.x += x
    this.y += y
    this.shape.x += x
    this.shape.y += y
  }
}

class Crosshair extends _shapes_js__WEBPACK_IMPORTED_MODULE_0__["Area"] {
  constructor(app, color, size, x, y) {
    super(x, y, size, size)
    this.shape = new PIXI.Graphics()

    let width = 5
    this.shape.lineStyle(width, color, 1)

    this.shape.moveTo(0, -size)
    this.shape.lineTo(0, -width)
    this.shape.moveTo(0, width)
    this.shape.lineTo(0, size)

    this.shape.moveTo(-size, 0)
    this.shape.lineTo(-width, 0)
    this.shape.moveTo(width, 0)
    this.shape.lineTo(size, 0)

    app.stage.addChild(this.shape)

    this.setCoordinates(x, y)
  }

  setCoordinates(x, y) {
    this.x = x
    this.shape.x = x
    this.y = y
    this.shape.y = y
  }

  move(x, y) {
    this.x += x
    this.y += y
    this.shape.x += x
    this.shape.y += y
  }
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./src/socket.js");
/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard.js */ "./src/keyboard.js");
/* harmony import */ var _shapes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shapes.js */ "./src/shapes.js");
/* harmony import */ var _drawables_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./drawables.js */ "./src/drawables.js");





const WIDTH = 1200
const HEIGHT = 800
const HALF_WIDTH = WIDTH / 2

const PLAYER_SIZE = 15
const BALL_SIZE = 5
const CROSSHAIR_SIZE = 10

const CROSSHAIR_SPEED = 5

class Game {
  constructor() {
    this.tick = this.tick.bind(this)
    this.receive = this.receive.bind(this)
    this.processTouch = this.processTouch.bind(this)

    let query = new URLSearchParams(window.location.search)
    if (!query.has('channel')) {
      console.error('channel not defined')
      return
    }
    this.channel = query.get('channel')

    if (this.channel < 0 || this.channel > 2) {
      console.error('invalid channel:', this.channel)
      return
    }

    this.createStage()
    this.createScore()
    this.createSocket()

    if (this.channel == 1 || this.channel == 2) {
      this.createCrosshair()
      this.app.ticker.add(this.tick)
    }
  }

  createStage() {
    this.app = new PIXI.Application(1200, 800, { antialias: true })
    document.body.appendChild(this.app.view)

    // let fieldImage = null
    let fieldImage = PIXI.Texture.fromImage('/img/soccer.jpg')
    let field = new PIXI.Sprite(fieldImage)
    field.anchor.x = 0
    field.anchor.y = 0
    field.position.x = 0
    field.position.y = 0
    this.app.stage.addChild(field)

    this.ball = new _drawables_js__WEBPACK_IMPORTED_MODULE_3__["DrawableCircle"](this.app, 0xffffff, 0, 0, BALL_SIZE)
    this.player1 = new _drawables_js__WEBPACK_IMPORTED_MODULE_3__["DrawableCircle"](
      this.app,
      0xff0000,
      PLAYER_SIZE,
      HEIGHT / 2,
      PLAYER_SIZE)
    this.player2 = new _drawables_js__WEBPACK_IMPORTED_MODULE_3__["DrawableCircle"](
      this.app,
      0x0000ff,
      WIDTH - PLAYER_SIZE,
      HEIGHT / 2,
      PLAYER_SIZE)
  }

  createScore() {
    this.score1 = new PIXI.Text('0', {
      fontSize: HEIGHT / 3,
      fill: '#ff0000',
      align: 'center',
    })

    this.score1.x = 3 * WIDTH / 10
    this.score1.y = HEIGHT / 10
    this.score1.anchor.x = 0.5
    this.score1.alpha = 0.25

    this.score2 = new PIXI.Text('0', {
      fontSize: HEIGHT / 3,
      fill: '#0000ff',
      align: 'center',
    })

    this.score2.x = 7 * WIDTH / 10
    this.score2.y = HEIGHT / 10
    this.score2.anchor.x = 0.5
    this.score2.alpha = 0.25

    this.app.stage.addChild(this.score1, this.score2)
  }

  createCrosshair() {
    this.crosshair = new _drawables_js__WEBPACK_IMPORTED_MODULE_3__["Crosshair"](
      this.app,
      this.channel == 1 ? 0xff0000 : 0x0000ff,
      CROSSHAIR_SIZE,
      this.channel == 1 ? PLAYER_SIZE : WIDTH - PLAYER_SIZE,
      HEIGHT / 2
    )
    this.lastX = this.crosshair.shape.x
    this.lastY = this.crosshair.shape.y

    this.createKeyboard()
    this.createPointer()
  }

  createSocket() {
    this.socket = new _socket_js__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.socket.connect(this.channel, this.receive)
  }

  createKeyboard() {
    this.keyLeft = Object(_keyboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])('ArrowLeft')
    this.keyUp = Object(_keyboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])('ArrowUp')
    this.keyRight = Object(_keyboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])('ArrowRight')
    this.keyDown = Object(_keyboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])('ArrowDown')
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.socket.send({ x: -123, y: -456 })
        e.preventDefault()
      }
    }, false)
  }

  createPointer() {
    console.log('creating mouse')
    this.app.stage.interactive = true
    this.app.stage.on('pointermove', this.processTouch)
  }

  receive(e) {
    let data = JSON.parse(e.data)
    this.ball.setCoordinates(data.ball.x, data.ball.y)
    this.player1.setCoordinates(data.players[0].x, data.players[0].y)
    this.player2.setCoordinates(data.players[1].x, data.players[1].y)
    this.score1.text = (data.score >> 8) & 0xff
    this.score2.text = data.score & 0xff
  }

  processTouch(e) {
    let x = e.data.global.x
    let y = e.data.global.y

    let minX = (this.channel - 1 ) * HALF_WIDTH + PLAYER_SIZE
    let maxX = this.channel * HALF_WIDTH - PLAYER_SIZE

    if (x < minX) {
      x = minX
    } else if (x > maxX) {
      x = maxX
    }

    if (y < PLAYER_SIZE) {
      y = PLAYER_SIZE
    } else if (y > HEIGHT - PLAYER_SIZE) {
      y = HEIGHT - PLAYER_SIZE
    }

    this.crosshair.setCoordinates(x, y)
    this.updatePosition()
  }

  tick(delta) {
    let x = 0
    let y = 0

    if (this.keyLeft.isDown) x -= CROSSHAIR_SPEED
    if (this.keyUp.isDown) y -= CROSSHAIR_SPEED
    if (this.keyRight.isDown) x += CROSSHAIR_SPEED
    if (this.keyDown.isDown) y += CROSSHAIR_SPEED

    if (x != 0 || y != 0) {
      this.crosshair.move(x * delta, y * delta)

      let minX = (this.channel - 1 ) * HALF_WIDTH + PLAYER_SIZE
      let maxX = this.channel * HALF_WIDTH - PLAYER_SIZE

      x = this.crosshair.x
      y = this.crosshair.y
      let move = false
      if (this.crosshair.x < minX) {
        x = minX
        move = true
      } else if (this.crosshair.x > maxX) {
        x = maxX
        move = true
      }

      if (this.crosshair.y < PLAYER_SIZE) {
        y = PLAYER_SIZE
        move = true
      } else if (this.crosshair.y > HEIGHT - PLAYER_SIZE) {
        y = HEIGHT - PLAYER_SIZE
        move = true
      }

      if (move) {
        this.crosshair.setCoordinates(x, y)
      }

      this.updatePosition()
    }
  }

  updatePosition() {
    if (this.crosshair.shape.x != this.lastX
      || this.crosshair.shape.y != this.lastY) {
      this.lastX = this.crosshair.shape.x
      this.lastY = this.crosshair.shape.y
      this.socket.send({ x: this.lastX, y: this.lastY })
    }
  }
}

var game = new Game()


/***/ }),

/***/ "./src/keyboard.js":
/*!*************************!*\
  !*** ./src/keyboard.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return keyboard; });
function keyboard(value) {
  let key = {
    value: value,
    isDown: false,
  }

  key.downHandler = (e) => {
    if (e.key === key.value) {
      key.isDown = true
      e.preventDefault()
    }
  }

  key.upHandler = (e) => {
    if (e.key === key.value) {
      key.isDown = false
      e.preventDefault()
    }
  }

  //Attach event listeners
  const downListener = key.downHandler.bind(key)
  const upListener = key.upHandler.bind(key)

  window.addEventListener('keydown', downListener, false)
  window.addEventListener('keyup', upListener, false)

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener)
    window.removeEventListener('keyup', upListener)
  }

  return key
}


/***/ }),

/***/ "./src/shapes.js":
/*!***********************!*\
  !*** ./src/shapes.js ***!
  \***********************/
/*! exports provided: Area, Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Area", function() { return Area; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
class Area {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.r = x + w
    this.b = y + h
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r

    this.n = y - r
    this.e = x + r
    this.s = y + r
    this.w = x - r
  }

  intersects(other) {
    if (other instanceof Area) {
      return !(this.e < other.x || this.w > other.r || this.s < other.y || this.n > other.b)
    }
  }
}



/***/ }),

/***/ "./src/socket.js":
/*!***********************!*\
  !*** ./src/socket.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Socket; });
class Socket {
  connect(channel, receive) {
    if (this.socket) {
      console.error('connection already established')
      return
    }

    console.log('connecting to channel', channel)
    this.socket = new WebSocket('ws://' + window.location.host + '/socket/' + channel)
    this.socket.onmessage = receive
  }

  send(msg) {
    if (this.socket) {
      this.socket.send(JSON.stringify(msg))
    }
  }
}


/***/ })

/******/ });
//# sourceMappingURL=game.js.map