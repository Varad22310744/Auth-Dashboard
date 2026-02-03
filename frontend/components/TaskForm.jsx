'use client';
import { useState } from 'react';

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    onCreate({ title });
    setTitle('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4">Add</button>
    </form>
  );
}
