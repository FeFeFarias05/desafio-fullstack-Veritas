import { useState, DragEvent } from "react";
import TaskCard from "./TaskCard/TaskCard";
import { updateTask, Task } from "../API/tasks";

type ColumnProps = {
  title: string;
  status: string;
  tasks?: Task[];
  reload: () => void;
  type?: string;
  openEdit: (task: Task) => void;
};

function Column({ title, status, tasks = [], reload, type, openEdit }: ColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const filteredTasks: Task[] = tasks.filter((task) => task.status === status);
  let color;

  if (type === "A Fazer") {
    color = "#b0acd6ff";
  } else if (type === "Em Progresso") {
    color = "#f3c18cff";
  } else if (type === "Concluídas") {
    color = "#8ad5a9ff";
  } else {
    color = "#ccc";
  }

 async function handleDrop(e: DragEvent<HTMLDivElement>) {
  e.preventDefault();
  setIsOver(false);

  const id = Number(e.dataTransfer.getData("text/plain"));
  if (!id) return;

  const dragged = tasks.find((t) => Number(t.id) === id);
  if (!dragged || dragged.status === status) return;

  try {
    await updateTask(dragged.id, { ...dragged, status });
    reload();
  } catch (error) {
    console.error("Erro ao mover tarefa:", error);
    alert("Não foi possível mover a tarefa.");
  }
}

function handleDragOver(e: DragEvent<HTMLDivElement>) {
  e.preventDefault();
}

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      style={{
        flex: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: isOver ? "#e6f7ff" : color,
        transition: "background-color 0.15s ease",
      }}
    >
      <h3 style={{ 
        fontFamily: "Arial, sans-serif",
        fontSize: "20px",
        fontWeight: "800",
        color: "#575755ff",
        margin: "0 0 10px 0" }}>
        {title}
      </h3>
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} reload={reload} openEdit={openEdit} />
      ))}
    </div>
  );
}

export default Column;
