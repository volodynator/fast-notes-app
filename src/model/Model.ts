import type { Model } from "./Interface";
import type { Task } from "./Types";

export class ModelImpl1 implements Model {

    private tasks: Task[] = [];

    public createTask(task: Task): void {
        this.tasks.push(task);
    }

    public readTask(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if(task){
            return task;
        } else {
            throw new Error(`Task with id ${id} not found`);
        }
    }

    public deleteTask(id: string): void {
        const task = this.tasks.find(task => task.id === id);
        if(task){
            this.tasks = this.tasks.filter(task => task.id !== id);
        }
        else {
            throw new Error(`Task with id ${id} not found`);
        }
    }

    public updateTask(task: Task): void {
        this.deleteTask(task.id);
        this.createTask(task);
    }

    public getTasks(): Task[] {
        return this.tasks;
    }
}