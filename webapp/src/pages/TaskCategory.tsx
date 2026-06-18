import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../shared/Header";
import { BookmarkCheck, Delete, Plus } from "lucide-react";
import { taskCategoryService } from "../features/tasks_category";
import type { TaskCategory } from "../features/tasks_category/domain/task_category";
import { Table, type Column } from "../shared/components/Table";
import { Button } from "../shared/components/Button";
import { ModalFormTaskCategory } from "../features/tasks_category/ui/ModalFormTaskCategory";
import { toast } from "../shared/components/Toast";

export const TaskCategoryPage = () => {
  const [taskCategories, setTaskCategories] = useState<TaskCategory[]>([]);
  const [mdOpen, setMdOpen] = useState<boolean>(false);

  const fetchCategoryList = useCallback(async () => {
    const data = await taskCategoryService.List();
    setTaskCategories(data);
  }, []);

  const createCategory = useCallback(async (TCategory: TaskCategory) => {
    const data = await taskCategoryService.CreateTaskCategory(TCategory);
    if (data) {
      toast.success("Criado com sucesso!");
      fetchCategoryList();
      setMdOpen(false);
    } else {
      toast.error("Erro ao criar!");
    }
  }, []);

  const deleteCategory = useCallback(async (id: string) => {
    const data = await taskCategoryService.Delete(id);
    if (data) {
      toast.success("Deletado com sucesso!");
      fetchCategoryList();
    } else {
      toast.error("Erro ao Deletar!");
    }
  }, []);

  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);

  const columns: Column<TaskCategory>[] = [
    { key: "title", header: "Título" },
    {
      key: "btn",
      header: "",
      render: (row) => (
        <div className="...">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => (row.id ? deleteCategory(row.id) : undefined)}
          >
            <Delete />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 h-screen p-4">
      <Header title="Categorias de Tarefas" Icon={BookmarkCheck} />
      <div>
        <Table
          columns={columns}
          data={taskCategories}
          emptyMessage="Sem Categorias."
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="secondary"
          leftIcon={Plus}
          size="lg"
          onClick={() => {
            setMdOpen(true);
          }}
        >
          Criar
        </Button>
      </div>
      <ModalFormTaskCategory
        open={mdOpen}
        onClose={() => {
          setMdOpen(false);
        }}
        createCategory={createCategory}
      />
    </div>
  );
};
