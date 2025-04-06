import React from "react";
import { fetchTasks } from "@/app/lib/data";
import { KaizenBoard } from "@/app/ui/dashboard/kaizen-board";

export default async function Dashboard() {
  const tasks = await fetchTasks();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Kaizen Board</h1>
      <KaizenBoard tasks={tasks} />
    </div>
  );
}
