import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, projects, tasks } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function dropTables() {
//     await sql`DROP TABLE IF EXISTS tasks CASCADE;`;
//     await sql`DROP TABLE IF EXISTS projects CASCADE;`;
//     await sql`DROP TABLE IF EXISTS users CASCADE;`;
// }

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
  return insertedUsers
}

async function seedProjects() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE
    );
  `;

    const insertedProjects = await Promise.all(
        projects.map(async (project) => {
            return sql`
              INSERT INTO projects (id, title, description, user_id)
              VALUES (${project.id}, ${project.title}, ${project.description}, ${project.user_id})
              ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );
    return insertedProjects;
}

async function seedTasks() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(50) NOT NULL,
      due_date TIMESTAMP,
      project_id UUID REFERENCES projects(id) ON DELETE CASCADE
    );
  `;

    const insertedTasks = await Promise.all(
        tasks.map(async (task) => {
            return sql`
              INSERT INTO tasks (id, title, description, status, due_date, project_id)
              VALUES (${task.id}, ${task.title}, ${task.description}, ${task.status}, ${task.dueDate}, ${task.project_id})
              ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );
    return insertedTasks;
}

async function seedStickyNotes() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
    CREATE TABLE IF NOT EXISTS sticky_notes (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      content TEXT NOT NULL,
      color VARCHAR(20) NOT NULL,
      position_x NUMERIC(10, 2) NOT NULL DEFAULT 0,
      position_y NUMERIC(10, 2) NOT NULL DEFAULT 0,
      width NUMERIC(10, 2) DEFAULT 200,
      height NUMERIC(10, 2) DEFAULT 200,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `;
  
    // Migrate existing INTEGER columns to NUMERIC if table exists
    try {
      await sql`
        DO $$
        BEGIN
          IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'sticky_notes' 
            AND column_name = 'position_x' 
            AND data_type = 'integer'
          ) THEN
            ALTER TABLE sticky_notes 
            ALTER COLUMN position_x TYPE NUMERIC(10, 2) USING position_x::NUMERIC(10, 2),
            ALTER COLUMN position_y TYPE NUMERIC(10, 2) USING position_y::NUMERIC(10, 2),
            ALTER COLUMN width TYPE NUMERIC(10, 2) USING width::NUMERIC(10, 2),
            ALTER COLUMN height TYPE NUMERIC(10, 2) USING height::NUMERIC(10, 2);
          END IF;
        END $$;
      `;
    } catch (error) {
      // Migration might fail if columns are already NUMERIC, ignore
      console.log('Migration note:', error);
    }

    return true;
}


export async function GET(){
    try {
        const result = await sql.begin(() => [
            // dropTables(),
            seedUsers(),
            seedProjects(),
            seedTasks(),
            seedStickyNotes(),
        ]);

        return Response.json({ message: 'Database seeded successfully', result: result });

    }catch (error) {
        return Response.json({error}, { status: 500 })
    }
}