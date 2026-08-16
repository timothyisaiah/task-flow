import StaticPreviewPage from "@/app/ui/static-preview-page";

const dashboardLinks = [
  {
    href: "/",
    label: "Back Home",
    description: "Return to the static entry page for the GitHub Pages build.",
  },
  {
    href: "/whiteboard",
    label: "Whiteboard Preview",
    description: "View the static whiteboard mock without any live syncing.",
  },
  {
    href: "/login",
    label: "Login Preview",
    description: "See how the static export explains disabled authentication.",
  },
];

const dashboardCards = [
  {
    title: "Projects",
    description: "Create and editing flows are omitted because they rely on Server Actions and PostgreSQL.",
  },
  {
    title: "Tasks",
    description: "Kanban status changes and task CRUD stay in the full hosted app only.",
  },
  {
    title: "Collaboration",
    description: "Realtime board refreshes and API-backed updates are disabled in static export mode.",
  },
];

export default function DashboardPreviewPage() {
  return (
    <StaticPreviewPage
      eyebrow="Dashboard Preview"
      title="The full workspace needs a server runtime"
      description="TaskFlow's dashboard depends on authentication, database reads, and mutation flows, so the GitHub Pages build exposes a preview page instead of the live workspace."
      note="Use a server-capable deployment such as Vercel when you want sign-in, task management, projects, and whiteboard collaboration to work end to end."
      links={dashboardLinks}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {dashboardCards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {card.title}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </StaticPreviewPage>
  );
}
