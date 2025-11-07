import { Trash2, Check } from 'lucide-react';
import type { Task } from '../../model';
import '../../css/TaskCard.css';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="task-card">
      <div className="task-card__top">
        <div className="task-card__priority">{task.priority.name}</div>

        <div className="task-card__meta">
          <span className="task-card__category">{task.category}</span>
          <div className="task-card__date-time">
            <span>{task.dueDate.toLocaleDateString()}</span>
            <span>
              {task.dueDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <div className="task-card__content">
          <div className="task-card__title">{task.title}</div>
          <div className="task-card__description">{task.description}</div>
        </div>
      </div>

      <div className="task-card__footer">
        <button className="task-card__button delete">
          <Trash2 size={18} />
        </button>
        <button className="task-card__button check">
          <Check size={20} />
        </button>
      </div>
    </div>
  );
}
