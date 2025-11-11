import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ title, status, tasks, onDrop, onEdit, onDelete }) {
  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    onDrop(id, status);
  }

  return (
    <div className="column" onDragOver={(e)=>e.preventDefault()} onDrop={drop}>
      <h3>{title}</h3>
      {tasks.map(t => <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}
