"use client";

import React from "react";
import Button from "./Button";

interface ModalProps {
  title: string;
  message?: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  actions: { label: string; onClick: () => void; variant?: "primary" | "danger" | "outline"; color?: string, loading?: boolean; }[];
}

const Modal: React.FC<ModalProps> = ({ title, message, isOpen, onClose, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        {message && <p className="mb-6 text-gray-700 dark:text-gray-300">{message}</p>}
        <div className="flex justify-end gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant || "outline"}
              loading={action.loading || false}
              style={action.color ? { backgroundColor: action.color } : {}}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
