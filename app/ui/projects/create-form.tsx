import Link from "next/link";
import { createNewProject } from "@/app/lib/actions";
import { UserField } from "@/app/lib/definitions";

export default function Form({ users }: { users: UserField[] }) {
  return (
    <div className="px-4 py-8 sm:px-6">
    <form action={createNewProject} className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Project Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="e.g. New Marketing Campaign"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Briefly describe the project..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Assign to User
        </label>
        <select
          id="userId"
          name="userId"
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a user</option>
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Project
        </button>
      </div>
    </form>
    </div>
  );
}
