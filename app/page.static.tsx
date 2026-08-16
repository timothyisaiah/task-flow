import StaticPreviewPage from "@/app/ui/static-preview-page";

const staticLinks = [
  {
    href: "/dashboard",
    label: "Dashboard Preview",
    description:
      "See the static-export landing state for the authenticated workspace.",
  },
  {
    href: "/whiteboard",
    label: "Whiteboard Preview",
    description:
      "Open a static mock of the collaborative whiteboard experience.",
  },
  {
    href: "/login",
    label: "Login Preview",
    description:
      "Read why authentication is disabled in the GitHub Pages build.",
  },
];

const unsupportedFeatures = [
  "Authentication and protected routes",
  "Database-backed project and task mutations",
  "API routes and collaborative whiteboard updates",
  "Server Actions such as create, edit, delete, and sign out",
];

export default function HomePage() {
  return (
    <StaticPreviewPage
      eyebrow="Static Export"
      title="TaskFlow preview for GitHub Pages"
      description="This build ships a static walkthrough of TaskFlow while keeping the full database-backed app available for normal server deployments."
      note="BUILD_STATIC=true swaps in a static route set, so the export build no longer tries to bundle middleware, API handlers, Server Actions, or auth-only pages."
      links={staticLinks}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {unsupportedFeatures.map((feature) => (
          <div
            key={feature}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-base font-medium text-slate-900 dark:text-slate-100">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </StaticPreviewPage>
  );
}
