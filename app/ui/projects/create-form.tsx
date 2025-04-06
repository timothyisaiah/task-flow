import Link from "next/link";
import { createNewProject } from "@/app/lib/actions";
import { UserField } from "@/app/lib/definitions";

export default function Form({ users }: { users: UserField[] }) {
  return (
    <form action={createNewProject}>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="text-gray-800 dark:text-gray-200">
            Project title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Project title"
            className="border rounded p-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-gray-800 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Project Description"
            className="border rounded p-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          ></textarea>
        </div>
        <div>
          <label htmlFor="userId">Choose User</label>
          <select id="userId" name="userId" required>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 flex justify-end">
          <Link
            href="/dashboard/projects"
            className="mr-4 text-gray-500 dark:text-gray-400"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 dark:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </div>
    </form>
  );
}
