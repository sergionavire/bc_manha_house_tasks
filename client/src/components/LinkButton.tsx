import { Link } from "react-router-dom";

type LinkButtonProps = {
  to: string;
  className?: string;
  children: string;
};
export function LinkButton(props: LinkButtonProps) {
  return (
    <Link
      to={props.to}
      className={`bg-emerald-400 text-white px-4 rounded-xl my-auto p-3 hover:bg-emerald-600 ${props.className}`}
    >
      {props.children}
    </Link>
  );
}
