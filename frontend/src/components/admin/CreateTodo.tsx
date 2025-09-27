"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addTodo } from "@/store/todosSlice";
import AddTodoForm from "@/components/admin/AddTodoForm";
import toast from "react-hot-toast";

export default function CreateTodo() {
    const dispatch = useDispatch<AppDispatch>();
    const [addLoading, setAddLoading] = useState(false);

    const handleAdd = async (value: string) => {
        setAddLoading(true);
        try {
            await dispatch(addTodo(value)).unwrap();
            toast.success("Todo added successfully!");
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Create Todo</h1>
                <AddTodoForm onAdd={handleAdd} loading={addLoading} />
            </div>
        </div>
    );
}
