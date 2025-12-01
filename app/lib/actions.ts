// Write actions performed in the app here [ Create, Update. Delete, etc. ]
"use server"
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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
  

  
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

const StickyNoteSchema = z.object({
    id: z.string(),
    content: z.string(),
    color: z.enum(['yellow', 'pink', 'blue', 'green', 'orange', 'purple']),
    position_x: z.number(),
    position_y: z.number(),
    width: z.number().default(200),
    height: z.number().default(200),
});

const CreateStickyNote = StickyNoteSchema.omit({ id: true });

export async function createStickyNote(formData: FormData) {
    const { content, color, position_x, position_y, width, height } = CreateStickyNote.parse({
        content: formData.get("content")?.toString() || '',
        color: formData.get("color")?.toString() as 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple' || 'yellow',
        position_x: Number(formData.get("position_x")) || 0,
        position_y: Number(formData.get("position_y")) || 0,
        width: Number(formData.get("width")) || 200,
        height: Number(formData.get("height")) || 200,
    });

    try {
        await sql`
            INSERT INTO sticky_notes (content, color, position_x, position_y, width, height)
            VALUES (${content}, ${color}, ${position_x}, ${position_y}, ${width}, ${height})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }

    revalidatePath("/whiteboard");
}

export async function updateStickyNote(id: string, formData: FormData) {
    const { content, color } = {
        content: formData.get("content")?.toString() || '',
        color: formData.get("color")?.toString() as 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple' || 'yellow',
    };

    try {
        await sql`
            UPDATE sticky_notes
            SET content = ${content}, color = ${color}, updated_at = NOW()
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }

    revalidatePath("/whiteboard");
}

export async function deleteStickyNote(id: string) {
    try {
        await sql`
            DELETE FROM sticky_notes
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error("Database Error:", error);
        throw error;
    }

    revalidatePath("/whiteboard");
}



