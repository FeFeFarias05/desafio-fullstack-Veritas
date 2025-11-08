package main

import "sync"

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Status      string `json:"status"`
}

var store = struct { 
	sync.Mutex
	tasks  map[int]Task
	nextID int
}{
	tasks:  make(map[int]Task),
	nextID: 1,
}

const (
	statusToDo       = "toDo"
	statusInProgress = "inProgress"
	statusDone       = "done"
)
