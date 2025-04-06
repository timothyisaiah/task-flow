import { fetchFilteredTasks } from "@/app/lib/data";
import { UpdateTask, DeleteTask } from "@/app/ui/tasks/buttons";
import TaskStatus from "@/app/ui/tasks/status";

export default async function TasksTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const tasks = await fetchFilteredTasks(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 md:rounded-lg">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
              {tasks?.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {task.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {task.project_title}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <UpdateTask id={task.id} />
                      <DeleteTask id={task.id} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                      {task.description}
                    </p>
                  </div>

                  <div className="mt-3">
                    <TaskStatus status={task.status} />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {[
                      "Task Title",
                      "Description",
                      "Project",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  {tasks?.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm text-gray-900 dark:text-gray-100">
                        {task.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-[250px] truncate">
                        <span title={task.description}>{task.description}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {task.project_title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4">
                        <TaskStatus status={task.status} />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-6 pr-3">
                        <div className="flex justify-end gap-2">
                          <UpdateTask id={task.id} />
                          <DeleteTask id={task.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
