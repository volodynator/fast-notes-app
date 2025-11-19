import { manager, type Priority, type Task } from '../../model';
import { useState } from 'react';
import { revivedClassifier } from '../../classifier/classifier';

interface TaskCreatorProps {
  priorities: Priority[];
  onUpdated: () => void;
}

export function TaskCreator({ priorities, onUpdated }: TaskCreatorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | undefined>();
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');

  async function classify(task: string): Promise<string> {
    const result = await revivedClassifier.categorize(task);
    return result;
  }

  async function addTask() {
    try {
      let finalCategory = category;

      if (title.length > 0) {
        if (category === '') {
          console.log('Category empty');
          finalCategory = await classify(title);
        }

        const taskPriority = selectedPriority ?? { name: "Unspecified", color: "#000000" };

        const newTask = {
          title: title,
          description: description,
          completed: completed,
          category: finalCategory,
          priority: taskPriority,
          dueDate: dueDate,
        } as Task;

        const id = await manager.createTask(newTask);
        console.log(await manager.showActiveTasks());

        setStatus(`Task ${title} successfully added. Got id ${id}`);
        setTitle('');
        setDescription('');
        setCompleted(false);
        setCategory('');
        setSelectedPriority(undefined);
        setDueDate(new Date());
        onUpdated();
      }
    } catch (error) {
      setStatus(`Failed to add ${title}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Title:
      <input
        type="text"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      Description:
      <input
        type="text"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      Category:
      <input
        type="text"
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
      />
      Priority:
      {
        <select
          value={selectedPriority?.name ?? ''}
          onChange={(e) => {
            const name = e.target.value;
            const pr = priorities.find((p) => p.name === name);
            setSelectedPriority(pr);
          }}
        >
          <option value="">Please choose one option</option>

          {priorities.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
      }
      <button onClick={addTask}>Add</button>
    </>
  );
}
