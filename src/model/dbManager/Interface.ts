import type { Priority, Task } from '../types';

export interface DBManager {
  createTask(task: Task): Promise<string>;
  readTask(id: string): Promise<Task>;
  updateTask(id: string, updatedTask: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;

  createPriority(task: Priority): Promise<string>;
  readPriority(name: string): Promise<Priority>;
  updatePriority(name: string, updatedPriority: Priority): Promise<void>;
  deletePriority(name: string): Promise<void>;
}
