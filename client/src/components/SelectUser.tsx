type UserSelectType = {
  id: number;
  first_name: string;
  last_name: string;
};

type UserSelectListProps = {
  user_select_list: UserSelectType[];
  user_id_selected: number;
  id: string;
  onChange: (value: string) => void;
};

export function SelectUser(props: UserSelectListProps) {
  return (
    <select
      id={props.id}
      onChange={(event) => props.onChange(event.target.value)}
      className="outline outline-slate-300 outline-1 rounded-full px-2 shadow-md"
    >
      <option value={1}>Selecione um trabalhador</option>
      {props.user_select_list.map((user) => {
        if(user.id === props.user_id_selected){
          return (
            <option value={user.id} selected>{user.first_name} {user.last_name} </option>
          );
        } else {
          return (
            <option value={user.id}>{user.first_name} {user.last_name} </option>
          );
        }

      })}
    </select>
  );
}
