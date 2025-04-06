// Fetch data from the API

import postgres from 'postgres';
import { ProjectField, ProjectForm, ProjectTable, Task, TaskForm, TasksTable, UserField } from '@/app/lib/definitions';





const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });


export async function fetchTasks() {
    try {
        const tasks = await sql<Task[]>`SELECT 
    t.id,
    t.title, 
    t.description,
    t.status,
    t.due_date,
    t.project_id,
    p.title AS project_title
    FROM tasks t
    JOIN projects p ON t.project_id = p.id`;
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredProjects(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const projects = await sql<ProjectTable[]>`
            SELECT p.id, p.title, p.description, p.user_id, u.name as user_name FROM projects p join users u on p.user_id = u.id
            WHERE p.title ILIKE ${`%${query}%`} OR 
            p.description ILIKE ${`%${query}%`} OR
            u.name ILIKE ${`%${query}%`} 
            ORDER BY p.title ASC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

}

export async function fetchProjectPages(query: string) {
    try {
        const totalProjects = await sql`SELECT COUNT(*) FROM projects join users on projects.user_id = users.id WHERE projects.title ILIKE ${`%${query}%`} OR projects.description ILIKE ${`%${query}%`} OR users.name ILIKE ${`%${query}%`}`;
        const totalPages = Math.ceil(Number(totalProjects[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Error fetching project pages:', error);
        throw error;
    }
}

export async function fetchProjects() {
    try {
        const projects = await sql<ProjectField[]>`
          SELECT
            id,
            title
          FROM projects
          ORDER BY title ASC
        `;

        return projects;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchUsers() {
    try {
        const users = await sql<UserField[]>`
          SELECT
            id,
            name
          FROM users
          ORDER BY name ASC
        `;

        return users;
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all customers.');
    }
}

export async function fetchTaskById(id: string) {
    try {
        const data = await sql<TaskForm[]>`
        SELECT
          tasks.id,
          tasks.title, 
          tasks.description,
          tasks.status,
          tasks.due_date,
          tasks.project_id
        FROM tasks
        WHERE tasks.id = ${id};
      `;

        return data[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch task.');
    }
}

export async function fetchProjectById(id: string) {
    try {
        const data = await sql<ProjectForm[]>`
        SELECT
          projects.id,
          projects.title, 
          projects.description,
          projects.user_id
        FROM projects
        WHERE projects.id = ${id};
      `;

        return data[0]
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch project.');
    }
}


export async function fetchFilteredTasks(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const tasks = await sql<TasksTable[]>`
            SELECT t.id, t.title, t.description, t.project_id, p.title as project_title FROM tasks t join projects p on t.project_id = p.id
            WHERE lower(t.title) ILIKE ${`%${query.toLocaleLowerCase()}%`} OR 
            lower(p.description) ILIKE ${`%${query.toLocaleLowerCase()}%`} OR
            lower(p.title) ILIKE ${`%${query.toLocaleLowerCase()}%`} 
            ORDER BY due_date DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        return tasks;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

}

export async function fetchTaskPages(query: string) {
    try {
        const totalTasks = await sql`
            SELECT COUNT(*) FROM tasks t join projects p on t.project_id = p.id
            WHERE t.title ILIKE ${`%${query}%`} OR 
            t.description ILIKE ${`%${query}%`} OR
            p.description ILIKE ${`%${query}%`} OR
            p.title ILIKE ${`%${query}%`}
        `;
        const totalPages = Math.ceil(Number(totalTasks[0].count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Error fetching project pages:', error);
        throw error;
    }
}
