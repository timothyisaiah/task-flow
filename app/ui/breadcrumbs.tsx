import { clsx } from "clsx";
import Link from "next/link";
import { GeistSans } from "@/app/ui/fonts";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 px-4 sm:px-0">
      <ol
        className={clsx(
          GeistSans.className,
          "flex flex-wrap items-center text-base sm:text-lg"
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={breadcrumb.href} className="flex items-center">
              {!isLast ? (
                <Link
                  href={breadcrumb.href}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-gray-100 font-semibold">
                  {breadcrumb.label}
                </span>
              )}
              {!isLast && (
                <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
