import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { GeistSans } from '@/app/ui/fonts';
import { PowerIcon } from '@heroicons/react/24/outline';
import {signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h1 className={`${GeistSans.className} text-4xl font-bold text-gray-800 mb-4`}>TaskFlow</h1>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md  bg-gray-50 dark:bg-gray-800 md:block"></div>
        <form 
        action={async ()=>{
          'use server';
          await signOut({redirectTo: '/'});
        }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md 
             bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600 
             dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-sky-400 
             text-sm font-medium transition-colors 
             md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
