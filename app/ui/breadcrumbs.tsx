import { clsx } from 'clsx';
import Link from 'next/link';
import { GeistSans } from '@/app/ui/fonts';

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
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(GeistSans.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              'transition-colors',
              breadcrumb.active
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-400'
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block text-gray-400 dark:text-gray-600">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
