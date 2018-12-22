package main

import (
	"log"

	"net/http"
)

func main() {
	landing := http.FileServer(http.Dir("static"))
	http.Handle("/", landing)

	http.HandleFunc(socketPath, handleConnections)

	prepareGame()

	log.Println("Listening on", host)
	http.ListenAndServe(host, nil)
}
