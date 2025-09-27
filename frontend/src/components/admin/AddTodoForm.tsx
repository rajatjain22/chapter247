"use client";

import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (value: string) => void;
  loading: boolean;
}

export default function AddTodoForm({ onAdd, loading }: AddTodoFormProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex gap-2 mb-8">
      <Input
        name="addTodo"
        id="addTodo"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button className="!w-22" onClick={handleAdd} loading={loading}>Add</Button>
    </div>
  );
}
