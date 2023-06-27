import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { message } from "../../utils/message";
import { NavigationSteps } from "../../components/NavigationSteps";
import { SelectHouse } from "../../components/SelectHouse";
import { SelectUser } from "../../components/SelectUser";
import type { WorkDayType } from '../../../../shared/types/workDay.type';
// import type { UserSelectType } from '../../../../shared/types/user.type'
// import type { HouseSelectType } from '../../../../shared/types/house.type';

function isValidDate(dateString: string) {
  let pattern = /^\d{2}[/]\d{2}[/]\d{4}$/;
  return pattern.test(dateString);
}

type HouseSelectType = {
  id: number;
  nickname: string;
}
type UserSelectType = {
  id: number;
  first_name: string;
  last_name: string;
}

const HouseSelectTypeInitial: HouseSelectType[] = [];
const UserSelectTypeInitial: UserSelectType[] = [];


export function WorkDayNew() {
  const params = useParams();
  const navigate = useNavigate();

  const [house_id, setHouseId] = useState(1);
  const [users_id_worker, setUsersIdWorker] = useState(1);
  const [work_date, setWorkDate] = useState("");
  const [description, setDescription] = useState("");

  const [houseSelectList, setHouseSelectList] = useState(HouseSelectTypeInitial);
  const [userSelectList, setUserSelectList] = useState(UserSelectTypeInitial);

  useEffect(() => {
    apiHousetasks.get(`/houses/select/`).then((item) => {
      const houseSelectList: HouseSelectType[] = item.data;
      setHouseSelectList(houseSelectList);
    });
    apiHousetasks.get(`/users/select/`).then((item) => {
      const userSelectList: UserSelectType[] = item.data;
      setUserSelectList(userSelectList);
    });
  }, []);

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/workDay-update/", title: "Atualizar" },
        ]}
      />
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          // console.log(work_date);
          // console.log(isValidDate(work_date));
          if (house_id === 1) {
            alert("Deve selecionar algum imóvel");
            return;
          }
          if (users_id_worker === 1) {
            alert("Deve selecionar algum trabalhador");
            return;
          }
          if (!isValidDate(work_date)) {
            alert("A data deve ser preenchida corretamente");
            return;
          }
          if (description.length === 0) {
            alert("A descrição do dia deve ser preenchida");
            return;
          }
          const sendObject = {
            house_id,
            users_id_worker,
            work_date,
            description
          };

          const res = await apiHousetasks.post(
            `/work_days/`,
            sendObject
          );
          const updateWorkDayResponse = res.data;
          console.log(updateWorkDayResponse);
          

          if (updateWorkDayResponse.success) {
            message("O workDay foi alterado com sucesso", true);
            navigate(`/workday-view/${updateWorkDayResponse.workDay.id}`);
          } else {
            message("Houve algum erro na alteração do workDay", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> {params.id}
        </div>
        <div>
          <label className="text-gray-500 text-sm flex">
            <div className="font-bold pr-3">
              Imóvel:
            </div>
            <div className="flex-1">
              <SelectHouse
                id="select-house"
                house_select_list={houseSelectList}
                house_id_selected={house_id}
                onChange={(house_id) => setHouseId(Number(house_id))}
              />
            </div>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm flex">
            <div className="font-bold pr-3">
              Trabalhador:
            </div>
            <div className="flex-1">
              <SelectUser
                id="select-user-worker"
                user_select_list={userSelectList}
                user_id_selected={users_id_worker}
                onChange={(users_id_worker) => setUsersIdWorker(Number(users_id_worker))}
              />
            </div>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm flex">
            <div className="font-bold pr-3 h-full flex pt-3">
              Data do trabalho:
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={work_date}
                onChange={(event) => {
                  setWorkDate(event.target.value);
                }}
                className="font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-full pl-3 focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm flex">
            <div className="font-bold pr-3 h-full flex pt-3">
              Descrição:
            </div>
            <div className="flex-1">
              <textarea
                placeholder="Digite uma tarefa"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="h-36 resize-none font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
              />
            </div>
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Alterar
          </button>
        </div>
      </form>
    </div>
  );
}
