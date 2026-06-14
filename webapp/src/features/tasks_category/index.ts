import { TaskCategoryRepository } from "./repositories/task_category_repo";
import { TaskCategoryUsecase } from "./usecase/task_category_usecase";

// DI
const taskCategoryRepository = new TaskCategoryRepository();
export const taskCategoryService = new TaskCategoryUsecase(
  taskCategoryRepository,
);
