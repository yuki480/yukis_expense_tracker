"use client";

import { useState } from "react";

interface CategoryProps {
  name: string;
  onAddAmount: (category: string, amount: number) => void;
}

export default function Category({ name, onAddAmount }: CategoryProps) {
  const [inputAmount, setInputAmount] = useState(""); // default is no input

  const handleAdd = () => {
    const amount = parseFloat(inputAmount);
    if (amount > 0) {
      onAddAmount(name, amount);
      setInputAmount(""); // clear input after adding
    }
  };

  return (
    <div className="flex items-center gap-4 mb-2">
      <span className="w-32">{name}</span>
      <input
        type="number"
        placeholder="Amount"
        value={inputAmount}
        onChange={(e) => setInputAmount(e.target.value)}
        className="opacity-100 text-black border-gray-300 p-2"
      />
      <button 
      onClick={handleAdd} 
      className="text-white text-xl bg-sky-500 hover:bg-sky-600 active:bg-sky-800 enabled:hover:scale-105 enabled:active:scale-95 disabled:bg-slate-600">
        Add
      </button>
    </div>
  );
}
