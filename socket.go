package main

import (
	"log"
	"os"
	"strconv"
	"strings"

	"net/http"

	"github.com/gorilla/websocket"
)

var (
	socketLogStd = log.New(os.Stdout, "[socket] ", log.Ldate|log.Ltime)
	socketLogErr = log.New(os.Stderr, "ERROR [socket] ", log.Ldate|log.Ltime)

	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan GameStatus)

	upgrader = websocket.Upgrader{
		CheckOrigin: func(request *http.Request) bool {
			return true
		},
	}
)

func corsProtection(response http.ResponseWriter, request *http.Request) {
	if disableCors {
		response.Header().Set("Access-Control-Allow-Origin", request.Header.Get("Origin"))
		response.Header().Set("Access-Control-Allow-Credentials", "true")
	}
}

func handleConnections(response http.ResponseWriter, request *http.Request) {
	corsProtection(response, request)

	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(response, request, nil)
	if err != nil {
		socketLogErr.Fatal(err)
		return
	}

	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	player, err := strconv.Atoi(strings.TrimPrefix(request.URL.Path, socketPath))
	if err != nil {
		socketLogErr.Fatal(err)
		return
	}
	if player != 1 && player != 2 {
		socketLogErr.Println("invalid player:", player)
		return
	}

	player--
	socketLogStd.Println("New connection to", player, "from", request.RemoteAddr)
	clients[ws] = true

	for {
		var msg Position
		// Read in a new message as JSON and map it to a Message object
		err := ws.ReadJSON(&msg)
		if err != nil {
			socketLogErr.Printf("error: %v", err)
			delete(clients, ws)
			break
		}

		gameStatus.Players[player] = msg
		socketLogStd.Printf("Received: %v\n", msg)
	}
}

func handleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-broadcast
		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				socketLogErr.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}

			socketLogStd.Printf("Sent: %v\n", msg)
		}
	}
}
