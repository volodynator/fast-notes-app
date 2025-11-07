export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super();
    console.error(`Task with ID ${id} doesn't exist in the database`);
  }
}
