"use client";

import { useState, useEffect } from "react";
import Category from "@/components/Category";
import TotalAmount from "@/components/TotalAmount";

const initialCategories = ["Food", "Transport", "Entertainment", "Shopping", "Other"];

export default function CategoryList() {
  const [categoryAmounts, setCategoryAmounts] = useState<{ name: string; amount: number }[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("categoryAmounts");
    if (storedData) {
      setCategoryAmounts(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categoryAmounts", JSON.stringify(categoryAmounts));
  }, [categoryAmounts]);

  const handleAddAmount = (category: string, amount: number) => {
    setCategoryAmounts((prev) => {
      const updatedCategories = prev.map((item) =>
        item.name === category ? { ...item, amount: item.amount + amount } : item
      );

      if (!prev.find((item) => item.name === category)) {
        updatedCategories.push({ name: category, amount });
      }

      return updatedCategories;
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow">
      <h2 className="text-xl mb-4">Daily Expense Tracker</h2>
      
      {initialCategories.map((category) => (
        <Category key={category} name={category} onAddAmount={handleAddAmount} />
      ))}

      <div className="mt-4">
        {categoryAmounts.map(({ name, amount }) => (
          <div key={name} className="flex justify-between p-2 border-gray-300">
            <span>{name}</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <TotalAmount categoryAmounts={categoryAmounts} />
    </div>
  );
}
