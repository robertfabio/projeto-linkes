import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
        <input 
        {...props}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 focus:outline-none hover:border-gray-300"
        />
    )
}