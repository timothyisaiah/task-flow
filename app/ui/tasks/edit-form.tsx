import { ProjectField, TaskForm } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateTask } from "@/app/lib/actions";

export default function EditTaskForm({
  task,
  projects,
}: {
  task: TaskForm;
  projects: ProjectField[];
}) {
  const updateTaskWithId = updateTask.bind(null, task.id);

  return (
    <div className="px-4 py-8 sm:px-6">
      <form action={updateTaskWithId} className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-800 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={task.title}
            required
            placeholder="Task title"
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-gray-800 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            defaultValue={task.description}
            placeholder="Enter task description..."
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="project" className="text-gray-800 dark:text-gray-200">
            Choose Project
          </label>
          <select
            id="project"
            name="project"
            defaultValue={task.project_id}
            required
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            <option value="" disabled>
              Select a project
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="duedate" className="text-gray-800 dark:text-gray-200">
            Due Date
          </label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            defaultValue={task.due_date}
            required
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-gray-800 dark:text-gray-200">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            required
            className="border rounded-lg px-4 py-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Link
            href="/dashboard/tasks"
            className="text-gray-500 dark:text-gray-400 hover:underline"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Update Task
          </Button>
        </div>
      </form>
    </div>
  );
}
