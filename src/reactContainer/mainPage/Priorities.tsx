import type { Priority } from '../../model';
import PriorityCard from './Priority';
import '../../css/TaskList.css';

interface PriorityListProps {
  priorities: Priority[];
}

export function PriorityList({ priorities }: PriorityListProps) {
  return (
    <table>
      <tr>
        <th>Priority</th>
        <th>Color</th>
      </tr>
      {priorities.map((priority) => (
        <PriorityCard priority={priority} />
      ))}
    </table>
  );
}
