"use client";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/Button";
import { Todo } from "@/store/todosSlice";

interface TodoItemProps {
  todo: Todo;
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

export default function TodoItem({
  todo,
  editingId,
  editInput,
  onEditChange,
  onEditSave,
  onCancelEdit,
  onToggle,
  onDelete,
  editLoading,
  toggleLoading,
  deleteLoading,
  setEditingId,
}: TodoItemProps) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 gap-2 sm:gap-0">
      {editingId === todo.id ? (
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-2">
          <Input
            name="editTask"
            id="editTask"
            value={editInput}
            onChange={(e) => onEditChange(e.target.value)}
            className="flex-1 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
          />
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={onEditSave}
              loading={editLoading === todo.id}
              className="w-full sm:w-auto"
            >
              Save
            </Button>
            <Button
              onClick={onCancelEdit}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <span
            className={`${
              todo.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-900 dark:text-gray-100"
            } flex-1 break-words`}
          >
            {todo.todo}
          </span>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <Button
              onClick={() => onToggle(todo)}
              loading={toggleLoading === todo.id}
              className={`w-full sm:w-auto ${
                todo.completed ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {todo.completed ? "Undo" : "Completed"}
            </Button>
            <Button
              onClick={() => {
                setEditingId(todo.id);
                onEditChange(todo.todo);
              }}
              variant="success"
              className="w-full sm:w-auto"
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(todo.id)}
              loading={deleteLoading === todo.id}
              variant="danger"
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
}
