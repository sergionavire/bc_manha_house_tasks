import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";
import logo from "../assets/logo-icon.svg";

export function AppBar() {
  return (
    <div className="flex flex-row align-middle h-30 shadow-lg mb-4 px-5">
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <h1 className="h-full align-middle m-auto p-7 text-2xl font-bold">
        House Tasks
      </h1>
      <LinkButton to={"/user/"}>Usuário</LinkButton>
      <LinkButton to={"/house/"}>Imóvel</LinkButton>
      <LinkButton to={"/workday/"}>Tarefas</LinkButton>
    </div>
  );
}
