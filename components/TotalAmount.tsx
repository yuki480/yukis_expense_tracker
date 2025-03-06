"use client";

interface TotalAmountProps {
  categoryAmounts: { name: string; amount: number }[];
}

export default function TotalAmount({ categoryAmounts }: TotalAmountProps) {
  const total = categoryAmounts.reduce((sum, category) => sum + category.amount, 0);

  return (
    <div className="mt-4 p-3 text-lg font-bold bg-black-100">
      Total: ${total.toFixed(2)}
    </div>
  );
}

// npm i @neondatabase/serverless --legacy--peer-deps
// npm i @neondatabase/serverless 