// import type { HouseSelectType } from '../../../shared/types/house.type'

import { idText } from "typescript";

type HouseSelectType = {
  id: number;
  nickname: string;
};

type HouseSelectListProps = {
  house_select_list: HouseSelectType[];
  house_id_selected: number;
  id: string;
  onChange: (value: string) => void;
};

export function SelectHouse(props: HouseSelectListProps) {
  return (
    <select
      id={props.id}
      onChange={(event) => props.onChange(event.target.value)}
      className="outline outline-slate-300 outline-1 rounded-full px-2 shadow-md"
      >
        <option value={1}>Selecione um imóvel</option>
        {props.house_select_list.map((house) => {
          if(house.id === props.house_id_selected){
            return (
              <option value={house.id} selected>{house.nickname} </option>
            );
          } else {
            return (
              <option value={house.id}>{house.nickname} </option>
            );
          }
        })}
    </select>
  );
}
