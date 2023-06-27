import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import type { WorkDayTaskType } from '../../../shared/types/workDayTask.type'
import { message } from "../utils/message";
import { Button } from "./Button";
import { ButtonDelete } from "./ButtonDelete";
import { TextareaField } from "./TextareaField";

type WorkDayTaskListProps = {
  workDayTaskList: WorkDayTaskType[];
  onDelete: (id: number) => void;
};

export function WorkDayTaskList({ workDayTaskList, onDelete }: WorkDayTaskListProps) {
  const navigate = useNavigate();

  return (
    <div className="ml-4 divide-y">
      <h3 className="flex justify-center pt-4 font-bold">Tarefas</h3>
      {workDayTaskList.map((workDayTask, index) => {
        return (
          <div key={workDayTask.id} className="flex">
            <div className="flex-grow py-4 block ">
              <h3 className="font-semibold text-xl">{index + 1}. {workDayTask.description}</h3>
            </div>
            <div className="flex flex-col align-middle">
              <Button
                className={`bg-red-600 w-28`}
                onClick={async () => {
                  const res = await apiHousetasks.delete(
                    `/work_day_tasks/${workDayTask.id}`
                  );
                  const deleteWorkDayTaskResponse = res.data;

                  if (deleteWorkDayTaskResponse.success) {
                    message("A tarefa foi excluída com sucesso", true);
                    onDelete(workDayTask.id);
                  } else {
                    message("Houve algum erro na exclusão", false);
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
