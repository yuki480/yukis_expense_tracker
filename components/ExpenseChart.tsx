"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ExpenseChartProps {
  range: "today" | "week" | "month";
  email: string;
}

export default function ExpenseChart({ range, email }: ExpenseChartProps) {
  const [data, setData] = useState<{ category: string; amount: number }[]>([]);

  useEffect(() => {
    async function fetchExpenses() {
      const response = await fetch(`/api/expenses?range=${range}&email=${email}`);
      const { expenses } = await response.json();

      const filteredExpenses = expenses.filter((expense: { amount: number }) => expense.amount > 0);
      setData(filteredExpenses);
    }
    fetchExpenses();
  }, [range, email]);

  const totalAmount = data.reduce((sum, expense) => sum + Number(expense.amount), 0);

  return (
    <div className="w-full text-blue-500 max-w-4xl p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={900} 
          height={500} 
          data={data}
          margin={{ top: 20, right: 50, left: 50, bottom: 80 }}
        >
          <XAxis dataKey="category" interval={0} angle={-30} textAnchor="end" stroke="#1E429F" tick={{ fill: "#1E429F" }} /> 
          <YAxis tick={false} stroke="#1E429F" />
          <Tooltip />
          <Bar dataKey="amount" fill="#2196F3" />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-6 text-xl font-semibold text-blue-800">
        a total of <span className="font-bold text-red-600 text-2xl">${totalAmount.toFixed(2)}</span> !
      </p>
    </div>
  );
}

