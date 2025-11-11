package main

import (
    "encoding/json"
    "net/http"
    "github.com/google/uuid"
)

var tasks = make(map[string]Task)

func getTasks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    list := []Task{}
    for _, t := range tasks {
        list = append(list, t)
    }
    json.NewEncoder(w).Encode(list)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var t Task
    if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
        http.Error(w, "invalid payload", http.StatusBadRequest)
        return
    }
    if t.Title == "" {
        http.Error(w, "title required", http.StatusBadRequest)
        return
    }
    if t.Status == "" {
        t.Status = "todo"
    }
    t.ID = uuid.New().String()
    tasks[t.ID] = t
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(t)
}

func updateTask(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "id required", http.StatusBadRequest)
        return
    }
    var t Task
    if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
        http.Error(w, "invalid payload", http.StatusBadRequest)
        return
    }
    existing, ok := tasks[id]
    if !ok {
        http.Error(w, "not found", http.StatusNotFound)
        return
    }
    existing.Title = t.Title
    existing.Description = t.Description
    existing.Status = t.Status
    tasks[id] = existing
    json.NewEncoder(w).Encode(existing)
}

func deleteTask(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Query().Get("id")
    if id == "" {
        http.Error(w, "id required", http.StatusBadRequest)
        return
    }
    delete(tasks, id)
    w.WriteHeader(http.StatusNoContent)
}
