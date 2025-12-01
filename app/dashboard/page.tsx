import React from "react";
import { fetchTasks } from "@/app/lib/data";
import { KaizenBoard } from "@/app/ui/dashboard/kaizen-board";
import { Task } from "@/app/lib/definitions";

// Mark as dynamic to prevent static generation (required for database access)
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  let tasks: Task[] = [];
  try {
    tasks = await fetchTasks();
  } catch (error) {
    console.error("Error loading tasks:", error);
    tasks = [];
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Kaizen Board</h1>
      <KaizenBoard tasks={tasks} />
    </div>
  );
}
