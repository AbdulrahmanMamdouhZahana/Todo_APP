import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerFormInput } from "../components/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../components/validation";
import { axiosInstance } from "../components/config";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useState } from "react";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../components/interfaces";
import { Sparkles, ArrowRight } from "lucide-react";

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setLoading(true);

        try {
            const { status } = await axiosInstance.post("/auth/local/register", data);
            if (status === 200) {
                toast.success('Account created successfully! Redirecting to login...', {
                    duration: 3000,
                });

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            const errorObj = error as AxiosError<ErrorResponse>;
            const errMsg = errorObj?.response?.data?.error?.message || "Registration failed. Please check your details.";
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
                        Create Your Account
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">

                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {registerFormInput.map((input, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    {input.name === "username" ? "Username" : input.name === "email" ? "Email Address" : "Password"}
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
                                    Get Started Free
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;



