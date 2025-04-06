'use client';

import { useRouter } from "next/navigation";
import { GeistSans, GeistMono } from "@/app/ui/fonts";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "@/app/ui/toggletheme";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/dashboard'); // Placeholder: change to actual login logic later
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 py-12 text-center space-y-6">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <h1 className={`${GeistSans.className} text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white`}>
        Welcome to TaskFlow
      </h1>

      <p className={`${GeistMono.className} text-md sm:text-lg text-gray-600 dark:text-gray-300 max-w-md`}>
        Effortlessly manage your projects and tasks in one place.
      </p>

      <button
        onClick={handleLoginClick}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
        <span>Login</span>
      </button>
    </main>
  );
}
