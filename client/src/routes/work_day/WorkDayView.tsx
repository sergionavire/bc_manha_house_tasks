import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { Button } from "../../components/Button";
import { ButtonDelete } from "../../components/ButtonDelete";
import { NavigationSteps } from "../../components/NavigationSteps";
import type { WorkDayShowType } from '../../../../shared/types/workDay.type'
import type { WorkDayTaskType } from '../../../../shared/types/workDayTask.type'
import { WorkDayTaskList } from "../../components/WorkDayTaskList";
import { message } from "../../utils/message";

export function WorkDayView() {
  const params = useParams();
  const navigate = useNavigate();
  const initialWorkDay: WorkDayShowType = {
    id: 0,
    house_nickname: '',
    user_worker_name: '',
    work_date: "",
    description: "",
    created_at: ""
  };
  const initialWorkDayTask: WorkDayTaskType[] = [];

  const [workDay, setWorkDay] = useState(initialWorkDay);
  const [workDayTaskList, setWorkDayTaskList] = useState(initialWorkDayTask);
  const [newTask, setNewTask] = useState("");
  const [workDate, setWorkDate] = useState("");
  

  useEffect(() => {
    let workDay = initialWorkDay;
    apiHousetasks.get(`/work_days/to-show/${params.id}`).then((res) => {
      workDay = res.data[0];
      setWorkDay(workDay);
      const date = new Date(workDay.work_date).toLocaleDateString('pt-BR');
      setWorkDate(date);
    })
    .catch(function (error){
      setWorkDay(workDay);
    });
    let workDayTaskList: WorkDayTaskType[] = [] ;
    apiHousetasks.get(`/work_day_tasks/work_day/${params.id}`)
    .then((res) => {
      workDayTaskList = res.data;
      setWorkDayTaskList(workDayTaskList);
    })
    .catch(function (error){
      workDayTaskList = [];
      setWorkDayTaskList(workDayTaskList);
    });
    
  }, []);
  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: `/workday-view/${workDay.id}`, title: "WorkDay" },
        ]}
      />
      <div className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5">
        <div className="text-slate-500">
          <span className="font-bold">Id:</span> {workDay.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {workDay.created_at}
        </div>
        <div className="flex text-2xl">
          <div className="font-bold pr-3">House:</div>
          <div className="flex-1">{workDay.house_nickname}</div>
        </div>
        <div className="flex text-1xl">
          <div className="font-bold pr-3">Trabalhador:</div>
          <div className="flex-1">{workDay.user_worker_name}</div>
        </div>
        <div className="flex text-1xl">
          <div className="font-bold pr-3">Data serviço:</div>
          <div className="flex-1">{workDate}</div>
        </div>
        <div className="flex text-1xl">
          <div className="font-bold pr-3">Descrição:</div>
          <div className="flex-1">{workDay.description}</div>
        </div>
        <div className="flex text-1xl">
          <div className="font-bold pr-3">Data da criação:</div>
          <div className="flex-1">{workDay.created_at}</div>
        </div>
        <div className="flex flex-row gap-5">
          <ButtonDelete urlToSend={`/work_days/${workDay.id}`} successUrl="/workday/" successMessage="Dia de trabalho deletado com sucesso!" className="w-1/2" />
          <Button
            className="w-1/2"
            onClick={() => {
              navigate(`/workday-update/${workDay.id}`);
            }}
          >
            Alterar
          </Button>
        </div>
        <div>
          <WorkDayTaskList workDayTaskList={workDayTaskList} onDelete={(id) => {
            const newWorkDayTask = workDayTaskList.filter(
              (workDayTask) => workDayTask.id !== id
            );
            setWorkDayTaskList(newWorkDayTask);
          }} />
        </div>
        <div className="flex w-full">
          <form className="w-full" onSubmit={async (event) => {
          event.preventDefault();
          const sendObject: Partial<WorkDayTaskType> = {
            work_day_id: workDay.id,
            description: newTask
          }
          if (newTask.length === 0) {
            alert("A tarefa precisa ser preenchida");
            return;
          }
          const res = await apiHousetasks.post(`/work_day_tasks/`, sendObject);
          const createWorkDayTaskResponse = res.data;
          
          if (createWorkDayTaskResponse.success) {
            message("Tarefa criada com sucesso", true);
          } else {
            message("Houve algum erro na criação", false);
          }
          
          setWorkDayTaskList([...workDayTaskList, createWorkDayTaskResponse.workDayTask]);
          setNewTask("");
        }}>
          <textarea
            placeholder="Digite uma tarefa"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            className="h-36 resize-none font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
          />
          <div>
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Inserir tarefa
          </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
