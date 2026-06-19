import { api } from "../../../lib/axios";
import type { ITaskRepository, Task, TaskReq } from "../domain/task";

export class TaskRepository implements ITaskRepository {
  async CreateTask(task: TaskReq): Promise<boolean> {
    await api.post("/task", task);
    return true;
  }

  async UpdateTask(id: string, task: TaskReq): Promise<boolean> {
    await api.put(`/task/${id}`, task);
    return true;
  }

  async Delete(id: string): Promise<boolean> {
    await api.delete(`/task/${id}`);
    return true;
  }

  async ListTask(): Promise<Task[]> {
    const result = await api.get("/task");
    return result.data;
  }

  async FindTaskById(id: string): Promise<Task> {
    const result = await api.get(`/task/${id}`);
    return result.data;
  }
}
