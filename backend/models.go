package main

type Task struct {
    ID          string `json:"id"`
    Title       string `json:"title"`
    Description string `json:"description,omitempty"`
    Status      string `json:"status"` // "todo", "doing", "done"
}
