import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export type Expense = {
  id: number;
  category: string;
  spendingdate: string;
  amount: number;
  email: string;
};

export async function loadExpensesDB(range: string, email: string) {
  let query = "SELECT category, SUM(amount) as amount FROM expenses GROUP BY category";

  if (range === "week") {
    query = "SELECT category, SUM(amount) as amount FROM expenses WHERE spendingdate >= NOW() - INTERVAL '7 days' AND email = $1 GROUP BY category";
  } else if (range === "month") {
    query = "SELECT category, SUM(amount) as amount FROM expenses WHERE spendingdate >= NOW() - INTERVAL '30 days' AND email = $1 GROUP BY category";
  } else if (range === "today") {
    query = "SELECT category, SUM(amount) as amount FROM expenses WHERE DATE(spendingdate) = CURRENT_DATE AND email = $1 GROUP BY category";
  }

  const expenses = await sql(query, email ? [email] : []) as Expense[];
  return expenses;
}

export async function createExpenseOnDB(category: string, amount: number, email: string) {
  await sql(`INSERT INTO expenses (category, amount, email) VALUES ($1, $2, $3)`, [category, amount, email]);
}

export async function loadCategoriesDB(email: string) {
  const categories = await sql("SELECT DISTINCT category FROM expenses WHERE email = $1", [email]);
  return categories.map((row: any) => row.category);
}

export async function createCategoryOnDB(category: string, email: string) {
  await sql("INSERT INTO categories (name, email) VALUES ($1, $2)", [category, email]);
}

