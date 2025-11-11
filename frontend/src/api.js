const API = "http://localhost:8080";

export async function fetchTasks() {
  return (await fetch(`${API}/tasks`)).json();
}

export async function postTask(task) {
  return (await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(task)
  })).json();
}

export async function putTask(id, task) {
  return (await fetch(`${API}/tasks?id=${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(task)
  })).json();
}

export async function delTask(id) {
  await fetch(`${API}/tasks?id=${id}`, { method: "DELETE" });
}
