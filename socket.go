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

	clients = make(map[*websocket.Conn]bool)
	// broadcast = make(chan GameStatus)

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
		socketLogErr.Printf("upgrade error: %v", err)
		return
	}

	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	channel, err := strconv.Atoi(strings.TrimPrefix(request.URL.Path, socketPath))
	if err != nil {
		socketLogErr.Printf("connection error: %v", err)
		return
	}
	if channel < 0 || channel > 2 {
		socketLogErr.Println("invalid channel:", channel)
		return
	}

	socketLogStd.Println(
		"New connection to channel",
		channel,
		"from",
		request.RemoteAddr,
	)

	clients[ws] = true

	channel--
	for {
		var msg Position
		err := ws.ReadJSON(&msg)
		if err != nil {
			socketLogErr.Printf("read error: %v", err)
			ws.Close()
			delete(clients, ws)
			return
		}

		if msg.X == -123 {
			if msg.Y == -1 {
				startGame()
				continue
			} else if msg.Y == -2 {
				resetGame()
				continue
			}
		}

		if channel != -1 {
			// socketLogStd.Printf("Received %+v\n", msg)
			gameStatus.Crosshairs[channel] = msg
		}
	}
}

func sendStatus() {
	// Send it out to every client that is currently connected
	for client := range clients {
		// socketLogStd.Printf("Sending %+v\n", msg)
		err := client.WriteJSON(gameStatus)
		if err != nil {
			socketLogErr.Printf("write error: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}
