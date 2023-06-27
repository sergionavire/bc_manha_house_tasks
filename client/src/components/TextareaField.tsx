type TextareaFieldProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export function TextareaField(props: TextareaFieldProps){
    return <textarea
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className="w-full h-36 resize-none font-normal text-1 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
     />
}