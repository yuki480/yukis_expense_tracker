"use client";

import { useState } from "react";

interface CategoryProps {
  name: string;
  email: string;
  onAddAmount: (category: string, amount: number, email: string) => void;
}

export default function Category({ name, email, onAddAmount }: CategoryProps) {
  const [inputAmount, setInputAmount] = useState(""); // default is no input

  const handleAdd = () => {
    const amount = parseFloat(inputAmount);
    onAddAmount(name, amount, email);
    setInputAmount(""); // clear input after adding
  };

  return (
    <div className="flex items-center gap-4 mb-2">
      <span className="text-[#707CD5] font-semibold w-32">{name}</span>
      <input
          type="number"
          placeholder="Amount"
          value={inputAmount}
          onChange={e => setInputAmount(e.target.value)}
          className="border p-2 rounded w-24"
      />
      <button 
      onClick={handleAdd} 
      className="bg-[#96C3ED] text-white px-4 py-2 rounded">
        Add
      </button>
    </div>
  );
}
