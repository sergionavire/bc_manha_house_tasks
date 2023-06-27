import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { Button } from "../../components/Button";
import { ButtonDelete } from "../../components/ButtonDelete";
import { NavigationSteps } from "../../components/NavigationSteps";
import type { UserType } from '../../../../shared/types/user.type'

export function UserView() {
  const params = useParams();
  const navigate = useNavigate();
  const initialUser: UserType = {
    id: 0,
    email: "Sergio",
    first_name: "",
    last_name: "",
    created_at: "",
  };

  const [user, setUser] = useState(initialUser);
  useEffect(() => {
    apiHousetasks.get(`/users/${params.id}`).then((res) => {
      const user = res.data[0];
      setUser(user);
    });
  }, []);
  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: `/user-view/${user.id}`, title: "User" },
        ]}
      />
      <div className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5">
        <div className="text-slate-500">
          <span className="font-bold">Id:</span> {user.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {user.created_at}
        </div>
        <div className="font-bold text-2xl">{user.first_name} {user.last_name}</div>
        <div className="font-bold text-l">{user.email}</div>
        <div className="flex flex-row gap-5">
          <ButtonDelete urlToSend={`/users/${user.id}`} successUrl="/user/" successMessage="Usuário deletado com sucesso!" className="w-1/2" />
          <Button
            className="w-1/2"
            onClick={() => {
              navigate(`/user-update/${user.id}`);
            }}
          >
            Alterar
          </Button>
        </div>
      </div>
    </div>
  );
}
