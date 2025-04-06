import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/tasks/create-form";
import { fetchProjects } from "@/app/lib/data";


export default async function Page() {

  const projects = await fetchProjects();

  return (
    <main>
    <Breadcrumbs
     breadcrumbs={[
        { label: "Tasks", href: "/dashboard/tasks" },
        {
          label: "Create Task",
          href: `/dashboard/tasks`,
          active: true,
        },
     ]}
    /> 
    <Form projects={projects}/>       
    </main>
  );
} 