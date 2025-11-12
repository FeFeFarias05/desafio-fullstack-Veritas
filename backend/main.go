package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

	mux := http.NewServeMux()

	mux.HandleFunc("/tasks/", tasksHandler) 

	if error := loadTasksFromFile(); error != nil {
		log.Printf("Erro ao carregar as tasks: %v\n", error)
	}

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) { 
		respondJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	corsHandler := enableCORS(mux)
	port := "8080"
	fmt.Printf("Servidor em execução na porta %s\n", port)
	if error := http.ListenAndServe(":"+port, corsHandler); error != nil {
		log.Fatalf("Erro ao iniciar o servidor: %s\n", error)
	}
}
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
