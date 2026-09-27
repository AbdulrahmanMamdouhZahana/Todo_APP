

import { AlertCircle } from "lucide-react";

interface IProps {
    message?: string;
}

const ErrorMessage = ({ message }: IProps) => {
    if (!message) return null;

    return (
        <div className="flex items-center gap-1.5 mt-1.5 text-xs font-medium text-rose-500 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{message}</span>
        </div>
    );
};

export default ErrorMessage;