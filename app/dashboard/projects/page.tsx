import { GeistSans } from "@/app/ui/fonts";
import { Suspense } from "react";
import { fetchProjectPages } from "@/app/lib/data";
import Search  from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
import { CreateProject } from "@/app/ui/projects/buttons";
import ProjectsTable from "@/app/ui/projects/table";
import { ProjectsTableSkeleton } from "@/app/ui/skeletons";

export default async function Page(props:{
    searchParams?:Promise<{
        query?: string;
        page?: string;
    }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProjectPages(query);

    return (
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h1 className={`${GeistSans.className} text-2xl`}>Projects</h1>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search projects..." />
            <CreateProject />
          </div>
           <Suspense key={query + currentPage} fallback={<ProjectsTableSkeleton />}>
            <ProjectsTable query={query} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      );
}