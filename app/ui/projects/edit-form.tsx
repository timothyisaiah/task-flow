"use client"
import { ProjectForm, UserField } from "@/app/lib/definitions";
import { updateProject } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import Link from "next/link";



export default function EditProjectForm({project, users, }:{project: ProjectForm; users: UserField[]; }){
const updateProjectWithId = updateProject.bind(null, project.id);

return (
    <form action={updateProjectWithId} className="space-y-4">
      <input type="hidden" name="id" value={project.id} />
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="text-gray-800 dark:text-gray-200">
          Project Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={project.title}
          className="border rounded p-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-gray-800 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          defaultValue={project.description}
          rows={4}
          className="border rounded p-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
        ></textarea>
      </div>
      <div>
      <select
              id="userId"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={project.user_id}
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
      </div>
      <div>
        <Link 
          href="/dashboard/projects"
          className="mr-4 text-gray-500 dark:text-gray-400">
        Cancel</Link>
        <Button type="submit" className="ml-4 bg-blue-500 text-white rounded-md p-2">
          Update Project
        </Button>
      </div>
    </form>
)
    
}