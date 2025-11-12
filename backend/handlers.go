package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)


func getTasks(w http.ResponseWriter, r *http.Request) {
	store.Lock()         
	defer store.Unlock() //evita deadlock

	tasks := make([]Task, 0, len(store.tasks))
	for _, task := range store.tasks {
		tasks = append(tasks, task)
	}

	respondJSON(w, http.StatusOK, tasks)
}


func createTask(w http.ResponseWriter, r *http.Request) {
	var task Task

	if decodeError := json.NewDecoder(r.Body).Decode(&task); decodeError != nil {
		respondError(w, http.StatusBadRequest, "Formato da requisição é inválido")
		return
	}

	if task.Title == "" {
		respondError(w, http.StatusBadRequest, "O título é obrigatório. Preencha o campo corretamente")
		return
	}

	store.Lock()
	defer store.Unlock()
	task.ID = store.nextID
	store.nextID++
	task.Status = statusToDo 
	store.tasks[task.ID] = task
	respondJSON(w, http.StatusCreated, task)
}


func updateTask(w http.ResponseWriter, r *http.Request) {

	id, decodeError := getIDFromPath(r.URL.Path)
	var updatedTask Task

	if decodeError != nil {
		respondError(w, http.StatusBadRequest, "ID da task inválido na URL")
		return 
	}

	if decodeError := json.NewDecoder(r.Body).Decode(&updatedTask); decodeError != nil {
		respondError(w, http.StatusBadRequest, "Formato da requisição é inválido")
		return
	}

	if !isValidStatus(updatedTask.Status) {
		respondError(w, http.StatusBadRequest, "Status da task inválido")
		return
	}

	if updatedTask.Title == "" {
		respondError(w, http.StatusBadRequest, "O título é obrigatório. Preencha o campo corretamente")
		return
	}

	store.Lock()
	defer store.Unlock()

	_, exists := store.tasks[id]
	if !exists {
		respondError(w, http.StatusNotFound, "Task não existe ou não encontrada")
		return
	}

	updatedTask.ID = id
	store.tasks[id] = updatedTask
	respondJSON(w, http.StatusOK, updatedTask)
}


func deleteTask(w http.ResponseWriter, r *http.Request) {
	id, decodeError := getIDFromPath(r.URL.Path)
	if decodeError != nil {
		respondError(w, http.StatusBadRequest, "ID da task inválido na URL")
		return
	}

	store.Lock()
	defer store.Unlock()

	_, exists := store.tasks[id]
	if !exists {
		respondError(w, http.StatusNotFound, "Task não existe ou não encontrada")
		return
	}

	delete(store.tasks, id)
	respondJSON(w, http.StatusNoContent, nil) 
}


func getIDFromPath(path string) (int, error) {
	path = strings.TrimSuffix(path, "/")
	parts := strings.Split(path, "/")
	idStr := parts[len(parts)-1]
	return strconv.Atoi(idStr)
}


func isValidStatus(status string) bool {
	switch status {
	case statusToDo, statusInProgress, statusDone:
		return true
	default:
		return false
	}
}

func respondError(w http.ResponseWriter, code int, message string) {
	respondJSON(w, code, map[string]string{"error": message})
}

func respondJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if payload != nil {
		json.NewEncoder(w).Encode(payload)
	}
}


func tasksHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getTasks(w, r)
	case http.MethodPost:
		createTask(w, r)
	case http.MethodPut:
		updateTask(w, r)
	case http.MethodDelete:
		deleteTask(w, r)
	default:
		respondError(w, http.StatusMethodNotAllowed, "Operação não suportada")
	}
}