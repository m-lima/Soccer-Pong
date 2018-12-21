import * as Shapes from './shapes.js'

export class DrawableCircle extends Shapes.Circle {
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

export class Crosshair extends Shapes.Area {
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
