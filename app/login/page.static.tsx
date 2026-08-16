import StaticPreviewPage from "@/app/ui/static-preview-page";

const loginLinks = [
  {
    href: "/",
    label: "Back Home",
    description: "Return to the TaskFlow static preview landing page.",
  },
  {
    href: "/dashboard",
    label: "Dashboard Preview",
    description: "Open the static summary of the protected workspace.",
  },
  {
    href: "/whiteboard",
    label: "Whiteboard Preview",
    description: "See the board mock without authentication or persistence.",
  },
];

export default function LoginPreviewPage() {
  return (
    <StaticPreviewPage
      eyebrow="Login Preview"
      title="Authentication is disabled in static export mode"
      description="The live login flow uses NextAuth and a database-backed credentials check, which are not available when TaskFlow is exported as plain files."
      note="This page exists so the GitHub Pages build keeps a friendly route instead of failing while bundling the `authenticate` Server Action."
      links={loginLinks}
    >
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          For the full sign-in experience, deploy the standard app build to a server
          environment with `AUTH_SECRET`, `POSTGRES_URL`, and the rest of the runtime
          configuration in place.
        </p>
      </div>
    </StaticPreviewPage>
  );
}
