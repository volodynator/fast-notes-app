import type { Task } from "../types";

export interface DBManager {
    create(task: Task): Promise<string>;
    read(id: string): Promise<Task>;
    update(id: string, updatedTask: Task): Promise<void>;
    delete(id: string): Promise<void>;
}