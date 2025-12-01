// define types and interfaces for the app


export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  due_date: string;
  project_id: string;
  project_title:string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    user_id: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};


export type TaskForm = {
    id: string;
    title: string; 
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    due_date: string;
    project_id: string;
}

export type ProjectForm = {
    id: string;
    title: string;
    description: string;
    user_id: string;
}

export type ProjectField = {
    id: string;
    title: string;
}
export type UserField = {
    id: string;
    name: string;
}


export type TasksTable = {
    id: string;
    title: string; 
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    due_date: string;
    project_title: string;
}

export type ProjectTable = {
    id: string;
    title: string;
    description: string;
    user_name: string;
}

export type StickyNote = {
    id: string;
    content: string;
    color: 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple';
    position_x: number;
    position_y: number;
    width: number;
    height: number;
    created_at: string;
    updated_at: string;
}

export type StickyNoteForm = {
    id: string;
    content: string;
    color: 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'purple';
    position_x: number;
    position_y: number;
    width: number;
    height: number;
}