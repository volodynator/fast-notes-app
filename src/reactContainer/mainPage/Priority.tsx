import type { Priority } from '../../model';
import '../../css/TaskCard.css';

interface PriorityProps {
  priority: Priority;
}

export default function PriorityCard({ priority }: PriorityProps) {
  return (
    <tr>
      <td>{priority.name}</td>
      <td style={{ backgroundColor: priority.color }}>{priority.color}</td>
    </tr>
  );
}
