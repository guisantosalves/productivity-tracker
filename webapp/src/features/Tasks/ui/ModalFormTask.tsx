import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../shared/components/Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextInput } from "../../../shared/components/TextInput";
import { Plus } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import type { Task } from "../domain/task";
import type { TaskCategory } from "../../tasks_category/domain/task_category";
import { taskService } from "..";
import { taskCategoryService } from "../../tasks_category";
import { toast } from "../../../shared/components/Toast";
import { toDateTimeLocal } from "../../../lib/date";

interface ModalFormTaskProps {
  open: boolean;
  onClose: () => void;
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  selected: Task | undefined;
}

interface FormTask {
  title: string;
  typeId: string;
  dateStart: string;
  dateEnd: string;
  descricao: string;
}

export const ModalFormTask: React.FC<ModalFormTaskProps> = ({
  open,
  onClose,
  createTask,
  selected,
  updateTask,
}) => {
  const [categories, setCategories] = useState<TaskCategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormTask>();

  const isEditing = !!selected?.id;

  useEffect(() => {
    taskCategoryService.List().then((list) => setCategories(list ?? []));
  }, []);

  const fillData = (data: Task) => {
    console.log(data);
    setValue("title", data.title);
    setValue("typeId", data.type.id!);
    setValue("descricao", data.descricao);
    setValue("dateStart", toDateTimeLocal(data.dateStart));
    setValue("dateEnd", toDateTimeLocal(data.dateEnd));
  };

  const fetchTaskData = useCallback(async () => {
    if (!selected?.id) return;
    const retrievedData = await taskService.FindTaskById(selected.id);
    if (!retrievedData) {
      toast.error("Impossível buscar a Task");
      return;
    }
    fillData(retrievedData);
  }, [selected]);

  useEffect(() => {
    if (selected?.id) {
      fetchTaskData();
    } else {
      reset();
    }
  }, [fetchTaskData, selected]);

  const onSubmit: SubmitHandler<FormTask> = (data) => {
    if (!data.dateStart || !data.dateEnd || !data.descricao || !data.title) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }
    if (data.dateStart > data.dateEnd) {
      toast.error("Data início incorreta");
      return;
    }
    const task: Task = {
      id: selected?.id,
      title: data.title,
      descricao: data.descricao,
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
      type: {
        id: data.typeId,
        title: "",
      },
    };

    if (isEditing) {
      updateTask(task);
    } else {
      createTask(task);
    }
    reset();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Editar Task" : "Nova Task"}
          </h2>

          <TextInput
            label="Título"
            error={errors.title?.message}
            {...register("title", { required: "Esse campo é obrigatório" })}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Categoria</label>
            <select
              className="w-full rounded-md bg-white border border-border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 hover:border-[#f0d98a]"
              {...register("typeId", { required: "Selecione uma categoria" })}
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.typeId && (
              <span className="text-xs text-red-500">
                {errors.typeId.message}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <TextInput
              label="Data início"
              type="datetime-local"
              error={errors.dateStart?.message}
              containerClassName="flex-1"
              {...register("dateStart", {
                required: "Esse campo é obrigatório",
              })}
            />
            <TextInput
              label="Data fim"
              type="datetime-local"
              error={errors.dateEnd?.message}
              containerClassName="flex-1"
              {...register("dateEnd", { required: "Esse campo é obrigatório" })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              rows={3}
              className="w-full rounded-md bg-white border border-border px-4 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/50 hover:border-[#f0d98a] placeholder:text-[var(--muted-foreground)]"
              placeholder="Descreva a task..."
              {...register("descricao", {
                required: "Esse campo é obrigatório",
              })}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="secondary" leftIcon={Plus} size="lg">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
