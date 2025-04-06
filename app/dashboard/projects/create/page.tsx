// import Form from '@/app/ui/projects/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
// import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
    // const users = await fetchUsers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Projects', href: '/dashboard/projects' },
          {
            label: 'Create Project',
            href: '/dashboard/projects/create',
            active: true,
          },
        ]}
      />
      
      {/* <Form users={users}/> */}
    </main>
  );
}