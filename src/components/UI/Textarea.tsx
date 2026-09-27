


import React, { forwardRef } from "react";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, IProps>(
    ({ className = '', placeholder, ...rest }, ref) => {
        return (
            <textarea
                ref={ref}
                placeholder={placeholder}
                className={`w-full px-4 py-3 rounded-xl text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-xs transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300 resize-none h-32 ${className}`}
                {...rest}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;