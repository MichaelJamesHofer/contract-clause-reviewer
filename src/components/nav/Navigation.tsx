"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-gray-800 shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                Contract Reviewer
              </Link>
            </div>
            <div className="ml-6 flex items-center space-x-4">
              <Link 
                href="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/") 
                    ? "bg-gray-900 text-white" 
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                Home
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link 
                    href="/review" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/review") 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    Review Contract
                  </Link>
                  <Link 
                    href="/history" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActive("/history") 
                        ? "bg-gray-900 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    History
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            {isLoading ? (
              <div className="text-gray-300 px-3 py-2">Loading...</div>
            ) : isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-gray-300 mr-4">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/signin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 