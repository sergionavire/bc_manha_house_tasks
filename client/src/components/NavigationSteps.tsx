import { Link } from "react-router-dom";

export type NavigationStepsProps = {
  steps: { to: string; title: string }[];
};

export function NavigationSteps({ steps }: NavigationStepsProps) {
  return (
    <div className="w-full m-auto flex">
      {steps.map((step, index) => (
        <div key={index}>
            {index > 0 ? '>' : ''}
            <Link to={step.to} className='text-gray-500 text-sm hover:underline'>
                <span className="px-3 uppercase">{step.title}</span>
            </Link>
        </div>
      ))}
    </div>
  );
}
