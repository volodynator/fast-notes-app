import type { Task } from '../../model';
import TaskCard from './Task';
import '../../css/Button.css';
import '../../css/Form.css';
import '../../css/Table.css';

interface TaskListProps {
  tasks: Task[];
  onUpdated: () => void;
}

export function TaskList({ tasks, onUpdated }: TaskListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Category</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdated={onUpdated} />
        ))}
      </tbody>
    </table>
  );
}
