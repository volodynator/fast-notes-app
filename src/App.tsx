import { manager, type Priority, type Task } from './model';
import { useEffect, useState } from 'react';
import { TaskList } from './reactContainer';
import { TaskCreator } from './reactContainer';
import { PriorityList } from './reactContainer/mainPage/Priorities';
import { PriorityCreator } from './reactContainer/mainPage/PriorityCreator';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);

  async function reloadTasksAndPriorities() {
    const tasks = await manager.showActiveTasks();
    const priorities = await manager.showPriorities();
    setTasks(tasks);
    setPriorities(priorities);
  }

  async function clearTasksAndReload() {
    manager.clearAllTasks();
    reloadTasksAndPriorities();
  }

  useEffect(() => {
    reloadTasksAndPriorities();
  }, []);

  return (
    <div>
      <h1>Active Tasks</h1>
      <TaskList tasks={tasks} />
      <button onClick={clearTasksAndReload}>Clear Tasks</button>
      <h1>Add new task</h1>
      <TaskCreator onTaskAdded={reloadTasksAndPriorities} />
      <h1>Priorities</h1>
      <PriorityList priorities={priorities} />
      <h1>Add new priority</h1>
      <PriorityCreator onPriorityAdded={reloadTasksAndPriorities} />
    </div>
  );
}
