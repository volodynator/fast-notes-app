import type { Task } from '../../model';
import '../../css/TaskCard.css';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <tr>
      <td>{task.priority.name}</td>
      <td>{task.category}</td>
      <td>{task.title}</td>
    </tr>
  );
}
