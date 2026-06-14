import type {
  ITaskCategoryRepository,
  ITaskCategoryUsecase,
  TaskCategory,
} from "../domain/task_category";

export class TaskCategoryUsecase implements ITaskCategoryUsecase {
  private readonly taskRepo: ITaskCategoryRepository;
  constructor(taskRepo: ITaskCategoryRepository) {
    this.taskRepo = taskRepo;
  }

  async CreateTaskCategory(taskC: TaskCategory): Promise<boolean> {
    try {
      return await this.taskRepo.CreateTaskCategory(taskC);
    } catch {
      return false;
    }
  }

  async List(): Promise<TaskCategory[]> {
    try {
      return await this.taskRepo.List();
    } catch {
      return [];
    }
  }

  async Delete(id: string): Promise<boolean> {
    try {
      return await this.taskRepo.Delete(id);
    } catch {
      return false;
    }
  }

  async FindById(id: string): Promise<TaskCategory | null> {
    try {
      return await this.taskRepo.FindById(id);
    } catch {
      return null;
    }
  }
}
