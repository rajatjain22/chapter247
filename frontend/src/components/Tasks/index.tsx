"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Add or update task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingTask) {
      // Update task
      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id ? { ...t, title, description } : t
        )
      );
      setEditingTask(null);
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now(),
        title,
        description,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <h2
                className={`font-semibold ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </h2>
              <p className={task.completed ? "line-through text-gray-400" : ""}>
                {task.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(task.id)}
                className={`px-2 py-1 rounded text-white ${
                  task.completed ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleEdit(task)}
                className="px-2 py-1 rounded bg-blue-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="px-2 py-1 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Tasks;
