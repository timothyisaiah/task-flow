export default function Page() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <h1>Dashboard</h1>
      </div>
      <div className="flex-1 overflow-y-auto">Dashboard content goes here</div>
    </div>
  );
}