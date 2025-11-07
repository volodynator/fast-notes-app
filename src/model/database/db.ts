import Dexie, { type EntityTable } from 'dexie';
import type { Priority, Task } from '../types';

const db = new Dexie('TasksDatabase') as Dexie & {
  tasks: EntityTable<
    Task,
    'id' // primary key "id" (for the typings only)
  >;
  priorities: EntityTable<Priority, 'name'>;
};

// Schema declaration:
db.version(1).stores({
  tasks: '++id, title, description, completed, category, priority, dueDate', // primary key "id" (for the runtime!)
  priorities: 'name, color',
});

export { db };
