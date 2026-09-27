


import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "submit" | "reset" | "button";
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

const Button = ({ type = "button", isLoading = false, children, className = '', disabled, ...rest }: IProps) => {
    return (
        <button
            type={type}
            disabled={isLoading || disabled}
            className={`inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${className}`}
            {...rest}
        >
            {isLoading && (
                <svg
                    className="mr-2 h-4 w-4 animate-spin text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};

export default Button;