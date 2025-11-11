# Mini Kanban (React + Go)

Backend: /backend
Frontend: /frontend

Rodar backend:
cd backend
go mod init kanban
go get github.com/gorilla/mux github.com/gorilla/handlers github.com/google/uuid
go run .

Rodar frontend:
cd frontend
npm install
npm start
