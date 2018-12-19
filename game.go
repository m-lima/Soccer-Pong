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
	height     = 800.0
	goalTop    = height * 0.338
	goalBottom = height * 0.661

	speed = 10.0

	ballRadius     = 15.0
	ballDiameter   = 30.0
	playerRadius   = 20.0
	playerDiameter = 40.0
)

var (
	gameLogStd = log.New(os.Stdout, "[game] ", log.Ldate|log.Ltime)
	gameLogErr = log.New(os.Stderr, "ERROR [game] ", log.Ldate|log.Ltime)

	gameStatus = GameStatus{
		Players: make([]Position, 2),
		Ball:    Position{},
		Score:   0,
	}

	ballSpeed = Speed{}
)

func prepare() {
	rand.Seed(time.Now().UTC().UnixNano())

	gameStatus.Ball.X = width / 2.0
	gameStatus.Ball.Y = height / 2.0

	angle := rand.Float64()*math.Pi + math.Pi/4.0
	if angle > (math.Pi/2.0+math.Pi)/2.0 {
		angle += math.Pi / 2.0
	}

	ballSpeed.X = math.Sin(angle) * speed
	ballSpeed.Y = math.Cos(angle) * speed

	gameLogStd.Println("Speed", ballSpeed)

	broadcast <- gameStatus
}

func gameLoop() {
	prepare()

	for range time.Tick(32 * time.Millisecond) {
		player1 := Position{
			X: gameStatus.Players[0].X,
			Y: gameStatus.Players[0].Y,
		}

		player2 := Position{
			X: gameStatus.Players[1].X,
			Y: gameStatus.Players[1].Y,
		}

		ball := Position{
			X: gameStatus.Ball.X,
			Y: gameStatus.Ball.Y,
		}

		moveBall(&ball)
		hitBall(&ball, &player1)
		hitBall(&ball, &player2)
		if checkPoint(&ball) {
			return
		}

		gameStatus.Players[0] = player1
		gameStatus.Players[1] = player2
		gameStatus.Ball = ball

		broadcast <- gameStatus
	}
}

func moveBall(ball *Position) {
	ball.X += ballSpeed.X
	ball.Y += ballSpeed.Y

	if ball.X < ballRadius {
		ball.X = ballRadius
		ballSpeed.X *= -1.0
	} else if ball.X > width-ballRadius {
		ball.X = width - ballRadius
		ballSpeed.X *= -1.0
	}

	if ball.Y < ballRadius {
		ball.Y = ballRadius
		ballSpeed.Y *= -1.0
	} else if ball.Y > height-ballRadius {
		ball.Y = width - ballRadius
		ballSpeed.Y *= -1.0
	}
}

func hitBall(ball, player *Position) {
	x := ball.X - player.X
	y := ball.Y - player.Y
	distance := math.Sqrt(x*x + y*y)

	if distance < ballRadius+playerRadius {

		ballSpeed.X = speed * x / distance
		ballSpeed.Y = speed * y / distance
		moveBall(ball)
	}
}

func checkPoint(ball *Position) bool {
	if ball.Y >= goalTop && ball.Y <= goalBottom {
		if ball.X == ballRadius {
			gameStatus.Score++
			gameLogStd.Println("Point to player 1")
			return true
		} else if ball.X == width-ballRadius {
			gameLogStd.Println("Point to player 2")
			gameStatus.Score += 128
			return true
		}
	}

	return false
}
