'use client';

import { useSearchParams } from "next/navigation";
import ExpenseChart from "../../components/ExpenseChart";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

function TodayStatsContent({ email }: { email: string }) {
  return (
    <div className="min-h-screen bg-blue-100">
      <Sidebar />
      <div className="grid h-screen items-center justify-items-center min-w-[600px] overflow-auto min-h-screen text-gray-800 p-6">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          today, you spent...
        </h1>
        <ExpenseChart range="today" email={email} />
        <Link href="/" className="text-blue-500 hover:underline">
          back to home
        </Link>
      </div>
    </div>
  );
}

function TodayStatsWrapper() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    return <div className="text-center p-4">Error: No email provided</div>;
  }

  return <TodayStatsContent email={email} />;
}

export default function MonthStats() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodayStatsWrapper />
    </Suspense>
  );
}