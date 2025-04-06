import React from "react";
import { Task } from '@/app/lib/definitions'
import { DateDisplay } from "@/app/ui/date";

const statusColors: Record<string, string> = {
  todo: "bg-yellow-100 border-yellow-400",
  "in-progress": "bg-blue-100 border-blue-400",
  done: "bg-green-100 border-green-400",
};

export const TaskCard = ({ task }: { task: Task }) => {
  const color = statusColors[task.status] || "bg-gray-100 border-gray-400";

  return (
    <div
      className={`border-l-4 p-4 rounded shadow-sm mb-4 ${color}`}
    >
      <h3 className="text-gray-700 text-lg">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>
      <p className="text-xs text-gray-500 mt-2">Due: <DateDisplay date={task.due_date} /> </p>
    </div>
  );
};
