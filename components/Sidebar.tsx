import { useSession } from "next-auth/react";
import { useState } from "react";
import { X, Menu, ChevronDown, ChevronUp } from "lucide-react"; 
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  if (!session) return null;

  const email = session.user?.email!;

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#7E8ADE] text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#96C3ED] text-white p-6 flex flex-col transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="pt-8"></h2>
        <ul className="mt-4 space-y-2 flex-1">
          <li>
            <Link href="/" className="block p-2 hover:bg-blue-400 rounded">
              Home
            </Link>
          </li>

          <li>
            <button
              className="w-full text-left p-2 hover:bg-blue-400 rounded flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Track My Spendings
              {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isDropdownOpen && (
              <ul className="pl-4 mt-2 space-y-1">
                <li>
                  <Link
                    href={`/today?email=${encodeURIComponent(email)}`}
                    className="block p-2 hover:bg-blue-400 rounded"
                  >
                    Today
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/week?email=${encodeURIComponent(email)}`}
                    className="block p-2 hover:bg-blue-400 rounded"
                  >
                    This Week
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/month?email=${encodeURIComponent(email)}`}
                    className="block p-2 hover:bg-blue-400 rounded"
                  >
                    This Month
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/news" className="block p-2 hover:bg-blue-400 rounded">
              Financial News
            </Link>
          </li>
        </ul>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-[#7E8ADE] text-white rounded-md"
        >
          Sign Out
        </button>
      </aside>
    </>
  );
}
