import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/tasks/edit-form";
import { fetchProjects, fetchTaskById } from "@/app/lib/data";
import { notFound } from "next/navigation";

// Mark as dynamic to prevent static generation (required for database access)
export const dynamic = 'force-dynamic';

export default async function Page(props:{ params: Promise<{id:string}>}) {

    const params = await props.params;
    const id = params.id;

    let task, projects;
    try {
        [task, projects] = await Promise.all([
            fetchTaskById(id),
            fetchProjects(),
        ]);
    } catch (error) {
        console.error("Error loading task data:", error);
        notFound();
    }

    if (!task) {
        notFound();
    }

  return (
    <main>
    <Breadcrumbs
     breadcrumbs={[
        { label: "Tasks", href: "/dashboard/tasks" },
        {
          label: "Edit Task",
          href: `/dashboard/tasks/${id}/edit`,
          active: true,
        },
     ]}
    /> 
    <Form task={task} projects={projects}/>       
    </main>
  );
} 