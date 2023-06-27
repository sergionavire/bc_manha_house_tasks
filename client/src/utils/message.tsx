import toast from "react-simple-toasts";

export function message(message: string, isSucess: boolean){
    const color = isSucess ? 'skyblue' : 'red';
    return toast(<b style={{ color: color }}>{message}</b>);
}