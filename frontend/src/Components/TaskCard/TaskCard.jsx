import { deleteTask } from "/src/API/tasks.js";
import "./TaskCardIndex.css";

function TaskCard({ task, reload, openEdit }) {
  async function handleDelete() {
    await deleteTask(task.id);
    reload();
  }

  function onDragStart(e) {
    e.dataTransfer.setData("text/plain", String(task.id));
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <div className="task-card" draggable onDragStart={onDragStart}>
      <div className="task-header">
        <strong className="title">{task.title}</strong>
        {openEdit && (
          <button className="edit-button" onClick={() => openEdit(task)} aria-label="Editar" title="Editar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21v-3.75L14.06 6.19l3.75 3.75L6.75 21H3z" />
              <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>

        )}
      </div>

      <p className="description">{task.description}</p>

      <button className="trash-button" onClick={handleDelete} aria-label="Deletar" title="Deletar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18v2H3V6zm2 3h14l-1 12H6L5 9zm6-7h2v2h-2V2zM9 4h6v2H9V4z"/>
        </svg>
      </button>
    </div>
  );
}

export default TaskCard;
