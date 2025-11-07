import Dexie, { type EntityTable } from 'dexie';
import type { Task } from '../types';

const db = new Dexie('TasksDatabase') as Dexie & {
  tasks: EntityTable<
    Task,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tasks: '++id, title, description, completed, category, priority, dueDate', // primary key "id" (for the runtime!)
});

export { db };
