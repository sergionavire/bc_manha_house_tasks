import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import type { UserType } from '../../../shared/types/user.type'
import { message } from "../utils/message";
import { Button } from "./Button";
import { ButtonDelete } from "./ButtonDelete";

type UserListProps = {
  user_list: UserType[];
  onDelete: (id: number) => void;
};

export function UserList({ user_list, onDelete }: UserListProps) {
  const navigate = useNavigate();
  return (
    <div className="ml-4 divide-y">
      {user_list.map((user, index) => {
        return (
          <div
            key={user.id}
            className="flex cursor-pointer hover:bg-slate-100"
          >
            <Link
              to={`/user-view/${user.id}`}
              className="flex-grow py-4 hover:underline block "
            >
              <span>Id: {user.id}</span>
              <h3 className="font-semibold text-xl">{user.first_name} {user.last_name}</h3>
              <p className="text-sm">{user.email}</p>
            </Link>
            <div className="flex flex-col align-middle">
              <Button
                className={`bg-red-600 w-28`}
                onClick={async () => {
                  const res = await apiHousetasks.delete(
                    `/users/${user.id}`
                  );
                  const deleteUserResponse = res.data;

                  if (deleteUserResponse.success) {
                    message("O user foi excluído com sucesso", true);
                    onDelete(user.id);
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
