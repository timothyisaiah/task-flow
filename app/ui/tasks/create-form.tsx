import { ProjectField } from "@/app/lib/definitions";
import Link from "next/link";

import { Button } from "@/app/ui/button";
import { createTask } from "@/app/lib/actions";

export default function Form({ projects }: { projects: ProjectField[] }) {
  return (
    <form action={createTask}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required></textarea>
      </div>
      <div>
        <label htmlFor="project">Choose Project</label>
        <select id="project" name="project" required>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="duedate">Due Date</label>
        <input type="date" id="duedate" name="duedate" required />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" name="status" required>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Completed</option>
        </select>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/dashboard/tasks" className="mt-4">
          Cancel
        </Link>
        <Button type="submit" className="mt-4">
          Create Task
        </Button>
      </div>
    </form>
  );
}
