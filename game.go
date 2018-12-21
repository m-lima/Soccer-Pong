package main

import (
	"log"
	"math"
	"os"
	"time"

	"math/rand"
)

const (
	width      = 1200.0
	halfWidth  = width * 0.5
	height     = 800.0
	goalTop    = height * 0.338
	goalBottom = height * 0.661
	areaTop    = height * 0.144
	areaBottom = height * 0.856

	goalAreaWidth  = width * 0.197
	largeAreaWidth = width * 0.067

	speed = 10.0

	ballRadius     = 5.0
	ballDiameter   = 10.0
	playerRadius   = 15.0
	playerDiameter = 30.0
)

var (
	gameLogStd = log.New(os.Stdout, "[game] ", log.Ldate|log.Ltime)
	gameLogErr = log.New(os.Stderr, "ERROR [game] ", log.Ldate|log.Ltime)

	gameStatus = GameStatus{
		Players:    make([]Position, 2),
		Crosshairs: make([]Position, 2),
		Ball:       Position{},
		Score:      0,
	}

	ballSpeed = Speed{}
	ticking   = false
)

func prepareGame() {
	rand.Seed(time.Now().UTC().UnixNano())

	gameStatus.Players[0] = Position{X: playerRadius, Y: height / 2.0}
	gameStatus.Players[1] = Position{X: width - playerRadius, Y: height / 2.0}
	gameStatus.Crosshairs[0] = Position{X: playerRadius, Y: height / 2.0}
	gameStatus.Crosshairs[1] = Position{X: width - playerRadius, Y: height / 2.0}
	gameStatus.Ball = Position{width / 2.0, height / 2.0}

	angle := rand.Float64()*math.Pi + math.Pi/4.0
	if angle > (math.Pi/2.0+math.Pi)/2.0 {
		angle += math.Pi / 2.0
	}

	ballSpeed.X = math.Sin(angle) * speed
	ballSpeed.Y = math.Cos(angle) * speed

	gameLogStd.Println("Speed", ballSpeed)

	ticking = false

	broadcast <- gameStatus
}

func startGame() {
	if !ticking {
		go gameLoop()
	}
}

func gameLoop() {
	ticking = true
	for range time.Tick(32 * time.Millisecond) {
		crosshair1 := Position{
			X: gameStatus.Crosshairs[0].X,
			Y: gameStatus.Crosshairs[0].Y,
		}

		crosshair2 := Position{
			X: gameStatus.Crosshairs[1].X,
			Y: gameStatus.Crosshairs[1].Y,
		}

		movePlayer(0, &crosshair1)
		movePlayer(1, &crosshair2)
		moveBall()
		hitBall(0)
		hitBall(1)

		if checkPoint() {
			prepareGame()
			return
		}

		broadcast <- gameStatus
	}
}

func movePlayer(player int, crosshair *Position) {
	playerSpeed := speed

	if gameStatus.Players[player].Y >= goalTop && gameStatus.Players[player].Y <= goalBottom {
		if player == 0 {
			if gameStatus.Players[player].X <= goalAreaWidth {
				playerSpeed *= 0.5
			}
		} else {
			if gameStatus.Players[player].X >= width-goalAreaWidth {
				playerSpeed *= 0.5
			}
		}
	} else if gameStatus.Players[player].Y >= areaTop && gameStatus.Players[player].Y <= areaBottom {
		if player == 0 {
			if gameStatus.Players[player].X <= largeAreaWidth {
				playerSpeed *= 0.75
			}
		} else {
			if gameStatus.Players[player].X >= width-largeAreaWidth {
				playerSpeed *= 0.75
			}
		}
	}

	x := crosshair.X - gameStatus.Players[player].X
	y := crosshair.Y - gameStatus.Players[player].Y
	distance := math.Sqrt(x*x + y*y)

	if distance <= playerSpeed {
		gameStatus.Players[player].X = crosshair.X
		gameStatus.Players[player].Y = crosshair.Y
	} else {
		gameStatus.Players[player].X += playerSpeed * x / distance
		gameStatus.Players[player].Y += playerSpeed * y / distance
	}

	minX := float64(player)*halfWidth + playerRadius
	maxX := halfWidth + float64(player)*halfWidth - playerRadius

	if gameStatus.Players[player].X < minX {
		gameStatus.Players[player].X = minX
	} else if gameStatus.Players[player].X > maxX {
		gameStatus.Players[player].X = maxX
	}

	if gameStatus.Players[player].Y < playerRadius {
		gameStatus.Players[player].Y = playerRadius
	} else if gameStatus.Players[player].Y > height-playerRadius {
		gameStatus.Players[player].Y = height - playerRadius
	}
}

func moveBall() {
	gameStatus.Ball.X += ballSpeed.X
	gameStatus.Ball.Y += ballSpeed.Y

	if gameStatus.Ball.X < ballRadius {
		gameStatus.Ball.X = ballRadius
		ballSpeed.X *= -1.0
	} else if gameStatus.Ball.X > width-ballRadius {
		gameStatus.Ball.X = width - ballRadius
		ballSpeed.X *= -1.0
	}

	if gameStatus.Ball.Y < ballRadius {
		gameStatus.Ball.Y = ballRadius
		ballSpeed.Y *= -1.0
	} else if gameStatus.Ball.Y > height-ballRadius {
		gameStatus.Ball.Y = height - ballRadius
		ballSpeed.Y *= -1.0
	}
}

func hitBall(player int) {
	x := gameStatus.Ball.X - gameStatus.Players[player].X
	y := gameStatus.Ball.Y - gameStatus.Players[player].Y
	distance := math.Sqrt(x*x + y*y)

	if distance < ballRadius+playerRadius {

		ballSpeed.X = speed * x / distance
		ballSpeed.Y = speed * y / distance
		moveBall()
	}
}

func checkPoint() bool {
	if gameStatus.Ball.Y >= goalTop && gameStatus.Ball.Y <= goalBottom {
		if gameStatus.Ball.X == ballRadius {
			gameStatus.Score++
			gameLogStd.Println("Point to player 2")
			return true
		} else if gameStatus.Ball.X == width-ballRadius {
			gameLogStd.Println("Point to player 1")
			gameStatus.Score += 256
			return true
		}
	}

	return false
}
