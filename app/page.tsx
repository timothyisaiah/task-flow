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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center px-4">
      <ThemeToggle />
      <h1 className={`${GeistSans.className} text-4xl font-bold text-gray-800 mb-4`}>Welcome to TaskFlow</h1>
      <p className={`${GeistMono.className} text-lg text-gray-600 mb-6`}>
        Effortlessly manage your projects and tasks in one place.
      </p>
      <button
        onClick={handleLoginClick}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <span> Login </span>
        <ArrowRightEndOnRectangleIcon className="w-5 h-5 inline-block mr-2" />
      </button>
    </main>
  );
}
