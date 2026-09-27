import { Link } from "react-router-dom";
import {  Mail,  ArrowRight, ListTodo, LogOut } from "lucide-react";
import Button from "../components/UI/Button";
import toast from "react-hot-toast";

const getUserData = () => {
    try {
        const userDateString = localStorage.getItem("userDate");
        return userDateString ? JSON.parse(userDateString) : null;
    } catch {
        return null;
    }
};

const handleLogout = () => {
    localStorage.removeItem("userDate");
    toast.success("Logout successfully", {
        duration: 1500,
    });
    location.replace("/login");
};

const Profile = () => {
    const userData = getUserData();
    const user = userData?.user;

    return (
        <div className="py-8 max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Profile</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage your personal account information and workspace settings
                </p>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                   
                    <div className="text-center sm:text-left flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h2 className="text-2xl font-bold text-slate-900">
                                {user?.username || "Guest User"}
                            </h2>
                         
                        </div>
                        <p className="text-sm text-slate-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                            <Mail className="w-4 h-4 text-slate-400" />
                            {user?.email || "No email provided"}
                        </p>
                    </div>
                </div>

                {/* Account Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Username</span>
                        <span className="text-sm font-semibold text-slate-800 mt-1 block">
                            {user?.username || "N/A"}
                        </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</span>
                        <span className="text-sm font-semibold text-slate-800 mt-1 block truncate">
                            {user?.email || "N/A"}
                        </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">User ID</span>
                        <span className="text-xs font-mono text-slate-700 mt-1 block truncate">
                            {user?.documentId || user?.id || "N/A"}
                        </span>
                    </div>

                   
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                    to="/"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all"
                >
                    <ListTodo className="w-4 h-4" />
                    Back to My Tasks
                </Link>

                <Link
                    to="/todos"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm shadow-xs transition-all"
                >
                    Explore All Todos
                    <ArrowRight className="w-4 h-4" />
                </Link>

                {userData?.jwt && (
                    <Button
                        type="button"
                        onClick={handleLogout}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Profile;
