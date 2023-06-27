import { apiHousetasks } from "../../api/apiHousetasks";
import { useEffect, useState } from "react";
import type { UserType } from '../../../../shared/types/user.type'
import { useParams } from "react-router-dom";
import { UserList } from '../../components/UserList';
import { LinkButton } from "../../components/LinkButton";

async function getUserList() {
  const res = await apiHousetasks.get(`/users`);
  const data = await res.data;
  return data;
}

export function UserHome() {

  const valorInicial: UserType[] = [];
  const [loading, setLoading] = useState(true);
  const loadingTextStatus = loading ? "Carregando" : "";
  const [userList, setUserList] = useState(valorInicial);
  useEffect(() => {
    setLoading(true);
    getUserList().then((users: UserType[]) => {
      setUserList(users);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between pr-6">
        <h2 className="font-bold mb-3 text-2xl ml-2">Lista de usuários:</h2>
        <LinkButton to={"/user-new/"}>Novo Usuário</LinkButton>
      </div>
      <div>{loadingTextStatus}</div>
      <UserList
        user_list={userList}
        onDelete={(id) => {
          const newUser = userList.filter(
            (user) => user.id !== id
          );
          setUserList(newUser);
        }}
      />
      {/* <PaginationList totalPages={pageTotal} /> */}
    </div>
  );
}
