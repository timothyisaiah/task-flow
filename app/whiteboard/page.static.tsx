import StaticPreviewPage from "@/app/ui/static-preview-page";

const whiteboardLinks = [
  {
    href: "/",
    label: "Back Home",
    description: "Return to the TaskFlow static preview landing page.",
  },
  {
    href: "/dashboard",
    label: "Dashboard Preview",
    description: "Open the static summary of the authenticated workspace.",
  },
  {
    href: "/login",
    label: "Login Preview",
    description: "Read why the hosted app is required for auth-backed features.",
  },
];

const previewNotes = [
  {
    id: "idea",
    title: "Sprint Ideas",
    body: "Collect improvements, capture blockers, and turn the strongest ideas into scheduled work.",
    classes:
      "left-6 top-10 -rotate-3 bg-yellow-200 text-slate-900 sm:left-10 sm:top-12",
  },
  {
    id: "launch",
    title: "Launch Checklist",
    body: "QA the release flow, verify CI, and confirm the production environment variables.",
    classes:
      "right-6 top-24 rotate-2 bg-sky-200 text-slate-900 sm:right-16 sm:top-16",
  },
  {
    id: "retro",
    title: "Retro Notes",
    body: "Celebrate wins, capture rough edges, and carry the best learnings into the next cycle.",
    classes:
      "left-1/2 top-44 -translate-x-1/2 rotate-1 bg-pink-200 text-slate-900 sm:top-40",
  },
];

export default function WhiteboardPreviewPage() {
  return (
    <StaticPreviewPage
      eyebrow="Whiteboard Preview"
      title="A static mock of the collaborative board"
      description="The live whiteboard uses API routes, Server Actions, and database persistence, so the export build swaps in a visual preview instead of interactive collaboration."
      note="The production whiteboard supports creating, moving, recoloring, and deleting notes. The GitHub Pages build intentionally omits those mutations so `next build` can finish as a pure static export."
      links={whiteboardLinks}
    >
      <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px] bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] dark:bg-slate-900">
        {previewNotes.map((note) => (
          <div
            key={note.id}
            className={`absolute w-64 rounded-3xl border border-slate-900/10 p-5 shadow-lg ${note.classes}`}
          >
            <p className="text-lg font-semibold">{note.title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">{note.body}</p>
          </div>
        ))}
      </div>
    </StaticPreviewPage>
  );
}
