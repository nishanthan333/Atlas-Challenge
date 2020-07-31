import CreateForm from './components/Create';
import TasksTable from './components/users/TasksTable';
import EditForm from './components/Edit';

export const routes = [
    {
        path: '/',
        name: 'home',
        component: TasksTable
    },
    {
        path: '/tasks/create',
        name: 'create',
        component: CreateForm
    },
    {
        path: '/tasks/:id',
        name: 'edit',
        component: EditForm
    }
];