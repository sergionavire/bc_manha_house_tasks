import { useNavigate } from "react-router-dom";
import { apiHousetasks } from "../api/apiHousetasks";
import { Button } from "./Button";
import { message } from "../utils/message";

type ButtonDeleteProps = {
  urlToSend: string;
  successMessage: string;
  successUrl: string;
  className?: string;
};

// urlApi = /notepads/${props.id}

export function ButtonDelete(props: ButtonDeleteProps) {
  const navigate = useNavigate();
  return (
    <Button
      className={`bg-red-600 ${props.className}`}
      onClick={async () => {
        const res = await apiHousetasks.delete(props.urlToSend);
        const deleteNotepadResponse = res.data;

        if (deleteNotepadResponse.success) {
          message(props.successMessage, true);
          navigate(props.successUrl);
        } else {
          message("Houve algum erro na exclusão", false);
        }
      }}
    >
      Delete
    </Button>
  );
}
