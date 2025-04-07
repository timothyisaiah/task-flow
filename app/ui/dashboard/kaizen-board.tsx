"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { TaskColumn } from "./taskcolumn";
import { Task } from "@/app/lib/definitions";

const statuses = ["todo", "in-progress", "done"];

export function KaizenBoard({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const updatedTasks = tasks.map(task =>
      task.id === draggableId ? { ...task, status: destination.droppableId as "todo" | "in-progress" | "done" } : task
    );

    setTasks(updatedTasks);

    try {
      await fetch(`/api/tasks/${draggableId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: destination.droppableId }),
      });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4">
        {statuses.map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full md:w-1/3 p-2 bg-gray-50 rounded shadow min-h-[200px]"
              >
                <TaskColumn
                  status={status}
                  tasks={tasks.filter(task => task.status === status)}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
