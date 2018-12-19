var app = new PIXI.Application(1200, 800, { antialias: true })
document.body.appendChild(app.view)

var graphics = new PIXI.Graphics()
var stage = new PIXI.Container()

var fieldImage = PIXI.Texture.fromImage('/img/soccer.jpg')
var field = new PIXI.Sprite(fieldImage)
field.anchor.x = 0
field.anchor.y = 0

field.position.x = 0
field.position.y = 0

stage.addChild(field)

// var tilingSprite = new PIXI.extras.TilingSprite(tile, 900, 900);
// tilingSprite.anchor.x = 0.5;
// tilingSprite.anchor.y = 0.5;
// tilingSprite.position.x = 200;
// tilingSprite.position.y = 200;

// stage.addChild(tilingSprite);

// // set a fill and line style
// graphics.beginFill(0xFF3300)
// graphics.lineStyle(4, 0xffd900, 1)

// // draw a shape
// graphics.moveTo(50,50)
// graphics.lineTo(250, 50)
// graphics.lineTo(100, 100)
// graphics.lineTo(50, 50)
// graphics.endFill()

// // set a fill and a line style again and draw a rectangle
// graphics.lineStyle(2, 0x0000FF, 1)
// graphics.beginFill(0xFF700B, 1)
// graphics.drawRect(50, 250, 120, 120)

// // draw a rounded rectangle
// graphics.lineStyle(2, 0xFF00FF, 1)
// graphics.beginFill(0xFF00BB, 0.25)
// graphics.drawRoundedRect(150, 450, 300, 100, 15)
// graphics.endFill()

// // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
// graphics.lineStyle(0)
// graphics.beginFill(0xFFFF0B, 0.5)
// graphics.drawCircle(470, 90,60)
// graphics.endFill()

// app.stage.addChild(graphics)
