import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { NavigationSteps } from "../../components/NavigationSteps";
import { TextareaField } from "../../components/TextareaField";
import { TextField } from "../../components/TextField";
import { message } from "../../utils/message";
import type { UserType } from '../../../../shared/types/user.type'

export function UserNew() {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: "/user-new/", title: "Novo" },
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

          const res = await apiHousetasks.post(`/users/`, sendObject);
          const createUserResponse = res.data;
          
          if (createUserResponse.success) {
            message("O usuário foi criado com sucesso", true);
            navigate(`/user-view/${createUserResponse.user.id}`);
          } else {
            message("Houve algum erro na criação", false);
          }
        }}
        className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5"
      >
        <div className="text-slate-500">
          <strong>Id:</strong> Novo
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Nome
            <TextField
              placeholder="Nome"
              value={first_name}
              onChange={(first_name) => setFirstName(first_name)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Sobrenome
            <TextField
              placeholder="Sobrenome"
              value={last_name}
              onChange={(last_name) => setLastName(last_name)}
            />
          </label>
        </div>
        <div>
          <label className="text-gray-500 text-sm">
            Email
            <TextField
              placeholder="Email"
              value={email}
              onChange={(email) => setEmail(email)}
            />
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto"
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
