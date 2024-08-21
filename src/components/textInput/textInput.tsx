import React, {useCallback} from "react";

interface TextInputProps {
    title: string,
    value: string,
    onChange: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({title, value, onChange}) => {

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }, [onChange]);

    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input type="text"
                   placeholder={title}
                   value={value}
                   onChange={handleChange}
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                              focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500
                              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500
                              dark:focus:border-primary-500"/>
        </div>);
}
