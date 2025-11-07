import type { Task } from '../../model';
import TaskCard from './Task';
import '../../css/TaskCard.css';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <table>
      <tr>
        <th>Priority</th>
        <th>Category</th>
        <th>Title</th>
      </tr>
      {tasks.map((task) => (
        <TaskCard task={task} />
      ))}
    </table>
  );
}
