import type { TaskCategory } from "../../tasks_category/domain/task_category";

export interface Task {
  id?: string;
  title: string;
  type: TaskCategory;
  dateStart: Date;
  dateEnd: Date;
  descricao: string;
}

export interface ITaskRepository {
  CreateTask(task: Task): Promise<boolean>;
  UpdateTask(task: Task): Promise<boolean>;
  Delete(id: string): Promise<boolean>;
  ListTask(): Promise<Task[]>;
  FindTaskById(id: string): Promise<Task>;
}

export interface ITaskUsecase {
  CreateTask(task: Task): Promise<boolean>;
  UpdateTask(task: Task): Promise<boolean>;
  Delete(id: string): Promise<boolean>;
  ListTask(): Promise<Task[]>;
  FindTaskById(id: string): Promise<Task | null>;
}
