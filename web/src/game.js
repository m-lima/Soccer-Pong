import Socket from './socket.js'
import keyboard from './keyboard.js'
import * as Shapes from './shapes.js'
import * as Drawables from './drawables.js'

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

    this.ball = new Drawables.DrawableCircle(this.app, 0xffffff, 0, 0, BALL_SIZE)
    this.player1 = new Drawables.DrawableCircle(
      this.app,
      0xff0000,
      PLAYER_SIZE,
      HEIGHT / 2,
      PLAYER_SIZE)
    this.player2 = new Drawables.DrawableCircle(
      this.app,
      0x0000ff,
      WIDTH - PLAYER_SIZE,
      HEIGHT / 2,
      PLAYER_SIZE)
  }

  createCrosshair() {
    this.crosshair = new Drawables.Crosshair(
      this.app,
      this.channel == 1 ? 0xff0000 : 0x0000ff,
      CROSSHAIR_SIZE,
      this.channel == 1 ? PLAYER_SIZE : WIDTH - PLAYER_SIZE,
      HEIGHT / 2
    )
    this.lastX = this.crosshair.shape.x
    this.lastY = this.crosshair.shape.y

    this.createKeyboard()
    this.createMouse()
  }

  createSocket() {
    this.socket = new Socket()
    this.socket.connect(this.channel, this.receive)
  }

  createKeyboard() {
    this.keyLeft = keyboard('ArrowLeft')
    this.keyUp = keyboard('ArrowUp')
    this.keyRight = keyboard('ArrowRight')
    this.keyDown = keyboard('ArrowDown')
  }

  createMouse() {
  }

  receive(e) {
    let data = JSON.parse(e.data)
    this.ball.setCoordinates(data.ball.x, data.ball.y)
    this.player1.setCoordinates(data.players[0].x, data.players[0].y)
    this.player2.setCoordinates(data.players[1].x, data.players[1].y)

    if (this.channel == 1) {
    } else if (this.channel == 2) {
    }
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

      if (this.crosshair.shape.x != this.lastX
        || this.crosshair.shape.y != this.lastY) {
        this.lastX = this.crosshair.shape.x
        this.lastY = this.crosshair.shape.y
        this.socket.send({ x: this.lastX, y: this.lastY })
      }
    }
  }
}

var game = new Game()
