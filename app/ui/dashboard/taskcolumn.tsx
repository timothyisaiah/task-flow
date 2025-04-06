"use client";

import React from "react";
import { TaskCard } from "@/app/ui/dashboard/taskcard";
import { Task } from "@/app/lib/definitions";


import { Draggable } from "@hello-pangea/dnd";

export function TaskColumn({
  status,
  tasks,
}: {
  status: string;
  tasks: Task[];
}) {
  return (
    <>
      <h2 className="text-xl font-bold capitalize mb-4">{status.replace("-", " ")}</h2>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}

