'use client';


import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, FolderIcon, CheckCircleIcon, CogIcon, UserIcon } from "@heroicons/react/24/outline";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: FolderIcon,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckCircleIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: CogIcon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={ clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-colors',
                'bg-gray-50 text-gray-800 hover:bg-sky-100 hover:text-blue-600',
                'dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-sky-400',
                'md:flex-none md:justify-start md:p-2 md:px-3',
                { 
                  'bg-sky-100 text-blue-600 dark:bg-sky-900 dark:text-sky-300': pathname === link.href, 
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }