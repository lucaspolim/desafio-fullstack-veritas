import React from "react";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card" draggable onDragStart={(e)=> e.dataTransfer.setData("id", task.id)}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <button onClick={()=>onEdit(task)}>Editar</button>
      <button onClick={()=>onDelete(task.id)}>Excluir</button>
    </div>
  );
}
