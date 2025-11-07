import { manager, type Task } from '../../model';
import { useState } from 'react';
import { revivedClassifier } from '../../classifier/classifier';

export function TaskCreator({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState({ name: 'priority', color: 'red' });
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');

  async function classify(task: string): Promise<string> {
    const result = await revivedClassifier.categorize(task);
    return result;
  }

  async function addTask() {
    try {
      let finalCategory = category;

      if (category === '') {
        console.log('Category empty');
        finalCategory = await classify(title);
      }

      const newTask = {
        title: title,
        description: description,
        completed: completed,
        category: finalCategory,
        priority: priority,
        dueDate: dueDate,
      } as Task;

      const id = manager.create(newTask);

      setStatus(`Task ${title} successfully added. Got id ${id}`);
      setTitle('');
      setDescription('');
      setCompleted(false);
      setCategory('');
      setPriority({ name: 'priority', color: 'red' });
      setDueDate(new Date());
      onTaskAdded();
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
      <button onClick={addTask}>Add</button>
    </>
  );
}
