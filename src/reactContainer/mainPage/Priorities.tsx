import type { Priority } from '../../model';
import PriorityCard from './Priority';
import '../../css/TaskList.css';

interface PriorityListProps {
  priorities: Priority[];
  onUpdated: () => void;
}

export function PriorityList({ priorities, onUpdated }: PriorityListProps) {
  return (
    <table>
      <tr>
        <th>Priority</th>
        <th>Color</th>
        <th>Actions</th>
      </tr>
      {priorities.map((priority) => (
        <PriorityCard priority={priority} onUpdated={onUpdated} />
      ))}
    </table>
  );
}
