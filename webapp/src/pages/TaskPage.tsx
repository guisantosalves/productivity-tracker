import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../shared/Header";
import { ClipboardList, Delete, PenBoxIcon, Plus } from "lucide-react";
import { Table, type Column } from "../shared/components/Table";
import type { Task } from "../features/Tasks/domain/task";
import { taskService } from "../features/Tasks";
import { toast } from "../shared/components/Toast";
import { Button } from "../shared/components/Button";
import { ModalFormTask } from "../features/Tasks/ui/ModalFormTask";

export const TaskPage = () => {
  const [task, setTask] = useState<Task[]>([]);
  const [selectedTaskEdit, setSelectedTaskEdit] = useState<Task | undefined>(
    undefined,
  );
  const [mdOpen, setMdOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState(false);

  const fetchCategoryList = useCallback(async () => {
    setIsloading(true);
    const data = await taskService.ListTask();
    setTask(data);
    setIsloading(false);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    const data = await taskService.Delete(id);
    if (data) {
      toast.success("Deletado com sucesso!");
      fetchCategoryList();
    } else {
      toast.error("Erro ao Deletar!");
    }
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    setIsloading(true);
    const data = await taskService.UpdateTask(task);
    if (data) {
      toast.success("Atualizado com sucesso com sucesso!");
      fetchCategoryList();
      setMdOpen(false);
    } else {
      toast.error("Erro ao atualizar!");
    }
    setIsloading(false);
  }, []);

  const createTask = useCallback(async (task: Task) => {
    setIsloading(true);
    const data = await taskService.CreateTask(task);
    if (data) {
      toast.success("Atualizado com sucesso com sucesso!");
      fetchCategoryList();
      setMdOpen(false);
    } else {
      toast.error("Erro ao atualizar!");
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);

  const columns: Column<Task>[] = [
    { key: "title", header: "Título" },
    { key: "type.title", header: "Categoria" },
    { key: "dateStart", header: "Data início" },
    { key: "dateEnd", header: "Data fim" },
    { key: "descricao", header: "Descricao" },
    {
      key: "btn",
      header: "",
      render: (row) => (
        <div className="flex gap-3">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (row.id) {
                setSelectedTaskEdit(row);
                setMdOpen(true);
              }
            }}
          >
            <PenBoxIcon />
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => (row.id ? deleteTask(row.id) : undefined)}
          >
            <Delete />
          </span>
        </div>
      ),
    },
  ];
  return (
    <div className="flex-1 h-screen p-4">
      <Header title="Tarefas" Icon={ClipboardList} />
      <div>
        <Table
          columns={columns}
          data={task}
          emptyMessage="Sem Categorias."
          loading={isLoading}
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
      <ModalFormTask
        createTask={(item) => createTask(item)}
        onClose={() => {
          setMdOpen(false);
        }}
        open={mdOpen}
        selected={selectedTaskEdit}
        updateTask={(item) => updateTask(item)}
      />
    </div>
  );
};
