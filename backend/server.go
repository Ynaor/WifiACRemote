// implement the backend of the application:

// manage the web server: check for login, redirect to login page, etc.
// recieve and process requests from the client to the irController
// send responses to the client

// the irController is a separate module that handles the IR commands
// and the IR hardware
package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// server http server: port 80 - serve the web pages (login first)

// irController: port 8080 - handle the IR commands

// the web pages will be served from the /web directory

func main() {
	// handle ctrl-c
	go handleCtrlC()

	// start the web server
	go startWebServer()

	// start the irController
	go startIrController()

	// wait forever
	for {
		time.Sleep(1 * time.Second)
	}
}

func handleCtrlC() {
	// handle ctrl-c
	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGINT)
	<-sig
	fmt.Println("ctrl-c")
	os.Exit(0)
}

func startWebServer() {
	// start the web server
	fmt.Println("starting web server")
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("web/login.html", handleLogin)
	http.HandleFunc("/controller.html", handleLogout)
	http.HandleFunc("/ir", handleIr)

	err := http.ListenAndServe(":80", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

}

func startIrController() {
	// start the irController
	fmt.Println("starting ir controller")
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	// handle the root request
	fmt.Println("handleRoot")
	http.Redirect(w, r, "/login", http.StatusFound)
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	// handle the login request
	fmt.Println("handleLogin")
	t, err := template.ParseFiles("web/login.html")
	if err != nil {
		log.Fatal("ParseFiles: ", err)
	}
	t.Execute(w, nil)
}

func handleLogout(w http.ResponseWriter, r *http.Request) {
	// handle the logout request
	fmt.Println("handleLogout")
}

func handleIr(w http.ResponseWriter, r *http.Request) {
	// handle the ir request
	fmt.Println("handleIr")
}
