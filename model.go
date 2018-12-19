package main

type Position struct {
	X float64 `json:"x"`
	Y float64 `json:"y"`
}

type Speed struct {
	X float64
	Y float64
}

type GameStatus struct {
	Players []Position `json:"players"`
	Ball    Position   `json:"position"`
	Score   int        `json:"score"`
}
