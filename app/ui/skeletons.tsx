export function TasksTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <TaskMobileSkeleton />
            <TaskMobileSkeleton />
            <TaskMobileSkeleton />
            <TaskMobileSkeleton />
            <TaskMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Task Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Project
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due date
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TaskTableRowSkeleton />
              <TaskTableRowSkeleton />
              <TaskTableRowSkeleton />
              <TaskTableRowSkeleton />
              <TaskTableRowSkeleton />
              <TaskTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function TaskTableRowSkeleton() {
    return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Title */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Descrition */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Status */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Project */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Due Date */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          </div>
        </td>
      </tr>
    );
  }
  

export function TaskMobileSkeleton() {
    return (
      <div className="mb-2 w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
          </div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="flex w-full items-center justify-between pt-4">
          <div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
            <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-10 w-10 rounded bg-gray-100"></div>
            <div className="h-10 w-10 rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
}
  
export function ProjectsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <ProjectMobileSkeleton />
            <ProjectMobileSkeleton />
            <ProjectMobileSkeleton />
            <ProjectMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Project Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  User
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <ProjectTableRowSkeleton />
              <ProjectTableRowSkeleton />
              <ProjectTableRowSkeleton />
              <ProjectTableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ProjectTableRowSkeleton() {
    return (
      <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-24 rounded bg-gray-100"></div>
          </div>
        </td>
        {/* Title */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-32 rounded bg-gray-100"></div>
        </td>
        {/* Descrition */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* User */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Actions */}
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex justify-end gap-3">
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
            <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          </div>
        </td>
      </tr>
    );
  }
  

export function ProjectMobileSkeleton() {
    return (
      <div className="mb-2 w-full rounded-md bg-white p-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8">
          <div className="flex items-center">
            <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
          </div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="flex w-full items-center justify-between pt-4">
          <div>
            <div className="h-6 w-16 rounded bg-gray-100"></div>
            <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="h-10 w-10 rounded bg-gray-100"></div>
            <div className="h-10 w-10 rounded bg-gray-100"></div>
          </div>
        </div>
      </div>
    );
}
  