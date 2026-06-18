import { TaskRepository } from "./repositories/task_repository";
import { TaskUsecase } from "./usecase/task_usecase";

const taskRepo = new TaskRepository();
export const taskService = new TaskUsecase(taskRepo);
