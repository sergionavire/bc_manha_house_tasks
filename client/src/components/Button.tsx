type ButtonProps = {
  children: string;
  onClick?: () => void;
  className?: string;
};
export function Button(props: ButtonProps) {
  return (
    <button
      className={`bg-emerald-400 text-white px-4 rounded-xl h-12 my-auto ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
