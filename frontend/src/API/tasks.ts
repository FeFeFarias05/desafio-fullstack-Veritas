const API_BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const TASKS_URL = `${API_BASE}/tasks`;

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

export class APIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

async function handleResponse<T = any>(res: Response): Promise<T | null> {
  if (res.status === 204) return null; 

  const contentType = res.headers.get("content-type") || "";
  const hasJson = contentType.includes("application/json");

  if (!res.ok) {
    if (hasJson) {
      const payload = await res.json().catch(() => ({}));
      const msg = payload.erro || payload.error || payload.message || res.statusText || `HTTP ${res.status}`;
      throw new APIError(msg, res.status);
    }
    throw new APIError(res.statusText || `HTTP ${res.status}`, res.status);
  }

  if (hasJson) return res.json();
  return null;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${TASKS_URL}/`);
  return handleResponse<Task[]>(res) as Promise<Task[]>;
}
export async function createTask(task: Partial<Task>): Promise<Task> {
  const res = await fetch(`${TASKS_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return handleResponse<Task>(res) as Promise<Task>;
}

export async function updateTask(id: number | string, updatedTask: Partial<Task>): Promise<Task | null> {
  const res = await fetch(`${TASKS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return handleResponse<Task>(res);
}

export async function deleteTask(id: number | string): Promise<null> {
  const res = await fetch(`${TASKS_URL}/${id}`, { method: "DELETE" });
  return handleResponse<null>(res);
}
