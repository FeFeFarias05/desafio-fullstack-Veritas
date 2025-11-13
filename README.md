# Desafio Fullstack — Mini Kanban de Tarefas

Sistema de gerenciamento de tarefas no estilo Kanban, desenvolvido com Go no backend e React no frontend.

---

## Tecnologias Utilizadas

### Backend
- **[Go (Golang)](https://go.dev/)** - Linguagem de programação
- **net/http** - Servidor HTTP nativo
- **CORS** - Habilitado para comunicação com frontend
- **Persistência** - Arquivo JSON (`tasks.json`)
- **Concorrência** - Mutex para gerenciamento seguro de dados

### Frontend
- **[React](https://react.dev/)** - Biblioteca para interfaces
- **[Vite](https://vitejs.dev/)** - Build tool e dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **CSS Modularizado** - Estilização componentizada
- **Fetch API** - Comunicação com backend

### Infraestrutura
- **Docker & Docker Compose** - Containerização
- **Nginx** - Servidor web e proxy reverso

---

## Como Rodar o Projeto

### � **Opção 1: Com Docker (Recomendado)**

#### Pré-requisitos
- Docker instalado
- Docker Compose instalado

#### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/FeFeFarias05/desafio-fullstack-Veritas.git
cd desafio-fullstack-Veritas
```

2. **Abra o Launch Docker**

3. **Suba os containers**
```bash
docker compose up -d
```

4. **Acesse a aplicação**
- Frontend: **http://localhost:5173**
- Backend API: **http://localhost:8080**

#### Comandos úteis
```bash
# Parar os containers
docker compose down

# Ver logs em tempo real
docker compose logs -f

# Reconstruir após mudanças no código
docker compose up --build -d

# Ver status dos containers
docker compose ps
```

---

### 🔧 **Opção 2: Desenvolvimento Local (Sem Docker)**

#### Pré-requisitos
- Go 1.24+ instalado
- Node.js 20+ instalado
- npm ou yarn

#### Backend

1. Entre na pasta do backend
```bash
cd backend
```

2. Instale as dependências
```bash
go mod tidy
```

3. Execute o servidor
```bash
go run .
```

O backend estará disponível em: **http://localhost:8080**

**Endpoints disponíveis:**
- `GET /tasks/` - Lista todas as tarefas
- `POST /tasks/` - Cria nova tarefa
- `PUT /tasks/:id` - Atualiza tarefa existente
- `DELETE /tasks/:id` - Deleta tarefa
- `GET /health` - Health check

#### Frontend

1. Em outro terminal, entre na pasta do frontend
```bash
cd frontend
```

2. Instale as dependências
```bash
npm install
```

3. Execute o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

---

## Funcionalidades

- Criar tarefas com título e descrição
- Editar tarefas existentes
- Deletar tarefas
- Arrastar e soltar tarefas entre colunas (Drag & Drop)
- Três status: "A Fazer", "Em Progresso" e "Concluídas"
- Persistência em arquivo JSON
- Interface responsiva

---

## Decisões Técnicas

### Backend (Go)

**Por que Go?**
- Performance superior e baixo consumo de memória
- Concorrência nativa com goroutines
- Compilação estática facilita deploy
- Biblioteca padrão robusta para HTTP

**Arquitetura:**
- **Separação de responsabilidades**: `main.go`, `handlers.go`, `models.go`, `storage.go`
- **Mutex para concorrência**: Garante thread-safety nas operações CRUD
- **Persistência em JSON**: Solução simples e eficaz para o escopo do desafio
- **CORS habilitado**: Permite comunicação cross-origin com frontend

**Estrutura de arquivos:**
```
backend/
├── main.go       # Configuração do servidor e rotas
├── handlers.go   # Handlers HTTP (CRUD)
├── models.go     # Modelos de dados e constantes
├── storage.go    # Persistência em arquivo JSON
└── tasks.json    # Armazenamento das tarefas
```

### Frontend (React + TypeScript)

**Por que React + TypeScript?**
- Componentização reutilizável
- Tipagem estática previne erros
- Vite oferece HMR rápido e build otimizado
- Ecossistema maduro e bem documentado

**Arquitetura:**
- **Componentes isolados**: Cada componente tem sua responsabilidade única
- **API Client centralizado**: Arquivo `tasks.ts` gerencia todas as requisições
- **Estados locais**: useState para gerenciamento simples
- **Drag & Drop nativo**: Usando eventos HTML5 (sem bibliotecas externas)

**Estrutura de arquivos:**
```
frontend/src/
├── main.jsx           # Ponto de entrada
├── API/
│   └── tasks.ts       # Cliente HTTP para backend
├── Components/
│   ├── Column.tsx     # Coluna do Kanban
│   └── TaskCard/      # Card de tarefa
├── Pages/
│   ├── Board/         # Quadro principal
│   └── AddTask/       # Modal de criar/editar
└── assets/
    └── colors.css     # Variáveis de cores
```

### Docker & Infraestrutura

**Multi-stage builds:**
- Reduz tamanho final das imagens
- Separa dependências de build do runtime

**Nginx como proxy reverso:**
- Resolve problema de CORS em produção
- Serve arquivos estáticos do React
- Roteia `/api/*` para o backend Go
- Permite deploy em uma única porta (5173)

**Docker Compose:**
- Orquestra backend + frontend
- Network isolada entre containers
- Volume para persistir `tasks.json`
- Restart automático em caso de falha

---

## Limitações Conhecidas

### Persistência
- Dados armazenados apenas em arquivo JSON
- Não há backup automático
- Concorrência limitada (lock global)

### Autenticação
- Sem sistema de login/autenticação
- Todas as tarefas são públicas

### Funcionalidades
- Sem suporte a múltiplos usuários
- Sem histórico de alterações
- Sem filtros ou busca
- Sem paginação (pode ficar lento com muitas tarefas)

### Testes
- Sem testes unitários
- Sem testes de integração

---

## Melhorias Futuras

- Adicionar testes unitários e de integração
- Implementar tratamento de erros mais robusto
- Adicionar loading states no frontend
- Validação de formulários mais completa
- Confirmação antes de deletar tarefas
- Migrar para banco de dados relacional (PostgreSQL)
- Utilizar bibliotecas para o frontend

---

## Estrutura do Projeto

```
desafio-fullstack-Veritas/
├── backend/
│   ├── Dockerfile
│   ├── go.mod
│   ├── main.go
│   ├── handlers.go
│   ├── models.go
│   ├── storage.go
│   └── tasks.json
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── src/
│       ├── main.jsx
│       ├── API/
│       ├── Components/
│       ├── Pages/
│       └── assets/
├── docs/
│   ├── README.md
│   ├── user-flow.md (diagrama obrigatório)
│   └── data-flow.md (diagrama opcional)
├── docker-compose.yml
└── README.md
```

## 📊 Diagramas

A documentação visual do sistema está disponível na pasta **`/docs`**:

- **User Flow** - Fluxo de interação do usuário com o sistema
- **Data Flow** - Arquitetura e fluxo de dados entre componentes



