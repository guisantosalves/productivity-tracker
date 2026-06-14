import { api } from "../../../lib/axios";
import type {
  ITaskCategoryRepository,
  TaskCategory,
} from "../domain/task_category";

export class TaskCategoryRepository implements ITaskCategoryRepository {
  async CreateTaskCategory(taskC: TaskCategory): Promise<boolean> {
    await api.post("/task-category", taskC);
    return true;
  }
  async List(): Promise<TaskCategory[]> {
    const res = await api.get("/task-category");
    return res.data;
  }
  async Delete(id: string): Promise<boolean> {
    await api.delete(`/task-category/${id}`);
    return true;
  }
  async FindById(id: string): Promise<TaskCategory> {
    const res = await api.get(`/task-category/${id}`);
    return res.data;
  }
}
