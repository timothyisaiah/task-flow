import Form from '@/app/ui/projects/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchUsers, fetchProjectById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props:{params: Promise<{id:string}>}) {
    const params =  await props.params;
    const id = params.id;

    const [project, users] = await Promise.all([
        fetchProjectById(id),
        fetchUsers(),
    ]);
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