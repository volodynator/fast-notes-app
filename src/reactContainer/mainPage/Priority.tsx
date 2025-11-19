import { manager, type Priority } from '../../model';
import '../../css/TaskCard.css';

interface PriorityProps {
  priority: Priority;
  onUpdated: () => void;
}

export default function PriorityCard({ priority, onUpdated }: PriorityProps) {
  return (
    <tr>
      <td>{priority.name}</td>
      <td style={{ backgroundColor: priority.color }}>{priority.color}</td>
      <td>
        <button
          onClick={() => {
            manager.deletePriority(priority.name);
            onUpdated();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
