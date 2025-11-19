import type { Task } from '../../model';
import TaskCard from './Task';
import '../../css/TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onUpdated: () => void;
}

export function TaskList({ tasks, onUpdated }: TaskListProps) {
  return (
    <table>
      <tr>
        <th>Priority</th>
        <th>Category</th>
        <th>Title</th>
        <th>Action</th>
      </tr>
      {tasks.map((task) => (
        <TaskCard task={task} onUpdated={onUpdated} />
      ))}
    </table>
  );
}
