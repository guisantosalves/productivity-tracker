import { toLocalIsoString } from "../../../lib/date";
import type {
  ITaskRepository,
  ITaskUsecase,
  Task,
  TaskReq,
} from "../domain/task";

export class TaskUsecase implements ITaskUsecase {
  private readonly taskRepo: ITaskRepository;
  constructor(taskRepo: ITaskRepository) {
    this.taskRepo = taskRepo;
  }
  async CreateTask(task: Task): Promise<boolean> {
    try {
      if (!task.type.id) throw new Error();
      const taskRq: TaskReq = {
        title: task.title,
        descricao: task.descricao,
        type: task.type.id,
        dateEnd: task.dateEnd,
        dateStart: task.dateStart,
      };
      return await this.taskRepo.CreateTask(taskRq);
    } catch (error) {
      return false;
    }
  }

  async UpdateTask(task: Task): Promise<boolean> {
    try {
      if (!task.type.id || !task.id) throw new Error();
      const taskRq: TaskReq = {
        title: task.title,
        descricao: task.descricao,
        type: task.type.id,
        dateEnd: toLocalIsoString(task.dateEnd),
        dateStart: toLocalIsoString(task.dateStart),
      };
      return await this.taskRepo.UpdateTask(task.id, taskRq);
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
