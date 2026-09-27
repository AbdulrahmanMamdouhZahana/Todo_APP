

import React, { forwardRef } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    placeholder?: string;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
    ({ type = "text", placeholder, className = '', ...rest }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-xs transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300 ${className}`}
                {...rest}
            />
        );
    }
);

Input.displayName = "Input";

export default Input;

