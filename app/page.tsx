import CategoryList from "@/components/CategoryList";

export default function Home() {
  return (
    <div className="bg-gray-600">
      <div><a href = "www.google.com" className="text-blue-200 hover:underline">This week's stats</a></div>
      <div><a href = "www.google.com" className="text-blue-200 hover:underline">This month's stats</a></div>
      <div className="min-h-screen flex items-center justify-center p-2 bg-gray-600">
        <CategoryList />
      </div>
    </div>
  );
}
