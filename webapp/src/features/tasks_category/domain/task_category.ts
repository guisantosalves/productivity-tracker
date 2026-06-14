export interface TaskCategory {
  id?: string;
  title: string;
}

export interface ITaskCategoryRepository {
  CreateTaskCategory(taskC: TaskCategory): Promise<boolean>;
  List(): Promise<TaskCategory[]>;
  Delete(id: string): Promise<boolean>;
  FindById(id: string): Promise<TaskCategory>;
}

export interface ITaskCategoryUsecase {
  CreateTaskCategory(taskC: TaskCategory): Promise<boolean>;
  List(): Promise<TaskCategory[]>;
  Delete(id: string): Promise<boolean>;
  FindById(id: string): Promise<TaskCategory | null>;
}
