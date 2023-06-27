import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import type { HouseType } from '../../../shared/types/house.type'
import { message } from "../utils/message";
import { Button } from "./Button";
import { ButtonDelete } from "./ButtonDelete";

type HouseListProps = {
  house_list: HouseType[];
  onDelete: (id: number) => void;
};

export function HouseList({ house_list, onDelete }: HouseListProps) {
  const navigate = useNavigate();
  return (
    <div className="ml-4 divide-y">
      {house_list.map((house, index) => {
        return (
          <div
            key={house.id}
            className="flex cursor-pointer hover:bg-slate-100"
          >
            <Link
              to={`/house-view/${house.id}`}
              className="flex-grow py-4 hover:underline block "
            >
              <span>Id: {house.id}</span>
              <h3 className="font-semibold text-xl">{house.nickname}</h3>
              <p className="text-sm">{house.address}</p>
            </Link>
            <div className="flex flex-col align-middle">
              <Button
                className={`bg-red-600 w-28`}
                onClick={async () => {
                  const res = await apiHousetasks.delete(
                    `/houses/${house.id}`
                  );
                  const deleteHouseResponse = res.data;

                  if (deleteHouseResponse.success) {
                    message("O imóvel foi excluído com sucesso", true);
                    onDelete(house.id);
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
