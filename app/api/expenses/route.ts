import { NextRequest, NextResponse } from "next/server";
import { createExpenseOnDB, loadExpensesDB, loadCategoriesDB } from "@/lib/database";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const range = req.nextUrl.searchParams.get("range");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  if (range) {
    const expenses = await loadExpensesDB(range, email);
    return NextResponse.json({ expenses }, { status: 200 });
  }

  const categories = await loadCategoriesDB(email);
  return NextResponse.json({ categories }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { category, amount, email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  await createExpenseOnDB(category, amount, email);
  return NextResponse.json({ message: "Category added successfully" }, { status: 200 });
}


