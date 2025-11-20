import { manager, type Priority, type Task } from './model';
import { useEffect, useState } from 'react';
import { TaskList } from './reactContainer';
import { TaskCreator } from './reactContainer';
import { PriorityList } from './reactContainer/mainPage/priorities';
import { PriorityCreator } from './reactContainer/mainPage/priorities';
import './css/App.css';
import './css/Button.css';
import './css/Form.css';
import './css/Table.css';

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
    await manager.clearAllTasks();
    await reloadTasksAndPriorities();
  }

  useEffect(() => {
    reloadTasksAndPriorities();
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="section">
          <h1>Active Tasks</h1>
          <TaskList tasks={tasks} onUpdated={reloadTasksAndPriorities} />
        </div>

        <div className="section">
          <h1>Add new task</h1>
          <TaskCreator
            priorities={priorities}
            onUpdated={reloadTasksAndPriorities}
          />
        </div>

        <button
          className="secondary clear-button"
          onClick={clearTasksAndReload}
        >
          Clear Tasks
        </button>
      </div>
      <div className="sidebar">
        <div className="section">
          <h1>Priorities</h1>
          <PriorityList
            priorities={priorities}
            onUpdated={reloadTasksAndPriorities}
          />
        </div>

        <div className="section">
          <h2>Add new priority</h2>
          <PriorityCreator onPriorityAdded={reloadTasksAndPriorities} />
        </div>
      </div>
    </div>
  );
}
