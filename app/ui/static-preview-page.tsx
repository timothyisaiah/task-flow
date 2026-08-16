import Link from "next/link";
import ThemeToggle from "@/app/ui/toggletheme";

type PreviewLink = {
  href: string;
  label: string;
  description: string;
};

type StaticPreviewPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  links: PreviewLink[];
  children?: React.ReactNode;
};

export default function StaticPreviewPage({
  eyebrow,
  title,
  description,
  note,
  links,
  children,
}: StaticPreviewPageProps) {
  return (
    <main className="min-h-screen px-6 py-12">
      <ThemeToggle />
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100">
          {note}
        </div>

        {children}

        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-500/60"
            >
              <div className="space-y-3">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {link.label}
                </p>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {link.description}
                </p>
                <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
                  Open preview
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
