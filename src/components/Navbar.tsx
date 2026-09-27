import { NavLink } from "react-router";
import "./Style/Navbar.css";
import toast from "react-hot-toast";
import { CheckSquare, LogOut, User, LogIn, UserPlus, ListTodo } from "lucide-react";

const getUserData = () => {
    try {
        const userDateString = localStorage.getItem("userDate");
        return userDateString ? JSON.parse(userDateString) : null;
    } catch {
        return null;
    }
};

const Logout = () => {
    localStorage.removeItem("userDate");
    toast.success("Logout successfully", {
        duration: 1500,
    });
    location.replace("/login");
};

const Navbar = () => {
    const userData = getUserData();

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Logo */}
                    <NavLink to="/" className="flex items-center gap-2.5 group">

                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-slate-900 tracking-tight leading-tight">
                                Todo<span className="text-indigo-600"> App</span>
                            </span>
                         
                        </div>
                    </NavLink>

                    {/* Navigation Items */}
                    <nav>
                        <ul className="flex items-center gap-1 sm:gap-2">
                            {userData?.user ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/"
                                            end
                                            className={({ isActive }) =>
                                                `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700 shadow-2xs font-semibold"
                                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                                }`
                                            }
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/todos"
                                            className={({ isActive }) =>
                                                `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700 shadow-2xs font-semibold"
                                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                                }`
                                            }
                                        >
                                            <ListTodo className="w-4 h-4 hidden sm:inline" />
                                            All Todos
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/profile"
                                            className={({ isActive }) =>
                                                `inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-700 shadow-2xs font-semibold"
                                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                                }`
                                            }
                                        >
                                            <User className="w-4 h-4 hidden sm:inline" />
                                            <span>Profile</span>
                                        </NavLink>
                                    </li>

                                    {/* User pill & Logout button */}
                                    <li className="pl-2 ml-2 border-l border-slate-200 flex items-center gap-2">
                                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                                        
                                            <span className="max-w-[120px] truncate">{userData.user?.username || "User"}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={Logout}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                                            title="Logout"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span className="hidden sm:inline">Logout</span>
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) =>
                                                `inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "text-indigo-600 font-semibold"
                                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                                                }`
                                            }
                                        >
                                            <LogIn className="w-4 h-4" />
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-500/25 transition-all duration-200"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;