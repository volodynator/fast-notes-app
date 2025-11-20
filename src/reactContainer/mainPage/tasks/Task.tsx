import { type Task } from '../../../model';
import '../../../css/Button.css';
import '../../../css/Form.css';
import '../../../css/Table.css';

interface TaskCardProps {
  task: Task;
  renderActions: (task: Task) => React.ReactNode;
}

export default function TaskCard({ task, renderActions }: TaskCardProps) {
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
      <td>{renderActions(task)}</td>
    </tr>
  );
}
