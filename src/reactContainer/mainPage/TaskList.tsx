import type { Task } from '../../model';
import TaskCard from './Task';
import '../../css/TaskCard.css';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </div>
  );
}
