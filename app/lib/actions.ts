// Write actions performed in the app here [ Create, Update. Delete, etc. ]
"use server"
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';


const sql = postgres(process.env.POSTGRES_URL!, {
    ssl: "require",
});


export async function deleteProject(id: string) {
    // throw new Error("Failed to delete.");
    try {
        await sql`
        DELETE FROM projects
        WHERE id = ${id}`;
    } catch (error) {
        console.error("Database Error:", error);
    }
    revalidatePath("/dashboard/projects");
    redirect("/dashboard/projects");
}

export async function deleteTask(id: string) {
    // throw new Error("Failed to delete.");
    try {
        await sql`
        DELETE FROM tasks
        WHERE id = ${id}`;
    } catch (error) {
        console.error("Database Error:", error);
    }
    revalidatePath("/dashboard/tasks");
}

const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    userId: z.string(),
})


const createProject = ProjectSchema.omit({ id: true });
export async function createNewProject(formData: FormData) {

    const { title, description, userId } = createProject.parse({
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        userId: formData.get('userId')?.toString() || '',
    });

    try {
        await sql`
                INSERT INTO projects (title, description, user_id)
                VALUES (${title}, ${description}, ${userId})`;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
    revalidatePath('/dashboard/projects');
    redirect('/dashboard/projects');
}

const UpdateProject = ProjectSchema.omit({ id: true });
export async function updateProject(id: string, formData: FormData) {
    const { title, description, userId } = UpdateProject.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        userId: formData.get("userId")
    });

    try {
        await sql`
            UPDATE projects
            SET title = ${title}, description = ${description}, user_id = ${userId}
            WHERE id = ${id}`;
    } catch (error) {
        console.error('Error updating project', error)
        throw error
    }

    revalidatePath("/dashboard/projects")
    redirect("/dashboard/projects")
}


const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.enum(['todo', 'in-progress', 'done']),
    dueDate: z.string(),
    projectId: z.string(),
})


const CreateTask = TaskSchema.omit({ id: true  });

export async function createTask(formData: FormData) {
    const { title, description, status, dueDate, projectId } = CreateTask.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        dueDate: formData.get("dueDate"),
        projectId: formData.get("projectId"),
    });
    
    try {
  
    await sql`
      INSERT INTO tasks (title, description, status, dueDate, project_id)
      VALUES (${title}, ${description}, ${status}, ${dueDate}, ${projectId})`;
    } catch (error) {
      console.error("Database Error:", error);
    }
  
    revalidatePath("/dashboard/tasks");
    redirect("/dashboard/tasks");
  }
  
  const UpdateTask = TaskSchema.omit({ id: true });
  export async function updateTask(id: string, formData: FormData) {
    const { title, description, status, dueDate, projectId } = UpdateTask.parse({
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        dueDate: formData.get("dueDate"),
        projectId: formData.get("projectId"),
    });

    try {
    await sql`
      UPDATE tasks
      SET title = ${title}, description = ${description}, status = ${status}, dueDate = ${dueDate}, project_id=${projectId}
      WHERE id = ${id}`;
    }catch (error) {
      console.error("Database Error:", error);    
    }
  
    revalidatePath("/dashboard/tasks");
    redirect("/dashboard/tasks");
  }
  



