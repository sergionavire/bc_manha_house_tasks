import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { message } from "../../utils/message";
import { NavigationSteps } from "../../components/NavigationSteps";
import type { UserType } from '../../../../shared/types/user.type'


export function UserUpdate() {
  const params = useParams();
  const navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    apiHousetasks.get(`/users/${params.id}`).then((item) => {
      setCreatedAt(item.data[0].created_at);
      setFirstName(item.data[0].first_name);
      setLastName(item.data[0].last_name);
      setEmail(item.data[0].email);
    });
  }, []);

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/user-update/", title: "Atualizar" },
        ]}
      />
      <form
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          if (first_name.length === 0) {
            alert("O título deve ser preenchido");
            return;
          }
          if (last_name.length === 0) {
            alert("O subtítulo deve ser preenchido");
            return;
          }
          if (email.length === 0) {
            alert("O email deve ser preenchido");
            return;
          }
          const sendObject = {
            first_name,
            last_name,
            email,
          };

          const res = await apiHousetasks.put(
            `/users/${params.id}`,
            sendObject
          );
          const updateUserResponse = res.data;

          if (updateUserResponse.success) {
            message("O user foi alterado com sucesso", true);
            navigate(`/user-view/${params.id}`);
          } else {
            message("Houve algum erro na alteração do user", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> {params.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {createdAt}
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Nome
            <input
              type="text"
              id="name"
              value={first_name}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              className="text-2xl bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Sobrenome
            <input
              type="text"
              value={last_name}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              className="font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Email
            <input
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
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
