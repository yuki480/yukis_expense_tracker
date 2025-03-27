"use client";

import { useState, useEffect } from "react";
import Category from "@/components/Category";
import AddCategory from "@/components/AddCategory";

interface CategoryListProps {
  email: string;
}

export default function CategoryList({ email }: CategoryListProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/expenses?email=${email}`);
      const data = await res.json();
      setCategories(data.categories || []);
    };

    fetchCategories();
  }, [email]);

  const handleAddCategory = async (newCategory: string) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);

    // inserting a "dummy" expense with 0 amount
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategory, amount: 0, email }),
    });

    const res = await fetch(`/api/expenses?email=${email}`);
    const data = await res.json();
    setCategories(data.categories || []);
  };

  const handleAddAmount = async (category: string, amount: number, email: string) => {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, amount, email }),
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-blue-500 rounded-lg shadow bg-white">
      {categories.map((category) => (
        <Category key={category} name={category} email={email} onAddAmount={handleAddAmount} />
      ))}
      <AddCategory onAddCategory={handleAddCategory} />
    </div>
  );
}

