import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { LoginFormInput } from "../components/data";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../components/validation";
import { axiosInstance } from "../components/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../components/interfaces";
import { Lock, ArrowRight } from "lucide-react";

interface IFormInput {
    identifier: string;
    password: string;
}

const Login = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
        setLoading(true);

        try {
            const { status, data } = await axiosInstance.post("/auth/local", formData);
            if (status === 200) {
                toast.success('Login successful! Redirecting to your dashboard...', {
                    duration: 3000,
                });

                localStorage.setItem("userDate", JSON.stringify(data));

                setTimeout(() => {
                    location.replace("/");
                }, 1500);
            }
        } catch (error) {
            const errorObj = error as AxiosError<ErrorResponse>;
            const errMsg = errorObj?.response?.data?.error?.message || "Invalid credentials. Please try again.";
            toast.error(errMsg, {
                duration: 2500,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-12 px-4 sm:px-6">
            <div className="w-full max-w-md">
                {/* Header card icon & title */}
                <div className="text-center mb-8">
                   
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your tasks and workspaces
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {LoginFormInput.map((input, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    {input.name === "identifier" ? "Email Address" : "Password"}
                                </label>
                                <Input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    {...register(input.name, input.validation)}
                                />
                                {errors?.[input.name] && (
                                    <ErrorMessage message={errors[input.name]?.message} />
                                )}
                            </div>
                        ))}

                        <div className="pt-2">
                            <Button
                                type="submit"
                                isLoading={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/25 transition-all duration-200 cursor-pointer"
                            >
                                <span className="inline-flex items-center gap-2">
                                    Sign In
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;


