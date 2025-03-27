"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import CategoryList from "@/components/CategoryList";
import SignIn from "@/components/SignIn";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return <SignIn />;
  }

  const user = session.user
  if (!user) {
    return "error, not signed in";
  }
  const email = user.email!;

  return (
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl p-6">
          <h1 className="text-center text-[22px] font-semibold text-blue-800 my-3">hi {session.user?.name} 👋</h1>

          <h1 className="text-center text-[22px] font-semibold text-blue-800 my-3">
            add your expenses here !
          </h1>

          <div className="flex justify-center w-full py-6">
            <CategoryList email={email}/>
          </div>

        </div>
      </main>
    </div>
  );
}
