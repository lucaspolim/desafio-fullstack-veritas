package main

import (
    "log"
    "net/http"
    "github.com/gorilla/handlers"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()

    r.HandleFunc("/tasks", getTasks).Methods("GET")
    r.HandleFunc("/tasks", createTask).Methods("POST")
    r.HandleFunc("/tasks", updateTask).Methods("PUT")
    r.HandleFunc("/tasks", deleteTask).Methods("DELETE")

    cors := handlers.CORS(
        handlers.AllowedOrigins([]string{"http://localhost:3000"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
        handlers.AllowedHeaders([]string{"Content-Type"}),
    )

    log.Println("Backend rodando em http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", cors(r)))
}
