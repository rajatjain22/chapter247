"use client";

import TodoItem from "./TodoItem";
import { Todo } from "@/store/todosSlice";

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  editInput: string;
  onEditChange: (value: string) => void;
  onEditSave: () => void;
  onCancelEdit: () => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
  editLoading: number | null;
  toggleLoading: number | null;
  deleteLoading: number | null;
  setEditingId: (id: number | null) => void;
}

export default function TodoList(props: TodoListProps) {
  return (
    <ul className="space-y-4">
      {props.todos.map(todo => (
        <TodoItem key={todo.id} {...props} todo={todo} />
      ))}
    </ul>
  );
}
