import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiHousetasks } from "../../api/apiHousetasks";
import { Button } from "../../components/Button";
import { ButtonDelete } from "../../components/ButtonDelete";
import { NavigationSteps } from "../../components/NavigationSteps";
import type { HouseType } from '../../../../shared/types/house.type'

export function HouseView() {
  const params = useParams();
  const navigate = useNavigate();
  const initialHouse: HouseType = {
    id: 0,
    nickname: "",
    address: "",
    address_number: "",
    address_complement: "",
    address_neighborhood: "",
    address_city: "",
    address_state: "",
    address_postal_code: "",
    created_at: ""
  };

  const [house, setHouse] = useState(initialHouse);
  useEffect(() => {
    apiHousetasks.get(`/houses/${params.id}`).then((res) => {
      const house = res.data[0];
      setHouse(house);
    });
  }, []);
  return (
    <div className="w-full md:w-3/5 m-auto flex flex-col gap-3">
      <NavigationSteps
        steps={[
          { to: "/", title: "Home" },
          { to: `/house-view/${house.id}`, title: "House" },
        ]}
      />
      <div className="w-full m-auto flex flex-col gap-3 shadow-2xl p-5">
        <div className="text-slate-500">
          <span className="font-bold">Id:</span> {house.id}
        </div>
        <div className="text-slate-500">
          <strong>Criado em:</strong> {house.created_at}
        </div>
        <div className="font-bold text-2xl">{house.nickname}</div>
        <div className="font-bold text-l">{house.address}, nº {house.address_number}, {house.address_complement}</div>
        <div className="font-bold text-l">{house.address_neighborhood}</div>
        <div className="font-bold text-l">{house.address_city} / {house.address_state}</div>
        <div className="font-bold text-l">{house.address_postal_code}</div>
        <div className="flex flex-row gap-5">
          <ButtonDelete urlToSend={`/house/${house.id}`} successUrl="/house/" successMessage="Imóvel deletado com sucesso!" className="w-1/2" />
          <Button
            className="w-1/2"
            onClick={() => {
              navigate(`/house-update/${house.id}`);
            }}
          >
            Alterar
          </Button>
        </div>
      </div>
    </div>
  );
}
