import Form from '@/app/ui/projects/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchUsers, fetchProjectById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

// Mark as dynamic to prevent static generation (required for database access)
export const dynamic = 'force-dynamic';

export default async function Page(props:{params: Promise<{id:string}>}) {
    const params =  await props.params;
    const id = params.id;

    let project, users;
    try {
        [project, users] = await Promise.all([
            fetchProjectById(id),
            fetchUsers(),
        ]);
    } catch (error) {
        console.error("Error loading project data:", error);
        notFound();
    }
    
    if(!project){
        notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'Edit Project',
            href: `/dashboard/projects/${id}/edit`,
            active: true,
          },
        ]}
      />

      <Form project={project} users={users}/>
    </main>
  );
}