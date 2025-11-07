import {manager, type Task} from "./model";
import { useEffect, useState } from "react";
import {TaskList} from "./reactContainer";
import {TaskCreator} from "./reactContainer";
import { revivedClassifier } from "./classifier/classifier";

export function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    async function reloadTasks() {
        const result = await manager.showActiveTasks();
        setTasks(result);
    }

    async function classify(task: string) {
        const result = await revivedClassifier.categorize(task);
        console.log(result);
    }

    useEffect(() => {
        reloadTasks();
        classify("Уборка");
    }, []);

    return (
        <div>
            <h1>Active Tasks</h1>
            <TaskList tasks={tasks}/>
            <h1>Add new task</h1>
            <TaskCreator onTaskAdded={reloadTasks}/>
        </div>
    );
}

