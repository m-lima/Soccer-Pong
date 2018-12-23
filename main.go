package main

import (
	"log"

	"net/http"
)

const (
	socketPath = "/socket/"
	resetPath  = "/reset/"
)

func main() {
	landing := http.FileServer(http.Dir("static"))
	http.Handle("/", landing)
	http.HandleFunc(socketPath, handleConnections)
	http.HandleFunc(
		resetPath,
		func(response http.ResponseWriter, request *http.Request) {
			resetGame()
			response.WriteHeader(http.StatusOK)
		},
	)

	prepareGame()

	log.Println("Listening on", host)
	http.ListenAndServe(host, nil)
}
