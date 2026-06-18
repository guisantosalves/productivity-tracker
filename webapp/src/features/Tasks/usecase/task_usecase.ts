import type { ITaskRepository, ITaskUsecase, Task } from "../domain/task";

export class TaskUsecase implements ITaskUsecase {
  private readonly taskRepo: ITaskRepository;
  constructor(taskRepo: ITaskRepository) {
    this.taskRepo = taskRepo;
  }
  async CreateTask(task: Task): Promise<boolean> {
    try {
      return await this.taskRepo.CreateTask(task);
    } catch (error) {
      return false;
    }
  }

  async UpdateTask(task: Task): Promise<boolean> {
    try {
      return await this.taskRepo.UpdateTask(task);
    } catch (error) {
      return false;
    }
  }

  async Delete(id: string): Promise<boolean> {
    try {
      return await this.taskRepo.Delete(id);
    } catch (error) {
      return false;
    }
  }

  async ListTask(): Promise<Task[]> {
    try {
      return this.taskRepo.ListTask();
    } catch (error) {
      return [];
    }
  }

  async FindTaskById(id: string): Promise<Task | null> {
    try {
      return this.taskRepo.FindTaskById(id);
    } catch (error) {
      return null;
    }
  }
}
