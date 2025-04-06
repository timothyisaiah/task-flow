import clsx from 'clsx';

export default function TaskStatus({status}:{status: string}){
    const statusClass = clsx(
        'inline-flex items-center px-2 py-1 rounded text-sm font-medium',
        {
            'bg-yellow-100 text-yellow-800': status === 'todo',
            'bg-blue-100 text-blue-800': status === 'in-progress',
            'bg-green-100 text-green-800': status === 'done',
            'bg-red-100 text-red-800': status === 'cancelled',
        }
    );
    return ( 
    <span className={statusClass}>{status}</span>
)
 
}
