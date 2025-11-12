🗂️ Desafio Fullstack — Mini Kanban de Tarefas  

---

## 🚀 Tecnologias Utilizadas

### Backend
- [Go (Golang)](https://go.dev/)
- Servidor HTTP nativo (`net/http`)
- CORS habilitado
- Armazenamento em memória (com `map` + `Mutex`)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS modularizado
- Fetch API para comunicação com o backend

---

## 🧩 Como Rodar o Projeto

### 🖥️ **1. Clonar o repositório**

```bash
git clone https://github.com/<seu-usuario>/desafio-fullstack-veritas.git
cd desafio-fullstack-veritas
```

---

### 🧠 **2. Rodar o Backend (Go)**

Entre na pasta `backend`:

```bash
cd backend
go run .
```

O servidor será iniciado em:  
👉 **http://localhost:8080**

Endpoints disponíveis:
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

---

### 💻 **3. Rodar o Frontend (React + Vite)**

Em outro terminal, entre na pasta `frontend`:

```bash
cd frontend
npm install
npm run dev
```

O app estará disponível em:  
👉 **http://localhost:5173**

---

## 🧠 Fluxo de uso

1. Acesse o frontend pelo navegador  
2. Adicione novas tarefas informando título e descrição  
3. Mova entre colunas (drag and drop)  
4. Edite ou exclua tarefas  
5. Os dados são persistidos temporariamente em memória pelo backend

---

## 👩‍💻 Autoria

Desenvolvido por **Fernanda Farias Uberti**  
Desafio técnico — Veritas Consultoria Empresarial  
