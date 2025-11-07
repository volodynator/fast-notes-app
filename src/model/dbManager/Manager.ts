import type { Task } from '../types';
import type { DBManager } from './Interface';
import { db } from '../database';
import { TaskNotFoundError } from '../../error/TaskNotFoundError';

class DBManagerImpl implements DBManager {
  async create(task: Task): Promise<string> {
    const id = await db.tasks.add(task);
    return id;
  }

  async read(id: string): Promise<Task> {
    const task = await db.tasks.get({ id: id });
    if (task) {
      return task;
    } else {
      throw new TaskNotFoundError(id);
    }
  }

  async update(id: string, updatedTask: Task): Promise<void> {
    const existing = await db.tasks.get(id);
    if (!existing) {
      throw new TaskNotFoundError(id);
    }
    await db.tasks.update(id, { ...existing, ...updatedTask });
  }

  async delete(id: string): Promise<void> {
    await db.tasks.delete(id);
  }

  async completeTask(id: string): Promise<void> {
    await db.tasks.update(id, { completed: true });
  }

  async showActiveTasks(): Promise<Task[]> {
    return db.tasks.toArray();
  }

  async showInActiveTasks(): Promise<Task[]> {
    return db.tasks.where('completed').equals('true').toArray();
  }

  async clearAllTasks(): Promise<void> {
    await db.tasks.clear();
  }
}

export const manager: DBManagerImpl = new DBManagerImpl();
