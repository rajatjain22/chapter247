"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchTodos, updateTodo, deleteTodo, Todo } from "@/store/todosSlice";

import TodoList from "@/components/admin/TodoList";
import Pagination from "@/components/Pagination";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

export default function TodoMain() {
  const dispatch = useDispatch<AppDispatch>();
  const { todosByPage, totalByPage, limit, loading } = useSelector((state: RootState) => state.todos);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState("");
  const [page, setPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);

  const [editLoading, setEditLoading] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [toggleLoading, setToggleLoading] = useState<number | null>(null);

  const todos = todosByPage[page] || [];
  const total = totalByPage[page] || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  // Fetch page data only if not cached
  useEffect(() => {
    if (!todosByPage[page]) {
      dispatch(fetchTodos({ page, limit }));
    }
  }, [dispatch, page, limit, todosByPage]);

  const handleEditSave = async () => {
    if (editingId === null || !editInput.trim()) return;
    const todo = todos.find(t => t.id === editingId);
    if (!todo) return;

    setEditLoading(editingId);
    try {
      await dispatch(updateTodo({ id: editingId, todo: editInput, completed: todo.completed })).unwrap();
      toast.success("Todo update successfully!")
      setEditingId(null);
      setEditInput("");
    } finally {
      setEditLoading(null);
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    setToggleLoading(todo.id);
    try {
      await dispatch(updateTodo({ ...todo, completed: !todo.completed })).unwrap();
      toast.success(todo.completed ? "Todo uncomplete task!" : "Todo compelete task!")
    } finally {
      setToggleLoading(null);
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteTodoId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteTodoId === null) return;
    setDeleteLoading(deleteTodoId);
    try {
      await dispatch(deleteTodo(deleteTodoId)).unwrap();
      toast.success("Todo delete successfully!")
      setShowDeleteModal(false);
      setDeleteTodoId(null);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Todos</h1>

        {loading && !todos.length ? (
          <p>Loading...</p>
        ) : (
          <TodoList
            todos={todos}
            editingId={editingId}
            editInput={editInput}
            onEditChange={setEditInput}
            onEditSave={handleEditSave}
            onCancelEdit={() => setEditingId(null)}
            onToggle={toggleCompleted}
            onDelete={openDeleteModal}
            editLoading={editLoading}
            toggleLoading={toggleLoading}
            deleteLoading={deleteLoading}
            setEditingId={setEditingId}
          />
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        title="Confirm Delete"
        message="Are you sure you want to delete this todo?"
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        actions={[
          { label: "Cancel", onClick: () => setShowDeleteModal(false) },
          { label: "Delete", onClick: confirmDelete, variant: "danger", loading: !!deleteLoading }
        ]}
      />
    </div>
  );
}
