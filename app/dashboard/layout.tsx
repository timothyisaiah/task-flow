import SideNav from "@/app/ui/dashboard/sidenav"
import ThemeToggle from "@/app/ui/toggletheme";
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <ThemeToggle/>
      <div className="w-full flex-none md:w-64">
      <SideNav />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}