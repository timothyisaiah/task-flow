const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'User',
        email: 'testuser@taskflow.com',
        password: '123456',
    },

    {
        id: '6178f26e-21cb-4d80-8af4-161aec0b24c5',
        name: 'Jane Doe',
        email: 'janedoe@taskflow.com',
        password: '123456',
    },

    {
        id: '44214030-d9b0-4473-966c-375a256e5b1b',
        name: 'Snopp Dogg',
        email: 'snopp@dogg.com',
        password: '123456',
      },
]

const projects = [
    {
        id: 'bd5310f3-f01a-4153-8bc8-943c30d2f0aa',
        title:'Web App development',
        description:'Create a new web app using NextJs!!',
        user_id: users[0].id,
    },
    {
        id: '3f8ef6b2-1469-40a7-8136-4d688b693411',
        title:'Deployment',
        description:'This project aims to deploy the all new web app',
        user_id: users[0].id,
    }
];

const tasks = [
    {
        id: '3f8ef6b2-1469-40a7-8136-4d688b693411',
        title: 'Requirements',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'todo',
        dueDate: '2025-12-06',
        project_id: projects[0].id,
    },
    {
        id: '4a8ef6b2-1469-40a7-8136-4d688b693412',
        title: 'Design',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'in-progress',
        dueDate: '2025-12-10',
        project_id: projects[0].id,
    },
    {
        id: '5b8ef6b2-1469-40a7-8136-4d688b693413',
        title: 'Development',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'todo',
        dueDate: '2025-12-15',
        project_id: projects[0].id,
    },
    {
        id: '6c8ef6b2-1469-40a7-8136-4d688b693414',
        title: 'Testing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'in-progress',
        dueDate: '2025-12-20',
        project_id: projects[0].id,
    },
    {
        id: '7d8ef6b2-1469-40a7-8136-4d688b693415',
        title: 'Deployment',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'done',
        dueDate: '2025-12-25',
        project_id: projects[1].id,
    },
    {
        id: '8e8ef6b2-1469-40a7-8136-4d688b693416',
        title: 'Documentation',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'todo',
        dueDate: '2025-12-30',
        project_id: projects[1].id,
    },
    {
        id: '9f8ef6b2-1469-40a7-8136-4d688b693417',
        title: 'Review',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'in-progress',
        dueDate: '2026-01-05',
        project_id: projects[1].id,
    },
    {
        id: 'af8ef6b2-1469-40a7-8136-4d688b693418',
        title: 'Feedback',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'done',
        dueDate: '2026-01-10',
        project_id: projects[1].id,
    },
    {
        id: 'bf8ef6b2-1469-40a7-8136-4d688b693419',
        title: 'Optimization',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'todo',
        dueDate: '2026-01-15',
        project_id: projects[1].id,
    },
    {
        id: 'cf8ef6b2-1469-40a7-8136-4d688b693420',
        title: 'Final Delivery',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'done',
        dueDate: '2026-01-20',
        project_id: projects[1].id,
    }
];


export { users, projects, tasks }