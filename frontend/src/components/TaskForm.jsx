import React, { useState } from "react";

export default function TaskForm({ onSave, initial = {}, onCancel }) {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Título obrigatório");
    onSave({ ...initial, title, description });
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição" />
      <button type="submit">Salvar</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
