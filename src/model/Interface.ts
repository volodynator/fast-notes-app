import type { Task } from "./Types";

export interface Model {
    createTask(task: Task): void;
    readTask(id: string): Task;
    updateTask(task: Task): void;
    deleteTask(id: string): void;
    getTasks(): Task[];
}
