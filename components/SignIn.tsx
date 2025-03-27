"use client";

import { signIn } from "next-auth/react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-blue-100 py-20 flex flex-col items-center text-center relative">
      <h1 className="text-3xl font-bold text-blue-800 my-6">
        welcome to my expense tracking site !
      </h1>

      <h1 className="text-3xl font-bold text-blue-800 my-6 mb-3">
        click below to get started 😺💰
      </h1>

      <ArrowDown className="text-blue-800 my-4 mb-8" size={40} />

      <button
        onClick={async () => {
          await signIn("google", { callbackUrl: "/" });
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        sign in with google
      </button>

      <Image
        src="/peanut.PNG"
        alt="peanut"
        width={300} 
        height={300} 
        className="absolute bottom-4 left-4"
      />

      <p className="absolute bottom-4 right-4 text-blue-800 text-sm font-semibold">
        made by yuki ❤️
      </p>
    </div>
  );
}
