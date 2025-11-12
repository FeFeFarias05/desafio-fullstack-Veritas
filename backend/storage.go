package main

import (
	"encoding/json"
	"fmt"
	"os"
)

const tasksFile = "tasks.json"

func saveTasksToFile() error {

	data, error := json.MarshalIndent(store.tasks, "", "  ")
	if error != nil {
		return fmt.Errorf("erro ao converter tasks em JSON: %v", error)
	}

	error = os.WriteFile(tasksFile, data, 0644)
	if error != nil {
		return fmt.Errorf("erro ao salvar o arquivo %s: %v", tasksFile, error)
	}

	return nil
}

func loadTasksFromFile() error {
	if _, error := os.Stat(tasksFile); os.IsNotExist(error) {
		return nil 
	}

	data, error := os.ReadFile(tasksFile)
	if error != nil {
		return fmt.Errorf("erro ao ler o arquivo %s: %v", tasksFile, error)
	}

	store.Lock()
	defer store.Unlock()

	error = json.Unmarshal(data, &store.tasks)
	if error != nil {
		return fmt.Errorf("erro ao converter JSON para map: %v", error)
	}

	maxID := 0
	for id := range store.tasks {
		if id > maxID {
			maxID = id
		}
	}
	store.nextID = maxID + 1

	return nil
}
