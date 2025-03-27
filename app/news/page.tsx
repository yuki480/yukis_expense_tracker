"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

export default function NewsPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        
        if (data?.articles && data.articles.length > 0) {
          setArticle(data.articles[0]); // set the first article
        } else {
          setError("No articles found.");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("An error occurred while fetching the news.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
        <Sidebar />
        <div className="min-h-screen bg-blue-100 p-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-blue-800 text-center mb-4">article of the day 📰</h1>
            <div className="w-full max-w-lg p-6 shadow-lg rounded-lg bg-white" >
            
            {loading && <p className="text-center">Loading news...</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
            
            {article && (
            <div className="flex flex-col items-center w-full">
                {article.urlToImage && (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center mb-4">
                    <Image
                    src={article.urlToImage || "/peanut.PNG"} // peanut as fallback image
                    alt="News"
                    width={500} 
                    height={300} 
                    loader={({ src }) => src}
                    className="w-full h-full object-cover rounded-lg"/>
                </div>
                )}
                <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">{article.title}</h2>
                <p className="text-center text-gray-700 mb-4">{article.description}</p>
                <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
                >
                Read more
                </a>
            </div>
            )}
            </div>
        </div>
        </div>
    </div>
  );
}
