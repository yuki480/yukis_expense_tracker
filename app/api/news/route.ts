import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.NEWS_API_KEY!;
  const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
