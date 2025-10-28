import type { Priority } from "./Priority";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  priority: Priority;
  dueDate: Date;
}