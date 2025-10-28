import {useState} from "react";
import {db} from "./model/database/db.ts";
import {useLiveQuery} from "dexie-react-hooks";

export function AddTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState({name: "priority", color: "red"});
  const [dueDate, setDueDate] = useState(new Date());
  const [status, setStatus] = useState('');

  async function addTask() {
    try {
      // Add the new friend!
      const id = await db.tasks.add({
        title,
        description,
        completed,
        category,
        priority,
        dueDate
      });

      setStatus(`Task ${title} successfully added. Got id ${id}`);
      setTitle('');
      setDescription('');
      setCompleted(false);
      setCategory('');
      setPriority({name: "priority", color: "red"});
      setDueDate(new Date());

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

export function TasksList() {
  const friends = useLiveQuery(() => db.tasks.toArray());

  return (
      <ul>
        {friends?.map((task) => (
            <li key={task.id}>
              {task.title}, {task.description}, {task.category}, {task.priority.name}, {task.dueDate.toISOString()};
            </li>
        ))}
      </ul>
  );
}

export const App = () => (
    <>
      <h1>My simple Dexie app</h1>

      <h2>Add Task</h2>
      <AddTaskForm />

      <h2>Tasks</h2>
      <TasksList  />
    </>
);
