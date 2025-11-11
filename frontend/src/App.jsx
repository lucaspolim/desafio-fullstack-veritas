import React, { useEffect, useState } from "react";
import { fetchTasks, postTask, putTask, delTask } from "./api";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  function create(task) {
    postTask({ ...task, status: "todo" }).then(t => setTasks([...tasks, t]));
  }

  function save(task) {
    putTask(task.id, task).then(t => {
      setTasks(tasks.map(x => x.id === t.id ? t : x));
      setEdit(null);
    });
  }

  function remove(id) {
    delTask(id).then(() => setTasks(tasks.filter(x => x.id !== id)));
  }

  function move(id, status) {
    const task = tasks.find(x => x.id === id);
    save({...task, status});
  }

  return (
    <div className="app">
      <h1>Mini Kanban</h1>
      <button onClick={()=>setEdit({})}>Nova Tarefa</button>

      {edit && <TaskForm initial={edit} onSave={edit.id ? save : create} onCancel={()=>setEdit(null)} />}

      <div className="board">
        <Column title="A Fazer" status="todo" tasks={tasks.filter(t => t.status === "todo")} onDrop={move} onEdit={setEdit} onDelete={remove} />
        <Column title="Em Progresso" status="doing" tasks={tasks.filter(t => t.status === "doing")} onDrop={move} onEdit={setEdit} onDelete={remove} />
        <Column title="Concluídas" status="done" tasks={tasks.filter(t => t.status === "done")} onDrop={move} onEdit={setEdit} onDelete={remove} />
      </div>
    </div>
  );
}
