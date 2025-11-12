import { useEffect, useState } from "react";
import Column from "../../Components/Column";
import AddTask from "../AddTask/AddTask";
import { Task, createTask, getTasks, updateTask } from "../../API/tasks";
import "./BoardIndex.css";

function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error: any) {
      console.error("Erro ao carregar tasks:", error);
      alert('Erro ao carregar tasks: ' + (error?.message || error));

    }
  }

  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  function handleAddTask() {
    setEditTask(null);
    setShowAddModal(true);
  }

  function openEditTask(task: Task) {
    setEditTask(task);
    setShowAddModal(true);
  }

  async function handleCreateTask(payload: { title: string; description?: string }) {
    try {
      await createTask({ title: payload.title, description: payload.description, status: 'toDo' });
      await loadTasks();
      setShowAddModal(false);
    } catch (error: any) {
      console.error('Erro ao criar task:', error);
      alert('Erro ao criar task: ' + (error?.message || error));
    }
  }

  async function handleUpdateTask(payload: { title: string; description?: string }) {
    if (!editTask) return;
    try {
      await updateTask(editTask.id, { ...editTask, title: payload.title, description: payload.description });
      await loadTasks();
      setShowAddModal(false);
      setEditTask(null);
    } catch (error: any) {
      console.error('Erro ao editar task:', error);
      alert('Erro ao editar task: ' + (error?.message || error));
    }
  }

  return (
    <div>
      <h1 className="titleVeritas"> Kanban de Veritas Consultoria Empresarial</h1>

      <button className="button-addTask" onClick={handleAddTask}>+ Adicionar Tarefa</button>

      {showAddModal && (
        <>
          <div className="modalBackground" onClick={() => setShowAddModal(false)} />
          <div className="modal">
            <AddTask
              onClose={() => { setShowAddModal(false); setEditTask(null); }}
              onSubmit={editTask ? handleUpdateTask : handleCreateTask}
              initialTitle={editTask?.title}
              initialDescription={editTask?.description}
              submitLabel={editTask ? "Editar" : "Adicionar"}
            />
          </div>
        </>
      )}

      <div className="columns">
  <Column title="A Fazer" status="toDo" tasks={tasks} reload={loadTasks} type="A Fazer" openEdit={openEditTask} />
  <Column title="Em Progresso" status="inProgress" tasks={tasks} reload={loadTasks} type="Em Progresso" openEdit={openEditTask} />
  <Column title="Concluídas" status="done" tasks={tasks} reload={loadTasks} type="Concluídas" openEdit={openEditTask} />
      </div>
    </div>
  );
}

export default Board;
