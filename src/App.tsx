import { DBManagerImpl, type Task } from "./model";
import { TaskList } from "./reactContainer";

const dbManager = new DBManagerImpl();
await dbManager.clearAllTasks();

const task1 =
    {
      id: "1",
      title: "Prepare presentation",
      description: "Finish slides and rehearse before meeting.",
      completed: false,
      category: "Work",
      priority: {name: "Срочно!", color:""},
      dueDate: new Date()
    } as Task;

await dbManager.create(task1);

const tasks = await dbManager.showActiveTasks();

export const App = () => (
    <>
      <h1>Fast-Notes prototype</h1>
        <TaskList tasks={tasks}/>
    </>
);
