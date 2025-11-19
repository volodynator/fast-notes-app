import { manager, type Task } from '../../model';
import '../../css/TaskCard.css';

interface TaskCardProps {
  task: Task;
  onUpdated: () => void;
}

export default function TaskCard({ task, onUpdated }: TaskCardProps) {
  return (
    <tr>
      <td>{task.priority.name}</td>
      <td>{task.category}</td>
      <td>{task.title}</td>
      <button
        onClick={async () => {
          await manager.completeTask(task.id);
          onUpdated();
        }}
      >
        Complete task
      </button>
    </tr>
  );
}
