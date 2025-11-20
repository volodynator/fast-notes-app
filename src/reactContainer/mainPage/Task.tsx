import { manager, type Task } from '../../model';
import '../../css/Button.css';
import '../../css/Form.css';
import '../../css/Table.css';

interface TaskCardProps {
  task: Task;
  onUpdated: () => void;
}

export default function TaskCard({ task, onUpdated }: TaskCardProps) {
  return (
    <tr>
      <td>
        <div className="priority-badge-container">
          <span
            className="priority-badge"
            style={{ backgroundColor: task.priority.color }}
          />
          <span>{task.priority.name}</span>
        </div>
      </td>
      <td>{task.category}</td>
      <td>{task.title}</td>
      <td>
        <button
          onClick={async () => {
            await manager.completeTask(task.id);
            onUpdated();
          }}
        >
          Complete task
        </button>
      </td>
    </tr>
  );
}
