import React from "react";
import { Header } from "../shared/Header";
import { ClipboardList } from "lucide-react";

export const TaskPage = () => {
  return (
    <div className="flex-1 h-screen p-4">
      <Header title="Tarefas" Icon={ClipboardList} />
      <div></div>
    </div>
  );
};
