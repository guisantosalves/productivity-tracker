import React from "react";
import { Modal } from "../../../shared/components/Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TextInput } from "../../../shared/components/TextInput";
import { Plus, Search, SpaceIcon } from "lucide-react";
import { Button } from "../../../shared/components/Button";
import type { TaskCategory } from "../domain/task_category";

interface ModalFormTaskCategoryProps {
  open: boolean;
  onClose: () => void;
  createCategory: (title: TaskCategory) => void;
}

interface FormTaskCategory {
  title: string;
}

export const ModalFormTaskCategory: React.FC<ModalFormTaskCategoryProps> = ({
  open,
  onClose,
  createCategory,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormTaskCategory>();

  const onSubmit: SubmitHandler<FormTaskCategory> = (data) => {
    const tCateg: TaskCategory = {
      id: undefined,
      title: data.title,
    };
    createCategory(tCateg);
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div>
            <TextInput
              label="Título da categoria"
              error={errors.title && errors.title.message}
              {...register("title", {
                required: "Esse campo é obrigatório",
              })}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              leftIcon={Plus}
              size="lg"
              onClick={() => {
                //saving
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
