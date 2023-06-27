import { useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import { Button } from "./Button";
import { message } from "../utils/message";

type ButtonDeleteProps = {
  id: number;
  className?: string;
};

export function ButtonDelete(props: ButtonDeleteProps) {
  const navigate = useNavigate();
  return (
    <Button
      className={`bg-red-600 ${props.className}`}
      onClick={async () => {
        const res = await apiHousetasks.delete(`/notepads/${props.id}`);
        const deleteNotepadResponse = res.data;

        if (deleteNotepadResponse.success) {
          message("O notepad foi excluído com sucesso", true);
          navigate("/");
        } else {
          message("Houve algum erro na exclusão", false);
        }
      }}
    >
      Delete
    </Button>
  );
}
