package main

import (
	"log"

	"net/http"
)

const (
	disableCors = true
	socketPath  = "/socket/"
)

func main() {
	landing := http.FileServer(http.Dir("static"))
	http.Handle("/", landing)

	http.HandleFunc(socketPath, handleConnections)

	go handleMessages()
	prepareGame()

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
