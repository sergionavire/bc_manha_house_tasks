import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import type { WorkDayType, WorkDayShowType } from '../../../shared/types/workDay.type'
import { message } from "../utils/message";
import { Button } from "./Button";
import { ButtonDelete } from "./ButtonDelete";

type WorkDayListProps = {
  workDay_list: WorkDayShowType[];
  onDelete: (id: number) => void;
};

export function WorkDayList({ workDay_list, onDelete }: WorkDayListProps) {
  const navigate = useNavigate();
  return (
    <div className="ml-4 divide-y">
      {workDay_list.map((workDay, index) => {
        // const date = new Date(workDay.work_date).toDateString('');
        const date = new Date(workDay.work_date).toLocaleDateString('pt-BR');
        return (
          <div
            key={workDay.id}
            className="flex cursor-pointer hover:bg-slate-100"
          >
            <Link
              to={`/workday-view/${workDay.id}`}
              className="flex-grow py-4 hover:underline block "
            >
              <span>Id: {workDay.id}</span>
              <h3 className="font-semibold text-xl">{workDay.house_nickname}</h3>
              <p className="text-sm">{date}</p>
              <p className="text-sm">{workDay.user_worker_name}</p>
            </Link>
            <div className="flex flex-col align-middle">
              <Button
                className={`bg-red-600 w-28`}
                onClick={async () => {
                  const res = await apiHousetasks.delete(
                    `/work_days/${workDay.id}`
                  );
                  const deleteWorkDayResponse = res.data;

                  if (deleteWorkDayResponse.success) {
                    message("O dia de trabalho foi excluído com sucesso", true);
                    onDelete(workDay.id);
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
