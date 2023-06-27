import { apiHousetasks } from "../../api/apiHousetasks";
import { useEffect, useState } from "react";
import type { WorkDayShowType } from '../../../../shared/types/workDay.type'
import { useParams } from "react-router-dom";
import { WorkDayList } from '../../components/WorkDayList';
import { LinkButton } from "../../components/LinkButton";

async function getWorkDayList() {
  const res = await apiHousetasks.get(`/work_days`);
  const data = await res.data;
  return data;
}

export function WorkDayHome() {

  const valorInicial: WorkDayShowType[] = [];
  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [workDayList, setWorkDayList] = useState(valorInicial);
  useEffect(() => {
    setLoading(true);
    getWorkDayList().then((workDays: WorkDayShowType[]) => {
      setWorkDayList(workDays);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between pr-6">
        <h2 className="font-bold mb-3 text-2xl ml-2">Dias de trabalho:</h2>
        <LinkButton to={"/workday-new/"}>Cadastrar novo dia</LinkButton>
      </div>
      <div>{loadingTextStatus}</div>
      <WorkDayList
        workDay_list={workDayList}
        onDelete={(id) => {
          const newWorkDay = workDayList.filter(
            (workDay) => workDay.id !== id
          );
          setWorkDayList(newWorkDay);
        }}
      />
      {/* <PaginationList totalPages={pageTotal} /> */}
    </div>
  );
}
