"use client";

import { useState } from "react";

interface AddCategoryProps {
  onAddCategory: (newCategory: string) => void;
}

export default function AddCategory({ onAddCategory }: AddCategoryProps) {
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-3">
      {isAdding ? (
        <div className="flex space-x-2">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-[#74A9E7] text-white opacity-75 px-3 py-2 rounded"
          >
            Add
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="bg-gray-300 text-white px-3 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 text-[#7E8ADE] hover:underline"
        >
          + Add Category
        </button>
      )}
    </div>
  );
}
